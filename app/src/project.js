// ===========================================
// PROJECT COMPONENT
// ===========================================
// Reactive project detail view with GitHub README loading

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { marked } from "./dependencies/marked.js";
import { i18n } from "./i18n.js";
import { MarkdownLoader } from "./markdown.js";
import { PrismLoader } from "./prism-loader.js";
import { html, join, Reactive, trusted } from "./reactive.js";
import { Templates } from "./templates.js";

export class Project extends Reactive.Component {
	projectId = null;

	constructor(projectId) {
		super();
		this.projectId = projectId;
		this.mountTo("main-content");
	}

	mount() {
		this._loadProject();
	}

	state() {
		const data = Context.get();

		return {
			loading: true,
			project: null,
			error: null,
			readmeContent: null,
			commentsConfig: data?.site?.comments,

			// Computed display content
			displayContent: () => {
				if (this.loading.get()) {
					return Templates.loadingSpinner();
				}

				if (this.error.get()) {
					return Templates.errorMessage(
						i18n.t("general.projectNotFound"),
						i18n.t("general.projectNotFoundMessage"),
					);
				}

				return trusted(this._renderSections());
			},
		};
	}

	template() {
		return html`<div data-html="displayContent"></div>`;
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	async _loadProject() {
		try {
			const data = Context.get();
			const project = data?.projects?.find((p) => p.id === this.projectId);

			if (!project) {
				this.batch(() => {
					this.error.set(true);
					this.loading.set(false);
				});
				return;
			}

			// Set project data first but keep loading true
			this.project.set(project);

			// Set page title
			document.title = `${project.title} - ${
				data.site?.title || CONSTANTS.DEFAULT_TITLE
			}`;

			// Load README if repo exists
			if (project.github_repo) {
				const readme = await this._fetchGitHubReadme(project.github_repo);
				if (readme) {
					this.readmeContent.set(readme);
				}
			}

			// Now set loading to false to show the complete page
			this.loading.set(false);

			// Highlight code blocks after render
			requestAnimationFrame(async () => {
				const readmeEl = document.getElementById("project-readme");
				if (readmeEl) {
					await PrismLoader.highlight(readmeEl);
					MarkdownLoader.initCopyCodeButtons();
				}
			});
		} catch (error) {
			console.error(`Error loading project ${this.projectId}:`, error);
			this.batch(() => {
				this.error.set(true);
				this.loading.set(false);
			});
		}
	}

	_renderSections() {
		const project = this.project.get();
		if (!project) return "";

		const sections = [
			this._tplProjectHeader(project.title, project.description, project.tags),
			this._tplReadme(),
			project.youtube_videos?.length &&
				this._tplMediaSection(
					trusted(
						project.youtube_videos
							.map((v) => this._tplYoutubeVideo(v).content)
							.join(""),
					),
				),
			project.demo_url && this._tplDemoIframe(project.demo_url),
			this._tplProjectLinks(project.links),
			Templates.giscusComments(this.commentsConfig.get(), "projects"),
		];

		return sections
			.filter(Boolean)
			.map((section) => section.content)
			.join("");
	}

	// ===========================================
	// TEMPLATE METHODS
	// ===========================================

	_tplProjectHeader(title, description, tags) {
		return html`
            <h1 class="project-title">${title}</h1>
            <p class="project-description">${description}</p>
            <div class="project-tags">${this._tplTagList(tags)}</div>`;
	}

	_tplMediaSection(videosHtml) {
		return html`
            <div class="markdown-body">
                <h2>${i18n.t("project.media")}</h2>
                ${videosHtml}
            </div>`;
	}

	_tplYoutubeVideo(videoId) {
		return html`
        <div class="youtube-video"><div class="iframeWrapper">
            <iframe width="560" height="349" src="//www.youtube.com/embed/${videoId}?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
        </div></div>`;
	}

	_tplDemoIframe(demoUrl) {
		return html`
        <div class="markdown-body"><h2>${i18n.t("project.demo")}</h2>
            <p>${i18n.t("project.demoInstructions")}</p>
            <div class="iframeWrapper">
                <iframe id="demo" width="900" height="700" src="${demoUrl}" frameborder="0" allowfullscreen></iframe>
            </div><br><center><button id="fullscreen" class="download-btn" data-on-click="toggleFullscreen"><i class="fas fa-expand"></i><span>${i18n.t("project.fullscreen")}</span></button></center>
        </div>`;
	}

	_tplReadme() {
		const content = this.readmeContent.get();
		const project = this.project.get();

		if (!project?.github_repo) return "";

		if (!content) {
			return html`<div id="project-readme"><p>${i18n.t("project.loadingReadme")}</p></div>`;
		}

		return html`<div id="project-readme" class="markdown-body">${trusted(marked.parse(content))}</div>`;
	}

	_tplProjectLinks(links) {
		if (!links?.length) return "";

		const linksHtml = trusted(
			links
				.map(
					(link) =>
						html`
            <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn">
                <i class="${link.icon}"></i>
                <span>${link.title}</span>
            </a>`.content,
				)
				.join(""),
		);

		return html`
            <div class="markdown-body">
                <h2>${i18n.t("project.links")}</h2>
                <div class="download-buttons">${linksHtml}</div>
            </div>`;
	}

	_tplTagList(tags) {
		if (!tags?.length) return html``;
		const tagElements = tags.map(
			(tag) =>
				html`<span class="item-tag clickable-tag" data-search-tag="${tag}">${tag}</span>`,
		);
		return join(tagElements, " ");
	}

	toggleFullscreen() {
		const iframe = document.getElementById("demo");
		if (!iframe) return;

		if (!document.fullscreenElement) {
			const request =
				iframe.requestFullscreen ||
				iframe.webkitRequestFullscreen ||
				iframe.mozRequestFullScreen ||
				iframe.msRequestFullscreen;

			if (request) {
				request.call(iframe).catch((err) => {
					console.error(
						`Error attempting to enable fullscreen: ${err.message}`,
					);
				});
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	}

	async _fetchGitHubReadme(repo) {
		try {
			const data = Context.get();
			const githubUsername = data?.site?.github_username || "seriva";

			// Add username prefix if not already present
			const fullRepo = repo.includes("/") ? repo : `${githubUsername}/${repo}`;

			// Use raw.githubusercontent.com to avoid API rate limits
			// Try 'main' branch first, fallback to 'master' if needed
			const rawUrl = `${CONSTANTS.GITHUB_RAW_BASE}/${fullRepo}/main/README.md`;

			// Load README using MarkdownLoader
			let readmeContent = await MarkdownLoader.loadFile(rawUrl);

			// Fallback to master branch if main doesn't exist
			if (!readmeContent) {
				const masterUrl = `${CONSTANTS.GITHUB_RAW_BASE}/${fullRepo}/master/README.md`;
				readmeContent = await MarkdownLoader.loadFile(masterUrl);
			}

			return readmeContent;
		} catch (error) {
			console.warn(`Failed to load README for ${repo}:`, error);
			return null;
		}
	}
}

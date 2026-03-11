// ===========================================
// PROJECT COMPONENT
// ===========================================
// Reactive project detail view with GitHub README loading

import markedLib from "../dependencies/marked.js";

const { marked } = markedLib;

import { Context } from "../services/context.js";
import { i18n } from "../services/i18n.js";
import { MarkdownLoader } from "../services/markdown.js";
import { PrismLoader } from "../services/prism-loader.js";
import { CONSTANTS } from "../utils/constants.js";
import { Icons } from "../utils/icons.js";
import { html, join, Reactive, trusted } from "../utils/reactive.js";
import { Templates } from "../utils/templates.js";
import { projectStyles } from "./project.styles.js";

export class Project extends Reactive.Component {
	projectId = null;

	constructor(projectId) {
		super();
		this.projectId = projectId;
		this.mountTo("main-content");
	}

	state() {
		const data = Context.get();
		const project = data?.projects?.find((p) => p.id === this.projectId);

		return {
			project,
			commentsConfig: data?.site?.comments,

			// Async computed for README loading with cancellation
			projectData: this.computedAsync(async (cancelToken) => {
				if (!project?.github_repo) return null;

				// Try to get from cache first
				let readme = Context.getReadme(project.github_repo);

				// If not in cache, fetch it
				if (!readme) {
					readme = await this._fetchGitHubReadme(
						project.github_repo,
						cancelToken,
					);
				}

				if (cancelToken?.cancelled) return null;
				return readme;
			}, "readmeData"),

			// Computed display content
			displayContent: () => {
				const readmeState = this.projectData.get();
				const currentProject = this.project.get();

				if (!currentProject) {
					return Templates.errorMessage(
						i18n.t("general.projectNotFound"),
						i18n.t("general.projectNotFoundMessage"),
					);
				}

				// Show loading spinner while README is loading
				if (readmeState.loading && currentProject.github_repo) {
					return trusted(
						this._renderSections(readmeState) +
							Templates.loadingSpinner().content,
					);
				}

				return trusted(this._renderSections(readmeState));
			},
		};
	}

	mount() {
		const data = Context.get();
		const project = this.project.get();

		if (project) {
			// Set page title
			document.title = `${project.title} - ${
				data.site?.title || CONSTANTS.DEFAULT_TITLE
			}`;
		}

		// Reactive effect: Apply syntax highlighting when README loads
		this.effect(() => {
			const state = this.projectData.get();
			if (state.data && this.refs.container) {
				requestAnimationFrame(() => {
					PrismLoader.highlight(this.refs.container);
				});
			}
		});
	}

	styles() {
		return projectStyles;
	}

	template() {
		return html`<div data-html="displayContent" data-ref="container"></div>`;
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	_renderSections(readmeState) {
		const project = this.project.get();
		if (!project) return "";

		const sections = [
			this._tplProjectHeader(project.title, project.description, project.tags),
			this._tplReadme(readmeState),
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
            </div><br><center><button id="fullscreen" class="download-btn" data-on-click="toggleFullscreen">${trusted(Icons.get("expand", { size: "1rem" }))}<span>${i18n.t("project.fullscreen")}</span></button></center>
        </div>`;
	}

	_tplReadme(readmeState) {
		const project = this.project.get();

		if (!project?.github_repo) return "";

		// Show loading or error state
		if (readmeState?.loading) {
			return html`<div id="project-readme" data-ref="readme"><p>${i18n.t("project.loadingReadme")}</p></div>`;
		}

		if (readmeState?.error) {
			return html`<div id="project-readme" data-ref="readme"><p>${i18n.t("project.readmeError")}</p></div>`;
		}

		const content = readmeState?.data;
		if (!content) return "";

		return html`<div id="project-readme" data-ref="readme" class="markdown-body">${trusted(marked.parse(content))}</div>`;
	}

	_tplProjectLinks(links) {
		if (!links?.length) return "";

		const linksHtml = trusted(
			links
				.map((link) => {
					const iconSvg = Icons.get(link.icon, { size: "1rem" });
					return html`
            <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn">
                ${trusted(iconSvg)}
                <span>${link.title}</span>
            </a>`.content;
				})
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

	async _fetchGitHubReadme(repo, cancelToken = null) {
		try {
			const data = Context.get();
			const githubUsername = data?.site?.github_username || "seriva";
			const project = this.project.get();
			const branch = project?.github_branch || "main"; // Default to main if not specified

			// Add username prefix if not already present
			const fullRepo = repo.includes("/") ? repo : `${githubUsername}/${repo}`;

			// Use raw.githubusercontent.com to avoid API rate limits
			const rawUrl = `${CONSTANTS.GITHUB_RAW_BASE}/${fullRepo}/${branch}/README.md`;

			// Load README using MarkdownLoader with cancellation support
			const readmeContent = await MarkdownLoader.loadFile(
				rawUrl,
				{},
				cancelToken,
			);

			if (cancelToken?.cancelled) return null;
			return readmeContent;
		} catch (error) {
			if (cancelToken?.cancelled) return null;
			console.warn(`Failed to load README for ${repo}:`, error);
			return null;
		}
	}
}

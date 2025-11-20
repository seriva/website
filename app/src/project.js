// ===========================================
// PROJECT CONTROLLER
// ===========================================
// Reactive component for project detail view

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { Loaders } from "./loaders.js";
import { html, join, Reactive, trusted } from "./reactive.js";
import { Templates } from "./templates.js";

export class ProjectController extends Reactive.Component {
    projectId = null;

    constructor(projectId) {
        super();
        this.projectId = projectId;
        this.initState();
        this.mountTo("main-content");

        // Load project data
        this._loadProject();
    }

    state() {
        const data = Context.get();

        return {
            loading: true,
            project: null,
            error: null,
            commentsConfig: data?.site?.comments,

            // Computed display content
            displayContent: () => {
                if (this.loading.get()) {
                    return Templates.loadingSpinner();
                }

                if (this.error.get()) {
                    return Templates.errorMessage(
                        i18n.t("general.projectNotFound"),
                        i18n.t("general.projectNotFoundMessage")
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

            this.batch(() => {
                this.project.set(project);
                this.loading.set(false);
            });

            // Set page title
            document.title = `${project.title} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;

            // Load additional content after render
            requestAnimationFrame(() => this._loadAdditionalContent());
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
            this._tplProjectHeader(
                project.title,
                project.description,
                project.tags,
            ),
            project.github_repo &&
            this._tplDynamicContainer(
                "github-readme",
                "repo",
                project.github_repo,
                i18n.t("project.loadingReadme"),
            ),
            project.youtube_videos?.length &&
            this._tplMediaSection(
                trusted(
                    project.youtube_videos
                        .map((v) => this._tplYoutubeVideo(v).content)
                        .join(""),
                ),
            ),
            project.demo_url && this._tplDemoIframe(project.demo_url),
            this._tplDynamicContainer("project-links", "project", project.id, ""),
            Templates.giscusComments(this.commentsConfig.get(), "projects"),
        ];

        return sections
            .filter(Boolean)
            .map((section) => section.content)
            .join("");
    }

    async _loadAdditionalContent() {
        // Load README and project links
        await Loaders.loadAdditionalContent();
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
            </div><br><center><button id="fullscreen" class="download-btn" data-action="fullscreen"><i class="fas fa-expand"></i><span>${i18n.t("project.fullscreen")}</span></button></center>
        </div>`;
    }

    _tplDynamicContainer(id, dataAttr, dataValue, loadingText = null) {
        return html`<div id="${id}" data-${dataAttr}="${dataValue}"><p>${loadingText || i18n.t("general.loading")}</p></div>`;
    }

    _tplTagList(tags) {
        if (!tags?.length) return html``;
        const tagElements = tags.map((tag) => html`<span class="item-tag clickable-tag" data-search-tag="${tag}">${tag}</span>`);
        return join(tagElements, " ");
    }
}

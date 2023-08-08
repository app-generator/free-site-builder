/*!
=========================================================
* Rocket Builder - v1.0.25
=========================================================
*
* Product: https://www.simpllo.com
* Sources: https://github.com/app-generator/free-site-builder
* Copyright AppSeed (https://appseed.us)
* License EULA: https://github.com/app-generator/free-site-builder/blob/main/LICENSE.md
*
=========================================================
*/

import { Config } from "./src/config";
import { onRestore, setupGlobalEvents } from "./src/dnd";
import {
  captureDeployRequest,
  closePreviewModal,
  downloadComponents,
  downloadHandler,
  initDropZone,
  initGridDropZone,
  misc,
  openDeployModal,
  openPreviewModal,
  setGlobalInput,
  setNavigation,
  setPreviewMode,
} from "./src/main";

type TSelectors = {
  actionPreview?: string | null;
  actionDownload?: string | null;
  actionDeploy?: string | null;
  closeModal?: string | null;
  fullScreenOption?: string | null;
  tabletOption?: string | null;
  mobileOption?: string | null;
  deployForm?: string | null;
};
type TOptions = {
  dropContainer: string;
  dropIndicator: string;
  backendUrl?: string;
  uiKit?: string;
};

const DEFAULT_OPTIONS: TOptions = {
  dropContainer: "dropzone",
  dropIndicator: "drop-here-indicator",
  // TODO: Update backendUrl and uiKit to pull from .env? Or probably better to just use the defaults?
  backendUrl: "https://components-server.onrender.com/",
  uiKit: "bs5",
};

const DEFAULT_SELECTORS: TSelectors = {
  actionPreview: "#action_preview",
  actionDownload: "#action_download",
  actionDeploy: "#action_deploy",
  closeModal: "#closeModal",
  fullScreenOption: "#fullScreenOption",
  tabletOption: "#tabletOption",
  mobileOption: "#mobileOption",
  deployForm: "#deployForm",
};

export const DNDBuilder = {
  $actionPreview: null as HTMLButtonElement | null,
  $actionDownload: null as HTMLButtonElement | null,
  $actionDeploy: null as HTMLButtonElement | null,
  $closeModal: null as HTMLDivElement | null,
  $fullScreenOption: null as HTMLButtonElement | null,
  $tabletOption: null as HTMLButtonElement | null,
  $mobileOption: null as HTMLButtonElement | null,
  $deployForm: null as HTMLFormElement | null,
  $dropContainer: '',
  $dropIndicator: '',

  setup: function(options: TOptions = DEFAULT_OPTIONS, selectors: TSelectors = DEFAULT_SELECTORS) {
    const {
      actionPreview,
      actionDownload,
      actionDeploy,
      deployForm,
      mobileOption,
      tabletOption,
      fullScreenOption,
      closeModal,
    } = selectors || {};
    const { dropContainer, dropIndicator } = options;
    if (actionPreview) {
      this.$actionPreview = document.querySelector(actionPreview);
    }
    if (actionDownload) {
      this.$actionDownload = document.querySelector(actionDownload);
    }
    if (actionDeploy) {
      this.$actionDeploy = document.querySelector(actionDeploy);
    }
    if (closeModal) {
      this.$closeModal = document.querySelector(closeModal);
    }
    if (fullScreenOption) {
      this.$fullScreenOption = document.querySelector(fullScreenOption);
    }
    if (tabletOption) {
      this.$tabletOption = document.querySelector(tabletOption);
    }
    if (mobileOption) {
      this.$mobileOption = document.querySelector(mobileOption);
    }
    if (deployForm) {
      this.$deployForm = document.querySelector(deployForm);
    }
    this.$dropContainer = dropContainer;
    this.$dropIndicator = dropIndicator;

    Config.backendUrl = options.backendUrl ? options.backendUrl : DEFAULT_OPTIONS.backendUrl!;
    Config.uiKit = options.uiKit ? options.uiKit : DEFAULT_OPTIONS.uiKit!;

    document.addEventListener("DOMContentLoaded", () => {
      if (this.$actionPreview) {
        this.$actionPreview.addEventListener("click", () => openPreviewModal(Config.uiKit));
      }
      if (this.$actionDownload) {
        this.$actionDownload.addEventListener("click", downloadHandler);
      }
      if (this.$actionDeploy) {
        this.$actionDeploy.addEventListener("click", openDeployModal);
      }
      if (this.$closeModal) {
        this.$closeModal.addEventListener("click", closePreviewModal);
      }
      if (this.$fullScreenOption) {
        this.$fullScreenOption.addEventListener("click", () =>
          setPreviewMode("fullScreen")
        );
      }
      if (this.$tabletOption) {
        this.$tabletOption.addEventListener("click", () =>
          setPreviewMode("tablet")
        );
      }
      if (this.$mobileOption) {
        this.$mobileOption.addEventListener("click", () =>
          setPreviewMode("mobile")
        );
      }
      if (this.$actionPreview) {
        this.$actionPreview.addEventListener("submit", captureDeployRequest);
      }
    });
  },

  render: function() {
    setNavigation(this.$dropContainer);
    initDropZone(this.$dropContainer, this.$dropIndicator);
    initGridDropZone(this.$dropContainer, this.$dropIndicator);
    setGlobalInput();
    downloadComponents(Config.backendUrl, Config.uiKit).then(() => {
      misc(this.$dropContainer);
    });
    onRestore(null, this.$dropContainer);
    setupGlobalEvents(this.$dropContainer);
  },
};

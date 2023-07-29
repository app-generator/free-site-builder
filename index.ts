/*!
=========================================================
* Rocket Builder - v1.0.12
=========================================================
*
* Product: https://www.simpllo.com
* Sources: https://github.com/app-generator/free-site-builder
* Copyright AppSeed (https://appseed.us)
* License EULA: https://github.com/app-generator/free-site-builder/blob/main/LICENSE.md
*
=========================================================
*/

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
};

export class DNDBuilder {
  $actionPreview: HTMLButtonElement | null = null;
  $actionDownload: HTMLButtonElement | null = null;
  $actionDeploy: HTMLButtonElement | null = null;
  $closeModal: HTMLDivElement | null = null;
  $fullScreenOption: HTMLButtonElement | null = null;
  $tabletOption: HTMLButtonElement | null = null;
  $mobileOption: HTMLButtonElement | null = null;
  $deployForm: HTMLFormElement | null = null;
  $dropContainer: string;
  $dropIndicator: string;
  constructor(options: TOptions, selectors?: TSelectors) {
    const {
      actionPreview,
      actionDownload,
      actionDeploy,
      deployForm,
      mobileOption,
      tabletOption,
      fullScreenOption,
      closeModal,
    } = selectors;
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

    this.setup();
    this.render();
  }

  setup() {
    document.addEventListener("DOMContentLoaded", () => {
      if (this.$actionPreview) {
        this.$actionPreview.addEventListener("click", openPreviewModal);
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
  }
  render() {
    setNavigation(this.$dropContainer);
    initDropZone(this.$dropContainer, this.$dropIndicator);
    initGridDropZone(this.$dropContainer, this.$dropIndicator);
    setGlobalInput();
    downloadComponents().then(() => {
      misc(this.$dropContainer);
    });
    onRestore(null, this.$dropContainer);
    setupGlobalEvents(this.$dropContainer);
  }
}

new DNDBuilder(
  {
    dropContainer: "dropzone",
    dropIndicator: "drop-here-indicator",
  },
  {
    actionPreview: "#action_preview",
    actionDownload: "#action_download",
    actionDeploy: "#action_deploy",
    closeModal: "#closeModal",
    fullScreenOption: "#fullScreenOption",
    tabletOption: "#tabletOption",
    mobileOption: "#mobileOption",
    deployForm: "#deployForm",
  }
);

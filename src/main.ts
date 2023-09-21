/*!
=========================================================
* Rocket Builder
=========================================================
*
* Product: https://www.simpllo.com
* Sources: https://github.com/app-generator/free-site-builder
* Copyright AppSeed (https://appseed.us)
* License EULA: https://github.com/app-generator/free-site-builder/blob/main/LICENSE.md
*
=========================================================
*/

import "./style.css";
import style from "./style.css?inline";
import JSZip from "jszip";
import { Config } from "./config";

import {
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onClear,
  onRestore,
  setupGlobalEvents,
} from "./dnd.ts";

const url = import.meta.env.VITE_BACKEND_URL
  ? import.meta.env.VITE_BACKEND_URL
  : Config.backendUrl;

type KitConfig = {
  [key: string]: {
    script: string;
    styles: string[];
    customStyles: string;
  };
};

// Define a dictionary to store the scripts and styles for each kit
const kits: KitConfig = {
  'bs5': {
    'script': 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'styles': ['https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',"https://cdn.jsdelivr.net/gh/app-generator/free-site-builder@latest/dist/style.css"],
    'customStyles': '.border-dotted, .border-props, .cross-icon { border: none !important; } .upButton, .downButton, .cross-icon { display: none !important; }'
  },
  'pixel': {
    'script': 'https://appsrv1-147a1.kxcdn.com/builder/pixel/assets/js/pixel.js',
    'styles': ['https://appsrv1-147a1.kxcdn.com/builder/pixel/css/pixel.css', "https://cdn.jsdelivr.net/gh/app-generator/free-site-builder@latest/dist/style-pixel.css"],
    'customStyles': ''
  },
  'volt': {
    'script': 'https://appsrv1-147a1.kxcdn.com/builder/volt/assets/js/volt.js',
    'styles': ['https://appsrv1-147a1.kxcdn.com/builder/volt/css/volt.css', "https://cdn.jsdelivr.net/gh/app-generator/free-site-builder@latest/dist/style-volt.css"],
    'customStyles': ''
  },  
};

// Using Promise syntax:
export function downloadComponents(backendUrl: string, uiKit: string) {
  let loading = document.createElement("div");

  loading.style.display = "flex";

  return fetch(`${backendUrl}kits/${uiKit}/`)
    .then((response) => response.text())
    .then((response_raw) => {
      loading.style.display = "none";
      let response_json = JSON.parse(response_raw);
      window.localStorage.setItem("components", JSON.stringify(response_json));
      console.log(response_json);
      drawComponents(response_json);
    })
    .catch((error) => console.error(error));
}

function drawComponents(response_json: any) {
  let components = response_json["content"]["components"];
  let component = "";
  for (let item in components) {
    let subComponents = components[item];
    let gridStr = "";
    for (let subItem in subComponents) {
      let component_grid_base64 = subComponents[subItem];
      gridStr += atob(component_grid_base64);
    }
    var gridSize = Object.keys(subComponents).length;
    component += `
      <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo2-${item}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseTwo2-${item}" aria-expanded="false" aria-controls="collapseTwo2-${item}">
          ${item}
          <span class="forNumbers">${gridSize}</span>
        </button>
      </h2>
      <div id="collapseTwo2-${item}" class="accordion-collapse collapse" aria-labelledby="headingTwo2-${item}"
        data-bs-parent="#accordionComponents">
        <div class="accordion-body">
          ${gridStr}
        </div>
      </div>
    </div>`;
  }
  let componentsContainer =
    document.getElementsByClassName("components_contain")[0];
  var div = document.createElement("div");
  div.innerHTML = component.trim();
  if (componentsContainer) {
    componentsContainer.appendChild(<Node>div);
  }
}

let builderContainer = document.querySelector("#layout")!.innerHTML;
document.querySelector<HTMLDivElement>("#app")!.innerHTML = builderContainer;

// SETUP Navigation
export function setNavigation(param: any) {
  // const actionClearElement = document.querySelector('#action_clear') as HTMLElement;
  const action_clear_confirmElement = document.querySelector(
    ".action_clear_confirm"
  ) as HTMLElement;

  if (action_clear_confirmElement) {
    action_clear_confirmElement.onclick = (event) => {
      onClear(event, param);
    };
  }
}

// SETUP Components
export function misc(param: any) {
  //console.log(param, "misc");

  let draggableElems = document.querySelectorAll(".draggable");

  for (let i = 0; i < draggableElems.length; i++) {
    let draggableEle = draggableElems[i] as HTMLElement;
    draggableEle.ondragstart = (event) => {
      onDragStart(event, param);
    };
    draggableEle.ondragend = (event) => {
      onDragEnd(event, param);
    };
  }
}

export function downloadHandler() {
  const zip = new JSZip();
  let currentPages = JSON.parse(
    <string>window.localStorage.getItem("currentPageTabs")
  );
  let indexhtmlContent = drawHTMLForDownload("dropzone", "index.html");
  // Add the HTML file to the zip
  zip.file("index.html", indexhtmlContent);
  zip.file("assets/css/index.css", style);

  if (currentPages) {
      for (let i = 0; i < currentPages.length; i++) {
        let pageTab = currentPages[i].split("_@COL@_");
        console.log(pageTab);

        let htmlContent = drawHTMLForDownload(
          "dropzone-" + pageTab[0],
          pageTab[1],
          pageTab[0]
        );
        // Add the HTML file to the zip
        zip.file(pageTab[1], htmlContent);
        // Generate the zip file
      }
  }
  zip.generateAsync({ type: "blob" }).then(function (content: any) {
    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "builder.zip";

    // Trigger the download
    link.click();
  });
}

export function openDeployModal() {
  (document.getElementById("deployModal") as HTMLElement).style.display =
    "block";
}

export function captureDeployRequest(event: any) {
  event.preventDefault();

  const siteName = (document.getElementById("site-name") as HTMLInputElement)
    .value;
  const netlifyToken = (
    document.getElementById("netlify-token") as HTMLInputElement
  ).value;

  let errorMessage = document.querySelector(`#errorMessage`) as HTMLElement;
  errorMessage.style.visibility = "hidden";

  // Validation
  if (!siteName || !netlifyToken) {
    alert("Please fill in both fields.");
    return;
  }

  deployToNetlify(siteName, netlifyToken);
}

function deployToNetlify(siteName: string, netlifyToken: string): void {
  const zip = new JSZip();

  // TODO :: Move the code relating zip generation in a helper function
  // Retrieve the current pages from local storage
  let currentPages = JSON.parse(
    <string>window.localStorage.getItem("currentPageTabs")
  );

  // For each page, generate the HTML content and add it to the zip file
  let indexhtmlContent = drawHTMLForDownload("dropzone", "index.html");
  zip.file("index.html", indexhtmlContent);
  zip.file("assets/css/index.css", style);

  if (currentPages) {
    for (let i = 0; i < currentPages.length; i++) {
      let pageTab = currentPages[i].split("_@COL@_");
      let htmlContent = drawHTMLForDownload(
        "dropzone-" + pageTab[0],
        pageTab[1],
        pageTab[0]
      );
      zip.file(pageTab[1], htmlContent);
    }
  }

  // Generate the zip file as a Blob
  zip.generateAsync({ type: "blob" }).then((blob: Blob) => {
    // Convert Blob to File
    const file = new File([blob], `${siteName}.zip`, {
      type: "application/zip",
    });

    const formData = new FormData();

    formData.append("file", file);
    formData.append("site_name", siteName);
    formData.append("netlify_token", netlifyToken);

    fetch(`${url}deploy`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Deploy OK") {
          console.log("Deployed successfully");

          let demo_URL = document.querySelector(`#deploy_url`) as HTMLElement;
          demo_URL.style.display = "block";
          demo_URL.setAttribute("href", data.url);
        } else {
          console.error("Failed to deploy:", data.message);

          let errorMessage = document.querySelector(
            `#errorMessage`
          ) as HTMLElement;
          errorMessage.innerHTML = data.message;
          errorMessage.style.visibility = "visible";

          if (data.response.errors.subdomain.includes("must be unique")) {
            console.error("Failed to deploy: Website name is already taken.");
            errorMessage.innerHTML = "Website name is already taken.";
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

function drawHTMLForDownload(
  dropzoneId: any,
  pageName: any,
  index: any = null
) {
  let dropzone = document.querySelector(`#${dropzoneId}`) as HTMLElement;
  let globalSetData = JSON.parse(
    <string>window.localStorage.getItem(`Global-${pageName}`)
  );
  let cssCode = window.localStorage.getItem("global-css-code");
  let jsCode = window.localStorage.getItem("global-js-code");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8">
        <meta name="description" content="${globalSetData?.seo_description}">
        <meta name="keywords" content="${globalSetData?.seo_keyword}">
        <title>${globalSetData?.page_title}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <link href="${globalSetData?.external_css_url}" rel="stylesheet" crossorigin="anonymous">
        <link href="assets/css/index.css" rel="stylesheet">
        <style>
        .${dropzoneId} {
          border-radius: 0 !important;
          border: none !important;
        }
        .${dropzoneId} {
          background-color: #eaeaea;
          flex-basis: 100%;
          flex-grow: 1;
          margin-bottom: 10px;
          margin-top: 10px;
          padding: 10px;
          border-radius: 10px;
          border: 2px dashed #ccc;
          min-height: 300px;
        }
        
        .dropzone-elem-${index} {
          margin-bottom: 0px;
          margin-top: 0px;
          padding: 4px;
          font-size: 11px;
        }
        ${cssCode}
        </style>
      </head>
      <body>
        ${dropzone.outerHTML}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="${globalSetData?.external_js_url}" crossorigin="anonymous"></script>
        <script>
          ${jsCode}
        </script>
      </body>
    </html>
  `;
  return htmlContent;
}

export function openPreviewModal(kitName: string) {
  // Get the resources for the current kit
  const kit = kits[kitName];

  if (!kit) {
    console.error(`Unknown kit: ${kitName}`);
    return;
  }

  let currentPages = JSON.parse(
    <string>window.localStorage.getItem("currentPageTabs")
  );
  // let currentPageList = `<button type="button" class="tab-list list-group-item list-group-item-action active" id='index' onClick='tabEventHandler(this)'>index.html</button>`;
  let currentPageList = `<ul class="nav nav-tabs defTabs pagesTabs justify-content-center" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id='index' onClick='tabEventHandler(this)' data-bs-toggle="tab" type="button"
            role="tab" aria-selected="false">index.html</button>
        </li>`;
  if (currentPages) {
    for (let i = 0; i < currentPages.length; i++) {
      let pageTab = currentPages[i].split("_@COL@_");
      currentPageList += `<li class="nav-item" role="presentation">
        <button class="nav-link" id='${pageTab[0]}' onClick='tabEventHandler(this)' data-bs-toggle="tab" type="button"
          role="tab" aria-selected="false">${pageTab[1]}</button>
      </li>`;
    }
  }
  currentPageList += "</ul>";

  let previewModal = document.querySelector("#previewModal") as HTMLElement;
  let previewFrame = document.querySelector(
    "#previewFrame"
  ) as HTMLIFrameElement;

  // let currentActiveTab = window.localStorage.getItem('activePageTab');
  let dropzoneId: string | null = "pagesTabContent";
  // if (currentActiveTab !== "") {
  //   dropzoneId = currentActiveTab;
  // }

  let dropzone = document.querySelector("." + dropzoneId);
  // Recursive function to process each component
  // Added processComponent function to handle complex component processing before preview
  // to allow previews of complex layouts
  function processComponent(component: HTMLElement) {
    let processedComponent = component.cloneNode(true) as HTMLElement;

    // Process nested components
    let nestedComponents = processedComponent.querySelectorAll(".component");
    nestedComponents.forEach((nestedComponent: Element) => {
      let processedNestedComponent = processComponent(
        nestedComponent as HTMLElement
      );
      nestedComponent.replaceWith(processedNestedComponent);
    });

    // Generate preview for this component
    let previewComponent = processedComponent;

    return previewComponent;
  }

  let processedContent = processComponent(dropzone as HTMLElement);

  // function getStyleLinks() {
  //   let re = "";
  //   if (Array.isArray(kits[kitName].styles)) {
  //     for (let s of kits[kitName].styles) {
  //       re += `<link type="text/css" rel="stylesheet" href="${s}">`
  //     }
  //   } else {
  //     re += `<link type="text/css" rel="stylesheet" href="${kits[kitName].styles}">`
  //   }
  //   return re;
  // }

  // Load the content of the dropzone into the iframe
  let iframeContent = `
      <html>
        <head>
        <link type="text/css" href="https://appseed-srv1.com/builder/pixel/vendor/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
       ${kits[kitName].styles.map(s => `<link type="text/css" href="${s}" rel="stylesheet">`).join("\n")}
          <style>            
              body {
                display: flex;
                justify-content: center;
                width: 100%;
              }
              .border-dotted, .border-props, .cross-icon { border: none !important; }
              .upButton, .downButton, .cross-icon { display: none !important; }
          </style>
        </head>
        <body style="padding: 15px; text-align: center;">
        <div style="width: 100%;">
            ${currentPageList}
            ${processedContent.outerHTML}
          </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script>
          // Disable contentEditable for all elements
          const allElements = document.getElementsByTagName('*');
          for (let i=0; i<allElements.length; i++) {
            allElements[i].contentEditable = "false";
          }

          // Ensure all links open in a new tab
          const allLinks = document.getElementsByTagName('a');
          for (let i=0; i<allLinks.length; i++) {
            allLinks[i].target = "_blank";
          }
          function tabEventHandler(event) {
            let pagesTabContent = document.querySelector('.pagesTabContent').children;
            for (let i = 0; i < pagesTabContent.length; i++) {
              pagesTabContent[i].classList.remove('active');
              pagesTabContent[i].classList.remove('show');
            }

            let lists = document.querySelector('.pagesTabs').children;
            for (let i = 0; i < lists.length; i++) {
              let leafBtn = lists[i].children;
              leafBtn[0].classList.remove('active');
            }
            event.classList.add('active');
            let activeID = '#page-'+event.id;
            if (event.id == 'index') {
              activeID = '#indexTab';
            }
            let activePreviewTab = document.querySelector(activeID);
            activePreviewTab.classList.add('active');
            activePreviewTab.classList.add('show');
            console.log(event.id, 'my-target');
          };
          function clearActive() {
            let pagesTabContent = document.querySelector('.pagesTabContent').children;
            for (let i = 0; i < pagesTabContent.length; i++) {
              if (i == 0) {
                pagesTabContent[i].classList.add('active');
                pagesTabContent[i].classList.add('show');
              } else {
                pagesTabContent[i].classList.remove('active');
                pagesTabContent[i].classList.remove('show');
              }
            }
          }
          clearActive();
        </script>
      </html>
    `;


  previewFrame.srcdoc = iframeContent;

  // // Assuming iframe is the iframe element
  // const iframeElement = document.querySelector('#previewFrame') as HTMLIFrameElement;
  // let iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow?.document;

  // if (iframeDocument) {
  //   // Add script
  //   let scriptElement = iframeDocument.createElement('script');
  //   scriptElement.src = kits[kitName].script;
  //   iframeDocument.body.appendChild(scriptElement);

  //   for (let s of kits[kitName].styles) {
  //     // Add stylesheet
  //     let linkElement = iframeDocument.createElement('link');
  //     linkElement.rel = 'stylesheet';
  //     linkElement.href = s;
  //     iframeDocument.head.appendChild(linkElement);
  //   }


  //   // Add custom styles
  //   let styleElement = iframeDocument.createElement('style');
  //   styleElement.textContent = kits[kitName].customStyles;
  //   iframeDocument.head.appendChild(styleElement);
  // }

  // Show the modal
  previewModal.style.display = "block";
  previewModal.classList.add("preview-open");
  ``;
}

export function closePreviewModal() {
  let previewModal = document.querySelector("#previewModal") as HTMLElement;

  // Hide the modal
  previewModal.style.display = "none";
  previewModal.classList.remove("preview-open");
}

export function setPreviewMode(mode: "fullScreen" | "tablet" | "mobile") {
  let previewFrame = document.querySelector("#previewFrame") as HTMLElement;

  // Set the width of the iframe based on the selected mode
  switch (mode) {
    case "fullScreen":
      previewFrame.style.width = "100%";
      break;
    case "tablet":
      previewFrame.style.width = "768px";
      break;
    case "mobile":
      previewFrame.style.width = "375px";
      break;
  }
}

let pageTabBtn = document.querySelector(`#index-tabA`);
function addIndexTab() {
  window.localStorage.setItem("activePageTab", "dropzone");
  document.querySelector(".tabPageName")!.innerHTML = "index.html";
  setGlobalInput();
  initDropZone("dropzone", `drop-here-indicator`);
  initGridDropZone(`dropzone`, `drop-here-indicator`);
  setupGlobalEvents("dropzone");
  setNavigation("dropzone");
}
if (pageTabBtn) {
  pageTabBtn.addEventListener("click", () => {
    addIndexTab();
  });
}
// Add Page to Tab

const addBtn = document.querySelector("#add-page-button");
function onAddPage(param = null) {
  let pageTabs = document.querySelector(".pagesTabs");
  let pageTabContent = document.querySelector(".pagesTabContent");
  let liElements: any = pageTabs?.children;
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener("click", function (event: any) {
      event.preventDefault(); // Prevent the default action
    });
  }
  let pageTabsLength: any = pageTabs?.children.length;
  let pageIndex: number = 1;
  if (pageTabsLength > 3) {
    pageIndex = pageTabsLength - 2;
  }
  let tabName = `New-Page${pageIndex}.html`;
  if (param) {
    pageIndex = param[0];
    tabName = param[1];
  }
  let dropZoneID = `dropzone-${pageIndex}`;
  let newPageTab = `
    <button class="nav-link" id="page-tab-${pageIndex}" data-bs-toggle="tab" data-bs-target="#page-${pageIndex}" type="button"
      role="tab" aria-controls="page-${pageIndex}" aria-selected="true">${tabName}</button>
  `;
  let newPageContent = `
    <div id="drop-here-indicator-${pageIndex}"></div>
    <div id="${dropZoneID}" class="${dropZoneID}"></div>
  `;

  let tempContainer = document.createElement("li");
  tempContainer.className = "nav-item";
  tempContainer.setAttribute("role", "presentation");

  let tempContentContainer = document.createElement("div");
  tempContentContainer.className = "tab-pane fade";
  tempContentContainer.id = `page-${pageIndex}`;
  tempContentContainer.setAttribute("role", "tabpanel");
  tempContentContainer.setAttribute("aria-labelledby", `page-tab-${pageIndex}`);

  tempContainer.innerHTML = newPageTab;
  tempContentContainer.innerHTML = newPageContent;
  pageTabContent?.appendChild(tempContentContainer);
  if (pageTabs && pageTabs.hasChildNodes()) {
    const referenceElement = pageTabs?.children[pageTabsLength - 1];
    pageTabs?.insertBefore(tempContainer, referenceElement);
  }
  let newStyle = `
    .${dropZoneID} {
      background-color: #eaeaea;
      flex-basis: 100%;
      flex-grow: 1;
      margin-bottom: 10px;
      margin-top: 10px;
      padding: 10px;
      border-radius: 10px;
      border: 2px dashed #ccc;
      min-height: 300px;
    }
    
    .dropzone-elem-${pageIndex} {
      margin-bottom: 0px;
      margin-top: 0px;
      padding: 4px;
      font-size: 11px;
    }
  `;
  let styleElement = document.createElement("style");
  styleElement.id = `myStyles-${pageIndex}`;
  document.head.appendChild(styleElement);
  styleElement.innerHTML = newStyle;

  let pageTabBtn = document.querySelector(
    `#page-tab-${pageIndex}`
  ) as HTMLButtonElement;
  pageTabBtn.addEventListener("click", function (event) {
    let eleSelected = event.target as HTMLElement;
    window.localStorage.setItem("activePageTab", dropZoneID);
    document.querySelector(".tabPageName")!.innerHTML = eleSelected.innerHTML;
    setGlobalInput(eleSelected.innerHTML);
  });
  pageTabBtn.onclick = () => {
    setTimeout(function () {
      misc(dropZoneID);
    }, 2000);
    let currentTabs = JSON.parse(
      <string>window.localStorage.getItem("currentPageTabs")
    );
    if (currentTabs) {
      if (param) {
        if (currentTabs.indexOf(`${param[0]}_@COL@_${param[1]}`) == -1) {
          currentTabs[currentTabs.length] =
            pageIndex + `_@COL@_New-Page${pageIndex}.html`;
          window.localStorage.setItem(
            "currentPageTabs",
            JSON.stringify(currentTabs)
          );
        }
      } else {
        if (
          currentTabs.indexOf(pageIndex + `_@COL@_New-Page${pageIndex}.html`) ==
          -1
        ) {
          currentTabs[currentTabs.length] =
            pageIndex + `_@COL@_New-Page${pageIndex}.html`;
          window.localStorage.setItem(
            "currentPageTabs",
            JSON.stringify(currentTabs)
          );
        }
      }
    } else {
      window.localStorage.setItem(
        "currentPageTabs",
        JSON.stringify([pageIndex + `_@COL@_New-Page${pageIndex}.html`])
      );
    }

    initDropZone(dropZoneID, `drop-here-indicator-${pageIndex}`);
    initGridDropZone(
      `dropzone-elem-${pageIndex}`,
      `drop-here-indicator-${pageIndex}`
    );
    setupGlobalEvents(dropZoneID);
    setNavigation(dropZoneID);
  };

  pageTabBtn?.click();
  // pageTabBtn.addEventListener("dblclick", function() {
  //   pageTabBtn.setAttribute('contenteditable', 'true');
  // });
  let originalTabName = "";
  pageTabBtn.onclick = (event) => {
    let clickedEle = event.target as HTMLElement;
    originalTabName = clickedEle?.innerHTML;
    pageTabBtn.setAttribute("contenteditable", "true");
  };
  let editedTabName = "";
  pageTabBtn.addEventListener("input", function (event) {
    let newValue = pageTabBtn.innerHTML; // Get the new value
    console.log("Value changed: " + newValue, event.target, pageIndex);
    editedTabName = newValue;
    let originalGlobalSetting: any = window.localStorage.getItem(
      `Global-${originalTabName}`
    );
    if (originalGlobalSetting) {
      window.localStorage.setItem(
        `Global-${editedTabName}`,
        originalGlobalSetting
      );
      window.localStorage.removeItem(`Global-${originalTabName}`);
    }
    let originalCurrentPagesTabs: any = JSON.parse(
      <string>window.localStorage.getItem("currentPageTabs")
    );
    let eleOfCurrentTab = originalCurrentPagesTabs[pageIndex - 1];
    let splitedEle = eleOfCurrentTab.split("_@COL@_");
    let updatedVal = splitedEle[0] + "_@COL@_" + editedTabName;
    document.querySelector(".tabPageName")!.innerHTML = editedTabName;
    originalCurrentPagesTabs[pageIndex - 1] = updatedVal;
    window.localStorage.setItem(
      "currentPageTabs",
      JSON.stringify(originalCurrentPagesTabs)
    );
  });
  pageTabBtn.addEventListener("blur", function () {
    pageTabBtn.setAttribute("contenteditable", "false");
    // if (editedTabName) {
    //   let originalGlobalSetting:any = window.localStorage.getItem(`Global-${originalTabName}`);
    //   if (originalGlobalSetting) {
    //     window.localStorage.setItem(`Global-${editedTabName}`, originalGlobalSetting);
    //     window.localStorage.removeItem(`Global-${originalTabName}`);
    //   }
    //   let originalCurrentPagesTabs:any = JSON.parse(<string>window.localStorage.getItem('currentPageTabs'));
    //   let eleOfCurrentTab = originalCurrentPagesTabs[pageIndex-1];
    //   let updatedVal = eleOfCurrentTab.replace(originalTabName, editedTabName);
    //   originalCurrentPagesTabs[pageIndex-1] = updatedVal;
    //   window.localStorage.setItem('currentPageTabs', JSON.stringify(originalCurrentPagesTabs));
    // }
  });
}
if (addBtn) {
  addBtn.addEventListener("click", () => {
    onAddPage();
  });
}

// SETUP Master DROP Zone
export function initDropZone(param: any, param2: any) {
  let dropEle = document.querySelector("#" + param) as HTMLElement;
  dropEle.ondragover = (event) => {
    onDragOver(event, param2);
  };
  dropEle.ondrop = (event) => {
    onDrop(event, param);
  };
  // document.querySelector('#'+param)!.addEventListener('dragover', (event) => { onDragOver(event, param2) });
  // document.querySelector('#'+param)!.addEventListener('drop', (event) => { onDrop(event, param) });
}

// SETUP GRID Drop Zones
export function initGridDropZone(param: any, param2: any) {
  let dropZones = document.getElementsByClassName(param);
  for (let i = 0; i < dropZones.length; i++) {
    let dropzoneEle = dropZones[i] as HTMLElement;
    dropzoneEle.ondragover = (event) => {
      onDragOver(event, param2);
    };
    dropzoneEle.ondragend = (event) => {
      onDragEnd(event, param);
    };
    dropzoneEle.ondrop = (event) => {
      onDrop(event, param);
    };

    // dropZones[i].addEventListener('dragover', (event) => { onDragOver(event, param2) });
    // dropZones[i].addEventListener('dragend', (event) => { onDragEnd(event) });
    // dropZones[i].addEventListener('drop', (event) => { onDrop(event, param) });
  }
}

// SET GLOBAL INPUT
export function setGlobalInput(param: any = null) {
  let tabPageName = document.querySelector(".tabPageName")?.innerHTML;
  let storageName = `Global-${tabPageName}`;

  if (param) {
    storageName = `Global-${param}`;
  }
  let globalSetData = JSON.parse(
    <string>window.localStorage.getItem(storageName)
  );
  const page_title = document.getElementById("page_title") as HTMLInputElement;
  const seo_description = document.getElementById(
    "seo_description"
  ) as HTMLInputElement;
  const seo_keyword = document.getElementById(
    "seo_keyword"
  ) as HTMLInputElement;
  const external_js_url = document.getElementById(
    "external_js_url"
  ) as HTMLInputElement;
  const external_css_url = document.getElementById(
    "external_css_url"
  ) as HTMLInputElement;
  page_title!.value = "";
  seo_description!.value = "";
  seo_keyword!.value = "";
  external_js_url!.value = "";
  external_css_url!.value = "";
  if (globalSetData) {
    page_title!.value = globalSetData["page_title"];
    seo_description!.value = globalSetData["seo_description"];
    seo_keyword!.value = globalSetData["seo_keyword"];
    external_js_url!.value = globalSetData["external_js_url"];
    external_css_url!.value = globalSetData["external_css_url"];
  }
}

// SETUP PAGE GLOBAL
let globalSetInputs = document.getElementsByClassName("global-set");
for (let i = 0; i < globalSetInputs.length; i++) {
  let globalSet = globalSetInputs[i] as HTMLElement;
  globalSet.onkeyup = (event) => {
    onKeyUpToGlobalSet(event);
  };
  // globalSet?.addEventListener('keyup', (event) => { onKeyUpToGlobalSet(event); });
}

function onKeyUpToGlobalSet(event: any) {
  let id = event.target.id;
  let tabPageName = document.querySelector(".tabPageName")?.innerHTML;
  let globalSetData = JSON.parse(
    <string>window.localStorage.getItem(`Global-${tabPageName}`)
  );
  if (globalSetData) {
    globalSetData[id] = event.target.value;
    window.localStorage.setItem(
      `Global-${tabPageName}`,
      JSON.stringify(globalSetData)
    );
  } else {
    let obj: any = {
      page_title: "",
      seo_description: "",
      seo_keyword: "",
      external_js_url: "",
      external_css_url: "",
    };
    obj[id] = event.target.value;
    window.localStorage.setItem(`Global-${tabPageName}`, JSON.stringify(obj));
  }
}
let currentTabs = JSON.parse(
  <string>window.localStorage.getItem("currentPageTabs")
);
if (currentTabs) {
  for (let i = 0; i < currentTabs.length; i++) {
    // +`_@COL@_New-Page${pageIndex}`
    let tabInfo = currentTabs[i].split("_@COL@_");
    onAddPage(tabInfo);
    onRestore(null, "dropzone-" + tabInfo[0]);
  }
}

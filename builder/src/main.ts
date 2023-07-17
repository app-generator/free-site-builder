import "./style.css";
import {
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onClear,
  onSave,
  onRestore,
  setupGlobalEvents,
} from "./dnd.ts";

//fetch('http://127.0.0.1:5000/kits/bs5/div.html')
//.then(response => response.text())               // response.text() has the component that needs to be saved in
//.then(text => console.log(text))                 // builder-components
//.catch(error => console.error(error));

// Using Promise syntax:
function downloadComponents() {
  //return fetch('http://localhost:5000/kits/bs5/')
  let loading = document.querySelector("#overlay") as HTMLElement;

  let localStorageData = window.localStorage.getItem("components");

  if (localStorageData) {
    let components = JSON.parse(
      <string>window.localStorage.getItem("components")
    );
    for (const component in components) {
      const componentData = components[component];
      let item = createAccordionItem(component, componentData);
      let container = document.getElementById("componentsContainer");
      container?.append(item);
    }
  } else {
    loading.style.display = "flex";

    return fetch("https://components-server.onrender.com/kits/bs5/")
      .then((response) => response.text())
      .then((response_raw) => {
        loading.style.display = "none";
        let response_json = JSON.parse(response_raw);
        let components = response_json.content.components;

        window.localStorage.setItem("components", JSON.stringify(components));

        for (const component in components) {
          const componentData = components[component];
          let item = createAccordionItem(component, componentData);
          let container = document.getElementById("componentsContainer");
          container?.append(item);
        }
      })
      .catch((error) => console.error(error));
  }
}

function createAccordionItem(component: string, componentData: any) {
  // Create the accordion item
  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");

  // Create the accordion header
  const accordionHeader = document.createElement("h2");
  accordionHeader.classList.add("accordion-header");
  accordionHeader.id = `heading-${component}`;

  // Create the accordion button
  const accordionButton = document.createElement("button");
  accordionButton.classList.add("accordion-button", "collapsed");
  accordionButton.type = "button";
  accordionButton.dataset.bsToggle = "collapse";
  accordionButton.dataset.bsTarget = `#collapse-${component}`;
  accordionButton.setAttribute("aria-expanded", "false");
  accordionButton.setAttribute("aria-controls", `collapse-${component}`);
  accordionButton.id = `${component}_btn`;

  // Set the button name from the component value
  accordionButton.innerText = component.replace(/^\w/, (c) => c.toUpperCase());

  // Create the count span
  const countSpan = document.createElement("span");
  countSpan.classList.add("forNumbers");
  countSpan.id = `${component}_count`;
  countSpan.innerText = Object.keys(componentData).length.toString() || "0";

  // Append the count span to the button
  accordionButton.appendChild(countSpan);

  // Append the button to the accordion header
  accordionHeader.appendChild(accordionButton);

  // Create the accordion collapse div
  const accordionCollapse = document.createElement("div");
  accordionCollapse.id = `collapse-${component}`;
  accordionCollapse.classList.add("accordion-collapse", "collapse");
  accordionCollapse.setAttribute("aria-labelledby", `heading-${component}`);
  accordionCollapse.setAttribute("data-bs-parent", "#accordionExample");

  // Create the accordion body
  const accordionBody = document.createElement("div");
  accordionBody.classList.add("accordion-body");

  // Parse the component data from base64 and append it to the body
  for (const key in componentData) {
    let value = componentData[key];
    const decodedComponentData = atob(value);
    accordionBody.innerHTML += decodedComponentData;
  }

  // Append the body to the collapse div
  accordionCollapse.appendChild(accordionBody);

  // Append the header and collapse to the item
  accordionItem.appendChild(accordionHeader);
  accordionItem.appendChild(accordionCollapse);

  return accordionItem;
}

let builderContainer = document.querySelector("#layout")!.innerHTML;
document.querySelector<HTMLDivElement>("#app")!.innerHTML = builderContainer;

// SETUP Navigation
document.querySelector("#action_clear")!.addEventListener("click", (event) => {
  onClear(event);
});
document.querySelector("#action_save")!.addEventListener("click", (event) => {
  onSave(event);
});
document
  .querySelector("#action_restore")!
  .addEventListener("click", (event) => {
    onRestore(event);
  });
document.querySelector("#action_undo")!.addEventListener("click", (event) => {
  onRestore(event);
});

// SETUP Preview
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#action_preview")!
    .addEventListener("click", openPreviewModal);
  document
    .querySelector("#closeModal")!
    .addEventListener("click", closePreviewModal);
  document
    .querySelector("#fullScreenOption")!
    .addEventListener("click", () => setPreviewMode("fullScreen"));
  document
    .querySelector("#tabletOption")!
    .addEventListener("click", () => setPreviewMode("tablet"));
  document
    .querySelector("#mobileOption")!
    .addEventListener("click", () => setPreviewMode("mobile"));
});

// PULL Components
downloadComponents().then(misc);

// SETUP Components
function misc() {
  let draggableElems = document.querySelectorAll(".draggable");

  for (let i = 0; i < draggableElems.length; i++) {
    draggableElems[i].addEventListener("dragstart", (event) => {
      onDragStart(event);
    });
    draggableElems[i].addEventListener("dragend", (event) => {
      onDragEnd(event);
    });
  }
}

function openPreviewModal() {
  let previewModal = document.querySelector("#previewModal") as HTMLElement;
  let previewFrame = document.querySelector(
    "#previewFrame"
  ) as HTMLIFrameElement;
  let dropzone = document.querySelector("#dropzone");

  // Load the content of the dropzone into the iframe
  let iframeContent = `
      <html>
        <head>
          <style>
            ${Array.from(document.styleSheets)
              .map((sheet) => {
                try {
                  return Array.from(sheet.cssRules)
                    .map((rule) => rule.cssText)
                    .join("\n");
                } catch (e) {
                  console.warn("Cannot load styles from stylesheet", e);
                  return "";
                }
              })
              .join("\n")}
          </style>
        </head>
        <body style="padding: 15px;">
          ${dropzone?.innerHTML}
        </body>
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
        </script>
      </html>
    `;
  previewFrame.srcdoc = iframeContent;

  // Show the modal
  previewModal.style.display = "block";
}

function closePreviewModal() {
  let previewModal = document.querySelector("#previewModal") as HTMLElement;

  // Hide the modal
  previewModal.style.display = "none";
}

function setPreviewMode(mode: "fullScreen" | "tablet" | "mobile") {
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

// SETUP Master DROP Zone
document.querySelector("#dropzone")!.addEventListener("dragover", (event) => {
  onDragOver(event);
});
document.querySelector("#dropzone")!.addEventListener("drop", (event) => {
  onDrop(event);
});

// SETUP GRID Drop Zones
let dropZones = document.getElementsByClassName("dropzone-elem");
for (let i = 0; i < dropZones.length; i++) {
  dropZones[i].addEventListener("dragover", (event) => {
    onDragOver(event);
  });
  dropZones[i].addEventListener("dragend", (event) => {
    onDragEnd(event);
  });
  dropZones[i].addEventListener("drop", (event) => {
    onDrop(event);
  });
}

onRestore(null);

setupGlobalEvents();

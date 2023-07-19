import './style.css'
import style from './style.css?inline';
import JSZip from 'jszip';


import { onDragStart, onDragEnd, onDragOver, onDrop, onClear, onSave, onRestore, setupGlobalEvents} from './dnd.ts'

//fetch('http://127.0.0.1:5000/kits/bs5/div.html') 
//.then(response => response.text())               // response.text() has the component that needs to be saved in  
//.then(text => console.log(text))                 // builder-components
//.catch(error => console.error(error));


// Using Promise syntax:
function downloadComponents() {
    let loading = document.querySelector('#overlay') as HTMLElement;
    
    //let localStorageData = window.localStorage.getItem('components');
    //if (localStorageData) {
    //  let localStorageParsedData = JSON.parse(<string>window.localStorage.getItem('components'));
    //  return new Promise((resolve) => {
    //    // Simulating an asynchronous operation
    //    resolve(drawComponents(localStorageParsedData));
    //  });
    //} else {
      loading.style.display = 'flex';
      
      //return fetch('http://127.0.0.1:5000/kits/bs5/')                 // local version
      return fetch('https://components-server.onrender.com/kits/bs5/')  // distant server (default) 
        .then(response => response.text())
        .then( response_raw => {
          loading.style.display = 'none';
          let response_json = JSON.parse( response_raw );
          window.localStorage.setItem('components', JSON.stringify(response_json))
          drawComponents(response_json);
        })
        .catch(error => console.error(error));
    //}
}

function drawComponents(response_json:any) {
  let components = response_json['content']['components'];
  let component = '';
  for (let item in components) {
    let subComponents = components[item];
    let gridStr = '';
    for (let subItem in subComponents) {
      let component_grid_base64 = subComponents[subItem];
      gridStr += atob( component_grid_base64 );

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
  let componentsContainer = document.getElementsByClassName('components_contain')[0];
  var div = document.createElement('div');
  div.innerHTML = component.trim();
  componentsContainer.appendChild(<Node>div);
}


let builderContainer = document.querySelector('#layout')!.innerHTML;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = builderContainer;

// SETUP Navigation
document.querySelector('#action_clear')!.addEventListener('click', (event) => { onClear(event) });
document.querySelector('#action_save')!.addEventListener('click', (event) => { onSave(event) });
document.querySelector('#action_restore')!.addEventListener('click', (event) => { onRestore(event) });
document.querySelector('#action_undo')!.addEventListener('click', (event) => { onRestore(event) });

// SETUP Preview
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#action_preview')!.addEventListener('click', openPreviewModal);
    document.querySelector('#action_download')!.addEventListener('click', downloadHanlder);
    document.querySelector('#closeModal')!.addEventListener('click', closePreviewModal);
    document.querySelector('#fullScreenOption')!.addEventListener('click', () => setPreviewMode('fullScreen'));
    document.querySelector('#tabletOption')!.addEventListener('click', () => setPreviewMode('tablet'));
    document.querySelector('#mobileOption')!.addEventListener('click', () => setPreviewMode('mobile'));
});

// PULL Components 
downloadComponents().then(misc)

// SETUP Components
function misc() {

    let draggableElems = document.querySelectorAll('.draggable');

    for (let i = 0; i < draggableElems.length; i++) {
        draggableElems[i].addEventListener('dragstart', (event) => { onDragStart(event) });
        draggableElems[i].addEventListener('dragend', (event) => { onDragEnd(event) });
    }   
}
function downloadHanlder() {
  const zip = new JSZip();
  let dropzone = document.querySelector('#dropzone') as HTMLElement;

  let tabPageName = document.querySelector(".tabPageName")?.innerHTML;
  let globalSetData = JSON.parse(<string>window.localStorage.getItem(`Global-${tabPageName}`));
  let cssCode = window.localStorage.getItem('global-css-code');
  let jsCode = window.localStorage.getItem('global-js-code');

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
        .dropzone {
          border-radius: 0 !important;
          border: none !important;
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

  // Add the HTML file to the zip
  zip.file('index.html', htmlContent);
  zip.file('assets/css/index.css', style);

  // Generate the zip file
  zip.generateAsync({ type: 'blob' })
    .then(function(content:any) {
      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'builder.zip';

      // Trigger the download
      link.click();
    });
}

function openPreviewModal() {
    let previewModal = document.querySelector('#previewModal') as HTMLElement;
    let previewFrame = document.querySelector('#previewFrame') as HTMLIFrameElement;
    let dropzone = document.querySelector('#dropzone');

    // Load the content of the dropzone into the iframe
    let iframeContent = `
      <html>
        <head>
          <style>
            ${Array.from(document.styleSheets)
              .map(sheet => {
                try {
                  return Array.from(sheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
                } catch (e) {
                  console.warn('Cannot load styles from stylesheet', e);
                  return '';
                }
              })
              .join('\n')}
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
    let previewModal = document.querySelector('#previewModal') as HTMLElement;
  
    // Hide the modal
    previewModal.style.display = "none";
  }
  
  function setPreviewMode(mode: 'fullScreen' | 'tablet' | 'mobile') {
    let previewFrame = document.querySelector('#previewFrame') as HTMLElement;
  
    // Set the width of the iframe based on the selected mode
    switch (mode) {
      case 'fullScreen':
        previewFrame.style.width = "100%";
        break;
      case 'tablet':
        previewFrame.style.width = "768px";
        break;
      case 'mobile':
        previewFrame.style.width = "375px";
        break;
    }
  }

// SETUP Master DROP Zone
document.querySelector('#dropzone')!.addEventListener('dragover', (event) => { onDragOver(event) });
document.querySelector('#dropzone')!.addEventListener('drop', (event) => { onDrop(event) });

// SETUP GRID Drop Zones
let dropZones = document.getElementsByClassName('dropzone-elem');
for (let i = 0; i < dropZones.length; i++) {
    dropZones[i].addEventListener('dragover', (event) => { onDragOver(event) });
    dropZones[i].addEventListener('dragend', (event) => { onDragEnd(event) });
    dropZones[i].addEventListener('drop', (event) => { onDrop(event) });
}

let tabPageName = document.querySelector(".tabPageName")?.innerHTML;
let globalSetData = JSON.parse(<string>window.localStorage.getItem(`Global-${tabPageName}`));
if (globalSetData) {
  document.querySelector("#page_title")!.setAttribute('value', globalSetData['page_title']);
  document.querySelector("#seo_description")!.setAttribute('value', globalSetData['seo_description']);
  document.querySelector("#seo_keyword")!.setAttribute('value', globalSetData['seo_keyword']);
  document.querySelector("#external_js_url")!.setAttribute('value', globalSetData['external_js_url']);
  document.querySelector("#external_css_url")!.setAttribute('value', globalSetData['external_css_url']);
}

// SETUP PAGE GLOBAL
let globalSetInputs = document.getElementsByClassName('global-set');
for (let i = 0; i < globalSetInputs.length; i++) {
  let globalSet = globalSetInputs[i] as HTMLElement;
  globalSet?.addEventListener('keyup', (event) => { onKeyUpToGlobalSet(event); });
}

function onKeyUpToGlobalSet(event: any) {
  let id = event.target.id;
  let tabPageName = document.querySelector(".tabPageName")?.innerHTML;
  let globalSetData = JSON.parse(<string>window.localStorage.getItem(`Global-${tabPageName}`));
  if (globalSetData) {
    globalSetData[id] = event.target.value;
    window.localStorage.setItem(`Global-${tabPageName}`, JSON.stringify(globalSetData));
  } else {
    let obj: any = {
      page_title: '',
      seo_description: '',
      seo_keyword: '',
      external_js_url: '',
      external_css_url: '',
    };
    obj[id] = event.target.value;
    window.localStorage.setItem(`Global-${tabPageName}`, JSON.stringify(obj));
  }
}

onRestore(null);

setupGlobalEvents();

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
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HTML</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <link href="assets/css/index.css" rel="stylesheet">
        <style>
        .dropzone {
          border-radius: 0 !important;
          border: none !important;
        }
        </style>
      </head>
      <body>
        ${dropzone.outerHTML}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
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
  
    // Recursive function to process each component
    // Added processComponent function to handle complex component processing before preview
    // to allow previews of complex layouts
    function processComponent(component: HTMLElement) {
        let processedComponent = component.cloneNode(true) as HTMLElement;

        // Process nested components
        let nestedComponents = processedComponent.querySelectorAll('.component');
        nestedComponents.forEach((nestedComponent: HTMLElement) => {
            let processedNestedComponent = processComponent(nestedComponent);
            nestedComponent.replaceWith(processedNestedComponent);
        });

        // Generate preview for this component
        let previewComponent = processedComponent;

        return previewComponent;
    }

    let processedContent = processComponent(dropzone as HTMLElement);

    // Load the content of the processed dropzone into the iframe
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
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            }
          </style>
        </head>
        <body>
          ${processedContent.outerHTML}
        </body>
      </html>
    `;

    // Set preview mode to active
    window.localStorage.setItem("previewMode", "active");

    previewFrame.srcdoc = iframeContent;

    // Show the modal
    previewModal.style.display = "block";

    // Add a class to the body to indicate that the preview is open
    previewModal.classList.add('preview-open');
  }
  
  function closePreviewModal() {
    let previewModal = document.querySelector('#previewModal') as HTMLElement;
  
    // Hide the modal
    previewModal.style.display = "none";

    // Set preview mode to inactive
    window.localStorage.setItem("previewMode", "inactive");
    previewModal.classList.remove('preview-open');
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

onRestore(null);

setupGlobalEvents();

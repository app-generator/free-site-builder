import './style.css'
import { onDragStart, onDragEnd, onDragOver, onDrop, onClear, onSave, onRestore, setupGlobalEvents} from './dnd.ts'

//fetch('http://127.0.0.1:5000/kits/bs5/div.html') 
//.then(response => response.text())               // response.text() has the component that needs to be saved in  
//.then(text => console.log(text))                 // builder-components
//.catch(error => console.error(error));

// Using Promise syntax:
function downloadComponents() {

    //return fetch('http://localhost:5000/kits/bs5/')
    return fetch('https://components-server.onrender.com/kits/bs5/')
      .then(response => response.text())
      .then( response_raw => {

        //console.log( response_raw );    

        let response_json = JSON.parse( response_raw );

        let component_base64 = response_json['content']['components']['general']['card.html'];
        let component        = atob( component_base64 );

        //console.log( component );

        let componentsContainer = document.getElementsByClassName('builder-components')[0];

        var div = document.createElement('div');
        div.innerHTML = component.trim();

        componentsContainer.appendChild(<Node>div.firstChild);

      })
      .catch(error => console.error(error));
}

let builderContainer = document.querySelector('#layout')!.innerHTML;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = builderContainer;

// SETUP Navigation
document.querySelector('#action_clear')!.addEventListener('click', (event) => { onClear(event) });
document.querySelector('#action_save')!.addEventListener('click', (event) => { onSave(event) });
document.querySelector('#action_restore')!.addEventListener('click', (event) => { onRestore(event) });
document.querySelector('#action_undo')!.addEventListener('click', (event) => { onRestore(event) });

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

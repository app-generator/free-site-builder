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

import { imageExists } from "./utiles";

export function setupGlobalEvents(param: any) {

    document.querySelector('#'+param)?.addEventListener('click', event => {
        event.stopPropagation();
    });        
}

export function uuidv4() {
    return 'uuid' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
} 

export function onDragStart(event: any, param: any) {

    console.log(' > onDrag_START() ', event, param);

    const draggableElement = event.currentTarget;

    event
        .dataTransfer
        .setData('text/plain', draggableElement.id);

    draggableElement
        .style
        .backgroundColor = 'white';

    // onSave(event, param);
}

export function onDragOver(event: any, param2: any) {

    console.log(' > onDrag_OVER() ');

    let dropIndicator = <HTMLElement>document.getElementById(param2);
    dropIndicator.style.display = 'none';

    // Remove all previous    
    remClassProcessor('border-dotted');

    event.target.classList.add('border-dotted');
    event.preventDefault();
}

const onPutDelete = (component: any, param: any) => {

    console.log("' > onPutDelete() '");

    const editableComponent = component;

    const spanElement = document.createElement("span");
    spanElement.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    spanElement.className = "cross-icon";
    spanElement.onclick = function() {
        onDelete(editableComponent, param);
    };

    const contentElement = document.createElement("span");
    contentElement.innerHTML = editableComponent.innerHTML.trim();
    contentElement.style.display = "block";
    contentElement.style.border = "1px solid transparent";
    contentElement.id = editableComponent.id;
    contentElement.onclick = function(event) {
        onClick( event )
    };

    editableComponent.innerHTML = "";
    editableComponent.appendChild(spanElement);
    editableComponent.appendChild(contentElement);
}

const onReposition = (component: any, param: any) => {

    console.log("' > onReposition() '");

    const editableComponent = component;

    const upElement = document.createElement("span");
    upElement.innerHTML = "<i class='fa-solid fa-caret-up'></i>";
    upElement.className = "upButton";
    upElement.onclick = function() {
        var prevElement = editableComponent.previousElementSibling;
        if (prevElement) {
            editableComponent.parentNode?.insertBefore(editableComponent, prevElement);
        }
    }

    const downElement = document.createElement("span");
    downElement.innerHTML = "<i class='fa-solid fa-caret-down'></i>";
    downElement.className = "downButton";
    downElement.onclick = function() {
        var nextElement = editableComponent.nextElementSibling;
        if (nextElement) {
            editableComponent.parentNode?.insertBefore(nextElement, editableComponent);
        }
    }

    const spanElement = document.createElement("span");
    spanElement.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    spanElement.className = "cross-icon";
    spanElement.onclick = function() {
        onDelete(editableComponent, param);
    };

    const contentElement = document.createElement("span");
    contentElement.innerHTML = editableComponent.innerHTML.trim();
    contentElement.style.display = "block";
    contentElement.style.border = "1px solid transparent";
    contentElement.id = editableComponent.id;
    contentElement.onclick = function(event) {
        onClick( event )
    };

    editableComponent.innerHTML = "";
    editableComponent.appendChild(upElement);
    editableComponent.appendChild(downElement);
    editableComponent.appendChild(spanElement);
    editableComponent.appendChild(contentElement);
}

export function onDragEnd(event: any, param: any) {

    console.log(' > onDrag_END() ', param);

    // Remove all previous    
    remClassProcessor('border-dotted');

    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = '#ffffff';

    onSave(event, param);
}

export function onDrop(event: any, param: any) {

    

    const placeholder_id = event.dataTransfer.getData('text');
    const id = placeholder_id.replace('-placeholder', '');

    let element = <HTMLElement>document.getElementById(id);

    if (!element) {
        //console.log(' > NULL element: ' + id);
        return;
    }

    console.log(' > on_DROP() -> ' + id);

    let editableComponent = element.cloneNode(true) as HTMLElement;
    let content = <HTMLElement>document.querySelector('.drop-indicator');

    if (content) {
        content.className = "d-none";
    }

    console.log(' > CONTAINER: ' + event.target.id);
    console.log(' > Component: ' + editableComponent.dataset.type);

    // Customization
    editableComponent.id = uuidv4();

    if (event.target.id?.includes('grid-')) {
        event.target.innerHTML = '';
    }

    //editableComponent.innerHTML += editableComponent.id;
    editableComponent.classList.remove('draggable');
    editableComponent.classList.add('component');
    editableComponent.removeAttribute('draggable');
    editableComponent.style.display = 'block';
    
    // Some Stuff 
    if (event.target.id == param) {
        onReposition(editableComponent, param);    // reorder & delete
    } else {
        onPutDelete(editableComponent, param);     // put only delete
    }

    // Make it CLICK-able
    editableComponent.addEventListener('click', (event) => { onClick(event); });

    // Activate Mouse Over
    editableComponent.addEventListener('mouseover', (event) => { onMouseOver(event); });
    //editableComponent.addEventListener('mouseout', (event) => { event; remClassProcessor('border-props'); });

    // Inject component in the builder
    //const dropzone = <HTMLElement>document.querySelector('#dropzone');
    //dropzone.appendChild(editableComponent);
    event.target.appendChild(editableComponent);

    // Done with this event
    event.dataTransfer.clearData();
}

export function onDelete(element: any, param: any) {

    console.log(' > on_DELETE() ');

    element.style.display = "none";
    const localStorageData = window.localStorage.getItem(`editME-${param}`)?.split(param)[1] || "";

    var div = document.createElement('div');
    div.id = param;
    div.innerHTML = localStorageData.trim();

    const children = Array.from(div.children);
    const updatedData = children.filter(item => item.id !== element.id);

    div.innerHTML = param;
    updatedData.forEach(item => {
        div.appendChild(item);
    });

    // window.localStorage.setItem('editME', div.innerHTML)
}

export function getElemName(aElement: HTMLElement) {

    let aNodeType = aElement.nodeName;

    if ('P' === aNodeType) {
        return 'Paragraph';
    } else if ('A' === aNodeType) {
        return 'Anchor';
    } else if ('DIV' === aNodeType) {
        return 'DIV';
    } else if ('H5' === aNodeType) {
        return 'H5 Tag';
    } else {
        return aNodeType;
    }
}

export function getElemProps(aElement: HTMLElement) {

    let aNodeType = aElement.nodeName;

    if ('P' === aNodeType) {
        return 'CSS, HtmlEdit';
    } else if ('A' === aNodeType) {
        return 'CSS, HREF'; // + aElement.getAttribute('href');
    } else if ('DIV' === aNodeType) {
        return 'CSS, HtmlEdit';
    } else if ('H5' === aNodeType) {
        return 'CSS, HtmlEdit';
    } else {
        return aNodeType.trim();
    }
}

export function onMouseOver(event: any) {

    console.log(' > on_MouseOver()');

    if (!event.target.id) {
        event.target.id = uuidv4();
    }

    let elem = <HTMLElement>document.getElementById(event.target.id);

    console.log(' > id: ' + elem.id);
    console.log(' > type: ' + elem.nodeName);

    let targetComponent = event.target;

    // Remove previous 
    remClassProcessor('border-props');

    // Update CSS
    targetComponent.classList.add('border-props');
}

export function onClick(event: any) {

    console.log(' > on_CLICK() ');

    let targetComponent;

    if (event.target.classList.contains('component')) {
        targetComponent = event.target;
    } else {
        targetComponent = event.target.closest('.component');
    }

    if (targetComponent.id && !(targetComponent.id.includes('uuid'))) {
        console.log(' > GRID Component, skip the edit');
        event.preventDefault();
        return;
    }

    // Save the active Component
    window.localStorage.setItem("activeComponent", targetComponent.id);

    // In place edit
    targetComponent.contentEditable = 'true';

    console.log(' > ACTIVE Component: ' + targetComponent.id);

    // Remove previous 
    remClassProcessor('border-dotted');

    // Update CSS
    targetComponent.classList.add('border-dotted');

    if (!hasSiblings(event.target)) {
        let elem = <HTMLElement>document.getElementById(event.target.id);

        let propsPanel_title = <HTMLElement>document.querySelector('#builder-props-title');
        let propsPanel_content = <HTMLElement>document.querySelector('#builder-props-content');
        let propsPanel_attribute = <HTMLElement>document.querySelector('#builder-props-attribute');

        let propsStyle_content = <HTMLElement>document.querySelector('#builder-style-content');
        let propsClass_content = <HTMLElement>document.querySelector('#builder-class-content');
        let propsClassList_content = <HTMLElement>document.querySelector('#builder-class-list');


        propsPanel_title.className = "p-2 rounded-1 border mb-2 bg-light text-center";
        propsPanel_content.className = "rounded-1";
        propsPanel_attribute.className = "rounded-1";
        
        propsStyle_content.className = "rounded-1";

        propsPanel_title.innerHTML = 'Component<br />' + event.target.id;

        if (elem?.nodeName !== "IMG")
            propsPanel_content.innerHTML = '<div class="newClass"><input id="props_text" class="form-control text-left" data-target="' + event.target.id + '" value="' + event.target.innerHTML + '" /></div>';
        
        propsStyle_content.innerHTML = '<div class="newClass-2"><input id="styles_text" class="form-control text-left" data-target="' + event.target.id + '" value="' + event.target.style.cssText + '" /></div>';
        propsClass_content.innerHTML = '<div class="newClass-2"><input id="classes_text" class="form-control text-left" placeholder="Add new class" data-target="' + event.target.id + '" /></div>';

        let temporary_id = 'classList-temp';
        let temporary_id_ary = [];
        let classLists = event.target.classList;
        let classListsHTML = '<div class="setClassList">';
        for (let i = 0; i < classLists.length; i++) {
            temporary_id_ary.push(temporary_id + '-' + i);
            classListsHTML += `<a href='#' id="${temporary_id}-${i}" class="setClassItem">${classLists[i]}</a> &nbsp;&nbsp;&nbsp;`;
        }
        classListsHTML += '</div>';
        classListsHTML += '<p style="font-size:12px;">(click to remove)</p>';
        propsClassList_content.innerHTML = classListsHTML;
        let selectedComponent = event.target;
        let propsPanel_attr_input, propsPanel_input, stylePanel_input, classPanel_input, setClassItem_button;
        if (elem?.nodeName && (elem.nodeName === "A" || elem.nodeName === "IMG")) {
            const attrVal = elem.nodeName === "A" ? event.target.href : event.target.src;
            propsPanel_attribute.innerHTML = '<div class="newClass"><input id="props_attribute" class="form-control" data-target="' + event.target.id + '" value="' + attrVal + '" /></div>';
            propsPanel_attr_input = <HTMLElement>document.querySelector('input#props_attribute');
            propsPanel_attr_input.addEventListener('keyup', (event) => { onKeyUp(event, selectedComponent, elem.nodeName); });

            if (elem.nodeName === "IMG") {
                propsPanel_input = <HTMLElement>document.querySelector('input#props_text');
                propsPanel_input?.remove();
            }
        } else {
            propsPanel_attr_input = <HTMLElement>document.querySelector('input#props_attribute');
            propsPanel_attr_input?.remove();
        }

        propsPanel_input = <HTMLElement>document.querySelector('input#props_text');
        propsPanel_input?.addEventListener('keyup', (event) => { onKeyUp(event, selectedComponent, 'content'); });

        stylePanel_input = <HTMLElement>document.querySelector('input#styles_text');
        stylePanel_input?.addEventListener('keyup', (event) => { onKeyUp(event, selectedComponent, 'styles'); });

        classPanel_input = <HTMLElement>document.querySelector('input#classes_text');
        classPanel_input?.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                onKeyUp(event, selectedComponent, 'classes');
            }
        });
        for (let j = 0; j < temporary_id_ary.length; j++) {
            setClassItem_button = <HTMLElement>document.querySelector(`#${temporary_id_ary[j]}`);
            setClassItem_button?.addEventListener('click', (event) => {
                onPressClassItem(event, selectedComponent);
            });
        }

    } else {
        console.log(' > Nested COMPONENT, skip PROPS');
    }

    event.stopPropagation();
    event.preventDefault();
}

export function hasSiblings(aNode: HTMLElement) {

    if (!aNode)
        return false;

    let siblings = [];
    let sibling = aNode.firstChild;

    while (sibling) {
        if (sibling.nodeType === 1) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    if (siblings.length > 0)
        return true;
    else
        return false;
}

export function remClassProcessor(aClass: string) {

    let elems = document.getElementsByClassName(aClass);

    if (elems) {
        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove(aClass);
        }
    }
}

export function onPressClassItem(event: any, target: any) {
    let classNameToRemove = event.target.innerText;
    target.classList.remove(classNameToRemove);
    target.click();
}

export async function onKeyUp(event: any, target: any, flag: string) {

    const target_id = target.id;

    if (target) {
        if (flag === 'A') {
            target.setAttribute('href', event.target.value);
        } else if (flag === 'IMG') {
            if (await imageExists(event.target.value)){
                target.setAttribute('src', event.target.value);
                if(document.getElementsByClassName("img-warning")?.length > 0) document.querySelector(".img-warning")?.remove();
            } else {
                if(document.getElementsByClassName("img-warning")?.length === 0){
                    let imgAttrinput = event.target;
                    imgAttrinput.insertAdjacentHTML('afterend', '<div class="img-warning"><img src="/img/warning.png" width="35" alt="W" /></div>');
                }
            }

        } else if (flag === 'styles') {
            target.style.cssText = event.target.value;
        } else if (flag === 'classes') {
            target.classList.add(event.target.value);
            target.click();
        } else {
            target.innerHTML = event.target.value;
        }
    } else {
        console.log(' > NULL target:' + target_id);
    }  
}

export function onClear(event: any, param: any) {

    // fake the usage    
    event; param;

    console.log(' > ACTION: clear');

    window.localStorage.setItem('activePageTab', 'dropzone');
    let currentTabs = JSON.parse(<string>window.localStorage.getItem('currentPageTabs'));
    if (currentTabs) {
        for (let i = 0; i < currentTabs.length; i++) {
            let eachTabs = currentTabs[i].split('_@COL@_');
            window.localStorage.removeItem(`Global-${eachTabs[1]}`);
            window.localStorage.removeItem(`editME-dropzone-${eachTabs[0]}`);
            window.localStorage.removeItem(`currentPageTabs`);
            let pageTabs = document.querySelector('.pagesTabs')!.children;
            pageTabs[eachTabs[0]*1+1-i].remove();
        }
    }

    window.localStorage.removeItem('editME-dropzone');
    window.localStorage.removeItem('Global-index.html');

    window.location.reload(); 
}

export function onSave(event: any, param: any) {
    event;
    console.log(' > ACTION: save', param);
    let content = <HTMLElement>document.querySelector('#'+param);
    window.localStorage.setItem(`editME-${param}`, content.innerHTML);

    // need this for active components
    window.location.reload();
}

export function onRestore(event: any, param: any) {

    event; // fake the usage

    console.log(' > ACTION: restore', param);

    let content = <HTMLElement>document.querySelector('#'+param);

    let saved_content = <string>window.localStorage.getItem(`editME-${param}`);
    
    // Check that we have data to restore
    if (!saved_content) {
        return;
    }

    // update
    content.innerHTML = saved_content;

    let elems = content.getElementsByClassName("component");

    if (elems) {
        for (let i = 0; i < elems.length; i++) {
            const draggableElement = elems[i];

            draggableElement.addEventListener('click', onClick);

            const upButton = draggableElement.querySelector('.upButton');
            const downButton = draggableElement.querySelector('.downButton');
            const crossButton = draggableElement.querySelector('.cross-icon');
            const parentElement = draggableElement.parentElement;

            if (parentElement) {
                if (upButton) {
                    upButton.addEventListener('click', function() {
                        const currentIndex = Array.from(parentElement.children).indexOf(draggableElement);
                        if (currentIndex > 0) {
                            const previousElement = parentElement.children[currentIndex - 1];
                            parentElement.insertBefore(draggableElement, previousElement); 
                        } 
                    });
                }
                if (downButton) {
                    downButton.addEventListener('click', function() {  
                        const currentIndex = Array.from(parentElement.children).indexOf(draggableElement);
                        if (currentIndex < parentElement.children.length - 1) {
                            const nextElement = parentElement.children[currentIndex + 1];
                            parentElement.insertBefore(nextElement, draggableElement);
                        }
                    });
                }
                if (crossButton) {
                    crossButton.addEventListener('click', function() {  
                        onDelete(draggableElement, param);
                    });
                }
            }
        }
    } else {
        console.log(' > NULL ELEMs ');
    }
}

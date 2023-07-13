export function setupGlobalEvents() {

    document.querySelector('#dropzone')?.addEventListener('click', event => {
        event.stopPropagation();
    })
}

export function uuidv4() {
    return 'uuid' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function onDragStart(event: any) {
    console.log(' > onDrag_START() ');

    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = 'yellow';

    onSave(event);
}

export function onDragEnd(event: any) {
    console.log(' > onDrag_END() ');

    // Remove all previous    
    remClassProcessor('border-dotted');

    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = '#4AAE9B';
}

export function onDragOver(event: any) {
    console.log(' > onDrag_OVER() ');

    // Remove all previous    
    remClassProcessor('border-dotted');

    event.target.classList.add('border-dotted');
    event.preventDefault();
}

export function onDrop(event: any) {

    console.log(' > on_DROP() ');

    const id = event.dataTransfer.getData('text');

    let editableComponent = <HTMLElement>document.getElementById(id)!.cloneNode(true);

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

    // Make it CLICK-able
    editableComponent.addEventListener('click', (event) => { onClick(event); });

    /*
    // Some Stuff 
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
        onDelete(editableComponent);
    };

    const contentElement = document.createElement("span");
    contentElement.innerHTML = editableComponent.innerHTML.trim();
    contentElement.style.display = "block";
    contentElement.id = editableComponent.id;
    contentElement.onclick = function(event) {
        onClick( event )
    };

    editableComponent.innerHTML = "";
    editableComponent.appendChild(upElement);
    editableComponent.appendChild(downElement);
    editableComponent.appendChild(spanElement);
    editableComponent.appendChild(contentElement);
    */

    // Inject component in the builder
    //const dropzone = <HTMLElement>document.querySelector('#dropzone');
    //dropzone.appendChild(editableComponent);
    event.target.appendChild(editableComponent);

    // Done with this event
    event.dataTransfer.clearData();
}

export function onDelete(element: any) {

    console.log(' > on_DELETE() ');

    element.style.display = "none";
    const localStorageData = window.localStorage.getItem('editME')?.split("dropzone")[1] || "";

    var div = document.createElement('div');
    div.id = 'dropzone';
    div.innerHTML = localStorageData.trim();

    const children = Array.from(div.children);
    const updatedData = children.filter(item => item.id !== element.id);

    div.innerHTML = 'dropzone';
    updatedData.forEach(item => {
        div.appendChild(item);
    });

    window.localStorage.setItem('editME', div.innerHTML)
}

export function onClick(event: any) {

    console.log(' > on_CLICK() ');

    var targetComponent;

    if(event.target.classList.contains('component')){
        targetComponent = event.target;
    } else {
        targetComponent = event.target.closest('.component');
    }

    if (targetComponent.id && !(targetComponent.id.includes('uuid'))) {
        //console.log(' > ['+event.target.id+'] NOT a Component, skip the edit');
        console.log(' > GRID Component, skip the edit');
        event.preventDefault();
        return;
    }

    // In place edit
    targetComponent.contentEditable = 'true';

    console.log(' > ACTIVE Component: ' + targetComponent.id);

    // Remove previous 
    remClassProcessor('border-dotted');

    // Update CSS
    targetComponent.classList.add('border-dotted');

    if ( ! hasSiblings( event.target ) ) {

        let propsPanel_title = <HTMLElement>document.querySelector('#builder-props-title');
        let propsPanel_content = <HTMLElement>document.querySelector('#builder-props-content');
    
        propsPanel_title.innerHTML = 'Props for ' + targetComponent.id;
    
        propsPanel_content.innerHTML = '<input id="props_text" data-target="'+event.target.id+'" value="' + event.target.innerHTML + '" />';
    
        let propsPanel_input = <HTMLElement>document.querySelector('input#props_text'  );
        propsPanel_input.addEventListener('keyup', (event) => { onKeyUp( event ); });
    
    } else {
        console.log(' > Nested COMPONENT, skip PROPS');
    }

    event.stopPropagation();
    event.preventDefault();
}

export function hasSiblings(aNode: HTMLElement) {

    if ( !aNode )
        return false;

    let siblings = [];    
    let sibling  = aNode.firstChild;

    while (sibling) {
        if (sibling.nodeType === 1) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    if ( siblings.length > 0)
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

export function onKeyUp(event: any) {
    event;
    //if (event.key === 'Enter' || event.keyCode === 13) {
    const target_id = event.target.id;
    //console.log(' > Save TEXT for ' + target_id);

    let activeComponent = document.querySelector('#' + target_id);
    if (activeComponent) {
        activeComponent.innerHTML = event.target.innerHTML;
    } else {
        console.log(' > NULL target:' + target_id);
    }
    //}    
}

export function onClear(event: any) {
    event;
    console.log(' > ACTION: clear');
    let content = <HTMLElement>document.querySelector('#dropzone');
    // clear
    content.innerHTML = 'dropzone';
    window.localStorage.clear();
    //let builderContainer = document.querySelector('#layout')!.innerHTML;
    //document.querySelector<HTMLDivElement>('#app')!.innerHTML = builderContainer;    
}

export function onSave(event: any) {
    event;
    console.log(' > ACTION: save');
    let content = <HTMLElement>document.querySelector('#dropzone');
    window.localStorage.setItem("editME", content.innerHTML);
}

export function onRestore(event: any) {

    event; // fake the usage

    console.log(' > ACTION: restore');
    let content = <HTMLElement>document.querySelector('#dropzone');

    let saved_content = <string>window.localStorage.getItem("editME");

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

            const upElement = document.createElement("span");
            upElement.innerHTML = "<i class='fa-solid fa-caret-up'></i>";
            upElement.className = "upButton";
            upElement.onclick = function () {
                var prevElement = draggableElement.previousElementSibling;
                if (prevElement) {
                    draggableElement.parentNode?.insertBefore(draggableElement, prevElement);
                    i--;
                }
            }
            const downElement = document.createElement("span");
            downElement.innerHTML = "<i class='fa-solid fa-caret-down'></i>";
            downElement.className = "downButton";
            downElement.onclick = function () {
                var nextElement = draggableElement.nextElementSibling;
                if (nextElement) {
                    draggableElement.parentNode?.insertBefore(nextElement, draggableElement);
                    i++;
                }
            }
            const crossElement = document.createElement("span");
            crossElement.innerHTML = "<i class='fa-solid fa-xmark'></i>";
            crossElement.className = "cross-icon";
            crossElement.onclick = function () {
                onDelete(draggableElement);
            };

            const contentElement = document.createElement("span");
            contentElement.innerHTML = draggableElement.innerHTML.trim();
            contentElement.style.display = "block";
            contentElement.id = draggableElement.id;
            contentElement.onclick = function (event) {
                onClick(event)
            };

            draggableElement.innerHTML = "";
            draggableElement.appendChild(upElement);
            draggableElement.appendChild(downElement);
            draggableElement.appendChild(crossElement);
            draggableElement.appendChild(contentElement);
        }
    } else {
        console.log(' > NULL ELEMs ');
    }
}


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

function downloadComponents() {
  return fetch("https://components-server.onrender.com/kits/bs5/")
    .then((response) => response.text())
    .then((response_raw) => {
      let response_json = JSON.parse(response_raw);

      let card_bas64 =
        response_json["content"]["components"]["general"]["card.html"];
      let card_component = atob(card_bas64);
      let cardContainer =
        document.getElementsByClassName("card-components")[0];
      var div = document.createElement("div");
      div.innerHTML = card_component.trim();

      cardContainer.appendChild(div.firstChild);

      //  For Grid
      let grid2Rows_base64 =
        response_json["content"]["components"]["grid"]["grid-2rows.html"];
      let grid2Rows = atob(grid2Rows_base64);
      console.log("grid-2rows", grid2Rows);

      let grid3Rows_base64 =
        response_json["content"]["components"]["grid"]["grid-3rows.html"];
      let grid3Rows = atob(grid3Rows_base64);
      console.log("grid-3rows", grid3Rows);

      let grid4Rows_base64 =
        response_json["content"]["components"]["grid"]["grid-4rows.html"];
      let grid4Rows = atob(grid4Rows_base64);
      console.log("grid-4rows", grid4Rows);

      let gridContainer = document.getElementsByClassName("grid-components")[0];

      var div2Rows = document.createElement("div");
      div2Rows.innerHTML = grid2Rows.trim();
      gridContainer.appendChild(div2Rows.firstChild);

      var div3Rows = document.createElement("div");
      div3Rows.innerHTML = grid3Rows.trim();
      gridContainer.appendChild(div3Rows.firstChild);

      var div4Rows = document.createElement("div");
      div4Rows.innerHTML = grid4Rows.trim();
      gridContainer.appendChild(div4Rows.firstChild);

      // For Footer
      let footer_base64 =
      response_json["content"]["components"] ['footers'] ['footer.html'];
    let footer_component = atob(footer_base64);
    console.warn('footer',footer_component);
    
    let footersContainer =
      document.getElementsByClassName("footer-components")[0];
    var div = document.createElement("div");
    div.innerHTML = footer_component.trim();

    footersContainer.appendChild(div.firstChild);


    })
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
  let builderContainer = document.querySelector("#layout")!.innerHTML;
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = builderContainer;

  // SETUP Navigation
  document
    .querySelector("#action_clear")
    ?.addEventListener("click", (event) => {
      onClear(event);
    });
  document.querySelector("#action_save")?.addEventListener("click", (event) => {
    onSave(event);
  });
  document
    .querySelector("#action_restore")
    ?.addEventListener("click", (event) => {
      onRestore(event);
    });
  document.querySelector("#action_undo")?.addEventListener("click", (event) => {
    onRestore(event);
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

  // SETUP Master DROP Zone
  document.querySelector("#dropzone")?.addEventListener("dragover", (event) => {
    onDragOver(event);
  });
  document.querySelector("#dropzone")?.addEventListener("drop", (event) => {
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
});
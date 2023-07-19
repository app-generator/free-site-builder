export const getParse = (item: string) => {
  try {
    let div = document.createElement("div");
    div.innerHTML = item;
    return div.firstElementChild;
  } catch (err) {
    console.log("Error JSONParse");
    return null;
  }
};

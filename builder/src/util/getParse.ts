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
export const getParseLS = (item: string) => {
  try {
    const items= JSON.parse(item);
    return Object.values(items).join("");
  } catch (err) {
    console.log("Error JSONParse");
    return null;
  }
};

import { WIDGETITEMS } from "../constants/items.ts";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(WIDGETITEMS);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(WIDGETITEMS, serializedState);
  } catch {
    console.log("Error set LS");
  }
};

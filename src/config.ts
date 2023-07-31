let BACKEND_URL = "";
let UI_KIT = "";

export const Config = {
  get backendUrl() {
    return BACKEND_URL;
  },
  set backendUrl(url: string) {
    console.log(`Set backendUrl to ${url}`);
    BACKEND_URL = url;
  },
  get uiKit() {
    return UI_KIT;
  },
  set uiKit(kit: string) {
    console.log(`Set uiKit to ${kit}`);
    UI_KIT = kit;
  },
};

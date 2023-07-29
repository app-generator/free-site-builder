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

export function checkURL(image_url: string) {
    return (image_url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function validURL(str:string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export function imageExists(image_url: string) {
    if (!validURL(image_url)) return false;

    return true;
}
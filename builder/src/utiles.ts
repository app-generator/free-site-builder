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

    return new Promise<boolean>((resolve) => {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, true);
        http.timeout = 1500; // 1.5 seconds timeout
        http.onload = function () {
            resolve(http.status != 404);
        };
        http.onerror = function () {
            // reject(new Error('Network error'));
            resolve(false)
        };
        http.ontimeout = function () {
            // reject(new Error('Timeout error'));
            resolve(false)
        };
        http.send();
    });
}
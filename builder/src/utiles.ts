export function imageExists(image_url:string){
    return new Promise<boolean>((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, true);
        http.timeout = 1000; // 1 seconds timeout
        http.onload = function() {
            resolve(http.status != 404);
        };
        http.onerror = function() {
            // reject(new Error('Network error'));
            resolve(false)
        };
        http.ontimeout = function() {
            // reject(new Error('Timeout error'));
            resolve(false)
        };
        http.send();
    });
}
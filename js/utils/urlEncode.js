export function urlEncode(urlObj){
    return Object.entries(urlObj)
    .join("&")
    .replace(/,/g, "=")
    .replace(/#/g, "%23");
}
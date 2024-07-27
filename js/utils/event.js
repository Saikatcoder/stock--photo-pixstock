export function addonEvenetElement (elements, eventType, callback){
    elements.forEach(element=> element.addEventListener(eventType, callback));
}
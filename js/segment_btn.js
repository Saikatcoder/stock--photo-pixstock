import { addonEvenetElement } from "./utils/event.js";
export const segment = function(segment , callback){
    const segmentBtns = segment.querySelectorAll("[data-segment-btn]");
    let lastSelectSegment = segment.querySelector("[data-segment-btn].selected");
    addonEvenetElement(segmentBtns , "click" , function(){
        lastSelectSegment.classList.remove("selected")
        this.classList.add("selected")
        lastSelectSegment = this;
        callback(this.dataset.segmentValue)
    })
}
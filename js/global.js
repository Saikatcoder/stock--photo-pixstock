import { ripple } from "./utils/ripple.js";
import{addonEvenetElement} from "./utils/event.js";
import { ulrDecode } from "./utils/urlDecode.js";
const header = document.querySelector("[data-header]");

window.addEventListener("scroll" , ()=>{
    header.classList[window.scrollY > 50 ? "add" : "remove"]("active")
})

// add ripple effect

const rippleElems = document.querySelectorAll("[data-ripple]")
rippleElems.forEach(rippleElem => ripple(rippleElem));

// nav toggle
const navTroggler = document.querySelectorAll(".nav-troggler-btn")

const navBar = document.querySelector(".navigation")
const scrim = document.querySelector(".scrim")

addonEvenetElement(navTroggler,"click" , ()=>{
    navBar.classList.toggle("show");
    scrim.classList.toggle("active");
} )





window.filterObj = {};
// show all filter option reload
if(window.location.search.slice(1)){
    const search = ulrDecode(window.location.search.slice(1));
    
    Object.entries(search).forEach(item =>{
        const filterkey =item[0];
        const filtervalue = item[1];
        window.filterObj[filterkey ] = filtervalue;

        if(filterkey !== "query"){
            const filterItems =document.querySelector(`[data-filter="${filterkey}"]`);
            filterItems ?.querySelector("[data-filter-chip]").classList.add("selected");
            if(filterItems){
                filterItems.querySelector("[data-filter-value]").innerText = filtervalue;
                
            }
        }
    })
}

// favorite object

if(!window.localStorage.getItem("favorite")){
    const favoriteObj = {
        photos: {},
        videos : {},
    }

    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}

window.addEventListener("loadstart" ,()=>{
    document.body.style.opacity ="0";
});
window.addEventListener("DOMContentLoaded" ,()=>{
    document.body.style.opacity ="1";
})
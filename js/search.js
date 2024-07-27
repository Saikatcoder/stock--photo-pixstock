import { addonEvenetElement } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import{ripple} from "./utils/ripple.js";
import { updateUrl } from "../js/utils/updateUrl.js";
import { ulrDecode } from "../js/utils/urlDecode.js";


const searchToggler = document.querySelectorAll("[data-search-toggler]");

const searchView = document.querySelector("[data-search-view]");

addonEvenetElement(searchToggler, "click", ()=>{
    searchView.classList.toggle("show");
});

// search clear;

const searchField = document.querySelector("[data-search-field]")
const searchClearBtn = document.querySelector("[data-search-clear]");

searchClearBtn.addEventListener("click", ()=>{
    searchField.value ="";
});

// search type;

const searchSegment = document.querySelector("[data-segment='search']");
const activeSegmentBtn = document.querySelector("[data-segment-btn].selected");

window.searchType = activeSegmentBtn.dataset.segmentValue;


segment(searchSegment, segmentValue =>{ 
    window.searchType = segmentValue
    
});

// search Submit

const searchBtn = document.querySelector("[data-search-btn]");

searchBtn.addEventListener("click",()=>{
    const searchValue = searchField.value.trim();
    if(searchValue){
        updateSearchHistory(searchValue);
        window.filterObj.query = searchValue;
        updateUrl(window.filterObj, window.searchType);
    }
});


searchField.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" && searchField.value.trim()){
        searchBtn.click();
    }
})

let searchHistory = {item:{}};
if(window.localStorage.getItem("search_history")){
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
}else{
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}
function updateSearchHistory(searchValue){
    if(searchHistory.item.includes(searchValue)){
        searchHistory.item.splice(searchHistory.item.indexOf(searchValue),1);
    }
    searchHistory.item.unshift(searchValue);
    window.localStorage.setItem("search_history" , JSON.stringify(searchHistory));
};

const  searchList =
    document.querySelector("[data-search-list]");
const  historyLen = searchHistory.item.length;

for (let i = 0; i < historyLen && i <= 5; i++) {
  const  listItem = document.createElement("button");
  listItem.classList.add("list-item");

  listItem.innerHTML = `
  <i class="fa-solid fa-clock-rotate-left"></i>
    <span class="body-large text">${searchHistory.item[i]}</span>

    <div class="state-layer"></div>
  `;

  ripple(listItem);

  listItem.addEventListener("click", function () {
    searchField.value = this.children[1].textContent;
    searchBtn.click();
  });

  searchList.appendChild(listItem);
};

// show searched value in search field after reload

const search = ulrDecode(window.location.search.slice(1));
if(search.query){
    searchField.value = search.query;
};




import { ripple } from "../js/utils/ripple.js";
import { addonEvenetElement } from "../js/utils/event.js";
import { segment } from "../js/segment_btn.js";
import { updateUrl } from "../js/utils/updateUrl.js";
import { ulrDecode } from "../js/utils/urlDecode.js";

// searchview toggle small device

const searchToggler = document.querySelectorAll("[data-search-toggler]");

const  searchView = document.querySelector("[data-search-view]");

addonEvenetElement(searchToggler , "click" , ()=> searchView.classList.toggle("show"))

const searchField = document.querySelector("[ data-search-field]");
const searchclearButton = document.querySelector("[data-search-clear]")

searchclearButton.addEventListener("click" , ()=> searchField.value = "")


// search type 
const  searchElement = document.getElementById("searchelement");
const  activesegmentButton = document.querySelector("[data-segment-btn].selected");
window.searchType = activesegmentButton.dataset.segmentValue;

segment(searchElement , segmentValue =>{
    window.searchType = segmentValue
})

// search submit
const  searchbutton = document.querySelector("[data-search-btn]");

searchbutton.addEventListener("click", ()=>{
    const searchvalue = searchField.value.trim();
    if(searchField){
        updatesearchHistory(searchvalue);
        window.filterObj.query = searchvalue;
        updateUrl(window.filterObj , window.searchType);
    }
})



// submit search when press "enter" key

searchField.addEventListener("keydown" , (e)=>{
    if(e.key === "Enter" && searchField.value.trim()){
        searchbutton.click();
    }
})





let searchitemHistory = {item : []}

if(window.localStorage.getItem("search_value_history")){
    searchitemHistory =JSON.parse(window.localStorage.getItem("search_value_history"))
}else{
    window.localStorage.setItem("search_value_history" , JSON.stringify(searchitemHistory));
}

// update search history
function updatesearchHistory(searchvalue){
// if search value is alredy poresent in the searchlist then remove
// the old value and add the new value in the searchlist ata the begining 
//it ensure that the most recent search is at the top of the histoiry 

    if(searchitemHistory.item.includes(searchvalue)){
        searchitemHistory.item.splice(searchitemHistory.item.indexOf(searchvalue),1)
    }
    searchitemHistory.item.unshift(searchvalue)

    window.localStorage.setItem("search_value_history" , JSON.stringify(searchitemHistory))
}

// render search history item in search list
const searchlist = document.querySelector("[data-search-list]")

const historyList = searchitemHistory.item.length;
for (let i = 0; (i < historyList) & (i <= 5); i++) {
    const /** {NodeElement} */ $listItem = document.createElement("button");
    $listItem.classList.add("list-item");
  
    $listItem.innerHTML = `
    <i class="fa-solid fa-clock-rotate-left leading-icon"
      aria-hidden="true"></i>
  
      <span class="body-large text">${searchitemHistory.item[i]}</span>
  
      <div class="state-layer"></div>
    `;
  
    ripple($listItem);
  
    $listItem.addEventListener("click", function () {
      searchField.value = this.children[1].textContent;
      searchbutton.click();
    });
  
    searchlist.appendChild($listItem);
  }

// show search value in search field after reload

const search = ulrDecode(window.location.search.slice(1));
if(search.query){
    searchField.value = search.query;
    
}
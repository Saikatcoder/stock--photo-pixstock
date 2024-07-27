import{client} from "../../js/apiFile.js"
import{gridInit, updateGrid} from "../../js/utils/masonry_grid.js";
import{photoCard} from  "../../js/photo_card.js";
import {updateUrl} from "../../js/utils/updateUrl.js";
import {ulrDecode} from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";

const filterBar = document.querySelector("[data-filter-bar]");

filterBar.style.display = window.location.search ? "flex" : "none";


const filterWrappers = document.querySelectorAll("[data-filter]");
filterWrappers.forEach(filterWrapper =>{
    filter(filterWrapper, window.filterObj, (newObj)=>{
       window.filterObj = newObj;
       updateUrl(newObj, "photos");
    });
})
// render curated or search photo 
// if search somthing then render 
// search photo otherwish render curated photo

const photoGrid = document.querySelector("[data-photo-grid]");

const title = document.querySelector("[data-title]");
const photoGrids = gridInit(photoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;

const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && ulrDecode(searchUrl);
const titles = searchObj ? `${searchObj.query} photos` : "Curated photos";
title.textContent = titles;
document.titles = titles;


// render all photo

function renderPhoto (currentPage){
    client.photos[searchObj ? "search" : "curated"]({...searchObj, per_page: perPage, page: currentPage}, data=>{
        totalPage = Math.ceil(data.total_results / perPage);
       data.photos.forEach(photo => {
        const photoCardElement = photoCard(photo);
        updateGrid(photoCardElement, photoGrids.columnsHeight, photoGrids.$columns);

       });

       isLoad = true;
    //    when no more photo found , hide loader
    if(currentPage >= totalPage){
        loader.style.display = "none";
    }
    })
}
renderPhoto(currentPage);

const loader = document.querySelector("[data-loder]");
let isLoad = true;
window.addEventListener("scroll", ()=>{
   if(loader.getBoundingClientRect().top <(window.innerHeight *2) && currentPage <= totalPage && isLoad){
    currentPage++;
    renderPhoto(currentPage);
    isLoad = false;
   }

})
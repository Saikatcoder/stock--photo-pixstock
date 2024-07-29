import{client} from "../../js/apiFile.js"
import{gridInit, updateGrid} from "../../js/utils/masonry_grid.js";
import{videoCard} from  "../../js/video_card.js";
import {updateUrl} from "../../js/utils/updateUrl.js";
import {ulrDecode} from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";

const filterBar = document.querySelector("[data-filter-bar]");

filterBar.style.display = window.location.search ? "flex" : "none";


const filterWrappers = document.querySelectorAll("[data-filter]");
filterWrappers.forEach(filterWrapper =>{
    filter(filterWrapper, window.filterObj, (newObj)=>{
       window.filterObj = newObj;
       updateUrl(newObj, "videos");
    });
})
// render curated or search photo 
// if search somthing then render 
// search photo otherwish render curated photo

const videoGrid = document.querySelector("[data-video-grid]");

const title = document.querySelector("[data-title]");
const  videoGrids = gridInit(videoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;

const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && ulrDecode(searchUrl);
const titles = searchObj ? `${searchObj.query} videos` : "Popular videos";
title.textContent = titles;
document.titles = titles;


// render all photo

function rendervideos (currentPage){
    client.videos[searchObj ? "search" : "popular"]({...searchObj, per_page: perPage, page: currentPage}, data=>{
        totalPage = Math.ceil(data.total_results / perPage);
       data.videos.forEach(video => {
        const videoCardElement = videoCard(video);
        updateGrid(videoCardElement, videoGrids.columnsHeight, videoGrids.$columns);

       });

       isLoad = true;
    //    when no more photo found , hide loader
    if(currentPage >= totalPage){
        loader.style.display = "none";
    }
    })
}
rendervideos(currentPage);

const loader = document.querySelector("[data-loder]");
let isLoad = true;
window.addEventListener("scroll", ()=>{
   if(loader.getBoundingClientRect().top <(window.innerHeight *2) && currentPage <= totalPage && isLoad){
    currentPage++;
    rendervideos(currentPage);
    isLoad = false;
   };

})
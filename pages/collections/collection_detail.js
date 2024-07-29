import{client} from  "../../js/apiFile.js";
import{gridInit, updateGrid} from "../../js/utils/masonry_grid.js";
import {photoCard} from "../../js/photo_card.js";
import {videoCard} from "../../js/video_card.js";
import{ulrDecode} from "../../js/utils/urlDecode.js"
// render collecction

const collectionGrid = document.querySelector("[data-collection-grid]");

const title = document.querySelector("[data-title]");
const collectionGridElement = gridInit(collectionGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;

const collectionEntries = window.location.search.slice(1).replace(/%20/g, " ").split("&").map(i=> i.split("="));
const collectionObj = ulrDecode(window.location.search.slice(1));

title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;

function loadCollection (page){
    client.collections.detail(collectionObj.collectionId, {per_page:perPage, page:page},data=>{
        console.log(data);
        totalPage = Math.ceil(data.total_results / perPage);
        data.media.forEach(item =>{
            let card;
            switch(item.type.toLowerCase()){
                case "photo":
                    card = photoCard(item);
                break;
                case "video":
                    card = videoCard(item);
                break;
            };
            updateGrid(card, collectionGridElement.columnsHeight, collectionGridElement.$columns);
            isLoad = true;
            //    when no more photo found , hide loader
            if(currentPage >= totalPage)
                loader.style.display = "none";
        });
    })
}

loadCollection(currentPage);

const loader = document.querySelector("[data-loder]");
let isLoad = true;
window.addEventListener("scroll", ()=>{
   if(loader.getBoundingClientRect().top <(window.innerHeight *2) && currentPage <= totalPage && isLoad){
    currentPage++;
    loadCollection(currentPage);
    isLoad = false;
   }

});
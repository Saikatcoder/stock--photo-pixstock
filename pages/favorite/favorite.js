import {gridInit, updateGrid} from "../../js/utils/masonry_grid.js";
import{segment } from "../../js/segment_btn.js";
import{photoCard} from "../../js/photo_card.js";
import {videoCard} from "../../js/video_card.js";

// favorite segment

const favotiteSegment = document.querySelector("[data-segment = 'favorite']");
let favType = "photos";
const favoriteGrid = document.querySelector("[data-favorite-grid]");
segment(favotiteSegment , segmentValue =>{
  favType = segmentValue;
  favoriteGrid.innerHTML = "";
  favGrid = gridInit(favoriteGrid);
  loadFavorite(favType, favGrid);
});


let favGrid = gridInit(favoriteGrid);
const favData = JSON.parse(window.localStorage.getItem("favorite"));
function loadFavorite(type, favGridItem){
  Object.values(favData[type]).forEach(item=>{
    let card;
    switch(type){
      case "photos":
        card = photoCard(item)
        break;
        case "videos":
          card = videoCard(item)
        break;
    }
    updateGrid(card, favGridItem.columnsHeight, favGridItem.$columns);
    
  })
}
loadFavorite(favType, favGrid);


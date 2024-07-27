import { client } from "./apiFile.js";
import { photoCard } from "./photo_card.js";
import { gridInit, updateGrid } from "./utils/masonry_grid.js";
import { videoCard } from "./video_card.js";
import { collectionCard } from "./collection_card.js";
// render curted photo

const photoGrid = document.querySelector("[data-photo-grid]");
photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);
client.photos.curated({page: 1, per_page:20},data=>{
    photoGrid.innerHTML= "";
    const photoGridElement = gridInit(photoGrid);
    data.photos.forEach(photo=>{
        const photoCardElement = photoCard(photo);
        photoGrid.appendChild(photoCardElement)
        updateGrid(photoCardElement, photoGridElement.columnsHeight, photoGridElement.$columns);
    })
})


// render popular videos

const videoGrid = document.querySelector("[data-video-grid]");
videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.videos.popular({per_page: 20}, data=>{
    videoGrid.innerHTML = '';
    const videoGridElement = gridInit(videoGrid);
    data.videos.forEach(video =>{
        const videoCardElement = videoCard(video);
        updateGrid(videoCardElement, videoGridElement.columnsHeight, videoGridElement.$columns);

    });

})


// render collection section
const collectionGrid = document.querySelector("[data-collection-grid]");

client.collections.featured({per_page: 18}, data=>{
    data.collections.forEach(collection => {
        const collectionCardElement = collectionCard(collection);
        
        collectionGrid.appendChild(collectionCardElement);
    })
})
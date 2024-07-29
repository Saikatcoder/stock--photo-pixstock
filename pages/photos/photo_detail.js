import { client } from "../../js/apiFile.js";
import { ripple } from "../../js/utils/ripple.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";

const rippleElems = document.querySelectorAll("[data-ripple]")
rippleElems.forEach(rippleElem => ripple(rippleElem));


window.addEventListener("loadstart" ,()=>{
    document.body.style.opacity ="0";
});
window.addEventListener("DOMContentLoaded" ,()=>{
    document.body.style.opacity ="1";
});

const  menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

menuWrappers.forEach((menuWrapper) => {
  menu(menuWrapper);
});

const favoritePhotos = JSON.parse(window.localStorage.getItem("favorite")).photos;
const favoriteBtn = document.querySelector("[data-add-fovorite]");
const photoId = window.location.search.split("=")[1];
favoriteBtn.classList[favoritePhotos[photoId] ? "add" : "remove"]("active");
favorite(favoriteBtn, "photos", photoId);

// render detail data

const detailWrapper = document.querySelector("[data-details-wrapper]");
const downloadLink = document.querySelector("[data-download-link]");
const downlodMenu = document.querySelector("[data-download-menu]");
client.photos.detail(photoId, data=>{
    const {
        avg_color,
        height,
        width,
        photographer,
        alt,
        src
    } = data;
    downloadLink.href = src.original;
    Object.entries(src).forEach(item =>{
        const [key, value] = item;
       downlodMenu.innerHTML += `
       <a href="${value}" class="menu-item" data-ripple data-download-menu>
       <span class="label-large text">${key}</span>
       <div class="state-layer"></div>
     </a>
       `
    });

    detailWrapper.innerHTML = `
    <figure class="detail-banner img-holder" style="aspect-ratio : ${width}/${height}; background-color:${avg_color}">
    <img src="${src.large2x}" width ="${width}" height ="${height}" class="img-cover" alt="${alt}">
</figure>
<p class="title-small">Photograph by <span class="color-primary">${photographer}</span></p>
    `;
    const detailImg = detailWrapper.querySelector("img");
    detailImg.style.opacity =0;
    detailImg.addEventListener("load", function(){
        this.animate({
            opacity : 1
        }, {
            duration : 400 , fill : "forwards"
        });
        if(alt){
            client.photos.search({query : alt, page :1, per_page:30},data=>{
                loadSimilarPhoto(data)
            })
        }else{
            loader.style.display ="none";
            photoGrid.innerHTML = "<p>No Similar photo found Sorry..</p>"
        }
    });
})

// load semiliar photos
    const photoGrid = document.querySelector("[data-photo-grid]");
    const PhotoGridElement = gridInit(photoGrid);
    const loader = document.querySelector("[data-loder]");
 function loadSimilarPhoto (data){
    data.photos.forEach(photo =>{
        const card = photoCard(photo);
        updateGrid(card, PhotoGridElement.columnsHeight, PhotoGridElement.$columns);
        loader.style.display = "none";
    });
}
import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";
export function photoCard(photo){
    const root = window.location.origin;
    
    const  {
        alt,
        id,
        avg_color:backdropColor,
        width,
        height,
        src:{large}
    }= photo;
    const card = document.createElement("div");
    card.classList.add("card", "grid-item");
    card.style.backgroundColor = backdropColor;
    const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"))
    card.innerHTML =`<figure class="card-banner" style="width: ${width}; height: ${height};">
    <img src="${large}" alt="${alt}" class="img-cover" width="${width}" height="${height}" loading="lazy">
  </figure>
  <div class="card-content">
    <button class="icon-btn small ${favoriteObj.photos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn>
      <i class="fa-solid fa-heart"></i>
      <div class="state-layer"></div>
    </button>
  </div>

  <a href="${root}/stock--photo-pixstock/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>`;
  const cardBanner = card.querySelector("img");
  cardBanner.style.opacity = 0;
  cardBanner.addEventListener("load", function(){
      this.animate({
          opacity : 1
      }, {
          duration : 400 , fill : "forwards"
      });
  });
  const rippleElems = [card, ...card.querySelectorAll("[data-ripple]")];
  rippleElems.forEach(rippleElem => ripple(rippleElem));
  const favoriteBtn = card.querySelector("[data-favorite-btn]");
  favorite(favoriteBtn, "photos", id);
  return card;
}
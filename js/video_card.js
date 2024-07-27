import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";
import { hoverplay } from "./utils/hoverOnPlay.js";

export function videoCard(video){
    const root = window.location.origin;

    const {
        height,
        width,
        id,
        image,
        video_files
    }=video;
    const sdVideos = video_files.find(item => item.quality === "sd" && item.width <1000);
    const {file_type, link} = sdVideos;
    const card = document.createElement("div");
    card.classList.add("card", "grid-item", "video");

    const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

    card.innerHTML =`    
    <div class="card-banner" style="width: ${width}; height: ${height};">
    <video src="${link}" class="img-cover" muted loop preload="none" data-video type="${file_type}" poster="${image}"></video>
  </div>
  <div class="card-content">
  <button class="icon-btn small ${favoriteObj.videos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn>
  <i class="fa-solid fa-heart"></i>
  <div class="state-layer"></div>
</button>
  </div>
  <span class="card-badge">
    <i class="fa-solid fa-play" aria-label="true"></i>
  </span>
  <a href="${root}/stock--photo-pixstock/pages/videos/video_detail.html?id=${id}" class="statelayer"></a>
    `;
    const rippleElems = [card, ...card.querySelectorAll("[data-ripple]")];
    rippleElems.forEach(rippleElem => ripple(rippleElem));
    const favoriteBtn = card.querySelector("[data-favorite-btn]");
    favorite(favoriteBtn, "videos", id);
    hoverplay(card)
    return card;
}
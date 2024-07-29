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
           
    <div class="card-banner" style="--width: ${width}; --height: ${height}">
    <video poster="${image}" muted loop preload="none" class="img-cover" data-video>
      <source
        src="${link}"
        type="${file_type}"
      />
    </video>
  </div>

  <div class="card-content">
    <button
    class="icon-btn small ${favoriteObj.videos[id] ? "active" : ""}"
    aria-label="Add to favorite"
    data-ripple
    data-favorite-btn
    >
    <i class="fa-solid fa-heart aria-hidden="true"
      ></i>

      <div class="state-layer"></div>
    </button>
  </div>

  <span class="card-badge" data-card-badge>
  <i class="fa-solid fa-play aria-hidden="true"
      ></i>
  </span>
  

  <a href="${root}/pages/videos/video_detail.html?id=${id}" class="state-layer"></a>
    `;
    const rippleElems = [card, ...card.querySelectorAll("[data-ripple]")];
    rippleElems.forEach(rippleElem => ripple(rippleElem));
    const favoriteBtn = card.querySelector("[data-favorite-btn]");
    favorite(favoriteBtn, "videos", id);
    hoverplay(card)
    return card;
}



import { ripple } from "./utils/ripple.js";
export function collectionCard(collection){
    const root = window.location.origin;
   

    const {id, title, media_count} = collection;

    const card = document.createElement("div");
    card.classList.add('grid-card', "two-line", "list-item");
    card.setAttribute("title", title);

    card.innerHTML =`
    <div>
    <h3 class="body-large">
      ${title}
    </h3>
    <p class="body-medium label">${media_count}</p>
    <a href="${root}?collectionId=${id}" title="${title}" class="state-layer"></a>
  </div>
    `;
    ripple(card);
    return(card);
}
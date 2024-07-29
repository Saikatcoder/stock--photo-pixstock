import{client} from "../../js/apiFile.js"
import{collectionCard} from "../../js/collection_card.js";

const collectionGrid = document.querySelector("[data-collection-grid]");
const perPage= 36;
let currentPage =1;
let totalPage = 0;

function loadCollection (page){
    client.collections.featured({per_page : perPage, page : page},data=>{
        totalPage = Math.ceil(data.total_result / perPage);
        data.collections.forEach(collection =>{
            const CollectionCardElement = collectionCard(collection);
            collectionGrid.appendChild(CollectionCardElement);
        });

        isload =true;
        (currentPage >= totalPage) && (loader.style.display = "none");
    });

};

loadCollection(currentPage);

const loader = document.querySelector("[data-loder]");
let isload = false;
function loadMore (){
    if(loader.getBoundingClientRect().top< (window.innerHeight * 2) && currentPage <= totalPage && isload){
        currentPage++;
        loadCollection(currentPage);
        isload = false
    };

}

window.addEventListener("scroll" , loadMore);


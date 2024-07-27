import { menu } from "../js/menu.js";
export function filter(filterWrapper,filterObj, callback){
    // const filterClearBtn = filterWrapper.querySelectorAll("[data-filter-clear]");
    const filterValue = filterWrapper.querySelector("[data-filter-value]");
    const filterChip = filterWrapper.querySelector("[data-filter-chip]");
    const filterColorField =filterWrapper.querySelector("[data-color-field]");
    const filterKey = filterWrapper.dataset.filter;
    const newObj = filterObj;
    menu(filterWrapper, filterValu => {
        filterValue.innerText= filterValu;
        filterChip.classList.add("selected");
        newObj[filterKey]=filterValu;
        callback(newObj)
    });
    // filterClearBtn.addEventListener("click",()=>{
    //     filterChip.classList.remove("selected");
    //     filterValue.innerText = filterValue.dataset.filterValu;
    //     delete newObj[filterKey];
    //     callback(newObj)
    // });
    filterColorField ?.addEventListener("change", ()=>{
        const filtervalues = filterColorField.value.toLowerCase();
        filterValue.innerHTML = filtervalues;
        filterChip.classList.add("selected");
        newObj[filterKey] = filtervalues;
        callback(newObj);
    });
};


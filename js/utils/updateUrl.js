import { urlEncode } from "./urlEncode.js";
// export function updateUrl(filterObj , searchType){
//     setTimeout(()=>{
//         const root = window.location.origin;
//         console.log(filterObj);
//         console.log(searchType);
//         const searchQuery = urlEncode(filterObj);
//         window.location =`${root}/stock--photo-pixstock/pages/${searchType}/${searchType}.html?${searchQuery}`;
//     },500)
// };


export const updateUrl = (filterObj, searchType) => {
  setTimeout(() => {
    const  root = window.location.origin;
    const searchQuery = urlEncode(filterObj);

    window.location = `${root}/stock--photo-pixstock/pages/${searchType}/${searchType}.html?${searchQuery}`;
  }, 500);
};
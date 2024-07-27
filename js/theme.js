const html = document.documentElement;

let  isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(localStorage.getItem("theme")){
    html.dataset.theme = localStorage.getItem("theme")
}else{
    html.dataset.theme = isDark? "dark" : "light"
}

function changeTheme(){
    isDark = localStorage.getItem("theme")
    localStorage.setItem("theme", isDark=== "light" ? "dark" : "light");
    html.dataset.theme = localStorage.getItem("theme")
}
// window.addEventListener("load",()=>{
   
// })
const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", ()=>{
    changeTheme()
});
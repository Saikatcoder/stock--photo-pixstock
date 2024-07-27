export function hoverplay(card){
    const cardVideo = card.querySelector("[data-video]");
    const cardBadge = card.querySelector(".card-badge");

    let isPlay = false;
    let playTimeout;
    
    card.addEventListener("pointerover", function(){
        playTimeout = setTimeout(() => {
            cardBadge.style.display = "none"
            cardVideo.play().then(res =>{
                res.isPlay = true;
            }).catch(error =>{
                isPlay = false;
            })
        }, 600);
    });
   card.addEventListener("pointerout" ,function(){
    playTimeout && clearTimeout(playTimeout)
    cardBadge.style.display= "grid";
    if(isPlay)
        cardVideo.pause();
   });

}
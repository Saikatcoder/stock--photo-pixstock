const rippleeffect = document.createElement("div")
export const ripple = function(rippleElem){
    rippleElem.addEventListener("pointerdown", function(e){
        e.stopImmediatePropagation();

        rippleeffect.classList.add('ripple')

        rippleElem.appendChild(rippleeffect);
            removeRipple();
            this.addEventListener("pointerup", removeRipple());
            this.addEventListener("pointerleave", removeRipple());

            const isnotIconButton = !this.classList.contains("icon-btn");
            if(isnotIconButton){
                const ripplSize = Math.max(this.clientWidth, this.clientHeight);

                rippleeffect.style.top =`${e.layerY}px`;
                rippleeffect.style.left =`${e.layerX}px`;
                rippleeffect.style.width = `${e.ripplSize}px`;
                rippleeffect.style.height = `${e.ripplSize}px`;
            }
        });
    }

function removeRipple(){
     rippleeffect.animate({
            opacity : 0   
        },
        {fill: "forwards", 
        duration: 200
        });
        setTimeout(()=>{
            rippleeffect.remove()
        }, 1000)
    }
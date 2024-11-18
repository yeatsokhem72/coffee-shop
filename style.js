const navLinks=document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton=document.querySelector("#menu-open-button");
const menuCloseButton=document.querySelector("#menu-close-button");
menuOpenButton.addEventListener('click',()=>{
    document.body.classList.toggle("show-mobile-menu");
});
menuCloseButton.addEventListener("click",()=> menuOpenButton.click());


navLinks.forEach(link=>{
    link.addEventListener("click",() => menuOpenButton.click())
})

const carousel = document.querySelector(".carousel");
const wrapper = document.querySelector(".wrapper");
const arrowBtn = document.querySelectorAll(".wrapper i");
const firstCardWidth=carousel.querySelector(".card").offsetWidth;
const carouselChildrens=[...carousel.children];

let isDragging=false ,startX, startScrollLeft, timeoutId;

let cardPerView=Math.round(carousel.offsetWidth/firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card=>{
    carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
})
carouselChildrens.slice(0, cardPerView).forEach(card=>{
    carousel.insertAdjacentHTML("beforeend",card.outerHTML);
})

arrowBtn.forEach(btn=>{
    btn.addEventListener("click",()=>{
        carousel.scrollLeft+=btn.id==="left" ? -firstCardWidth:firstCardWidth;
    })
})
const dragStart=(e)=>{
    isDragging=true;
    carousel.classList.add("draging");
    startX=e.pageX
    startScrollLeft=carousel.scrollLeft;
}
const draging=(e)=>{
    if(!isDragging)return;
    carousel.scrollLeft=startScrollLeft- (e.pageX - startX) ;
}
const dragStop=()=>{
    isDragging=false;
    carousel.classList.remove("draging")
}
const autoPlay=()=>{
    if(window.innerWidth<800) return;
    timeoutId=setTimeout(()=> carousel.scrollLeft+= firstCardWidth,2500);
}
autoPlay();
const infiniteScroll=()=>{
    if(carousel.scrollLeft===0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft=carousel.scrollWidth-(2*carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(carousel.scrollLeft===carousel.scrollWidth-carousel.offsetWidth){
        carousel.classList.add("no-transition")
        carousel.scrollLeft=carousel.offsetWidth;
        carousel.classList.remove("no-transition")
    }
    clearTimeout(timeoutId);
    if(!wrapper.matched(":hover")) autoPlay();
}



carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",draging);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",infiniteScroll)
wrapper.addEventListener("mouseenter",()=> clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave",autoPlay);
  
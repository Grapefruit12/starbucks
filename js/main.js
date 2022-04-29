// header의 search부분 클릭시 발생
const searchEl=document.querySelector(".search");
const searchInputEl=searchEl.querySelector("input");

searchEl.addEventListener("click", function(){
    searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function(){
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener("blur", function(){
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});

// header의 badges 브라우저 창 스크롤시 사라지기
const badgeEl=document.querySelector('header .badges');
const toTopEl=document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function(){
    console.log(window.scrollY);
    if(window.scrollY>500){
        //배지 숨기기
        //gsap.to(요소, 지속시간(초), 옵션);
        gsap.to(badgeEl, .6, {
            opacity:0,
            display:'none',//js에서 문자는 꼭 ''안에 넣어주기
        });
        //버튼보이기!
        gsap.to(toTopEl, .2, {
            x:0
        });
    }else{
        //배지 보이기
        gsap.to(badgeEl, .6, {
            opacity:1,
            display:'block',
        });
        //버튼 숨기기!
        gsap.to(toTopEl, .2, {
            x:100
        });
    };
}, 300));
//_.throttle(함수, 시간): scroll이벤트를 정한시간에 한번만 호출하도록 하여 성능저하를 막는다.(먼저 lodash cdn을 html에 붙여넣은뒤 사용하기)


toTopEl.addEventListener('click',function(){
    gsap.to(window, .7, {
        scrollTo:  0
    });
});

//visual 요소들 순서대로 보여지기(class="fade-in")
const fadeEls=document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
    //gsap.to(요소, 지속시간(초), 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7, //0.7, 1.4, 2.1,...
        opacity: 1,
    });
});

//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
    direction:'vertical',
    autoplay: true,//자동재생
    loop:true,//반복재생
});

new Swiper('.promotion .swiper-container',{
    // direction default값:'horizontal'
    slidesPerView:3,//한번에 보여줄 슬라이드 개수
    spaceBetween:10,//슬라이드 사이 여백
    centeredSlides: true,//1번 슬라이드가 가운데 보이기
    autoplay: {
        delay:5000//5초
    },//자동재생
    loop:true,//반복재생
    pagination:{
        el: '.promotion .swiper-pagination',//페이지 번호 요소 선택자
        clickable:true,//사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl:'.promotion .swiper-prev',
        nextEl:'.promotion .swiper-next',
    }
});

new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5, //한 화면에 몇개의 슬라이드 보일건가
    navigation: {
        prevEl:'.awards .swiper-prev',
        nextEl:'.awards .swiper-next',
    },
});

const promotionEl=document.querySelector('.promotion');
const promotionToggleBtn=document.querySelector('.toggle-promotion');
let isHidePromotion=false;
promotionToggleBtn.addEventListener('click',function(){
    isHidePromotion=!isHidePromotion
    if(isHidePromotion){
        //숨김 처리!
        promotionEl.classList.add('hide');
    }else{
        //보임 처리!
        promotionEl.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
function floatingObject(selector, delay, size){
    // gsap.to(요소, 시간, 옵션);
    gsap.to(selector, random(1.5, 2.5), {
        y: size,//y축
        repeat: -1,//-1은 무한반복
        yoyo: true,//한번 재생된 애니메이션을 다시 뒤로 재생
        ease: Power1.easeInOut,//움직임 조절
        delay: random(0, delay),//지연: 몇초뒤 실행
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls=document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
    new ScrollMagic
        .Scene({
            triggerElement: spyEl,
            //보여짐 여부를 감시할 요소를 지정
            triggerHook: .8,
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});

const thisYear=document.querySelector('.this-year');
thisYear.textContent=new Date().getFullYear();//현재년도
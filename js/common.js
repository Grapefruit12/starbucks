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


const thisYear=document.querySelector('.this-year');
thisYear.textContent=new Date().getFullYear();//현재년도
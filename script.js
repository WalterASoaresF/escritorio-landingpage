const toggle=document.getElementById("menu-toggle");
const menu=document.getElementById("menu");
toggle?.addEventListener("click",()=>{const open=menu.classList.toggle("active");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu")});
menu?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menu.classList.remove("active");toggle?.setAttribute("aria-expanded","false");toggle?.setAttribute("aria-label","Abrir menu")}));
document.getElementById("year").textContent=new Date().getFullYear();

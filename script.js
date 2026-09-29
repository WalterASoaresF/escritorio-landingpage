document.documentElement.classList.add("js");

// Animação de entrada do cabeçalho e do hero ao carregar a página
requestAnimationFrame(()=>requestAnimationFrame(()=>{
  document.querySelector(".site-header")?.classList.add("in");
  document.querySelector(".hero-content")?.classList.add("in");
  document.querySelector(".hero-portrait")?.classList.add("in");
}));

const toggle=document.getElementById("menu-toggle");
const menu=document.getElementById("menu");
const header=document.querySelector(".site-header");
const floatBtn=document.querySelector(".whatsapp-float");
const hero=document.querySelector(".hero");

const setMenu=open=>{menu.classList.toggle("active",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu")};
toggle?.addEventListener("click",()=>setMenu(!menu.classList.contains("active")));
menu?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("active")){setMenu(false);toggle.focus()}});

// Header com fundo ao rolar e botão flutuante do WhatsApp após o hero
const onScroll=()=>{
  header.classList.toggle("scrolled",window.scrollY>30);
  floatBtn?.classList.toggle("visible",window.scrollY>hero.offsetHeight*.6);
};
window.addEventListener("scroll",onScroll,{passive:true});
onScroll();

document.getElementById("year").textContent=new Date().getFullYear();

// Animação de entrada apenas para elementos fora da tela no carregamento
if("IntersectionObserver" in window){
  const targets=[...document.querySelectorAll(".section-heading,.intro-grid,.area-card,.areas-cta,.team-heading,.professional,.steps-heading,.steps-grid li,.faq-grid,.contact-grid")]
    .filter(el=>el.getBoundingClientRect().top>window.innerHeight);
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in");io.unobserve(entry.target)}}),{rootMargin:"0px 0px -8% 0px"});
  targets.forEach((el,i)=>{el.classList.add("reveal");el.style.transitionDelay=`${(i%3)*80}ms`;io.observe(el)});
}

// Envio do formulário sem sair da página (Formspree); sem JS, o envio padrão continua funcionando
const form=document.getElementById("contact-form");
const formStatus=document.getElementById("form-status");
form?.addEventListener("submit",async e=>{
  e.preventDefault();
  const button=form.querySelector("button[type=submit]");
  button.disabled=true;
  formStatus.className="form-status full";
  formStatus.textContent="Enviando…";
  try{
    const res=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
    if(!res.ok)throw new Error();
    form.reset();
    formStatus.classList.add("success");
    formStatus.textContent="Mensagem enviada! Retornaremos o contato em breve.";
  }catch{
    formStatus.classList.add("error");
    formStatus.textContent="Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.";
  }finally{
    button.disabled=false;
  }
});

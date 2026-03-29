const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
document.querySelector('#hero-content button').addEventListener('click', () => {
  window.location.href = '#forms';
});
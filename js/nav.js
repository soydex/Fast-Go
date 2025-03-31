const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.contains('open');
    menuToggle.classList.toggle('open', !isOpen);
    menu.classList.toggle('show', !isOpen);
});
const toggleMenu = document.querySelector('.toggle-menu');
const menu = document.querySelector('#menu');

toggleMenu.addEventListener('click', function () {
    const open = JSON.parse(toggleMenu.getAttribute('aria-expanded'));
    toggleMenu.setAttribute('aria-expanded', !open);
    menu.hidden = !menu.hidden;
  
    if( !menu.hidden ) {
        toggleMenu.setAttribute('aria-label', 'Close menu');

        menu.querySelector('a').focus();
        /*Si le menu apparaît après une transition, remplacer la ligne précédente par les lignes suivantes
        menu.addEventListener('transitionend', function(e) {
            if(e.target != menu) return;
            menu.querySelector('a').focus();
        }) */
    } else {
        toggleMenu.setAttribute('aria-label', 'Open menu');
    }
})
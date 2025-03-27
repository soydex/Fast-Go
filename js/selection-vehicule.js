function afficherDiv() {
    var textBox = document.getElementById("textBox");
    var btn_filtre = document.getElementById("btn-filtre");
    textBox.classList.toggle("box");
    btn_filtre.classList.toggle("hidden");
}

function toggleMenu() {
    var menu = document.getElementById("menu");
    var toggle = document.querySelector(".menu-toggle");
    if (menu.classList.contains("show")) {
        menu.style.opacity = "0";
        menu.style.transform = "translate(0%, -10px)";
        setTimeout(() => {
            menu.classList.remove("show");
        }, 400);
    } else {
        menu.classList.add("show");
        setTimeout(() => {
            menu.style.opacity = "1";
            menu.style.transform = "translate(0, 0)";
        }, 10);
    }
    toggle.classList.toggle("open");
        
}
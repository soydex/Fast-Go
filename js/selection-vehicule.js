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

document.getElementById('apply-filters').addEventListener('click', async () => {
    const sort = document.getElementById('sort').value;
    const type = document.getElementById('type').value;
    const transmission = document.getElementById('transmission').value;
    const passengers = document.getElementById('passengers').value;

    try {
        const response = await fetch(`http://localhost:3000/cars`);
        const cars = await response.json();

        const filteredCars = cars.filter(car => {
            return (!type || car.type === type) &&
                   (!transmission || car.transmission === transmission) &&
                   (!passengers || car.seating_capacity >= parseInt(passengers));
        });

        if (sort === 'asc') {
            filteredCars.sort((a, b) => a.rental_price_per_day - b.rental_price_per_day);
        } else if (sort === 'desc') {
            filteredCars.sort((a, b) => b.rental_price_per_day - a.rental_price_per_day);
        }

        const mainContent = document.getElementById('main_content');
        mainContent.innerHTML = '';
        filteredCars.forEach(car => {
            const carCard = document.createElement('a');
            carCard.href = `location_voiture.html?model_name=${car.model_name}`;
            carCard.target = '_blank';
            carCard.classList.add('car_card');
            carCard.innerHTML = `
                <div class="car_card_img">
                    <img src="${car.image_url}" alt="${car.model_name}">
                </div>
                <div class="car_card_info">
                    <h2>${car.brand} ${car.model_name}</h2>
                    <p>${car.rental_price_per_day}€/jour</p>
                    <p>${car.horsepower} Ch - ${car.torque} Nm</p>
                </div>
            `;
            mainContent.appendChild(carCard);
        });
    } catch (error) {
        console.error("Erreur lors de l'application des filtres :", error);
    }
});
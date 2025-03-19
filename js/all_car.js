async function loadCars() {
    try {
        const response = await fetch(`http://localhost:3000/cars`);
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const cars = await response.json();

        const main_content = document.getElementById('main_content');

        cars.forEach(car => {
            const car_card= document.createElement('div');
            car_card.classList.add('car_card');
            car_card.innerHTML = `
                <div class="car_card_img">
                    <img src="${car.image_url}" alt="${car.model_name}">
                </div>
                <div class="car_card_info">
                    <a href="location_voiture.html?model_name=${car.model_name}" target="_blank"><h2>${car.brand} ${car.model_name}</h2></a>
                    <p>${car.rental_price_per_day} € / jour</p>
                    <p>${car.horsepower} Ch - ${car.torque} Nm</p>
                </div>
            `;
            main_content.appendChild(car_card);
        });
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

loadCars(); // Charger les voitures au démarrage
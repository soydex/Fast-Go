const car_imgs_div = document.getElementById('car_imgs');
const car_infos_div = document.getElementById('car_infos');
const car_brand_name = document.getElementById('car_brand_name');
const car_description = document.getElementById('car_description');
const car_price = document.getElementById('prix');

const urlParams = new URLSearchParams(window.location.search);
const model_name = urlParams.get("model_name");


async function loadCars() {
    try {
        const response = await fetch(`http://localhost:3000/cars/${model_name}`);
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const car = await response.json();
        const img_car = document.createElement('img');
        img_car.src = car.image_url;
        img_car.alt = car.model_name+car.brand;
        car_imgs_div.appendChild(img_car);
        car_brand_name.innerHTML = `${car.brand} ${car.model_name}`;
        car_description.innerHTML = `Transmission: ${car.transmission}, Moteur : ${car.engine_type}, Chevaux : ${car.horsepower} Ch, Nm : ${car.torque} Nm, Nombres de sièges: ${car.seating_capacity} sièges`;
        car_price.innerHTML = `${car.rental_price_per_day}`;
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadCars();
});
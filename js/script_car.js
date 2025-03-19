async function loadCars() {
    try {
        const response = await fetch('http://localhost:3000/cars');
        const cars = await response.json();

        const tableBody = document.getElementById('carTable');
        tableBody.innerHTML = ""; // Vider le tableau

        cars.forEach(car => {
            const row = `<tr>
            <td>${car.id}</td>
            <td>${car.model_name}</td>
            <td>${car.brand}</td>
            <td><img src="${car.image_url}" alt="${car.model_name+car.brand}" width="200"></td>
            <td>${car.transmission}</td>
            <td>${car.weight}</td>
            <td>${car.rental_price_per_day}</td>
            <td>${car.engine_type}</td>
            <td>${car.horsepower}</td>
            <td>${car.torque}</td>
            <td>${car.seating_capacity}</td>
            <td><button onclick="deleteCar(${car.id})">❌</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
        document.getElementById('carTable').innerHTML = "<tr><td colspan='12'>Erreur</td></tr>";
    }
}
async function addCar(event) {
    event.preventDefault();
    const model_name = document.getElementById('model_name').value;
    const brand = document.getElementById('brand').value;
    const image_url = document.getElementById('image_url').value;
    const transmission = document.getElementById('transmission').value;
    const weight = document.getElementById('weight').value;
    const rental_price_per_day = document.getElementById('rental_price_per_day').value;
    const engine_type = document.getElementById('engine_type').value;
    const horsepower = document.getElementById('horsepower').value;
    const torque = document.getElementById('torque').value;
    const seating_capacity = document.getElementById('seating_capacity').value;

    const response = await fetch('http://localhost:3000/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model_name, brand, image_url,transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity })
    });

    if (response.ok) {
        document.getElementById('carForm').reset();
        loadCars(); // Recharger la liste
    } else {
        alert("Erreur lors de l'ajout !");
    }
}

async function deleteCar(id) {
    if (!confirm("Voulez-vous supprimer cette voiture ?")) return;

    const response = await fetch(`http://localhost:3000/cars/${id}`, { method: 'DELETE' });

    if (response.ok) {
        loadCars(); // Recharger la liste après suppression
    } else {
        alert("Erreur lors de la suppression !");
    }
}

document.getElementById('carForm').addEventListener('submit', addCar);
loadCars(); // Charger les voitures au démarrage
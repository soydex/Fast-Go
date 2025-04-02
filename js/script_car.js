async function loadCars() {
    try {
        const response = await fetch('http://localhost:3000/cars');
        const cars = await response.json();

        const tableBody = document.getElementById('carTable');
        tableBody.innerHTML = ""; // Vider le tableau

        cars.forEach(car => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${car.id}</td>
                <td contenteditable="true" class="editable" data-field="model_name">${car.model_name}</td>
                <td contenteditable="true" class="editable" data-field="brand">${car.brand}</td>
                <td contenteditable="true" class="editable" data-field="image_url">${car.image_url}</td>
                <td><img src="${car.image_url}" alt="${car.model_name}" style="width: 50px; height: auto;"></td>
                <td contenteditable="true" class="editable" data-field="transmission">${car.transmission}</td>
                <td contenteditable="true" class="editable" data-field="weight">${car.weight}</td>
                <td contenteditable="true" class="editable" data-field="rental_price_per_day">${car.rental_price_per_day}</td>
                <td contenteditable="true" class="editable" data-field="engine_type">${car.engine_type}</td>
                <td contenteditable="true" class="editable" data-field="horsepower">${car.horsepower}</td>
                <td contenteditable="true" class="editable" data-field="torque">${car.torque}</td>
                <td contenteditable="true" class="editable" data-field="seating_capacity">${car.seating_capacity}</td>
                <td>
                    <button class="edit-btn" data-id="${car.id}">🖉</button>
                    <button class="delete-btn" data-id="${car.id}">❌</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Ajouter les écouteurs d'événements sur les boutons d'édition
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const carId = event.target.dataset.id;
                const row = event.target.closest('tr');
                const updatedData = {};

                row.querySelectorAll('.editable').forEach(cell => {
                    const field = cell.dataset.field;
                    updatedData[field] = cell.textContent.trim();
                });

                updateCar(carId, updatedData);
            });
        });

        // Ajouter les écouteurs d'événements sur les boutons de suppression
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const carId = event.target.dataset.id;
                deleteCar(carId);
            });
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

    try {
        const response = await fetch('http://localhost:3000/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model_name, brand, image_url, transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity })
        });

        if (response.ok) {
            document.getElementById('carForm').reset();
            loadCars(); // Recharger la liste
        } else {
            alert("Erreur lors de l'ajout !");
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de l'ajout !");
    }
}

async function deleteCar(id) {
    if (!confirm("Voulez-vous supprimer cette voiture ?")) return;

    try {
        const response = await fetch(`http://localhost:3000/cars/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadCars(); // Recharger la liste après suppression
        } else {
            alert("Erreur lors de la suppression !");
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de la suppression !");
    }
}

async function updateCar(id, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/cars/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert('Véhicule mis à jour avec succès');
            loadCars(); // Recharger la liste
        } else {
            alert("Erreur lors de la mise à jour !");
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de la mise à jour !");
    }
}

document.getElementById('carForm').addEventListener('submit', addCar);
loadCars(); // Charger les voitures au démarrage
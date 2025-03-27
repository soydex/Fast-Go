async function loadCars() {
    try {
        const response = await fetch(`http://localhost:3000/cars`);
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const cars = await response.json();
        const main_content = document.getElementById('main_content');
        cars.forEach(car => {
            const car_card= document.createElement('a');
            car_card.href = `location_voiture.html?model_name=${car.model_name}`;
            car_card.target = '_blank';
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

document.addEventListener('DOMContentLoaded', (event) => {
    loadCars();
});

document.addEventListener('DOMContentLoaded', () => {
    const userInfoElement = document.getElementById('user-info');

    // Récupérer le token depuis le stockage local
    const token = localStorage.getItem('token');
    if (!token) {
        userInfoElement.textContent = 'Vous devez être connecté pour accéder à cette page.';
        return;
    }

    // Récupérer les informations utilisateur
    fetch('http://localhost:3000/me', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des informations utilisateur.');
        return response.json();
    })
    .then(user => {
        userInfoElement.innerHTML = `Bonjour <strong>${user.name},</strong> une idée de ce qui vous fait envie aujourd'hui ?`;
    })
    .catch(error => {
        console.error(error);
        userInfoElement.textContent = 'Impossible de charger les informations utilisateur.';
    });    
});

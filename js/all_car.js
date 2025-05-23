async function loadCars() {
    try {
        const response = await fetch(`http://localhost:3000/cars`);
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const cars = await response.json();
        const main_content = document.getElementById('main_content');
        cars.forEach(car => {
            const car_card = document.createElement('a');
            car_card.href = `location_voiture.html?model_name=${car.model_name}`;
            car_card.target = '_blank';
            car_card.classList.add('car_card');
            car_card.innerHTML = `
                <div class="car_card_img">
                    <img src="${car.image_url}" alt="${car.model_name}">
                </div>
                <div class="car_card_info">
                    <h2>${car.brand} ${car.model_name}</h2>
                    <p class="hidden-info">${car.rental_price_per_day} € / jour</p>
                    <p class="hidden-info">${car.horsepower} Ch - ${car.torque} Nm</p>
                </div>
            `;
            main_content.appendChild(car_card);
        });

        // Ajouter des événements pour afficher/masquer les informations au survol
        document.querySelectorAll('.car_card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.querySelectorAll('.hidden-info').forEach(info => {
                    // Supprimer les styles inline
                });
            });
            card.addEventListener('mouseleave', () => {
                card.querySelectorAll('.hidden-info').forEach(info => {
                    // Supprimer les styles inline
                });
            });
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

    const token = localStorage.getItem('token');
    if (!token) {
        userInfoElement.textContent = 'Vous n\'êtes pas connecté.';
        return;
    }

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

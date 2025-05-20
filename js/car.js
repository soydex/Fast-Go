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
        img_car.width = 600;
        car_imgs_div.appendChild(img_car);
        car_brand_name.innerHTML = `${car.brand} ${car.model_name}`;
        const transmission = document.createElement('p');
        const engine_type = document.createElement('p');
        const horsepower = document.createElement('p');
        const torque = document.createElement('p');
        const seating_capacity = document.createElement('p');

        transmission.textContent = `Transmission du véhicule : ${car.transmission}`;
        engine_type.textContent = `Type de moteur : ${car.engine_type}`;
        horsepower.textContent = `Puissance du moteur : ${car.horsepower} Ch`;
        torque.textContent = `Couple du moteur : ${car.torque} Nm`;
        seating_capacity.textContent = `Nombre de sièges : ${car.seating_capacity}`;
        
        car_description.appendChild(transmission);
        car_description.appendChild(engine_type);
        car_description.appendChild(horsepower);
        car_description.appendChild(torque);
        car_description.appendChild(seating_capacity);


        /*car_description.innerHTML = `Transmission: ${car.transmission}, Moteur : ${car.engine_type}, Chevaux : ${car.horsepower} Ch, Nm : ${car.torque} Nm, Nombres de sièges: ${car.seating_capacity} sièges`;*/
        car_price.innerHTML = `${car.rental_price_per_day}`;
        car_price.style.fontWeight = 'bold';
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

function generateCalendar() {
    const calendarDays = document.getElementById('calendar_days');
    const calendarDates = document.getElementById('calendar_dates');
    const calendarWeekdays = document.getElementById('calendar_weekdays');
    const calendarDatesSelected = document.getElementById('calendar_dates_selected');
    const calendarHeader = document.getElementById('calendar_header');

    const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    calendarWeekdays.innerHTML = weekdays.map(day => `<div>${day}</div>`).join('');

    function renderCalendar(month, year) {
        calendarDates.innerHTML = '';
        calendarHeader.querySelector('#calendar_month').textContent = `${months[month]} ${year}`;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('empty');
            calendarDates.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement('div');
            dateCell.textContent = day;
            dateCell.classList.add('date');
            dateCell.addEventListener('click', () => {
                calendarDatesSelected.innerHTML = `Date sélectionnée : ${day}/${month + 1}/${year}`;
            });
            calendarDates.appendChild(dateCell);
        }
    }

    renderCalendar(currentMonth, currentYear);

    document.getElementById('calendar_prev').addEventListener('click', () => {
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('calendar_next').addEventListener('click', () => {
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCars();
    generateCalendar();
});

    
const car_rent_button = document.getElementById('rent_me');

car_rent_button.addEventListener('click', () => reservation(model_name));


function reservation(model_name) {
    const div_calendar = document.getElementById('calendar');
    div_calendar.style.display = 'flex';

    document.getElementById('close_calendar').addEventListener('click', () => {
        div_calendar.style.display = 'none';
        console.log(`Réservation pour le modèle : ${model_name}`);
    });
}

document.getElementById('reservation_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('login-warning').style.display = 'block';
        return;
    }

    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;

    try {
        // Récupérer les informations utilisateur
        const userResponse = await fetch('http://localhost:3000/me', {
            headers: { Authorization: token },
        });
        if (!userResponse.ok) throw new Error('Erreur lors de la récupération des informations utilisateur.');

        const user = await userResponse.json();
        const client_name = user.name;

        console.log("Données envoyées pour la réservation :", {
            client_name,
            vehicle_id: model_name,
            start_date,
            end_date,
            status: 'En attente',
        });

        const response = await fetch('http://localhost:3000/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_name,
                vehicle_id: model_name,
                start_date,
                end_date,
                status: 'En attente',
            }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la réservation.');
        }

        alert('Réservation effectuée avec succès.');
        document.getElementById('calendar').style.display = 'none';
    } catch (error) {
        console.error('Erreur lors de la réservation :', error);
        alert('Une erreur est survenue.');
    }
});

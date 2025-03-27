const questionBoxes = document.querySelectorAll('.questions_box');

questionBoxes.forEach((box) => {
  const question = box.querySelector('.questions');
  const answer = box.querySelector('.answers');
  const arrow = box.querySelector('.questions img');
  if (question && answer && arrow) {
    question.addEventListener('click', () => {
      console.log('clicked');
      answer.classList.toggle('active');
      arrow.classList.toggle('active');
      question.classList.toggle('active');
    });
  }
});

const heroSection = document.querySelector('.hero');
const dots = document.querySelectorAll('.dot');

const heroBackgrounds = [
  'hero hero-1', 
  'hero hero-2', 
  'hero hero-3', 
];

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    dots.forEach((dot) => dot.classList.remove('active'));
    heroSection.className = heroBackgrounds[index] || heroBackgrounds[0];
    dot.classList.add('active');
  });
});

let currentIndex = 0;
setInterval(() => {
  dots.forEach((dot) => dot.classList.remove('active'));
  currentIndex = (currentIndex + 1) % heroBackgrounds.length;
  heroSection.className = heroBackgrounds[currentIndex];
  dots[currentIndex].classList.add('active');
}, 7500);


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
                  <p>${car.rental_price_per_day}€/jour</p>
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
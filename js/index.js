const questionBoxes = document.querySelectorAll(".questions_box");

questionBoxes.forEach((box) => {
  const question = box.querySelector(".questions");
  const answer = box.querySelector(".answers");
  const arrow = box.querySelector(".questions img");
  if (question && answer && arrow) {
    question.addEventListener("click", () => {
      console.log("clicked");
      answer.classList.toggle("active");
      arrow.classList.toggle("active");
      question.classList.toggle("active");
    });
  }
});

const heroSection = document.querySelector(".hero");
const dots = document.querySelectorAll(".dot");

const heroBackgrounds = ["hero hero-1", "hero hero-2", "hero hero-3"];

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots.forEach((dot) => dot.classList.remove("active"));
    heroSection.className = heroBackgrounds[index] || heroBackgrounds[0];
    dot.classList.add("active");
  });
});

let currentIndex = 0;
setInterval(() => {
  dots.forEach((dot) => dot.classList.remove("active"));
  currentIndex = (currentIndex + 1) % heroBackgrounds.length;
  heroSection.className = heroBackgrounds[currentIndex];
  dots[currentIndex].classList.add("active");
}, 7500);

async function loadCars() {
  try {
    const response = await fetch(`http://localhost:3000/cars`);
    if (!response.ok) {
      throw new Error("Erreur HTTP " + response.status);
    }
    console.log("Base de données chargée");
    const cars = await response.json();
    const main_content = document.getElementById("main_content");
    cars.slice(0, 6).forEach((car) => {
      const car_card = document.createElement("a");
      car_card.href = `location_voiture.html?model_name=${car.model_name}`;
      car_card.target = "_blank";
      car_card.classList.add("car_card");
      car_card.innerHTML = `
          <div class="car_card_img">
          <img src="${car.image_url}" alt="${car.model_name}">
          </div>
          <div class="car_card_info">
          <h2>${car.brand} ${car.model_name}</h2>
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

document.addEventListener("DOMContentLoaded", (event) => {
  //loadCars();
});

const account_button = document.getElementById("compte");

account_button.addEventListener("click", () => {
  if (localStorage.getItem("token")) {
    window.location.href = "account.html";
  } else {
    window.location.href = "log/login.html";
  }
});

// test
async function loadCarsInCarousel(limit = 3) {
  try {
    const response = await fetch(`http://localhost:3000/cars`);
    if (!response.ok) throw new Error("Erreur HTTP " + response.status);

    const cars = await response.json();
    const container = document.getElementById("carousel_container");

    const selectedCars = cars.slice(0, limit);

    // Nettoyage
    container.innerHTML = "";

    // Génération des boutons radio
    selectedCars.forEach((_, index) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "slider";
      radio.id = `item-${index + 1}`;
      if (index === 0) radio.checked = true;
      container.appendChild(radio);
    });

    // Création du container .cards
    const cardsDiv = document.createElement("div");
    cardsDiv.className = "cards";

    selectedCars.forEach((car, index) => {
      const label = document.createElement("label");
      label.setAttribute("for", `item-${index + 1}`);
      label.className = "card";
      label.id = `song-${index + 1}`;
      label.innerHTML = `
              <img src="${car.image_url}" alt="${car.model_name}">
              <div style="position: absolute;
    bottom: 10%;
    right: 0;
    padding: 3rem;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    color: white;
    font-size: 1.2em;
    border-radius: 1rem 0rem 0rem 1rem;">
                  ${car.brand} ${car.model_name}
              </div>
          `;
      cardsDiv.appendChild(label);
    });

    container.appendChild(cardsDiv);

    injectDynamicCarouselStyles(selectedCars.length);
  } catch (error) {
    console.error("Erreur lors du chargement :", error);
  }
}

function injectDynamicCarouselStyles(count) {
  const styleId = "dynamic-carousel-style";
  let style = document.getElementById(styleId);

  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
  }

  let css = `
  .slider {
      position: relative;
      width: 62%;
      aspect-ratio: 4/3;
      align-self: center;
  }
  .slider input[type="radio"] {
      display: none;
  }
  .cards {
      position: relative;
      width: 100%;
      height: 100%;
  }
  .card {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      cursor: pointer;
      transition: transform 0.4s ease, opacity 0.4s ease;
      background: #fff;
  }
  .card img {
      width: 100%; height: 100%;
      object-fit: scale-down;
      display: block;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
  }
  `;

  for (let i = 0; i < count; i++) {
    const current = i + 1;
    const next = ((i + 1) % count) + 1;
    const prev = ((i - 1 + count) % count) + 1;

    css += `
      #item-${current}:checked ~ .cards #song-${current} {
          transform: translateX(0) scale(1);
          opacity: 1;
          z-index: 2;
          border-radius: 1rem;
      }
      #item-${current}:checked ~ .cards #song-${next} {
          transform: translateX(40%) scale(0.8);
          opacity: 0.4;
          z-index: 1;
          border-radius: 1rem;
      }
      #item-${current}:checked ~ .cards #song-${prev} {
          transform: translateX(-40%) scale(0.8);
          opacity: 0.4;
          z-index: 1;
          border-radius: 1rem;  
      }
      `;
  }

  style.textContent = css;
}

// Lancer avec la limite voulue
loadCarsInCarousel(3); // Choisis 3, 5, 6, etc.

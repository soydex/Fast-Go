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

      // Création d'un conteneur pour les infos de la voiture
      const infoContainer = document.createElement("div");
      infoContainer.style = `position: absolute;
        bottom: 10%;
        right: 50px;
        padding: 3rem;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        color: white;
        font-size: 1.2em;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);`;

      infoContainer.innerHTML = `
        <span>${car.brand} ${car.model_name}</span>
        <div><span>${car.rental_price_per_day}€/jour</span> <span>${car.horsepower} Ch - ${car.torque} Nm</span></div>
      `;

      // Création du bouton pour accéder aux détails
      const detailsButton = document.createElement("button");
      detailsButton.textContent = "Voir détails";
      detailsButton.style = `
        margin-top: 10px;
        padding: 8px 15px;
        background: linear-gradient(180deg, rgba(238, 210, 158, 1) 0%, rgba(211, 176, 115, 1) 50%, rgba(177, 141, 87, 1) 100%);
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      `;

      detailsButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Évite de déclencher l'événement du parent
        window.location.href = `location_voiture.html?model_name=${car.model_name}`;
      });

      infoContainer.appendChild(detailsButton);

      const img = document.createElement("img");
      img.src = car.image_url;
      img.alt = car.model_name;

      label.appendChild(img);
      label.appendChild(infoContainer);
      cardsDiv.appendChild(label);
    });

    container.appendChild(cardsDiv);

    injectDynamicCarouselStyles(selectedCars.length);

    startAutoRotation(selectedCars.length);
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
      background: white;
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

// Fonction pour la rotation automatique du carrousel
let autoRotationInterval;

function startAutoRotation(count) {
  // Arrêter tout intervalle existant
  if (autoRotationInterval) {
    clearInterval(autoRotationInterval);
  }

  // Définir l'intervalle pour la rotation automatique (4 secondes)
  autoRotationInterval = setInterval(() => {
    // Trouver le bouton radio actuellement sélectionné
    let currentRadio;
    for (let i = 1; i <= count; i++) {
      if (document.getElementById(`item-${i}`).checked) {
        currentRadio = i;
        break;
      }
    }

    // Calculer le prochain index (rotation circulaire)
    const nextRadio = (currentRadio % count) + 1;

    // Sélectionner le prochain bouton radio
    document.getElementById(`item-${nextRadio}`).checked = true;
  }, 4000); // Intervalle de rotation en millisecondes
}

// Fonction pour arrêter la rotation quand l'utilisateur interagit avec le carrousel
function setupCarouselInteraction(count) {
  for (let i = 1; i <= count; i++) {
    const radio = document.getElementById(`item-${i}`);
    if (radio) {
      radio.addEventListener("change", () => {
        // Réinitialise le timer quand l'utilisateur change manuellement
        if (autoRotationInterval) {
          clearInterval(autoRotationInterval);
          startAutoRotation(count);
        }
      });
    }
  }
}

// Charger le carrousel avec 3 voitures
loadCarsInCarousel(3);

document.addEventListener("DOMContentLoaded", () => {
  const cookiePopup = document.getElementById("cookie-popup");
  const acceptCookiesButton = document.getElementById("accept-cookies");

  if (!localStorage.getItem("cookiesAccepted")) {
    cookiePopup.style.display = "block";
  }

  acceptCookiesButton.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookiePopup.style.display = "none";
  });
});

const contact_button = document.getElementById("contact_button");
const contact_form = document.getElementById("form-contact");
const form_content = document.getElementById("form-content");
const close_form_button = document.getElementById("close-form");

contact_button.addEventListener("click", () => {
  if (localStorage.getItem("token")) {
    form_content.innerHTML = `
      <label for="subject">Sujet</label>
      <input type="text" id="subject" name="subject" placeholder="Sujet" required />

      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" placeholder="Votre message" required></textarea>

      <button type="submit">Envoyer</button>
    `;

    const submitButton = form_content.querySelector("button[type='submit']");
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      try {
        const response = await fetch("http://localhost:3000/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ subject, message, recipient: "admin" }),
        });

        if (!response.ok) {
          let errorMessage = `Erreur HTTP ${response.status}`;
          if (response.headers.get("Content-Type")?.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          }
          throw new Error(errorMessage);
        }

        alert("Message envoyé avec succès !");
        contact_form.style.display = "none";
      } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
        alert(`Une erreur est survenue : ${error.message}`);
      }
    });
  } else {
    form_content.innerHTML = `
      <p>Veuillez vous connecter pour remplir ce formulaire.</p>
      <a href="log/login.html" id="login-button">Se connecter</a>
    `;
    document.getElementById("login-button").addEventListener("click", () => {
      window.location.href = "log/login.html";
    });
  }

  contact_form.style.display = "flex";
});

close_form_button.addEventListener("click", () => {
  contact_form.style.display = "none";
});
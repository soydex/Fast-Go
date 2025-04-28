document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout");
  const username = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  // Récupérer le token depuis le stockage local
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/log/login.html"; // Rediriger vers la page de connexion si pas de token
    return;
  }

  // Récupérer les informations utilisateur
  fetch("http://localhost:3000/me", {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Erreur lors de la récupération des informations utilisateur."
        );
      return response.json();
    })
    .then((user) => {
      username.textContent = user.name;
      userEmail.textContent = user.email;
    })
    .catch((error) => {
      console.error(error);
      alert(
        "Erreur lors de la récupération des informations utilisateur. Veuillez vous reconnecter."
      );
      localStorage.removeItem("token");
      window.location.href = "/log/login.html"; // Rediriger vers la page de connexion
    });

  // Récupérer les statistiques et mettre à jour les divs stats et le graphique
  Promise.all([
    fetch("http://localhost:3000/cars", { headers: { Authorization: token } }),
    fetch("http://localhost:3000/users", { headers: { Authorization: token } }),
    fetch("http://localhost:3000/reservations", { headers: { Authorization: token } }),
  ])
    .then(async ([carsRes, usersRes, reservationsRes]) => {
      if (!carsRes.ok || !usersRes.ok || !reservationsRes.ok) {
        throw new Error("Erreur lors de la récupération des statistiques.");
      }

      const cars = await carsRes.json();
      const users = await usersRes.json();
      const reservations = await reservationsRes.json();

      // Mettre à jour les divs stats
      document.querySelector(".stat:nth-child(1) h2").textContent = cars.length;
      document.querySelector(".stat:nth-child(2) h2").textContent = users.filter(user => user.role === "user").length;
      document.querySelector(".stat:nth-child(3) h2").textContent = reservations.length;

      // Mettre à jour le graphique avec les données dynamiques
      const chartData = [cars.length, users.filter(user => user.role === "user").length, reservations.length];
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Véhicules", "Clients", "Réservations"],
          datasets: [
            {
              label: "Statistiques",
              data: chartData,
              backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"],
              borderRadius: 10,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Aperçu des réservations",
              font: { size: 18 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {},
            },
            x: {
              ticks: {},
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur lors de la récupération des statistiques.");
    });

  // Charger les réservations en cours
  loadReservations();

  // Charger les réservations spécifiques à l'utilisateur connecté
  loadMyReservations();

  // Gestion de la déconnexion
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/log/login.html"; // Rediriger vers la page de connexion
  });
});

const ctx = document.getElementById("reservationsChart").getContext("2d");

// Charger les réservations en cours
function loadReservations() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:3000/reservations", {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors du chargement des réservations.");
      return response.json();
    })
    .then((reservations) => {
      const reservationsContainer = document.getElementById("current-reservations");
      reservationsContainer.innerHTML = ""; // Vider le contenu précédent

      if (reservations.length === 0) {
        reservationsContainer.innerHTML = "<p>Aucune réservation en cours.</p>";
        return;
      }

      reservations.forEach((reservation) => {
        const reservationDiv = document.createElement("div");
        reservationDiv.classList.add("reservation-item");
        reservationDiv.innerHTML = `
          <p><strong>Client :</strong> ${reservation.client_name}</p>
          <p><strong>Véhicule :</strong> ${reservation.model_name} (${reservation.brand})</p>
          <p><strong>Du :</strong> ${reservation.start_date} <strong>au :</strong> ${reservation.end_date}</p>
          <p><strong>Statut :</strong> ${reservation.status}</p>
        `;
        reservationsContainer.appendChild(reservationDiv);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur lors du chargement des réservations.");
    });
}

// Charger les réservations spécifiques à l'utilisateur connecté
function loadMyReservations() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:3000/my-reservations", {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors du chargement de vos réservations.");
      return response.json();
    })
    .then((reservations) => {
      const myReservationsContainer = document.getElementById("my-reservations");
      myReservationsContainer.innerHTML = ""; // Vider le contenu précédent

      if (reservations.length === 0) {
        myReservationsContainer.innerHTML = "<p>Oups.. Vous n'avez pas de réservations actuellement</p>";
        return;
      }

      reservations.forEach((reservation) => {
        const reservationDiv = document.createElement("div");
        reservationDiv.classList.add("reservation-item");
        reservationDiv.innerHTML = `
          <p><strong>Véhicule :</strong> ${reservation.model_name} (${reservation.brand})</p>
          <p><strong>Du :</strong> ${reservation.start_date} <strong>au :</strong> ${reservation.end_date}</p>
          <p><strong>Statut :</strong> ${reservation.status}</p>
        `;
        myReservationsContainer.appendChild(reservationDiv);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur lors du chargement de vos réservations.");
    });
}



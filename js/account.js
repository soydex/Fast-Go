// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  // Sidebar toggle functionality
  const sidebar = document.getElementById("sidebar");
  sidebar.addEventListener("mouseenter", () => {
    sidebar.classList.add("expanded");
  });

  sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.remove("expanded");
  });

  // Original JS functionality
  const logoutButton = document.getElementById("logout");
  const username = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");

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
      profileName.textContent = user.name;
      profileEmail.textContent = user.email;
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
    fetch("http://localhost:3000/cars", {
      headers: { Authorization: token },
    }),
    fetch("http://localhost:3000/users", {
      headers: { Authorization: token },
    }),
    fetch("http://localhost:3000/reservations", {
      headers: { Authorization: token },
    }),
  ])
    .then(async ([carsRes, usersRes, reservationsRes]) => {
      if (!carsRes.ok || !usersRes.ok || !reservationsRes.ok) {
        throw new Error("Erreur lors de la récupération des statistiques.");
      }

      const cars = await carsRes.json();
      const users = await usersRes.json();
      const reservations = await reservationsRes.json();

      // Mettre à jour les divs stats
      document.getElementById("vehicles-count").textContent = cars.length;
      document.getElementById("users-count").textContent = users.filter(
        (user) => user.role === "user"
      ).length;
      document.getElementById("reservations-count").textContent =
        reservations.length;

      // Mettre à jour le graphique avec les données dynamiques
      const chartData = [
        cars.length,
        users.filter((user) => user.role === "user").length,
        reservations.length,
      ];
      const ctx = document.getElementById("reservationsChart").getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Activité",
              data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
              fill: false,
              borderColor: "#3182ce",
              tension: 0.4,
              pointBackgroundColor: "#3182ce",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
              },
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

  // Charger les messages pour les administrateurs
  if (
    localStorage.getItem("token") &&
    document.getElementById("admin-messages")
  ) {
    loadAdminMessages();
  }

  // Gestion de la déconnexion
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/log/login.html"; // Rediriger vers la page de connexion
  });
});

// Charger les réservations en cours
function loadReservations() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:3000/reservations", {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Erreur lors du chargement des réservations.");
      return response.json();
    })
    .then((reservations) => {
      const reservationsContainer = document.getElementById(
        "current-reservations"
      );
      reservationsContainer.innerHTML = ""; // Vider le contenu précédent

      if (reservations.length === 0) {
        reservationsContainer.innerHTML =
          "<p class='text-center text-gray-400'>Aucune réservation en cours.</p>";
        return;
      }

      reservations.forEach((reservation) => {
        const reservationDiv = document.createElement("div");
        reservationDiv.classList.add("reservation-item");
        reservationDiv.innerHTML = `
              <div class="flex justify-between">
                <div>
                  <h4 class="font-medium">${reservation.model_name} (${reservation.brand})</h4>
                  <p class="text-sm text-gray-400">Client: ${reservation.client_name}</p>
                </div>
                <div class="text-right">
                  <span class="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                    ${reservation.status}
                  </span>
                  <p class="text-xs text-gray-400 mt-1">${reservation.start_date} - ${reservation.end_date}</p>
                </div>
              </div>
            `;
        reservationsContainer.appendChild(reservationDiv);
      });
    })
    .catch((error) => {
      console.error(error);
      console.log("Erreur lors du chargement des réservations.");
    });
}

// Charger les réservations spécifiques à l'utilisateur connecté
function loadMyReservations() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:3000/my-reservations", {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Erreur lors du chargement de vos réservations.");
      return response.json();
    })
    .then((reservations) => {
      const myReservationsContainer =
        document.getElementById("my-reservations");
      myReservationsContainer.innerHTML = ""; // Vider le contenu précédent

      if (reservations.length === 0) {
        myReservationsContainer.innerHTML =
          "<p class='text-center text-gray-400'>Oups.. Vous n'avez pas de réservations actuellement</p>";
        return;
      }

      reservations.forEach((reservation) => {
        const reservationDiv = document.createElement("div");
        reservationDiv.classList.add("reservation-item");
        reservationDiv.innerHTML = `
              <div class="flex justify-between">
                <div>
                  <h4 class="font-medium">${reservation.model_name} (${reservation.brand})</h4>
                </div>
                <div class="text-right">
                  <span class="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-500">
                    ${reservation.status}
                  </span>
                  <p class="text-xs text-gray-400 mt-1">${reservation.start_date} - ${reservation.end_date}</p>
                </div>
              </div>
            `;
        myReservationsContainer.appendChild(reservationDiv);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur lors du chargement de vos réservations.");
    });
}

// Charger les messages reçus par les administrateurs
function loadAdminMessages() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:3000/messages", {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Erreur lors du chargement des messages.");
      return response.json();
    })
    .then((messages) => {
      const messagesContainer = document.getElementById("admin-messages");
      messagesContainer.innerHTML = ""; // Vider le contenu précédent

      if (messages.length === 0) {
        messagesContainer.innerHTML =
          "<p class='text-center text-gray-400'>Aucun message reçu.</p>";
        return;
      }

      messages.forEach((msg) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message-item");
        messageDiv.innerHTML = `
              <div class="flex justify-between">
                <div>
                  <h4 class="font-medium">${msg.subject}</h4>
                  <p class="text-sm text-gray-400">De: ${
                    msg.sender_name || msg.sender_email || "Utilisateur inconnu"
                  }</p>
                </div>
                <div>
                  <button class="text-blue-500 hover:text-blue-400">
                    <i data-feather="eye"></i>
                  </button>
                </div>
              </div>
              <p class="mt-2 text-sm">${msg.message.substring(0, 100)}${
          msg.message.length > 100 ? "..." : ""
        }</p>
            `;
        messagesContainer.appendChild(messageDiv);
        feather.replace();
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur lors du chargement des messages.");
    });
}

// Dark/Light theme toggle functionality
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const icon = themeToggleBtn.querySelector("i");
  if (document.body.classList.contains("light-theme")) {
    icon.setAttribute("data-feather", "sun");
  } else {
    icon.setAttribute("data-feather", "moon");
  }
  feather.replace();
});

// Edit profile functionality
const editProfileBtn = document.getElementById("edit-profile");
editProfileBtn.addEventListener("click", () => {
  alert("Fonctionnalité de modification du profil à implémenter");
});

// Change password functionality
const changePasswordBtn = document.getElementById("change-password");
changePasswordBtn.addEventListener("click", () => {
  alert("Fonctionnalité de changement de mot de passe à implémenter");
});

// Delete account functionality
const deleteAccountBtn = document.getElementById("delete-account");
deleteAccountBtn.addEventListener("click", () => {
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible."
  );
  if (confirmation) {
    alert("Fonctionnalité de suppression de compte à implémenter");
  }
});

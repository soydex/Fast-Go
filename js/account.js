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
      document.querySelector(".stat:nth-child(2) h2").textContent = users.filter(user => user.role === "client").length;

      // Mettre à jour le graphique avec les données dynamiques
      const chartData = [cars.length, users.filter(user => user.role === "client").length, reservations.length];
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

  // Gestion de la déconnexion
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/log/login.html"; // Rediriger vers la page de connexion
  });
});

const ctx = document.getElementById("reservationsChart").getContext("2d");



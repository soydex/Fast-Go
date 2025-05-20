document.addEventListener('DOMContentLoaded', () => {
    const clientInfoElement = document.getElementById('client-info');
    const logoutButton = document.getElementById('logout');

    // Récupérer le token depuis le stockage local
    const token = localStorage.getItem('token');
    if (!token) {
        clientInfoElement.textContent = 'Vous devez être connecté pour accéder à cette page.';
        return;
    }

    // Récupérer les informations client
    fetch('http://localhost:3000/client', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des informations client.');
        return response.json();
    })
    .then(client => {
        clientInfoElement.innerHTML = `Bienvenue <strong>${client.name}</strong> (${client.email})`;
    })
    .catch(error => {
        console.error(error);
        clientInfoElement.textContent = 'Impossible de charger les informations client.';
    });

    // Gestion de la déconnexion
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/log/login.html'; // Rediriger vers la page de connexion
    });
});

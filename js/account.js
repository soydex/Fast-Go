document.addEventListener('DOMContentLoaded', () => {
    const userInfoElement = document.getElementById('user-info');
    const logoutButton = document.getElementById('logout');

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
        userInfoElement.innerHTML = `Vous êtes connecté en tant que <strong>${user.name}</strong> (${user.email})`;
    })
    .catch(error => {
        console.error(error);
        userInfoElement.textContent = 'Impossible de charger les informations utilisateur.';
    });

    // Gestion de la déconnexion
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/log/login.html'; // Rediriger vers la page de connexion
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const adminInfoElement = document.getElementById('admin-info');
    const logoutButton = document.getElementById('logout');

    // Récupérer le token depuis le stockage local
    const token = localStorage.getItem('token');
    if (!token) {
        adminInfoElement.textContent = 'Vous devez être connecté pour accéder à cette page.';
        return;
    }

    // Récupérer les informations administratives
    fetch('http://localhost:3000/admin', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des informations administratives.');
        return response.json();
    })
    .then(admin => {
        adminInfoElement.innerHTML = `Bienvenue <strong>${admin.name}</strong> (${admin.email})`;
    })
    .catch(error => {
        console.error(error);
        adminInfoElement.textContent = 'Impossible de charger les informations administratives.';
    });

    // Gestion de la déconnexion
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/log/login.html'; // Rediriger vers la page de connexion
    });
});

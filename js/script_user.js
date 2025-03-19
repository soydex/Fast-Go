async function loadUsers() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const tableBody = document.getElementById('userTable');
        tableBody.innerHTML = ""; // Vider le tableau

        users.forEach(user => {
            const row = `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><button onclick="deleteUser(${user.id})">❌</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
        document.getElementById('userTable').innerHTML = "<tr><td colspan='4'>Erreur</td></tr>";
    }
}

async function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });

    if (response.ok) {
        document.getElementById('userForm').reset();
        loadUsers(); // Recharger la liste
    } else {
        alert("Erreur lors de l'ajout !");
    }
}

async function deleteUser(id) {
    if (!confirm("Voulez-vous supprimer cet utilisateur ?")) return;

    const response = await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });

    if (response.ok) {
        loadUsers(); // Recharger la liste après suppression
    } else {
        alert("Erreur lors de la suppression !");
    }
}

document.getElementById('userForm').addEventListener('submit', addUser);
loadUsers(); // Charger les utilisateurs au démarrage
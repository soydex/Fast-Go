async function loadUsers() {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const tableBody = document.getElementById('userTable');
        tableBody.innerHTML = ""; // Vider le tableau

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td contenteditable="true" class="editable" data-field="name">${user.name}</td>
                <td contenteditable="true" class="editable" data-field="email">${user.email}</td>
                <td>
                  <select class="editable" data-field="role">
                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>Utilisateur</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Administrateur</option>
                  </select>
                </td>
                <td>${new Date(user.created_at).toLocaleString()}</td>
                <td>
                  <button class="edit-btn" data-id="${user.id}">🖉</button>
                  <button class="delete-btn" data-id="${user.id}">❌</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Ajouter les écouteurs d'événements sur les boutons d'édition
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.target.dataset.id;
                const row = event.target.closest('tr');
                const updatedData = {};

                row.querySelectorAll('.editable').forEach(cell => {
                    const field = cell.dataset.field;
                    updatedData[field] = cell.tagName === 'SELECT' ? cell.value : cell.textContent.trim();
                });

                updateUser(userId, updatedData);
            });
        });

        // Ajouter les écouteurs d'événements sur les boutons de suppression
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.target.dataset.id;
                deleteUser(userId);
            });
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
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            alert('Utilisateur ajouté avec succès');
            document.getElementById('userForm').reset();
            loadUsers(); // Recharger la liste
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de l'ajout !");
    }
}

async function deleteUser(id) {
    if (!confirm("Voulez-vous supprimer cet utilisateur ?")) return;

    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadUsers(); // Recharger la liste après suppression
        } else {
            alert("Erreur lors de la suppression !");
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de la suppression !");
    }
}

async function updateUser(id, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert('Utilisateur mis à jour avec succès');
            loadUsers(); // Recharger la liste
        } else {
            alert("Erreur lors de la mise à jour !");
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de la mise à jour !");
    }
}

// Attacher l'événement submit au formulaire
document.getElementById('userForm').addEventListener('submit', addUser);

// Charger les utilisateurs au démarrage
document.addEventListener('DOMContentLoaded', loadUsers);

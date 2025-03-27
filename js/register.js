const registerButton = document.getElementById('register_submit');
registerButton.addEventListener('click', registerUser);
const Spaninfo = document.getElementById('span_notif');


async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('typenameX').value;
    const email = document.getElementById('typeEmailX').value;
    const password = document.getElementById('typePasswordX').value;
    const role = 'user';

    if (!name || !email || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();
        if (data.error) {
            Spaninfo.style.display = 'block';
            Spaninfo.style.color = 'red';
            if (data.error.includes('SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email')) {
                Spaninfo.innerHTML="Cet email est déjà utilisé. Veuillez en choisir un autre.";
            } else {
                alert(data.error);
            }
        } else {
            alert('Inscription réussie');
            // Rediriger vers la page de connexion
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de l'inscription !");
    }
}
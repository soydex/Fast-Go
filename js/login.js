const loginButton = document.getElementById('login_submit');
loginButton.addEventListener('click', loginUser);
const Spaninfo = document.getElementById('span_notif');

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('typeEmailX').value;
    const password = document.getElementById('typePasswordX').value;

    if (!email || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.error) {
            Spaninfo.style.display = 'block';
            Spaninfo.style.color = 'red';
            Spaninfo.innerHTML='Email ou mot de passe incorrect';
            alert(data.error);
        } else {
            localStorage.setItem('token', data.token);
            Spaninfo.style.display = 'block';
            Spaninfo.style.color = 'green';
            Spaninfo.innerHTML='Connexion réussie';
            // Rediriger vers une page protégée
            window.location.href = '../catalogue.html';
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de la connexion !");
    }
}
const RegisterButton = document.getElementById('register_submit');
const span_notif = document.getElementById('span_notif');
RegisterButton.addEventListener('click', addUser);

async function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('typenameX').value;
    const email = document.getElementById('typeEmailX').value;
    const password = document.getElementById('typePasswordX').value;

    if ( !name || !email || !password) {
        alert('Veuillez remplir tous les champs.');
        return;}

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: 'user' })
        });

        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            span_notif.style.display = 'block';
            span_notif.innerHTML = 'Utilisateur ajouté avec succès';
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors de l'ajout !");
    }
}
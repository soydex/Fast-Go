document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById('typeEmailX').value;
  const password = document.getElementById('typePasswordX').value;

  if (!email || !password) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'authentification');
    }

    const data = await response.json();
    if (data.success) {
      alert('Connexion réussie');
      // Rediriger vers une autre page ou effectuer une autre action
      window.location.href = '/dashboard.html';
    } else {
      alert('Email ou mot de passe incorrect');
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue. Veuillez réessayer plus tard.');
  }
});


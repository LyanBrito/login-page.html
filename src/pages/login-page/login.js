document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:8081/user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: password,
            }),
        });

        const result = await response.text();

        console.log(response.status);
        console.log(result);

        if (result.trim() === 'Logado com sucesso') {
            alert('✅ Login successful! Welcome back, champ!');
        } else if (result.trim() === 'Usuario não encontrado') {
            alert('😕 User not found. Maybe sign up first?');
        } else if (result.trim() === 'Senha incorreta') {
            alert('🚫 Incorrect password, try again!');
        } else {
            console.log(result);
            alert('🤔 Unexpected response: ' + result);
        }

    } catch (error) {
        console.error('⚠️ Uh oh, signin blew up:', error);
        alert('Something went wrong... backend might be napping 😴');
    }
});

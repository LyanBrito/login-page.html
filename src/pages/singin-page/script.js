document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // stop the form from reloading the page (very rude behavior 😤)

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    // const repeatPassword = document.getElementById('repeat-senha').value.trim();
    //
    // if (senha !== repeatPassword) {
    //     alert('Passwords do not match! 😬');
    //     return;
    // }

    try {
        const response = await fetch('http://localhost:8081/user/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
            }),
        });

        if (!response.ok) {
            throw new Error('Signup failed 😭');
        }

        const createdUser = await response.json();
        console.log('🎉 User created successfully!');

        alert(`Welcome aboard, ${createdUser.nome}! 🚀`);

    } catch (error) {
        console.error('Oops! Something went wrong:', error);
        alert('Could not sign up. Try again later 🥲');
    }
});
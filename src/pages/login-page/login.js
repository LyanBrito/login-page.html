// Função para enviar dados do formulário para o backend Spring
async function enviarDadosParaBackend(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os valores dos campos
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Cria o objeto com os dados
    const dadosUsuario = {
        email: email,
        senha: senha,

    };

    try {
        // Envia os dados para o backend Spring
        const response = await fetch('http://localhost:8081/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosUsuario)
        });
        console.log(response);
        if (response.ok) {
            const resultado = await response.text();
            console.log('Usuário cadastrado com sucesso:', resultado);
            alert('Cadastro realizado com sucesso!');

            // Limpa o formulário
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        } else {
            const erro = await response.json();
            console.error('Erro ao cadastrar:', erro);
            alert('Erro ao cadastrar usuário: ' + (erro.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro na requisição:', error, error.message);
        alert('Erro ao conectar com o servidor');
    }
}

// Adiciona o evento de submit ao formulário quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', enviarDadosParaBackend);
    }
});
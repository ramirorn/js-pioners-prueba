// ! Siempre se necesita usar la url del host, en este caso de nuestro host en la nube:
const URL = "https://js-pioners-prueba.onrender.com"

// * Ejemplo de registro con host en la nube (render)
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        console.log(username, password)

        const res = await fetch(`${URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        console.log(res)
        const data = await res.json();
        showMessage(data.message, res.ok);
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const res = await fetch(`${URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        showMessage(data.message, res.ok);
    });

    function showMessage(message, isSuccess) {
        messageDiv.textContent = message;
        messageDiv.className = isSuccess ? 'message success' : 'message error';
    }
});
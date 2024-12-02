const form = document.querySelector("#admin-signup-form");

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());

        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = '/login.html';
        } else {
            alert(result.message);
        }
    });
}

const loginform = document.querySelector("#admin-login-form");

if (loginform) {
    loginform.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Login response:", result);
            alert('Login successful');
            window.location.href = 'http://localhost:3000';
        } else {
            alert(result.message);
        }
    });
}

const fetchProtectedData = async () => {
    try {
        const response = await fetch('http://localhost:3000', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        console.error('Error fetching protected data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProtectedData();
});

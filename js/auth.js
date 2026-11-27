// каждый вход на страницу курсовой — новая сессия
localStorage.removeItem('currentUser');

// --- переключение табов ---
const tabLogin = document.getElementById('tab_login');
const tabRegister = document.getElementById('tab_register');

tabLogin.addEventListener('click', () => switchTab('login'));
tabRegister.addEventListener('click', () => switchTab('register'));

function switchTab(name) {
    document.getElementById('login_form').classList.toggle('hidden', name !== 'login');
    document.getElementById('register_form').classList.toggle('hidden', name !== 'register');
    tabLogin.classList.toggle('active', name === 'login');
    tabRegister.classList.toggle('active', name === 'register');
}

// --- регистрация ---
document.getElementById('register_form').addEventListener('submit', function (e) {
    e.preventDefault();

    const login = document.getElementById('reg_name').value.trim();
    const pass = document.getElementById('reg_pass').value;
    const pass2 = document.getElementById('reg_pass2').value;
    const errorEl = document.getElementById('register_error');
    errorEl.textContent = '';

    if (login.length < 2) { errorEl.textContent = 'Логин слишком короткий'; return; }
    if (pass.length < 4) { errorEl.textContent = 'Пароль слишком короткий (минимум 4 символа)'; return; }
    if (pass !== pass2) { errorEl.textContent = 'Пароли не совпадают'; return; }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.login === login)) {
        errorEl.textContent = 'Такой логин уже занят';
        return;
    }

    users.push({ login: login, password: pass, stats: [] });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', login);
    window.location.href = 'game.html';
});

// --- вход ---
document.getElementById('login_form').addEventListener('submit', function (e) {
    e.preventDefault();

    const login = document.getElementById('login_name').value.trim();
    const pass = document.getElementById('login_pass').value;
    const errorEl = document.getElementById('login_error');
    errorEl.textContent = '';

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.login === login);

    if (!user || user.password !== pass) {
        errorEl.textContent = 'Неверный логин или пароль';
        return;
    }

    localStorage.setItem('currentUser', login);
    window.location.href = 'game.html';
});

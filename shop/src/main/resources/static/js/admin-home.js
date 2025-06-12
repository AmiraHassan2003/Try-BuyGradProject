const themeToggle = document.getElementById('toggle-theme');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');

    if (isDark) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    }
});

const themeToggle = document.getElementById('toggle-theme');
const themeIcon = themeToggle.querySelector('i');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mainNav.classList.remove('show');
    }
});

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');

    themeIcon.classList.replace(
        isDark ? 'fa-sun' : 'fa-moon',
        isDark ? 'fa-moon' : 'fa-sun'
    );

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

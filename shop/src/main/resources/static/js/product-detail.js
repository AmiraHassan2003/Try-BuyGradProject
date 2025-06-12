const qtyInput = document.getElementById('quantity');
const addToCartBtn = document.getElementById('add-to-cart');

addToCartBtn.onclick = () => {
    alert(`Added ${qtyInput.value} item(s) to your cart.`);
};

const themeToggle = document.getElementById('toggle-theme');
const themeIcon = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeIcon.classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

menuToggle.onclick = () => nav.classList.toggle('show');

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) nav.classList.remove('show');
});

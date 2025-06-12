const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const cartTable = document.getElementById('cart-table');
const totalPriceEl = document.getElementById('total-price');
const themeToggle = document.getElementById('toggle-theme');
const themeIcon = themeToggle.querySelector('i');


menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mainNav.classList.remove('show');
    }
});

function formatPrice(num) {
    return '$' + num.toFixed(2);
}

function updateSubtotal(row) {
    const price = parseFloat(row.querySelector('.price').textContent.replace('$', ''));
    const qtyNumber = row.querySelector('.qty-number');
    let qty = parseInt(qtyNumber.textContent);
    if (qty < 1 || isNaN(qty)) {
        qty = 1;
        qtyNumber.textContent = '1';
    }
    const subtotal = price * qty;
    row.querySelector('.subtotal').textContent = formatPrice(subtotal);
    return subtotal;
}

function updateTotal() {
    let total = 0;
    const rows = cartTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
        total += updateSubtotal(row);
    });
    totalPriceEl.textContent = 'Total: ' + formatPrice(total);
}

cartTable.addEventListener('click', e => {
    const target = e.target;

    if (target.classList.contains('plus')) {
        const qtyNumber = target.parentElement.querySelector('.qty-number');
        let qty = parseInt(qtyNumber.textContent);
        qtyNumber.textContent = qty + 1;
        updateTotal();
    }

    if (target.classList.contains('minus')) {
        const qtyNumber = target.parentElement.querySelector('.qty-number');
        let qty = parseInt(qtyNumber.textContent);
        if (qty > 1) {
            qtyNumber.textContent = qty - 1;
            updateTotal();
        }
    }

    if (target.classList.contains('remove-btn')) {
        const row = target.closest('tr');
        row.remove();
        updateTotal();
    }
});

updateTotal();

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


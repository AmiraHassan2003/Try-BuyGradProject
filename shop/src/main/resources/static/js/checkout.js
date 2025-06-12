const paymentSelect = document.getElementById('paymentMethod');
const creditFields = document.getElementById('creditFields');
const cashNote = document.getElementById('cashNote');
const form = document.getElementById('checkout-form');
const cardNumberInput = document.getElementById('cardNumber');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const expiryInput = document.getElementById('expiryDate');
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

paymentSelect.addEventListener('change', function () {
    if (this.value === 'credit') {
        creditFields.classList.remove('hidden');
        cashNote.classList.add('hidden');
    } else if (this.value === 'cash') {
        cashNote.classList.remove('hidden');
        creditFields.classList.add('hidden');
    } else {
        creditFields.classList.add('hidden');
        cashNote.classList.add('hidden');
    }
});

cardNumberInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // إزالة غير الأرقام
    value = value.substring(0, 16); // حد أقصى 16 رقم
    this.value = value.replace(/(.{4})/g, '$1 ').trim(); // مسافة كل 4 أرقام
});

expiryInput.addEventListener('input', function () {
    let value = this.value.replace(/[^0-9]/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.value = value.slice(0, 5);
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = paymentSelect.value;

    if (!name || !email || !phone || !address || !payment) {
        alert('Please fill in all required fields.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const phoneRegex = /^01[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid Egyptian phone number (11 digits starting with 01).');
        return;
    }

    if (payment === 'credit') {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const expiry = expiryInput.value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        const cardRegex = /^\d{16}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3}$/;

        if (!cardRegex.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number.');
            return;
        }

        if (!expiryRegex.test(expiry)) {
            alert('Please enter expiry date in MM/YY format.');
            return;
        }

        const [expMonth, expYear] = expiry.split('/');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        if (parseInt(expYear) < currentYear || (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
            alert('This card is expired. Please use a valid card.');
            return;
        }

        if (!cvvRegex.test(cvv)) {
            alert('Please enter a valid 3-digit CVV.');
            return;
        }
    }

    alert('Order Confirmed! You will receive a confirmation email shortly.');
    form.reset();
    creditFields.classList.add('hidden');
    cashNote.classList.add('hidden');
});

const themeToggle = document.getElementById('toggle-theme');
const themeIcon = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
} else {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    }
});


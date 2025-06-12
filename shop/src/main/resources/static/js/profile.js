const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const sidebarItems = document.querySelectorAll('.sidebar nav ul li');
const sections = document.querySelectorAll('.section');
const accountForm = document.getElementById('account-form');
const confirmationMessage = document.getElementById('confirmation');
const themeToggle = document.getElementById('toggle-theme');
const themeIcon = themeToggle.querySelector('i');

const ordersTableBody = document.getElementById('orders-table-body');



menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
});

// تأكد إن القائمة بتتقفل لما الشاشة تكبر تاني
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mainNav.classList.remove('show');
    }
});

const orders = [
    { id: '#1001', date: '2025-04-12', status: 'Delivered', total: '$120.00', detailsLink: 'order-details.html?id=1001' },
    { id: '#1002', date: '2025-04-27', status: 'Processing', total: '$80.00', detailsLink: 'order-details.html?id=1002' },
    { id: '#1003', date: '2025-05-10', status: 'Shipped', total: '$65.00', detailsLink: 'order-details.html?id=1003' },
];

// Render orders in table
function renderOrders() {
    ordersTableBody.innerHTML = '';
    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${order.id}</td>
        <td>${order.date}</td>
        <td>${order.status}</td>
        <td>${order.total}</td>
        <td><a href="${order.detailsLink}">View</a></td>
    `;
        ordersTableBody.appendChild(tr);
    });
}

// Load profile data from localStorage or set defaults
function loadProfileData() {
    const data = JSON.parse(localStorage.getItem('profileData'));
    if (data) {
        accountForm.fullName.value = data.fullName || '';
        accountForm.email.value = data.email || '';
        accountForm.phone.value = data.phone || '';
        accountForm.address.value = data.address || '';
    } else {
        accountForm.fullName.value = 'Shawqy Hussien';
        accountForm.email.value = 'shawqy@gmail.com';
        accountForm.phone.value = '+20 1155397963';
        accountForm.address.value = '123 Cairo Street, Cairo, Egypt';
    }
}

function saveProfileData(data) {
    localStorage.setItem('profileData', JSON.stringify(data));
}

sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const sectionId = item.dataset.section;
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });
});

accountForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = {
        fullName: accountForm.fullName.value.trim(),
        email: accountForm.email.value.trim(),
        phone: accountForm.phone.value.trim(),
        address: accountForm.address.value.trim(),
    };

    if (!formData.fullName || !formData.email) {
        alert('Full Name and Email are required.');
        return;
    }

    saveProfileData(formData);

    confirmationMessage.style.display = 'block';
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000);
});

window.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    renderOrders();
});

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

document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("categoryFilter");
    const productGrid = document.querySelector(".product-grid");
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const themeToggle = document.getElementById("toggle-theme");
    const themeIcon = themeToggle.querySelector("i");

    const products = Array.from(document.querySelectorAll(".product-card"));
    const productsPerPage = 4;
    let currentPage = 1;

    // فلترة حسب الكاتيجوري
    categoryFilter.addEventListener("change", () => {
        currentPage = 1;
        renderProducts();
    });

    // زر القائمة للموبايل
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("show");
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) mainNav.classList.remove("show");
    });

    // الوضع الداكن
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        themeIcon.classList.replace(isDark ? "fa-sun" : "fa-moon", isDark ? "fa-moon" : "fa-sun");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // عرض المنتجات بالصفحات
    function renderProducts() {
        const selected = categoryFilter.value;
        const filtered = products.filter(p => {
            const category = p.getAttribute("data-category");
            return selected === "all" || selected === category;
        });

        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;

        products.forEach(p => p.style.display = "none");
        filtered.slice(start, end).forEach(p => p.style.display = "block");

        renderPagination(filtered.length);
        attachCartButtons();
    }

    // إضافة أزرار التنقل
    function renderPagination(totalItems) {
        let container = document.getElementById("pagination");
        if (!container) {
            container = document.createElement("div");
            container.id = "pagination";
            container.className = "pagination";
            productGrid.after(container);
        }
        container.innerHTML = "";

        const totalPages = Math.ceil(totalItems / productsPerPage);

        if (totalPages <= 1) return;

        if (currentPage > 1) {
            const prev = document.createElement("button");
            prev.textContent = "Prev";
            prev.onclick = () => {
                currentPage--;
                renderProducts();
            };
            container.appendChild(prev);
        }

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.classList.add("active");
            btn.onclick = () => {
                currentPage = i;
                renderProducts();
            };
            container.appendChild(btn);
        }

        if (currentPage < totalPages) {
            const next = document.createElement("button");
            next.textContent = "Next";
            next.onclick = () => {
                currentPage++;
                renderProducts();
            };
            container.appendChild(next);
        }
    }

    // تعامل مع زر "إضافة إلى السلة"
    function attachCartButtons() {
        const addButtons = document.querySelectorAll(".add-to-cart-btn");
        addButtons.forEach(btn => {
            btn.onclick = () => {
                alert("✅ Product added to cart");
            };
        });
    }

    // أول تحميل
    renderProducts();
});

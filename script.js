const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const heroBackdrop = document.querySelector(".hero-backdrop");
const yearElement = document.querySelector("[data-year]");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

const updateParallax = () => {
    if (!heroBackdrop) {
        return;
    }

    const offset = Math.min(window.scrollY * 0.12, 90);
    heroBackdrop.style.setProperty("--parallax-y", offset + "px");
};

window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax();

if (header) {
    header.setAttribute("data-ready", "true");
}
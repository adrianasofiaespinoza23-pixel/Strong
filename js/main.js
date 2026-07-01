// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = btn.querySelector('span');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isHidden = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
    icon.textContent = isHidden ? 'close' : 'menu';
    document.body.style.overflow = isHidden ? 'hidden' : 'auto';
    btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
}

btn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', () => {
    if (!menu.classList.contains('hidden')) toggleMenu();
}));

// In-page nav: scroll to the target section but keep the URL clean (no #hash)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const target = id ? document.getElementById(id) : null;
        e.preventDefault();
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        history.replaceState(null, '', window.location.pathname + window.location.search);
    });
});

// Scroll Animations
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.12 });

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
});

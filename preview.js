// Nav: add .scrolled class on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll-in animations with staggered delay per group
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

// Stagger siblings within the same parent container
document.querySelectorAll('.observe').forEach((el, i) => {
    const siblings = Array.from(el.parentElement.querySelectorAll('.observe'));
    const siblingIndex = siblings.indexOf(el);
    el.style.transitionDelay = `${siblingIndex * 0.07}s`;
    observer.observe(el);
});

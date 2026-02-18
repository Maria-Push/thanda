// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hide/Show Navbar on Scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100; // Start hiding after scrolling 100px

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide navbar
                navbar.style.transform = 'translate(-50%, -120%)';
                navbar.style.opacity = '0';
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translateX(-50%)';
                navbar.style.opacity = '1';
            }
        } else {
            // At top of page - always show
            navbar.style.transform = 'translateX(-50%)';
            navbar.style.opacity = '1';
        }

        lastScrollTop = scrollTop;
    });
});
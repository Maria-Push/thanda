// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburgerButton');
    const navbarMenu = document.getElementById('navbarMenu');

    // Toggle menu when hamburger is clicked
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            hamburgerButton.classList.toggle('active');
        });
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
                hamburgerButton.classList.remove('active');
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

    // ========================================
    // ANIMATED PAW TRACKS
    // ========================================
    
    const pawContainer = document.getElementById('pawTracks');
    
    if (pawContainer) {
        // Track positions - diagonal path across page
        const trackPath = [
    { top: '58%', left: '0%', rotation: 88, flip: false },      
    { top: '64%', left: '7%', rotation: 92, flip: true },       
    { top: '59%', left: '14%', rotation: 95, flip: false },     
    { top: '68%', left: '21%', rotation: 85, flip: true },      
    { top: '61%', left: '28%', rotation: 90, flip: false },     
    { top: '66%', left: '35%', rotation: 88, flip: true },      
    { top: '63%', left: '42%', rotation: 93, flip: false },     
    { top: '69%', left: '49%', rotation: 87, flip: true },      
    { top: '58%', left: '56%', rotation: 91, flip: false },     
    { top: '65%', left: '63%', rotation: 94, flip: true },      
    { top: '60%', left: '70%', rotation: 86, flip: false },     
    { top: '67%', left: '77%', rotation: 89, flip: true },      
    { top: '62%', left: '84%', rotation: 92, flip: false },     
    { top: '69%', left: '91%', rotation: 88, flip: true }       
];

        function createPawTracks() {
            // Clear existing tracks
            pawContainer.innerHTML = '';
            
            // Create track elements
            trackPath.forEach((pos, index) => {
    const track = document.createElement('div');
    track.className = 'paw-track';
    track.innerHTML = '🐾';
    track.style.top = pos.top;
    track.style.left = pos.left;
    track.style.setProperty('--rotation', `${pos.rotation}deg`);
    
    // Flip every other paw for realistic walking
    if (pos.flip) {
        track.style.transform = `scaleY(-1) scale(0.3) rotate(${pos.rotation}deg)`;
    }
    
    pawContainer.appendChild(track);
                
                // Animate appearance with delay
                setTimeout(() => {
                    track.classList.add('show');
                }, index * 300);
                
                // Fade out after being visible
                setTimeout(() => {
                    track.classList.add('fade-out');
                }, index * 300 + 2000);
                
                // Remove from DOM after animation
                setTimeout(() => {
                    track.remove();
                }, index * 300 + 3000);
            });
        }

        // Trigger when "Why It Matters" section becomes visible
// Trigger when "Why It Matters" section becomes visible
const whyMattersSection = document.querySelector('#impact');  // Using ID is more reliable
let hasPlayedOnSection = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasPlayedOnSection) {
            hasPlayedOnSection = true;
            setTimeout(() => {
                createPawTracks();
                // Allow it to play again if user scrolls away and back
                setTimeout(() => {
                    hasPlayedOnSection = false;
                }, 10000);  // Reset after 10 seconds
            }, 500);
        }
    });
}, { threshold: 0.3 });  // Trigger when 30% of section is visible

if (whyMattersSection) {
    observer.observe(whyMattersSection);
}
}
});
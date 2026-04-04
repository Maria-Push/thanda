/* ============================================================
   THANDA WILDLIFE SANCTUARY — script.js
   1. Mobile navigation toggle
   2. Navbar hide/show on scroll
   3. Animated paw tracks
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ========================================================
       1. MOBILE NAVIGATION TOGGLE
    ======================================================== */

    const hamburger = document.getElementById('hamburgerButton');
    const navMenu   = document.getElementById('navbarMenu');

    if (hamburger && navMenu) {
        const navList = navMenu.querySelector('.navbar-nav');

        hamburger.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('active');

    // Keep aria-expanded in sync with visual state
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Toggle .active on the button itself for the × animation
    hamburger.classList.toggle('active', isOpen);
});

        // Close menu when any nav link is tapped on mobile
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                        navList.classList.remove('active');
                        hamburger.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ========================================================
       2. SMOOTH SCROLL FOR ANCHOR LINKS
       (CSS scroll-behavior handles most cases, but this ensures
       it works in browsers that don't support it natively)
    ======================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ========================================================
       3. NAVBAR HIDE / SHOW ON SCROLL
       Hides when scrolling down, reappears when scrolling up.
       Always visible at the top of the page.
    ======================================================== */

    const navbar         = document.querySelector('.navbar');
    const SCROLL_THRESHOLD = 100; // px before hide behaviour kicks in
    let   lastScrollY    = 0;

    if (navbar) {
        window.addEventListener('scroll', function () {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;

            if (currentScrollY <= SCROLL_THRESHOLD) {
                // Always show at top
                navbar.style.transform = 'translateX(-50%)';
                navbar.style.opacity   = '1';
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down — hide
                navbar.style.transform = 'translate(-50%, -120%)';
                navbar.style.opacity   = '0';
            } else {
                // Scrolling up — show
                navbar.style.transform = 'translateX(-50%)';
                navbar.style.opacity   = '1';
            }

            lastScrollY = currentScrollY;
        }, { passive: true }); // passive: true improves scroll performance
    }

    /* ========================================================
       4. ANIMATED PAW TRACKS
       Appears when the Impact section scrolls into view.
       Plays once, then resets after 10 s so it can play again.
    ======================================================== */

    const pawContainer = document.getElementById('pawTracks');
    const impactSection = document.querySelector('#impact');

    // Skip setup entirely if either element is missing
    if (!pawContainer || !impactSection) return;

    // Diagonal walking path across the section
    const trackPath = [
        { top: '58%', left:  '0%', rotation: 88, flip: false },
        { top: '64%', left:  '7%', rotation: 92, flip: true  },
        { top: '59%', left: '14%', rotation: 95, flip: false },
        { top: '68%', left: '21%', rotation: 85, flip: true  },
        { top: '61%', left: '28%', rotation: 90, flip: false },
        { top: '66%', left: '35%', rotation: 88, flip: true  },
        { top: '63%', left: '42%', rotation: 93, flip: false },
        { top: '69%', left: '49%', rotation: 87, flip: true  },
        { top: '58%', left: '56%', rotation: 91, flip: false },
        { top: '65%', left: '63%', rotation: 94, flip: true  },
        { top: '60%', left: '70%', rotation: 86, flip: false },
        { top: '67%', left: '77%', rotation: 89, flip: true  },
        { top: '62%', left: '84%', rotation: 92, flip: false },
        { top: '69%', left: '91%', rotation: 88, flip: true  },
    ];

    // Stores all active timeouts so we can cancel if needed
    const activeTimers = [];

    function clearTimers() {
        activeTimers.forEach(clearTimeout);
        activeTimers.length = 0;
    }

    function createPawTracks() {
        // Clear any previous tracks and timers
        clearTimers();
        pawContainer.innerHTML = '';

        trackPath.forEach(function (pos, index) {
            const track = document.createElement('div');
            track.className = 'paw-track';
            track.textContent = '🐾';
            track.style.top  = pos.top;
            track.style.left = pos.left;
            track.style.setProperty('--rotation', pos.rotation + 'deg');

            if (pos.flip) {
                // Mirror every other print for a realistic alternating gait
                track.style.transform = 'scaleY(-1) scale(0.3) rotate(' + pos.rotation + 'deg)';
            }

            pawContainer.appendChild(track);

            const appearDelay  = index * 300;
            const fadeDelay    = appearDelay + 2000;
            const removeDelay  = appearDelay + 3000;

            activeTimers.push(
                setTimeout(function () { track.classList.add('show'); },     appearDelay),
                setTimeout(function () { track.classList.add('fade-out'); }, fadeDelay),
                setTimeout(function () { if (track.parentNode) track.remove(); }, removeDelay)
            );
        });
    }

    // Intersection observer — triggers when 30% of section is visible
    let hasPlayed = false;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasPlayed) {
                hasPlayed = true;

                // Small delay so the section has finished sliding into view
                const triggerTimer = setTimeout(function () {
                    createPawTracks();

                    // Allow the animation to replay if user scrolls away and returns
                    const resetTimer = setTimeout(function () {
                        hasPlayed = false;
                    }, 10000);

                    activeTimers.push(resetTimer);
                }, 500);

                activeTimers.push(triggerTimer);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(impactSection);

});
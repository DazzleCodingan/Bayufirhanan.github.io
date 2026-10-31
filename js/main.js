/**
 * Bayu Firhanan (Dazzle) - Main JavaScript
 * 1:1 Inspired by ryhar.my.id Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Initialization ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentlyDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', currentlyDark ? 'dark' : 'light');
            updateThemeIcons(currentlyDark);
        });
        updateThemeIcons(isDark);
    }

    function updateThemeIcons(dark) {
        const sunIcon = document.getElementById('theme-icon-sun');
        const moonIcon = document.getElementById('theme-icon-moon');
        if (sunIcon && moonIcon) {
            if (dark) {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        }
    }

    // --- 2. Preloader Animation ---
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    
    if (preloader && preloaderBar) {
        // Start bar animation
        setTimeout(() => {
            preloaderBar.style.transform = 'translateX(0%)';
        }, 150);

        // Fade out preloader
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            document.body.classList.remove('overflow-hidden');
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 1200);
    } else {
        document.body.classList.remove('overflow-hidden');
    }

    // --- 3. Dynamic Typewriter Effect ---
    const typewriterElem = document.getElementById('typewriter-text');
    if (typewriterElem) {
        const words = [
            'Trader',
            'Data Analyst',
            'Data Scientist',
            'Market Strategist'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 120;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElem.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 60;
            } else {
                typewriterElem.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 120;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at full word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before typing new word
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1400);
    }

    // --- 4. Capsule Navbar Active Link & Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isClosed = mobileMenu.classList.contains('scale-0');
            if (isClosed) {
                mobileMenu.classList.remove('scale-0', 'opacity-0', 'pointer-events-none');
                mobileMenu.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
            } else {
                mobileMenu.classList.add('scale-0', 'opacity-0', 'pointer-events-none');
                mobileMenu.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                mobileMenu.classList.add('scale-0', 'opacity-0', 'pointer-events-none');
                mobileMenu.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
            });
        });
    }

    // Scroll to section function
    window.scrollToSection = function(id) {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Scroll spy for active navbar state
    const sections = document.querySelectorAll('section[id]');
    const navButtons = document.querySelectorAll('.nav-link-btn');

    function updateActiveNav() {
        let currentId = 'home';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        navButtons.forEach(btn => {
            const target = btn.getAttribute('data-target');
            if (target === currentId) {
                btn.classList.add('text-text-primary', 'font-bold');
                btn.classList.remove('text-text-secondary', 'font-medium');
            } else {
                btn.classList.remove('text-text-primary', 'font-bold');
                btn.classList.add('text-text-secondary', 'font-medium');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- 5. Copy Email Toast Notification ---
    window.copyEmail = function(email = 'Bayufirhanan@gmail.com') {
        navigator.clipboard.writeText(email).then(() => {
            showToast(`Email ${email} berhasil disalin!`);
        }).catch(() => {
            showToast(`Gagal menyalin email.`);
        });
    };

    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        const toastMessage = document.getElementById('toast-message');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.remove('translate-y-full', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-full', 'opacity-0');
            }, 3000);
        }
    }

    // --- 6. Scroll Reveal Observer ---
    const revealElements = document.querySelectorAll('.reveal-init');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('reveal-visible'));
    }
});

/**
 * SCRIPT UTAMA - WEBSITE PERKENALAN DIRI
 * Fitur: Preloader, Custom Cursor, Tab Switcher, Accordion FAQ, Copy to Clipboard, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. PRELOADER ANIMATION
    // -------------------------------------------------------------
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progress-bar');
    const loaderText = document.getElementById('loader-text');
    const bodyContent = document.body;

    if (loader && progressBar) {
        let progress = 0;
        const messages = [
            'MEMUAT DATA...',
            'MENYIAPKAN KOMPONEN...',
            'MENGHUBUNGKAN PROTOKOL...',
            'SELAMAT DATANG!'
        ];

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 10;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            if (progress > 25 && progress < 60) {
                loaderText.textContent = messages[1];
            } else if (progress >= 60 && progress < 90) {
                loaderText.textContent = messages[2];
            } else if (progress >= 90) {
                loaderText.textContent = messages[3];
            }

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.6s ease';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        bodyContent.classList.remove('overflow-hidden');
                        initGSAP();
                    }, 600);
                }, 350);
            }
        }, 80);
    }

    // -------------------------------------------------------------
    // 2. CUSTOM CURSOR
    // -------------------------------------------------------------
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth outline follow
        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Hover effect on links and buttons
        const hoverables = document.querySelectorAll('a, button, .glass-card, .tab-btn');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '55px';
                cursorOutline.style.height = '55px';
                cursorOutline.style.borderColor = '#a855f7';
                cursorOutline.style.backgroundColor = 'rgba(168, 85, 247, 0.08)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '36px';
                cursorOutline.style.height = '36px';
                cursorOutline.style.borderColor = 'rgba(0, 210, 255, 0.6)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // -------------------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // -------------------------------------------------------------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'ph ph-list';
                } else {
                    icon.className = 'ph ph-x';
                }
            }
        });

        // Close mobile menu when link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileBtn.querySelector('i');
                if (icon) icon.className = 'ph ph-list';
            });
        });
    }

    // -------------------------------------------------------------
    // 4. TAB SWITCHER (PORTFOLIO / SHOWCASE)
    // -------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-item');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 5. TOAST NOTIFICATION & COPY EMAIL
    // -------------------------------------------------------------
    window.copyEmail = function(email) {
        if (!navigator.clipboard) {
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast(`✓ Email disalin: ${email}`);
            return;
        }

        navigator.clipboard.writeText(email).then(() => {
            showToast(`✓ Email disalin: ${email}`);
        }).catch(err => {
            console.error('Gagal menyalin:', err);
        });
    };

    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // -------------------------------------------------------------
    // 6. ANIMATED COUNTER ON SCROLL
    // -------------------------------------------------------------
    const counters = document.querySelectorAll('.counter-val');
    let hasAnimatedCounters = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedCounters) {
                hasAnimatedCounters = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1500;
                    const step = Math.max(1, Math.floor(target / (duration / 20)));
                    let count = 0;

                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            counter.textContent = target + (counter.getAttribute('data-suffix') || '');
                            clearInterval(timer);
                        } else {
                            counter.textContent = count + (counter.getAttribute('data-suffix') || '');
                        }
                    }, 20);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // -------------------------------------------------------------
    // 7. GSAP SCROLL ANIMATIONS (If Loaded)
    // -------------------------------------------------------------
    function initGSAP() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Hero section animations
            gsap.from('.gsap-hero', {
                y: 30,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power3.out'
            });

            // Fade Up elements
            gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
                gsap.from(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });

            // Profile photo side fade
            const profileCard = document.querySelector('.gsap-fade-right');
            if (profileCard) {
                gsap.from(profileCard, {
                    scrollTrigger: {
                        trigger: profileCard,
                        start: 'top 80%'
                    },
                    x: -50,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out'
                });
            }
        }
    }
});

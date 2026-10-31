/**
 * SCRIPT UTAMA - PORTFOLIO RYHAR MINIMALIST DARK
 * Fitur: Preloader, Typewriter/Role Switcher, Custom Cursor, Copy Email, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. PRELOADER ANIMATION
    // -------------------------------------------------------------
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progress-bar');
    const bodyContent = document.body;

    if (loader && progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 25) + 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.6s ease';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        bodyContent.classList.remove('overflow-hidden');
                    }, 600);
                }, 300);
            }
        }, 70);
    }

    // -------------------------------------------------------------
    // 2. DYNAMIC ROLE TYPEWRITER
    // -------------------------------------------------------------
    const roleElem = document.getElementById('typing-role');
    if (roleElem) {
        const roles = [
            'Trader & Market Analyst',
            'Data Analyst',
            'Data Scientist',
            'Predictive ML Modeling'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                roleElem.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 40;
            } else {
                roleElem.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = 1800; // Pause when complete
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 350;
            }

            setTimeout(type, typingDelay);
        }

        setTimeout(type, 800);
    }

    // -------------------------------------------------------------
    // 3. CUSTOM CURSOR
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

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        const hoverables = document.querySelectorAll('a, button, .glass-card, .tech-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '52px';
                cursorOutline.style.height = '52px';
                cursorOutline.style.borderColor = '#38bdf8';
                cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '34px';
                cursorOutline.style.height = '34px';
                cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // -------------------------------------------------------------
    // 4. MOBILE MENU TOGGLE
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
    // 5. TOAST NOTIFICATION & COPY EMAIL
    // -------------------------------------------------------------
    window.copyEmail = function(email) {
        if (!navigator.clipboard) {
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
});

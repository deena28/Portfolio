/* ============================================
   DEENA P — Portfolio JavaScript
   kanit.codes-inspired interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initMobileNav();
    initScrollAnimations();
    initProjectExpanders();
    initNavScroll();
    initSmoothScroll();
});

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ============================================
   MOBILE NAV
   ============================================ */
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    // Add fade-up class to animatable elements
    const selectors = [
        '.bento-card',
        '.project-card',
        '.timeline-card',
        '.skill-category',
        '.cert-item',
        '.info-card',
        '.section-header',
        '.about-text',
        '.contact-layout'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach((el, i) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
        observer.observe(el);
    });
}

/* ============================================
   PROJECT DETAIL EXPANDERS
   ============================================ */
function initProjectExpanders() {
    document.querySelectorAll('.project-expand').forEach(expander => {
        const btn = expander.querySelector('.expand-btn');
        const projectId = expander.dataset.project;
        const panel = document.getElementById(`project-detail-${projectId}`);

        if (!btn || !panel) return;

        btn.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');

            // Close all others
            document.querySelectorAll('.project-detail-panel.open').forEach(p => {
                if (p !== panel) {
                    p.classList.remove('open');
                    const otherBtn = p.closest('.project-card').querySelector('.expand-btn');
                    if (otherBtn) otherBtn.textContent = 'View Details →';
                }
            });

            if (isOpen) {
                panel.classList.remove('open');
                btn.textContent = 'View Details →';
            } else {
                panel.classList.add('open');
                btn.textContent = 'Hide Details ↑';
            }
        });
    });

    // Also allow clicking the project card title
    document.querySelectorAll('.project-title').forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => {
            const card = title.closest('.project-card');
            const btn = card.querySelector('.expand-btn');
            if (btn) btn.click();
        });
    });
}

/* ============================================
   NAV SCROLL EFFECTS
   ============================================ */
function initNavScroll() {
    const nav = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        // Shadow on scroll
        if (window.scrollY > 20) {
            nav.style.borderBottomColor = 'var(--border-hover)';
        } else {
            nav.style.borderBottomColor = 'var(--border)';
        }

        // Active link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.style.color = 'var(--text-primary)';
            }
        });
    }, { passive: true });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('active');
        if (mobileMenuButton) mobileMenuButton.querySelector('i').className = 'fas fa-bars';
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const isActive = mobileMenu.classList.contains('active');
            if (isActive) {
                closeMobileMenu();
            } else {
                mobileMenu.classList.add('active');
                mobileMenuButton.querySelector('i').className = 'fas fa-times';
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('click', function (event) {
            if (!mobileMenu.contains(event.target) &&
                !mobileMenuButton.contains(event.target) &&
                mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMobileMenu();
        });
    }

    // ==========================================================================
    // Smooth Scroll + Active Nav Highlight
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);

    // ==========================================================================
    // Skill Progress Bar Animation
    // ==========================================================================
    const skillFills = document.querySelectorAll('.skill-fill');
    if (skillFills.length > 0 && 'IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') + '%';
                    setTimeout(() => { bar.style.width = width; }, 150);
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });
        skillFills.forEach(bar => skillObserver.observe(bar));
    } else {
        skillFills.forEach(bar => { bar.style.width = bar.getAttribute('data-width') + '%'; });
    }

    // ==========================================================================
    // Project Filter (Coding vs CMS)
    // ==========================================================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsEmpty = document.getElementById('projectsEmpty');

    function applyFilter(filter) {
        let visibleCount = 0;
        projectCards.forEach(card => {
            const matches = card.getAttribute('data-cat') === filter;
            card.classList.toggle('is-hidden', !matches);
            if (matches) visibleCount++;
        });
        if (projectsEmpty) {
            projectsEmpty.classList.toggle('visible', visibleCount === 0);
        }
    }

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                filterTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                applyFilter(this.getAttribute('data-filter'));
            });
        });
        // Initial state (Coding Projects active by default)
        applyFilter('coding');
    }

    // ==========================================================================
    // Contact Form Handling
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification("Thanks! Your message has been noted — I'll get back to you soon.", 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1600);
        });

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    // ==========================================================================
    // Notification System
    // ==========================================================================
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notify-toast');
        if (existing) existing.remove();

        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';

        const toast = document.createElement('div');
        toast.className = 'notify-toast';
        toast.style.cssText = `
            position: fixed; top: 84px; right: 16px; z-index: 999;
            background: #10140f; border: 1px solid ${type === 'error' ? '#ff5f56' : '#c6ff5c'};
            color: #eef1ea; padding: 0.9rem 1.1rem; border-radius: 10px;
            font-family: 'JetBrains Mono', monospace; font-size: 0.82rem;
            display: flex; align-items: center; gap: 0.6rem; max-width: 320px;
            box-shadow: 0 12px 30px rgba(0,0,0,0.45);
        `;
        toast.innerHTML = `<i class="fas fa-${icon}" style="color:${type === 'error' ? '#ff5f56' : '#c6ff5c'}"></i><span>${message}</span>`;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    // ==========================================================================
    // Back to Top
    // ==========================================================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 500);
        });
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
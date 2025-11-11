// Portfolio JavaScript - Complete Working Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initialization started...');

    // ==========================================================================
    // Theme Toggle Functionality - SIMPLE AND WORKING
    // ==========================================================================
    console.log('Initializing theme toggle...');
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        console.log('Theme toggle button found');
        
        // Get current theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
            updateThemeIcon('dark');
            console.log('Dark theme applied');
        } else {
            document.documentElement.classList.remove('dark');
            updateThemeIcon('light');
            console.log('Light theme applied');
        }
        
        // Theme toggle click handler
        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            
            const html = document.documentElement;
            const isDark = html.classList.contains('dark');
            
            if (isDark) {
                // Switch to light mode
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateThemeIcon('light');
                console.log('Switched to light mode');
            } else {
                // Switch to dark mode
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon('dark');
                console.log('Switched to dark mode');
            }
        });
        
        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                    themeToggle.setAttribute('title', 'Switch to light mode');
                } else {
                    icon.className = 'fas fa-moon';
                    themeToggle.setAttribute('title', 'Switch to dark mode');
                }
                console.log('Theme icon updated to:', theme);
            }
        }
    } else {
        console.error('Theme toggle button not found!');
    }

    // ==========================================================================
    // Mobile Menu Functionality - SIMPLE AND WORKING
    // ==========================================================================
    console.log('Initializing mobile menu...');
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        console.log('Mobile menu elements found');
        
        // Mobile menu toggle
        mobileMenuButton.addEventListener('click', function() {
            console.log('Mobile menu button clicked');
            
            // Toggle mobile menu visibility
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                // Show menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('active');
                this.querySelector('i').className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
                console.log('Mobile menu opened');
            } else {
                // Hide menu
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
                this.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
                console.log('Mobile menu closed');
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
                mobileMenuButton.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
                console.log('Mobile menu closed via link click');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && 
                !mobileMenuButton.contains(event.target) && 
                !mobileMenu.classList.contains('hidden')) {
                
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
                mobileMenuButton.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
                console.log('Mobile menu closed via outside click');
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
                mobileMenuButton.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
                console.log('Mobile menu closed via Escape key');
            }
        });
    } else {
        console.error('Mobile menu elements not found!');
    }

    // ==========================================================================
    // Smooth Scrolling for Navigation Links
    // ==========================================================================
    console.log('Initializing smooth scrolling...');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Smooth scroll to:', targetId);
            }
        });
    });

    // ==========================================================================
    // Active Navigation Link Highlighting
    // ==========================================================================
    console.log('Initializing active navigation...');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
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
    // Contact Form Handling
    // ==========================================================================
    console.log('Initializing contact form...');
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                console.log('Form submitted successfully');
                
                // Show success message
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Email validation function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // ==========================================================================
    // CV Download functionality
    // ==========================================================================
    console.log('Initializing CV download...');
    const downloadCV = document.getElementById('downloadCV');
    
    if (downloadCV) {
        downloadCV.addEventListener('click', function(e) {
            showNotification('CV download started!', 'success');
            console.log('CV download initiated');
        });
    }

    // ==========================================================================
    // Notification System
    // ==========================================================================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Define colors based on type
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification fixed top-4 right-4 ${colors[type] || colors.info} text-white p-4 rounded-lg shadow-lg max-w-sm z-50`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
                    <span class="notification-message">${message}</span>
                </div>
                <button class="notification-close ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
        
        document.body.appendChild(notification);
        console.log('Notification shown:', message);
    }

    // ==========================================================================
    // Skill Progress Animation
    // ==========================================================================
    console.log('Initializing skill animations...');
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    if (skillProgresses.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width') + '%';
                    
                    // Animate to target width
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                    console.log('Skill animation triggered');
                }
            });
        }, { threshold: 0.3 });
        
        skillProgresses.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // ==========================================================================
    // Back to Top Button
    // ==========================================================================
    console.log('Initializing back to top button...');
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
                backToTop.classList.remove('opacity-0', 'invisible');
            } else {
                backToTop.classList.remove('visible');
                backToTop.classList.add('opacity-0', 'invisible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Back to top clicked');
        });
    } else {
        console.log('Creating back to top button...');
        createBackToTopButton();
    }
    
    function createBackToTopButton() {
        const backToTop = document.createElement('a');
        backToTop.id = 'backToTop';
        backToTop.href = '#home';
        backToTop.className = 'back-to-top fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 invisible z-40';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTop);
        
        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.remove('opacity-100', 'visible');
                backToTop.classList.add('opacity-0', 'invisible');
            }
        });
        
        console.log('Back to top button created');
    }

    // ==========================================================================
    // Image Loading Error Handling
    // ==========================================================================
    console.log('Initializing image error handling...');
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('hidden')) {
                fallback.style.display = 'flex';
            }
            console.log('Image load error, fallback activated');
        });
    });

    console.log('Portfolio website initialized successfully! All features ready.');
});
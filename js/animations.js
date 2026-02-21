document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle logic
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            const isFlex = navLinks.style.display === 'flex';
            
            navLinks.style.display = isFlex ? 'none' : 'flex';
            navActions.style.display = isFlex ? 'none' : 'flex';
            
            if (!isFlex) {
                // Apply dynamic mobile styles when opened
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                
                navActions.style.position = 'absolute';
                navActions.style.top = '250px';
                navActions.style.left = '0';
                navActions.style.width = '100%';
                navActions.style.background = 'white';
                navActions.style.padding = '0 2rem 2rem';
                navActions.style.justifyContent = 'center';
            } else {
                // Reset styles
                navLinks.style = '';
                navActions.style = '';
            }
        });
    }

    // Sticky Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for scroll animations (fade in, slide up)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply animation class and observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .card-old-way, .card-new-way, .bento-card, .step-card, .pricing-card, .cta-box'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 1024 && navLinks.style.display === 'flex') {
                    mobileMenuToggle.click();
                }
            }
        });
    });
});

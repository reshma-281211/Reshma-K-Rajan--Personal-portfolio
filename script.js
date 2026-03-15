document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle Setup (For later expansion)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle mobile menu logic here.
        // For right now we just toggle a simple class to hide/show which can be styled.
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-secondary)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid var(--glass-border)';
            navLinks.style.boxShadow = 'var(--shadow-subtle)';
        }
    });

    // Reset inline styles on window resize to fix menu bugs
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style = '';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // 4. Form Submission via Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Sync email to hidden _replyto field so you can reply directly
        const emailInput = document.getElementById('email');
        const replyToInput = document.getElementById('_replyto');
        if (emailInput && replyToInput) {
            emailInput.addEventListener('input', () => {
                replyToInput.value = emailInput.value;
            });
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.8';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    btn.style.background = '#10b981';
                    btn.style.boxShadow = 'none';
                    contactForm.reset();
                } else {
                    btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try Again.';
                    btn.style.background = '#ef4444';
                }
            } catch (error) {
                btn.innerHTML = '<i class="fas fa-times"></i> Network Error.';
                btn.style.background = '#ef4444';
            }

            btn.disabled = false;
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'var(--accent-gradient)';
                btn.style.boxShadow = '';
            }, 3500);
        });
    }

});

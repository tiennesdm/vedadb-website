// ========== VEDADB EARLY STAGE WEBSITE JS ==========

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
        navCta.style.display = '';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '68px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--bg-primary)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--border)';
        navLinks.style.gap = '16px';
        
        navCta.style.display = 'flex';
        navCta.style.position = 'absolute';
        navCta.style.top = '200px';
        navCta.style.left = '20px';
    }
}

// Waitlist form handler
function handleWaitlist(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Show thank you message
    const form = event.target;
    form.innerHTML = `
        <div style="padding: 20px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 12px;">
            <div style="font-size: 24px; margin-bottom: 8px;">🎉</div>
            <div style="font-weight: 700; color: var(--success); margin-bottom: 4px;">Beta access requested!</div>
            <div style="font-size: 14px; color: var(--text-secondary);">We'll reach out at ${email} when beta opens.</div>
        </div>
    `;
    
    // In production, send to backend/API
    console.log('Waitlist signup:', email);
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animElements = document.querySelectorAll(
        '.problem-card, .engine-card, .market-card, .timeline-item, .arch-layer'
    );
    
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Console branding
console.log(
    '%c◈ VedaDB',
    'color: #7c3aed; font-size: 24px; font-weight: 800;'
);
console.log(
    '%cOne Database. Every Workload. Zero Compromises.',
    'color: #06b6d4; font-size: 14px;'
);
console.log(
    '%cCurrently in development. Join the waitlist!',
    'color: #64748b; font-size: 12px;'
);

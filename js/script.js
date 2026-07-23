// Mobile Navigation Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const body = document.body;
let isNavigating = false;

// Toggle menu
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isNavigating) toggleMenu();
});

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    mobileMenu.classList.remove('hidden');
    void mobileMenu.offsetHeight;
    mobileMenu.classList.add('open');
    menuIcon.className = 'fas fa-times text-2xl';
    body.classList.add('menu-open');
}

function closeMenu(callback) {
    mobileMenu.classList.remove('open');
    menuIcon.className = 'fas fa-bars text-2xl';
    body.classList.remove('menu-open');
    
    setTimeout(() => {
        if (!mobileMenu.classList.contains('open')) {
            mobileMenu.classList.add('hidden');
        }
        if (callback) callback();
    }, 500);
}

// Mobile nav links - use loadingManager
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = link.getAttribute('href');
        
        document.querySelectorAll('.mobile-nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        isNavigating = true;
        
        closeMenu(() => {
            if (window.loadingManager) {
                window.loadingManager.navigateTo(href);
            } else {
                window.location.href = href;
            }
        });
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    const nav = document.querySelector('.navbar');
    if (mobileMenu.classList.contains('open') && !nav.contains(e.target) && !isNavigating) {
        closeMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open') && !isNavigating) {
        closeMenu();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('open') && !isNavigating) {
        closeMenu();
    }
});

// ===== Active link management =====
document.addEventListener('DOMContentLoaded', () => {
    isNavigating = false;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop Nav Links
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        const hrefFile = href ? href.split('/').pop() : '';
        
        if (hrefFile === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Mobile Nav Links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        const hrefFile = href ? href.split('/').pop() : '';
        
        if (hrefFile === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== Scroll detection =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.mobile-nav-link)');

window.addEventListener('scroll', () => {
    if (isNavigating) return;
    
    const scrollY = window.pageYOffset;
    
    if (sections.length > 0) {
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        link.classList.remove('active');
                        const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                        if (matchingLink) matchingLink.classList.add('active');
                    }
                });
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (isNavigating) return;
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

// Handle navigation reset when page loads
window.addEventListener('pageshow', () => {
    isNavigating = false;
    if (window.loadingManager) {
        window.loadingManager.hide();
    }
});
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

// ===== Desktop nav links with loading =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip anchor links
        if (href && href.startsWith('#')) {
            return;
        }
        
        // Skip if it's the current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const hrefFile = href ? href.split('/').pop() : '';
        
        if (hrefFile === currentPage) {
            e.preventDefault();
            return;
        }
        
        // Let loading manager handle it
        if (window.loadingManager && href) {
            e.preventDefault();
            isNavigating = true;
            window.loadingManager.navigateTo(href);
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

// ===== Ensure loading screen hides on page load =====
window.addEventListener('load', () => {
    if (window.loadingManager) {
        setTimeout(() => {
            window.loadingManager.hide();
        }, 300);
    }
});
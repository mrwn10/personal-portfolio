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

// ===== LIGHTBOX FUNCTIONALITY =====

// Image data array - 6 images
const lightboxImages = [
    { src: '../img/1.png', caption: 'Tinice Reviewer Homepage' },
    { src: '../img/2.png', caption: 'Taking an Exam' },
    { src: '../img/3.png', caption: 'Cloudflare Dashboard' },
    { src: '../img/4.png', caption: 'Vultr Server' },
    { src: '../img/5.png', caption: 'Virtual Machine Specs' },
    { src: '../img/6.png', caption: 'Ubuntu UI' }
];

let currentImageIndex = 0;
let isLightboxOpen = false;

// Open lightbox with specific image
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    
    const imageData = lightboxImages[index];
    img.src = imageData.src;
    img.alt = imageData.caption;
    caption.textContent = imageData.caption;
    counter.textContent = `${index + 1} / ${lightboxImages.length}`;
    
    // Handle image load error
    img.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%232D6A4F" opacity="0.1"/%3E%3Ctext x="200" y="145" font-family="Arial" font-size="16" fill="%232D6A4F" opacity="0.5" text-anchor="middle"%3ENo Image%3C/text%3E%3Ctext x="200" y="170" font-family="Arial" font-size="12" fill="%232D6A4F" opacity="0.3" text-anchor="middle"%3EAdd screenshot here%3C/text%3E%3C/svg%3E';
        caption.textContent = '📸 ' + imageData.caption + ' (Screenshot coming soon)';
    };
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    isLightboxOpen = true;
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
    isLightboxOpen = false;
}

// Change image (next/prev)
function changeImage(direction) {
    const newIndex = currentImageIndex + direction;
    if (newIndex < 0 || newIndex >= lightboxImages.length) return;
    
    currentImageIndex = newIndex;
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    const imageData = lightboxImages[newIndex];
    
    // Fade out, change, fade in
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = imageData.src;
        img.alt = imageData.caption;
        caption.textContent = imageData.caption;
        counter.textContent = `${newIndex + 1} / ${lightboxImages.length}`;
        img.style.opacity = '1';
    }, 200);
    
    // Handle image load error
    img.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%232D6A4F" opacity="0.1"/%3E%3Ctext x="200" y="145" font-family="Arial" font-size="16" fill="%232D6A4F" opacity="0.5" text-anchor="middle"%3ENo Image%3C/text%3E%3Ctext x="200" y="170" font-family="Arial" font-size="12" fill="%232D6A4F" opacity="0.3" text-anchor="middle"%3EAdd screenshot here%3C/text%3E%3C/svg%3E';
        caption.textContent = '📸 ' + imageData.caption + ' (Screenshot coming soon)';
    };
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!isLightboxOpen) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Click outside image to close
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});
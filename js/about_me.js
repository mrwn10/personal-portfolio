document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality - Consistent with homepage
  const menuToggle = document.getElementById('menu-toggle');
  const menuLinks = document.querySelectorAll('.nav-links a, .nav-menu .download-btn');
  const body = document.body;
  const menuOverlay = document.querySelector('.menu-overlay');
  
  // Close mobile menu when clicking on a link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });
  
  // Close menu when clicking on overlay
  if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
      closeMobileMenu();
    });
  }
  
  // Function to close mobile menu
  function closeMobileMenu() {
    menuToggle.checked = false;
    body.classList.remove('menu-open');
  }
  
  // Toggle body scroll when menu is open
  menuToggle.addEventListener('change', function() {
    if (window.innerWidth <= 768) {
      if (this.checked) {
        body.classList.add('menu-open');
      } else {
        body.classList.remove('menu-open');
      }
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
  
  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.innerWidth <= 768 && menuToggle.checked) {
      closeMobileMenu();
    }
  });
  
  // CV download animation
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      // Only show animation if it's a local file download
      if (this.href.includes('.pdf')) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        this.style.pointerEvents = 'none';
        this.style.opacity = '0.8';
        
        setTimeout(() => {
          this.innerHTML = originalText;
          this.style.pointerEvents = 'auto';
          this.style.opacity = '1';
        }, 2000);
      }
    });
  }
  
  // Add scroll effect to navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      navbar.style.background = 'white';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.3s ease';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
      navbar.style.transition = 'transform 0.3s ease';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Add hover effect for cards and interactive elements
  const interactiveElements = document.querySelectorAll('.content-card, .approach-item, .hobby, .tag, .social-links a, .quick-links a');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        if (element.classList.contains('content-card')) {
          element.style.transform = 'translateY(-5px)';
        } else if (element.classList.contains('tag')) {
          element.style.transform = 'translateY(-2px)';
        } else {
          element.style.transform = 'translateY(-3px)';
        }
      }
    });
    
    element.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        if (element.classList.contains('content-card')) {
          element.style.transform = 'translateY(0)';
        } else if (element.classList.contains('tag')) {
          element.style.transform = 'translateY(0)';
        } else {
          element.style.transform = 'translateY(0)';
        }
      }
    });
  });
  
  // Add smooth scroll for anchor links in the same page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Profile image hover effect
  const profileImage = document.querySelector('.hero-image img');
  if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
      profileImage.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
      profileImage.style.transform = 'scale(1) rotate(0)';
    });
  }
  
  // Add fade-in animation to cards on page load
  window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      }, index * 200);
    });
  });
});
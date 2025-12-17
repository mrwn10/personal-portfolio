document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
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
  
  // Add hover effect for buttons
  const buttons = document.querySelectorAll('.btn, .social-links a, .quick-links a');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        button.style.transform = 'translateY(-2px)';
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        button.style.transform = 'translateY(0)';
      }
    });
  });
});
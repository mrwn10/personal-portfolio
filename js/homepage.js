const { createApp } = Vue;

createApp({
  data() {
    return {
      menuOpen: false,
      currentPage: this.getCurrentPage(),
      isDownloading: false,
      navScrolled: false,
      navHidden: false,
      lastScrollTop: 0
    };
  },
  
  mounted() {
    this.setupScrollEffect();
    this.setupResizeHandler();
  },
  
  methods: {
    getCurrentPage() {
      const path = window.location.pathname;
      return path.split('/').pop() || 'index.html';
    },
    
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      document.body.classList.toggle('menu-open', this.menuOpen);
    },
    
    closeMenu() {
      this.menuOpen = false;
      document.body.classList.remove('menu-open');
    },
    
    async downloadCV(event) {
      event.preventDefault();
      
      this.isDownloading = true;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const link = document.createElement('a');
        link.href = event.currentTarget.href;
        link.download = 'Marwin_Dalin_CV.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('CV downloaded successfully!');
        
      } catch (error) {
        this.showNotification('Download failed. Please try again.', 'error');
        console.error('Download error:', error);
        
      } finally {
        this.isDownloading = false;
      }
    },
    
    showNotification(message, type = 'success') {
      const existing = document.querySelector('.notification');
      if (existing) existing.remove();
      
      const notification = document.createElement('div');
      notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`;
      notification.textContent = message;
      notification.style.transform = 'translateX(100%)';
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 10);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    },
    
    setupScrollEffect() {
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Handle shadow/transparency effect
        if (scrollTop > 20) {
          this.navScrolled = true;
        } else {
          this.navScrolled = false;
        }
        
        // Handle hide/show on scroll direction
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
          this.navHidden = true;  // Hide when scrolling DOWN past 100px
        } else {
          this.navHidden = false; // Show when scrolling UP
        }
        
        this.lastScrollTop = scrollTop;
      });
    },
    
    setupResizeHandler() {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          this.closeMenu();
        }
      });
    }
  }
}).mount('#app');
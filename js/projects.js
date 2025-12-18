const { createApp } = Vue;

createApp({
  data() {
    return {
      menuOpen: false,
      currentPage: this.getCurrentPage(),
      isDownloading: false,
      navScrolled: false,
      navHidden: false,
      lastScrollTop: 0,
      cardLoaded: [false, false, false, false, false] // 5 cards for projects
    };
  },
  
  mounted() {
    this.setupScrollEffect();
    this.setupResizeHandler();
    this.animateCards();
  },
  
  methods: {
    getCurrentPage() {
      const path = window.location.pathname;
      return path.split('/').pop() || 'projects.html';
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
      const navbar = document.querySelector('nav');
      
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 20) {
          this.navScrolled = true;
          navbar.classList.add('shadow-xl', 'bg-white/95');
        } else {
          this.navScrolled = false;
          navbar.classList.remove('shadow-xl', 'bg-white/95');
        }
        
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
          this.navHidden = true;
        } else {
          this.navHidden = false;
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
    },
    
    animateCards() {
      // Animate cards in sequence with delays
      this.cardLoaded.forEach((_, index) => {
        setTimeout(() => {
          this.cardLoaded[index] = true;
        }, index * 200 + 300); // 300ms initial delay
      });
    }
  }
}).mount('#app');
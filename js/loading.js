// ===== LOADING MANAGER - Working Version =====
class LoadingManager {
    constructor() {
        this.loadingScreen = null;
        this.isLoading = false;
        this.isInitialized = false;
        this.minLoadTime = 300;
    }

    init() {
        if (this.isInitialized) return;
        
        // Create loading screen if it doesn't exist
        if (!document.getElementById('loading-screen')) {
            this.createLoadingScreen();
        }
        
        this.loadingScreen = document.getElementById('loading-screen');
        this.isInitialized = true;
        
        // Hide on page load
        window.addEventListener('load', () => {
            this.hide();
        });

        // Setup all internal links
        this.setupLinks();
        
        console.log('Loading Manager initialized ✅');
    }

    createLoadingScreen() {
        const html = `
            <div id="loading-screen">
                <div class="loading-spinner">
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                </div>
                <div class="loading-text">
                    Loading<span class="loading-dots"><span></span><span></span><span></span></span>
                </div>
                <div class="loading-subtext">Please wait a moment</div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', html);
    }

    show() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const screen = this.loadingScreen;
        if (!screen) return;
        
        screen.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        if (!this.isLoading) return;
        
        const screen = this.loadingScreen;
        if (!screen) return;
        
        screen.classList.remove('visible');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.isLoading = false;
        }, 600);
    }

    setupLinks() {
        // Get all links on the page
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip external links, anchors, mailto, tel, downloads, new tabs
            if (!href || 
                href.startsWith('http') || 
                href.startsWith('#') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                href.includes('://') ||
                link.target === '_blank' ||
                link.getAttribute('download')) {
                return;
            }
            
            // Remove old listener to prevent duplicates
            if (link._loadingHandler) {
                link.removeEventListener('click', link._loadingHandler);
            }
            
            // Create new handler
            const handler = (e) => {
                const targetUrl = link.href;
                const currentUrl = window.location.href;
                
                // Same page - do nothing
                if (targetUrl === currentUrl) {
                    return;
                }
                
                e.preventDefault();
                this.navigateTo(targetUrl);
            };
            
            // Store and add listener
            link._loadingHandler = handler;
            link.addEventListener('click', handler);
        });
    }

    navigateTo(url) {
        this.show();
        
        // Small delay to show loading animation
        setTimeout(() => {
            window.location.href = url;
        }, this.minLoadTime);
    }

    // Refresh links when page content changes
    refresh() {
        this.setupLinks();
    }
}

// ===== Initialize =====
const loadingManager = new LoadingManager();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadingManager.init();
    });
} else {
    loadingManager.init();
}

// Re-initialize after page load for dynamic content
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loadingManager.refresh();
    }, 100);
});

// Handle back/forward navigation
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        loadingManager.hide();
        loadingManager.refresh();
    }
});

// Expose for debugging
window.loadingManager = loadingManager;
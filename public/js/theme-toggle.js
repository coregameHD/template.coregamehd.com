// Theme toggle functionality
(function() {
    const THEME_KEY = 'theme';
    const LIGHT_THEME = 'light';
    const DARK_THEME = 'dark';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Get elements
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const htmlElement = document.documentElement;
        
        // Only proceed if theme toggle exists
        if (!themeToggle) return;
        
        // Show the theme toggle
        themeToggle.style.visibility = 'visible';
        
        // Check for system preference
        function getSystemPreference() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? DARK_THEME 
                : LIGHT_THEME;
        }
        
        // Get saved theme or use system preference
        function getSavedTheme() {
            const savedTheme = localStorage.getItem(THEME_KEY);
            return savedTheme || getSystemPreference();
        }
        
        // Save theme to localStorage
        function saveTheme(theme) {
            localStorage.setItem(THEME_KEY, theme);
        }
        
        // Update icon based on current theme
        function updateIcon(theme) {
            // Only try to update icon if it exists
            if (!themeIcon) {
                // Set aria-label on the toggle button if icon is missing
                themeToggle.setAttribute('aria-label', 
                    theme === DARK_THEME 
                        ? 'Switch to light mode' 
                        : 'Switch to dark mode'
                );
                return;
            }
            
            // Update icon classes and aria-label
            if (theme === DARK_THEME) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
        
        // Apply theme
        function applyTheme(theme) {
            // Prevent transitions during initial load
            document.body.style.transition = 'none';
            
            // Apply the theme
            htmlElement.setAttribute('data-bs-theme', theme);
            updateIcon(theme);
            saveTheme(theme);
            
            // Re-enable transitions after a short delay
            setTimeout(() => {
                document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            }, 10);
        }
        
        // Toggle theme
        function toggleTheme() {
            const currentTheme = htmlElement.getAttribute('data-bs-theme') || getSavedTheme();
            const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
            applyTheme(newTheme);
        }
        
        // Listen for system theme changes
        function setupSystemThemeListener() {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only apply system theme if user hasn't explicitly set a preference
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
                }
            });
        }
        
        // Initialize theme
        function initTheme() {
            const savedTheme = getSavedTheme();
            applyTheme(savedTheme);
            setupSystemThemeListener();
        }
        
        // Add event listener
        themeToggle.addEventListener('click', toggleTheme);
        
        // Initialize theme
        initTheme();
    });
})();

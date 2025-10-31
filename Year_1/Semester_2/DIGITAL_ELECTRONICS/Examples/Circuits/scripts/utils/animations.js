/**
 * Digital Electronics Learning Platform - Animation Utilities
 * Provides smooth animations and visual effects for enhanced user experience
 */

class AnimationManager {
    constructor() {
        this.activeAnimations = new Map();
        this.animationId = 0;
        this.init();
    }
    
    /**
     * Initialize animation system
     */
    init() {
        // Setup animation preferences
        this.respectsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Listen for reduced motion preference changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.respectsReducedMotion = e.matches;
        });
    }
    
    /**
     * Check if animations should be disabled
     * @returns {boolean} True if animations should be disabled
     */
    shouldDisableAnimations() {
        return this.respectsReducedMotion;
    }
    
    /**
     * Fade in animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    fadeIn(element, duration = 300, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.style.opacity = '1';
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.opacity = '1';
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Fade out animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    fadeOut(element, duration = 300, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.style.opacity = '0';
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '0';
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Fade in up animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    fadeInUp(element, duration = 400, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Slide in left animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    slideInLeft(element, duration = 400, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Slide in right animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    slideInRight(element, duration = 300, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Slide in down animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    slideInDown(element, duration = 300, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Scale in animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    scaleIn(element, duration = 200, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.style.transform = 'scale(1)';
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.transform = 'scale(0.95)';
        element.style.transition = `transform ${duration}ms ease-out`;
        
        // Force reflow
        element.offsetHeight;
        
        element.style.transform = 'scale(1)';
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Pulse animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {number} scale - Scale factor for pulse effect
     * @param {Function} callback - Optional callback function
     */
    pulse(element, duration = 300, scale = 1.05, callback = null) {
        if (this.shouldDisableAnimations()) {
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        const halfDuration = duration / 2;
        element.style.transition = `transform ${halfDuration}ms ease-out`;
        element.style.transform = `scale(${scale})`;
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.transition = `transform ${halfDuration}ms ease-in`;
                element.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    if (this.activeAnimations.get(element) === animationId) {
                        element.style.transition = '';
                        this.activeAnimations.delete(element);
                        if (callback) callback();
                    }
                }, halfDuration);
            }
        }, halfDuration);
    }
    
    /**
     * Bounce animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    bounce(element, duration = 600, callback = null) {
        if (this.shouldDisableAnimations()) {
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.animation = `bounce ${duration}ms ease-in-out`;
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.animation = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Shake animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    shake(element, duration = 500, callback = null) {
        if (this.shouldDisableAnimations()) {
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        element.style.animation = `shake ${duration}ms ease-in-out`;
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.animation = '';
                this.activeAnimations.delete(element);
                if (callback) callback();
            }
        }, duration);
    }
    
    /**
     * Highlight animation
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {string} color - Highlight color
     * @param {Function} callback - Optional callback function
     */
    highlight(element, duration = 1000, color = '#ffd700', callback = null) {
        if (this.shouldDisableAnimations()) {
            if (callback) callback();
            return;
        }
        
        this.cancelExistingAnimation(element);
        
        const originalBackground = element.style.backgroundColor;
        element.style.transition = `background-color ${duration}ms ease-out`;
        element.style.backgroundColor = color;
        
        const animationId = this.generateAnimationId();
        this.activeAnimations.set(element, animationId);
        
        setTimeout(() => {
            if (this.activeAnimations.get(element) === animationId) {
                element.style.backgroundColor = originalBackground;
                
                setTimeout(() => {
                    if (this.activeAnimations.get(element) === animationId) {
                        element.style.transition = '';
                        this.activeAnimations.delete(element);
                        if (callback) callback();
                    }
                }, duration);
            }
        }, 100);
    }
    
    /**
     * Cancel existing animation on element
     * @param {HTMLElement} element - Element to cancel animation for
     */
    cancelExistingAnimation(element) {
        if (this.activeAnimations.has(element)) {
            this.activeAnimations.delete(element);
            element.style.transition = '';
            element.style.animation = '';
        }
    }
    
    /**
     * Generate unique animation ID
     * @returns {number} Unique animation ID
     */
    generateAnimationId() {
        return ++this.animationId;
    }
    
    /**
     * Cancel all active animations
     */
    cancelAllAnimations() {
        this.activeAnimations.forEach((animationId, element) => {
            element.style.transition = '';
            element.style.animation = '';
        });
        this.activeAnimations.clear();
    }
    
    /**
     * Create ripple effect
     * @param {HTMLElement} element - Element to create ripple on
     * @param {Event} event - Mouse event for ripple position
     * @param {string} color - Ripple color
     */
    createRipple(element, event, color = 'rgba(255, 255, 255, 0.3)') {
        if (this.shouldDisableAnimations()) return;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: ${color};
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            pointer-events: none;
            transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        `;
        
        // Ensure element has relative positioning
        const originalPosition = element.style.position;
        if (!element.style.position || element.style.position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(ripple);
        
        // Force reflow
        ripple.offsetHeight;
        
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
        
        setTimeout(() => {
            ripple.remove();
            if (originalPosition) {
                element.style.position = originalPosition;
            }
        }, 500);
    }
    
    /**
     * Animate number counter
     * @param {HTMLElement} element - Element containing the number
     * @param {number} start - Starting number
     * @param {number} end - Ending number
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Optional callback function
     */
    animateNumber(element, start, end, duration = 1000, callback = null) {
        if (this.shouldDisableAnimations()) {
            element.textContent = end;
            if (callback) callback();
            return;
        }
        
        const startTime = performance.now();
        const range = end - start;
        
        const animateStep = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.round(start + (range * easeOut));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animateStep);
            } else if (callback) {
                callback();
            }
        };
        
        requestAnimationFrame(animateStep);
    }
}

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animations = new AnimationManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}

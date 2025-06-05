/**
 * Digital Electronics Learning Platform - Main Application
 * Handles navigation, section management, and component initialization
 */

class DigitalElectronicsApp {
    constructor() {
        this.currentSection = 'introduction';
        this.components = {};
        this.isInitialized = false;
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Show loading indicator
            this.showLoadingIndicator();
            
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Initialize components in order
            await this.initializeComponents();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize navigation
            this.initializeNavigation();
            
            // Initialize progress tracking
            this.initializeProgressTracking();
            
            // Setup theme system
            this.initializeThemeSystem();
            
            // Initialize sections
            this.initializeSections();
            
            // Hide loading indicator
            this.hideLoadingIndicator();
            
            // Show initial section
            this.showSection('introduction');
            
            this.isInitialized = true;
            
            console.log('Digital Electronics Learning Platform initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showErrorMessage('Failed to initialize the platform. Please refresh the page.');
        }
    }
    
    /**
     * Initialize all components
     */
    async initializeComponents() {
        // Initialize storage system
        if (window.storage) {
            this.components.storage = window.storage;
            this.components.storage.initializeUserData();
        }
        
        // Initialize animation system
        if (window.animations) {
            this.components.animations = window.animations;
        }
        
        // Initialize circuit simulators
        await this.initializeSimulators();
        
        // Initialize timing diagram generator
        if (window.timingDiagramGenerator) {
            this.components.timingDiagram = window.timingDiagramGenerator;
        }
    }
    
    /**
     * Initialize circuit simulators
     */
    async initializeSimulators() {
        // Wait for simulators to be available
        const waitForSimulators = () => {
            return new Promise((resolve) => {
                const checkSimulators = () => {
                    if (window.flipFlopSimulator && 
                        window.shiftRegisterSimulator && 
                        window.counterSimulator && 
                        window.decoderSimulator) {
                        resolve();
                    } else {
                        setTimeout(checkSimulators, 100);
                    }
                };
                checkSimulators();
            });
        };
        
        await waitForSimulators();
        
        // Store references to simulators
        this.components.flipFlops = window.flipFlopSimulator;
        this.components.shiftRegisters = window.shiftRegisterSimulator;
        this.components.counters = window.counterSimulator;
        this.components.decoders = window.decoderSimulator;
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.showSection(sectionId);
            });
        });
        
        // Progress button
        const progressBtn = document.getElementById('progressBtn');
        if (progressBtn) {
            progressBtn.addEventListener('click', () => {
                this.showProgressModal();
            });
        }
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Modal close buttons
        document.querySelectorAll('.modal .close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal(btn.closest('.modal'));
            });
        });
        
        // Close modals on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Learning path interactions
        this.setupLearningPathInteractions();
        
        // Glossary interactions
        this.setupGlossaryInteractions();
    }
    
    /**
     * Initialize navigation system
     */
    initializeNavigation() {
        const sections = ['introduction', 'flip-flops', 'shift-registers', 'counters', 'decoders', 'exercises'];
        
        // Track which sections have been visited
        sections.forEach(sectionId => {
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (navLink) {
                navLink.setAttribute('data-section', sectionId);
            }
        });
        
        // Update active navigation
        this.updateActiveNavigation('introduction');
    }
    
    /**
     * Initialize progress tracking
     */
    initializeProgressTracking() {
        if (!this.components.storage) return;
        
        // Load user progress
        const progress = this.components.storage.getUserProgress();
        
        // Update UI based on progress
        this.updateProgressUI(progress);
        
        // Setup progress tracking for interactions
        this.setupProgressTracking();
    }
    
    /**
     * Initialize theme system
     */
    initializeThemeSystem() {
        const savedTheme = localStorage.getItem('digital-electronics-theme') || 'light';
        this.setTheme(savedTheme);
    }
    
    /**
     * Initialize sections with dynamic content
     */
    initializeSections() {
        this.initializeIntroductionSection();
        this.initializeFlipFlopsSection();
        this.initializeShiftRegistersSection();
        this.initializeCountersSection();
        this.initializeDecodersSection();
        this.initializeExercisesSection();
    }
    
    /**
     * Initialize introduction section
     */
    initializeIntroductionSection() {
        // Animate learning path steps
        const pathSteps = document.querySelectorAll('.path-step');
        pathSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                const stepNumber = parseInt(step.dataset.step);
                const sections = ['introduction', 'flip-flops', 'shift-registers', 'counters', 'decoders', 'exercises'];
                if (stepNumber > 0 && stepNumber <= sections.length) {
                    this.showSection(sections[stepNumber - 1]);
                }
            });
            
            // Add hover effects
            step.addEventListener('mouseenter', () => {
                if (this.components.animations) {
                    this.components.animations.scaleIn(step, 200);
                }
            });
        });
        
        // Animate concept cards on scroll
        this.setupScrollAnimations('.concept-card');
        this.setupScrollAnimations('.definition-item');
        this.setupScrollAnimations('.glossary-item');
    }
    
    /**
     * Initialize flip-flops section
     */
    initializeFlipFlopsSection() {
        // Section is already initialized by FlipFlopSimulator
        // Add timing diagrams for each flip-flop type
        this.addTimingDiagramsToFlipFlops();
    }
    
    /**
     * Initialize shift registers section
     */
    initializeShiftRegistersSection() {
        const container = document.getElementById('basic-shift-simulator');
        if (container && this.components.shiftRegisters) {
            this.createShiftRegisterContent(container);
        }
    }
    
    /**
     * Initialize counters section
     */
    initializeCountersSection() {
        const container = document.querySelector('.counter-container');
        if (container && this.components.counters) {
            this.createCounterContent(container);
        }
    }
    
    /**
     * Initialize decoders section
     */
    initializeDecodersSection() {
        const container = document.querySelector('.decoder-container');
        if (container && this.components.decoders) {
            this.createDecoderContent(container);
        }
    }
    
    /**
     * Initialize exercises section
     */
    initializeExercisesSection() {
        const container = document.querySelector('.exercises-container');
        if (container) {
            this.createExercisesContent(container);
        }
    }
    
    /**
     * Show section
     * @param {string} sectionId - Section ID to show
     */
    showSection(sectionId) {
        if (!this.isInitialized) return;
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Animate section entrance
            if (this.components.animations) {
                this.components.animations.fadeIn(targetSection, 300);
            }
            
            // Update navigation
            this.updateActiveNavigation(sectionId);
            
            // Track section visit
            if (this.components.storage) {
                this.components.storage.trackSectionVisit(sectionId);
            }
            
            // Update current section
            this.currentSection = sectionId;
            
            // Trigger section-specific initialization
            this.onSectionShow(sectionId);
        }
    }
    
    /**
     * Handle section-specific initialization when shown
     * @param {string} sectionId - Section ID
     */
    onSectionShow(sectionId) {
        switch (sectionId) {
            case 'flip-flops':
                // Initialize flip-flop specific features
                this.initializeFlipFlopFeatures();
                break;
                
            case 'shift-registers':
                // Initialize shift register features
                this.initializeShiftRegisterFeatures();
                break;
                
            case 'counters':
                // Initialize counter features
                this.initializeCounterFeatures();
                break;
                
            case 'decoders':
                // Initialize decoder features
                this.initializeDecoderFeatures();
                break;
                
            case 'exercises':
                // Initialize exercise features
                this.initializeExerciseFeatures();
                break;
        }
    }
    
    /**
     * Update active navigation
     * @param {string} sectionId - Active section ID
     */
    updateActiveNavigation(sectionId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    /**
     * Show progress modal
     */
    showProgressModal() {
        const modal = document.getElementById('progressModal');
        if (!modal) return;
        
        // Update progress content
        this.updateProgressContent();
        
        // Show modal
        modal.style.display = 'flex';
        
        // Animate modal entrance
        if (this.components.animations) {
            this.components.animations.slideInDown(modal.querySelector('.modal-content'), 300);
        }
    }
    
    /**
     * Close modal
     * @param {HTMLElement} modal - Modal element
     */
    closeModal(modal) {
        if (!modal) return;
        
        modal.style.display = 'none';
    }
    
    /**
     * Toggle theme
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    /**
     * Set theme
     * @param {string} theme - Theme name (light/dark)
     */
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('digital-electronics-theme', theme);
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
    
    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboardShortcuts(e) {
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="flex"]');
            if (openModal) {
                this.closeModal(openModal);
            }
        }
        
        // Ctrl + Arrow keys for navigation
        if (e.ctrlKey) {
            const sections = ['introduction', 'flip-flops', 'shift-registers', 'counters', 'decoders', 'exercises'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                this.showSection(sections[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
                e.preventDefault();
                this.showSection(sections[currentIndex + 1]);
            }
        }
    }
    
    /**
     * Setup learning path interactions
     */
    setupLearningPathInteractions() {
        const pathSteps = document.querySelectorAll('.path-step');
        
        pathSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                // Animate clicked step
                if (this.components.animations) {
                    this.components.animations.pulse(step, 300, 1);
                }
                
                // Highlight path progression
                pathSteps.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('completed');
                    }
                });
            });
        });
    }
    
    /**
     * Setup glossary interactions
     */
    setupGlossaryInteractions() {
        const glossaryItems = document.querySelectorAll('.glossary-item');
        
        glossaryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Toggle expanded state
                item.classList.toggle('expanded');
                
                // Animate expansion
                if (this.components.animations) {
                    this.components.animations.scaleIn(item, 200);
                }
            });
        });
    }
    
    /**
     * Setup scroll animations
     * @param {string} selector - CSS selector for elements to animate
     */
    setupScrollAnimations(selector) {
        const elements = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animate || 'fadeIn';
                    const delay = parseFloat(element.dataset.delay || 0) * 1000;
                    
                    setTimeout(() => {
                        if (this.components.animations) {
                            this.components.animations[animationType](element, 600);
                        }
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    /**
     * Show loading indicator
     */
    showLoadingIndicator() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
    }
    
    /**
     * Hide loading indicator
     */
    hideLoadingIndicator() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
    
    /**
     * Show error message
     * @param {string} message - Error message
     */
    showErrorMessage(message) {
        console.error(message);
        // You could implement a toast notification system here
    }
    
    /**
     * Update progress UI
     * @param {Object} progress - Progress data
     */
    updateProgressUI(progress) {
        // Update progress indicators in the UI
        // This would be implemented based on your specific progress tracking needs
    }
    
    /**
     * Setup progress tracking
     */
    setupProgressTracking() {
        // Track various user interactions for progress
        document.addEventListener('click', (e) => {
            if (e.target.matches('.clock-btn, .tab-btn, .step-btn')) {
                if (this.components.storage) {
                    this.components.storage.trackInteraction(e.target.className);
                }
            }
        });
    }
    
    /**
     * Update progress content in modal
     */
    updateProgressContent() {
        const progressContent = document.getElementById('progressContent');
        if (!progressContent || !this.components.storage) return;
        
        const progress = this.components.storage.getUserProgress();
        const stats = this.components.storage.getStatistics();
        
        progressContent.innerHTML = `
            <div class="progress-overview">
                <h4>Learning Progress</h4>
                <div class="progress-stats">
                    <div class="stat-item">
                        <span class="stat-label">Sections Visited:</span>
                        <span class="stat-value">${progress.sectionsVisited.length}/6</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Simulations Used:</span>
                        <span class="stat-value">${Object.keys(progress.simulationsUsed).length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Time Spent:</span>
                        <span class="stat-value">${Math.round(stats.totalTimeSpent / 60)} minutes</span>
                    </div>
                </div>
                
                <div class="achievements">
                    <h5>Achievements</h5>
                    <div class="achievement-list">
                        ${progress.achievements.map(achievement => `
                            <div class="achievement-item">
                                <i class="fas fa-trophy"></i>
                                <span>${achievement}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Add timing diagrams to flip-flop sections
     */
    addTimingDiagramsToFlipFlops() {
        const flipFlopTypes = ['jk', 'd', 't'];
        
        flipFlopTypes.forEach(type => {
            const container = document.querySelector(`#${type}-content`);
            if (container && this.components.timingDiagram) {
                const timingContainer = document.createElement('div');
                timingContainer.className = 'timing-diagram-container';
                timingContainer.innerHTML = `
                    <h5>${type.toUpperCase()} Flip-Flop Timing Diagram</h5>
                    <div class="timing-controls">
                        <button id="timing-play-${type}">Play</button>
                        <button id="timing-pause-${type}">Pause</button>
                        <button id="timing-reset-${type}">Reset</button>
                    </div>
                `;
                
                container.appendChild(timingContainer);
                
                // Create timing diagram
                this.components.timingDiagram.createFlipFlopTimingDiagram(type, timingContainer);
            }
        });
    }
    
    /**
     * Create shift register content
     * @param {HTMLElement} container - Container element
     */
    createShiftRegisterContent(container) {
        container.innerHTML = `
            <div class="shift-register-tabs">
                <button class="tab-btn active" data-tab="basic">Basic Register</button>
                <button class="tab-btn" data-tab="parallel">Parallel Load</button>
                <button class="tab-btn" data-tab="universal">Universal Register</button>
                <button class="tab-btn" data-tab="serial">Serial Transfer</button>
            </div>
            
            <div class="shift-register-content">
                <div id="basic-register" class="tab-content active">
                    <!-- Basic shift register content will be generated by the simulator -->
                </div>
                <div id="parallel-register" class="tab-content">
                    <!-- Parallel load register content will be generated by the simulator -->
                </div>
                <div id="universal-register" class="tab-content">
                    <!-- Universal register content will be generated by the simulator -->
                </div>
                <div id="serial-register" class="tab-content">
                    <!-- Serial transfer content will be generated by the simulator -->
                </div>
            </div>
        `;
        
        // Let the shift register simulator handle the content creation
        if (this.components.shiftRegisters) {
            const serialContainer = container.querySelector('#serial-register');
            if (serialContainer) {
                this.components.shiftRegisters.createSerialTransferDemo(serialContainer);
            }
        }
    }
    
    /**
     * Create counter content
     * @param {HTMLElement} container - Container element
     */
    createCounterContent(container) {
        container.innerHTML = `
            <div class="counter-types">
                <div class="counter-type-card" data-type="ripple">
                    <h4>Ripple Counter</h4>
                    <div id="ripple-counter" class="counter-simulator">
                        <div class="counter-display">
                            <div class="bit-cells">
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                            </div>
                            <div class="count-display">0</div>
                            <div class="binary-display">0000</div>
                        </div>
                        <div class="counter-controls">
                            <button class="start-btn">Start</button>
                            <button class="step-btn">Step</button>
                            <button class="reset-btn">Reset</button>
                        </div>
                    </div>
                </div>
                
                <div class="counter-type-card" data-type="synchronous">
                    <h4>Synchronous Counter</h4>
                    <div id="synchronous-counter" class="counter-simulator">
                        <div class="counter-display">
                            <div class="bit-cells">
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                            </div>
                            <div class="count-display">0</div>
                            <div class="binary-display">0000</div>
                        </div>
                        <div class="counter-controls">
                            <button class="start-btn">Start</button>
                            <button class="step-btn">Step</button>
                            <button class="reset-btn">Reset</button>
                        </div>
                    </div>
                </div>
                
                <div class="counter-type-card" data-type="bcd">
                    <h4>BCD Counter</h4>
                    <div id="bcd-counter" class="counter-simulator">
                        <div class="counter-display">
                            <div class="bit-cells">
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                            </div>
                            <div class="count-display">0</div>
                            <div class="decimal-display">0</div>
                        </div>
                        <div class="counter-controls">
                            <button class="start-btn">Start</button>
                            <button class="step-btn">Step</button>
                            <button class="reset-btn">Reset</button>
                        </div>
                    </div>
                </div>
                
                <div class="counter-type-card" data-type="ring">
                    <h4>Ring Counter</h4>
                    <div id="ring-counter" class="counter-simulator">
                        <div class="counter-display">
                            <div class="bit-cells">
                                <div class="bit-cell active">1</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                                <div class="bit-cell">0</div>
                            </div>
                            <div class="count-display">Position: 0</div>
                            <div class="binary-display">1000</div>
                        </div>
                        <div class="counter-controls">
                            <button class="start-btn">Start</button>
                            <button class="step-btn">Step</button>
                            <button class="reset-btn">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="counter-comparison-section">
                <div id="counter-comparison-container"></div>
            </div>
            
            <div class="clock-speed-control">
                <label for="clock-speed">Clock Speed:</label>
                <input type="range" id="clock-speed" min="100" max="2000" value="1000" step="100">
                <span id="clock-speed-display">1.0 Hz</span>
            </div>
        `;
        
        // Create counter comparison demo
        if (this.components.counters) {
            const comparisonContainer = container.querySelector('#counter-comparison-container');
            if (comparisonContainer) {
                this.components.counters.createCounterComparison(comparisonContainer);
            }
        }
    }
    
    /**
     * Create decoder content
     * @param {HTMLElement} container - Container element
     */
    createDecoderContent(container) {
        container.innerHTML = `
            <div class="decoder-tabs">
                <button class="tab-btn active" data-tab="2x4">2×4 Decoder</button>
                <button class="tab-btn" data-tab="3x8">3×8 Decoder</button>
                <button class="tab-btn" data-tab="bcd7seg">BCD to 7-Segment</button>
            </div>
            
            <div class="decoder-content">
                <div id="decoder-2x4" class="tab-content active">
                    <!-- 2x4 decoder content will be generated -->
                </div>
                <div id="decoder-3x8" class="tab-content">
                    <!-- 3x8 decoder content will be generated -->
                </div>
                <div id="decoder-bcd7seg" class="tab-content">
                    <!-- BCD to 7-segment content will be generated -->
                </div>
            </div>
            
            <div class="decoder-applications-section">
                <div id="decoder-applications-container"></div>
            </div>
        `;
        
        // Create decoder application demo
        if (this.components.decoders) {
            const applicationsContainer = container.querySelector('#decoder-applications-container');
            if (applicationsContainer) {
                this.components.decoders.createDecoderApplication(applicationsContainer);
            }
        }
    }
    
    /**
     * Create exercises content
     * @param {HTMLElement} container - Container element
     */
    createExercisesContent(container) {
        container.innerHTML = `
            <div class="exercises-grid">
                <div class="exercise-category">
                    <h3>Flip-Flop Exercises</h3>
                    <div class="exercise-list">
                        <div class="exercise-item" data-type="flip-flop" data-level="basic">
                            <h4>Basic JK Flip-Flop</h4>
                            <p>Complete the truth table for a JK flip-flop</p>
                            <button class="start-exercise-btn">Start Exercise</button>
                        </div>
                        <div class="exercise-item" data-type="flip-flop" data-level="intermediate">
                            <h4>Flip-Flop Timing</h4>
                            <p>Analyze timing diagrams for different flip-flop types</p>
                            <button class="start-exercise-btn">Start Exercise</button>
                        </div>
                    </div>
                </div>
                
                <div class="exercise-category">
                    <h3>Counter Exercises</h3>
                    <div class="exercise-list">
                        <div class="exercise-item" data-type="counter" data-level="basic">
                            <h4>Binary Counter Design</h4>
                            <p>Design a 4-bit binary counter</p>
                            <button class="start-exercise-btn">Start Exercise</button>
                        </div>
                        <div class="exercise-item" data-type="counter" data-level="advanced">
                            <h4>Custom Counter Sequence</h4>
                            <p>Create a counter with a custom counting sequence</p>
                            <button class="start-exercise-btn">Start Exercise</button>
                        </div>
                    </div>
                </div>
                
                <div class="exercise-category">
                    <h3>Decoder Exercises</h3>
                    <div class="exercise-list">
                        <div class="exercise-item" data-type="decoder" data-level="basic">
                            <h4>Truth Table Completion</h4>
                            <p>Complete truth tables for various decoders</p>
                            <button class="start-exercise-btn">Start Exercise</button>
                        </div>
                        <div class="exercise-item" data-type="decoder" data-level="intermediate">
                            <h4>7-Segment Display</h4>
                            <p>Design patterns for 7-segment displays</p>
                            <button class="start-exercise-btn">Start Exercise</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="exercise-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="exercise-title">Exercise</h3>
                        <button class="close-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="exercise-content"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Setup exercise interactions
        this.setupExerciseInteractions(container);
    }
    
    /**
     * Setup exercise interactions
     * @param {HTMLElement} container - Exercises container
     */
    setupExerciseInteractions(container) {
        const exerciseButtons = container.querySelectorAll('.start-exercise-btn');
        
        exerciseButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const exerciseItem = btn.closest('.exercise-item');
                const type = exerciseItem.dataset.type;
                const level = exerciseItem.dataset.level;
                const title = exerciseItem.querySelector('h4').textContent;
                
                this.startExercise(type, level, title);
            });
        });
    }
    
    /**
     * Start an exercise
     * @param {string} type - Exercise type
     * @param {string} level - Exercise level
     * @param {string} title - Exercise title
     */
    startExercise(type, level, title) {
        const modal = document.getElementById('exercise-modal');
        const titleElement = document.getElementById('exercise-title');
        const contentElement = document.getElementById('exercise-content');
        
        if (!modal || !titleElement || !contentElement) return;
        
        titleElement.textContent = title;
        
        // Generate exercise content based on type and level
        const exerciseContent = this.generateExerciseContent(type, level);
        contentElement.innerHTML = exerciseContent;
        
        // Show modal
        modal.style.display = 'flex';
        
        // Track exercise start
        if (this.components.storage) {
            this.components.storage.trackExercise(type, level);
        }
    }
    
    /**
     * Generate exercise content
     * @param {string} type - Exercise type
     * @param {string} level - Exercise level
     * @returns {string} HTML content for the exercise
     */
    generateExerciseContent(type, level) {
        // This is a simplified example - you would implement full exercise content
        return `
            <div class="exercise-content">
                <p>This is a ${level} level ${type} exercise.</p>
                <p>Exercise content would be generated here based on the type and level.</p>
                <div class="exercise-controls">
                    <button class="btn btn-primary">Submit Answer</button>
                    <button class="btn btn-secondary">Show Hint</button>
                </div>
            </div>
        `;
    }
    
    /**
     * Initialize flip-flop specific features
     */
    initializeFlipFlopFeatures() {
        // Additional flip-flop specific initialization
    }
    
    /**
     * Initialize shift register features
     */
    initializeShiftRegisterFeatures() {
        // Additional shift register specific initialization
    }
    
    /**
     * Initialize counter features
     */
    initializeCounterFeatures() {
        // Additional counter specific initialization
    }
    
    /**
     * Initialize decoder features
     */
    initializeDecoderFeatures() {
        // Additional decoder specific initialization
    }
    
    /**
     * Initialize exercise features
     */
    initializeExerciseFeatures() {
        // Additional exercise specific initialization
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.digitalElectronicsApp = new DigitalElectronicsApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DigitalElectronicsApp;
}

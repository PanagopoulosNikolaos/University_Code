/**
 * Digital Electronics Learning Platform - Storage Management
 * Handles user progress tracking, preferences, and local storage
 */

class StorageManager {
    constructor() {
        this.storageKey = 'digital-electronics-platform';
        this.userData = null;
        this.sessionStartTime = Date.now();
        
        this.init();
    }
    
    /**
     * Initialize storage system
     */
    init() {
        this.loadUserData();
        this.setupStorageEventListeners();
    }
    
    /**
     * Initialize user data structure
     */
    initializeUserData() {
        const defaultData = {
            version: '1.0.0',
            created: new Date().toISOString(),
            lastAccessed: new Date().toISOString(),
            progress: {
                sectionsVisited: [],
                simulationsUsed: {},
                exercisesCompleted: [],
                achievements: [],
                currentSection: 'introduction',
                completionPercentage: 0
            },
            preferences: {
                theme: 'light',
                animationsEnabled: true,
                soundEnabled: false,
                language: 'en'
            },
            statistics: {
                totalTimeSpent: 0,
                sessionsCount: 0,
                interactionsCount: 0,
                lastSessionDate: new Date().toISOString()
            }
        };
        
        this.userData = defaultData;
        this.saveUserData();
        return this.userData;
    }
    
    /**
     * Load user data from localStorage
     */
    loadUserData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.userData = JSON.parse(stored);
                this.updateLastAccessed();
                this.incrementSessionCount();
            } else {
                this.initializeUserData();
            }
        } catch (error) {
            console.warn('Failed to load user data, initializing new data:', error);
            this.initializeUserData();
        }
    }
    
    /**
     * Save user data to localStorage
     */
    saveUserData() {
        try {
            if (this.userData) {
                this.userData.lastAccessed = new Date().toISOString();
                localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
            }
        } catch (error) {
            console.error('Failed to save user data:', error);
        }
    }
    
    /**
     * Get current user data
     * @returns {Object} User data object
     */
    getUserData() {
        return this.userData || this.initializeUserData();
    }
    
    /**
     * Get user progress
     * @returns {Object} Progress object
     */
    getUserProgress() {
        const data = this.getUserData();
        return data.progress || {};
    }
    
    /**
     * Get user preferences
     * @returns {Object} Preferences object
     */
    getUserPreferences() {
        const data = this.getUserData();
        return data.preferences || {};
    }
    
    /**
     * Get user statistics
     * @returns {Object} Statistics object
     */
    getStatistics() {
        const data = this.getUserData();
        return data.statistics || {};
    }
    
    /**
     * Track section visit
     * @param {string} sectionId - Section identifier
     */
    trackSectionVisit(sectionId) {
        const data = this.getUserData();
        
        if (!data.progress.sectionsVisited.includes(sectionId)) {
            data.progress.sectionsVisited.push(sectionId);
            this.checkAchievements();
        }
        
        data.progress.currentSection = sectionId;
        this.incrementInteractions();
        this.saveUserData();
    }
    
    /**
     * Track simulation usage
     * @param {string} simulationType - Type of simulation
     */
    trackSimulation(simulationType) {
        const data = this.getUserData();
        
        if (!data.progress.simulationsUsed[simulationType]) {
            data.progress.simulationsUsed[simulationType] = 0;
        }
        
        data.progress.simulationsUsed[simulationType]++;
        this.incrementInteractions();
        this.checkAchievements();
        this.saveUserData();
    }
    
    /**
     * Track exercise completion
     * @param {string} exerciseId - Exercise identifier
     * @param {number} score - Exercise score (0-100)
     */
    trackExercise(exerciseId, score) {
        const data = this.getUserData();
        
        const exerciseData = {
            id: exerciseId,
            score: score,
            completedAt: new Date().toISOString(),
            attempts: 1
        };
        
        // Check if exercise was already completed
        const existingIndex = data.progress.exercisesCompleted.findIndex(ex => ex.id === exerciseId);
        if (existingIndex >= 0) {
            data.progress.exercisesCompleted[existingIndex].attempts++;
            if (score > data.progress.exercisesCompleted[existingIndex].score) {
                data.progress.exercisesCompleted[existingIndex].score = score;
                data.progress.exercisesCompleted[existingIndex].completedAt = exerciseData.completedAt;
            }
        } else {
            data.progress.exercisesCompleted.push(exerciseData);
        }
        
        this.incrementInteractions();
        this.checkAchievements();
        this.updateCompletionPercentage();
        this.saveUserData();
    }
    
    /**
     * Track user interaction
     * @param {string} interactionType - Type of interaction
     */
    trackInteraction(interactionType) {
        this.incrementInteractions();
        
        // Track specific interaction types for analytics
        const data = this.getUserData();
        if (!data.statistics.interactionTypes) {
            data.statistics.interactionTypes = {};
        }
        
        if (!data.statistics.interactionTypes[interactionType]) {
            data.statistics.interactionTypes[interactionType] = 0;
        }
        
        data.statistics.interactionTypes[interactionType]++;
        this.saveUserData();
    }
    
    /**
     * Set user preference
     * @param {string} key - Preference key
     * @param {*} value - Preference value
     */
    setPreference(key, value) {
        const data = this.getUserData();
        data.preferences[key] = value;
        this.saveUserData();
    }
    
    /**
     * Get user preference
     * @param {string} key - Preference key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Preference value
     */
    getPreference(key, defaultValue = null) {
        const preferences = this.getUserPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultValue;
    }
    
    /**
     * Update last accessed timestamp
     */
    updateLastAccessed() {
        if (this.userData) {
            this.userData.lastAccessed = new Date().toISOString();
        }
    }
    
    /**
     * Increment session count
     */
    incrementSessionCount() {
        const data = this.getUserData();
        data.statistics.sessionsCount++;
        data.statistics.lastSessionDate = new Date().toISOString();
    }
    
    /**
     * Increment interactions count
     */
    incrementInteractions() {
        const data = this.getUserData();
        data.statistics.interactionsCount++;
    }
    
    /**
     * Update total time spent
     */
    updateTimeSpent() {
        const data = this.getUserData();
        const sessionTime = Date.now() - this.sessionStartTime;
        data.statistics.totalTimeSpent += sessionTime;
        this.sessionStartTime = Date.now(); // Reset for next calculation
    }
    
    /**
     * Check and award achievements
     */
    checkAchievements() {
        const data = this.getUserData();
        const achievements = [];
        
        // Section completion achievements
        if (data.progress.sectionsVisited.length >= 1 && !data.progress.achievements.includes('first-steps')) {
            achievements.push('first-steps');
        }
        
        if (data.progress.sectionsVisited.length >= 3 && !data.progress.achievements.includes('explorer')) {
            achievements.push('explorer');
        }
        
        if (data.progress.sectionsVisited.length >= 5 && !data.progress.achievements.includes('completionist')) {
            achievements.push('completionist');
        }
        
        // Simulation usage achievements
        const simulationCount = Object.keys(data.progress.simulationsUsed).length;
        if (simulationCount >= 3 && !data.progress.achievements.includes('hands-on-learner')) {
            achievements.push('hands-on-learner');
        }
        
        if (simulationCount >= 8 && !data.progress.achievements.includes('simulation-master')) {
            achievements.push('simulation-master');
        }
        
        // Exercise completion achievements
        if (data.progress.exercisesCompleted.length >= 1 && !data.progress.achievements.includes('problem-solver')) {
            achievements.push('problem-solver');
        }
        
        if (data.progress.exercisesCompleted.length >= 5 && !data.progress.achievements.includes('dedicated-student')) {
            achievements.push('dedicated-student');
        }
        
        // Time-based achievements
        if (data.statistics.totalTimeSpent >= 30 * 60 * 1000 && !data.progress.achievements.includes('time-invested')) { // 30 minutes
            achievements.push('time-invested');
        }
        
        // Add new achievements
        achievements.forEach(achievement => {
            if (!data.progress.achievements.includes(achievement)) {
                data.progress.achievements.push(achievement);
                this.showAchievementNotification(achievement);
            }
        });
    }
    
    /**
     * Show achievement notification
     * @param {string} achievementId - Achievement identifier
     */
    showAchievementNotification(achievementId) {
        const achievementNames = {
            'first-steps': 'First Steps - Visited your first section!',
            'explorer': 'Explorer - Visited 3 different sections!',
            'completionist': 'Completionist - Visited 5 different sections!',
            'hands-on-learner': 'Hands-on Learner - Used 3 different simulators!',
            'simulation-master': 'Simulation Master - Used 8 different simulators!',
            'problem-solver': 'Problem Solver - Completed your first exercise!',
            'dedicated-student': 'Dedicated Student - Completed 5 exercises!',
            'time-invested': 'Time Invested - Spent 30 minutes learning!'
        };
        
        const achievementName = achievementNames[achievementId] || 'New Achievement Unlocked!';
        
        // Create achievement notification (you can customize this)
        console.log(`🏆 Achievement Unlocked: ${achievementName}`);
        
        // You could implement a toast notification system here
        if (typeof window !== 'undefined' && window.showNotification) {
            window.showNotification(`🏆 ${achievementName}`, 'achievement');
        }
    }
    
    /**
     * Update completion percentage
     */
    updateCompletionPercentage() {
        const data = this.getUserData();
        
        const totalSections = 6; // introduction, flip-flops, shift-registers, counters, decoders, exercises
        const totalSimulations = 12; // Approximate number of different simulations
        const totalExercises = 10; // Estimated number of exercises
        
        const sectionProgress = (data.progress.sectionsVisited.length / totalSections) * 40;
        const simulationProgress = (Object.keys(data.progress.simulationsUsed).length / totalSimulations) * 40;
        const exerciseProgress = (data.progress.exercisesCompleted.length / totalExercises) * 20;
        
        data.progress.completionPercentage = Math.min(100, Math.round(sectionProgress + simulationProgress + exerciseProgress));
    }
    
    /**
     * Export user data
     * @returns {string} JSON string of user data
     */
    exportUserData() {
        this.updateTimeSpent();
        return JSON.stringify(this.getUserData(), null, 2);
    }
    
    /**
     * Import user data
     * @param {string} jsonData - JSON string of user data
     * @returns {boolean} Success status
     */
    importUserData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            
            // Validate data structure
            if (importedData.version && importedData.progress && importedData.preferences) {
                this.userData = importedData;
                this.saveUserData();
                return true;
            } else {
                console.error('Invalid user data format');
                return false;
            }
        } catch (error) {
            console.error('Failed to import user data:', error);
            return false;
        }
    }
    
    /**
     * Reset user data
     */
    resetUserData() {
        localStorage.removeItem(this.storageKey);
        this.initializeUserData();
    }
    
    /**
     * Setup storage event listeners
     */
    setupStorageEventListeners() {
        // Update time spent when page is about to unload
        window.addEventListener('beforeunload', () => {
            this.updateTimeSpent();
            this.saveUserData();
        });
        
        // Handle visibility change to track active time
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.updateTimeSpent();
                this.saveUserData();
            } else {
                this.sessionStartTime = Date.now();
            }
        });
        
        // Periodic save (every 30 seconds)
        setInterval(() => {
            this.updateTimeSpent();
            this.saveUserData();
        }, 30000);
    }
    
    /**
     * Get storage usage statistics
     * @returns {Object} Storage usage information
     */
    getStorageInfo() {
        const data = JSON.stringify(this.getUserData());
        const sizeInBytes = new Blob([data]).size;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        
        return {
            sizeBytes: sizeInBytes,
            sizeKB: sizeInKB,
            itemCount: Object.keys(this.getUserData()).length,
            lastSaved: this.userData?.lastAccessed || 'Never'
        };
    }
}

// Initialize storage manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.storage = new StorageManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}

/**
 * Digital Electronics Learning Platform - Shift Register Implementations
 * Handles different types of shift registers and serial transfer systems
 */

class ShiftRegisterSimulator {
    constructor() {
        this.currentType = 'basic';
        this.registers = {
            basic: { bits: [0, 0, 0, 0], serialIn: 0 },
            parallel: { bits: [0, 0, 0, 0], parallelData: [0, 0, 0, 0], loadEnable: false },
            universal: { bits: [0, 0, 0, 0], mode: 0, serialInL: 0, serialInR: 0, parallelData: [0, 0, 0, 0] }
        };
        this.isAnimating = false;
        
        this.init();
    }
    
    /**
     * Initialize shift register simulator
     */
    init() {
        this.setupEventListeners();
        this.updateAllDisplays();
    }
    
    /**
     * Setup event listeners for shift register controls
     */
    setupEventListeners() {
        // Register type tabs
        document.querySelectorAll('.register-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchRegisterType(e.target.dataset.tab);
            });
        });
        
        this.setupBasicRegisterControls();
        this.setupParallelRegisterControls();
        this.setupUniversalRegisterControls();
    }
    
    /**
     * Setup basic shift register controls
     */
    setupBasicRegisterControls() {
        const container = document.getElementById('basic-register');
        if (!container) return;
        
        const serialInput = container.querySelector('#basic-serial-input');
        const shiftBtn = container.querySelector('#basic-shift');
        const resetBtn = container.querySelector('#basic-reset');
        
        if (serialInput) {
            serialInput.addEventListener('change', (e) => {
                this.registers.basic.serialIn = e.target.checked ? 1 : 0;
            });
        }
        
        if (shiftBtn) {
            shiftBtn.addEventListener('click', () => {
                this.shiftBasicRegister();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetRegister('basic');
            });
        }
    }
    
    /**
     * Setup parallel load register controls
     */
    setupParallelRegisterControls() {
        const container = document.getElementById('parallel-register');
        if (!container) return;
        
        const serialInput = container.querySelector('#parallel-serial-input');
        const loadEnable = container.querySelector('#load-enable');
        const shiftBtn = container.querySelector('#parallel-shift');
        const loadBtn = container.querySelector('#parallel-load');
        const resetBtn = container.querySelector('#parallel-reset');
        
        // Parallel data inputs
        for (let i = 0; i < 4; i++) {
            const input = container.querySelector(`#parallel-data-${i}`);
            if (input) {
                input.addEventListener('change', (e) => {
                    this.registers.parallel.parallelData[i] = e.target.checked ? 1 : 0;
                });
            }
        }
        
        if (serialInput) {
            serialInput.addEventListener('change', (e) => {
                this.registers.parallel.serialIn = e.target.checked ? 1 : 0;
            });
        }
        
        if (loadEnable) {
            loadEnable.addEventListener('change', (e) => {
                this.registers.parallel.loadEnable = e.target.checked;
            });
        }
        
        if (shiftBtn) {
            shiftBtn.addEventListener('click', () => {
                this.shiftParallelRegister();
            });
        }
        
        if (loadBtn) {
            loadBtn.addEventListener('click', () => {
                this.loadParallelRegister();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetRegister('parallel');
            });
        }
    }
    
    /**
     * Setup universal shift register controls
     */
    setupUniversalRegisterControls() {
        const container = document.getElementById('universal-register');
        if (!container) return;
        
        const modeSelect = container.querySelector('#universal-mode');
        const serialInL = container.querySelector('#universal-serial-in-l');
        const serialInR = container.querySelector('#universal-serial-in-r');
        const clockBtn = container.querySelector('#universal-clock');
        const resetBtn = container.querySelector('#universal-reset');
        
        // Parallel data inputs
        for (let i = 0; i < 4; i++) {
            const input = container.querySelector(`#universal-data-${i}`);
            if (input) {
                input.addEventListener('change', (e) => {
                    this.registers.universal.parallelData[i] = e.target.checked ? 1 : 0;
                });
            }
        }
        
        if (modeSelect) {
            modeSelect.addEventListener('change', (e) => {
                this.registers.universal.mode = parseInt(e.target.value);
                this.updateUniversalRegisterControls();
            });
        }
        
        if (serialInL) {
            serialInL.addEventListener('change', (e) => {
                this.registers.universal.serialInL = e.target.checked ? 1 : 0;
            });
        }
        
        if (serialInR) {
            serialInR.addEventListener('change', (e) => {
                this.registers.universal.serialInR = e.target.checked ? 1 : 0;
            });
        }
        
        if (clockBtn) {
            clockBtn.addEventListener('click', () => {
                this.clockUniversalRegister();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetRegister('universal');
            });
        }
    }
    
    /**
     * Switch between register types
     * @param {string} type - Register type (basic, parallel, universal)
     */
    switchRegisterType(type) {
        if (this.isAnimating) return;
        
        this.currentType = type;
        
        // Update tab buttons
        document.querySelectorAll('.register-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === type);
        });
        
        // Update content sections
        document.querySelectorAll('.register-content .tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${type}-register`);
        });
        
        // Track usage
        if (window.storage) {
            window.storage.trackSimulation(`shift-register-${type}`);
        }
        
        // Animate transition
        this.animateTabTransition(type);
    }
    
    /**
     * Animate tab transition
     * @param {string} type - Register type
     */
    animateTabTransition(type) {
        const activeContent = document.querySelector(`#${type}-register`);
        if (activeContent && window.animations) {
            window.animations.slideInRight(activeContent, 300);
        }
    }
    
    /**
     * Shift basic register
     */
    shiftBasicRegister() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const register = this.registers.basic;
        
        // Animate shift
        const bitCells = document.querySelectorAll('#basic-register .bit-cell');
        if (window.animations) {
            window.animations.shiftBits(Array.from(bitCells), 'right');
        }
        
        // Perform shift after animation delay
        setTimeout(() => {
            // Shift right
            for (let i = 3; i > 0; i--) {
                register.bits[i] = register.bits[i - 1];
            }
            register.bits[0] = register.serialIn;
            
            this.updateBasicRegisterDisplay();
            this.isAnimating = false;
        }, 300);
    }
    
    /**
     * Shift parallel load register
     */
    shiftParallelRegister() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const register = this.registers.parallel;
        
        if (register.loadEnable) {
            // Load parallel data
            register.bits = [...register.parallelData];
        } else {
            // Shift right
            const bitCells = document.querySelectorAll('#parallel-register .bit-cell');
            if (window.animations) {
                window.animations.shiftBits(Array.from(bitCells), 'right');
            }
            
            setTimeout(() => {
                for (let i = 3; i > 0; i--) {
                    register.bits[i] = register.bits[i - 1];
                }
                register.bits[0] = register.serialIn;
            }, 300);
        }
        
        setTimeout(() => {
            this.updateParallelRegisterDisplay();
            this.isAnimating = false;
        }, register.loadEnable ? 100 : 300);
    }
    
    /**
     * Load parallel register
     */
    loadParallelRegister() {
        if (this.isAnimating) return;
        
        const register = this.registers.parallel;
        register.bits = [...register.parallelData];
        
        this.updateParallelRegisterDisplay();
        
        // Animate load
        const bitCells = document.querySelectorAll('#parallel-register .bit-cell');
        bitCells.forEach(cell => {
            if (window.animations) {
                window.animations.pulse(cell, 300, 1);
            }
        });
    }
    
    /**
     * Clock universal register
     */
    clockUniversalRegister() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const register = this.registers.universal;
        const mode = register.mode;
        
        let animationDirection = null;
        
        switch (mode) {
            case 0: // Hold
                break;
                
            case 1: // Shift right
                animationDirection = 'right';
                setTimeout(() => {
                    for (let i = 3; i > 0; i--) {
                        register.bits[i] = register.bits[i - 1];
                    }
                    register.bits[0] = register.serialInR;
                }, 300);
                break;
                
            case 2: // Shift left
                animationDirection = 'left';
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) {
                        register.bits[i] = register.bits[i + 1];
                    }
                    register.bits[3] = register.serialInL;
                }, 300);
                break;
                
            case 3: // Parallel load
                register.bits = [...register.parallelData];
                break;
        }
        
        // Animate if needed
        if (animationDirection) {
            const bitCells = document.querySelectorAll('#universal-register .bit-cell');
            if (window.animations) {
                window.animations.shiftBits(Array.from(bitCells), animationDirection);
            }
        }
        
        setTimeout(() => {
            this.updateUniversalRegisterDisplay();
            this.isAnimating = false;
        }, mode === 0 || mode === 3 ? 100 : 300);
    }
    
    /**
     * Reset register
     * @param {string} type - Register type
     */
    resetRegister(type) {
        const register = this.registers[type];
        register.bits = [0, 0, 0, 0];
        
        switch (type) {
            case 'basic':
                this.updateBasicRegisterDisplay();
                break;
            case 'parallel':
                this.updateParallelRegisterDisplay();
                break;
            case 'universal':
                this.updateUniversalRegisterDisplay();
                break;
        }
    }
    
    /**
     * Update basic register display
     */
    updateBasicRegisterDisplay() {
        const container = document.getElementById('basic-register');
        if (!container) return;
        
        const bitCells = container.querySelectorAll('.bit-cell');
        const register = this.registers.basic;
        
        bitCells.forEach((cell, index) => {
            const bit = register.bits[3 - index]; // Reverse order for display
            cell.textContent = bit;
            cell.classList.toggle('active', bit === 1);
        });
        
        // Update output display
        const output = container.querySelector('.output-display');
        if (output) {
            const binaryString = register.bits.join('');
            const decimal = parseInt(binaryString, 2);
            output.textContent = `Binary: ${binaryString}, Decimal: ${decimal}`;
        }
    }
    
    /**
     * Update parallel register display
     */
    updateParallelRegisterDisplay() {
        const container = document.getElementById('parallel-register');
        if (!container) return;
        
        const bitCells = container.querySelectorAll('.bit-cell');
        const register = this.registers.parallel;
        
        bitCells.forEach((cell, index) => {
            const bit = register.bits[3 - index]; // Reverse order for display
            cell.textContent = bit;
            cell.classList.toggle('active', bit === 1);
        });
        
        // Update output display
        const output = container.querySelector('.output-display');
        if (output) {
            const binaryString = register.bits.join('');
            const decimal = parseInt(binaryString, 2);
            output.textContent = `Binary: ${binaryString}, Decimal: ${decimal}`;
        }
    }
    
    /**
     * Update universal register display
     */
    updateUniversalRegisterDisplay() {
        const container = document.getElementById('universal-register');
        if (!container) return;
        
        const bitCells = container.querySelectorAll('.bit-cell');
        const register = this.registers.universal;
        
        bitCells.forEach((cell, index) => {
            const bit = register.bits[3 - index]; // Reverse order for display
            cell.textContent = bit;
            cell.classList.toggle('active', bit === 1);
        });
        
        // Update output display
        const output = container.querySelector('.output-display');
        if (output) {
            const binaryString = register.bits.join('');
            const decimal = parseInt(binaryString, 2);
            output.textContent = `Binary: ${binaryString}, Decimal: ${decimal}`;
        }
        
        // Update mode description
        const modeDesc = container.querySelector('.mode-description');
        if (modeDesc) {
            const modes = [
                'Hold - No operation',
                'Shift Right - Data moves right, serial input from right',
                'Shift Left - Data moves left, serial input from left',
                'Parallel Load - Load all bits simultaneously'
            ];
            modeDesc.textContent = modes[register.mode];
        }
    }
    
    /**
     * Update universal register control visibility
     */
    updateUniversalRegisterControls() {
        const container = document.getElementById('universal-register');
        if (!container) return;
        
        const mode = this.registers.universal.mode;
        const serialInRGroup = container.querySelector('.serial-in-r-group');
        const serialInLGroup = container.querySelector('.serial-in-l-group');
        const parallelGroup = container.querySelector('.parallel-data-group');
        
        if (serialInRGroup) {
            serialInRGroup.style.display = mode === 1 ? 'block' : 'none';
        }
        
        if (serialInLGroup) {
            serialInLGroup.style.display = mode === 2 ? 'block' : 'none';
        }
        
        if (parallelGroup) {
            parallelGroup.style.display = mode === 3 ? 'block' : 'none';
        }
    }
    
    /**
     * Update all displays
     */
    updateAllDisplays() {
        this.updateBasicRegisterDisplay();
        this.updateParallelRegisterDisplay();
        this.updateUniversalRegisterDisplay();
        this.updateUniversalRegisterControls();
    }
    
    /**
     * Create serial transfer demonstration
     * @param {HTMLElement} container - Container element
     */
    createSerialTransferDemo(container) {
        container.innerHTML = `
            <div class="serial-transfer-demo">
                <h4>Serial Transfer Between Registers</h4>
                <div class="transfer-layout">
                    <div class="source-register">
                        <h5>Source Register A</h5>
                        <div class="register-bits">
                            <div class="bit-cell" data-bit="3">1</div>
                            <div class="bit-cell" data-bit="2">0</div>
                            <div class="bit-cell" data-bit="1">1</div>
                            <div class="bit-cell" data-bit="0">1</div>
                        </div>
                    </div>
                    
                    <div class="transfer-connection">
                        <div class="serial-line"></div>
                        <div class="transfer-direction">→</div>
                    </div>
                    
                    <div class="destination-register">
                        <h5>Destination Register B</h5>
                        <div class="register-bits">
                            <div class="bit-cell" data-bit="3">0</div>
                            <div class="bit-cell" data-bit="2">0</div>
                            <div class="bit-cell" data-bit="1">0</div>
                            <div class="bit-cell" data-bit="0">0</div>
                        </div>
                    </div>
                </div>
                
                <div class="transfer-controls">
                    <button class="transfer-btn" id="start-transfer">Start Transfer</button>
                    <button class="transfer-btn" id="step-transfer">Step</button>
                    <button class="transfer-btn" id="reset-transfer">Reset</button>
                </div>
                
                <div class="transfer-status">
                    <p>Transfer Status: <span id="transfer-status">Ready</span></p>
                    <p>Bits Transferred: <span id="bits-transferred">0</span>/4</p>
                </div>
            </div>
        `;
        
        this.setupSerialTransferControls(container);
    }
    
    /**
     * Setup serial transfer controls
     * @param {HTMLElement} container - Container element
     */
    setupSerialTransferControls(container) {
        const sourceRegister = [1, 0, 1, 1];
        const destRegister = [0, 0, 0, 0];
        let transferStep = 0;
        let isTransferring = false;
        let transferInterval;
        
        const updateDisplay = () => {
            const sourceBits = container.querySelectorAll('.source-register .bit-cell');
            const destBits = container.querySelectorAll('.destination-register .bit-cell');
            
            sourceBits.forEach((cell, index) => {
                const bit = sourceRegister[3 - index];
                cell.textContent = bit;
                cell.classList.toggle('active', bit === 1);
            });
            
            destBits.forEach((cell, index) => {
                const bit = destRegister[3 - index];
                cell.textContent = bit;
                cell.classList.toggle('active', bit === 1);
            });
            
            const statusElement = container.querySelector('#transfer-status');
            const bitsElement = container.querySelector('#bits-transferred');
            
            if (statusElement) {
                statusElement.textContent = isTransferring ? 'Transferring...' : 
                                          transferStep === 4 ? 'Complete' : 'Ready';
            }
            
            if (bitsElement) {
                bitsElement.textContent = transferStep;
            }
        };
        
        const performTransferStep = () => {
            if (transferStep < 4) {
                // Shift destination register right
                for (let i = 3; i > 0; i--) {
                    destRegister[i] = destRegister[i - 1];
                }
                
                // Transfer bit from source LSB to destination MSB
                destRegister[0] = sourceRegister[3];
                
                // Shift source register right (with 0 input)
                for (let i = 3; i > 0; i--) {
                    sourceRegister[i] = sourceRegister[i - 1];
                }
                sourceRegister[0] = 0;
                
                transferStep++;
                updateDisplay();
                
                if (transferStep === 4) {
                    isTransferring = false;
                    if (transferInterval) {
                        clearInterval(transferInterval);
                    }
                }
            }
        };
        
        const startBtn = container.querySelector('#start-transfer');
        const stepBtn = container.querySelector('#step-transfer');
        const resetBtn = container.querySelector('#reset-transfer');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                if (!isTransferring && transferStep < 4) {
                    isTransferring = true;
                    transferInterval = setInterval(performTransferStep, 1000);
                }
            });
        }
        
        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                if (!isTransferring) {
                    performTransferStep();
                }
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                isTransferring = false;
                if (transferInterval) {
                    clearInterval(transferInterval);
                }
                
                sourceRegister.splice(0, 4, 1, 0, 1, 1);
                destRegister.splice(0, 4, 0, 0, 0, 0);
                transferStep = 0;
                updateDisplay();
            });
        }
        
        updateDisplay();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.shiftRegisterSimulator = new ShiftRegisterSimulator();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShiftRegisterSimulator;
}

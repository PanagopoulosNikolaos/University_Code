/**
 * Digital Electronics Learning Platform - Counter Implementations
 * Handles different types of counters: ripple, synchronous, BCD, and ring counters
 */

class CounterSimulator {
    constructor() {
        this.counters = {
            ripple: { count: 0, bits: [0, 0, 0, 0], isRunning: false, interval: null },
            synchronous: { count: 0, bits: [0, 0, 0, 0], isRunning: false, interval: null },
            bcd: { count: 0, bits: [0, 0, 0, 0], isRunning: false, interval: null },
            ring: { bits: [1, 0, 0, 0], position: 0, isRunning: false, interval: null }
        };
        this.clockSpeed = 1000; // milliseconds
        
        this.init();
    }
    
    /**
     * Initialize counter simulator
     */
    init() {
        this.setupEventListeners();
        this.updateAllDisplays();
    }
    
    /**
     * Setup event listeners for counter controls
     */
    setupEventListeners() {
        // Setup controls for each counter type
        this.setupRippleCounterControls();
        this.setupSynchronousCounterControls();
        this.setupBCDCounterControls();
        this.setupRingCounterControls();
        
        // Clock speed control
        const speedControl = document.getElementById('clock-speed');
        if (speedControl) {
            speedControl.addEventListener('input', (e) => {
                this.clockSpeed = parseInt(e.target.value);
                this.updateClockSpeedDisplay();
            });
        }
    }
    
    /**
     * Setup ripple counter controls
     */
    setupRippleCounterControls() {
        const container = document.getElementById('ripple-counter');
        if (!container) return;
        
        const startBtn = container.querySelector('.start-btn');
        const stepBtn = container.querySelector('.step-btn');
        const resetBtn = container.querySelector('.reset-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.toggleCounter('ripple', startBtn);
            });
        }
        
        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                this.stepCounter('ripple');
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCounter('ripple');
            });
        }
    }
    
    /**
     * Setup synchronous counter controls
     */
    setupSynchronousCounterControls() {
        const container = document.getElementById('synchronous-counter');
        if (!container) return;
        
        const startBtn = container.querySelector('.start-btn');
        const stepBtn = container.querySelector('.step-btn');
        const resetBtn = container.querySelector('.reset-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.toggleCounter('synchronous', startBtn);
            });
        }
        
        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                this.stepCounter('synchronous');
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCounter('synchronous');
            });
        }
    }
    
    /**
     * Setup BCD counter controls
     */
    setupBCDCounterControls() {
        const container = document.getElementById('bcd-counter');
        if (!container) return;
        
        const startBtn = container.querySelector('.start-btn');
        const stepBtn = container.querySelector('.step-btn');
        const resetBtn = container.querySelector('.reset-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.toggleCounter('bcd', startBtn);
            });
        }
        
        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                this.stepCounter('bcd');
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCounter('bcd');
            });
        }
    }
    
    /**
     * Setup ring counter controls
     */
    setupRingCounterControls() {
        const container = document.getElementById('ring-counter');
        if (!container) return;
        
        const startBtn = container.querySelector('.start-btn');
        const stepBtn = container.querySelector('.step-btn');
        const resetBtn = container.querySelector('.reset-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.toggleCounter('ring', startBtn);
            });
        }
        
        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                this.stepCounter('ring');
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCounter('ring');
            });
        }
    }
    
    /**
     * Toggle counter start/stop
     * @param {string} type - Counter type
     * @param {HTMLElement} button - Start button element
     */
    toggleCounter(type, button) {
        const counter = this.counters[type];
        
        if (counter.isRunning) {
            // Stop counter
            this.stopCounter(type);
            button.textContent = 'Start';
            button.classList.remove('running');
        } else {
            // Start counter
            this.startCounter(type);
            button.textContent = 'Stop';
            button.classList.add('running');
        }
    }
    
    /**
     * Start counter
     * @param {string} type - Counter type
     */
    startCounter(type) {
        const counter = this.counters[type];
        
        if (counter.isRunning) return;
        
        counter.isRunning = true;
        counter.interval = setInterval(() => {
            this.stepCounter(type);
        }, this.clockSpeed);
    }
    
    /**
     * Stop counter
     * @param {string} type - Counter type
     */
    stopCounter(type) {
        const counter = this.counters[type];
        
        if (!counter.isRunning) return;
        
        counter.isRunning = false;
        if (counter.interval) {
            clearInterval(counter.interval);
            counter.interval = null;
        }
    }
    
    /**
     * Step counter once
     * @param {string} type - Counter type
     */
    stepCounter(type) {
        switch (type) {
            case 'ripple':
                this.stepRippleCounter();
                break;
            case 'synchronous':
                this.stepSynchronousCounter();
                break;
            case 'bcd':
                this.stepBCDCounter();
                break;
            case 'ring':
                this.stepRingCounter();
                break;
        }
        
        this.updateCounterDisplay(type);
        
        // Track simulation usage
        if (window.storage) {
            window.storage.trackSimulation(`counter-${type}`);
        }
    }
    
    /**
     * Step ripple counter (asynchronous)
     */
    stepRippleCounter() {
        const counter = this.counters.ripple;
        
        // Simulate ripple effect with delays
        this.animateRippleEffect('ripple');
        
        counter.count = (counter.count + 1) % 16;
        this.updateBitsFromCount('ripple', counter.count);
    }
    
    /**
     * Step synchronous counter
     */
    stepSynchronousCounter() {
        const counter = this.counters.synchronous;
        
        // All flip-flops change simultaneously
        this.animateSynchronousEffect('synchronous');
        
        counter.count = (counter.count + 1) % 16;
        this.updateBitsFromCount('synchronous', counter.count);
    }
    
    /**
     * Step BCD counter (0-9)
     */
    stepBCDCounter() {
        const counter = this.counters.bcd;
        
        counter.count = (counter.count + 1) % 10;
        this.updateBitsFromCount('bcd', counter.count);
        
        // Animate decimal display
        this.animateBCDDecimal(counter.count);
    }
    
    /**
     * Step ring counter
     */
    stepRingCounter() {
        const counter = this.counters.ring;
        
        // Shift the '1' bit to the next position
        counter.position = (counter.position + 1) % 4;
        counter.bits = [0, 0, 0, 0];
        counter.bits[counter.position] = 1;
        
        this.animateRingShift(counter.position);
    }
    
    /**
     * Reset counter
     * @param {string} type - Counter type
     */
    resetCounter(type) {
        this.stopCounter(type);
        
        const counter = this.counters[type];
        const container = document.getElementById(`${type}-counter`);
        
        if (type === 'ring') {
            counter.bits = [1, 0, 0, 0];
            counter.position = 0;
        } else {
            counter.count = 0;
            counter.bits = [0, 0, 0, 0];
        }
        
        this.updateCounterDisplay(type);
        
        // Reset button text
        const startBtn = container?.querySelector('.start-btn');
        if (startBtn) {
            startBtn.textContent = 'Start';
            startBtn.classList.remove('running');
        }
    }
    
    /**
     * Update bits from count value
     * @param {string} type - Counter type
     * @param {number} count - Count value
     */
    updateBitsFromCount(type, count) {
        const counter = this.counters[type];
        const binaryString = count.toString(2).padStart(4, '0');
        
        for (let i = 0; i < 4; i++) {
            counter.bits[i] = parseInt(binaryString[3 - i]);
        }
    }
    
    /**
     * Update counter display
     * @param {string} type - Counter type
     */
    updateCounterDisplay(type) {
        const container = document.getElementById(`${type}-counter`);
        if (!container) return;
        
        const counter = this.counters[type];
        const bitCells = container.querySelectorAll('.bit-cell');
        const countDisplay = container.querySelector('.count-display');
        const binaryDisplay = container.querySelector('.binary-display');
        
        // Update bit cells
        bitCells.forEach((cell, index) => {
            const bit = counter.bits[3 - index]; // Reverse order for display
            cell.textContent = bit;
            cell.classList.toggle('active', bit === 1);
        });
        
        // Update count display
        if (countDisplay) {
            if (type === 'ring') {
                countDisplay.textContent = `Position: ${counter.position}`;
            } else {
                const count = type === 'bcd' ? counter.count : counter.count;
                countDisplay.textContent = count.toString();
            }
        }
        
        // Update binary display
        if (binaryDisplay) {
            const binaryString = counter.bits.slice().reverse().join('');
            binaryDisplay.textContent = binaryString;
        }
        
        // Update decimal display for BCD
        if (type === 'bcd') {
            const decimalDisplay = container.querySelector('.decimal-display');
            if (decimalDisplay) {
                decimalDisplay.textContent = counter.count.toString();
            }
        }
    }
    
    /**
     * Animate ripple effect
     * @param {string} type - Counter type
     */
    animateRippleEffect(type) {
        const container = document.getElementById(`${type}-counter`);
        if (!container) return;
        
        const bitCells = container.querySelectorAll('.bit-cell');
        const delays = [0, 100, 200, 300]; // Cumulative delays for ripple effect
        
        bitCells.forEach((cell, index) => {
            setTimeout(() => {
                if (window.animations) {
                    window.animations.pulse(cell, 200, 1);
                }
            }, delays[3 - index]); // Reverse order (LSB first)
        });
    }
    
    /**
     * Animate synchronous effect
     * @param {string} type - Counter type
     */
    animateSynchronousEffect(type) {
        const container = document.getElementById(`${type}-counter`);
        if (!container) return;
        
        const bitCells = container.querySelectorAll('.bit-cell');
        
        // All cells pulse simultaneously
        bitCells.forEach(cell => {
            if (window.animations) {
                window.animations.pulse(cell, 200, 1);
            }
        });
    }
    
    /**
     * Animate BCD decimal display
     * @param {number} value - Decimal value
     */
    animateBCDDecimal(value) {
        const container = document.getElementById('bcd-counter');
        if (!container) return;
        
        const decimalDisplay = container.querySelector('.decimal-display');
        if (decimalDisplay && window.animations) {
            window.animations.pulse(decimalDisplay, 300, 1);
        }
    }
    
    /**
     * Animate ring counter shift
     * @param {number} position - New position
     */
    animateRingShift(position) {
        const container = document.getElementById('ring-counter');
        if (!container) return;
        
        const bitCells = container.querySelectorAll('.bit-cell');
        
        bitCells.forEach((cell, index) => {
            if (index === (3 - position)) { // Reverse order for display
                if (window.animations) {
                    window.animations.scaleIn(cell, 300);
                }
            }
        });
    }
    
    /**
     * Update all displays
     */
    updateAllDisplays() {
        Object.keys(this.counters).forEach(type => {
            this.updateCounterDisplay(type);
        });
        this.updateClockSpeedDisplay();
    }
    
    /**
     * Update clock speed display
     */
    updateClockSpeedDisplay() {
        const display = document.getElementById('clock-speed-display');
        if (display) {
            const frequency = 1000 / this.clockSpeed;
            display.textContent = `${frequency.toFixed(1)} Hz`;
        }
    }
    
    /**
     * Create counter comparison demo
     * @param {HTMLElement} container - Container element
     */
    createCounterComparison(container) {
        container.innerHTML = `
            <div class="counter-comparison">
                <h4>Counter Comparison</h4>
                <div class="comparison-layout">
                    <div class="comparison-item">
                        <h5>Ripple Counter</h5>
                        <div class="counter-bits">
                            <div class="bit-cell" data-delay="0">0</div>
                            <div class="bit-cell" data-delay="100">0</div>
                            <div class="bit-cell" data-delay="200">0</div>
                            <div class="bit-cell" data-delay="300">0</div>
                        </div>
                        <p class="counter-description">Asynchronous - bits change with delay</p>
                    </div>
                    
                    <div class="comparison-item">
                        <h5>Synchronous Counter</h5>
                        <div class="counter-bits">
                            <div class="bit-cell" data-delay="0">0</div>
                            <div class="bit-cell" data-delay="0">0</div>
                            <div class="bit-cell" data-delay="0">0</div>
                            <div class="bit-cell" data-delay="0">0</div>
                        </div>
                        <p class="counter-description">Synchronous - all bits change together</p>
                    </div>
                </div>
                
                <div class="comparison-controls">
                    <button class="comparison-btn" id="compare-step">Step Both</button>
                    <button class="comparison-btn" id="compare-reset">Reset Both</button>
                </div>
                
                <div class="timing-info">
                    <p><strong>Key Difference:</strong> Ripple counters have propagation delays, 
                    while synchronous counters change all flip-flops simultaneously.</p>
                </div>
            </div>
        `;
        
        this.setupCounterComparison(container);
    }
    
    /**
     * Setup counter comparison controls
     * @param {HTMLElement} container - Container element
     */
    setupCounterComparison(container) {
        let rippleCount = 0;
        let syncCount = 0;
        
        const updateComparison = () => {
            const rippleBits = container.querySelectorAll('.comparison-item:first-child .bit-cell');
            const syncBits = container.querySelectorAll('.comparison-item:last-child .bit-cell');
            
            const rippleBinary = rippleCount.toString(2).padStart(4, '0');
            const syncBinary = syncCount.toString(2).padStart(4, '0');
            
            // Update ripple counter with delays
            rippleBits.forEach((cell, index) => {
                const bit = rippleBinary[3 - index];
                const delay = parseInt(cell.dataset.delay);
                
                setTimeout(() => {
                    cell.textContent = bit;
                    cell.classList.toggle('active', bit === '1');
                    if (window.animations) {
                        window.animations.pulse(cell, 200, 1);
                    }
                }, delay);
            });
            
            // Update synchronous counter immediately
            syncBits.forEach((cell, index) => {
                const bit = syncBinary[3 - index];
                cell.textContent = bit;
                cell.classList.toggle('active', bit === '1');
                if (window.animations) {
                    window.animations.pulse(cell, 200, 1);
                }
            });
        };
        
        const stepBtn = container.querySelector('#compare-step');
        const resetBtn = container.querySelector('#compare-reset');
        
        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                rippleCount = (rippleCount + 1) % 16;
                syncCount = (syncCount + 1) % 16;
                updateComparison();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                rippleCount = 0;
                syncCount = 0;
                updateComparison();
            });
        }
        
        updateComparison();
    }
    
    /**
     * Create timing diagram for counters
     * @param {string} type - Counter type
     * @param {HTMLElement} container - Container element
     */
    createTimingDiagram(type, container) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 300;
        canvas.style.cssText = 'width: 100%; height: 300px; border: 1px solid #e2e8f0; border-radius: 0.5rem; background: #f8fafc;';
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.font = '12px Inter, sans-serif';
        
        this.drawCounterTimingDiagram(ctx, type);
        
        container.appendChild(canvas);
    }
    
    /**
     * Draw counter timing diagram
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {string} type - Counter type
     */
    drawCounterTimingDiagram(ctx, type) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const cycles = 8;
        const cycleWidth = width / cycles;
        const signalHeight = 30;
        const signalSpacing = 50;
        
        let y = 20;
        
        // Draw clock signal
        ctx.fillText('CLK', 10, y + 15);
        this.drawClockSignal(ctx, 50, y, width - 60, signalHeight, cycles);
        y += signalSpacing;
        
        // Draw counter bit signals
        for (let bit = 0; bit < 4; bit++) {
            ctx.fillText(`Q${bit}`, 10, y + 15);
            
            if (type === 'ripple') {
                this.drawRippleBitSignal(ctx, 50, y, width - 60, signalHeight, cycles, bit);
            } else {
                this.drawSyncBitSignal(ctx, 50, y, width - 60, signalHeight, cycles, bit);
            }
            
            y += signalSpacing;
        }
    }
    
    /**
     * Draw clock signal on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Start X position
     * @param {number} y - Start Y position
     * @param {number} width - Signal width
     * @param {number} height - Signal height
     * @param {number} cycles - Number of cycles
     */
    drawClockSignal(ctx, x, y, width, height, cycles) {
        const cycleWidth = width / cycles;
        const halfCycle = cycleWidth / 2;
        
        ctx.beginPath();
        ctx.moveTo(x, y + height);
        
        for (let i = 0; i < cycles; i++) {
            const cycleX = x + i * cycleWidth;
            
            // Rising edge
            ctx.lineTo(cycleX + halfCycle, y + height);
            ctx.lineTo(cycleX + halfCycle, y);
            
            // Falling edge
            ctx.lineTo(cycleX + cycleWidth, y);
            ctx.lineTo(cycleX + cycleWidth, y + height);
        }
        
        ctx.stroke();
    }
    
    /**
     * Draw ripple bit signal with delays
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Start X position
     * @param {number} y - Start Y position
     * @param {number} width - Signal width
     * @param {number} height - Signal height
     * @param {number} cycles - Number of cycles
     * @param {number} bitPosition - Bit position (0=LSB)
     */
    drawRippleBitSignal(ctx, x, y, width, height, cycles, bitPosition) {
        const cycleWidth = width / cycles;
        const toggleFreq = Math.pow(2, bitPosition);
        const delay = bitPosition * 0.1 * cycleWidth; // Propagation delay
        
        ctx.beginPath();
        ctx.moveTo(x, y + height);
        
        let currentLevel = false;
        
        for (let i = 0; i < cycles * 2; i++) {
            const toggleX = x + (i / toggleFreq) * cycleWidth + delay;
            
            if (toggleX < x + width) {
                if (i % (2 * toggleFreq) === 0) {
                    // Toggle
                    ctx.lineTo(toggleX, y + (currentLevel ? 0 : height));
                    currentLevel = !currentLevel;
                    ctx.lineTo(toggleX, y + (currentLevel ? 0 : height));
                }
            }
        }
        
        ctx.lineTo(x + width, y + (currentLevel ? 0 : height));
        ctx.stroke();
    }
    
    /**
     * Draw synchronous bit signal
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Start X position
     * @param {number} y - Start Y position
     * @param {number} width - Signal width
     * @param {number} height - Signal height
     * @param {number} cycles - Number of cycles
     * @param {number} bitPosition - Bit position (0=LSB)
     */
    drawSyncBitSignal(ctx, x, y, width, height, cycles, bitPosition) {
        const cycleWidth = width / cycles;
        const toggleFreq = Math.pow(2, bitPosition + 1);
        
        ctx.beginPath();
        ctx.moveTo(x, y + height);
        
        let currentLevel = false;
        
        for (let i = 0; i < cycles; i++) {
            const cycleX = x + i * cycleWidth;
            
            if (i > 0 && i % toggleFreq === 0) {
                // Toggle at clock edge
                ctx.lineTo(cycleX, y + (currentLevel ? 0 : height));
                currentLevel = !currentLevel;
                ctx.lineTo(cycleX, y + (currentLevel ? 0 : height));
            }
            
            // Draw horizontal line for this cycle
            ctx.lineTo(cycleX + cycleWidth, y + (currentLevel ? 0 : height));
        }
        
        ctx.stroke();
    }
    
    /**
     * Stop all counters
     */
    stopAllCounters() {
        Object.keys(this.counters).forEach(type => {
            this.stopCounter(type);
        });
    }
    
    /**
     * Get counter explanation
     * @param {string} type - Counter type
     * @returns {Object} Explanation object
     */
    getCounterExplanation(type) {
        const explanations = {
            ripple: {
                title: 'Ripple Counter (Asynchronous)',
                description: 'Each flip-flop is triggered by the previous stage, creating a ripple effect. Simple but has propagation delays.',
                advantages: ['Simple design', 'Low power consumption', 'Easy to implement'],
                disadvantages: ['Propagation delays', 'Glitches during transitions', 'Speed limitations'],
                applications: ['Frequency division', 'Simple counting applications', 'Low-speed systems']
            },
            synchronous: {
                title: 'Synchronous Counter',
                description: 'All flip-flops are clocked simultaneously, eliminating propagation delays and glitches.',
                advantages: ['No propagation delays', 'Glitch-free operation', 'High-speed operation'],
                disadvantages: ['More complex design', 'Higher power consumption', 'More logic gates required'],
                applications: ['High-speed counting', 'Microprocessors', 'Digital signal processing']
            },
            bcd: {
                title: 'BCD Counter',
                description: 'Counts from 0 to 9 in binary coded decimal format, useful for decimal displays.',
                advantages: ['Easy decimal conversion', 'Direct display interface', 'Decade counting'],
                disadvantages: ['Limited count range', 'Unused states', 'More complex reset logic'],
                applications: ['Digital clocks', 'Calculators', 'Decimal counters', 'Seven-segment displays']
            },
            ring: {
                title: 'Ring Counter',
                description: 'A shift register with feedback, circulating a single 1 bit through the positions.',
                advantages: ['Self-decoding outputs', 'No glitches', 'Simple state detection'],
                disadvantages: ['Inefficient use of flip-flops', 'Limited count sequence', 'Requires initialization'],
                applications: ['Sequence generation', 'State machines', 'Timing control', 'Stepper motor control']
            }
        };
        
        return explanations[type] || null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.counterSimulator = new CounterSimulator();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CounterSimulator;
}

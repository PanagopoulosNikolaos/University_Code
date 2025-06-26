/**
 * Digital Electronics Learning Platform - Flip-Flop Implementations
 * Handles interactive flip-flop simulations and truth tables
 */

class FlipFlopSimulator {
    constructor() {
        this.currentFlipFlop = 'jk';
        this.states = {
            jk: { j: false, k: false, q: false },
            d: { d: false, q: false },
            t: { t: false, q: false }
        };
        this.isAnimating = false;
        
        this.init();
    }
    
    /**
     * Initialize flip-flop simulator
     */
    init() {
        this.setupEventListeners();
        this.updateAllDisplays();
        this.setupTruthTableInteractions();
    }
    
    /**
     * Setup event listeners for flip-flop controls
     */
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.flip-flop-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchFlipFlop(e.target.dataset.tab);
            });
        });
        
        // JK Flip-Flop controls
        this.setupJKControls();
        this.setupDControls();
        this.setupTControls();
    }
    
    /**
     * Setup JK flip-flop controls
     */
    setupJKControls() {
        const jInput = document.getElementById('j-input');
        const kInput = document.getElementById('k-input');
        const currentQ = document.getElementById('current-q');
        const clockBtn = document.getElementById('jk-clock');
        
        if (jInput) {
            jInput.addEventListener('change', (e) => {
                this.states.jk.j = e.target.checked;
                this.updateJKTruthTable();
                this.updateJKCircuit();
            });
        }
        
        if (kInput) {
            kInput.addEventListener('change', (e) => {
                this.states.jk.k = e.target.checked;
                this.updateJKTruthTable();
                this.updateJKCircuit();
            });
        }
        
        if (currentQ) {
            currentQ.addEventListener('change', (e) => {
                this.states.jk.q = e.target.value === '1';
                this.updateJKTruthTable();
            });
        }
        
        if (clockBtn) {
            clockBtn.addEventListener('click', () => {
                this.executeJKClock();
            });
        }
    }
    
    /**
     * Setup D flip-flop controls
     */
    setupDControls() {
        const dInput = document.getElementById('d-input');
        const clockBtn = document.getElementById('d-clock');
        
        if (dInput) {
            dInput.addEventListener('change', (e) => {
                this.states.d.d = e.target.checked;
                this.updateDTruthTable();
                this.updateDCircuit();
            });
        }
        
        if (clockBtn) {
            clockBtn.addEventListener('click', () => {
                this.executeDClock();
            });
        }
    }
    
    /**
     * Setup T flip-flop controls
     */
    setupTControls() {
        const tInput = document.getElementById('t-input');
        const currentQT = document.getElementById('current-q-t');
        const clockBtn = document.getElementById('t-clock');
        
        if (tInput) {
            tInput.addEventListener('change', (e) => {
                this.states.t.t = e.target.checked;
                this.updateTTruthTable();
                this.updateTCircuit();
            });
        }
        
        if (currentQT) {
            currentQT.addEventListener('change', (e) => {
                this.states.t.q = e.target.value === '1';
                this.updateTTruthTable();
            });
        }
        
        if (clockBtn) {
            clockBtn.addEventListener('click', () => {
                this.executeTClock();
            });
        }
    }
    
    /**
     * Setup truth table interactions
     */
    setupTruthTableInteractions() {
        // JK Truth Table
        document.querySelectorAll('#jk-table .table-row').forEach(row => {
            row.addEventListener('click', () => {
                const j = row.dataset.j === '1';
                const k = row.dataset.k === '1';
                this.setJKInputs(j, k);
            });
        });
        
        // D Truth Table
        document.querySelectorAll('#d-table .table-row').forEach(row => {
            row.addEventListener('click', () => {
                const d = row.dataset.d === '1';
                this.setDInputs(d);
            });
        });
        
        // T Truth Table
        document.querySelectorAll('#t-table .table-row').forEach(row => {
            row.addEventListener('click', () => {
                const t = row.dataset.t === '1';
                this.setTInputs(t);
            });
        });
    }
    
    /**
     * Switch between flip-flop types
     * @param {string} type - Flip-flop type (jk, d, t)
     */
    switchFlipFlop(type) {
        if (this.isAnimating) return;
        
        this.currentFlipFlop = type;
        
        // Update tab buttons
        document.querySelectorAll('.flip-flop-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === type);
        });
        
        // Update content sections
        document.querySelectorAll('.flip-flop-content .tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${type}-content`);
        });
        
        // Track usage
        if (window.storage) {
            window.storage.trackSimulation(`flip-flop-${type}`);
        }
        
        // Animate transition
        this.animateTabTransition(type);
    }
    
    /**
     * Animate tab transition
     * @param {string} type - Flip-flop type
     */
    animateTabTransition(type) {
        const activeContent = document.querySelector(`#${type}-content`);
        if (activeContent && window.animations) {
            window.animations.slideInRight(activeContent, 300);
        }
    }
    
    /**
     * Set JK flip-flop inputs
     * @param {boolean} j - J input value
     * @param {boolean} k - K input value
     */
    setJKInputs(j, k) {
        this.states.jk.j = j;
        this.states.jk.k = k;
        
        const jInput = document.getElementById('j-input');
        const kInput = document.getElementById('k-input');
        
        if (jInput) jInput.checked = j;
        if (kInput) kInput.checked = k;
        
        this.updateJKTruthTable();
        this.updateJKCircuit();
    }
    
    /**
     * Set D flip-flop inputs
     * @param {boolean} d - D input value
     */
    setDInputs(d) {
        this.states.d.d = d;
        
        const dInput = document.getElementById('d-input');
        if (dInput) dInput.checked = d;
        
        this.updateDTruthTable();
        this.updateDCircuit();
    }
    
    /**
     * Set T flip-flop inputs
     * @param {boolean} t - T input value
     */
    setTInputs(t) {
        this.states.t.t = t;
        
        const tInput = document.getElementById('t-input');
        if (tInput) tInput.checked = t;
        
        this.updateTTruthTable();
        this.updateTCircuit();
    }
    
    /**
     * Execute JK flip-flop clock pulse
     */
    executeJKClock() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const clockBtn = document.getElementById('jk-clock');
        
        // Animate clock pulse
        if (window.animations && clockBtn) {
            window.animations.clockPulse(clockBtn);
        }
        
        // Calculate next state
        const { j, k, q } = this.states.jk;
        let nextQ;
        
        if (!j && !k) {
            // No change
            nextQ = q;
        } else if (!j && k) {
            // Reset
            nextQ = false;
        } else if (j && !k) {
            // Set
            nextQ = true;
        } else {
            // Toggle
            nextQ = !q;
        }
        
        // Animate state change
        setTimeout(() => {
            this.states.jk.q = nextQ;
            this.updateJKOutput();
            this.updateJKTruthTable();
            this.updateJKCircuit();
            this.isAnimating = false;
            
            // Update current Q selector
            const currentQ = document.getElementById('current-q');
            if (currentQ) {
                currentQ.value = nextQ ? '1' : '0';
            }
        }, 300);
    }
    
    /**
     * Execute D flip-flop clock pulse
     */
    executeDClock() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const clockBtn = document.getElementById('d-clock');
        
        // Animate clock pulse
        if (window.animations && clockBtn) {
            window.animations.clockPulse(clockBtn);
        }
        
        // D flip-flop: Q follows D
        setTimeout(() => {
            this.states.d.q = this.states.d.d;
            this.updateDOutput();
            this.updateDTruthTable();
            this.updateDCircuit();
            this.isAnimating = false;
        }, 300);
    }
    
    /**
     * Execute T flip-flop clock pulse
     */
    executeTClock() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const clockBtn = document.getElementById('t-clock');
        
        // Animate clock pulse
        if (window.animations && clockBtn) {
            window.animations.clockPulse(clockBtn);
        }
        
        // Calculate next state
        const { t, q } = this.states.t;
        const nextQ = t ? !q : q;
        
        // Animate state change
        setTimeout(() => {
            this.states.t.q = nextQ;
            this.updateTOutput();
            this.updateTTruthTable();
            this.updateTCircuit();
            this.isAnimating = false;
            
            // Update current Q selector
            const currentQT = document.getElementById('current-q-t');
            if (currentQT) {
                currentQT.value = nextQ ? '1' : '0';
            }
        }, 300);
    }
    
    /**
     * Update JK flip-flop truth table highlighting
     */
    updateJKTruthTable() {
        const { j, k, q } = this.states.jk;
        const rows = document.querySelectorAll('#jk-table .table-row');
        
        rows.forEach(row => {
            const rowJ = row.dataset.j === '1';
            const rowK = row.dataset.k === '1';
            const isMatch = rowJ === j && rowK === k;
            
            row.classList.toggle('highlighted', isMatch);
            
            // Update current Q display in table
            if (isMatch) {
                const currentQCell = row.querySelector('.current-q');
                const nextQCell = row.querySelector('.next-q');
                
                if (currentQCell) {
                    currentQCell.textContent = q ? '1' : '0';
                }
                
                if (nextQCell) {
                    let nextQ;
                    if (!j && !k) nextQ = q;
                    else if (!j && k) nextQ = false;
                    else if (j && !k) nextQ = true;
                    else nextQ = !q;
                    
                    nextQCell.textContent = nextQ ? '1' : '0';
                }
            }
        });
    }
    
    /**
     * Update D flip-flop truth table highlighting
     */
    updateDTruthTable() {
        const { d } = this.states.d;
        const rows = document.querySelectorAll('#d-table .table-row');
        
        rows.forEach(row => {
            const rowD = row.dataset.d === '1';
            const isMatch = rowD === d;
            
            row.classList.toggle('highlighted', isMatch);
        });
    }
    
    /**
     * Update T flip-flop truth table highlighting
     */
    updateTTruthTable() {
        const { t, q } = this.states.t;
        const rows = document.querySelectorAll('#t-table .table-row');
        
        rows.forEach(row => {
            const rowT = row.dataset.t === '1';
            const isMatch = rowT === t;
            
            row.classList.toggle('highlighted', isMatch);
            
            // Update current Q and next Q display in table
            if (isMatch) {
                const currentQCell = row.querySelector('.current-q');
                const nextQCell = row.querySelector('.next-q');
                
                if (currentQCell) {
                    currentQCell.textContent = q ? '1' : '0';
                }
                
                if (nextQCell) {
                    const nextQ = t ? !q : q;
                    nextQCell.textContent = nextQ ? '1' : '0';
                }
            }
        });
    }
    
    /**
     * Update JK flip-flop output display
     */
    updateJKOutput() {
        const output = document.getElementById('jk-output');
        if (output) {
            output.textContent = this.states.jk.q ? '1' : '0';
            output.style.color = this.states.jk.q ? '#22c55e' : '#ef4444';
        }
    }
    
    /**
     * Update D flip-flop output display
     */
    updateDOutput() {
        const output = document.getElementById('d-output');
        if (output) {
            output.textContent = this.states.d.q ? '1' : '0';
            output.style.color = this.states.d.q ? '#22c55e' : '#ef4444';
        }
    }
    
    /**
     * Update T flip-flop output display
     */
    updateTOutput() {
        const output = document.getElementById('t-output');
        if (output) {
            output.textContent = this.states.t.q ? '1' : '0';
            output.style.color = this.states.t.q ? '#22c55e' : '#ef4444';
        }
    }
    
    /**
     * Update JK flip-flop circuit visualization
     */
    updateJKCircuit() {
        const svg = document.querySelector('#jk-circuit .circuit-svg');
        if (!svg) return;
        
        const { j, k, q } = this.states.jk;
        
        // Update input wires
        this.updateWire(svg, 'j-wire', j);
        this.updateWire(svg, 'k-wire', k);
        
        // Update flip-flop state
        const flipFlopRect = svg.querySelector('rect');
        if (flipFlopRect) {
            flipFlopRect.classList.toggle('active', q);
        }
        
        // Update output wires
        this.updateWire(svg, 'q-wire', q);
        this.updateWire(svg, 'qbar-wire', !q);
    }
    
    /**
     * Update D flip-flop circuit visualization
     */
    updateDCircuit() {
        const svg = document.querySelector('#d-circuit .circuit-svg');
        if (!svg) return;
        
        const { d, q } = this.states.d;
        
        // Update input wire
        this.updateWire(svg, 'd-wire', d);
        
        // Update flip-flop state
        const flipFlopRect = svg.querySelector('rect');
        if (flipFlopRect) {
            flipFlopRect.classList.toggle('active', q);
        }
        
        // Update output wires
        this.updateWire(svg, 'q-wire', q);
        this.updateWire(svg, 'qbar-wire', !q);
    }
    
    /**
     * Update T flip-flop circuit visualization
     */
    updateTCircuit() {
        const svg = document.querySelector('#t-circuit .circuit-svg');
        if (!svg) return;
        
        const { t, q } = this.states.t;
        
        // Update input wire
        this.updateWire(svg, 't-wire', t);
        
        // Update flip-flop state
        const flipFlopRect = svg.querySelector('rect');
        if (flipFlopRect) {
            flipFlopRect.classList.toggle('active', q);
        }
        
        // Update output wires
        this.updateWire(svg, 'q-wire', q);
        this.updateWire(svg, 'qbar-wire', !q);
    }
    
    /**
     * Update wire visualization
     * @param {SVGElement} svg - SVG container
     * @param {string} wireId - Wire identifier
     * @param {boolean} state - Wire state (true = active)
     */
    updateWire(svg, wireId, state) {
        const wire = svg.querySelector(`[data-wire="${wireId}"], line`);
        if (wire) {
            wire.classList.toggle('active', state);
            wire.classList.toggle('inactive', !state);
            
            // Update stroke color
            wire.style.stroke = state ? '#ef4444' : '#94a3b8';
            wire.style.strokeWidth = state ? '3' : '2';
        }
    }
    
    /**
     * Update all displays
     */
    updateAllDisplays() {
        this.updateJKTruthTable();
        this.updateJKOutput();
        this.updateJKCircuit();
        
        this.updateDTruthTable();
        this.updateDOutput();
        this.updateDCircuit();
        
        this.updateTTruthTable();
        this.updateTOutput();
        this.updateTCircuit();
    }
    
    /**
     * Generate random test case
     * @param {string} type - Flip-flop type
     */
    generateRandomTest(type) {
        switch (type) {
            case 'jk':
                this.setJKInputs(Math.random() > 0.5, Math.random() > 0.5);
                break;
            case 'd':
                this.setDInputs(Math.random() > 0.5);
                break;
            case 't':
                this.setTInputs(Math.random() > 0.5);
                break;
        }
    }
    
    /**
     * Reset flip-flop to initial state
     * @param {string} type - Flip-flop type
     */
    reset(type) {
        switch (type) {
            case 'jk':
                this.states.jk = { j: false, k: false, q: false };
                this.setJKInputs(false, false);
                document.getElementById('current-q').value = '0';
                break;
            case 'd':
                this.states.d = { d: false, q: false };
                this.setDInputs(false);
                break;
            case 't':
                this.states.t = { t: false, q: false };
                this.setTInputs(false);
                document.getElementById('current-q-t').value = '0';
                break;
        }
        this.updateAllDisplays();
    }
    
    /**
     * Create timing diagram for current flip-flop
     * @param {number} cycles - Number of clock cycles to simulate
     */
    createTimingDiagram(cycles = 8) {
        const type = this.currentFlipFlop;
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 200;
        canvas.style.cssText = 'width: 100%; height: 200px; border: 1px solid #e2e8f0; border-radius: 0.5rem; background: #f8fafc;';
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.font = '12px Inter, sans-serif';
        
        // Draw timing diagram based on flip-flop type
        this.drawTimingDiagram(ctx, type, cycles);
        
        return canvas;
    }
    
    /**
     * Draw timing diagram on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {string} type - Flip-flop type
     * @param {number} cycles - Number of cycles
     */
    drawTimingDiagram(ctx, type, cycles) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const cycleWidth = width / cycles;
        const signalHeight = 30;
        const signalSpacing = 40;
        
        let y = 20;
        
        // Draw clock signal
        ctx.fillText('CLK', 10, y + 15);
        this.drawClockSignal(ctx, 50, y, width - 60, signalHeight, cycles);
        y += signalSpacing;
        
        // Draw input signals based on type
        switch (type) {
            case 'jk':
                ctx.fillText('J', 10, y + 15);
                this.drawDigitalSignal(ctx, 50, y, width - 60, signalHeight, cycles, 'random');
                y += signalSpacing;
                
                ctx.fillText('K', 10, y + 15);
                this.drawDigitalSignal(ctx, 50, y, width - 60, signalHeight, cycles, 'random');
                y += signalSpacing;
                break;
                
            case 'd':
                ctx.fillText('D', 10, y + 15);
                this.drawDigitalSignal(ctx, 50, y, width - 60, signalHeight, cycles, 'random');
                y += signalSpacing;
                break;
                
            case 't':
                ctx.fillText('T', 10, y + 15);
                this.drawDigitalSignal(ctx, 50, y, width - 60, signalHeight, cycles, 'random');
                y += signalSpacing;
                break;
        }
        
        // Draw output signal
        ctx.fillText('Q', 10, y + 15);
        this.drawDigitalSignal(ctx, 50, y, width - 60, signalHeight, cycles, 'output');
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
     * Draw digital signal on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - Start X position
     * @param {number} y - Start Y position
     * @param {number} width - Signal width
     * @param {number} height - Signal height
     * @param {number} cycles - Number of cycles
     * @param {string} pattern - Signal pattern type
     */
    drawDigitalSignal(ctx, x, y, width, height, cycles, pattern) {
        const cycleWidth = width / cycles;
        let currentLevel = false;
        
        ctx.beginPath();
        ctx.moveTo(x, y + (currentLevel ? 0 : height));
        
        for (let i = 0; i < cycles; i++) {
            const cycleX = x + i * cycleWidth;
            
            // Determine next level based on pattern
            let nextLevel;
            switch (pattern) {
                case 'random':
                    nextLevel = Math.random() > 0.5;
                    break;
                case 'alternating':
                    nextLevel = i % 2 === 0;
                    break;
                case 'output':
                    // Simplified output pattern
                    nextLevel = i % 3 !== 0;
                    break;
                default:
                    nextLevel = currentLevel;
            }
            
            // Draw transition if level changes
            if (nextLevel !== currentLevel) {
                ctx.lineTo(cycleX, y + (currentLevel ? 0 : height));
                ctx.lineTo(cycleX, y + (nextLevel ? 0 : height));
                currentLevel = nextLevel;
            }
            
            // Draw horizontal line for this cycle
            ctx.lineTo(cycleX + cycleWidth, y + (currentLevel ? 0 : height));
        }
        
        ctx.stroke();
    }
    
    /**
     * Get flip-flop explanation
     * @param {string} type - Flip-flop type
     * @returns {Object} Explanation object
     */
    getExplanation(type) {
        const explanations = {
            jk: {
                title: 'JK Flip-Flop',
                description: 'The JK flip-flop is the most versatile flip-flop. It has two inputs (J and K) and exhibits four different behaviors based on the input combination.',
                truthTable: [
                    { inputs: 'J=0, K=0', output: 'Q(t+1) = Q(t)', behavior: 'No change - output remains the same' },
                    { inputs: 'J=0, K=1', output: 'Q(t+1) = 0', behavior: 'Reset - output becomes 0' },
                    { inputs: 'J=1, K=0', output: 'Q(t+1) = 1', behavior: 'Set - output becomes 1' },
                    { inputs: 'J=1, K=1', output: 'Q(t+1) = Q\'(t)', behavior: 'Toggle - output changes state' }
                ],
                applications: ['Counters', 'Frequency dividers', 'State machines', 'Memory circuits']
            },
            d: {
                title: 'D Flip-Flop',
                description: 'The D (Data) flip-flop is the simplest flip-flop. The output Q follows the D input on the clock edge.',
                truthTable: [
                    { inputs: 'D=0', output: 'Q(t+1) = 0', behavior: 'Output becomes 0' },
                    { inputs: 'D=1', output: 'Q(t+1) = 1', behavior: 'Output becomes 1' }
                ],
                applications: ['Data storage', 'Shift registers', 'Delay circuits', 'Synchronization']
            },
            t: {
                title: 'T Flip-Flop',
                description: 'The T (Toggle) flip-flop changes state when T=1 and remains the same when T=0.',
                truthTable: [
                    { inputs: 'T=0', output: 'Q(t+1) = Q(t)', behavior: 'No change - output remains the same' },
                    { inputs: 'T=1', output: 'Q(t+1) = Q\'(t)', behavior: 'Toggle - output changes state' }
                ],
                applications: ['Frequency division', 'Binary counters', 'Clock generation', 'Toggle switches']
            }
        };
        
        return explanations[type] || null;
    }
}

// Initialize flip-flop simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.flipFlopSimulator = new FlipFlopSimulator();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlipFlopSimulator;
}

/**
 * Digital Electronics Learning Platform - Decoder Implementations
 * Handles different types of decoders and their applications
 */

class DecoderSimulator {
    constructor() {
        this.decoders = {
            '2x4': { inputs: [0, 0], outputs: [0, 0, 0, 0], enable: true },
            '3x8': { inputs: [0, 0, 0], outputs: [0, 0, 0, 0, 0, 0, 0, 0], enable: true },
            'bcd7seg': { inputs: [0, 0, 0, 0], segments: [0, 0, 0, 0, 0, 0, 0], enable: true }
        };
        this.currentType = '2x4';
        
        this.init();
    }
    
    /**
     * Initialize decoder simulator
     */
    init() {
        this.setupEventListeners();
        this.updateAllDisplays();
    }
    
    /**
     * Setup event listeners for decoder controls
     */
    setupEventListeners() {
        // Decoder type tabs
        document.querySelectorAll('.decoder-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchDecoderType(e.target.dataset.tab);
            });
        });
        
        this.setup2x4DecoderControls();
        this.setup3x8DecoderControls();
        this.setupBCD7SegDecoderControls();
    }
    
    /**
     * Setup 2×4 decoder controls
     */
    setup2x4DecoderControls() {
        const container = document.getElementById('decoder-2x4');
        if (!container) return;
        
        // Input controls
        const inputA = container.querySelector('#decoder-2x4-a');
        const inputB = container.querySelector('#decoder-2x4-b');
        const enableInput = container.querySelector('#decoder-2x4-enable');
        
        if (inputA) {
            inputA.addEventListener('change', (e) => {
                this.decoders['2x4'].inputs[0] = e.target.checked ? 1 : 0;
                this.update2x4Decoder();
            });
        }
        
        if (inputB) {
            inputB.addEventListener('change', (e) => {
                this.decoders['2x4'].inputs[1] = e.target.checked ? 1 : 0;
                this.update2x4Decoder();
            });
        }
        
        if (enableInput) {
            enableInput.addEventListener('change', (e) => {
                this.decoders['2x4'].enable = e.target.checked;
                this.update2x4Decoder();
            });
        }
        
        // Truth table interactions
        const truthTableRows = container.querySelectorAll('.truth-table tbody tr');
        truthTableRows.forEach(row => {
            row.addEventListener('click', () => {
                const a = parseInt(row.dataset.a);
                const b = parseInt(row.dataset.b);
                
                if (inputA) inputA.checked = a === 1;
                if (inputB) inputB.checked = b === 1;
                
                this.decoders['2x4'].inputs = [a, b];
                this.update2x4Decoder();
            });
        });
    }
    
    /**
     * Setup 3×8 decoder controls
     */
    setup3x8DecoderControls() {
        const container = document.getElementById('decoder-3x8');
        if (!container) return;
        
        // Input controls
        const inputA = container.querySelector('#decoder-3x8-a');
        const inputB = container.querySelector('#decoder-3x8-b');
        const inputC = container.querySelector('#decoder-3x8-c');
        const enableInput = container.querySelector('#decoder-3x8-enable');
        
        if (inputA) {
            inputA.addEventListener('change', (e) => {
                this.decoders['3x8'].inputs[0] = e.target.checked ? 1 : 0;
                this.update3x8Decoder();
            });
        }
        
        if (inputB) {
            inputB.addEventListener('change', (e) => {
                this.decoders['3x8'].inputs[1] = e.target.checked ? 1 : 0;
                this.update3x8Decoder();
            });
        }
        
        if (inputC) {
            inputC.addEventListener('change', (e) => {
                this.decoders['3x8'].inputs[2] = e.target.checked ? 1 : 0;
                this.update3x8Decoder();
            });
        }
        
        if (enableInput) {
            enableInput.addEventListener('change', (e) => {
                this.decoders['3x8'].enable = e.target.checked;
                this.update3x8Decoder();
            });
        }
    }
    
    /**
     * Setup BCD to 7-segment decoder controls
     */
    setupBCD7SegDecoderControls() {
        const container = document.getElementById('decoder-bcd7seg');
        if (!container) return;
        
        // Input controls
        for (let i = 0; i < 4; i++) {
            const input = container.querySelector(`#bcd-input-${i}`);
            if (input) {
                input.addEventListener('change', (e) => {
                    this.decoders.bcd7seg.inputs[i] = e.target.checked ? 1 : 0;
                    this.updateBCD7SegDecoder();
                });
            }
        }
        
        const enableInput = container.querySelector('#bcd7seg-enable');
        if (enableInput) {
            enableInput.addEventListener('change', (e) => {
                this.decoders.bcd7seg.enable = e.target.checked;
                this.updateBCD7SegDecoder();
            });
        }
        
        // Digit buttons for quick input
        for (let digit = 0; digit <= 9; digit++) {
            const btn = container.querySelector(`#digit-${digit}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.setBCDDigit(digit);
                });
            }
        }
    }
    
    /**
     * Switch between decoder types
     * @param {string} type - Decoder type
     */
    switchDecoderType(type) {
        this.currentType = type;
        
        // Update tab buttons
        document.querySelectorAll('.decoder-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === type);
        });
        
        // Update content sections
        document.querySelectorAll('.decoder-content .tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `decoder-${type}`);
        });
        
        // Track usage
        if (window.storage) {
            window.storage.trackSimulation(`decoder-${type}`);
        }
        
        // Animate transition
        this.animateTabTransition(type);
    }
    
    /**
     * Animate tab transition
     * @param {string} type - Decoder type
     */
    animateTabTransition(type) {
        const activeContent = document.querySelector(`#decoder-${type}`);
        if (activeContent && window.animations) {
            window.animations.slideInRight(activeContent, 300);
        }
    }
    
    /**
     * Update 2×4 decoder
     */
    update2x4Decoder() {
        const decoder = this.decoders['2x4'];
        const container = document.getElementById('decoder-2x4');
        if (!container) return;
        
        // Calculate output address
        const address = decoder.inputs[1] * 2 + decoder.inputs[0]; // B*2 + A
        
        // Reset all outputs
        decoder.outputs = [0, 0, 0, 0];
        
        // Set active output if enabled
        if (decoder.enable) {
            decoder.outputs[address] = 1;
        }
        
        // Update output LEDs
        const outputLEDs = container.querySelectorAll('.output-led');
        outputLEDs.forEach((led, index) => {
            led.classList.toggle('active', decoder.outputs[index] === 1);
            if (decoder.outputs[index] === 1 && window.animations) {
                window.animations.pulse(led, 300, 1);
            }
        });
        
        // Update truth table highlighting
        this.updateTruthTableHighlight('2x4', decoder.inputs, decoder.enable);
        
        // Update circuit visualization
        this.update2x4Circuit(decoder);
        
        // Update binary display
        const binaryDisplay = container.querySelector('.binary-display');
        if (binaryDisplay) {
            const binaryString = decoder.inputs.slice().reverse().join('');
            const decimal = parseInt(binaryString, 2);
            binaryDisplay.textContent = `Binary: ${binaryString} (${decimal})`;
        }
    }
    
    /**
     * Update 3×8 decoder
     */
    update3x8Decoder() {
        const decoder = this.decoders['3x8'];
        const container = document.getElementById('decoder-3x8');
        if (!container) return;
        
        // Calculate output address
        const address = decoder.inputs[2] * 4 + decoder.inputs[1] * 2 + decoder.inputs[0]; // C*4 + B*2 + A
        
        // Reset all outputs
        decoder.outputs = [0, 0, 0, 0, 0, 0, 0, 0];
        
        // Set active output if enabled
        if (decoder.enable) {
            decoder.outputs[address] = 1;
        }
        
        // Update output LEDs
        const outputLEDs = container.querySelectorAll('.output-led');
        outputLEDs.forEach((led, index) => {
            led.classList.toggle('active', decoder.outputs[index] === 1);
            if (decoder.outputs[index] === 1 && window.animations) {
                window.animations.pulse(led, 300, 1);
            }
        });
        
        // Update binary display
        const binaryDisplay = container.querySelector('.binary-display');
        if (binaryDisplay) {
            const binaryString = decoder.inputs.slice().reverse().join('');
            const decimal = parseInt(binaryString, 2);
            binaryDisplay.textContent = `Binary: ${binaryString} (${decimal})`;
        }
    }
    
    /**
     * Update BCD to 7-segment decoder
     */
    updateBCD7SegDecoder() {
        const decoder = this.decoders.bcd7seg;
        const container = document.getElementById('decoder-bcd7seg');
        if (!container) return;
        
        // Calculate BCD value
        const bcdValue = decoder.inputs[3] * 8 + decoder.inputs[2] * 4 + 
                        decoder.inputs[1] * 2 + decoder.inputs[0];
        
        // Get 7-segment pattern for the digit
        const segmentPatterns = {
            0: [1, 1, 1, 1, 1, 1, 0], // a,b,c,d,e,f,g
            1: [0, 1, 1, 0, 0, 0, 0],
            2: [1, 1, 0, 1, 1, 0, 1],
            3: [1, 1, 1, 1, 0, 0, 1],
            4: [0, 1, 1, 0, 0, 1, 1],
            5: [1, 0, 1, 1, 0, 1, 1],
            6: [1, 0, 1, 1, 1, 1, 1],
            7: [1, 1, 1, 0, 0, 0, 0],
            8: [1, 1, 1, 1, 1, 1, 1],
            9: [1, 1, 1, 1, 0, 1, 1]
        };
        
        // Set segment pattern
        if (decoder.enable && bcdValue >= 0 && bcdValue <= 9) {
            decoder.segments = segmentPatterns[bcdValue];
        } else {
            decoder.segments = [0, 0, 0, 0, 0, 0, 0]; // All off
        }
        
        // Update 7-segment display
        const segments = container.querySelectorAll('.segment');
        segments.forEach((segment, index) => {
            segment.classList.toggle('active', decoder.segments[index] === 1);
        });
        
        // Update digit display
        const digitDisplay = container.querySelector('.digit-display');
        if (digitDisplay) {
            if (decoder.enable && bcdValue >= 0 && bcdValue <= 9) {
                digitDisplay.textContent = bcdValue.toString();
            } else {
                digitDisplay.textContent = '-';
            }
        }
        
        // Update input checkboxes to match current value
        for (let i = 0; i < 4; i++) {
            const input = container.querySelector(`#bcd-input-${i}`);
            if (input) {
                input.checked = decoder.inputs[i] === 1;
            }
        }
        
        // Update binary display
        const binaryDisplay = container.querySelector('.binary-display');
        if (binaryDisplay) {
            const binaryString = decoder.inputs.slice().reverse().join('');
            binaryDisplay.textContent = `BCD: ${binaryString} → ${bcdValue >= 0 && bcdValue <= 9 ? bcdValue : 'Invalid'}`;
        }
    }
    
    /**
     * Set BCD digit directly
     * @param {number} digit - Digit (0-9)
     */
    setBCDDigit(digit) {
        if (digit < 0 || digit > 9) return;
        
        const decoder = this.decoders.bcd7seg;
        const binaryString = digit.toString(2).padStart(4, '0');
        
        // Set inputs from binary representation
        for (let i = 0; i < 4; i++) {
            decoder.inputs[i] = parseInt(binaryString[3 - i]);
        }
        
        this.updateBCD7SegDecoder();
        
        // Animate the digit button
        const container = document.getElementById('decoder-bcd7seg');
        const btn = container?.querySelector(`#digit-${digit}`);
        if (btn && window.animations) {
            window.animations.pulse(btn, 300, 1);
        }
    }
    
    /**
     * Update truth table highlighting
     * @param {string} type - Decoder type
     * @param {Array} inputs - Input values
     * @param {boolean} enable - Enable state
     */
    updateTruthTableHighlight(type, inputs, enable) {
        const container = document.getElementById(`decoder-${type}`);
        if (!container) return;
        
        const rows = container.querySelectorAll('.truth-table tbody tr');
        
        rows.forEach(row => {
            let isMatch = true;
            
            // Check if row matches current inputs
            if (type === '2x4') {
                const rowA = parseInt(row.dataset.a);
                const rowB = parseInt(row.dataset.b);
                isMatch = rowA === inputs[0] && rowB === inputs[1];
            }
            
            row.classList.toggle('highlighted', isMatch && enable);
        });
    }
    
    /**
     * Update 2×4 decoder circuit visualization
     * @param {Object} decoder - Decoder state
     */
    update2x4Circuit(decoder) {
        const container = document.getElementById('decoder-2x4');
        if (!container) return;
        
        const svg = container.querySelector('.circuit-svg');
        if (!svg) return;
        
        // Update input wires
        const wireA = svg.querySelector('[data-wire="input-a"]');
        const wireB = svg.querySelector('[data-wire="input-b"]');
        const enableWire = svg.querySelector('[data-wire="enable"]');
        
        if (wireA) {
            wireA.style.stroke = decoder.inputs[0] ? '#ef4444' : '#94a3b8';
            wireA.style.strokeWidth = decoder.inputs[0] ? '3' : '2';
        }
        
        if (wireB) {
            wireB.style.stroke = decoder.inputs[1] ? '#ef4444' : '#94a3b8';
            wireB.style.strokeWidth = decoder.inputs[1] ? '3' : '2';
        }
        
        if (enableWire) {
            enableWire.style.stroke = decoder.enable ? '#22c55e' : '#94a3b8';
            enableWire.style.strokeWidth = decoder.enable ? '3' : '2';
        }
        
        // Update output wires
        for (let i = 0; i < 4; i++) {
            const outputWire = svg.querySelector(`[data-wire="output-${i}"]`);
            if (outputWire) {
                outputWire.style.stroke = decoder.outputs[i] ? '#ef4444' : '#94a3b8';
                outputWire.style.strokeWidth = decoder.outputs[i] ? '3' : '2';
            }
        }
    }
    
    /**
     * Update all displays
     */
    updateAllDisplays() {
        this.update2x4Decoder();
        this.update3x8Decoder();
        this.updateBCD7SegDecoder();
    }
    
    /**
     * Create decoder application demo
     * @param {HTMLElement} container - Container element
     */
    createDecoderApplication(container) {
        container.innerHTML = `
            <div class="decoder-application">
                <h4>Decoder Applications</h4>
                
                <div class="application-demo">
                    <h5>Memory Address Decoding</h5>
                    <div class="memory-demo">
                        <div class="address-inputs">
                            <h6>Address Bus (2-bit)</h6>
                            <div class="input-group">
                                <label><input type="checkbox" id="addr-0"> A0</label>
                                <label><input type="checkbox" id="addr-1"> A1</label>
                            </div>
                        </div>
                        
                        <div class="memory-banks">
                            <h6>Memory Banks</h6>
                            <div class="bank-grid">
                                <div class="memory-bank" data-address="0">
                                    <span class="bank-label">Bank 0</span>
                                    <span class="bank-address">00</span>
                                </div>
                                <div class="memory-bank" data-address="1">
                                    <span class="bank-label">Bank 1</span>
                                    <span class="bank-address">01</span>
                                </div>
                                <div class="memory-bank" data-address="2">
                                    <span class="bank-label">Bank 2</span>
                                    <span class="bank-address">10</span>
                                </div>
                                <div class="memory-bank" data-address="3">
                                    <span class="bank-label">Bank 3</span>
                                    <span class="bank-address">11</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="demo-explanation">
                        <p><strong>How it works:</strong> The 2-bit address bus is decoded to select one of four memory banks. 
                        Only the selected bank is enabled for read/write operations.</p>
                    </div>
                </div>
                
                <div class="application-demo">
                    <h5>Digital Display Control</h5>
                    <div class="display-demo">
                        <div class="digit-selector">
                            <h6>Select Digit</h6>
                            <div class="digit-buttons">
                                <button class="digit-btn" data-digit="0">0</button>
                                <button class="digit-btn" data-digit="1">1</button>
                                <button class="digit-btn" data-digit="2">2</button>
                                <button class="digit-btn" data-digit="3">3</button>
                                <button class="digit-btn" data-digit="4">4</button>
                                <button class="digit-btn" data-digit="5">5</button>
                                <button class="digit-btn" data-digit="6">6</button>
                                <button class="digit-btn" data-digit="7">7</button>
                                <button class="digit-btn" data-digit="8">8</button>
                                <button class="digit-btn" data-digit="9">9</button>
                            </div>
                        </div>
                        
                        <div class="seven-segment-display">
                            <div class="segment segment-a"></div>
                            <div class="segment segment-b"></div>
                            <div class="segment segment-c"></div>
                            <div class="segment segment-d"></div>
                            <div class="segment segment-e"></div>
                            <div class="segment segment-f"></div>
                            <div class="segment segment-g"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupDecoderApplication(container);
    }
    
    /**
     * Setup decoder application controls
     * @param {HTMLElement} container - Container element
     */
    setupDecoderApplication(container) {
        // Memory address decoding demo
        const addr0 = container.querySelector('#addr-0');
        const addr1 = container.querySelector('#addr-1');
        
        const updateMemoryDemo = () => {
            const address = (addr1?.checked ? 2 : 0) + (addr0?.checked ? 1 : 0);
            const banks = container.querySelectorAll('.memory-bank');
            
            banks.forEach((bank, index) => {
                bank.classList.toggle('selected', index === address);
            });
        };
        
        if (addr0) addr0.addEventListener('change', updateMemoryDemo);
        if (addr1) addr1.addEventListener('change', updateMemoryDemo);
        
        // Digital display demo
        const digitBtns = container.querySelectorAll('.digit-btn');
        const segments = container.querySelectorAll('.seven-segment-display .segment');
        
        const segmentPatterns = {
            0: [1, 1, 1, 1, 1, 1, 0],
            1: [0, 1, 1, 0, 0, 0, 0],
            2: [1, 1, 0, 1, 1, 0, 1],
            3: [1, 1, 1, 1, 0, 0, 1],
            4: [0, 1, 1, 0, 0, 1, 1],
            5: [1, 0, 1, 1, 0, 1, 1],
            6: [1, 0, 1, 1, 1, 1, 1],
            7: [1, 1, 1, 0, 0, 0, 0],
            8: [1, 1, 1, 1, 1, 1, 1],
            9: [1, 1, 1, 1, 0, 1, 1]
        };
        
        digitBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const digit = parseInt(btn.dataset.digit);
                const pattern = segmentPatterns[digit];
                
                segments.forEach((segment, index) => {
                    segment.classList.toggle('active', pattern[index] === 1);
                });
                
                // Highlight active button
                digitBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Initialize displays
        updateMemoryDemo();
        if (digitBtns[0]) digitBtns[0].click(); // Show digit 0 by default
    }
    
    /**
     * Get decoder explanation
     * @param {string} type - Decoder type
     * @returns {Object} Explanation object
     */
    getDecoderExplanation(type) {
        const explanations = {
            '2x4': {
                title: '2×4 Decoder',
                description: 'Converts 2-bit binary input to one-hot 4-bit output. Only one output is active at a time.',
                truthTable: 'For inputs AB: 00→Y0, 01→Y1, 10→Y2, 11→Y3',
                applications: ['Memory addressing', 'Device selection', 'Demultiplexing', 'Address decoding']
            },
            '3x8': {
                title: '3×8 Decoder',
                description: 'Converts 3-bit binary input to one-hot 8-bit output. Commonly used in microprocessor systems.',
                truthTable: 'For inputs ABC: 000→Y0, 001→Y1, ..., 111→Y7',
                applications: ['Memory bank selection', 'I/O device addressing', '8-way demultiplexing', 'Instruction decoding']
            },
            'bcd7seg': {
                title: 'BCD to 7-Segment Decoder',
                description: 'Converts 4-bit BCD input (0-9) to 7-segment display pattern for decimal digit display.',
                truthTable: 'BCD 0000→digit 0, 0001→digit 1, ..., 1001→digit 9',
                applications: ['Digital clocks', 'Calculators', 'Digital meters', 'Numeric displays']
            }
        };
        
        return explanations[type] || null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.decoderSimulator = new DecoderSimulator();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DecoderSimulator;
}

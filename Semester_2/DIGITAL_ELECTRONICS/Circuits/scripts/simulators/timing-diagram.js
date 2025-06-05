/**
 * Digital Electronics Learning Platform - Timing Diagram Generator
 * Creates interactive timing diagrams for digital circuits
 */

class TimingDiagramGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.signals = [];
        this.timeScale = 50; // pixels per time unit
        this.signalHeight = 40;
        this.signalSpacing = 60;
        this.marginLeft = 100;
        this.marginTop = 30;
        this.timeUnits = 16;
        this.isAnimating = false;
        this.currentTime = 0;
        
        this.init();
    }
    
    /**
     * Initialize timing diagram generator
     */
    init() {
        this.setupCanvas();
        this.setupEventListeners();
    }
    
    /**
     * Setup canvas for timing diagrams
     */
    setupCanvas() {
        // Create canvas if it doesn't exist
        let canvas = document.getElementById('timing-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'timing-canvas';
            canvas.style.cssText = `
                width: 100%;
                height: 400px;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                background: #f8fafc;
                cursor: crosshair;
            `;
        }
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Set canvas size
        this.updateCanvasSize();
        
        // Setup canvas styles
        this.ctx.font = '12px Inter, sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
    }
    
    /**
     * Update canvas size based on content
     */
    updateCanvasSize() {
        const width = this.marginLeft + this.timeUnits * this.timeScale + 50;
        const height = this.marginTop + this.signals.length * this.signalSpacing + 50;
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.height = `${height}px`;
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Canvas click for interactivity
        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => {
                this.handleCanvasClick(e);
            });
            
            this.canvas.addEventListener('mousemove', (e) => {
                this.handleCanvasMouseMove(e);
            });
        }
        
        // Control buttons
        const playBtn = document.getElementById('timing-play');
        const pauseBtn = document.getElementById('timing-pause');
        const resetBtn = document.getElementById('timing-reset');
        const speedSlider = document.getElementById('timing-speed');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => this.startAnimation());
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pauseAnimation());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAnimation());
        }
        
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.animationSpeed = parseInt(e.target.value);
            });
        }
    }
    
    /**
     * Add signal to timing diagram
     * @param {string} name - Signal name
     * @param {Array} values - Array of signal values over time
     * @param {string} color - Signal color
     */
    addSignal(name, values, color = '#1e293b') {
        this.signals.push({
            name: name,
            values: values,
            color: color,
            type: 'digital' // digital, clock, bus
        });
        
        this.updateCanvasSize();
        this.redraw();
    }
    
    /**
     * Add clock signal
     * @param {string} name - Clock signal name
     * @param {number} period - Clock period in time units
     * @param {string} color - Signal color
     */
    addClockSignal(name, period = 2, color = '#ef4444') {
        const values = [];
        for (let i = 0; i < this.timeUnits; i++) {
            values.push(Math.floor(i / (period / 2)) % 2);
        }
        
        this.signals.push({
            name: name,
            values: values,
            color: color,
            type: 'clock'
        });
        
        this.updateCanvasSize();
        this.redraw();
    }
    
    /**
     * Add bus signal
     * @param {string} name - Bus signal name
     * @param {Array} values - Array of bus values
     * @param {string} color - Signal color
     */
    addBusSignal(name, values, color = '#059669') {
        this.signals.push({
            name: name,
            values: values,
            color: color,
            type: 'bus'
        });
        
        this.updateCanvasSize();
        this.redraw();
    }
    
    /**
     * Clear all signals
     */
    clearSignals() {
        this.signals = [];
        this.currentTime = 0;
        this.updateCanvasSize();
        this.redraw();
    }
    
    /**
     * Redraw the entire timing diagram
     */
    redraw() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Draw time scale
        this.drawTimeScale();
        
        // Draw signals
        this.signals.forEach((signal, index) => {
            this.drawSignal(signal, index);
        });
        
        // Draw current time indicator
        if (this.isAnimating) {
            this.drawTimeIndicator();
        }
    }
    
    /**
     * Draw grid background
     */
    drawGrid() {
        this.ctx.strokeStyle = '#e2e8f0';
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines (time)
        for (let i = 0; i <= this.timeUnits; i++) {
            const x = this.marginLeft + i * this.timeScale;
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.marginTop);
            this.ctx.lineTo(x, this.canvas.height - 20);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines (signals)
        for (let i = 0; i <= this.signals.length; i++) {
            const y = this.marginTop + i * this.signalSpacing;
            this.ctx.beginPath();
            this.ctx.moveTo(this.marginLeft, y);
            this.ctx.lineTo(this.canvas.width - 20, y);
            this.ctx.stroke();
        }
    }
    
    /**
     * Draw time scale
     */
    drawTimeScale() {
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '12px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        
        for (let i = 0; i <= this.timeUnits; i++) {
            const x = this.marginLeft + i * this.timeScale;
            const y = this.marginTop - 10;
            this.ctx.fillText(i.toString(), x, y);
        }
        
        // Time unit label
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Time (units)', this.marginLeft, 15);
    }
    
    /**
     * Draw individual signal
     * @param {Object} signal - Signal object
     * @param {number} index - Signal index
     */
    drawSignal(signal, index) {
        const y = this.marginTop + index * this.signalSpacing;
        
        // Draw signal name
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = '14px Inter, sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(signal.name, this.marginLeft - 10, y + this.signalHeight / 2);
        
        // Draw signal waveform
        this.ctx.strokeStyle = signal.color;
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = signal.color;
        
        if (signal.type === 'bus') {
            this.drawBusWaveform(signal, y);
        } else {
            this.drawDigitalWaveform(signal, y);
        }
    }
    
    /**
     * Draw digital signal waveform
     * @param {Object} signal - Signal object
     * @param {number} y - Y position
     */
    drawDigitalWaveform(signal, y) {
        this.ctx.beginPath();
        
        let lastValue = signal.values[0] || 0;
        let startX = this.marginLeft;
        
        // Start at the first value level
        this.ctx.moveTo(startX, y + this.signalHeight - lastValue * this.signalHeight);
        
        for (let i = 0; i < signal.values.length; i++) {
            const value = signal.values[i];
            const x = this.marginLeft + i * this.timeScale;
            const nextX = this.marginLeft + (i + 1) * this.timeScale;
            
            // If value changed, draw transition
            if (value !== lastValue) {
                // Horizontal line to transition point
                this.ctx.lineTo(x, y + this.signalHeight - lastValue * this.signalHeight);
                // Vertical transition
                this.ctx.lineTo(x, y + this.signalHeight - value * this.signalHeight);
            }
            
            // Horizontal line for current value
            this.ctx.lineTo(nextX, y + this.signalHeight - value * this.signalHeight);
            
            lastValue = value;
        }
        
        this.ctx.stroke();
        
        // Add value labels for certain signals
        if (signal.type === 'clock') {
            this.addClockEdgeMarkers(signal, y);
        }
    }
    
    /**
     * Draw bus signal waveform
     * @param {Object} signal - Signal object
     * @param {number} y - Y position
     */
    drawBusWaveform(signal, y) {
        this.ctx.textAlign = 'center';
        this.ctx.font = '12px Inter, sans-serif';
        
        for (let i = 0; i < signal.values.length; i++) {
            const x = this.marginLeft + i * this.timeScale;
            const nextX = this.marginLeft + (i + 1) * this.timeScale;
            const value = signal.values[i];
            
            // Draw bus shape
            this.ctx.beginPath();
            this.ctx.moveTo(x + 5, y);
            this.ctx.lineTo(nextX - 5, y);
            this.ctx.lineTo(nextX, y + 10);
            this.ctx.lineTo(nextX, y + this.signalHeight - 10);
            this.ctx.lineTo(nextX - 5, y + this.signalHeight);
            this.ctx.lineTo(x + 5, y + this.signalHeight);
            this.ctx.lineTo(x, y + this.signalHeight - 10);
            this.ctx.lineTo(x, y + 10);
            this.ctx.closePath();
            
            // Fill with light color
            this.ctx.fillStyle = signal.color + '20';
            this.ctx.fill();
            this.ctx.stroke();
            
            // Add value text
            this.ctx.fillStyle = signal.color;
            this.ctx.fillText(value.toString(), x + this.timeScale / 2, y + this.signalHeight / 2);
        }
    }
    
    /**
     * Add clock edge markers
     * @param {Object} signal - Clock signal object
     * @param {number} y - Y position
     */
    addClockEdgeMarkers(signal, y) {
        this.ctx.fillStyle = signal.color;
        
        for (let i = 1; i < signal.values.length; i++) {
            const prevValue = signal.values[i - 1];
            const currentValue = signal.values[i];
            const x = this.marginLeft + i * this.timeScale;
            
            // Mark rising edges
            if (prevValue === 0 && currentValue === 1) {
                this.ctx.beginPath();
                this.ctx.arc(x, y + this.signalHeight, 3, 0, 2 * Math.PI);
                this.ctx.fill();
            }
            
            // Mark falling edges
            if (prevValue === 1 && currentValue === 0) {
                this.ctx.beginPath();
                this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }
    
    /**
     * Draw current time indicator
     */
    drawTimeIndicator() {
        const x = this.marginLeft + this.currentTime * this.timeScale;
        
        this.ctx.strokeStyle = '#dc2626';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, this.marginTop);
        this.ctx.lineTo(x, this.canvas.height - 20);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
    }
    
    /**
     * Handle canvas click
     * @param {MouseEvent} e - Mouse event
     */
    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convert to time units
        const timeUnit = Math.floor((x - this.marginLeft) / this.timeScale);
        const signalIndex = Math.floor((y - this.marginTop) / this.signalSpacing);
        
        if (timeUnit >= 0 && timeUnit < this.timeUnits && 
            signalIndex >= 0 && signalIndex < this.signals.length) {
            
            // Toggle signal value at this time
            const signal = this.signals[signalIndex];
            if (signal.type === 'digital') {
                signal.values[timeUnit] = signal.values[timeUnit] ? 0 : 1;
                this.redraw();
                
                // Emit change event
                this.emitSignalChange(signal.name, timeUnit, signal.values[timeUnit]);
            }
        }
    }
    
    /**
     * Handle canvas mouse move
     * @param {MouseEvent} e - Mouse event
     */
    handleCanvasMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        // Show time cursor
        this.canvas.style.cursor = x > this.marginLeft ? 'crosshair' : 'default';
    }
    
    /**
     * Start animation
     */
    startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.animateTime();
    }
    
    /**
     * Pause animation
     */
    pauseAnimation() {
        this.isAnimating = false;
    }
    
    /**
     * Reset animation
     */
    resetAnimation() {
        this.isAnimating = false;
        this.currentTime = 0;
        this.redraw();
    }
    
    /**
     * Animate time progression
     */
    animateTime() {
        if (!this.isAnimating) return;
        
        this.currentTime += 0.1;
        
        if (this.currentTime >= this.timeUnits) {
            this.currentTime = 0;
        }
        
        this.redraw();
        
        // Continue animation
        setTimeout(() => this.animateTime(), 100);
    }
    
    /**
     * Emit signal change event
     * @param {string} signalName - Signal name
     * @param {number} time - Time unit
     * @param {number} value - New value
     */
    emitSignalChange(signalName, time, value) {
        const event = new CustomEvent('signalChange', {
            detail: { signalName, time, value }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Create timing diagram for flip-flop
     * @param {string} type - Flip-flop type (jk, d, t)
     * @param {HTMLElement} container - Container element
     */
    createFlipFlopTimingDiagram(type, container) {
        this.clearSignals();
        
        // Add clock signal
        this.addClockSignal('CLK', 2, '#ef4444');
        
        switch (type) {
            case 'jk':
                this.addSignal('J', [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0], '#2563eb');
                this.addSignal('K', [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1], '#7c3aed');
                this.addSignal('Q', [0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1], '#059669');
                break;
                
            case 'd':
                this.addSignal('D', [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0], '#2563eb');
                this.addSignal('Q', [0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], '#059669');
                break;
                
            case 't':
                this.addSignal('T', [1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1], '#2563eb');
                this.addSignal('Q', [0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1], '#059669');
                break;
        }
        
        container.appendChild(this.canvas);
        this.redraw();
    }
    
    /**
     * Create timing diagram for counter
     * @param {string} type - Counter type (ripple, synchronous)
     * @param {HTMLElement} container - Container element
     */
    createCounterTimingDiagram(type, container) {
        this.clearSignals();
        
        // Add clock signal
        this.addClockSignal('CLK', 2, '#ef4444');
        
        // Generate counter bit patterns
        const q0 = [], q1 = [], q2 = [], q3 = [];
        
        for (let i = 0; i < this.timeUnits; i++) {
            const count = Math.floor(i / 2); // Assuming clock triggers every 2 time units
            const bits = count.toString(2).padStart(4, '0');
            
            q0.push(parseInt(bits[3])); // LSB
            q1.push(parseInt(bits[2]));
            q2.push(parseInt(bits[1]));
            q3.push(parseInt(bits[0])); // MSB
        }
        
        if (type === 'ripple') {
            // Add propagation delays for ripple counter
            this.addSignal('Q0', q0, '#2563eb');
            this.addSignal('Q1', this.addDelay(q1, 1), '#7c3aed');
            this.addSignal('Q2', this.addDelay(q2, 2), '#059669');
            this.addSignal('Q3', this.addDelay(q3, 3), '#dc2626');
        } else {
            // Synchronous counter - no delays
            this.addSignal('Q0', q0, '#2563eb');
            this.addSignal('Q1', q1, '#7c3aed');
            this.addSignal('Q2', q2, '#059669');
            this.addSignal('Q3', q3, '#dc2626');
        }
        
        container.appendChild(this.canvas);
        this.redraw();
    }
    
    /**
     * Add delay to signal values
     * @param {Array} values - Original values
     * @param {number} delay - Delay in time units
     * @returns {Array} Delayed values
     */
    addDelay(values, delay) {
        const delayed = new Array(delay).fill(0);
        return delayed.concat(values.slice(0, -delay));
    }
    
    /**
     * Export timing diagram as image
     * @returns {string} Base64 encoded image data
     */
    exportAsImage() {
        return this.canvas.toDataURL('image/png');
    }
    
    /**
     * Get timing diagram container
     * @returns {HTMLElement} Container element
     */
    getContainer() {
        return this.canvas;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.timingDiagramGenerator = new TimingDiagramGenerator();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimingDiagramGenerator;
}

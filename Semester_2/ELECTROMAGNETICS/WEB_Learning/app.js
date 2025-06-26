// Main application JavaScript

// Constants
const CONSTANTS = {
    EPSILON_0: 8.854e-12, // F/m
    MU_0: 4 * Math.PI * 1e-7, // H/m
    C: 299792458, // m/s
    H: 6.626e-34, // Js
    E: 1.602e-19, // C
    PI: Math.PI
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCalculators();
    initializeVisualizations();
    initializeQuiz();
    
    // Set MathJax to re-render when content changes
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
});

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const topicCards = document.querySelectorAll('.topic-card');

    // Navigation click handlers
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Topic card click handlers
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Add active class to corresponding nav item
        const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavItem && activeNavItem.classList.contains('nav-item')) {
            activeNavItem.classList.add('active');
        }

        // Re-render MathJax for new content
        if (window.MathJax) {
            MathJax.typesetPromise();
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function initializeCalculators() {
    // Capacitor type selector
    const capacitorTypeSelect = document.getElementById('capacitorType');
    if (capacitorTypeSelect) {
        capacitorTypeSelect.addEventListener('change', function() {
            showCapacitorInputs(this.value);
        });
    }

    // Initialize sliders
    initializeSliders();
}

function initializeSliders() {
    // Charge slider for electric field visualization
    const chargeSlider = document.getElementById('chargeSlider');
    const chargeValue = document.getElementById('chargeValue');
    if (chargeSlider && chargeValue) {
        chargeSlider.addEventListener('input', function() {
            chargeValue.textContent = this.value;
            drawElectricField();
        });
    }

    // Current slider for magnetic field visualization
    const currentSlider = document.getElementById('currentSlider');
    const currentValue = document.getElementById('currentValue');
    if (currentSlider && currentValue) {
        currentSlider.addEventListener('input', function() {
            currentValue.textContent = this.value;
            drawMagneticField();
        });
    }

    // Frequency slider for wave animation
    const frequencySlider = document.getElementById('frequencySlider');
    const frequencyValue = document.getElementById('frequencyValue');
    if (frequencySlider && frequencyValue) {
        frequencySlider.addEventListener('input', function() {
            frequencyValue.textContent = this.value;
            updateWaveFrequency(parseFloat(this.value));
        });
    }
}

// Vector Operations Calculator
function calculateVectorOps() {
    const ax = parseFloat(document.getElementById('ax').value) || 0;
    const ay = parseFloat(document.getElementById('ay').value) || 0;
    const az = parseFloat(document.getElementById('az').value) || 0;
    const bx = parseFloat(document.getElementById('bx').value) || 0;
    const by = parseFloat(document.getElementById('by').value) || 0;
    const bz = parseFloat(document.getElementById('bz').value) || 0;

    // Vector addition
    const addX = ax + bx;
    const addY = ay + by;
    const addZ = az + bz;

    // Dot product
    const dotProduct = ax * bx + ay * by + az * bz;

    // Cross product
    const crossX = ay * bz - az * by;
    const crossY = az * bx - ax * bz;
    const crossZ = ax * by - ay * bx;

    // Magnitudes
    const magA = Math.sqrt(ax * ax + ay * ay + az * az);
    const magB = Math.sqrt(bx * bx + by * by + bz * bz);
    const magCross = Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ);

    // Angle between vectors
    const cosTheta = dotProduct / (magA * magB);
    const angle = Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180 / Math.PI;

    const results = `
        <strong>Αποτελέσματα:</strong><br>
        Διάνυσμα A: (${ax}, ${ay}, ${az}), |A| = ${magA.toFixed(3)}<br>
        Διάνυσμα B: (${bx}, ${by}, ${bz}), |B| = ${magB.toFixed(3)}<br><br>
        
        <strong>Πρόσθεση:</strong> A + B = (${addX}, ${addY}, ${addZ})<br>
        <strong>Εσωτερικό Γινόμενο:</strong> A · B = ${dotProduct.toFixed(3)}<br>
        <strong>Εξωτερικό Γινόμενο:</strong> A × B = (${crossX.toFixed(3)}, ${crossY.toFixed(3)}, ${crossZ.toFixed(3)})<br>
        <strong>Μέγεθος A × B:</strong> |A × B| = ${magCross.toFixed(3)}<br>
        <strong>Γωνία μεταξύ A και B:</strong> θ = ${angle.toFixed(2)}°
    `;

    document.getElementById('vectorResults').innerHTML = results;
}

// Coulomb's Law Calculator
function calculateCoulombForce() {
    const q1 = parseFloat(document.getElementById('q1').value);
    const q2 = parseFloat(document.getElementById('q2').value);
    const r = parseFloat(document.getElementById('distance').value);

    if (!q1 || !q2 || !r || r <= 0) {
        document.getElementById('coulombResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
        return;
    }

    const k = 1 / (4 * Math.PI * CONSTANTS.EPSILON_0);
    const force = k * Math.abs(q1 * q2) / (r * r);
    const forceType = (q1 * q2 > 0) ? 'απωστική' : 'ελκτική';

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Δύναμη Coulomb: F = ${force.toExponential(3)} N<br>
        Τύπος δύναμης: ${forceType}<br>
        Σταθερά k = ${k.toExponential(3)} N⋅m²/C²
    `;

    document.getElementById('coulombResult').innerHTML = result;
}

// Capacitance Calculators
function showCapacitorInputs(type) {
    const allInputs = document.querySelectorAll('.capacitor-inputs');
    allInputs.forEach(input => input.classList.add('hidden'));

    const targetInputs = document.getElementById(type + 'Inputs');
    if (targetInputs) {
        targetInputs.classList.remove('hidden');
    }
}

function calculateCapacitance() {
    const type = document.getElementById('capacitorType').value;
    let capacitance;
    let formula;

    switch (type) {
        case 'parallel':
            const area = parseFloat(document.getElementById('area').value);
            const separation = parseFloat(document.getElementById('separation').value);
            const permittivity = parseFloat(document.getElementById('permittivity').value);
            
            if (!area || !separation || !permittivity || separation <= 0 || area <= 0) {
                showCapacitanceError();
                return;
            }
            
            capacitance = CONSTANTS.EPSILON_0 * permittivity * area / separation;
            formula = `C = ε₀εᵣA/d = ${CONSTANTS.EPSILON_0.toExponential(3)} × ${permittivity} × ${area} / ${separation}`;
            break;

        case 'cylindrical':
            const innerRadius = parseFloat(document.getElementById('innerRadius').value);
            const outerRadius = parseFloat(document.getElementById('outerRadius').value);
            const length = parseFloat(document.getElementById('length').value);
            
            if (!innerRadius || !outerRadius || !length || innerRadius >= outerRadius || innerRadius <= 0) {
                showCapacitanceError();
                return;
            }
            
            capacitance = 2 * Math.PI * CONSTANTS.EPSILON_0 * length / Math.log(outerRadius / innerRadius);
            formula = `C = 2πε₀l/ln(b/a) = 2π × ${CONSTANTS.EPSILON_0.toExponential(3)} × ${length} / ln(${outerRadius}/${innerRadius})`;
            break;

        case 'spherical':
            const innerSphere = parseFloat(document.getElementById('innerSphere').value);
            const outerSphere = parseFloat(document.getElementById('outerSphere').value);
            
            if (!innerSphere || !outerSphere || innerSphere >= outerSphere || innerSphere <= 0) {
                showCapacitanceError();
                return;
            }
            
            capacitance = 4 * Math.PI * CONSTANTS.EPSILON_0 * innerSphere * outerSphere / (outerSphere - innerSphere);
            formula = `C = 4πε₀R₁R₂/(R₂-R₁) = 4π × ${CONSTANTS.EPSILON_0.toExponential(3)} × ${innerSphere} × ${outerSphere} / (${outerSphere} - ${innerSphere})`;
            break;

        default:
            showCapacitanceError();
            return;
    }

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        ${formula}<br>
        <strong>Χωρητικότητα:</strong> C = ${capacitance.toExponential(3)} F<br>
        <strong>Χωρητικότητα:</strong> C = ${(capacitance * 1e12).toFixed(3)} pF
    `;

    document.getElementById('capacitanceResult').innerHTML = result;
}

function showCapacitanceError() {
    document.getElementById('capacitanceResult').innerHTML = 
        '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
}

// Ohm's Law Calculator
function calculateOhm() {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const resistance = parseFloat(document.getElementById('resistance').value);

    if (!voltage || !resistance || resistance <= 0) {
        document.getElementById('ohmResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
        return;
    }

    const current = voltage / resistance;
    const power = voltage * current;

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Ρεύμα: I = V/R = ${voltage}/${resistance} = ${current.toFixed(3)} A<br>
        Ισχύς: P = VI = ${voltage} × ${current.toFixed(3)} = ${power.toFixed(3)} W<br>
        Νόμος Ohm: V = IR επαληθεύεται
    `;

    document.getElementById('ohmResult').innerHTML = result;
}

// Power Calculator
function calculatePower() {
    const current = parseFloat(document.getElementById('current').value);
    const resistance = parseFloat(document.getElementById('powerResistance').value);

    if (!current || !resistance || resistance <= 0) {
        document.getElementById('powerResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
        return;
    }

    const power1 = current * current * resistance; // P = I²R
    const voltage = current * resistance; // V = IR
    const power2 = voltage * current; // P = VI
    const power3 = voltage * voltage / resistance; // P = V²/R

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Τάση: V = IR = ${current} × ${resistance} = ${voltage} V<br>
        Ισχύς (P = I²R): P = ${current}² × ${resistance} = ${power1.toFixed(3)} W<br>
        Ισχύς (P = VI): P = ${voltage} × ${current} = ${power2.toFixed(3)} W<br>
        Ισχύς (P = V²/R): P = ${voltage}²/${resistance} = ${power3.toFixed(3)} W<br>
        <em>Όλες οι μέθοδοι δίνουν το ίδιο αποτέλεσμα (Νόμος Joule)</em>
    `;

    document.getElementById('powerResult').innerHTML = result;
}

// Magnetic Force Calculator
function calculateMagneticForce() {
    const charge = parseFloat(document.getElementById('charge').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
    const magneticField = parseFloat(document.getElementById('magneticField').value);
    const angle = parseFloat(document.getElementById('angle').value);

    if (!charge || !velocity || !magneticField || angle === null) {
        document.getElementById('magneticForceResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
        return;
    }

    const angleRad = angle * Math.PI / 180;
    const force = Math.abs(charge) * velocity * magneticField * Math.sin(angleRad);

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Δύναμη Lorentz: F = |q|vBsinθ<br>
        F = ${Math.abs(charge).toExponential(2)} × ${velocity} × ${magneticField} × sin(${angle}°)<br>
        F = ${force.toExponential(3)} N<br>
        <em>Η δύναμη είναι κάθετη στην ταχύτητα και το μαγνητικό πεδίο</em>
    `;

    document.getElementById('magneticForceResult').innerHTML = result;
}

// Poynting Vector Calculator
function calculatePoynting() {
    const electricField = parseFloat(document.getElementById('electricField').value);
    const magneticField = parseFloat(document.getElementById('magneticFieldB').value);

    if (!electricField || !magneticField) {
        document.getElementById('poyntingResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
        return;
    }

    // Calculate theoretical B field from E field if in vacuum
    const theoreticalB = electricField / CONSTANTS.C;
    const intensity = (electricField * magneticField) / CONSTANTS.MU_0;
    const intensityFromE = 0.5 * CONSTANTS.EPSILON_0 * CONSTANTS.C * electricField * electricField;

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Διάνυσμα Poynting: S = (E × B)/μ₀<br>
        Ένταση: I = EB/(2μ₀) = ${intensity.toFixed(3)} W/m²<br>
        Ένταση από E: I = ½ε₀cE² = ${intensityFromE.toFixed(3)} W/m²<br>
        Θεωρητικό B για κενό: B = E/c = ${theoreticalB.toExponential(3)} T<br>
        <em>Σχέση E/B = c στο κενό</em>
    `;

    document.getElementById('poyntingResult').innerHTML = result;
}

// Photon Energy Calculator
function calculatePhoton() {
    const wavelength = parseFloat(document.getElementById('wavelength').value);

    if (!wavelength || wavelength <= 0) {
        document.getElementById('photonResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρο μήκος κύματος!</span>';
        return;
    }

    const wavelengthM = wavelength * 1e-9; // Convert nm to m
    const frequency = CONSTANTS.C / wavelengthM;
    const energy = CONSTANTS.H * frequency;
    const energyEV = energy / CONSTANTS.E; // Convert to eV
    const momentum = CONSTANTS.H / wavelengthM;

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Μήκος κύματος: λ = ${wavelength} nm = ${wavelengthM.toExponential(3)} m<br>
        Συχνότητα: f = c/λ = ${frequency.toExponential(3)} Hz<br>
        Ενέργεια φωτονίου: E = hf = ${energy.toExponential(3)} J<br>
        Ενέργεια φωτονίου: E = ${energyEV.toFixed(3)} eV<br>
        Ορμή φωτονίου: p = h/λ = ${momentum.toExponential(3)} kg⋅m/s
    `;

    document.getElementById('photonResult').innerHTML = result;
}

// Wave Properties Calculator
function calculateWaveProperties() {
    const frequency = parseFloat(document.getElementById('waveFrequency').value);

    if (!frequency || frequency <= 0) {
        document.getElementById('waveResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρη συχνότητα!</span>';
        return;
    }

    const wavelength = CONSTANTS.C / frequency;
    const period = 1 / frequency;
    const angularFreq = 2 * Math.PI * frequency;
    const waveNumber = 2 * Math.PI / wavelength;
    const photonEnergy = CONSTANTS.H * frequency;
    const photonEnergyEV = photonEnergy / CONSTANTS.E;

    // Determine wave type
    let waveType = '';
    if (wavelength > 1) waveType = 'Ραδιοκύματα';
    else if (wavelength > 1e-3) waveType = 'Μικροκύματα';
    else if (wavelength > 7e-7) waveType = 'Υπέρυθρο';
    else if (wavelength > 3.8e-7) waveType = 'Ορατό φως';
    else if (wavelength > 1e-8) waveType = 'Υπεριώδες';
    else if (wavelength > 1e-11) waveType = 'Ακτίνες X';
    else waveType = 'Ακτίνες γ';

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Συχνότητα: f = ${frequency.toExponential(3)} Hz<br>
        Μήκος κύματος: λ = c/f = ${wavelength.toExponential(3)} m<br>
        Περίοδος: T = 1/f = ${period.toExponential(3)} s<br>
        Γωνιακή συχνότητα: ω = 2πf = ${angularFreq.toExponential(3)} rad/s<br>
        Κυματάριθμος: k = 2π/λ = ${waveNumber.toExponential(3)} m⁻¹<br>
        Ενέργεια φωτονίου: E = ${photonEnergy.toExponential(3)} J = ${photonEnergyEV.toFixed(3)} eV<br>
        <strong>Τύπος κύματος: ${waveType}</strong>
    `;

    document.getElementById('waveResult').innerHTML = result;
}

// Visualization functions
function initializeVisualizations() {
    drawElectricField();
    drawMagneticField();
    initializeWaveAnimation();
}

// Electric Field Visualization
function drawElectricField() {
    const canvas = document.getElementById('electricFieldCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const charge = parseFloat(document.getElementById('chargeSlider')?.value || 5);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw charge
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const chargeRadius = 15;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, chargeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = charge > 0 ? '#ff4444' : '#4444ff';
    ctx.fill();
    ctx.strokeStyle = charge > 0 ? '#cc0000' : '#0000cc';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw charge sign
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(charge > 0 ? '+' : '-', centerX, centerY);
    
    // Draw field lines
    const numLines = 12;
    const maxLength = 80;
    
    for (let i = 0; i < numLines; i++) {
        const angle = (2 * Math.PI * i) / numLines;
        const startX = centerX + (chargeRadius + 5) * Math.cos(angle);
        const startY = centerY + (chargeRadius + 5) * Math.sin(angle);
        
        // Field line direction depends on charge sign
        const direction = charge > 0 ? 1 : -1;
        const endX = centerX + (chargeRadius + maxLength) * Math.cos(angle) * direction;
        const endY = centerY + (chargeRadius + maxLength) * Math.sin(angle) * direction;
        
        // Draw field line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#21808d';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrow
        const arrowLength = 10;
        const arrowAngle = 0.3;
        const arrowX = endX - arrowLength * Math.cos(angle - arrowAngle) * direction;
        const arrowY = endY - arrowLength * Math.sin(angle - arrowAngle) * direction;
        const arrowX2 = endX - arrowLength * Math.cos(angle + arrowAngle) * direction;
        const arrowY2 = endY - arrowLength * Math.sin(angle + arrowAngle) * direction;
        
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(arrowX, arrowY);
        ctx.moveTo(endX, endY);
        ctx.lineTo(arrowX2, arrowY2);
        ctx.stroke();
    }
    
    // Add field strength text
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Φορτίο: ${charge} μC`, 10, 25);
    ctx.fillText(`Ένταση πεδίου ∝ |q|/r²`, 10, 45);
}

// Magnetic Field Visualization
function drawMagneticField() {
    const canvas = document.getElementById('magneticFieldCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const current = parseFloat(document.getElementById('currentSlider')?.value || 5);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wire (vertical line)
    const wireX = canvas.width / 2;
    const wireWidth = 8;
    
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(wireX - wireWidth/2, 0, wireWidth, canvas.height);
    
    // Draw current direction indicator
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(current > 0 ? '⊙' : '⊗', wireX, 30);
    
    // Draw magnetic field circles
    const numCircles = 5;
    const maxRadius = 150;
    
    for (let i = 1; i <= numCircles; i++) {
        const radius = (maxRadius * i) / numCircles;
        
        ctx.beginPath();
        ctx.arc(wireX, canvas.height/2, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#21808d';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw field direction arrows
        const numArrows = 8;
        for (let j = 0; j < numArrows; j++) {
            const angle = (2 * Math.PI * j) / numArrows;
            const arrowX = wireX + radius * Math.cos(angle);
            const arrowY = canvas.height/2 + radius * Math.sin(angle);
            
            // Arrow direction based on right-hand rule
            const arrowDirection = current > 0 ? angle + Math.PI/2 : angle - Math.PI/2;
            const arrowLength = 8;
            
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX + arrowLength * Math.cos(arrowDirection), 
                      arrowY + arrowLength * Math.sin(arrowDirection));
            ctx.strokeStyle = '#21808d';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Arrowhead
            const headAngle = 0.3;
            ctx.beginPath();
            ctx.moveTo(arrowX + arrowLength * Math.cos(arrowDirection), 
                      arrowY + arrowLength * Math.sin(arrowDirection));
            ctx.lineTo(arrowX + (arrowLength-3) * Math.cos(arrowDirection - headAngle), 
                      arrowY + (arrowLength-3) * Math.sin(arrowDirection - headAngle));
            ctx.moveTo(arrowX + arrowLength * Math.cos(arrowDirection), 
                      arrowY + arrowLength * Math.sin(arrowDirection));
            ctx.lineTo(arrowX + (arrowLength-3) * Math.cos(arrowDirection + headAngle), 
                      arrowY + (arrowLength-3) * Math.sin(arrowDirection + headAngle));
            ctx.stroke();
        }
    }
    
    // Add text
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Ρεύμα: ${current} A`, 10, 25);
    ctx.fillText(`B ∝ I/r (Νόμος Ampère)`, 10, 45);
    ctx.fillText(current > 0 ? 'Ρεύμα προς τα έξω ⊙' : 'Ρεύμα προς τα μέσα ⊗', 10, 65);
}

// Wave Animation
let waveAnimationId;
let waveTime = 0;
let waveFrequency = 1;
let isWavePlaying = true;

function initializeWaveAnimation() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    
    startWaveAnimation();
}

function startWaveAnimation() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    
    function animate() {
        if (isWavePlaying) {
            drawWave();
            waveTime += 0.05;
        }
        waveAnimationId = requestAnimationFrame(animate);
    }
    animate();
}

function drawWave() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const amplitude = 60;
    const wavelength = 200;
    const k = 2 * Math.PI / wavelength;
    const omega = 2 * Math.PI * waveFrequency;
    
    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    
    // Draw E field (red, vertical)
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 2) {
        const E = amplitude * Math.sin(k * x - omega * waveTime);
        const y = centerY - E;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Draw B field (blue, into/out of page represented as horizontal)
    ctx.strokeStyle = '#4444ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 2) {
        const B = amplitude * Math.sin(k * x - omega * waveTime);
        const y = centerY + B * 0.3; // Offset for visibility
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Draw propagation direction arrow
    ctx.strokeStyle = '#21808d';
    ctx.fillStyle = '#21808d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 80, 30);
    ctx.lineTo(canvas.width - 40, 30);
    ctx.stroke();
    
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(canvas.width - 40, 30);
    ctx.lineTo(canvas.width - 50, 25);
    ctx.lineTo(canvas.width - 50, 35);
    ctx.closePath();
    ctx.fill();
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('E (Ηλεκτρικό)', 10, 30);
    ctx.fillStyle = '#4444ff';
    ctx.fillText('B (Μαγνητικό)', 10, canvas.height - 15);
    ctx.fillStyle = '#21808d';
    ctx.fillText('Διεύθυνση διάδοσης', canvas.width - 150, 50);
    
    // Wave properties
    ctx.fillStyle = '#134252';
    ctx.font = '12px Arial';
    ctx.fillText(`f = ${waveFrequency} Hz`, 10, canvas.height - 35);
    ctx.fillText(`λ = ${wavelength} pixels`, 10, canvas.height - 55);
    ctx.fillText('c = λf', 10, canvas.height - 75);
}

function updateWaveFrequency(freq) {
    waveFrequency = freq;
}

function toggleWaveAnimation() {
    const btn = document.getElementById('playPauseBtn');
    isWavePlaying = !isWavePlaying;
    btn.textContent = isWavePlaying ? 'Παύση' : 'Εκκίνηση';
}

// Quiz functionality
function initializeQuiz() {
    // Quiz is initialized, questions are in HTML
}

function checkAnswers() {
    const answers = [1, 1, 1, 1, 0]; // Correct answer indices
    const explanations = [
        'Για μη-ομοιόμορφη κατανομή πρέπει να υπολογιστεί το γραμμικό ολοκλήρωμα του λ κατά μήκος της γραμμής.',
        'Το ηλεκτρικό πεδίο παράγεται από στατικά φορτία, ενώ το μαγνητικό από κινούμενα φορτία (ρεύματα).',
        'Ένα στατικό φορτίο δεν δέχεται μαγνητική δύναμη επειδή η δύναμη Lorentz απαιτεί κίνηση (F = q(u × B)).',
        'Η μηδενική μαγνητική ροή σημαίνει ότι δεν υπάρχουν μαγνητικοί μονόπολοι - οι γραμμές πεδίου είναι κλειστές.',
        'Το ρεύμα μετατόπισης επιτρέπει τη δημιουργία μαγνητικού πεδίου από μεταβαλλόμενο ηλεκτρικό πεδίο.'
    ];
    
    let score = 0;
    let total = answers.length;
    
    for (let i = 1; i <= total; i++) {
        const questionName = `q${i}`;
        const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        const questionOptions = document.querySelectorAll(`input[name="${questionName}"]`);
        const explanationDiv = document.getElementById(`explanation${i}`);
        
        // Reset styles
        questionOptions.forEach(option => {
            option.parentElement.classList.remove('correct', 'incorrect');
        });
        
        if (selectedAnswer) {
            const selectedValue = parseInt(selectedAnswer.value);
            const correctAnswer = answers[i - 1];
            
            if (selectedValue === correctAnswer) {
                score++;
                selectedAnswer.parentElement.classList.add('correct');
            } else {
                selectedAnswer.parentElement.classList.add('incorrect');
                // Highlight correct answer
                questionOptions[correctAnswer].parentElement.classList.add('correct');
            }
        } else {
            // No answer selected, highlight correct answer
            questionOptions[answers[i - 1]].parentElement.classList.add('correct');
        }
        
        // Show explanation
        explanationDiv.innerHTML = `<strong>Εξήγηση:</strong> ${explanations[i - 1]}`;
        explanationDiv.classList.add('visible');
    }
    
    // Show results
    const percentage = (score / total * 100).toFixed(1);
    let grade = '';
    if (percentage >= 90) grade = 'Άριστα!';
    else if (percentage >= 80) grade = 'Πολύ καλά!';
    else if (percentage >= 70) grade = 'Καλά!';
    else if (percentage >= 60) grade = 'Μέτρια';
    else grade = 'Χρειάζεται περισσότερη μελέτη';
    
    const resultsDiv = document.getElementById('quizResults');
    resultsDiv.innerHTML = `
        <h3>Αποτελέσματα Quiz</h3>
        <p>Σκόρ: ${score}/${total} (${percentage}%)</p>
        <p><strong>${grade}</strong></p>
        <p>Για να περάσετε στη 2η πρόοδο χρειάζεστε βαθμό ≥ 5/10</p>
    `;
    resultsDiv.classList.add('show');
}

function resetQuiz() {
    // Reset all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
        radio.parentElement.classList.remove('correct', 'incorrect');
    });
    
    // Hide explanations
    const explanations = document.querySelectorAll('.quiz-explanation');
    explanations.forEach(exp => {
        exp.classList.remove('visible');
        exp.innerHTML = '';
    });
    
    // Hide results
    const resultsDiv = document.getElementById('quizResults');
    resultsDiv.classList.remove('show');
    resultsDiv.innerHTML = '';
}

// Utility functions
function formatScientific(num, precision = 3) {
    return num.toExponential(precision);
}

function formatNumber(num, precision = 3) {
    if (Math.abs(num) >= 1000 || Math.abs(num) < 0.001) {
        return num.toExponential(precision);
    }
    return num.toFixed(precision);
}
// Enhanced Electromagnetism Educational Application

// Constants
const CONSTANTS = {
    EPSILON_0: 8.854e-12, // F/m
    MU_0: 4 * Math.PI * 1e-7, // H/m
    C: 299792458, // m/s
    H: 6.626e-34, // Js
    E: 1.602e-19, // C
    K: 8.99e9, // Coulomb constant
    PI: Math.PI
};

// Global variables for animations
let animationStates = {
    fieldCoupling: false,
    linearWave: true,
    circularWave: true,
    ellipticalWave: true,
    interference: true
};

let animationIds = {};
let currentQuizQuestion = 1;
const totalQuizQuestions = 10;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTabs();
    initializeCalculators();
    initializeVisualizations();
    initializeQuiz();
    initializeSliders();
    
    // Initialize MathJax
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
});

// Initialize calculators
function initializeCalculators() {
    // This function can be used to set up any calculator-specific initialization
    // For now, it's a placeholder that prevents the reference error
    console.log('Calculators initialized');
}

// Navigation System
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

        // Initialize section-specific functionality
        initializeSectionSpecific(sectionId);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Tab System
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parentSection = this.closest('.content-section');
            
            if (parentSection) {
                // Remove active class from all tabs in this section
                parentSection.querySelectorAll('.tab-btn').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                parentSection.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetContent = parentSection.querySelector(`#${tabId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Re-render MathJax and initialize tab-specific functionality
                if (window.MathJax) {
                    MathJax.typesetPromise();
                }
                initializeTabSpecific(tabId);
            }
        });
    });
}

// Initialize all sliders with real-time updates
function initializeSliders() {
    // Capacitor sliders
    setupSlider('areaSlider', 'areaValue', calculateCapacitanceRealtime);
    setupSlider('distanceSlider', 'distanceValue', calculateCapacitanceRealtime);
    setupSlider('permittivitySlider', 'permittivityValue', calculateCapacitanceRealtime);
    setupSlider('innerRadiusSlider', 'innerRadiusValue', calculateCapacitanceRealtime);
    setupSlider('outerRadiusSlider', 'outerRadiusValue', calculateCapacitanceRealtime);
    setupSlider('lengthSlider', 'lengthValue', calculateCapacitanceRealtime);
    setupSlider('innerSphereSlider', 'innerSphereValue', calculateCapacitanceRealtime);
    setupSlider('outerSphereSlider', 'outerRadiusValue', calculateCapacitanceRealtime);
    
    // Current sliders
    setupSlider('voltageSliderOhm', 'voltageValueOhm', calculateOhmRealtime);
    setupSlider('resistanceSliderOhm', 'resistanceValueOhm', calculateOhmRealtime);
    setupSlider('currentSliderPower', 'currentValuePower', calculatePowerRealtime);
    setupSlider('resistanceSliderPower', 'resistanceValuePower', calculatePowerRealtime);
    
    // I-V Graph slider (separate from ohm calculation)
    setupSlider('resistanceGraphSlider', 'resistanceGraphValue', drawIVGraph);
    
    // Circuit sliders
    setupSlider('r1Slider', 'r1Value', calculateCircuitRealtime);
    setupSlider('r2Slider', 'r2Value', calculateCircuitRealtime);
    setupSlider('vSourceSlider', 'vSourceValue', calculateCircuitRealtime);
    
    // Magnetostatics sliders
    setupSlider('ampereCurrentSlider', 'ampereCurrentValue', calculateAmpereRealtime);
    setupSlider('ampereDistanceSlider', 'ampereDistanceValue', calculateAmpereRealtime);
    setupSlider('chargeForceSlider', 'chargeForceValue', calculateMagneticForceRealtime);
    setupSlider('velocityForceSlider', 'velocityForceValue', calculateMagneticForceRealtime);
    setupSlider('magneticForceSlider', 'magneticForceValue', calculateMagneticForceRealtime);
    setupSlider('angleForceSlider', 'angleForceValue', calculateMagneticForceRealtime);
    
    // Magnetic flux sliders
    setupSlider('fluxAreaSlider', 'fluxAreaValue', function() {
        calculateFluxRealtime();
        drawMagneticFlux();
    });
    setupSlider('fluxAngleSlider', 'fluxAngleValue', function() {
        calculateFluxRealtime();
        drawMagneticFlux();
    });
    
    // Wave sliders
    setupSlider('linearFreqSlider', 'linearFreqValue', updateLinearWave);
    setupSlider('linearAmpSlider', 'linearAmpValue', updateLinearWave);
    setupSlider('circularFreqSlider', 'circularFreqValue', updateCircularWave);
    setupSlider('exSlider', 'exValue', updateEllipticalWave);
    setupSlider('eySlider', 'eyValue', updateEllipticalWave);
    setupSlider('phaseSlider', 'phaseValue', updateEllipticalWave);
    
    // Energy sliders
    setupSlider('eFieldSlider', 'eFieldValue', calculatePoyntingRealtime);
    setupSlider('poyntingFreqSlider', 'poyntingFreqValue', updatePoyntingVisualization);
    setupSlider('wavelengthPhotoSlider', 'wavelengthPhotoValue', calculatePhotoelectricRealtime);
    setupSlider('intensityPhotoSlider', 'intensityPhotoValue', updatePhotoelectricVisualization);
    
    // Energy density sliders
    setupSlider('electricFieldDensitySlider', 'electricFieldDensityValue', calculateEnergyDensityRealtime);
    setupSlider('volumeDensitySlider', 'volumeDensityValue', calculateEnergyDensityRealtime);
    
    // Photon momentum sliders
    setupSlider('photonEnergySlider', 'photonEnergyValue', calculatePhotonMomentumRealtime);
    setupSlider('photonNumberSlider', 'photonNumberValue', calculatePhotonMomentumRealtime);
    
    // Spectrum slider
    setupSlider('spectrumFreqSlider', 'spectrumFreqValue', updateSpectrumInfo);
    setupSlider('waveFreqCalcSlider', 'waveFreqCalcValue', calculateWavePropertiesRealtime);

    // Point charge electric field
    setupSlider('chargeSlider', 'chargeValue', drawElectricField);

    // Magnetic field visualization
    setupSlider('currentMagSlider', 'currentMagValue', drawMagneticField3D);

    // Field coupling
    setupSlider('couplingFreqSlider', 'couplingFreqValue', drawFieldCoupling);

    // Interference
    setupSlider('amp1Slider', 'amp1Value', drawInterference);
    setupSlider('amp2Slider', 'amp2Value', drawInterference);
    setupSlider('phaseDiffSlider', 'phaseDiffValue', drawInterference);
}

function setupSlider(sliderId, valueId, callback) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    
    if (slider && valueDisplay) {
        slider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            valueDisplay.textContent = formatSliderValue(value);
            if (callback) callback();
        });
        
        // Initialize with current value, but only if needed elements exist
        if (callback) {
            callback();
        }
    }
}

function formatSliderValue(value) {
    if (value >= 1000000) return value.toExponential(2);
    if (value >= 1000) return value.toFixed(0);
    if (value >= 1) return value.toFixed(2);
    if (value >= 0.01) return value.toFixed(3);
    return value.toExponential(2);
}

// Calculator Functions
function calculateVectorOps() {
    const ax = parseFloat(document.getElementById('ax').value) || 0;
    const ay = parseFloat(document.getElementById('ay').value) || 0;
    const az = parseFloat(document.getElementById('az').value) || 0;
    const bx = parseFloat(document.getElementById('bx').value) || 0;
    const by = parseFloat(document.getElementById('by').value) || 0;
    const bz = parseFloat(document.getElementById('bz').value) || 0;

    // Vector operations
    const addX = ax + bx, addY = ay + by, addZ = az + bz;
    const dotProduct = ax * bx + ay * by + az * bz;
    const crossX = ay * bz - az * by;
    const crossY = az * bx - ax * bz;
    const crossZ = ax * by - ay * bx;
    
    const magA = Math.sqrt(ax * ax + ay * ay + az * az);
    const magB = Math.sqrt(bx * bx + by * by + bz * bz);
    const magCross = Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ);
    
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

function calculateCoulombForce() {
    const q1 = parseFloat(document.getElementById('q1').value);
    const q2 = parseFloat(document.getElementById('q2').value);
    const r = parseFloat(document.getElementById('distance').value);

    if (!q1 || !q2 || !r || r <= 0) {
        document.getElementById('coulombResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
        return;
    }

    const force = CONSTANTS.K * Math.abs(q1 * q2) / (r * r);
    const forceType = (q1 * q2 > 0) ? 'απωστική' : 'ελκτική';

    const result = `
        <strong>Αποτέλεσμα:</strong><br>
        Δύναμη Coulomb: F = ${force.toExponential(3)} N<br>
        Τύπος δύναμης: ${forceType}<br>
        Σταθερά k = ${CONSTANTS.K.toExponential(3)} N⋅m²/C²
    `;

    document.getElementById('coulombResult').innerHTML = result;
}

// Enhanced Capacitor Calculations
function calculateCapacitanceRealtime() {
    const type = document.getElementById('capacitorType')?.value || 'parallel';
    const resultDiv = document.getElementById('capacitanceResult');
    if (!resultDiv) return;

    let capacitance, formula, steps;

    switch (type) {
        case 'parallel':
            const area = parseFloat(document.getElementById('areaSlider')?.value || 0.01);
            const separation = parseFloat(document.getElementById('distanceSlider')?.value || 0.001);
            const permittivity = parseFloat(document.getElementById('permittivitySlider')?.value || 1);
            
            capacitance = CONSTANTS.EPSILON_0 * permittivity * area / separation;
            formula = `C = ε₀εᵣA/d`;
            steps = `
                <strong>Βήμα 1:</strong> C = ε₀εᵣA/d<br>
                <strong>Βήμα 2:</strong> C = ${CONSTANTS.EPSILON_0.toExponential(3)} × ${permittivity} × ${area} / ${separation}<br>
                <strong>Βήμα 3:</strong> C = ${capacitance.toExponential(3)} F
            `;
            break;

        case 'cylindrical':
            const innerR = parseFloat(document.getElementById('innerRadiusSlider')?.value || 0.01);
            const outerR = parseFloat(document.getElementById('outerRadiusSlider')?.value || 0.02);
            const length = parseFloat(document.getElementById('lengthSlider')?.value || 0.1);
            
            if (innerR >= outerR) {
                resultDiv.innerHTML = '<span class="result-error">Εσωτερική ακτίνα πρέπει < εξωτερική ακτίνα</span>';
                return;
            }
            
            capacitance = 2 * Math.PI * CONSTANTS.EPSILON_0 * length / Math.log(outerR / innerR);
            formula = `C = 2πε₀l/ln(b/a)`;
            steps = `
                <strong>Βήμα 1:</strong> C = 2πε₀l/ln(b/a)<br>
                <strong>Βήμα 2:</strong> C = 2π × ${CONSTANTS.EPSILON_0.toExponential(3)} × ${length} / ln(${outerR}/${innerR})<br>
                <strong>Βήμα 3:</strong> C = ${capacitance.toExponential(3)} F
            `;
            break;

        case 'spherical':
            const innerS = parseFloat(document.getElementById('innerSphereSlider')?.value || 0.01);
            const outerS = parseFloat(document.getElementById('outerSphereSlider')?.value || 0.02);
            
            if (innerS >= outerS) {
                resultDiv.innerHTML = '<span class="result-error">Εσωτερική ακτίνα πρέπει < εξωτερική ακτίνα</span>';
                return;
            }
            
            capacitance = 4 * Math.PI * CONSTANTS.EPSILON_0 * innerS * outerS / (outerS - innerS);
            formula = `C = 4πε₀ab/(b-a)`;
            steps = `
                <strong>Βήμα 1:</strong> C = 4πε₀ab/(b-a)<br>
                <strong>Βήμα 2:</strong> C = 4π × ${CONSTANTS.EPSILON_0.toExponential(3)} × ${innerS} × ${outerS} / (${outerS} - ${innerS})<br>
                <strong>Βήμα 3:</strong> C = ${capacitance.toExponential(3)} F
            `;
            break;
    }

    const result = `
        <strong>Τύπος:</strong> ${formula}<br>
        ${steps}<br>
        <strong>Χωρητικότητα:</strong> C = ${(capacitance * 1e12).toFixed(3)} pF<br>
        <strong>Ενέργεια (V=1V):</strong> U = ½CV² = ${(0.5 * capacitance).toExponential(3)} J
    `;

    resultDiv.innerHTML = result;
    
    // Update capacitor field visualization
    drawCapacitorField();
}

function calculateCapacitorEnergy() {
    const C = parseFloat(document.getElementById('capacitanceInput').value);
    const V = parseFloat(document.getElementById('voltageInput').value);
    
    if (!C || !V) {
        document.getElementById('energyResult').innerHTML = 
            '<span class="result-error">Παρακαλώ εισάγετε έγκυρες τιμές!</span>';
        return;
    }
    
    const Q = C * V;
    const U1 = 0.5 * C * V * V;
    const U2 = 0.5 * Q * V;
    const U3 = Q * Q / (2 * C);
    
    const result = `
        <strong>Τρεις Μέθοδοι Υπολογισμού:</strong><br>
        Φορτίο: Q = CV = ${Q.toExponential(3)} C<br><br>
        <strong>Μέθοδος 1:</strong> U = ½CV² = ${U1.toExponential(3)} J<br>
        <strong>Μέθοδος 2:</strong> U = ½QV = ${U2.toExponential(3)} J<br>
        <strong>Μέθοδος 3:</strong> U = Q²/(2C) = ${U3.toExponential(3)} J<br>
        <em>Όλες οι μέθοδοι δίνουν το ίδιο αποτέλεσμα!</em>
    `;
    
    document.getElementById('energyResult').innerHTML = result;
}

// Current and Resistance Calculations
function calculateOhmRealtime() {
    const voltage = parseFloat(document.getElementById('voltageSliderOhm')?.value || 12);
    const resistance = parseFloat(document.getElementById('resistanceSliderOhm')?.value || 6);
    
    const current = voltage / resistance;
    const power = voltage * current;
    
    const result = `
        <strong>Βασικοί Υπολογισμοί:</strong><br>
        Ρεύμα: I = V/R = ${voltage}/${resistance} = ${current.toFixed(3)} A<br>
        Ισχύς: P = VI = ${voltage} × ${current.toFixed(3)} = ${power.toFixed(3)} W<br>
        Αντίσταση: R = V/I = ${voltage}/${current.toFixed(3)} = ${resistance.toFixed(3)} Ω<br>
        <strong>Επαλήθευση:</strong> V = IR = ${current.toFixed(3)} × ${resistance} = ${voltage} V ✓
    `;
    
    const resultDiv = document.getElementById('ohmResult');
    if (resultDiv) resultDiv.innerHTML = result;
    
    // Update I-V graph
    drawIVGraph();
}

function calculatePowerRealtime() {
    const current = parseFloat(document.getElementById('currentSliderPower')?.value || 2);
    const resistance = parseFloat(document.getElementById('resistanceSliderPower')?.value || 6);
    
    const voltage = current * resistance;
    const power1 = current * current * resistance; // P = I²R
    const power2 = voltage * current; // P = VI
    const power3 = voltage * voltage / resistance; // P = V²/R
    
    const result = `
        <strong>Τρεις Μέθοδοι Υπολογισμού Ισχύος:</strong><br>
        Τάση: V = IR = ${current} × ${resistance} = ${voltage} V<br><br>
        <strong>Μέθοδος 1 (Joule):</strong> P = I²R = ${current}² × ${resistance} = ${power1.toFixed(3)} W<br>
        <strong>Μέθοδος 2:</strong> P = VI = ${voltage} × ${current} = ${power2.toFixed(3)} W<br>
        <strong>Μέθοδος 3:</strong> P = V²/R = ${voltage}²/${resistance} = ${power3.toFixed(3)} W<br>
        <em>Όλες οι μέθοδοι συμφωνούν - Νόμος διατήρησης ενέργειας!</em>
    `;
    
    const resultDiv = document.getElementById('powerResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

function calculateCircuitRealtime() {
    const R1 = parseFloat(document.getElementById('r1Slider')?.value || 10);
    const R2 = parseFloat(document.getElementById('r2Slider')?.value || 20);
    const V = parseFloat(document.getElementById('vSourceSlider')?.value || 12);
    
    // Series circuit calculation
    const Rtotal = R1 + R2;
    const Itotal = V / Rtotal;
    const V1 = Itotal * R1;
    const V2 = Itotal * R2;
    const P1 = Itotal * Itotal * R1;
    const P2 = Itotal * Itotal * R2;
    const Ptotal = P1 + P2;
    
    const result = `
        <strong>Ανάλυση Σειριακού Κυκλώματος:</strong><br>
        Συνολική αντίσταση: Rtotal = R1 + R2 = ${R1} + ${R2} = ${Rtotal} Ω<br>
        Ρεύμα κυκλώματος: I = V/Rtotal = ${V}/${Rtotal} = ${Itotal.toFixed(3)} A<br><br>
        
        <strong>Τάσεις (KVL):</strong><br>
        V1 = IR1 = ${Itotal.toFixed(3)} × ${R1} = ${V1.toFixed(3)} V<br>
        V2 = IR2 = ${Itotal.toFixed(3)} × ${R2} = ${V2.toFixed(3)} V<br>
        Επαλήθευση: V1 + V2 = ${V1.toFixed(3)} + ${V2.toFixed(3)} = ${(V1 + V2).toFixed(3)} V = ${V} V ✓<br><br>
        
        <strong>Ισχείς:</strong><br>
        P1 = I²R1 = ${P1.toFixed(3)} W<br>
        P2 = I²R2 = ${P2.toFixed(3)} W<br>
        Ptotal = P1 + P2 = ${Ptotal.toFixed(3)} W
    `;
    
    const resultDiv = document.getElementById('circuitResults');
    if (resultDiv) resultDiv.innerHTML = result;
    
    // Update circuit visualization
    drawCircuitDiagram();
}

// Magnetostatics Calculations
function calculateAmpereRealtime() {
    const current = parseFloat(document.getElementById('ampereCurrentSlider')?.value || 10);
    const distance = parseFloat(document.getElementById('ampereDistanceSlider')?.value || 0.05);
    
    const B = CONSTANTS.MU_0 * current / (2 * Math.PI * distance);
    
    const result = `
        <strong>Μαγνητικό Πεδίο από Ευθύ Αγωγό:</strong><br>
        Νόμος Ampère: B = μ₀I/(2πr)<br>
        B = ${CONSTANTS.MU_0.toExponential(3)} × ${current} / (2π × ${distance})<br>
        <strong>Μαγνητική επαγωγή:</strong> B = ${B.toExponential(3)} T<br>
        <strong>Κατεύθυνση:</strong> Κανόνας δεξιού χεριού<br>
        <strong>Μαγνητική ένταση:</strong> H = B/μ₀ = ${(B/CONSTANTS.MU_0).toExponential(3)} A/m
    `;
    
    const resultDiv = document.getElementById('ampereResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

function calculateMagneticForceRealtime() {
    const charge = parseFloat(document.getElementById('chargeForceSlider')?.value || 1e-6);
    const velocity = parseFloat(document.getElementById('velocityForceSlider')?.value || 1000);
    const magneticField = parseFloat(document.getElementById('magneticForceSlider')?.value || 0.1);
    const angle = parseFloat(document.getElementById('angleForceSlider')?.value || 90);
    
    const angleRad = angle * Math.PI / 180;
    const force = Math.abs(charge) * velocity * magneticField * Math.sin(angleRad);
    
    // Calculate cyclotron frequency and radius
    const cyclotronFreq = Math.abs(charge) * magneticField / (9.109e-31); // For electron mass
    const cyclotronRadius = (9.109e-31 * velocity) / (Math.abs(charge) * magneticField);
    
    const result = `
        <strong>Δύναμη Lorentz:</strong><br>
        F = |q|vBsinθ<br>
        F = ${Math.abs(charge).toExponential(2)} × ${velocity} × ${magneticField} × sin(${angle}°)<br>
        <strong>Δύναμη:</strong> F = ${force.toExponential(3)} N<br><br>
        
        <strong>Κυκλική Κίνηση (για ηλεκτρόνιο):</strong><br>
        Συχνότητα κυκλοτρόν: fc = qB/(2πm) = ${cyclotronFreq.toExponential(3)} Hz<br>
        Ακτίνα κυκλοτρόν: r = mv/(qB) = ${cyclotronRadius.toExponential(3)} m<br>
        <em>Η δύναμη είναι πάντα κάθετη στην ταχύτητα</em>
    `;
    
    const resultDiv = document.getElementById('magneticForceResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

// Magnetic Flux Calculations
function calculateFluxRealtime() {
    const area = parseFloat(document.getElementById('fluxAreaSlider')?.value || 0.01);
    const angle = parseFloat(document.getElementById('fluxAngleSlider')?.value || 0);
    const magneticField = 0.5; // Fixed B field for demonstration (T)
    
    const angleRad = angle * Math.PI / 180;
    const flux = magneticField * area * Math.cos(angleRad);
    
    const result = `
        <strong>Μαγνητική Ροή:</strong><br>
        Φ = B·A·cos(θ)<br>
        Φ = ${magneticField} × ${area} × cos(${angle}°)<br>
        <strong>Ροή:</strong> Φ = ${flux.toFixed(6)} Wb<br><br>
        
        <strong>Ανάλυση:</strong><br>
        Εμβαδόν: A = ${area} m²<br>
        Γωνία: θ = ${angle}° (${angleRad.toFixed(3)} rad)<br>
        Συνιστώσα B⊥: B⊥ = ${(magneticField * Math.cos(angleRad)).toFixed(3)} T<br><br>
        
        <em>Η ροή είναι μέγιστη όταν θ = 0° (κάθετη επιφάνεια)</em>
    `;
    
    const resultDiv = document.getElementById('fluxResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

// Energy and Photon Calculations
function calculatePoyntingRealtime() {
    const electricField = parseFloat(document.getElementById('eFieldSlider')?.value || 100);
    const magneticField = electricField / CONSTANTS.C; // For plane wave in vacuum
    
    const intensity = 0.5 * CONSTANTS.EPSILON_0 * CONSTANTS.C * electricField * electricField;
    const poyntingMagnitude = electricField * magneticField / CONSTANTS.MU_0;
    const energyDensity = 0.5 * CONSTANTS.EPSILON_0 * electricField * electricField;
    const radiationPressure = intensity / CONSTANTS.C;
    
    const result = `
        <strong>Ηλεκτρομαγνητικό Κύμα στο Κενό:</strong><br>
        Ηλεκτρικό πεδίο: E₀ = ${electricField} V/m<br>
        Μαγνητικό πεδίο: B₀ = E₀/c = ${magneticField.toExponential(3)} T<br><br>
        
        <strong>Διάνυσμα Poynting:</strong><br>
        S = E×B/μ₀ = ${poyntingMagnitude.toExponential(3)} W/m²<br>
        <strong>Ένταση:</strong> I = ½ε₀cE₀² = ${intensity.toExponential(3)} W/m²<br>
        <strong>Πυκνότητα ενέργειας:</strong> u = ½ε₀E² = ${energyDensity.toExponential(3)} J/m³<br>
        <strong>Πίεση ακτινοβολίας:</strong> P = I/c = ${radiationPressure.toExponential(3)} N/m²
    `;
    
    const resultDiv = document.getElementById('poyntingResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

function calculateEnergyDensityRealtime() {
    const electricField = parseFloat(document.getElementById('electricFieldDensitySlider')?.value || 1000);
    const volume = parseFloat(document.getElementById('volumeDensitySlider')?.value || 0.001);
    
    // Calculate energy densities
    const electricEnergyDensity = 0.5 * CONSTANTS.EPSILON_0 * electricField * electricField;
    const magneticField = electricField / CONSTANTS.C; // For plane wave in vacuum
    const magneticEnergyDensity = 0.5 * magneticField * magneticField / CONSTANTS.MU_0;
    const totalEnergyDensity = electricEnergyDensity + magneticEnergyDensity;
    
    // Calculate total energy in the volume
    const totalEnergy = totalEnergyDensity * volume;
    
    const result = `
        <strong>Πυκνότητα Ενέργειας Ηλεκτρομαγνητικού Πεδίου:</strong><br>
        Ηλεκτρικό πεδίο: E = ${electricField} V/m<br>
        Μαγνητικό πεδίο: B = E/c = ${magneticField.toExponential(3)} T<br>
        Όγκος: V = ${volume} m³<br><br>
        
        <strong>Πυκνότητες Ενέργειας:</strong><br>
        Ηλεκτρική: uₑ = ½ε₀E² = ${electricEnergyDensity.toExponential(3)} J/m³<br>
        Μαγνητική: uᵦ = ½B²/μ₀ = ${magneticEnergyDensity.toExponential(3)} J/m³<br>
        <strong>Συνολική:</strong> u = uₑ + uᵦ = ${totalEnergyDensity.toExponential(3)} J/m³<br><br>
        
        <strong>Συνολική Ενέργεια στον Όγκο:</strong><br>
        U = u × V = ${totalEnergy.toExponential(3)} J<br>
        
        <em>Για επίπεδο κύμα στο κενό: uₑ = uᵦ</em>
    `;
    
    const resultDiv = document.getElementById('energyDensityResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

function calculatePhotonMomentumRealtime() {
    const photonEnergy = parseFloat(document.getElementById('photonEnergySlider')?.value || 2); // eV
    const photonNumber = parseFloat(document.getElementById('photonNumberSlider')?.value || 1000);
    
    // Convert energy to Joules
    const photonEnergyJ = photonEnergy * CONSTANTS.E;
    
    // Calculate photon properties
    const frequency = photonEnergyJ / CONSTANTS.H;
    const wavelength = CONSTANTS.C / frequency;
    const photonMomentum = CONSTANTS.H / wavelength;
    
    // Calculate total momentum and energy
    const totalMomentum = photonMomentum * photonNumber;
    const totalEnergy = photonEnergyJ * photonNumber;
    
    // Calculate radiation pressure (for complete absorption)
    const beamArea = 0.001; // Assume 1 cm² beam area
    const radiationPressure = totalMomentum / (beamArea * 1); // Assuming 1 second exposure
    
    const result = `
        <strong>Ιδιότητες Φωτονίων:</strong><br>
        Ενέργεια ανά φωτόνιο: E = ${photonEnergy} eV = ${photonEnergyJ.toExponential(3)} J<br>
        Συχνότητα: f = E/h = ${frequency.toExponential(3)} Hz<br>
        Μήκος κύματος: λ = c/f = ${(wavelength * 1e9).toFixed(1)} nm<br>
        Ορμή ανά φωτόνιο: p = h/λ = ${photonMomentum.toExponential(3)} kg⋅m/s<br><br>
        
        <strong>Συλλογικές Ιδιότητες (${photonNumber} φωτόνια):</strong><br>
        Συνολική ενέργεια: Eₜₒₜₐₗ = ${totalEnergy.toExponential(3)} J<br>
        Συνολική ορμή: pₜₒₜₐₗ = ${totalMomentum.toExponential(3)} kg⋅m/s<br><br>
        
        <strong>Πίεση Ακτινοβολίας:</strong><br>
        Επιφάνεια δέσμης: A = ${beamArea * 1e4} cm²<br>
        Πίεση (πλήρης απορρόφηση): P = pₜₒₜₐₗ/A = ${radiationPressure.toExponential(3)} N/m²<br>
        
        <em>Η πίεση ακτινοβολίας χρησιμοποιείται σε ηλιακά πανιά</em>
    `;
    
    const resultDiv = document.getElementById('photonMomentumResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

function calculatePhotoelectricRealtime() {
    const wavelength = parseFloat(document.getElementById('wavelengthPhotoSlider')?.value || 400); // nm
    const workFunction = parseFloat(document.getElementById('metalSelect')?.value || 2.3); // eV
    
    const wavelengthM = wavelength * 1e-9;
    const frequency = CONSTANTS.C / wavelengthM;
    const photonEnergy = CONSTANTS.H * frequency;
    const photonEnergyEV = photonEnergy / CONSTANTS.E;
    
    const kineticEnergyEV = photonEnergyEV - workFunction;
    const threshold = workFunction * CONSTANTS.E / CONSTANTS.H; // threshold frequency
    const thresholdWavelength = CONSTANTS.C / threshold * 1e9; // nm
    
    let photoelectricEffect = '';
    if (photonEnergyEV > workFunction) {
        photoelectricEffect = `
            <span class="result-success">✓ Φωτοηλεκτρικό φαινόμενο συμβαίνει!</span><br>
            Κινητική ενέργεια ηλεκτρονίων: Ek = ${kineticEnergyEV.toFixed(3)} eV<br>
            Μέγιστη ταχύτητα: v = √(2Ek/m) = ${Math.sqrt(2 * kineticEnergyEV * CONSTANTS.E / 9.109e-31).toExponential(3)} m/s
        `;
    } else {
        photoelectricEffect = `
            <span class="result-error">✗ Δεν συμβαίνει φωτοηλεκτρικό φαινόμενο</span><br>
            Η ενέργεια φωτονίου είναι μικρότερη από το έργο εξόδου
        `;
    }
    
    const result = `
        <strong>Ανάλυση Φωτοηλεκτρικού Φαινομένου:</strong><br>
        Μήκος κύματος: λ = ${wavelength} nm<br>
        Ενέργεια φωτονίου: E = hf = ${photonEnergyEV.toFixed(3)} eV<br>
        Έργο εξόδου: φ = ${workFunction} eV<br><br>
        
        ${photoelectricEffect}<br><br>
        
        <strong>Κατώφλια:</strong><br>
        Συχνότητα κατωφλίου: f₀ = φ/h = ${threshold.toExponential(3)} Hz<br>
        Μήκος κύματος κατωφλίου: λ₀ = ${thresholdWavelength.toFixed(1)} nm
    `;
    
    const resultDiv = document.getElementById('photoelectricResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

function calculateWavePropertiesRealtime() {
    const frequency = parseFloat(document.getElementById('waveFreqCalcSlider')?.value || 1e9);
    
    const wavelength = CONSTANTS.C / frequency;
    const period = 1 / frequency;
    const angularFreq = 2 * Math.PI * frequency;
    const waveNumber = 2 * Math.PI / wavelength;
    const photonEnergy = CONSTANTS.H * frequency;
    const photonEnergyEV = photonEnergy / CONSTANTS.E;
    
    // Determine wave type
    let waveType = '';
    let color = '';
    if (wavelength > 1) {
        waveType = 'Ραδιοκύματα';
        color = '#ff6b6b';
    } else if (wavelength > 1e-3) {
        waveType = 'Μικροκύματα';
        color = '#4ecdc4';
    } else if (wavelength > 7e-7) {
        waveType = 'Υπέρυθρο';
        color = '#45b7d1';
    } else if (wavelength > 3.8e-7) {
        waveType = 'Ορατό φως';
        color = '#96ceb4';
    } else if (wavelength > 1e-8) {
        waveType = 'Υπεριώδες';
        color = '#feca57';
    } else if (wavelength > 1e-11) {
        waveType = 'Ακτίνες X';
        color = '#ff9ff3';
    } else {
        waveType = 'Ακτίνες γ';
        color = '#54a0ff';
    }
    
    const result = `
        <strong>Ιδιότητες Ηλεκτρομαγνητικού Κύματος:</strong><br>
        Συχνότητα: f = ${frequency.toExponential(3)} Hz<br>
        Μήκος κύματος: λ = c/f = ${wavelength.toExponential(3)} m<br>
        Περίοδος: T = 1/f = ${period.toExponential(3)} s<br>
        Γωνιακή συχνότητα: ω = 2πf = ${angularFreq.toExponential(3)} rad/s<br>
        Κυματάριθμος: k = 2π/λ = ${waveNumber.toExponential(3)} m⁻¹<br><br>
        
        <strong>Φωτονικές Ιδιότητες:</strong><br>
        Ενέργεια φωτονίου: E = hf = ${photonEnergy.toExponential(3)} J<br>
        Ενέργεια φωτονίου: E = ${photonEnergyEV.toFixed(3)} eV<br>
        Ορμή φωτονίου: p = h/λ = ${(CONSTANTS.H/wavelength).toExponential(3)} kg⋅m/s<br><br>
        
        <strong style="color: ${color}">Τύπος κύματος: ${waveType}</strong>
    `;
    
    const resultDiv = document.getElementById('wavePropertiesResult');
    if (resultDiv) resultDiv.innerHTML = result;
}

// Visualization Functions
function initializeVisualizations() {
    drawElectricField();
    drawCapacitorField();
    drawCircuitDiagram();
    drawMagneticField3D();
    initializeWaveAnimations();
    initializeSpectrumVisualization();
}

function drawElectricField() {
    const canvas = document.getElementById('electricFieldCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const charge = parseFloat(document.getElementById('chargeSlider')?.value || 5);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const chargeRadius = 15;
    
    // Draw charge
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
    const numLines = 16;
    const maxLength = 120;
    
    for (let i = 0; i < numLines; i++) {
        const angle = (2 * Math.PI * i) / numLines;
        drawFieldLine(ctx, centerX, centerY, angle, chargeRadius, maxLength, charge > 0);
    }
    
    // Draw equipotential lines
    ctx.strokeStyle = 'rgba(33, 128, 141, 0.3)';
    ctx.lineWidth = 1;
    for (let r = 30; r <= 100; r += 20) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    // Add labels
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Φορτίο: ${charge} μC`, 10, 25);
    ctx.fillText(`E ∝ q/r²`, 10, 45);
    ctx.fillText('Μπλε γραμμές: ισοδυναμικές', 10, canvas.height - 25);
}

function drawFieldLine(ctx, centerX, centerY, angle, startRadius, maxLength, isPositive) {
    const direction = isPositive ? 1 : -1;
    const startX = centerX + (startRadius + 5) * Math.cos(angle);
    const startY = centerY + (startRadius + 5) * Math.sin(angle);
    const endX = centerX + (startRadius + maxLength) * Math.cos(angle) * direction;
    const endY = centerY + (startRadius + maxLength) * Math.sin(angle) * direction;
    
    // Draw field line
    ctx.strokeStyle = '#21808d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Draw arrow
    const arrowLength = 12;
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

function drawCapacitorField() {
    const canvas = document.getElementById('capacitorFieldCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const type = document.getElementById('capacitorType')?.value || 'parallel';
    
    if (type === 'parallel') {
        drawParallelPlateField(ctx, canvas.width, canvas.height);
    } else if (type === 'cylindrical') {
        drawCylindricalField(ctx, canvas.width, canvas.height);
    } else {
        drawSphericalField(ctx, canvas.width, canvas.height);
    }
}

function drawParallelPlateField(ctx, width, height) {
    const plateWidth = 200;
    const plateThickness = 10;
    const separation = 100;
    const leftPlate = (width - plateWidth) / 2;
    const rightPlate = leftPlate + plateWidth;
    const topPlate = (height - separation) / 2;
    const bottomPlate = topPlate + separation;
    
    // Draw plates
    ctx.fillStyle = '#ff4444'; // Positive plate
    ctx.fillRect(leftPlate, topPlate - plateThickness, plateWidth, plateThickness);
    ctx.fillStyle = '#4444ff'; // Negative plate
    ctx.fillRect(leftPlate, bottomPlate, plateWidth, plateThickness);
    
    // Draw field lines
    ctx.strokeStyle = '#21808d';
    ctx.lineWidth = 2;
    const numLines = 12;
    for (let i = 0; i < numLines; i++) {
        const x = leftPlate + (plateWidth * (i + 1)) / (numLines + 1);
        ctx.beginPath();
        ctx.moveTo(x, topPlate);
        ctx.lineTo(x, bottomPlate);
        ctx.stroke();
        
        // Draw arrows
        const arrowY = topPlate + separation / 2;
        drawArrowDown(ctx, x, arrowY);
    }
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('+', leftPlate - 20, topPlate - 5);
    ctx.fillText('-', leftPlate - 20, bottomPlate + 15);
    ctx.fillText('Ομοιόμορφο πεδίο', width / 2, height - 20);
}

function drawCylindricalField(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const innerRadius = 30;
    const outerRadius = 120;
    
    // Draw cylinders
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.strokeStyle = '#4444ff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw radial field lines
    ctx.strokeStyle = '#21808d';
    ctx.lineWidth = 2;
    const numLines = 16;
    for (let i = 0; i < numLines; i++) {
        const angle = (2 * Math.PI * i) / numLines;
        const startX = centerX + innerRadius * Math.cos(angle);
        const startY = centerY + innerRadius * Math.sin(angle);
        const endX = centerX + outerRadius * Math.cos(angle);
        const endY = centerY + outerRadius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Draw arrow
        const midX = centerX + (innerRadius + outerRadius) / 2 * Math.cos(angle);
        const midY = centerY + (innerRadius + outerRadius) / 2 * Math.sin(angle);
        drawArrowRadial(ctx, midX, midY, angle);
    }
    
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('E ∝ 1/r', centerX, height - 20);
}

function drawSphericalField(ctx, width, height) {
    // Similar to cylindrical but with 3D perspective
    drawCylindricalField(ctx, width, height);
    
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Σφαιρικό πεδίο (2D προβολή)', width / 2, height - 20);
}

function drawArrowDown(ctx, x, y) {
    const arrowSize = 8;
    ctx.fillStyle = '#21808d';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - arrowSize/2, y - arrowSize);
    ctx.lineTo(x + arrowSize/2, y - arrowSize);
    ctx.closePath();
    ctx.fill();
}

function drawArrowRadial(ctx, x, y, angle) {
    const arrowSize = 8;
    ctx.fillStyle = '#21808d';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(arrowSize, 0);
    ctx.lineTo(0, -arrowSize/2);
    ctx.lineTo(0, arrowSize/2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawCircuitDiagram() {
    const canvas = document.getElementById('circuitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const R1 = parseFloat(document.getElementById('r1Slider')?.value || 10);
    const R2 = parseFloat(document.getElementById('r2Slider')?.value || 20);
    const V = parseFloat(document.getElementById('vSourceSlider')?.value || 12);
    const I = V / (R1 + R2);
    
    // Draw circuit components
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const circuitWidth = 200;
    const circuitHeight = 150;
    
    // Draw wires
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    
    // Top wire
    ctx.beginPath();
    ctx.moveTo(centerX - circuitWidth/2, centerY - circuitHeight/2);
    ctx.lineTo(centerX + circuitWidth/2, centerY - circuitHeight/2);
    ctx.stroke();
    
    // Bottom wire
    ctx.beginPath();
    ctx.moveTo(centerX - circuitWidth/2, centerY + circuitHeight/2);
    ctx.lineTo(centerX + circuitWidth/2, centerY + circuitHeight/2);
    ctx.stroke();
    
    // Left wire
    ctx.beginPath();
    ctx.moveTo(centerX - circuitWidth/2, centerY - circuitHeight/2);
    ctx.lineTo(centerX - circuitWidth/2, centerY + circuitHeight/2);
    ctx.stroke();
    
    // Right wire
    ctx.beginPath();
    ctx.moveTo(centerX + circuitWidth/2, centerY - circuitHeight/2);
    ctx.lineTo(centerX + circuitWidth/2, centerY + circuitHeight/2);
    ctx.stroke();
    
    // Draw voltage source
    drawVoltageSource(ctx, centerX - circuitWidth/2, centerY, V);
    
    // Draw resistors
    drawResistor(ctx, centerX, centerY - circuitHeight/2, R1, 'R1');
    drawResistor(ctx, centerX, centerY + circuitHeight/2, R2, 'R2');
    
    // Draw current arrows
    drawCurrentArrow(ctx, centerX + circuitWidth/4, centerY - circuitHeight/2 - 20, I);
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`I = ${I.toFixed(3)} A`, centerX, centerY - circuitHeight/2 - 40);
}

function drawVoltageSource(ctx, x, y, voltage) {
    const radius = 20;
    
    // Circle
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Plus and minus
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('+', x, y - 5);
    ctx.fillText('-', x, y + 15);
    
    // Voltage label
    ctx.font = '12px Arial';
    ctx.fillText(`${voltage}V`, x, y + radius + 15);
}

function drawResistor(ctx, x, y, resistance, label) {
    const width = 60;
    const height = 20;
    
    // Rectangle
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - width/2, y - height/2, width, height);
    
    // Zigzag pattern
    ctx.beginPath();
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
        const stepX = x - width/2 + (width * i) / steps;
        const stepY = y + (i % 2 === 0 ? -5 : 5);
        if (i === 0) ctx.moveTo(stepX, y);
        else ctx.lineTo(stepX, stepY);
    }
    ctx.lineTo(x + width/2, y);
    ctx.stroke();
    
    // Label
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${label} = ${resistance}Ω`, x, y + height/2 + 15);
}

function drawCurrentArrow(ctx, x, y, current) {
    const arrowLength = 30;
    
    // Arrow
    ctx.strokeStyle = '#ff4444';
    ctx.fillStyle = '#ff4444';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(x - arrowLength/2, y);
    ctx.lineTo(x + arrowLength/2, y);
    ctx.stroke();
    
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(x + arrowLength/2, y);
    ctx.lineTo(x + arrowLength/2 - 10, y - 5);
    ctx.lineTo(x + arrowLength/2 - 10, y + 5);
    ctx.closePath();
    ctx.fill();
}

function drawMagneticField3D() {
    const canvas = document.getElementById('magneticField3D');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const current = parseFloat(document.getElementById('currentMagSlider')?.value || 5);
    const geometry = document.getElementById('geometrySelect')?.value || 'straight';
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (geometry === 'straight') {
        drawStraightWireField(ctx, canvas.width, canvas.height, current);
    } else if (geometry === 'loop') {
        drawLoopField(ctx, canvas.width, canvas.height, current);
    } else {
        drawSolenoidField(ctx, canvas.width, canvas.height, current);
    }
}

function drawMagneticFlux() {
    const canvas = document.getElementById('magneticFluxCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const area = parseFloat(document.getElementById('fluxAreaSlider')?.value || 0.01);
    const angle = parseFloat(document.getElementById('fluxAngleSlider')?.value || 0);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const surfaceWidth = Math.sqrt(area) * 2000; // Scale for visualization
    const surfaceHeight = surfaceWidth * 0.6;
    
    // Draw uniform magnetic field lines (background)
    ctx.strokeStyle = 'rgba(33, 128, 141, 0.3)';
    ctx.lineWidth = 2;
    const fieldSpacing = 25;
    for (let x = 0; x < canvas.width; x += fieldSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        
        // Add field arrows
        for (let y = 20; y < canvas.height; y += 40) {
            drawArrowDown(ctx, x, y);
        }
    }
    
    // Draw surface (rectangle) tilted by angle
    const angleRad = angle * Math.PI / 180;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angleRad);
    
    // Surface
    ctx.fillStyle = 'rgba(255, 68, 68, 0.3)';
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 3;
    ctx.fillRect(-surfaceWidth/2, -surfaceHeight/2, surfaceWidth, surfaceHeight);
    ctx.strokeRect(-surfaceWidth/2, -surfaceHeight/2, surfaceWidth, surfaceHeight);
    
    // Normal vector
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -60);
    ctx.stroke();
    
    // Normal vector arrow
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.moveTo(0, -60);
    ctx.lineTo(-8, -45);
    ctx.lineTo(8, -45);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    
    // Draw angle arc
    if (angle > 0) {
        ctx.strokeStyle = '#134252';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, -Math.PI/2, -Math.PI/2 + angleRad);
        ctx.stroke();
        
        // Angle label
        ctx.fillStyle = '#134252';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`θ = ${angle}°`, centerX + 60, centerY + 20);
    }
    
    // Labels and info
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Μαγνητικό πεδίο B (ομοιόμορφο)', 10, 25);
    ctx.fillText(`Επιφάνεια: A = ${area} m²`, 10, 45);
    ctx.fillStyle = '#ff4444';
    ctx.fillText('Κόκκινο: Επιφάνεια & κάθετο διάνυσμα', 10, canvas.height - 40);
    ctx.fillStyle = '#21808d';
    ctx.fillText('Μπλε: Γραμμές μαγνητικού πεδίου', 10, canvas.height - 20);
}

function drawStraightWireField(ctx, width, height, current) {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw wire
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Current direction
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(current > 0 ? '⊙' : '⊗', centerX, 30);
    
    // Magnetic field circles
    const numCircles = 5;
    for (let i = 1; i <= numCircles; i++) {
        const radius = (150 * i) / numCircles;
        
        ctx.strokeStyle = `hsl(${180 + i * 30}, 70%, 50%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Field direction arrows
        drawMagneticFieldArrows(ctx, centerX, centerY, radius, current > 0);
    }
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Ρεύμα: ${current} A`, 10, 25);
    ctx.fillText('B ∝ I/r', 10, 45);
}

function drawLoopField(ctx, width, height, current) {
    const centerX = width / 2;
    const centerY = height / 2;
    const loopRadius = 80;
    
    // Draw current loop
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(centerX, centerY, loopRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Current direction arrows on loop
    const numArrows = 8;
    for (let i = 0; i < numArrows; i++) {
        const angle = (2 * Math.PI * i) / numArrows;
        const x = centerX + loopRadius * Math.cos(angle);
        const y = centerY + loopRadius * Math.sin(angle);
        const tangentAngle = angle + Math.PI / 2;
        drawArrowOnLoop(ctx, x, y, tangentAngle, current > 0);
    }
    
    // Magnetic dipole field lines
    drawDipoleField(ctx, centerX, centerY, current > 0);
    
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Μαγνητικός δίπολος`, 10, 25);
    ctx.fillText(`I = ${current} A`, 10, 45);
}

function drawSolenoidField(ctx, width, height, current) {
    const centerX = width / 2;
    const centerY = height / 2;
    const solenoidWidth = 200;
    const solenoidHeight = 80;
    
    // Draw solenoid coils
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    const numCoils = 8;
    for (let i = 0; i < numCoils; i++) {
        const x = centerX - solenoidWidth/2 + (solenoidWidth * i) / (numCoils - 1);
        ctx.beginPath();
        ctx.arc(x, centerY - solenoidHeight/2, 15, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, centerY + solenoidHeight/2, 15, Math.PI, 2 * Math.PI);
        ctx.stroke();
    }
    
    // Internal uniform field
    ctx.strokeStyle = '#21808d';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
        const x = centerX - solenoidWidth/2 + 20 + (solenoidWidth - 40) * i / 4;
        ctx.beginPath();
        ctx.moveTo(x, centerY - solenoidHeight/4);
        ctx.lineTo(x, centerY + solenoidHeight/4);
        ctx.stroke();
        
        drawArrowDown(ctx, x, centerY);
    }
    
    // External field
    drawSolenoidExternalField(ctx, centerX, centerY, solenoidWidth, solenoidHeight);
    
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Ομοιόμορφο πεδίο εσωτερικά', 10, 25);
    ctx.fillText(`B = μ₀nI = μ₀(N/l)I`, 10, 45);
}

function drawMagneticFieldArrows(ctx, centerX, centerY, radius, clockwise) {
    const numArrows = 12;
    for (let i = 0; i < numArrows; i++) {
        const angle = (2 * Math.PI * i) / numArrows;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const arrowAngle = clockwise ? angle + Math.PI/2 : angle - Math.PI/2;
        drawMagneticArrow(ctx, x, y, arrowAngle);
    }
}

function drawMagneticArrow(ctx, x, y, angle) {
    const arrowLength = 12;
    
    ctx.fillStyle = '#21808d';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    ctx.beginPath();
    ctx.moveTo(arrowLength/2, 0);
    ctx.lineTo(-arrowLength/2, -arrowLength/3);
    ctx.lineTo(-arrowLength/2, arrowLength/3);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

// Wave Animation Functions
function initializeWaveAnimations() {
    initializeLinearWave();
    initializeCircularWave();
    initializeEllipticalWave();
    initializeInterferenceWave();
    initializeFieldCoupling();
}

function initializeLinearWave() {
    const canvas = document.getElementById('linearWaveCanvas');
    if (!canvas) return;
    
    let time = 0;
    
    function animate() {
        if (animationStates.linearWave) {
            drawLinearWave(canvas, time);
            time += 0.05;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function drawLinearWave(canvas, time) {
    const ctx = canvas.getContext('2d');
    const frequency = parseFloat(document.getElementById('linearFreqSlider')?.value || 1);
    const amplitude = parseFloat(document.getElementById('linearAmpSlider')?.value || 50);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const wavelength = 200;
    const k = 2 * Math.PI / wavelength;
    const omega = 2 * Math.PI * frequency;
    
    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    
    // E field (vertical, red)
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 2) {
        const E = amplitude * Math.sin(k * x - omega * time);
        const y = centerY - E;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // B field (horizontal representation, blue)
    ctx.strokeStyle = '#4444ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 2) {
        const B = amplitude * Math.sin(k * x - omega * time) * 0.4;
        const y = centerY + 80;
        if (x === 0) ctx.moveTo(x, y + B);
        else ctx.lineTo(x, y + B);
    }
    ctx.stroke();
    
    // Direction arrow
    drawPropagationArrow(ctx, canvas.width - 80, 30);
    
    // Labels
    ctx.fillStyle = '#ff4444';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('E (Ηλεκτρικό)', 10, 30);
    
    ctx.fillStyle = '#4444ff';
    ctx.fillText('B (Μαγνητικό)', 10, centerY + 120);
    
    ctx.fillStyle = '#21808d';
    ctx.fillText('Κατεύθυνση: +z', canvas.width - 120, 50);
    
    // Wave properties
    ctx.fillStyle = '#134252';
    ctx.font = '12px Arial';
    ctx.fillText(`f = ${frequency} Hz`, 10, canvas.height - 40);
    ctx.fillText(`λ = ${wavelength} pixels`, 10, canvas.height - 20);
}

function initializeCircularWave() {
    const canvas = document.getElementById('circularWaveCanvas');
    if (!canvas) return;
    
    let time = 0;
    
    function animate() {
        if (animationStates.circularWave) {
            drawCircularWave(canvas, time);
            time += 0.05;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function drawCircularWave(canvas, time) {
    const ctx = canvas.getContext('2d');
    const frequency = parseFloat(document.getElementById('circularFreqSlider')?.value || 1);
    const direction = document.getElementById('circularDirection')?.value || 'right';
    const amplitude = 40;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const wavelength = 200;
    const k = 2 * Math.PI / wavelength;
    const omega = 2 * Math.PI * frequency;
    const chirality = direction === 'right' ? 1 : -1;
    
    // Draw wave in multiple positions
    for (let x = 0; x < canvas.width; x += 4) {
        const phase = k * x - omega * time;
        const Ex = amplitude * Math.cos(phase);
        const Ey = amplitude * Math.sin(phase) * chirality;
        
        // Draw E vector
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x + Ex, centerY - Ey);
        ctx.stroke();
        
        // Draw vector tip
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(x + Ex, centerY - Ey, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Draw circular motion diagram
    drawCircularMotionDiagram(ctx, 100, 100, amplitude, omega * time, chirality);
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${direction === 'right' ? 'Δεξιόστροφη' : 'Αριστερόστροφη'} πόλωση`, 10, 30);
    ctx.fillText('Ex = E₀cos(kz - ωt)', 10, canvas.height - 40);
    ctx.fillText(`Ey = ${chirality > 0 ? '+' : '-'}E₀sin(kz - ωt)`, 10, canvas.height - 20);
}

function drawCircularMotionDiagram(ctx, centerX, centerY, radius, phase, chirality) {
    // Circle
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Current position
    const x = centerX + radius * Math.cos(phase);
    const y = centerY - radius * Math.sin(phase) * chirality;
    
    // Vector
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Vector tip
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    // Axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - radius - 10, centerY);
    ctx.lineTo(centerX + radius + 10, centerY);
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX, centerY + radius + 10);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Ex', centerX + radius + 15, centerY + 5);
    ctx.fillText('Ey', centerX - 5, centerY - radius - 5);
}

function initializeEllipticalWave() {
    const canvas = document.getElementById('ellipticalWaveCanvas');
    if (!canvas) return;
    
    let time = 0;
    
    function animate() {
        if (animationStates.ellipticalWave) {
            drawEllipticalWave(canvas, time);
            time += 0.05;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function drawEllipticalWave(canvas, time) {
    const ctx = canvas.getContext('2d');
    const Ex0 = parseFloat(document.getElementById('exSlider')?.value || 50);
    const Ey0 = parseFloat(document.getElementById('eySlider')?.value || 30);
    const phase = parseFloat(document.getElementById('phaseSlider')?.value || 45) * Math.PI / 180;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const wavelength = 200;
    const k = 2 * Math.PI / wavelength;
    const omega = 2 * Math.PI; // 1 Hz
    
    // Draw wave
    for (let x = 0; x < canvas.width; x += 8) {
        const wavePhase = k * x - omega * time;
        const Ex = Ex0 * Math.cos(wavePhase);
        const Ey = Ey0 * Math.cos(wavePhase + phase);
        
        // Draw E vector
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x + Ex/2, centerY - Ey/2);
        ctx.stroke();
        
        // Vector tip
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(x + Ex/2, centerY - Ey/2, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Draw ellipse diagram
    drawEllipseDiagram(ctx, 150, 100, Ex0, Ey0, phase, omega * time);
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Ελλειπτική πόλωση', 10, 30);
    ctx.fillText(`Ex₀ = ${Ex0}, Ey₀ = ${Ey0}`, 10, canvas.height - 40);
    ctx.fillText(`Διαφορά φάσης: ${(phase * 180 / Math.PI).toFixed(0)}°`, 10, canvas.height - 20);
}

function drawEllipseDiagram(ctx, centerX, centerY, Ex0, Ey0, phase, time) {
    // Draw ellipse path
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
        const x = centerX + (Ex0/2) * Math.cos(t);
        const y = centerY - (Ey0/2) * Math.cos(t + phase);
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Current position
    const x = centerX + (Ex0/2) * Math.cos(time);
    const y = centerY - (Ey0/2) * Math.cos(time + phase);
    
    // Vector
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Vector tip
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    // Axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - Ex0/2 - 10, centerY);
    ctx.lineTo(centerX + Ex0/2 + 10, centerY);
    ctx.moveTo(centerX, centerY - Ey0/2 - 10);
    ctx.lineTo(centerX, centerY + Ey0/2 + 10);
    ctx.stroke();
}

function updateLinearWave() {
    // Animation is continuous, just update parameters
}

function updateCircularWave() {
    // Animation is continuous, just update parameters
}

function updateEllipticalWave() {
    // Animation is continuous, just update parameters
}

function toggleLinearWave() {
    animationStates.linearWave = !animationStates.linearWave;
    const btn = document.getElementById('playLinear');
    if (btn) btn.textContent = animationStates.linearWave ? 'Παύση' : 'Εκκίνηση';
}

function toggleCircularWave() {
    animationStates.circularWave = !animationStates.circularWave;
    const btn = document.getElementById('playCircular');
    if (btn) btn.textContent = animationStates.circularWave ? 'Παύση' : 'Εκκίνηση';
}

function toggleEllipticalWave() {
    animationStates.ellipticalWave = !animationStates.ellipticalWave;
    const btn = document.getElementById('playElliptical');
    if (btn) btn.textContent = animationStates.ellipticalWave ? 'Παύση' : 'Εκκίνηση';
}

function toggleFieldCoupling() {
    animationStates.fieldCoupling = !animationStates.fieldCoupling;
    const btn = document.getElementById('toggleCoupling');
    if (btn) btn.textContent = animationStates.fieldCoupling ? 'Παύση' : 'Εκκίνηση Animation';
}

// Enhanced Quiz System
function initializeQuiz() {
    currentQuizQuestion = 0; // Start at 0 so updateQuizProgress shows 0/10 initially
    updateQuizProgress();
    currentQuizQuestion = 1; // Then set to 1 for the first question
    showQuizQuestion(1);
}

function showQuizQuestion(questionNumber) {
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach(q => q.classList.remove('active'));
    
    const targetQuestion = document.getElementById(`question${questionNumber}`);
    if (targetQuestion) {
        targetQuestion.classList.add('active');
    }
    
    currentQuizQuestion = questionNumber;
    updateQuizNavigation();
}

function nextQuestion() {
    if (currentQuizQuestion < totalQuizQuestions) {
        showQuizQuestion(currentQuizQuestion + 1);
        updateQuizProgress(); // Add this line
    }
}

function previousQuestion() {
    if (currentQuizQuestion > 1) {
        showQuizQuestion(currentQuizQuestion - 1);
        updateQuizProgress(); // Add this line
    }
}

function updateQuizNavigation() {
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    const submitBtn = document.getElementById('submitQuiz');
    
    if (prevBtn) prevBtn.style.display = currentQuizQuestion === 1 ? 'none' : 'inline-flex';
    if (nextBtn) nextBtn.style.display = currentQuizQuestion === totalQuizQuestions ? 'none' : 'inline-flex';
    if (submitBtn) submitBtn.style.display = currentQuizQuestion === totalQuizQuestions ? 'inline-flex' : 'none';
}

function updateQuizProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        // For progress bar, show actual progress (0% when on question 0, 10% when on question 1, etc.)
        const percentage = (currentQuizQuestion / totalQuizQuestions) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        // For text, show current question / total (but never show 0/10, show 1/10 minimum)
        const displayQuestion = Math.max(1, currentQuizQuestion);
        progressText.textContent = `${displayQuestion}/${totalQuizQuestions}`;
    }
}

function submitQuiz() {
    const correctAnswers = [1, 1, 1, 1, 0, 1, 2, 1, 2, 2]; // Answer indices
    const explanations = [
        'Για μη-ομοιόμορφη κατανομή πρέπει να υπολογιστεί το γραμμικό ολοκλήρωμα του λ κατά μήκος της γραμμής.',
        'Το ηλεκτρικό πεδίο παράγεται από στατικά φορτία, ενώ το μαγνητικό από κινούμενα φορτία (ρεύματα).',
        'Ένα στατικό φορτίο δεν δέχεται μαγνητική δύναμη επειδή η δύναμη Lorentz απαιτεί κίνηση (F = q(u × B)).',
        'Η μηδενική μαγνητική ροή σημαίνει ότι δεν υπάρχουν μαγνητικοί μονόπολοι - οι γραμμές πεδίου είναι κλειστές.',
        'Το ρεύμα μετατόπισης επιτρέπει τη δημιουργία μαγνητικού πεδίου από μεταβαλλόμενο ηλεκτρικό πεδίο.',
        'Ο σωστός τύπος περιλαμβάνει τη σχετική διηλεκτρική σταθερά εᵣ.',
        'Η ταχύτητα ηλεκτρομαγνητικών κυμάτων στο κενό είναι σταθερή και ίση με την ταχύτητα του φωτός.',
        'Η ενέργεια φωτονίου δίνεται από τη σχέση του Planck: E = hf.',
        'Το διάνυσμα Poynting εκφράζει τη ροή ηλεκτρομαγνητικής ενέργειας.',
        'Ο νόμος Faraday περιγράφεται από την εξίσωση ∇×E = -∂B/∂t.'
    ];
    
    let score = 0;
    
    for (let i = 1; i <= totalQuizQuestions; i++) {
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
            const correctAnswer = correctAnswers[i - 1];
            
            if (selectedValue === correctAnswer) {
                score++;
                selectedAnswer.parentElement.classList.add('correct');
            } else {
                selectedAnswer.parentElement.classList.add('incorrect');
                questionOptions[correctAnswer].parentElement.classList.add('correct');
            }
        } else {
            questionOptions[correctAnswers[i - 1]].parentElement.classList.add('correct');
        }
        
        if (explanationDiv) {
            explanationDiv.innerHTML = `<strong>Εξήγηση:</strong> ${explanations[i - 1]}`;
            explanationDiv.classList.add('visible');
        }
    }
    
    // Show results
    const percentage = (score / totalQuizQuestions * 100).toFixed(1);
    let grade = '';
    let gradeColor = '';
    
    if (percentage >= 90) { grade = 'Άριστα!'; gradeColor = '#2e8b57'; }
    else if (percentage >= 80) { grade = 'Πολύ καλά!'; gradeColor = '#32cd32'; }
    else if (percentage >= 70) { grade = 'Καλά!'; gradeColor = '#ffa500'; }
    else if (percentage >= 60) { grade = 'Μέτρια'; gradeColor = '#ff6347'; }
    else { grade = 'Χρειάζεται περισσότερη μελέτη'; gradeColor = '#dc143c'; }
    
    const resultsDiv = document.getElementById('quizResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <h3>Αποτελέσματα Quiz</h3>
            <p><strong>Σκόρ: ${score}/${totalQuizQuestions} (${percentage}%)</strong></p>
            <p style="color: ${gradeColor}; font-size: 1.2em;"><strong>${grade}</strong></p>
            <p>Για επιτυχία στο μάθημα χρειάζεστε βαθμό ≥ 50%</p>
            <button onclick="resetQuiz()" class="btn btn--secondary">Επανάληψη Quiz</button>
        `;
        resultsDiv.classList.add('show');
    }
    
    // Hide navigation
    document.querySelector('.quiz-navigation').style.display = 'none';
    updateQuizProgress();
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
    if (resultsDiv) {
        resultsDiv.classList.remove('show');
        resultsDiv.innerHTML = '';
    }
    
    // Show navigation
    document.querySelector('.quiz-navigation').style.display = 'flex';
    
    // Go back to first question
    currentQuizQuestion = 1;
    showQuizQuestion(1);
    updateQuizProgress();
}

// Helper functions for spectrum and other visualizations
function initializeSpectrumVisualization() {
    updateSpectrumInfo();
}

function updateSpectrumInfo() {
    const frequency = parseFloat(document.getElementById('spectrumFreqSlider')?.value || 5e14);
    const wavelength = CONSTANTS.C / frequency;
    
    let info = '';
    let color = '';
    
    if (wavelength > 1e-1) {
        info = 'Ραδιοκύματα - Τηλεπικοινωνίες, ραδιόφωνο';
        color = '#ff6b6b';
    } else if (wavelength > 1e-3) {
        info = 'Μικροκύματα - Κινητά τηλέφωνα, WiFi, φούρνος μικροκυμάτων';
        color = '#4ecdc4';
    } else if (wavelength > 7e-7) {
        info = 'Υπέρυθρο - Θερμική ακτινοβολία, τηλεκοντρόλ';
        color = '#45b7d1';
    } else if (wavelength > 3.8e-7) {
        info = 'Ορατό φως - Όραση, φωτογραφία';
        color = '#96ceb4';
    } else if (wavelength > 1e-8) {
        info = 'Υπεριώδες - Αποστείρωση, φθορισμός';
        color = '#feca57';
    } else if (wavelength > 1e-11) {
        info = 'Ακτίνες X - Ιατρική διάγνωση, κρυσταλλογραφία';
        color = '#ff9ff3';
    } else {
        info = 'Ακτίνες γ - Πυρηνικές αντιδράσεις, ογκολογία';
        color = '#54a0ff';
    }
    
    const infoDiv = document.getElementById('spectrumInfo');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div style="color: ${color}; font-weight: bold; margin-bottom: 8px;">
                ${info}
            </div>
            <div>
                Συχνότητα: ${frequency.toExponential(2)} Hz<br>
                Μήκος κύματος: ${wavelength.toExponential(2)} m<br>
                Ενέργεια φωτονίου: ${(CONSTANTS.H * frequency / CONSTANTS.E).toFixed(3)} eV
            </div>
        `;
    }
}

// Section-specific initialization
function initializeSectionSpecific(sectionId) {
    switch (sectionId) {
        case 'electrostatics': // Added for initial draw when section is shown
            drawElectricField();
            break;
        case 'capacitors':
            calculateCapacitanceRealtime();
            break;
        case 'current':
            calculateOhmRealtime();
            calculatePowerRealtime(); // Added for initial calculation
            calculateCircuitRealtime(); // Added for initial draw
            drawIVGraph(); // Added for initial I-V graph draw
            break;
        case 'magnetostatics':
            drawMagneticField3D();
            drawMagneticFlux();
            break;
        case 'waves':
            initializeWaveAnimations();
            initializeInterferenceWave();
            break;
        case 'energy':
            calculatePoyntingRealtime();
            calculatePhotoelectricRealtime(); // Added for initial calculation
            updatePoyntingVisualization(); // Added for initial call (stubbed)
            updatePhotoelectricVisualization(); // Added for initial call (stubbed)
            break;
        case 'quiz':
            updateQuizProgress();
            break;
    }
}

function initializeTabSpecific(tabId) {
    // Tab-specific initialization if needed
    if (tabId.includes('capacitor') || tabId.includes('method')) {
        calculateCapacitanceRealtime();
    }
}

// Additional helper functions
function drawPropagationArrow(ctx, x, y) {
    ctx.strokeStyle = '#21808d';
    ctx.fillStyle = '#21808d';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(x - 30, y);
    ctx.lineTo(x + 10, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x, y - 8);
    ctx.lineTo(x, y + 8);
    ctx.closePath();
    ctx.fill();
}

function drawIVGraph() {
    const canvas = document.getElementById('ivCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    // Use resistanceGraphSlider for the I-V graph display
    const resistance = parseFloat(document.getElementById('resistanceGraphSlider')?.value || 10); 
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw axes
    const marginX = 60;
    const marginY = 50;
    const graphWidth = canvas.width - 2 * marginX;
    const graphHeight = canvas.height - 2 * marginY;
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, marginY + graphHeight);
    ctx.lineTo(marginX + graphWidth, marginY + graphHeight);
    ctx.stroke();
    
    // Draw I-V line
    ctx.strokeStyle = '#21808d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(marginX, marginY + graphHeight);
    ctx.lineTo(marginX + graphWidth, marginY);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Τάση (V)', marginX + graphWidth/2, canvas.height - 10);
    
    ctx.save();
    ctx.translate(15, marginY + graphHeight/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText('Ρεύμα (A)', 0, 0);
    ctx.restore();
    
    // Graph title
    ctx.textAlign = 'center';
    ctx.font = '16px Arial';
    ctx.fillText(`I-V Χαρακτηριστική (R = ${resistance}Ω)`, canvas.width/2, 25);
    ctx.font = '12px Arial';
    ctx.fillText('Κλίση = 1/R', canvas.width/2, 45);
}

// Field coupling animation
function initializeFieldCoupling() {
    const canvas = document.getElementById('fieldCouplingCanvas');
    if (!canvas) return;
    
    let time = 0;
    
    function animate() {
        if (animationStates.fieldCoupling) {
            drawFieldCoupling(canvas, time);
            time += 0.05;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function drawFieldCoupling(canvas, time) {
    if (!canvas) {
        const canvasElement = document.getElementById('fieldCouplingCanvas');
        if (!canvasElement) return;
        canvas = canvasElement;
    }
    
    const ctx = canvas.getContext('2d');
    const frequency = parseFloat(document.getElementById('couplingFreqSlider')?.value || 1);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const omega = 2 * Math.PI * frequency;
    
    // Draw time-varying fields
    const numPositions = 8;
    for (let i = 0; i < numPositions; i++) {
        const x = 100 + i * 80;
        const phase = omega * time + i * Math.PI / 4;
        
        // E field (vertical)
        const E = 60 * Math.sin(phase);
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x, centerY - E);
        ctx.stroke();
        
        // B field (horizontal)
        const B = 40 * Math.cos(phase);
        ctx.strokeStyle = '#4444ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, centerY + 80);
        ctx.lineTo(x + B, centerY + 80);
        ctx.stroke();
        
        // Connection lines showing coupling
        if (Math.abs(E) > 10) {
            ctx.strokeStyle = 'rgba(33, 128, 141, 0.3)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(x, centerY - E);
            ctx.lineTo(x + B, centerY + 80);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Σύζευξη Πεδίων - Εξισώσεις Maxwell', 10, 30);
    ctx.font = '12px Arial';
    ctx.fillText('∇×E = -∂B/∂t', 10, 50);
    ctx.fillText('∇×B = μ₀ε₀∂E/∂t', 10, 70);
}

// Initialize interference wave
function initializeInterferenceWave() {
    const canvas = document.getElementById('interferenceCanvas');
    if (!canvas) return;
    
    // Draw initial interference pattern
    drawInterference(canvas);
    
    function animate() {
        if (animationStates.interference) {
            drawInterference(canvas);
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function drawInterference(canvas) {
    if (!canvas) {
        canvas = document.getElementById('interferenceCanvas');
        if (!canvas) return;
    }
    
    const ctx = canvas.getContext('2d');
    const amp1 = parseFloat(document.getElementById('amp1Slider')?.value || 30);
    const amp2 = parseFloat(document.getElementById('amp2Slider')?.value || 30);
    const phaseDiff = parseFloat(document.getElementById('phaseDiffSlider')?.value || 0) * Math.PI / 180;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const wavelength = 100;
    const k = 2 * Math.PI / wavelength;
    
    // Draw individual waves and interference
    ctx.lineWidth = 2;
    
    for (let x = 0; x < canvas.width; x += 2) {
        // Wave 1
        const y1 = centerY - 100 + amp1 * Math.sin(k * x);
        // Wave 2
        const y2 = centerY + amp2 * Math.sin(k * x + phaseDiff);
        // Interference
        const y3 = centerY + 100 + (amp1 * Math.sin(k * x) + amp2 * Math.sin(k * x + phaseDiff));
        
        // Draw waves
        ctx.strokeStyle = '#ff4444';
        if (x === 0) {
            ctx.beginPath();
            ctx.moveTo(x, y1);
        } else {
            ctx.lineTo(x, y1);
        }
        
        ctx.strokeStyle = '#4444ff';
        if (x === 0) {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y2);
        } else {
            ctx.lineTo(x, y2);
        }
        
        ctx.strokeStyle = '#21808d';
        if (x === 0) {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y3);
        } else {
            ctx.lineTo(x, y3);
        }
    }
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#134252';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Συμβολή Κυμάτων', 10, 25);
    ctx.fillStyle = '#ff4444';
    ctx.fillText('Κύμα 1', 10, centerY - 80);
    ctx.fillStyle = '#4444ff';
    ctx.fillText('Κύμα 2', 10, centerY + 20);
    ctx.fillStyle = '#21808d';
    ctx.fillText('Αποτέλεσμα', 10, centerY + 120);
    
    // Interference type
    const resultantAmp = Math.sqrt(amp1*amp1 + amp2*amp2 + 2*amp1*amp2*Math.cos(phaseDiff));
    const interferenceType = Math.abs(phaseDiff % (2*Math.PI)) < 0.5 ? 'Εποικοδομητική' : 'Καταστρεπτική';
    
    ctx.fillStyle = '#134252';
    ctx.font = '12px Arial';
    ctx.fillText(`${interferenceType} συμβολή`, 10, 45);
    ctx.fillText(`Πλάτος αποτελέσματος: ${resultantAmp.toFixed(1)}`, 10, 65);
}

// Additional visualization helper functions
function updatePoyntingVisualization() {
    const freqSlider = document.getElementById('poyntingFreqSlider');
    const eFieldSlider = document.getElementById('eFieldSlider');
    const statusElem = document.getElementById('poyntingVisStatus');
    
    if (statusElem) {
        if (freqSlider && eFieldSlider) {
            const freq = parseFloat(freqSlider.value);
            const eField = parseFloat(eFieldSlider.value);
            const wavelength = CONSTANTS.C / freq;
            const intensity = 0.5 * CONSTANTS.EPSILON_0 * CONSTANTS.C * eField * eField;
            
            statusElem.innerHTML = `
                <strong>Παραμετροποίηση 3D Οπτικοποίησης:</strong><br>
                Συχνότητα: ${freq} Hz | Μήκος κύματος: ${wavelength.toFixed(1)} m<br>
                Ηλεκτρικό πεδίο: ${eField} V/m | Ένταση: ${intensity.toExponential(2)} W/m²
            `;
            statusElem.className = 'visualization-status';
        } else {
            statusElem.innerHTML = 'Φόρτωση παραμέτρων οπτικοποίησης...';
            statusElem.className = 'visualization-status loading';
        }
    }
}

function updatePhotoelectricVisualization() {
    const intensitySlider = document.getElementById('intensityPhotoSlider');
    const wavelengthSlider = document.getElementById('wavelengthPhotoSlider');
    const metalSelect = document.getElementById('metalSelect');
    const statusElem = document.getElementById('photoelectricVisStatus');
    
    if (statusElem) {
        if (intensitySlider && wavelengthSlider && metalSelect) {
            const intensity = parseFloat(intensitySlider.value);
            const wavelength = parseFloat(wavelengthSlider.value);
            const workFunction = parseFloat(metalSelect.value);
            const metalName = metalSelect.options[metalSelect.selectedIndex].text;
            
            const photonEnergy = CONSTANTS.H * CONSTANTS.C / (wavelength * 1e-9) / CONSTANTS.E;
            const willEmit = photonEnergy > workFunction;
            
            statusElem.innerHTML = `
                <strong>Παράμετροι Προσομοίωσης:</strong><br>
                Μέταλλο: ${metalName} | Ένταση: ${intensity}%<br>
                Φωτόνια: ${photonEnergy.toFixed(2)} eV | ${willEmit ? '✓ Εκπομπή ηλεκτρονίων' : '✗ Χωρίς εκπομπή'}
            `;
            statusElem.className = 'visualization-status';
        } else {
            statusElem.innerHTML = 'Φόρτωση παραμέτρων προσομοίωσης...';
            statusElem.className = 'visualization-status loading';
        }
    }
}

function runDualityDemo() {
    const dualityType = document.getElementById('dualityType')?.value || 'interference';
    
    // This would run different demonstrations of wave-particle duality
    // depending on the selected type
    
    const resultDiv = document.getElementById('dualityResult');
    if (resultDiv) {
        let result = '';
        switch (dualityType) {
            case 'interference':
                result = 'Επίδειξη συμβολής φωτός - κυματική συμπεριφορά';
                break;
            case 'photoelectric':
                result = 'Φωτοηλεκτρικό φαινόμενο - σωματιδιακή συμπεριφορά';
                break;
            case 'compton':
                result = 'Σκέδαση Compton - φωτόνια ως σωματίδια';
                break;
        }
        resultDiv.innerHTML = result;
    }
}

// Missing helper functions for magnetic field visualizations
function drawArrowOnLoop(ctx, x, y, angle, clockwise) {
    const arrowLength = 10;
    const direction = clockwise ? 1 : -1;
    
    ctx.fillStyle = '#8B4513';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * direction);
    
    ctx.beginPath();
    ctx.moveTo(arrowLength/2, 0);
    ctx.lineTo(-arrowLength/2, -arrowLength/3);
    ctx.lineTo(-arrowLength/2, arrowLength/3);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

function drawDipoleField(ctx, centerX, centerY, positive) {
    // Draw simplified magnetic dipole field lines
    const numLines = 8;
    const radius = 120;
    
    ctx.strokeStyle = '#21808d';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < numLines; i++) {
        const angle = (2 * Math.PI * i) / numLines;
        
        // Draw field lines that curve around like a dipole
        ctx.beginPath();
        const startX = centerX + 80 * Math.cos(angle);
        const startY = centerY + 80 * Math.sin(angle);
        
        // Create curved field lines
        const controlX = centerX + radius * Math.cos(angle + Math.PI/4);
        const controlY = centerY + radius * Math.sin(angle + Math.PI/4);
        const endX = centerX + 80 * Math.cos(angle + Math.PI);
        const endY = centerY + 80 * Math.sin(angle + Math.PI);
        
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.stroke();
        
        // Draw arrow on field line
        const midX = centerX + (radius * 0.7) * Math.cos(angle + Math.PI/8);
        const midY = centerY + (radius * 0.7) * Math.sin(angle + Math.PI/8);
        drawMagneticArrow(ctx, midX, midY, angle + Math.PI/8);
    }
}

function drawSolenoidExternalField(ctx, centerX, centerY, width, height) {
    // Draw external field lines for solenoid
    ctx.strokeStyle = '#21808d';
    ctx.lineWidth = 2;
    
    const numLines = 6;
    for (let i = 0; i < numLines; i++) {
        const y = centerY - height/2 + (height * i) / (numLines - 1);
        
        // Left side external field
        ctx.beginPath();
        ctx.moveTo(centerX - width/2 - 30, y);
        ctx.quadraticCurveTo(centerX - width/2 - 60, centerY - height, centerX - width/2, centerY - height/2 - 20);
        ctx.stroke();
        
        // Right side external field
        ctx.beginPath();
        ctx.moveTo(centerX + width/2, centerY + height/2 + 20);
        ctx.quadraticCurveTo(centerX + width/2 + 60, centerY + height, centerX + width/2 + 30, y);
        ctx.stroke();
    }
}

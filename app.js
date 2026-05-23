/* ==========================================================================
   Turbo Robots // Fusion Lab — Central Application Engine
   ========================================================================== */

// --- Global Application State ---
const state = {
    selectedChar: 'akmal',
    selectedRobot: 'Neon',
    userPromptActive: false,
    cssSlotCard: null,
    jsSlotCard: null,
    streamCards: [],
    customComponentIndex: 1,
    activeTab: 'html-css'
};

// --- Robots Configuration & Mock Generators ---
const robots = {
    Neon: {
        avatar: '🎨',
        name: 'NEON v3.5',
        role: 'CSS Wizard',
        desc: 'Specializes in glassmorphic layouts, aurora glows, and fluid responsive design.',
        generate: (prompt) => {
            const cleanPrompt = prompt.toLowerCase();
            let name = "Visual Widget Layout";
            let css = "";
            let html = "";
            let desc = "Custom styled design sheet.";

            if (cleanPrompt.includes('clock') || cleanPrompt.includes('time')) {
                name = "Glow Neon Clock Canvas";
                desc = "Ultra-premium glassmorphic digital clock container with glowing numeric dials.";
                html = `
<div class="neon-clock-card">
    <div class="clock-display">
        <span id="hours">12</span><span class="colon">:</span><span id="minutes">45</span><span class="colon">:</span><span id="seconds">00</span>
    </div>
    <div class="clock-label">ESTABLISHED SESSION // TURBO TIME</div>
    <button class="control-btn" id="btn-toggle-clock">PAUSE LOG</button>
</div>`;
                css = `
.neon-clock-card {
    background: rgba(13, 17, 33, 0.7);
    border: 1px solid rgba(0, 242, 254, 0.3);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 242, 254, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    width: 300px;
    margin: 2rem auto;
    font-family: 'Outfit', sans-serif;
}
.clock-display {
    font-size: 2.5rem;
    font-weight: 800;
    font-family: 'Fira Code', monospace;
    color: #f8f9fa;
    text-shadow: 0 0 10px #00f2fe, 0 0 20px #00f2fe;
    margin-bottom: 1rem;
    letter-spacing: 2px;
}
.colon {
    animation: blink 1s infinite;
}
@keyframes blink {
    50% { opacity: 0.3; }
}
.clock-label {
    font-size: 0.65rem;
    color: #a0aec0;
    font-family: 'Fira Code', monospace;
    margin-bottom: 1.5rem;
}
.control-btn {
    background: linear-gradient(135deg, #00f2fe, #4facfe);
    color: #070913;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.5rem;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
    transition: all 0.2s ease;
}
.control-btn:hover {
    box-shadow: 0 0 15px rgba(0, 242, 254, 0.5);
    transform: translateY(-1px);
}`;
            } else if (cleanPrompt.includes('stopwatch') || cleanPrompt.includes('timer')) {
                name = "Cyberpunk Chrono Frame";
                desc = "High-fidelity stopwatch interface with ambient orange accents.";
                html = `
<div class="chrono-frame">
    <div class="chrono-title">⚡ CHRONO PIPELINE</div>
    <div class="chrono-time" id="stopwatch-display">00:00.00</div>
    <div class="chrono-controls">
        <button class="chrono-btn" id="chrono-start">START</button>
        <button class="chrono-btn stop" id="chrono-stop">STOP</button>
        <button class="chrono-btn reset" id="chrono-reset">RESET</button>
    </div>
</div>`;
                css = `
.chrono-frame {
    background: rgba(13, 17, 33, 0.75);
    border: 1px solid rgba(255, 110, 0, 0.3);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 110, 0, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 2rem;
    width: 320px;
    margin: 2rem auto;
    text-align: center;
    font-family: 'Outfit', sans-serif;
}
.chrono-title {
    font-family: 'Fira Code', monospace;
    font-size: 0.7rem;
    color: #ff6e00;
    margin-bottom: 1rem;
    letter-spacing: 1px;
}
.chrono-time {
    font-size: 2.75rem;
    font-weight: 800;
    font-family: 'Fira Code', monospace;
    color: #f8f9fa;
    text-shadow: 0 0 10px #ff6e00;
    margin-bottom: 1.5rem;
}
.chrono-controls {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
}
.chrono-btn {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 0.5rem 1rem;
    color: #f8f9fa;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
}
.chrono-btn:hover {
    border-color: #ff6e00;
    background: rgba(255, 110, 0, 0.1);
}
.chrono-btn.stop:hover {
    border-color: #ff0055;
    background: rgba(255, 0, 85, 0.1);
}
.chrono-btn.reset:hover {
    border-color: #a0aec0;
    background: rgba(160, 174, 192, 0.1);
}`;
            } else {
                // Default: Audio Visualizer or standard visual widget
                name = "Radial Pulsar Deck";
                desc = "Aesthetic ambient soundwaves layout with active feedback widgets.";
                html = `
<div class="pulsar-deck">
    <div class="pulsar-circle" id="visualizer-core">
        <div class="inner-pulse"></div>
    </div>
    <div class="eq-bars">
        <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
    </div>
    <button class="pulse-trigger" id="audio-toggle">ENGAGE AUDIO STREAM</button>
</div>`;
                css = `
.pulsar-deck {
    background: rgba(13, 17, 33, 0.7);
    border: 1px solid rgba(157, 78, 221, 0.3);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 15px rgba(157, 78, 221, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 2rem;
    width: 280px;
    margin: 2rem auto;
    text-align: center;
    font-family: 'Outfit', sans-serif;
}
.pulsar-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(157, 78, 221, 0.1);
    border: 2px solid #9d4edd;
    box-shadow: 0 0 20px rgba(157, 78, 221, 0.3);
    margin: 0 auto 1.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.inner-pulse {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #9d4edd;
    box-shadow: 0 0 10px #9d4edd;
}
.eq-bars {
    display: flex;
    justify-content: center;
    gap: 6px;
    height: 30px;
    align-items: flex-end;
    margin-bottom: 1.5rem;
}
.bar {
    width: 6px;
    height: 8px;
    background: #9d4edd;
    border-radius: 3px;
}
.pulse-trigger {
    width: 100%;
    background: linear-gradient(135deg, #9d4edd, #ff007f);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    font-weight: 700;
    font-size: 0.75rem;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(157, 78, 221, 0.2);
    transition: all 0.2s ease;
}
.pulse-trigger:hover {
    box-shadow: 0 0 15px rgba(157, 78, 221, 0.5);
}`;
            }

            return {
                id: `user-css-${state.customComponentIndex++}`,
                name: name,
                type: 'css',
                creator: 'Akmal',
                avatarClass: 'akmal',
                avatarSymbol: '🎨',
                desc: desc,
                html: html,
                css: css
            };
        }
    },
    Byte: {
        avatar: '⚡',
        name: 'BYTE v2.0',
        role: 'JS Architect',
        desc: 'Specializes in highly performant state operations, microservices, and interactive listeners.',
        generate: (prompt) => {
            const cleanPrompt = prompt.toLowerCase();
            let name = "Logic Operations Core";
            let js = "";
            let desc = "Action behaviors and triggers.";

            if (cleanPrompt.includes('clock') || cleanPrompt.includes('time')) {
                name = "Live Clock Handler";
                desc = "Action model that binds the current active system epoch to text spans and operates logs.";
                js = `
(function() {
    console.log("Clock logic active!");
    const hrs = document.getElementById('hours');
    const mins = document.getElementById('minutes');
    const secs = document.getElementById('seconds');
    const toggleBtn = document.getElementById('btn-toggle-clock');
    
    let intervalId = null;
    let isRunning = true;

    function updateClock() {
        const now = new Date();
        if (hrs) hrs.textContent = String(now.getHours()).padStart(2, '0');
        if (mins) mins.textContent = String(now.getMinutes()).padStart(2, '0');
        if (secs) secs.textContent = String(now.getSeconds()).padStart(2, '0');
    }

    function start() {
        intervalId = setInterval(updateClock, 1000);
        updateClock();
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isRunning) {
                clearInterval(intervalId);
                toggleBtn.textContent = 'RESUME LOG';
                toggleBtn.style.filter = 'hue-rotate(90deg)';
            } else {
                start();
                toggleBtn.textContent = 'PAUSE LOG';
                toggleBtn.style.filter = 'none';
            }
            isRunning = !isRunning;
        });
    }

    start();
})();`;
            } else if (cleanPrompt.includes('stopwatch') || cleanPrompt.includes('timer')) {
                name = "Chronometer Engine";
                desc = "Precision timer state machine with complete start, stop, and delta reset bindings.";
                js = `
(function() {
    console.log("Chronometer Logic Loaded!");
    const display = document.getElementById('stopwatch-display');
    const startBtn = document.getElementById('chrono-start');
    const stopBtn = document.getElementById('chrono-stop');
    const resetBtn = document.getElementById('chrono-reset');

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;

    function formatTime(time) {
        let diffInMin = time / 60000;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 100;
        let ms = Math.floor(diffInMs);

        let formattedMM = String(mm).padStart(2, '0');
        let formattedSS = String(ss).padStart(2, '0');
        let formattedMS = String(ms).padStart(2, '0');

        return \`\${formattedMM}:\${formattedSS}.\${formattedMS}\`;
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (!timerInterval) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    display.textContent = formatTime(elapsedTime);
                }, 10);
            }
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            elapsedTime = 0;
            display.textContent = "00:00.00";
        });
    }
})();`;
            } else {
                name = "Ambient Equalizer Sync";
                desc = "Binds lo-fi stream toggle and simulates real-time graphic bars feedback loops.";
                js = `
(function() {
    console.log("Ambient Audio Engine Active!");
    const trigger = document.getElementById('audio-toggle');
    const bars = document.querySelectorAll('.bar');
    const core = document.querySelector('.inner-pulse');
    
    let isPlaying = false;
    let animationInterval = null;

    if (trigger) {
        trigger.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                trigger.textContent = 'DISENGAGE STREAM';
                trigger.style.filter = 'hue-rotate(180deg)';
                if (core) core.style.animation = 'robot-float 1s ease-in-out infinite alternate';
                
                animationInterval = setInterval(() => {
                    bars.forEach(bar => {
                        const randomHeight = Math.floor(Math.random() * 26) + 4;
                        bar.style.height = \`\${randomHeight}px\`;
                        bar.style.transition = 'height 0.15s ease';
                    });
                }, 150);
            } else {
                trigger.textContent = 'ENGAGE AUDIO STREAM';
                trigger.style.filter = 'none';
                if (core) core.style.animation = 'none';
                clearInterval(animationInterval);
                bars.forEach(bar => {
                    bar.style.height = '8px';
                });
            }
        });
    }
})();`;
            }

            return {
                id: `user-js-${state.customComponentIndex++}`,
                name: name,
                type: 'js',
                creator: 'Akmal',
                avatarClass: 'akmal',
                avatarSymbol: '⚡',
                desc: desc,
                js: js
            };
        }
    }
};

// --- Simulated Teammates Pre-loaded Cards ---
const simulatedTeammateCards = [
    {
        id: 'team-js-1',
        name: 'Ambient Equalizer Sync',
        type: 'js',
        creator: 'Wendy',
        avatarClass: 'wendy',
        avatarSymbol: '⚡',
        desc: 'Simulates responsive equalizer bands and pulses vectors to lo-fi audio playback streams.',
        js: `
(function() {
    console.log("Wendy's Equalizer Engine Active!");
    const trigger = document.getElementById('audio-toggle');
    const bars = document.querySelectorAll('.bar');
    const core = document.querySelector('.inner-pulse');
    
    let isPlaying = false;
    let animationInterval = null;

    if (trigger) {
        trigger.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                trigger.textContent = 'DISENGAGE STREAM';
                trigger.style.filter = 'hue-rotate(180deg)';
                if (core) core.style.animation = 'robot-float 1s ease-in-out infinite alternate';
                
                animationInterval = setInterval(() => {
                    bars.forEach(bar => {
                        const randomHeight = Math.floor(Math.random() * 26) + 4;
                        bar.style.height = \`\${randomHeight}px\`;
                        bar.style.transition = 'height 0.15s ease';
                    });
                }, 150);
            } else {
                trigger.textContent = 'ENGAGE AUDIO STREAM';
                trigger.style.filter = 'none';
                if (core) core.style.animation = 'none';
                clearInterval(animationInterval);
                bars.forEach(bar => {
                    bar.style.height = '8px';
                });
            }
        });
    }
})();`
    },
    {
        id: 'team-css-1',
        name: 'Glow Neon Clock Canvas',
        type: 'css',
        creator: 'Ibnu',
        avatarClass: 'ibnu',
        avatarSymbol: '🎨',
        desc: 'Visual clock frame using frosted borders and bright radial background overlays.',
        html: `
<div class="neon-clock-card">
    <div class="clock-display">
        <span id="hours">12</span><span class="colon">:</span><span id="minutes">45</span><span class="colon">:</span><span id="seconds">00</span>
    </div>
    <div class="clock-label">ESTABLISHED SESSION // TURBO TIME</div>
    <button class="control-btn" id="btn-toggle-clock">PAUSE LOG</button>
</div>`,
        css: `
.neon-clock-card {
    background: rgba(13, 17, 33, 0.7);
    border: 1px solid rgba(0, 242, 254, 0.3);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 242, 254, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    width: 300px;
    margin: 2rem auto;
    font-family: 'Outfit', sans-serif;
}
.clock-display {
    font-size: 2.5rem;
    font-weight: 800;
    font-family: 'Fira Code', monospace;
    color: #f8f9fa;
    text-shadow: 0 0 10px #00f2fe, 0 0 20px #00f2fe;
    margin-bottom: 1rem;
    letter-spacing: 2px;
}
.colon {
    animation: blink 1s infinite;
}
@keyframes blink {
    50% { opacity: 0.3; }
}
.clock-label {
    font-size: 0.65rem;
    color: #a0aec0;
    font-family: 'Fira Code', monospace;
    margin-bottom: 1.5rem;
}
.control-btn {
    background: linear-gradient(135deg, #00f2fe, #4facfe);
    color: #070913;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.5rem;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
    transition: all 0.2s ease;
}
.control-btn:hover {
    box-shadow: 0 0 15px rgba(0, 242, 254, 0.5);
    transform: translateY(-1px);
}`
    },
    {
        id: 'team-js-2',
        name: 'System Chronometer Engine',
        type: 'js',
        creator: 'Agung',
        avatarClass: 'agung',
        avatarSymbol: '⚡',
        desc: 'Timer state bindings connecting start, stop and reset routines with millisecond decimals.',
        js: `
(function() {
    console.log("Agung's Stopwatch Logic Loaded!");
    const display = document.getElementById('stopwatch-display');
    const startBtn = document.getElementById('chrono-start');
    const stopBtn = document.getElementById('chrono-stop');
    const resetBtn = document.getElementById('chrono-reset');

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;

    function formatTime(time) {
        let diffInMin = time / 60000;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 100;
        let ms = Math.floor(diffInMs);

        let formattedMM = String(mm).padStart(2, '0');
        let formattedSS = String(ss).padStart(2, '0');
        let formattedMS = String(ms).padStart(2, '0');

        return \`\${formattedMM}:\${formattedSS}.\${formattedMS}\`;
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (!timerInterval) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    display.textContent = formatTime(elapsedTime);
                }, 10);
            }
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            elapsedTime = 0;
            display.textContent = "00:00.00";
        });
    }
})();`
    }
];

// --- Initial Scaffolding and DOM Element Caches ---
document.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements();
    setupEventListeners();
    initializeStream();
});

let DOM = {};
function cacheDOMElements() {
    DOM = {
        lobbyScreen: document.getElementById('lobby-screen'),
        btnEnterLab: document.getElementById('btn-enter-lab'),
        charCards: document.querySelectorAll('.char-card'),
        
        robotAvatar: document.getElementById('robot-avatar'),
        robotName: document.getElementById('robot-name'),
        robotDesc: document.getElementById('robot-desc'),
        
        promptInput: document.getElementById('prompt-input'),
        btnGenerate: document.getElementById('btn-generate'),
        suggestionChips: document.querySelectorAll('.suggestion-chip'),
        
        streamContainer: document.getElementById('stream-container'),
        fusionDropzone: document.getElementById('fusion-dropzone'),
        slotCss: document.getElementById('slot-css'),
        slotJs: document.getElementById('slot-js'),
        btnFuse: document.getElementById('btn-fuse'),
        
        sandboxIframe: document.getElementById('sandbox-iframe'),
        drawerTabs: document.querySelectorAll('.drawer-tab'),
        codeOutput: document.getElementById('code-output'),
        btnCopyCode: document.getElementById('btn-copy-code'),
        
        particleCanvas: document.getElementById('fusion-particle-canvas')
    };
}

// --- Setup Event Handlers ---
function setupEventListeners() {
    // Character selection lobby interaction
    DOM.charCards.forEach(card => {
        card.addEventListener('click', () => {
            DOM.charCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.selectedChar = card.dataset.char;
            state.selectedRobot = card.dataset.robot;
        });
    });

    // Enter main interface
    DOM.btnEnterLab.addEventListener('click', () => {
        DOM.lobbyScreen.classList.remove('active');
        configureSelectedRobot();
    });

    // Suggestion chips interaction
    DOM.suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            DOM.promptInput.value = chip.textContent;
        });
    });

    // Code generator click
    DOM.btnGenerate.addEventListener('click', handleCodeGeneration);

    // Dynamic slot triggers (Selection)
    DOM.slotCss.addEventListener('click', () => clearSlot('css'));
    DOM.slotJs.addEventListener('click', () => clearSlot('js'));

    // Fusion Action Trigger
    DOM.btnFuse.addEventListener('click', triggerFusionBlast);

    // Code Output Tab switching
    DOM.drawerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            DOM.drawerTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.activeTab = tab.dataset.tab;
            updateCodeOutputDisplay();
        });
    });

    // Copy to clipboard click
    DOM.btnCopyCode.addEventListener('click', copyCodeToClipboard);
}

// --- Configure active companion details ---
function configureSelectedRobot() {
    const config = robots[state.selectedRobot];
    if (config) {
        DOM.robotAvatar.textContent = config.avatar;
        DOM.robotAvatar.className = 'robot-face-pulse';
        
        // Dynamic colors based on companion
        if (state.selectedRobot === 'Neon') {
            DOM.robotAvatar.classList.add('cyan-glow');
            DOM.robotDesc.textContent = config.desc;
            DOM.robotName.textContent = config.name;
        } else {
            DOM.robotAvatar.classList.add('yellow-glow');
            DOM.robotDesc.textContent = config.desc;
            DOM.robotName.textContent = config.name;
        }
    }
}

// --- Assemble Collaborative Feed ---
const creatorNames = {
    'akmal': 'Akmal',
    'wendy': 'Wendy',
    'agung': 'Agung',
    'ibnu': 'Ibnu'
};

function initializeStream() {
    state.activeCreator = creatorNames[state.selectedChar] || 'Akmal';
    
    const isServed = window.location.protocol.startsWith('http');
    if (isServed) {
        console.log("Connecting to Real-Time SSE Stream at /api/stream...");
        const eventSource = new EventSource('/api/stream');
        
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'init') {
                    DOM.streamContainer.innerHTML = '';
                    state.streamCards = [];
                    // Populate initial historic cards in chronological order
                    data.cards.forEach(card => {
                        addCardToStream(card, false);
                    });
                } else if (data.type === 'new') {
                    addCardToStream(data.card, true);
                }
            } catch (err) {
                console.error("Failed to parse SSE payload", err);
            }
        };
        
        eventSource.onerror = (err) => {
            console.warn("Real-time server connection unavailable. Running in simulated standalone mode.");
            eventSource.close();
            runOfflineSimulation();
        };
    } else {
        runOfflineSimulation();
    }
}

function runOfflineSimulation() {
    DOM.streamContainer.innerHTML = '';
    state.streamCards = [];
    simulatedTeammateCards.forEach((card, index) => {
        setTimeout(() => {
            addCardToStream(card, true);
        }, (index + 1) * 3000);
    });
}

function addCardToStream(card, triggerPulse = false) {
    // Prevent duplicate entries from self-broadcast
    if (state.streamCards.some(c => c.id === card.id)) return;
    
    state.streamCards.push(card);
    
    const cardEl = document.createElement('div');
    cardEl.className = 'flow-card';
    cardEl.id = card.id;
    cardEl.innerHTML = `
        <div class="card-header">
            <div class="card-team-meta">
                <div class="team-avatar ${card.avatarClass}">${card.avatarSymbol}</div>
                <h4>${card.creator} // ${card.type.toUpperCase() === 'CSS' ? 'Neon' : 'Byte'}</h4>
            </div>
            <span class="card-type-badge ${card.type}">${card.type.toUpperCase()}</span>
        </div>
        <p class="card-desc">${card.name}</p>
        <div class="card-snippet">${card.desc}</div>
    `;

    // Click on card selects it for the appropriate fusion slot
    cardEl.addEventListener('click', () => {
        selectCardForSlot(card);
    });

    DOM.streamContainer.prepend(cardEl);

    // Dynamic Visual Spark alert for newly arrived asset
    if (triggerPulse) {
        cardEl.style.boxShadow = `0 0 20px ${card.type === 'css' ? 'var(--accent-cyan)' : 'var(--accent-yellow)'}`;
        cardEl.style.transform = 'scale(1.02)';
        setTimeout(() => {
            cardEl.style.boxShadow = 'none';
            cardEl.style.transform = 'none';
        }, 1000);
    }

    // Auto-select card if it belongs to current active user profile
    if (card.creator === state.activeCreator) {
        selectCardForSlot(card);
    }
}

// --- AI Generation & Broadcast Engine ---
function handleCodeGeneration() {
    const prompt = DOM.promptInput.value.trim();
    if (!prompt) return;

    // Toggle button loader
    const btnText = DOM.btnGenerate.querySelector('.btn-text');
    const btnLoader = DOM.btnGenerate.querySelector('.btn-loader');
    btnText.textContent = "COMPILING CHANNELS...";
    btnLoader.classList.remove('hidden');
    DOM.btnGenerate.disabled = true;

    // 1.5 seconds simulated compute pipeline
    setTimeout(() => {
        const activeRobot = robots[state.selectedRobot];
        const newCard = activeRobot.generate(prompt);
        
        // Dynamic creator details based on profile setup
        newCard.creator = state.activeCreator;
        newCard.avatarClass = state.selectedChar;
        newCard.avatarSymbol = state.selectedRobot === 'Neon' ? '🎨' : '⚡';

        const isServed = window.location.protocol.startsWith('http');
        if (isServed) {
            // Serve via Local server, POST to broadcast
            fetch('/api/push', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCard)
            })
            .catch(err => {
                console.warn("Failed to POST card, adding locally instead.", err);
                addCardToStream(newCard, true);
            });
        } else {
            // Offline fallback
            addCardToStream(newCard, true);
        }

        // Restore button state
        btnText.textContent = "RUN ROBOT PIPELINE";
        btnLoader.classList.add('hidden');
        DOM.btnGenerate.disabled = false;
        DOM.promptInput.value = "";
    }, 1500);
}

// --- Slot Mechanics & State ---
function selectCardForSlot(card) {
    if (card.type === 'css') {
        state.cssSlotCard = card;
        DOM.slotCss.innerHTML = `
            <div class="slot-card-title">${card.name} <span>CSS Layout // ${card.creator}</span></div>
        `;
        DOM.slotCss.className = 'fusion-slot slot-filled';
        DOM.slotCss.setAttribute('data-type', 'css');
    } else if (card.type === 'js') {
        state.jsSlotCard = card;
        DOM.slotJs.innerHTML = `
            <div class="slot-card-title">${card.name} <span>JS Engine // ${card.creator}</span></div>
        `;
        DOM.slotJs.className = 'fusion-slot slot-filled';
        DOM.slotJs.setAttribute('data-type', 'js');
    }

    // Toggle Fusion button state
    if (state.cssSlotCard && state.jsSlotCard) {
        DOM.btnFuse.disabled = false;
    }
}

function clearSlot(type) {
    if (type === 'css') {
        state.cssSlotCard = null;
        DOM.slotCss.innerHTML = `<span class="slot-placeholder">DRAG OR SELECT CSS DESIGN</span>`;
        DOM.slotCss.className = 'fusion-slot';
        DOM.slotCss.removeAttribute('data-type');
    } else if (type === 'js') {
        state.jsSlotCard = null;
        DOM.slotJs.innerHTML = `<span class="slot-placeholder">DRAG OR SELECT JS LOGIC</span>`;
        DOM.slotJs.className = 'fusion-slot';
        DOM.slotJs.removeAttribute('data-type');
    }
    DOM.btnFuse.disabled = true;
}

// ==========================================================================
// Collaborative Fusion Chamber Mechanics (The "Wow" Action)
// ==========================================================================
function triggerFusionBlast() {
    if (!state.cssSlotCard || !state.jsSlotCard) return;

    // Create the flash burst overlay
    const flash = document.createElement('div');
    flash.className = 'fusion-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    // Launch high-fidelity canvas particle stream
    initParticles();
    
    // Fuse files and render
    setTimeout(() => {
        executeSandboxFusion();
    }, 150);
}

function executeSandboxFusion() {
    const cssCard = state.cssSlotCard;
    const jsCard = state.jsSlotCard;

    // Construct the fused sandboxed environment structure
    const fusedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Outfit:wght@400;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: transparent;
            color: #f8f9fa;
            font-family: 'Outfit', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        ${cssCard.css}
    </style>
</head>
<body>
    ${cssCard.html}
    <script>
        ${jsCard.js}
    </script>
</body>
</html>`;

    // Inject compiled doc into iframe
    DOM.sandboxIframe.srcdoc = fusedHTML;

    // Display fused outputs in drawer
    updateCodeOutputDisplay();
}

function updateCodeOutputDisplay() {
    if (!state.cssSlotCard || !state.jsSlotCard) {
        DOM.codeOutput.textContent = "// Select elements and trigger COLLABORATIVE FUSE!";
        return;
    }

    if (state.activeTab === 'html-css') {
        DOM.codeOutput.textContent = `<!-- FUSED HTML CONTAINER -->\n${state.cssSlotCard.html}\n\n/* FUSED LAYOUT SHEET */\n${state.cssSlotCard.css}`;
        DOM.codeOutput.className = 'language-css';
    } else {
        DOM.codeOutput.textContent = `/* FUSED FUNCTION ENGINE */\n${state.jsSlotCard.js}`;
        DOM.codeOutput.className = 'language-javascript';
    }
}

function copyCodeToClipboard() {
    const code = DOM.codeOutput.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const origText = DOM.btnCopyCode.textContent;
        DOM.btnCopyCode.textContent = "Copied!";
        DOM.btnCopyCode.style.color = "var(--accent-green)";
        DOM.btnCopyCode.style.borderColor = "var(--accent-green)";
        
        setTimeout(() => {
            DOM.btnCopyCode.textContent = origText;
            DOM.btnCopyCode.style.color = "var(--text-secondary)";
            DOM.btnCopyCode.style.borderColor = "var(--border-color)";
        }, 1500);
    });
}

// --- Canvas Particle Animation Logic ---
let particles = [];
let animationFrameId = null;

function initParticles() {
    const canvas = DOM.particleCanvas;
    const ctx = canvas.getContext('2d');
    
    // Set absolute size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    particles = [];
    const colors = ['#00f2fe', '#ffd166', '#9d4edd', '#ff007f', '#4facfe'];
    
    // Generate 120 radial burst points
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    
    for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 4;
        
        particles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015
        });
    }
    
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    renderParticles();
}

function renderParticles() {
    const canvas = DOM.particleCanvas;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let activeParticles = false;
    
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        
        if (p.alpha > 0) {
            activeParticles = true;
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    });
    
    if (activeParticles) {
        animationFrameId = requestAnimationFrame(renderParticles);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

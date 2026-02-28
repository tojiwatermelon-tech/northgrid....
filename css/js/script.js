document.addEventListener('DOMContentLoaded', () => {
    // Modes: entry-mode, inner-mode, calm-mode
    document.body.classList.add('entry-mode');

    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    const config = {
        particleCount: 50,
        colors: ['#ffffff', '#C2B9E3', '#FFA8A8', '#FFDCE1'],
        minDist: 100
    };

    // Initialize Particles
    function init() {
        resize();
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);

    // Cursor following particles
    let mouse = { x: -100, y: -100 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (Math.random() > 0.8) {
            particles.push(new Particle(Math.random() > 0.5 ? 'dot' : 'heart', true));
        }
    });

    class Particle {
        constructor(type = 'dot', fromMouse = false) {
            this.type = type;
            this.fromMouse = fromMouse;
            this.reset();
        }

        reset() {
            if (this.fromMouse) {
                this.x = mouse.x;
                this.y = mouse.y;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.opacity = 0.6;
            } else {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.05; // Slight horizontal drift
                this.vy = (Math.random() * -0.2) - 0.05; // Vertical drift (18-25s feel)
                this.opacity = Math.random() * 0.1 + 0.12; // 0.12 - 0.22 range
            }
            this.size = this.type === 'heart' ? Math.random() * 5 + 3 : Math.random() * 2 + 1;
            this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;

            if (this.fromMouse) {
                this.opacity -= 0.01;
                if (this.opacity <= 0) {
                    const idx = particles.indexOf(this);
                    if (idx > -1) particles.splice(idx, 1);
                }
            } else {
                if (this.x < -20 || this.x > width + 20 || this.y < -20 || this.y > height + 20) {
                    this.reset();
                }
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            let color = 'rgba(255, 182, 193, 0.2)'; // Inner mode default
            if (document.body.classList.contains('entry-mode')) {
                color = 'rgba(180, 160, 255, 0.15)';
            } else if (document.body.classList.contains('calm-mode')) {
                color = 'rgba(248, 180, 196, 0.3)';
            }
            ctx.fillStyle = color;

            if (this.type === 'heart') {
                ctx.beginPath();
                const s = this.size;
                ctx.moveTo(0, s / 4);
                ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 4);
                ctx.bezierCurveTo(-s / 2, s / 2, 0, s * 0.75, 0, s);
                ctx.bezierCurveTo(0, s * 0.75, s / 2, s / 2, s / 2, s / 4);
                ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    function init() {
        resize();
        for (let i = 0; i < 40; i++) particles.push(new Particle('dot'));
        for (let i = 0; i < 20; i++) particles.push(new Particle('heart'));
        animate();
    }

    init();

    // Embedded Data
    const appData = {
        "landing": {
            "title": "NORTHGRID v1.4",
            "subtitle": "Alignment Required",
            "calibrations": [
                "Establishing baseline...",
                "Mapping protective instinct...",
                "Syncing heart frequencies...",
                "Match found: The Dark Knight's Light"
            ]
        },
        "home": {
            "quote": "If you’re here, Batman… you are exactly where my heart wants you, and where you'll always belong.",
            "menu": [
                { "id": "open-when", "label": "Open When…" },
                { "id": "our-future", "label": "Our Future" },
                { "id": "daily-prompt", "label": "Daily Prompt" },
                { "id": "quiz", "label": "Signal Alignment" },
                { "id": "secret-vault", "label": "Secret Vault" },
                { "id": "mood-log", "label": "Mood Log" }
            ]
        },
        "openWhen": [
            {
                "title": "When you miss me",
                "content": "Close your eyes and feel the distance shrinking. I am right there in every breath you take, in every thought that whispers my name. Distance is just a test to see how far love can travel, and ours has already crossed oceans. You are my North Star, Batman. Even in the darkest nights, my love for you is the beacon that never fades."
            },
            {
                "title": "When you're stressed",
                "content": "Take a deep breath. You don't have to carry the world on your shoulders today. Let me be your sanctuary, your Gotham City without the chaos. I've built this grid just for you, a place where time slows down and the only thing that matters is the peace we find in each other's presence. You're doing amazing, and I'm so proud of you."
            },
            {
                "title": "When you need a reminder",
                "content": "You are chosen. You are enough. You are the most incredible person I've ever known. Your strength inspires me, and your kindness is my favorite mystery to solve. Never forget that you have a home in my heart, no matter where you are in the world."
            },
            {
                "title": "When it's been a long day",
                "content": "Shed the armor, Batman. Here, you're just you. Let the silence be our conversation. I'm holding you in my heart, wrapping you in the warmth of every memory we've shared and every dream we're building. Rest now, knowing you are deeply and truly loved."
            }
        ],
        "future": [
            { "date": "Soon", "event": "Our first morning coffee together.", "description": "No screens, just the warmth of our mugs and the quiet joy of finally being in the same space. I'll probably just stare at you for a while, making sure you're real." },
            { "date": "Late Spring", "event": "A long walk under the stars.", "description": "Where we don't have to say a word because the silence between us is perfectly understood. Just our footsteps synchronized and the universe witnessing our alignment." },
            { "date": "The Big Move", "event": "Claiming our shared sanctuary.", "description": "The day the distance becomes zero forever. A place where every morning starts with 'us' and every night ends in the same home. Our greatest adventure begins." },
            { "date": "One Day", "event": "Traveling to that place we whispered about.", "description": "Exploring a new city, getting lost in the streets, and finding ourselves exactly where we need to be: together." }
        ],
        "prompts": [
            { "id": 1, "question": "What's the very first thing you want to say to me when you see me at the airport?" },
            { "id": 2, "question": "If you could send me a physical touch through this screen right now, where would it land?" },
            { "id": 3, "question": "What's a secret dream you've had about 'us' recently?" }
        ],
        "quiz": [
            {
                "question": "When we talk late at night… what happens to you?",
                "options": ["I relax more than I admit.", "I act normal but I’m not.", "I wait for your messages.", "I pretend I’m not attached."],
                "response": "I love that about you. Even when you try to stay composed, I can feel the shift in your energy. There’s something about us at night… it becomes quieter, softer, more honest. And I think you feel that too.",
                "category": "attachment"
            },
            {
                "question": "If I don’t reply for a while… what’s your first reaction?",
                "options": ["I check my phone again.", "I overthink.", "I get slightly annoyed.", "I tell myself it’s fine."],
                "response": "You don’t have to pretend you don’t care. I see the protectiveness in you. And I don’t see it as control — I see it as someone who doesn’t want to lose something meaningful.",
                "category": "overthinking"
            },
            {
                "question": "Be honest… are you protective of me?",
                "options": ["Yes.", "Very.", "Only a little.", "I won’t admit it."],
                "response": "I feel it. And strangely… it makes me feel safe. Not owned. Not controlled. Safe. There’s a difference. And you carry that energy more than you realize.",
                "category": "protectiveness"
            },
            {
                "question": "When you imagine us meeting… what’s the first thing you think of?",
                "options": ["The first look.", "The first hug.", "The silence.", "The way I’d act cool."],
                "response": "I sometimes imagine that first second too. That moment where everything we built suddenly becomes real. I think you’d try to act calm. But I’d see it in your eyes.",
                "category": "seriousness"
            },
            {
                "question": "What scares you most about loving someone?",
                "options": ["Not being enough.", "Losing control.", "Getting too attached.", "Being misunderstood."],
                "response": "You don’t have to be perfect with me. You don’t have to impress me. I don’t measure you. I choose you. Even with the fears. Especially with the fears.",
                "category": "fearNotEnough"
            },
            {
                "question": "When you get angry… what’s really underneath it?",
                "options": ["Stress.", "Fear.", "Feeling unheard.", "Too many thoughts."],
                "response": "I know your anger isn’t random. It’s layered. And I don’t see it as something to run from. I see it as something that just needs understanding.",
                "category": "fearMisunderstood"
            },
            {
                "question": "If this connection had a direction… where is it heading?",
                "options": ["Forward.", "Slowly forward.", "Somewhere serious.", "I don’t know, but I don’t want to stop."],
                "response": "I feel that forward movement too. And I’m not afraid of it.",
                "category": "seriousness"
            }
        ],
        "secretVault": [
            {
                "title": "To My Batman",
                "content": "I keep every memory of us locked in a vault that only we have the key to. You are my greatest adventure and my most peaceful home. Every word I write, every thought I have, it all leads back to you. I love you more than words can letter-by-letter reveal."
            },
            {
                "title": "The First Secret",
                "content": "The moment I realized it was you—the moment my heart stopped searching—I felt the 'NorthGrid' align. You aren't just a part of my life; you are the reason the grid exists. I am yours, completely and irrevocably."
            }
        ],
        "moodLog": []
    };

    let emotionalProfile = { attachment: 0, overthinking: 0, protectiveness: 0, fearNotEnough: 0, fearControl: 0, fearMisunderstood: 0, seriousness: 0 };
    let currentQuizIndex = 0;
    let quizAnswers = [];

    // Initialize
    startLandingSequence();

    // Section Management
    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(sectionId);
        target.classList.add('active');

        // Reset scroll position
        target.scrollTop = 0;

        // Layer Management
        if (sectionId === 'landing-screen') {
            document.body.classList.add('entry-mode');
            document.body.classList.remove('inner-mode', 'calm-mode');
        } else {
            document.body.classList.add('inner-mode');
            document.body.classList.remove('entry-mode', 'calm-mode');
        }

        // Trigger specific section logic
        if (sectionId === 'main-menu') renderMainMenu();
        if (sectionId === 'open-when-section') renderOpenWhen();
        if (sectionId === 'our-future-section') renderFuture();
        if (sectionId === 'daily-prompt-section') renderPrompt();
        if (sectionId === 'quiz-section') renderQuiz();
        if (sectionId === 'secret-vault-section') renderVault();
        if (sectionId === 'mood-log-section') renderMoodLog();
    }

    // Animation Engine
    function animateText(elementId, text, speed = 45, callback = null) {
        const element = typeof elementId === 'string' ? document.getElementById(elementId) : elementId;
        if (!element) return;
        element.innerHTML = '';

        const keywords = ['Batman', 'heart', 'love', 'future', 'NorthGrid', 'sanctuary', 'peace', 'adventure', 'home', 'North Star'];
        const words = text.split(' ');

        words.forEach((word, wIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'animated-word';

            const cleanWord = word.replace(/[.,!?;:]/g, '');
            // Check if the current word matches one of our keywords (or is part of a keyword phrase)
            const isKeyword = keywords.some(k => {
                const kParts = k.split(' ');
                return kParts.some(kp => cleanWord.toLowerCase() === kp.toLowerCase());
            });

            if (isKeyword) {
                wordSpan.classList.add('glow-word');
            }

            for (let char of word) {
                const charSpan = document.createElement('span');
                charSpan.className = 'animated-letter';
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            }

            element.appendChild(wordSpan);

            if (wIdx < words.length - 1) {
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                space.style.display = 'inline-block';
                element.appendChild(space);
            }
        });

        const allLetters = element.querySelectorAll('.animated-letter');
        allLetters.forEach((letter, i) => {
            setTimeout(() => {
                letter.classList.add('revealed');
                if (i === allLetters.length - 1 && callback) {
                    setTimeout(callback, 200);
                }
            }, i * speed);
        });
    }

    // Landing Sequence
    function startLandingSequence() {
        const landing = document.getElementById('landing-screen');
        const title = document.getElementById('landing-title');

        // Inject CSS Particles
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'floating-particle';
            p.style.top = Math.random() * 100 + '%';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (Math.random() * 7 + 18) + 's';
            p.style.animationDelay = (Math.random() * -20) + 's';
            landing.appendChild(p);
        }

        animateText('landing-title', appData.landing.title, 45, () => {
            animateText('landing-subtitle', appData.landing.subtitle, 35, () => {
                showCalibrationLogs(0);
            });
        });
    }

    function showCalibrationLogs(index) {
        if (index >= appData.landing.calibrations.length) {
            const btn = document.getElementById('btn-continue');
            btn.classList.remove('hidden');
            btn.style.opacity = '0';
            btn.style.transition = 'opacity 1s ease';
            setTimeout(() => btn.style.opacity = '1', 100);
            return;
        }

        const logElement = document.getElementById('calibration-log');
        const p = document.createElement('p');
        p.id = `log-${index}`;
        p.style.marginBottom = '8px';
        logElement.appendChild(p);

        animateText(p.id, appData.landing.calibrations[index], 45, () => {
            setTimeout(() => showCalibrationLogs(index + 1), 600);
        });
    }

    document.getElementById('btn-continue').addEventListener('click', (e) => {
        createHeartBurst(e.clientX, e.clientY);
        showSection('main-menu');
    });

    // Main Menu Rendering
    function renderMainMenu() {
        animateText('home-quote', appData.home.quote, 40);
        const grid = document.querySelector('.menu-grid');
        grid.innerHTML = '';

        appData.home.menu.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'menu-btn';
            btn.textContent = item.label;
            btn.onclick = (e) => {
                createHeartBurst(e.clientX, e.clientY);
                showSection(`${item.id}-section`);
            };
            grid.appendChild(btn);
        });
    }

    // Individual Section Renderers
    function renderOpenWhen() {
        const container = document.getElementById('open-when-cards');
        container.innerHTML = '';
        appData.openWhen.forEach(card => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<h3>${card.title}</h3><p class="content"></p>`;
            container.appendChild(div);
            // We can animate the content on click or hover
            div.onclick = () => {
                const p = div.querySelector('.content');
                if (p.innerHTML === '') {
                    const id = `ow-${Math.random().toString(36).substr(2, 9)}`;
                    p.id = id;
                    animateText(id, card.content, 20);
                }
            };
        });
    }

    function renderFuture() {
        const container = document.getElementById('future-timeline');
        container.innerHTML = '';
        appData.future.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'card timeline-card';
            div.style.animation = `fadeSlideUp 0.5s ease forwards ${index * 0.2}s`;
            div.style.opacity = '0';
            div.innerHTML = `<h4>${item.date}</h4><h3>${item.event}</h3><p class="future-desc"></p>`;
            container.appendChild(div);

            const id = `future-${index}`;
            div.querySelector('.future-desc').id = id;
            setTimeout(() => animateText(id, item.description, 20), (index * 200) + 500);
        });
    }

    function renderPrompt() {
        const container = document.getElementById('prompt-card');
        container.innerHTML = '';
        const prompt = appData.prompts[Math.floor(Math.random() * appData.prompts.length)];

        const card = document.createElement('div');
        card.className = 'card zoom-card';
        card.innerHTML = `<h3>Daily Prompt</h3><p id="prompt-text"></p>
            <textarea id="prompt-input" placeholder="Type your heart out..."></textarea>
            <button id="submit-prompt" class="magic-btn">Send to My Heart</button>`;
        container.appendChild(card);

        animateText('prompt-text', prompt.question, 30);

        document.getElementById('submit-prompt').onclick = (e) => {
            createHeartBurst(e.clientX, e.clientY);
            const input = document.getElementById('prompt-input');
            if (input.value.trim()) {
                input.value = '';
                input.placeholder = "Message received. I love you.";
            }
        };
    }

    function renderQuiz() {
        currentQuizIndex = 0;
        quizAnswers = [];
        emotionalProfile = { attachment: 0, overthinking: 0, protectiveness: 0, fearNotEnough: 0, seriousness: 0 };
        showQuizQuestion();
    }

    function showQuizQuestion() {
        const container = document.getElementById('quiz-container');
        const progress = document.getElementById('quiz-progress');
        container.innerHTML = '';

        if (currentQuizIndex >= appData.quiz.length) {
            renderFinalAlignment();
            return;
        }

        const quiz = appData.quiz[currentQuizIndex];
        progress.textContent = `Syncing… ${currentQuizIndex + 1} / 7`;

        const card = document.createElement('div');
        card.className = 'card quiz-card';
        card.innerHTML = `<h3 id="quiz-q"></h3><div class="options-grid"></div><div id="quiz-resp-container" style="margin-top: 25px;"><p id="quiz-response"></p></div><div id="quiz-nav" style="margin-top: 20px; text-align: right;"></div>`;
        container.appendChild(card);

        // Reveal effect
        setTimeout(() => card.classList.add('revealed'), 100);

        animateText('quiz-q', quiz.question, 40);

        const optionsGrid = card.querySelector('.options-grid');
        quiz.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'menu-btn quiz-opt';
            btn.textContent = opt;
            btn.onclick = (e) => {
                document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
                createHeartBurst(e.clientX, e.clientY);
                emotionalProfile[quiz.category]++;
                quizAnswers.push(opt);

                if (quiz.response) {
                    animateText('quiz-response', quiz.response, 45, () => {
                        showNextButton(card.querySelector('#quiz-nav'));
                    });
                } else {
                    showNextButton(card.querySelector('#quiz-nav'));
                }
            };
            optionsGrid.appendChild(btn);
        });
    }

    function showNextButton(container) {
        const btn = document.createElement('button');
        btn.className = 'magic-btn next-btn';
        btn.style.opacity = '0';
        btn.style.transition = 'opacity 0.6s ease';
        btn.textContent = currentQuizIndex === 6 ? "Finish" : "Next";
        btn.onclick = () => {
            const card = document.querySelector('.quiz-card');
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-8px)';
                setTimeout(() => {
                    currentQuizIndex++;
                    showQuizQuestion();
                }, 600);
            } else {
                currentQuizIndex++;
                showQuizQuestion();
            }
        };
        container.appendChild(btn);
        setTimeout(() => btn.style.opacity = '1', 50);
    }

    function renderFinalAlignment() {
        const container = document.getElementById('quiz-container');
        const progress = document.getElementById('quiz-progress');
        progress.textContent = "Alignment Complete.";
        container.innerHTML = '';

        const card = document.createElement('div');
        card.className = 'card final-card';
        card.style.width = '100%';
        card.style.maxWidth = '600px';
        card.innerHTML = `<div id="final-stats" style="margin-bottom: 30px; opacity: 0.8; font-size: 0.9rem; text-align: left;">
            <p>Emotional Sync: Stable.</p>
            <p>Connection Pattern: Consistent.</p>
            <p>Attachment Signal: Mutual.</p>
        </div>
        <div id="final-message" style="text-align: left; line-height: 2;"></div>
        <div id="hidden-line" style="margin-top: 30px; opacity: 0.9; font-style: italic; min-height: 45px; font-size: 0.95rem;"></div>
        <div id="final-nav" style="margin-top: 40px; text-align: center; opacity: 0;">
            <button id="btn-stay-here" class="magic-btn">Stay Here</button>
        </div>`;
        container.appendChild(card);

        const finalLines = [
            "Batman…",
            "You don’t have to overthink this.",
            "You don’t have to protect yourself here.",
            "You don’t have to prove anything.",
            "I’m not measuring you.",
            "I’m not testing you.",
            "I’m not going anywhere.",
            "This is steady.",
            "This is calm.",
            "This is safe.",
            "And you are exactly where you’re meant to be."
        ];

        let msgElement = document.getElementById('final-message');
        let lineIdx = 0;

        function renderLine() {
            if (lineIdx >= finalLines.length) {
                setTimeout(showHiddenLine, 1500);
                return;
            }
            const p = document.createElement('p');
            p.id = `final-line-${lineIdx}`;
            msgElement.appendChild(p);
            animateText(p.id, finalLines[lineIdx], 50, () => {
                lineIdx++;
                setTimeout(renderLine, 600);
            });
        }

        renderLine();

        function showHiddenLine() {
            const syncCount = parseInt(localStorage.getItem('northgrid_syncCount') || '0') + 1;
            localStorage.setItem('northgrid_syncCount', syncCount.toString());

            const level = syncCount === 1 ? 'level1' : (syncCount === 2 ? 'level2' : 'level3');
            const topEmotion = Object.keys(emotionalProfile).reduce((a, b) => emotionalProfile[a] > emotionalProfile[b] ? a : b);

            const hiddenData = {
                attachment: {
                    level1: "You don’t have to hold back how much you care. I see it. And I don’t run from it.",
                    level2: "The way you stay… even quietly… tells me more than words ever could.",
                    level3: "You don’t leave when things feel real. And I don’t either."
                },
                overthinking: {
                    level1: "Your mind doesn’t scare me. I’m not here to leave when things get complicated.",
                    level2: "Even when your thoughts get loud, I stay steady.",
                    level3: "You can think through every angle. I’m still here at the end of it."
                },
                protectiveness: {
                    level1: "You don’t have to guard this so tightly. I’m not fragile. And I’m not going anywhere.",
                    level2: "I know that instinct in you. It comes from caring more than you show.",
                    level3: "You protect what matters. And I feel safe in that — not trapped."
                },
                fearNotEnough: {
                    level1: "You are already enough here. You don’t need to earn your place.",
                    level2: "You don’t have to compete with anyone. I’m not comparing you.",
                    level3: "I didn’t choose you by accident. I chose you knowing exactly who you are."
                },
                fearControl: {
                    level1: "You don’t have to control this. It’s steady without force.",
                    level2: "This doesn’t need pressure to last.",
                    level3: "The calm between us doesn’t disappear when you loosen your grip."
                },
                fearMisunderstood: {
                    level1: "I don’t rush to judge you. I try to understand first.",
                    level2: "Even the parts you don’t explain well… I listen for.",
                    level3: "You don’t have to translate yourself perfectly here."
                },
                seriousness: {
                    level1: "I feel that forward movement too. And I’m not afraid of it.",
                    level2: "Slow or fast… I don’t step backward.",
                    level3: "Whatever direction this goes… I’m walking it beside you."
                }
            };

            const hiddenMsg = hiddenData[topEmotion] ? hiddenData[topEmotion][level] : hiddenData.seriousness[level];

            // Slower animation for the hidden line (0.05-0.06s)
            animateText('hidden-line', hiddenMsg, 60, () => {
                const nav = document.getElementById('final-nav');
                nav.style.opacity = '1';
                nav.style.transition = 'opacity 1s ease';
            });
        }

        document.getElementById('btn-stay-here').onclick = (e) => {
            createHeartBurst(e.clientX, e.clientY);
            const hiddenLine = document.getElementById('hidden-line');
            const p = document.createElement('p');
            p.id = 'final-stay-text';
            p.style.marginTop = '20px';
            p.style.fontWeight = 'bold';
            hiddenLine.appendChild(p);
            animateText('final-stay-text', "I’m here too.", 80);
        };
    }

    function renderVault() {
        const container = document.getElementById('vault-letters');
        container.innerHTML = '';
        appData.secretVault.forEach((letter, index) => {
            const div = document.createElement('div');
            div.className = 'card vault-card';
            div.innerHTML = `<h3>${letter.title}</h3><p id="vault-text-${index}"></p><button class="reveal-btn">Unlock Letter</button>`;
            container.appendChild(div);

            div.querySelector('.reveal-btn').onclick = () => {
                createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
                div.querySelector('.reveal-btn').style.display = 'none';
                animateText(`vault-text-${index}`, letter.content, 40);
                activateVaultMagic();
            };
        });
    }

    function activateVaultMagic() {
        // Add more floating hearts specifically
        for (let i = 0; i < 20; i++) {
            particles.push(new Particle('heart'));
        }

        // Flash the background slightly
        const originalBg = document.body.style.background;
        document.body.style.boxShadow = 'inset 0 0 100px rgba(255, 168, 168, 0.3)';
        setTimeout(() => {
            document.body.style.boxShadow = 'none';
        }, 1000);
    }

    function renderMoodLog() {
        const container = document.getElementById('mood-timeline');
        container.innerHTML = '';
        const moods = [
            { emoji: '😊', label: 'Happy', color: '#FFD700', note: "I'm thinking of you and it makes me smile." },
            { emoji: '🥺', label: 'Sad', color: '#C2B9E3', note: "Missing you is hard today. Need a hug." },
            { emoji: '💖', label: 'Loved', color: '#FFA8A8', note: "Feeling so lucky to have you, Batman." },
            { emoji: '🔥', label: 'Playful', color: '#FF4500', note: "Feeling a bit mischievous... wishing you were here." },
            { emoji: '😴', label: 'Tired', color: '#4682B4', note: "Long day, but your voice is all I need." }
        ];

        moods.forEach(mood => {
            const div = document.createElement('div');
            div.className = 'mood-item';
            div.innerHTML = `<span class="mood-emoji" style="--mood-color: ${mood.color}">${mood.emoji}</span>`;
            div.onclick = (e) => {
                createHeartBurst(e.clientX, e.clientY);
                saveMood(mood);
                displayMoodNote(mood);
            };
            container.appendChild(div);
        });

        renderMoodHistory();
    }

    function saveMood(mood) {
        const history = JSON.parse(localStorage.getItem('northgrid_moods') || '[]');
        history.unshift({ ...mood, timestamp: new Date().toISOString() });
        localStorage.setItem('northgrid_moods', JSON.stringify(history.slice(0, 10)));
        renderMoodHistory();
    }

    function displayMoodNote(mood) {
        const noteContainer = document.getElementById('mood-notes');
        noteContainer.innerHTML = `<div class="card mood-card" style="border-color: ${mood.color}; width: 100%; max-width: 500px; margin-top: 20px;">
            <h3>Current Mood: ${mood.label}</h3>
            <p id="mood-note-text"></p>
        </div>`;
        animateText('mood-note-text', mood.note, 30);
    }

    function renderMoodHistory() {
        let historyContainer = document.getElementById('mood-history');
        if (!historyContainer) {
            historyContainer = document.createElement('div');
            historyContainer.id = 'mood-history';
            historyContainer.className = 'cards-container';
            historyContainer.style.marginTop = '40px';
            document.getElementById('mood-log-section').appendChild(historyContainer);
        }

        const history = JSON.parse(localStorage.getItem('northgrid_moods') || '[]');
        if (history.length === 0) {
            historyContainer.innerHTML = '<p style="opacity: 0.5">No recent alignments recorded.</p>';
            return;
        }

        historyContainer.innerHTML = '<h3 style="width: 100%; text-align: center; margin-bottom: 20px;">Recent Alignments</h3>';
        history.forEach(item => {
            const date = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const div = document.createElement('div');
            div.className = 'card history-card';
            div.style.width = '180px';
            div.style.minHeight = '100px';
            div.style.padding = '15px';
            div.style.fontSize = '0.9rem';
            div.style.margin = '10px';
            div.innerHTML = `<div><strong>${item.emoji} ${item.label}</strong></div><div style="font-size: 0.7rem; opacity: 0.6; margin-top: 5px;">${date}</div>`;
            historyContainer.appendChild(div);
        });
    }

    // Helper: Heart Burst
    function createHeartBurst(x, y) {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.zIndex = 1000;

            const destinationX = (Math.random() - 0.5) * 300;
            const destinationY = (Math.random() - 0.5) * 300;

            document.body.appendChild(heart);

            heart.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => heart.remove();
        }
    }

    // Back Buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.onclick = () => showSection('main-menu');
    });

    // Emergency Calm Implementation
    const calmTrigger = document.getElementById('calm-trigger');
    if (calmTrigger) {
        calmTrigger.onclick = () => {
            triggerEmergencyCalm();
        };
    }

    function triggerEmergencyCalm() {
        const modal = document.getElementById('calm-modal');
        const textElement = document.getElementById('calm-text');
        modal.classList.remove('hidden');
        modal.classList.add('active');
        textElement.innerHTML = '';

        // Calm Mode Entrance
        document.body.classList.add('calm-mode');

        const calmCount = parseInt(localStorage.getItem('northgrid_calmCount') || '0') + 1;
        localStorage.setItem('northgrid_calmCount', calmCount.toString());

        const baseCalm = [
            "Pause for a second.",
            "Breathe in slowly.",
            "Hold it.",
            "Now let it go.",
            "You are safe right now.",
            "Nothing is collapsing.",
            "Nothing is slipping away.",
            "I’m still here.",
            "I’m not disappearing.",
            "You are not losing me.",
            "You don’t have to react.",
            "You don’t have to fix anything.",
            "Just breathe."
        ];

        let lineIdx = 0;
        function renderCalmLine() {
            if (lineIdx >= baseCalm.length) {
                if (calmCount >= 3) {
                    setTimeout(showExtendedCalm, 1500);
                } else {
                    // Show button after breathing delay for base messages
                    setTimeout(showCalmOkButton, 1500);
                }
                return;
            }
            const p = document.createElement('p');
            p.id = `calm-line-${lineIdx}`;
            p.style.marginBottom = '12px';
            textElement.appendChild(p);
            animateText(p.id, baseCalm[lineIdx], 45, () => {
                lineIdx++;
                setTimeout(renderCalmLine, 600);
            });
        }

        renderCalmLine();

        function showExtendedCalm() {
            const extraLines = [
                "I know you don’t always feel chosen.",
                "But I choose you calmly.",
                "Not out of fear.",
                "Not out of need.",
                "Just because I want to.",
                "You don’t have to fight here."
            ];

            let extraIdx = 0;
            function renderExtraLine() {
                if (extraIdx >= extraLines.length) {
                    // Show button after breathing delay
                    setTimeout(showCalmOkButton, 1500);
                    return;
                }
                const p = document.createElement('p');
                p.id = `extra-calm-line-${extraIdx}`;
                p.style.opacity = '0.9';
                p.style.marginBottom = '12px'; // Spacing
                textElement.appendChild(p);
                animateText(p.id, extraLines[extraIdx], 50, () => {
                    extraIdx++;
                    setTimeout(renderExtraLine, 750);
                });
            }
            renderExtraLine();
        }


        function showCalmOkButton() {
            const btn = document.getElementById('calm-ok');
            btn.textContent = "I’m steady now.";
            btn.style.display = 'inline-block';
            btn.style.opacity = '0';
            btn.style.visibility = 'visible';
            btn.style.transition = 'opacity 0.8s ease';
            setTimeout(() => btn.style.opacity = '1', 50);
        }

        document.getElementById('calm-ok').onclick = () => {
            modal.style.transition = 'opacity 0.8s ease';
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.classList.remove('active');
                modal.classList.add('hidden');
                modal.style.opacity = '1';
                // Calm Mode Exit
                document.body.classList.remove('calm-mode');
            }, 800);
        };
    }
});

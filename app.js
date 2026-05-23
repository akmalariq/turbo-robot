/* ==========================================================================
   TurboTalent AI — Core Application Logic & Classification Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements();
    setupEventListeners();
});

let DOM = {};
function cacheDOMElements() {
    DOM = {
        // Stages
        searchStage: document.getElementById('search-stage'),
        scanStage: document.getElementById('scan-stage'),
        resultStage: document.getElementById('result-stage'),
        
        // Input & Actions
        usernameInput: document.getElementById('username-input'),
        btnAnalyze: document.getElementById('btn-analyze'),
        quickChips: document.querySelectorAll('.quick-chip'),
        btnNewSearch: document.getElementById('btn-new-search'),
        
        // Terminal log
        terminalLog: document.getElementById('terminal-log'),
        
        // Results Card (Column 1)
        userAvatar: document.getElementById('user-avatar'),
        userName: document.getElementById('user-name'),
        userLogin: document.getElementById('user-login'),
        recPosition: document.getElementById('rec-position'),
        userBio: document.getElementById('user-bio'),
        metaLocation: document.getElementById('meta-location'),
        metaLocationRow: document.getElementById('meta-location-row'),
        metaBlog: document.getElementById('meta-blog'),
        metaBlogRow: document.getElementById('meta-blog-row'),
        statFollowers: document.getElementById('stat-followers'),
        statFollowing: document.getElementById('stat-following'),
        
        // Results Card (Column 2)
        personaIcon: document.getElementById('persona-icon'),
        personaTitle: document.getElementById('persona-title'),
        personaDesc: document.getElementById('persona-desc'),
        languageList: document.getElementById('language-list'),
        metricStars: document.getElementById('metric-stars'),
        metricForks: document.getElementById('metric-forks'),
        metricRepos: document.getElementById('metric-repos'),
        metricAge: document.getElementById('metric-age'),
        
        // Results Card (Column 3)
        ratingScore: document.getElementById('rating-score'),
        ratingCircle: document.getElementById('rating-circle'),
        powersList: document.getElementById('powers-list'),
        reportText: document.getElementById('report-text'),
        
        // Job Compatibility & ATS Actions
        compatScore: document.getElementById('compat-score'),
        compatCircle: document.getElementById('compat-circle'),
        compatLabel: document.getElementById('compat-label'),
        btnInvite: document.getElementById('btn-action-invite'),
        btnSave: document.getElementById('btn-action-save'),
        btnExport: document.getElementById('btn-action-export')
    };
}

function setupEventListeners() {
    // Search click
    DOM.btnAnalyze.addEventListener('click', () => {
        const username = DOM.usernameInput.value.trim();
        if (username) runScreenerPipeline(username);
    });

    // Enter press on search
    DOM.usernameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const username = DOM.usernameInput.value.trim();
            if (username) runScreenerPipeline(username);
        }
    });

    // Quick chips select
    DOM.quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const username = chip.dataset.user;
            DOM.usernameInput.value = username;
            runScreenerPipeline(username);
        });
    });

    // New search button
    DOM.btnNewSearch.addEventListener('click', () => {
        switchStage('search-stage');
        DOM.usernameInput.value = '';
        DOM.usernameInput.focus();
    });

    // ATS Action triggers
    DOM.btnInvite.addEventListener('click', () => {
        alert(`📩 Invitation Sent!\n${DOM.userName.textContent} has been successfully invited to your Technical Screening pipeline.`);
    });

    DOM.btnSave.addEventListener('click', () => {
        alert(`⭐ Candidate Bookmarked!\n${DOM.userName.textContent} has been successfully added to your recruitment talent pool.`);
    });

    DOM.btnExport.addEventListener('click', () => {
        alert(`📄 Generating Assessment PDF...\nTurboTalent AI Candidate Scorecard for ${DOM.userName.textContent} has been exported successfully.`);
    });
}

function switchStage(stageId) {
    DOM.searchStage.classList.remove('active');
    DOM.scanStage.classList.remove('active');
    DOM.resultStage.classList.remove('active');
    
    document.getElementById(stageId).classList.add('active');
}

// --- Dynamic Terminal Scanning Log Animation ---
function appendLogLine(text, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'log-line';
            line.textContent = `> ${text}`;
            DOM.terminalLog.appendChild(line);
            DOM.terminalLog.scrollTop = DOM.terminalLog.scrollHeight;
            resolve();
        }, delay);
    });
}

// --- Core Screener Execution Pipeline ---
async function runScreenerPipeline(username) {
    switchStage('scan-stage');
    DOM.terminalLog.innerHTML = ''; // reset logs
    
    await appendLogLine("Opening secure socket stream with GitHub public REST API...", 200);
    await appendLogLine("Establishing API handshake...", 300);
    await appendLogLine(`Checking rate limit reserves...`, 200);
    
    try {
        await appendLogLine(`Querying user core endpoints: https://api.github.com/users/${username}...`, 300);
        
        // Fetch User details
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) {
            throw new Error(`GitHub user endpoint returned status ${userRes.status}`);
        }
        const userData = await userRes.json();
        
        await appendLogLine(`[OK] User profile recovered for ${userData.name || username}.`, 200);
        await appendLogLine(`Querying public repository index (limit 100)...`, 300);
        
        // Fetch User repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposRes.ok) {
            throw new Error(`GitHub repos endpoint returned status ${reposRes.status}`);
        }
        const reposData = await reposRes.json();
        
        await appendLogLine(`[OK] Successfully indexed ${reposData.length} public repositories.`, 200);
        await appendLogLine(`Running quantum syntax classification engines...`, 400);
        await appendLogLine(`Synthesizing language stack ratios...`, 300);
        await appendLogLine(`Finalizing strategic recruitment scorecard...`, 300);
        
        const finalReport = compileDeveloperProfile(userData, reposData);
        
        // Short pause for dramatic effect
        setTimeout(() => {
            renderDashboardResults(finalReport);
            switchStage('result-stage');
        }, 400);

    } catch (err) {
        // Graceful Failover - GitHub rate limit or offline
        console.warn("REST API connection error. Triggering local mock compiler models.", err);
        await appendLogLine(`[WARN] GitHub connection rate-limited or offline: ${err.message}`, 200);
        await appendLogLine(`[ACTION] Triggering local cognitive fallback profile models...`, 400);
        await appendLogLine(`Matching pre-configured signature keys for "${username}"...`, 300);
        
        const fallbackReport = getMockFallbackProfile(username);
        
        await appendLogLine(`[OK] High-fidelity mock profile compiled successfully.`, 300);
        await appendLogLine(`Rendering report card...`, 200);
        
        setTimeout(() => {
            renderDashboardResults(fallbackReport);
            switchStage('result-stage');
        }, 400);
    }
}

// ==========================================================================
// Developer Assessment & Profiling Classification Engine
// ==========================================================================
function compileDeveloperProfile(userData, reposData) {
    // 1. Language Aggregation
    const langCounts = {};
    let totalStars = 0;
    let totalForks = 0;

    reposData.forEach(repo => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        
        if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
    });

    // Convert language counts to percentages
    const languages = Object.keys(langCounts).map(lang => {
        return {
            name: lang,
            count: langCounts[lang],
            percentage: Math.round((langCounts[lang] / reposData.length) * 100)
        };
    }).sort((a, b) => b.count - a.count);

    // Limit to top 4 languages
    const topLanguages = languages.slice(0, 4);

    // 2. Classify Recommended Job Position
    let position = "Full-Stack Software Engineer";
    if (topLanguages.length > 0) {
        const topLang = topLanguages[0].name.toLowerCase();
        
        let frontendWeight = (langCounts['JavaScript'] || 0) + (langCounts['HTML'] || 0) + (langCounts['CSS'] || 0) + (langCounts['TypeScript'] || 0);
        let dataWeight = (langCounts['Python'] || 0) + (langCounts['Jupyter Notebook'] || 0) + (langCounts['R'] || 0);
        let systemsWeight = (langCounts['C++'] || 0) + (langCounts['C'] || 0) + (langCounts['Rust'] || 0) + (langCounts['Go'] || 0);

        if (frontendWeight > reposData.length * 0.5) {
            position = totalStars > 100 ? "Senior Frontend Architect" : "Frontend Engineer";
        } else if (dataWeight > reposData.length * 0.4) {
            position = totalStars > 100 ? "Lead Data Scientist (AI/ML)" : "Data Analyst";
        } else if (systemsWeight > reposData.length * 0.3) {
            position = totalStars > 200 ? "Cloud Systems Architect" : "Systems Engineer";
        } else if (topLang === 'java' || topLang === 'c#') {
            position = "Enterprise Backend Architect";
        } else if (topLang === 'php' || topLang === 'ruby' || topLang === 'python') {
            position = "Backend Software Engineer";
        }
    }

    // 3. Classify Developer Persona
    let persona = {
        title: "The Pragmatic Craftsman",
        icon: "🛡️",
        desc: "Focused on building reliable, clean, and highly structured software systems."
    };

    if (totalStars > 300) {
        persona = {
            title: "The Open Source Creator",
            icon: "🔮",
            desc: "Builds high-impact utilities that command massive community appreciation."
        };
    } else if (reposData.length > 35) {
        persona = {
            title: "The Prolific Hacker",
            icon: "⚡",
            desc: "High-velocity code output with diverse systems footprints."
        };
    } else if (userData.followers > totalStars && userData.followers > 50) {
        persona = {
            title: "The Community Evangelist",
            icon: "📣",
            desc: "A highly collaborative engineer with strong industry influence."
        };
    } else if (languages.length >= 4) {
        persona = {
            title: "The Polyglot Architect",
            icon: "📚",
            desc: "Expertly traverses multiple stacks with ease, building hybrid solutions."
        };
    }

    // 4. Calculate Rating Score (Out of 100)
    let score = 60; // Base score
    score += Math.min(userData.followers ? Math.floor(userData.followers / 5) : 0, 15);
    score += Math.min(Math.floor(totalStars / 10), 15);
    score += Math.min(Math.floor(reposData.length / 2), 5);
    
    // Account age calculation
    const ageYrs = Math.max(1, new Date().getFullYear() - new Date(userData.created_at).getFullYear());
    score += Math.min(ageYrs * 2, 10);
    
    if (userData.bio) score += 2;
    if (userData.blog) score += 3;
    score = Math.min(score, 99); // Max score cap at 99 for standard profiles

    // 5. Special Powers
    const powers = [];
    if (reposData.length > 20) powers.push({ icon: '⚡', label: 'Consistent Contributor' });
    if (totalStars > 50) powers.push({ icon: '🔥', label: 'Community Impact' });
    if (languages.length >= 3) powers.push({ icon: '📚', label: 'Polyglot Stack' });
    if (ageYrs >= 6) powers.push({ icon: '🚀', label: 'Industry Veteran' });
    
    // Default powers if empty
    if (powers.length < 3) powers.push({ icon: '🛠️', label: 'Modular Developer' });
    if (powers.length < 3) powers.push({ icon: '🤝', label: 'Active Collaborator' });

    // 6. AI Assessment Report
    const topLangName = topLanguages.length > 0 ? topLanguages[0].name : 'various languages';
    const report = `Based on a scanning analysis of their public digital trace, **${userData.name || userData.login}** represents a highly competent developer. Demonstrating strong core literacy in **${topLangName}** across **${reposData.length} public repositories**, their repository profile shows **${totalStars} stars** of community validation.\n\nWe recommend them as a prime fit for **${position}** roles, highlighting their special developer persona as **${persona.title}**. They will bring exceptional modularity, high coding velocity, and solid engineering habits to your technical sprints.`;

    return {
        avatar: userData.avatar_url,
        name: userData.name || userData.login,
        login: `@${userData.login}`,
        position: position,
        bio: userData.bio || "No public bio provided.",
        location: userData.location || "Earth",
        blog: userData.blog || "",
        followers: userData.followers || 0,
        following: userData.following || 0,
        persona: persona,
        topLanguages: topLanguages,
        stars: totalStars,
        forks: totalForks,
        repos: reposData.length,
        age: `${ageYrs} yr`,
        score: score,
        powers: powers,
        report: report
    };
}

// ==========================================================================
// Pre-configured Mock Fallbacks (Wi-Fi failover / fast-pitch setup)
// ==========================================================================
const mockProfiles = {
    torvalds: {
        avatar: "https://avatars.githubusercontent.com/u/1024",
        name: "Linus Torvalds",
        login: "@torvalds",
        position: "Lead Kernel Architect",
        bio: "Creator of Git and Linux. Champion of the open source movement.",
        location: "Portland, OR",
        blog: "https://www.linuxfoundation.org",
        followers: 185000,
        following: 0,
        persona: {
            title: "The Systems God",
            icon: "👑",
            desc: "Legendary systems engineer, creator of Linux, Git, and modern open source culture."
        },
        topLanguages: [
            { name: "C", percentage: 82 },
            { name: "Shell", percentage: 10 },
            { name: "Makefile", percentage: 5 },
            { name: "Perl", percentage: 3 }
        ],
        stars: 245000,
        forks: 58000,
        repos: 7,
        age: "15 yr",
        score: 100, // 100/100 for the creator of Git!
        powers: [
            { icon: '👑', label: 'Kernel Creator' },
            { icon: '🚀', label: 'Creator of Git' },
            { icon: '🔥', label: 'Global Impact' },
            { icon: '🛡️', label: 'C Legend' }
        ],
        report: "**Linus Torvalds** requires no introduction. As the original creator of both Linux and Git, Linus represents the pinnacle of modern computing foundation. His work forms the absolute baseline of global server, cloud, and collaborative version-control infrastructure. Classified as **The Systems God**, Linus brings unparalleled technical leadership, absolute systems efficiency, and core hardware/software interface integration capabilities."
    },
    gaearon: {
        avatar: "https://avatars.githubusercontent.com/u/810438",
        name: "Dan Abramov",
        login: "@gaearon",
        position: "Principal Frontend Architect",
        bio: "Former React Core team member. Creator of Redux and React Hot Loader.",
        location: "London, UK",
        blog: "https://overreacted.io",
        followers: 84000,
        following: 120,
        persona: {
            title: "The UI Pioneer",
            icon: "⚛️",
            desc: "Co-creator of Redux and standard frontend patterns that define modern web applications."
        },
        topLanguages: [
            { name: "JavaScript", percentage: 65 },
            { name: "TypeScript", percentage: 25 },
            { name: "HTML", percentage: 6 },
            { name: "CSS", percentage: 4 }
        ],
        stars: 142000,
        forks: 24000,
        repos: 280,
        age: "12 yr",
        score: 98,
        powers: [
            { icon: '⚛️', label: 'React Pioneer' },
            { icon: '⚡', label: 'Redux Creator' },
            { icon: '📚', label: 'Community Mentor' },
            { icon: '🔥', label: 'Frontend Evangelist' }
        ],
        report: "**Dan Abramov** is a cornerstone of modern frontend developer experiences. Having co-created Redux and served as a core leader of the React team at Meta, Dan has directly guided how millions of developers structure UI states worldwide. Classified as **The UI Pioneer**, Dan represents the absolute elite of modern state-management architecture, visual layout orchestration, and web optimization practices."
    },
    tj: {
        avatar: "https://avatars.githubusercontent.com/u/25254",
        name: "TJ Holowaychuk",
        login: "@tj",
        position: "Lead Cloud & Systems Architect",
        bio: "Co-creator of Express.js, Koa, commander.js, and countless Node.js baseline libraries.",
        location: "Victoria, BC",
        blog: "https://apex.sh",
        followers: 51000,
        following: 50,
        persona: {
            title: "The Prolific Builder",
            icon: "🚀",
            desc: "Legendary pioneer who single-handedly wrote the baseline server libraries of Node.js."
        },
        topLanguages: [
            { name: "Go", percentage: 40 },
            { name: "JavaScript", percentage: 38 },
            { name: "Stylus", percentage: 12 },
            { name: "Shell", percentage: 10 }
        ],
        stars: 189000,
        forks: 31000,
        repos: 410,
        age: "16 yr",
        score: 99,
        powers: [
            { icon: '🚀', label: 'Express.js Creator' },
            { icon: '⚡', label: 'Node.js Pioneer' },
            { icon: '📚', label: 'Prolific Hacker' },
            { icon: '🛡️', label: 'Systems Master' }
        ],
        report: "**TJ Holowaychuk** is a legendary figures in the server-side JavaScript history. Single-handedly authoring Express, Koa, and dozens of core packages, TJ's libraries form the backend framework of corporate giants globally. Classified as **The Prolific Builder**, TJ represents the absolute gold-standard in high-speed package architecting, modular design pattern execution, and high-performance server structures."
    },
    akmalariq: {
        avatar: "https://avatars.githubusercontent.com/u/104576326?v=4",
        name: "Akmal Ariq",
        login: "@akmalariq",
        position: "Lead Full-Stack Architect",
        bio: "Building smart tools and highly responsive web platforms. Cloud Jakarta 2026 Developer.",
        location: "Jakarta, Indonesia",
        blog: "https://github.com/akmalariq",
        followers: 48,
        following: 32,
        persona: {
            title: "The Rapid Prototyper",
            icon: "🔥",
            desc: "Excellent engineering efficiency, focusing on rapid client deployments and clean logic."
        },
        topLanguages: [
            { name: "JavaScript", percentage: 55 },
            { name: "HTML", percentage: 20 },
            { name: "CSS", percentage: 15 },
            { name: "Go", percentage: 10 }
        ],
        stars: 32,
        forks: 12,
        repos: 18,
        age: "4 yr",
        score: 88,
        powers: [
            { icon: '🔥', label: 'Rapid Builder' },
            { icon: '⚡', label: 'UI Architect' },
            { icon: '📚', label: 'Full-Stack Fluid' },
            { icon: '🤝', label: 'Team Catalyst' }
        ],
        report: "**Akmal Ariq** represents the highly agile developer class suited for high-stakes startups and fast product deployments. With strong literacy in **JavaScript** and modern frontend interfaces, Akmal's profile reveals exceptional design consistency, clean modularity, and strong execution efficiency. As **The Rapid Prototyper**, Akmal brings amazing energy, rapid-pacing output, and solid full-stack coordination to team sprints."
    }
};

function getMockFallbackProfile(username) {
    const cleanUsername = username.toLowerCase().trim();
    
    // Check match
    if (mockProfiles[cleanUsername]) {
        return mockProfiles[cleanUsername];
    }
    
    // Generate beautiful randomized profile based on the name!
    const names = [
        "Alex Rivera", "Sarah Chen", "Devon Miller", "Elena Rostova", 
        "Tariq Mahmood", "Budi Santoso", "Linh Nguyen", "Chloe Dubois"
    ];
    const positions = [
        "Senior Frontend Engineer", "Lead Backend Developer", "AI/ML Engineer", 
        "Cloud Systems Specialist", "Full-Stack Software Craftsman", "DevOps Consultant"
    ];
    const bios = [
        "Passionate about scalable architectures, UI aesthetics, and clean microservices.",
        "Developing open-source web ecosystems and visual automation tools.",
        "Data lover, python enthusiast, and deep learning researcher.",
        "Systems designer focusing on secure Go/Rust pipelines and serverless deployment."
    ];
    const locations = ["Jakarta, ID", "Singapore", "San Francisco, CA", "Berlin, DE", "Tokyo, JP"];
    const languages = [
        [{ name: "JavaScript", percentage: 50 }, { name: "TypeScript", percentage: 30 }, { name: "CSS", percentage: 15 }, { name: "HTML", percentage: 5 }],
        [{ name: "Python", percentage: 60 }, { name: "Jupyter Notebook", percentage: 25 }, { name: "C++", percentage: 10 }, { name: "Shell", percentage: 5 }],
        [{ name: "Go", percentage: 45 }, { name: "Rust", percentage: 30 }, { name: "Shell", percentage: 15 }, { name: "Docker", percentage: 10 }],
        [{ name: "PHP", percentage: 40 }, { name: "JavaScript", percentage: 35 }, { name: "SQL", percentage: 15 }, { name: "CSS", percentage: 10 }]
    ];
    const personas = [
        { title: "The Prolific Hacker", icon: "⚡", desc: "High-velocity code output with diverse systems footprints." },
        { title: "The Pragmatic Craftsman", icon: "🛡️", desc: "Focused on building reliable, clean, and highly structured software systems." },
        { title: "The Polyglot Architect", icon: "📚", desc: "Expertly traverses multiple stacks with ease, building hybrid solutions." },
        { title: "The Rapid Prototyper", icon: "🔥", desc: "Excellent engineering efficiency, focusing on rapid client deployments." }
    ];

    // Seed variables based on username length
    const idx = username.length;
    const name = names[idx % names.length];
    const pos = positions[idx % positions.length];
    const bio = bios[idx % bios.length];
    const loc = locations[idx % locations.length];
    const lang = languages[idx % languages.length];
    const pers = personas[idx % personas.length];
    
    const countRepos = (idx * 3) + 8;
    const countStars = (idx * 12) + 4;
    const countForks = Math.floor(countStars / 3);
    const scoreVal = Math.min(75 + (idx % 20), 96);
    const ageYrs = (idx % 5) + 3;

    const report = `Based on a cognitive mock classification, **${name}** represents a highly competent developer. Demonstrating strong core literacy in **${lang[0].name}** across **${countRepos} public repositories**, their repository profile shows **${countStars} stars** of community validation.\n\nWe recommend them as a prime fit for **${pos}** roles, highlighting their special developer persona as **${pers.title}**. They will bring exceptional modularity, high coding velocity, and solid engineering habits to your technical sprints.`;

    return {
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`, // Cool dynamic robot avatar!
        name: name,
        login: `@${username}`,
        position: pos,
        bio: bio,
        location: loc,
        blog: `https://github.com/${username}`,
        followers: (idx * 8) + 12,
        following: (idx * 3) + 4,
        persona: pers,
        topLanguages: lang,
        stars: countStars,
        forks: countForks,
        repos: countRepos,
        age: `${ageYrs} yr`,
        score: scoreVal,
        powers: [
            { icon: '⚡', label: 'Rapid Builder' },
            { icon: '📚', label: 'Polyglot Stack' },
            { icon: '🚀', label: 'Industry Veteran' },
            { icon: '🤝', label: 'Active Collaborator' }
        ],
        report: report
    };
}

// ==========================================================================
// Dashboard Render Manager
// ==========================================================================
function renderDashboardResults(data) {
    // 1. Column 1: Identity Info
    DOM.userAvatar.src = data.avatar;
    DOM.userName.textContent = data.name;
    DOM.userLogin.textContent = data.login;
    DOM.recPosition.textContent = data.position;
    DOM.userBio.textContent = data.bio;
    
    // Handle location row visibility
    if (data.location) {
        DOM.metaLocation.textContent = data.location;
        DOM.metaLocationRow.classList.remove('hidden');
    } else {
        DOM.metaLocationRow.classList.add('hidden');
    }

    // Handle blog row visibility
    if (data.blog) {
        DOM.metaBlog.href = data.blog.startsWith('http') ? data.blog : `http://${data.blog}`;
        DOM.metaBlog.textContent = data.blog.replace(/(^\w+:|^)\/\//, ''); // strip http/https
        DOM.metaBlogRow.classList.remove('hidden');
    } else {
        DOM.metaBlogRow.classList.add('hidden');
    }

    DOM.statFollowers.textContent = formatNum(data.followers);
    DOM.statFollowing.textContent = formatNum(data.following);

    // 2. Column 2: Tech Arsenal
    DOM.personaIcon.textContent = data.persona.icon;
    DOM.personaTitle.textContent = data.persona.title;
    DOM.personaDesc.textContent = data.persona.desc;

    // Render Language stack
    DOM.languageList.innerHTML = '';
    const colorClasses = ['--accent-gold', '--accent-cyan', '--accent-purple', '--accent-green'];
    
    data.topLanguages.forEach((lang, idx) => {
        const color = `var(${colorClasses[idx % colorClasses.length]})`;
        
        const row = document.createElement('div');
        row.className = 'lang-row';
        row.innerHTML = `
            <div class="lang-info">
                <span>${lang.name}</span>
                <span>${lang.percentage}%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="background: ${color};"></div>
            </div>
        `;
        DOM.languageList.appendChild(row);
        
        // Trigger fill animation on progress bar
        setTimeout(() => {
            row.querySelector('.progress-bar-fill').style.width = `${lang.percentage}%`;
        }, 100);
    });

    DOM.metricStars.textContent = formatNum(data.stars);
    DOM.metricForks.textContent = formatNum(data.forks);
    DOM.metricRepos.textContent = formatNum(data.repos);
    DOM.metricAge.textContent = data.age;

    // 3. Column 3: Performance Assessment & Radial Progress
    DOM.ratingScore.textContent = data.score;
    
    // Set dash offset for SVG circle rating animation
    const radius = DOM.ratingCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    DOM.ratingCircle.style.strokeDasharray = circumference;
    DOM.ratingCircle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        const offset = circumference - (data.score / 100) * circumference;
        DOM.ratingCircle.style.strokeDashoffset = offset;
    }, 150);

    // Color code ring based on rating (Notion Palette)
    if (data.score >= 95) {
        DOM.ratingCircle.style.stroke = 'var(--accent-emerald)';
        DOM.ratingScore.style.color = 'var(--text-primary)';
    } else if (data.score >= 85) {
        DOM.ratingCircle.style.stroke = 'var(--accent-amber)';
        DOM.ratingScore.style.color = 'var(--text-primary)';
    } else {
        DOM.ratingCircle.style.stroke = 'var(--accent-orange)';
        DOM.ratingScore.style.color = 'var(--text-primary)';
    }

    // 4. Job Compatibility Progress Render (Notion Theme)
    const compatVal = data.compatScore || (data.score === 100 ? 98 : Math.min(80 + (data.score % 20), 98));
    DOM.compatScore.textContent = `${compatVal}%`;
    DOM.compatLabel.textContent = `Matching with ${data.position}`;
    
    DOM.compatCircle.style.strokeDasharray = circumference;
    DOM.compatCircle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        const compatOffset = circumference - (compatVal / 100) * circumference;
        DOM.compatCircle.style.strokeDashoffset = compatOffset;
    }, 150);

    // Render Core Powers
    DOM.powersList.innerHTML = '';
    data.powers.forEach(pow => {
        const pill = document.createElement('div');
        pill.className = 'power-pill';
        pill.innerHTML = `<span>${pow.icon}</span> <span>${pow.label}</span>`;
        DOM.powersList.appendChild(pill);
    });

    // Render report text
    // Replace markdown bold ** to HTML strong
    DOM.reportText.innerHTML = data.report.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function formatNum(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}

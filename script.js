document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Drawer Navigation
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (mobileMenuToggle && mobileDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });
    }

    if (mobileMenuClose && mobileDrawer) {
        mobileMenuClose.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (mobileDrawer) {
                mobileDrawer.classList.remove('open');
            }
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // 4. Dark & Light Theme Switcher
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 5. Ambient Follow Mouse Glow Effect (Desktop only)
    const glow1 = document.getElementById('glow-1');
    const glow2 = document.getElementById('glow-2');

    if (window.innerWidth > 968) {
        let mouseX = 0;
        let mouseY = 0;
        let glow1X = -200;
        let glow1Y = -200;
        let glow2X = window.innerWidth;
        let glow2Y = window.innerHeight;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth laggy animation loop for the glow blobs
        function animateGlow() {
            // Glow 1 follows cursor closely
            glow1X += (mouseX - glow1X - 300) * 0.08;
            glow1Y += (mouseY - glow1Y - 300) * 0.08;

            // Glow 2 moves in opposition
            const oppX = window.innerWidth - mouseX;
            const oppY = window.innerHeight - mouseY;
            glow2X += (oppX - glow2X - 300) * 0.05;
            glow2Y += (oppY - glow2Y - 300) * 0.05;

            if (glow1) {
                glow1.style.transform = `translate3d(${glow1X}px, ${glow1Y}px, 0)`;
            }
            if (glow2) {
                glow2.style.transform = `translate3d(${glow2X}px, ${glow2Y}px, 0)`;
            }

            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // 6. Scroll Reveal Observer
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const skillsSection = document.getElementById('skills');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
        if (element.id === 'skills') {
            element.classList.add('animated');
        }
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Run once on load to show elements already in view
    handleScrollAnimation();


    // 7. Interactive Terminal Simulator
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const terminalWindow = document.querySelector('.terminal-window');

    // Keep focus on input when clicking inside the terminal
    if (terminalWindow && terminalInput) {
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    if (terminalInput && terminalBody) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandText = terminalInput.value.trim();
                terminalInput.value = '';
                
                // Print command prompt line
                printOutputLine(`guest@saurabh-cli:~$ ${commandText}`, 'text-success');

                if (commandText !== '') {
                    executeCommand(commandText.toLowerCase());
                }
                
                // Auto scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    function printOutputLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-output-line ${className}`;
        line.textContent = text;
        // Insert before the input container
        const inputContainer = terminalBody.querySelector('.terminal-input-container');
        terminalBody.insertBefore(line, inputContainer);
    }

    function executeCommand(cmd) {
        const args = cmd.split(' ');
        const primaryCmd = args[0];

        switch (primaryCmd) {
            case 'help':
                printOutputLine('Available Commands:', 'text-accent');
                printOutputLine('  about       - Brief introduction about Saurabh');
                printOutputLine('  skills      - View technical stacks & expertise level');
                printOutputLine('  experience  - View professional work history');
                printOutputLine('  leetcode    - Check competitive coding status');
                printOutputLine('  contact     - Print email, github & socials');
                printOutputLine('  clear       - Clear the screen buffer');
                printOutputLine('  secret      - Trigger backend developer easter egg');
                break;

            case 'about':
                printOutputLine('Saurabh Verma — Senior Backend Engineer');
                printOutputLine('Education: B.Tech in Information Technology, NIT Srinagar (CGPA: 8.79)');
                printOutputLine('Experience: 6+ Years architecting distributed backend services.');
                printOutputLine('Focus: Scalability, API latencies, high-scale database modeling, financial ledger systems.');
                break;

            case 'skills':
                printOutputLine('Languages: GoLang (Advanced), Java (Advanced), Spring Boot, Python, SQL', 'text-accent');
                printOutputLine('Infrastructure: Kafka, AWS, Microservices, Temporal workflows, Docker, gRPC, Protobuf', 'text-accent');
                printOutputLine('Databases: MySQL, PostgreSQL, Redis, Elasticsearch, DynamoDB, S2-caching', 'text-accent');
                break;

            case 'experience':
                printOutputLine('[1] CRED | Backend Engineer (April 2023 - Present)', 'text-accent');
                printOutputLine('    * Led 0-to-1 design of CRED Money & NetWorth (2.5M+ active users, 7M+ daily transactions).');
                printOutputLine('    * Slashed p95 latency from 2s to <300ms, optimizing infra costs by 25%.');
                printOutputLine('    * Built orchestrator libraries used company-wide.');
                printOutputLine('[2] nurture.farm | Senior Backend Engineer (March 2021 - April 2023)');
                printOutputLine('    * Designed e-commerce logistics platform and field agent portal (10k+ agents).');
                printOutputLine('    * Built S2-cell weather caching, saving 41% third-party API expense.');
                printOutputLine('[3] WheelsEye Technology | Software Developer (April 2020 - March 2021)');
                printOutputLine('    * Engineered core payment mechanisms, increasing transaction success rate to 88%.');
                printOutputLine('    * Programmed Automated Fastag reconciliation engine (300k+ daily processes).');
                break;

            case 'leetcode':
                printOutputLine('LeetCode profile status: Guardian (Top 1.1% globally)', 'text-accent');
                printOutputLine('Total Solved: 824 Problems');
                printOutputLine('  * Easy: 248 Solved');
                printOutputLine('  * Medium: 476 Solved');
                printOutputLine('  * Hard: 100 Solved');
                printOutputLine('Contest Rating: 2,184');
                break;

            case 'contact':
                printOutputLine('Contact Channels:', 'text-accent');
                printOutputLine('  Email:    saurabhvipin55@gmail.com');
                printOutputLine('  LinkedIn: linkedin.com/in/saurabh-verma-970117156');
                printOutputLine('  GitHub:   github.com/saurabh0vipin');
                printOutputLine('  LeetCode: leetcode.com/u/saurabh0vipin');
                break;

            case 'clear':
                // Remove all children except the input container
                const lines = terminalBody.querySelectorAll('.terminal-output-line');
                lines.forEach(line => line.remove());
                break;

            case 'secret':
                printOutputLine('Connecting to prod-database-cluster...', 'text-muted');
                setTimeout(() => {
                    printOutputLine('WARNING: UNRESTRICTED ACCESS GRANTED.', 'text-error');
                    printOutputLine('Running payload: [rm -rf /production/databases] ...', 'text-error');
                    setTimeout(() => {
                        printOutputLine('Just kidding! A Senior Backend Engineer knows never to run rm -rf on prod. (Database is healthy!)', 'text-success');
                        terminalBody.scrollTop = terminalBody.scrollHeight;
                    }, 1000);
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 800);
                break;

            default:
                printOutputLine(`Command not found: '${cmd}'. Type 'help' to see list of commands.`, 'text-error');
        }
    }
});

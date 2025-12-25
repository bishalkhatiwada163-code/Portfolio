// ========================================
// NAVIGATION
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Page loader
const pageLoader = document.createElement('div');
pageLoader.className = 'page-loader';
pageLoader.innerHTML = `
    <div class="loader-content">
        <div class="loader-spinner"></div>
        <div class="loader-text">Loading Portfolio...</div>
    </div>
`;
document.body.appendChild(pageLoader);

const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    .page-loader.hidden {
        opacity: 0;
        visibility: hidden;
    }
    .loader-content {
        text-align: center;
    }
    .loader-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(99, 102, 241, 0.2);
        border-top: 4px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    .loader-text {
        color: #cbd5e1;
        font-size: 1.2rem;
        font-weight: 500;
        animation: pulse 2s ease-in-out infinite;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);

window.addEventListener('load', () => {
    setTimeout(() => {
        pageLoader.classList.add('hidden');
        setTimeout(() => pageLoader.remove(), 500);
    }, 800);
});

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Add ripple effect to clickable elements
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .social-link, .project-link {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn, .social-link, .project-link').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Navbar scroll effect with dynamic styling
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        navbar.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.75)';
        navbar.style.boxShadow = 'none';
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// TYPING EFFECT
// ========================================
const typingText = document.getElementById('typingText');
const titles = [
    'Full Stack Developer 🚀',
    'UI/UX Enthusiast 🎨',
    'Problem Solver 🧩',
    'Creative Thinker 💡',
    'Tech Innovator 🔥',
    'Code Craftsman ⚡'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2500; // Longer pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect with slight delay
setTimeout(typeEffect, 500);

// ========================================
// COUNTER ANIMATION
// ========================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ========================================
// GITHUB API INTEGRATION
// ========================================
const githubUsername = document.getElementById('githubUsername');
const loadReposBtn = document.getElementById('loadRepos');
const projectsGrid = document.getElementById('projectsGrid');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');

// Default GitHub username
const defaultUsername = 'bishalkhatiwada163-code';

// Load username from localStorage or use default
const savedUsername = localStorage.getItem('githubUsername') || defaultUsername;
githubUsername.value = savedUsername;

// Auto-load repositories on page load
loadGithubRepos(savedUsername);
fetchGitHubUserInfo(savedUsername);

loadReposBtn.addEventListener('click', () => {
    const username = githubUsername.value.trim();
    if (username) {
        localStorage.setItem('githubUsername', username);
        loadGithubRepos(username);
    } else {
        alert('Please enter a GitHub username');
    }
});

// Allow Enter key to trigger load
githubUsername.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadReposBtn.click();
    }
});

async function loadGithubRepos(username) {
    // Show loading state
    emptyState.style.display = 'none';
    loadingState.style.display = 'block';
    projectsGrid.innerHTML = '';
    
    try {
        // Fetch user repos
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('User not found or API limit reached');
        }
        
        const repos = await response.json();
        
        // Hide loading state
        loadingState.style.display = 'none';
        
        if (repos.length === 0) {
            emptyState.innerHTML = `
                <i class="fab fa-github"></i>
                <h3>No Repositories Found</h3>
                <p>This user doesn't have any public repositories yet.</p>
            `;
            emptyState.style.display = 'block';
            return;
        }
        
        // Filter out forks (optional) and sort by stars
        const filteredRepos = repos
            .filter(repo => !repo.fork) // Remove forks
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 12); // Show top 12 repos
        
        // Display repos
        displayRepos(filteredRepos);
        
        // Update GitHub link in hero section
        document.getElementById('githubLink').href = `https://github.com/${username}`;
        
    } catch (error) {
        loadingState.style.display = 'none';
        emptyState.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <h3>Error Loading Repositories</h3>
            <p>${error.message}</p>
            <p style="font-size: 0.875rem; margin-top: 1rem;">
                Note: GitHub API has a rate limit. If you're not authenticated, 
                you can only make 60 requests per hour.
            </p>
        `;
        emptyState.style.display = 'block';
        console.error('Error fetching repos:', error);
    }
}

function displayRepos(repos) {
    projectsGrid.innerHTML = '';
    projectsGrid.style.opacity = '0';
    
    repos.forEach((repo, index) => {
        setTimeout(() => {
            const card = createProjectCard(repo, index);
            projectsGrid.appendChild(card);
        }, index * 50);
    });
    
    setTimeout(() => {
        projectsGrid.style.transition = 'opacity 0.5s ease';
        projectsGrid.style.opacity = '1';
        
        // Re-apply tilt effect to new cards
        setTimeout(() => {
            addTiltEffect('.project-card');
        }, 500);
    }, repos.length * 50 + 100);
}

function createProjectCard(repo, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Get language color
    const languageColor = getLanguageColor(repo.language);
    
    // Create topics HTML
    let topicsHTML = '';
    if (repo.topics && repo.topics.length > 0) {
        const topicsToShow = repo.topics.slice(0, 5);
        topicsHTML = topicsToShow.map(topic => 
            `<span class="topic-tag">${topic}</span>`
        ).join('');
    }
    
    // Format dates
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">
                <i class="fas fa-folder"></i>
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link" title="View on GitHub">
                    <i class="fab fa-github"></i>
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link" title="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                ` : ''}
            </div>
        </div>
        <h3 class="project-title">${repo.name}</h3>
        <p class="project-description">
            ${repo.description || 'No description available for this repository.'}
        </p>
        ${topicsHTML ? `<div class="project-topics">${topicsHTML}</div>` : ''}
        <div class="project-stats">
            ${repo.language ? `
                <div class="project-stat">
                    <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${languageColor};"></span>
                    <span>${repo.language}</span>
                </div>
            ` : ''}
            <div class="project-stat">
                <i class="fas fa-star"></i>
                <span>${repo.stargazers_count}</span>
            </div>
            <div class="project-stat">
                <i class="fas fa-code-branch"></i>
                <span>${repo.forks_count}</span>
            </div>
            <div class="project-stat">
                <i class="fas fa-clock"></i>
                <span>${updatedDate}</span>
            </div>
        </div>
    `;
    
    return card;
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C': '#555555',
        'C#': '#178600',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Dart': '#00B4AB',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Vue': '#41b883',
        'React': '#61dafb',
        'Shell': '#89e051',
        'Jupyter Notebook': '#DA5B0B'
    };
    
    return colors[language] || '#8b949e';
}

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a backend service
    // For demo purposes, we'll just show an alert
    alert(`Thank you for your message, ${data.name}! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
    
    // Optional: Send to a service like Formspree, EmailJS, or your own backend
    // Example with Formspree:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //         'Accept': 'application/json'
    //     }
    // }).then(response => {
    //     if (response.ok) {
    //         alert('Message sent successfully!');
    //         contactForm.reset();
    //     }
    // }).catch(error => {
    //     alert('Error sending message. Please try again.');
    // });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const animateOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// Observe sections for animation
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = `opacity 1s ease ${index * 0.1}s, transform 1s ease ${index * 0.1}s`;
    animateOnScrollObserver.observe(section);
});

// Reset section animations for hero (should be visible immediately)
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';

// Subtle parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    if (scrolled < window.innerHeight) {
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Animate elements on scroll with stagger effect
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.2
});

// Apply stagger animation to skill items and project cards
const staggerContainers = document.querySelectorAll('.skill-items, .about-stats, .project-stats');
staggerContainers.forEach(container => {
    Array.from(container.children).forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    staggerObserver.observe(container);
});

// ========================================
// CUSTOMIZATION HELPERS
// ========================================

// Update user name
function updateUserName(name) {
    document.getElementById('nameText').textContent = name;
    document.querySelectorAll('.footer p')[0].textContent = 
        `© ${new Date().getFullYear()} ${name}. Built with passion and lots of coffee ☕`;
}

// Update profile image with smooth transition
function updateProfileImage(imageUrl) {
    const img = document.getElementById('profileImage');
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        img.src = imageUrl;
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 300);
}

// Floating animation removed for cleaner look

// Auto-fetch user info when GitHub username is loaded
async function fetchGitHubUserInfo(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
            const user = await response.json();
            
            // Update profile image if available
            // if (user.avatar_url) {
            //     updateProfileImage(user.avatar_url);
            // }
            
            // Update name if available
            if (user.name) {
                updateUserName(user.name);
            }
            
            // Update bio if available
            if (user.bio) {
                const aboutDescription = document.querySelector('.about-description');
                if (aboutDescription) {
                    aboutDescription.textContent = user.bio;
                }
            }
            
            // Update location
            if (user.location) {
                const locationElement = document.querySelector('.info-item:nth-child(2) span');
                if (locationElement) {
                    locationElement.textContent = user.location;
                }
            }
            
            // Update stats
            const statsNumbers = document.querySelectorAll('.stat-number');
            if (user.public_repos && statsNumbers[1]) {
                statsNumbers[1].setAttribute('data-target', user.public_repos);
                statsNumbers[1].textContent = user.public_repos + '+';
            }
        }
    } catch (error) {
        console.log('Could not fetch user info:', error);
    }
}

// Fetch user info when username is available
if (savedUsername) {
    fetchGitHubUserInfo(savedUsername);
}

// Also fetch when new username is loaded
loadReposBtn.addEventListener('click', () => {
    const username = githubUsername.value.trim();
    if (username) {
        fetchGitHubUserInfo(username);
    }
});

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Lazy load images with fade-in effect
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.8s ease';
            
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
            
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: var(--text-primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeNavStyle);

// Preload critical assets
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// ========================================
// SUBTLE MOUSE TRACKING
// ========================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor glow removed for cleaner experience

// ========================================
// SMOOTH SCROLL PROGRESS BAR
// ========================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        z-index: 10000;
        transform-origin: left;
        transition: transform 0.1s ease;
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
`;
document.head.appendChild(progressStyle);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.transform = `scaleX(${scrolled / 100})`;
    progressBar.style.width = '100%';
});

// ========================================
// TILT EFFECT FOR CARDS
// ========================================
function addTiltEffect(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Apply tilt effect to cards
setTimeout(() => {
    addTiltEffect('.project-card');
    addTiltEffect('.skill-category');
    addTiltEffect('.experience-card');
    addTiltEffect('.stat-item');
}, 1000);

// Text reveal animation removed for cleaner look

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; color: #6366f1; text-shadow: 0 0 10px rgba(99,102,241,0.5);');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 16px; color: #8b5cf6;');
console.log('%cGitHub Portfolio | Crafted with ❤️ and ☕', 'font-size: 14px; color: #94a3b8;');
console.log('%cWant to know a secret? Try typing: portfolio.surprise()', 'font-size: 12px; color: #ec4899; font-style: italic;');

// Easter egg function
window.portfolio = {
    surprise: () => {
        console.log('%c🎉 Surprise! You found the secret!', 'font-size: 20px; color: #10b981;');
        console.log('%cHere\'s a special message: Keep coding and stay awesome! 🚀', 'font-size: 14px; color: #8b5cf6;');
        
        // Trigger celebration animation
        const confetti = document.createElement('div');
        confetti.innerHTML = '🎊'.repeat(50);
        confetti.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99999;
            font-size: 3rem;
            animation: confettiFall 3s ease-out forwards;
        `;
        document.body.appendChild(confetti);
        
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(-100%); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(confettiStyle);
        
        setTimeout(() => confetti.remove(), 3000);
    }
};

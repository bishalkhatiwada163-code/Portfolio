// ========================================
// NAVIGATION
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// TYPING EFFECT
// ========================================
const typingText = document.getElementById('typingText');
const titles = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Creative Thinker',
    'Tech Innovator'
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
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

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
    
    repos.forEach((repo, index) => {
        const card = createProjectCard(repo, index);
        projectsGrid.appendChild(card);
    });
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
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    animateOnScrollObserver.observe(section);
});

// Reset section animations for hero (should be visible immediately)
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';

// ========================================
// CUSTOMIZATION HELPERS
// ========================================

// Update user name
function updateUserName(name) {
    document.getElementById('nameText').textContent = name;
    document.querySelectorAll('.footer p')[0].textContent = 
        `© ${new Date().getFullYear()} ${name}. Built with passion and lots of coffee ☕`;
}

// Update profile image
function updateProfileImage(imageUrl) {
    document.getElementById('profileImage').src = imageUrl;
}

// Auto-fetch user info when GitHub username is loaded
async function fetchGitHubUserInfo(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
            const user = await response.json();
            
            // Update profile image if available
            if (user.avatar_url) {
                updateProfileImage(user.avatar_url);
            }
            
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

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Preload critical assets
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #8b5cf6;');
console.log('%cGitHub Portfolio | Built with ❤️', 'font-size: 12px; color: #94a3b8;');

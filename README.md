# 🚀 Beautiful Portfolio Website with GitHub Integration

A stunning, fully responsive portfolio website that automatically syncs with your GitHub repositories. Built with modern web technologies and beautiful animations.

## ✨ Features

- **🎨 Modern Design**: Beautiful gradient backgrounds, glass morphism effects, and smooth animations
- **📱 Fully Responsive**: Mobile-first design that looks great on all devices
- **🔗 GitHub Integration**: Automatically fetches and displays your repositories
- **⚡ Fast & Optimized**: Lightweight and performance-optimized
- **🎭 Animated Elements**: Typing effect, counter animations, and scroll animations
- **🌈 Customizable**: Easy to customize colors, content, and styling
- **📧 Contact Form**: Built-in contact form (ready for backend integration)

## 🎯 Live Demo

Simply open `index.html` in your browser to see the portfolio in action!

## 🛠️ Setup Instructions

### 1. Quick Start

1. **Download/Clone** this project to your computer
2. **Open** `index.html` in your web browser
3. **Enter your GitHub username** in the projects section
4. **Click "Load Projects"** to automatically fetch your repositories

### 2. Customization

Edit the following in `index.html`:

#### Personal Information

```html
<!-- Line 51: Change your name -->
<span class="gradient-text" id="nameText">Your Name</span>

<!-- Line 67-69: Update social links -->
<a href="https://github.com/YOUR_USERNAME" target="_blank" class="social-link" id="githubLink">
<a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" class="social-link">
<a href="https://twitter.com/YOUR_USERNAME" target="_blank" class="social-link">

<!-- Line 71: Update email -->
<a href="mailto:your.email@example.com" class="social-link">

<!-- Line 76: Update profile image -->
<img src="YOUR_IMAGE_URL_OR_PATH" alt="Profile" id="profileImage">
```

#### About Section

```html
<!-- Lines 93-100: Update your bio -->
<p class="about-description">
    Write your own bio here...
</p>
```

#### Skills

```html
<!-- Lines 135-180: Add/remove skills -->
<span class="skill-badge">Your Skill</span>
```

#### Contact Information

```html
<!-- Lines 251-261: Update contact details -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
<span>Your Location</span>
<a href="tel:+1234567890">+1 (234) 567-890</a>
```

### 3. GitHub Integration Setup

The portfolio automatically connects to GitHub:

1. **Open the website** in your browser
2. **Scroll to the Projects section**
3. **Enter your GitHub username** in the input field
4. **Click "Load Projects"**
5. Your repositories will be automatically displayed!

**Note**: The website uses GitHub's public API which has a rate limit of 60 requests per hour for unauthenticated users.

### 4. Customize Colors & Styling

Edit `styles.css` to change colors:

```css
:root {
    --primary-color: #6366f1;    /* Main purple/blue */
    --secondary-color: #8b5cf6;  /* Secondary purple */
    --accent-color: #ec4899;     /* Pink accent */
    /* ... more colors ... */
}
```

### 5. Contact Form Integration

The contact form currently shows an alert. To make it functional:

#### Option 1: Formspree (Easiest)

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up and create a new form
3. Get your form endpoint
4. Update `script.js` (around line 420):

```javascript
// Uncomment and update this code:
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
    }
}).catch(error => {
    alert('Error sending message. Please try again.');
});
```

#### Option 2: EmailJS

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Set up an email service
3. Follow their documentation to integrate

#### Option 3: Your Own Backend

Create your own backend API and update the form submission handler in `script.js`.

## 📁 Project Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, animations
- **JavaScript**: Vanilla JS for interactions and GitHub API
- **Font Awesome**: Icons
- **Google Fonts**: Poppins font family
- **GitHub API**: Repository integration

## 🌟 Key Features Explained

### Auto-Update from GitHub

The website uses the GitHub REST API to fetch:
- Repository names and descriptions
- Programming languages
- Star and fork counts
- Repository topics/tags
- Last update dates
- Links to live demos (if homepage is set)

### Responsive Design

The website is fully responsive with breakpoints at:
- 📱 Mobile: < 480px
- 📱 Tablet: < 768px
- 💻 Desktop: < 968px
- 🖥️ Large Desktop: > 968px

### Animations

- Typing effect for job titles
- Counter animations for statistics
- Scroll-triggered fade-in animations
- Hover effects on all interactive elements
- Floating shapes background animation

## 🚀 Deployment

### GitHub Pages (Free & Easy)

1. Create a GitHub repository
2. Upload all files (index.html, styles.css, script.js)
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Netlify (Recommended)

1. Go to [Netlify.com](https://www.netlify.com/)
2. Drag and drop your project folder
3. Your site is live instantly!
4. You get a custom URL like `your-site.netlify.app`

### Vercel

1. Go to [Vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Deploy with one click

## 🔧 Troubleshooting

### GitHub Repos Not Loading

- **Check username spelling**: Make sure the GitHub username is correct
- **API rate limit**: GitHub limits unauthenticated requests to 60/hour
- **No repositories**: User might not have public repositories
- **Network issues**: Check your internet connection

### Styling Issues

- **Clear browser cache**: Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- **Check file paths**: Make sure all files are in the same folder
- **Browser compatibility**: Use a modern browser (Chrome, Firefox, Safari, Edge)

## 📝 Customization Tips

1. **Change typing titles**: Edit the `titles` array in `script.js` (line 48)
2. **Add more skills**: Copy and paste skill badges in `index.html`
3. **Change animations**: Modify CSS keyframes in `styles.css`
4. **Update statistics**: Change `data-target` values on stat numbers
5. **Add sections**: Copy existing section structure and customize

## 🎓 Learn More

This portfolio demonstrates:
- Modern CSS techniques (Grid, Flexbox, Custom Properties)
- JavaScript ES6+ features (async/await, fetch API)
- RESTful API integration
- Responsive design principles
- Animation and transition effects
- Intersection Observer API
- Local Storage usage

## 📄 License

This project is open source and available for personal and commercial use. Feel free to customize it for your own portfolio!

## 🤝 Contributing

Found a bug or want to improve something? Feel free to:
1. Fork the project
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💬 Support

If you have questions or need help:
- Check the troubleshooting section above
- Review the customization tips
- Inspect the browser console for errors

## 🌟 Show Your Support

If you like this portfolio template:
- ⭐ Star the repository
- 🔄 Share it with others
- 🎨 Customize it and make it your own!

---

**Built with ❤️ and lots of coffee ☕**

*Happy coding! 🚀*

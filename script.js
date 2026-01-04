// ===== DOM Elements =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const germanToggle = document.getElementById('germanToggle');
const contactForm = document.getElementById('contactForm');
const backToTop = document.getElementById('backToTop');

// ===== MOBILE MENU TOGGLE =====
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// ===== DARK/LIGHT THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}

// ===== GERMAN LANGUAGE TOGGLE (DEMO) =====
germanToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    const translations = {
        'Jenny Yu': 'Jenny Yu',
        'COMPUTER SCIENCE GRADUATE': 'INFORMATIKABSCHLUSS',
        'Transitioning professional with international experience in Ireland, Dubai, and Africa. Currently seeking Frontend Engineer positions in German tech startups.':
        'Berufsumsteigerin mit internationaler Erfahrung in Irland, Dubai und Afrika. Derzeit auf der Suche nach Frontend Engineer-Stellen in deutschen Tech-Startups.',
        'Get in Touch': 'Kontakt aufnehmen',
        'View Projects': 'Projekte ansehen',
        'Professional Experience': 'Berufserfahrung',
        'Software Engineering Intern': 'Praktikum Softwareentwicklung',
        'Turbo Last Mile Ltd, Dublin, Ireland': 'Turbo Last Mile Ltd, Dublin, Irland',
        'Office Assistant': 'Büroassistentin',
        'Zheng Tong Building Materials Ltd, Dubai, UAE': 'Zheng Tong Building Materials Ltd, Dubai, VAE',
        'Guest Experience Associate': 'Gastbetreuerin',
        'Guinness Storehouse, Dublin, Ireland': 'Guinness Storehouse, Dublin, Irland',
        'International Sales Executive': 'Internationale Vertriebsleiterin',
        'Zhong Xin Technology Co., Ltd., Shenzhen, China': 'Zhong Xin Technology Co., Ltd., Shenzhen, China',
        'Technical Projects': 'Technische Projekte',
        'Showcasing hands-on experience with modern web technologies': 
        'Praktische Erfahrung mit modernen Webtechnologien',
        'Full-Stack E-Commerce Platform': 'Full-Stack E-Commerce Plattform',
        'Internship Project': 'Praktikumsprojekt',
        'Personal Portfolio Website': 'Persönliche Portfolio-Website',
        'Current Project': 'Aktuelles Projekt',
        'German Job Search Assistant': 'Deutsche Jobsuchhilfe',
        'In Progress': 'In Bearbeitung',
        'Technical Skills': 'Technische Fähigkeiten',
        'Frontend': 'Frontend',
        'Backend': 'Backend',
        'Tools & DevOps': 'Tools & DevOps',
        'Get in Touch': 'Kontakt',
        'Interested in connecting? I\'m actively seeking Frontend Engineer opportunities in German startups.':
        'Interesse an Kontakt? Ich suche aktiv nach Frontend Engineer-Stellen in deutschen Startups.',
        'Phone': 'Telefon',
        'Email': 'E-Mail',
        'Your Name': 'Ihr Name',
        'Your Email': 'Ihre E-Mail',
        'Subject': 'Betreff',
        'Your Message': 'Ihre Nachricht',
        'Send Message': 'Nachricht senden',
        '© 2024 Jenny Yu. All rights reserved.': '© 2024 Jenny Yu. Alle Rechte vorbehalten.',
        'Designed for German tech startup opportunities': 'Entworfen für deutsche Tech-Startup-Möglichkeiten',
        'Deutsch': 'English',
        'Dark Mode': 'Dunkelmodus',
        'Light Mode': 'Hellmodus'
    };
    
    // Check current language
    const isGerman = document.documentElement.lang === 'de';
    
    if (isGerman) {
        // Switch to English
        document.documentElement.lang = 'en';
        germanToggle.textContent = 'Deutsch';
        translatePage(false, translations);
    } else {
        // Switch to German
        document.documentElement.lang = 'de';
        germanToggle.textContent = 'English';
        translatePage(true, translations);
    }
});

function translatePage(toGerman, translations) {
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, a, button, li, td, th, input::placeholder, textarea::placeholder');
    
    elements.forEach(element => {
        if (element.hasAttribute('data-translate') === false) {
            const originalText = element.textContent.trim();
            if (translations[originalText]) {
                element.setAttribute('data-translate', 'true');
                element.setAttribute('data-original', originalText);
            }
        }
        
        const original = element.getAttribute('data-original');
        if (original && translations[original]) {
            if (toGerman) {
                element.textContent = translations[original];
            } else {
                element.textContent = original;
            }
        }
    });
    
    // Handle placeholders
    document.querySelectorAll('input, textarea').forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder && translations[placeholder]) {
            if (toGerman) {
                input.setAttribute('placeholder', translations[placeholder]);
            } else {
                const original = input.getAttribute('data-original-placeholder') || placeholder;
                input.setAttribute('placeholder', original);
            }
        }
    });
}

// ===== FORM VALIDATION =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll just show a success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== BACK TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMATE SKILL BARS ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-bar');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            skillBar.style.width = skillBar.style.width; // Trigger animation
        }
    });
}, observerOptions);

skillBars.forEach(bar => observer.observe(bar));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PROJECT COUNTER (DEMO) =====
const projectCounters = document.querySelectorAll('.project-badge');
let countersInitialized = false;

function initProjectCounters() {
    if (countersInitialized) return;
    
    projectCounters.forEach((badge, index) => {
        if (badge.textContent === 'Coming Soon') {
            const projectCard = badge.closest('.project-card');
            const techTags = projectCard.querySelectorAll('.tech-tag');
            
            techTags.forEach(tag => {
                tag.style.opacity = '0.6';
                tag.style.transform = 'scale(0.95)';
            });
            
            // Add pulse animation
            projectCard.style.animation = 'pulse 2s infinite';
        }
    });
    
    countersInitialized = true;
}

// Initialize counters when projects section is visible
const projectsSection = document.getElementById('projects');
const projectsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        initProjectCounters();
    }
}, { threshold: 0.3 });

projectsObserver.observe(projectsSection);

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ===== ENHANCE TIMELINE ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    timelineObserver.observe(item);
});

console.log('Portfolio website initialized successfully!');
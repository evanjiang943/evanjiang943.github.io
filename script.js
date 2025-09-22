// Smooth scrolling and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Shuffling text animation for hero name
    function shuffleHeroName() {
        const heroName = document.getElementById('hero-name');
        if (!heroName) return;
        
        const originalText = 'Evan Jiang.';
        const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
        
        // Clear the content and create letter spans
        heroName.innerHTML = '';
        const letterSpans = [];
        
        for (let i = 0; i < originalText.length; i++) {
            const span = document.createElement('span');
            span.className = 'letter';
            if (originalText[i] === ' ') {
                span.textContent = '\u00A0'; // Non-breaking space to ensure it displays
            } else {
                // Start with empty content - letters will appear when animation starts
                span.textContent = '';
            }
            heroName.appendChild(span);
            letterSpans.push(span);
        }
        
        // Animate each letter sequentially
        letterSpans.forEach((span, index) => {
            if (originalText[index] === ' ') {
                span.textContent = '\u00A0'; // Non-breaking space to ensure it displays
                return;
            }
            
            const delay = index * 80; // 80ms delay between each letter (faster)
            const shuffleDuration = 120; // How long each letter shuffles (fewer characters)
            const shuffleInterval = 30; // How fast the shuffling happens (faster)
            
            setTimeout(() => {
                let shuffleCount = 0;
                const maxShuffles = shuffleDuration / shuffleInterval;
                const isUpperCase = originalText[index] === originalText[index].toUpperCase();
                const shuffleChars = isUpperCase ? upperLetters : lowerLetters;
                
                const shuffleTimer = setInterval(() => {
                    if (shuffleCount < maxShuffles) {
                        span.textContent = shuffleChars[Math.floor(Math.random() * shuffleChars.length)];
                        shuffleCount++;
                    } else {
                        span.textContent = originalText[index];
                        clearInterval(shuffleTimer);
                    }
                }, shuffleInterval);
            }, delay);
        });
    }
    
    // Start the animation
    shuffleHeroName();
    // Add smooth reveal animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add subtle parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // Add click animation to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add typing animation to name (optional enhancement)
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add hover effect to cards with dynamic colors
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const colors = ['var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-green)', 'var(--accent-pink)'];
            const color = colors[index % colors.length];
            this.style.borderLeftColor = color;
        });
    });

    // Add smooth scroll for any internal links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add responsive navigation helper (for future enhancements)
    function handleResize() {
        const container = document.querySelector('.container');
        if (window.innerWidth < 768) {
            container.classList.add('mobile');
        } else {
            container.classList.remove('mobile');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Any scroll-based animations can be added here
        }, 10);
    });
});

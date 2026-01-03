// Lightweight interactions for the site
document.addEventListener('DOMContentLoaded', () => {
    shuffleHeroName();
    fadeInContent();
    wireNavTransitions();
    wireSkillTags();
    startClock();
});

function shuffleHeroName() {
    const heroName = document.getElementById('hero-name');
    if (!heroName) return;

    const originalText = 'evan jiang';
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';

    heroName.innerHTML = '';
    const letterSpans = [];

    for (let i = 0; i < originalText.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';

        if (originalText[i] === 'a') {
            span.className += ' letter-a';
        }

        span.textContent = originalText[i] === ' ' ? '\u00A0' : '';
        heroName.appendChild(span);
        letterSpans.push(span);
    }

    letterSpans.forEach((span, index) => {
        if (originalText[index] === ' ') {
            span.textContent = '\u00A0';
            return;
        }

        const delay = index * 80;
        const shuffleDuration = 120;
        const shuffleInterval = 30;

        setTimeout(() => {
            let shuffleCount = 0;
            const maxShuffles = shuffleDuration / shuffleInterval;

            const shuffleTimer = setInterval(() => {
                if (shuffleCount < maxShuffles) {
                    span.textContent = lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
                    shuffleCount++;
                } else {
                    span.textContent = originalText[index];
                    clearInterval(shuffleTimer);
                }
            }, shuffleInterval);
        }, delay);
    });
}

function fadeInContent() {
    const pageContent = document.querySelector('.content');
    if (!pageContent) return;

    pageContent.style.opacity = '0';
    pageContent.style.transform = 'translateY(10px)';
    pageContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    setTimeout(() => {
        pageContent.style.opacity = '1';
        pageContent.style.transform = 'translateY(0)';
    }, 100);
}

function wireNavTransitions() {
    const pageContent = document.querySelector('.content');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetUrl = link.href;

            if (pageContent) {
                pageContent.style.opacity = '0';
                pageContent.style.transform = 'translateY(-10px)';
            }

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 200);
        });
    });
}

function wireSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 150);
        });
    });
}

function updatePSTTime() {
    const now = new Date();
    const pstTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    const militaryTime = pstTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    const timeElement = document.getElementById('pst-time');
    if (timeElement) {
        timeElement.textContent = militaryTime;
    }
}

function startClock() {
    updatePSTTime();
    setInterval(updatePSTTime, 1000);
}

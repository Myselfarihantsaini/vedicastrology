// =============================================
// AstroSeeker — Main JavaScript
// =============================================

// ---- Animated Stars Background ----
function initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 200;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.3,
                alpha: Math.random(),
                speed: Math.random() * 0.005 + 0.002,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.alpha += star.speed * star.direction;
            if (star.alpha >= 1) { star.alpha = 1; star.direction = -1; }
            if (star.alpha <= 0.1) { star.alpha = 0.1; star.direction = 1; }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 67, ${star.alpha * 0.6})`;
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }

    resize();
    createStars();
    drawStars();
    window.addEventListener('resize', () => { resize(); createStars(); });
}

// ---- Navbar Scroll Effect ----
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ---- Mobile Menu ----
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
        });
    });
}

// ---- Scroll Reveal Animation ----
function initScrollReveal() {
    const elements = document.querySelectorAll('.post-card, .zodiac-card, .about-grid, .cta-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// ---- Render Posts on Home Page ----
function renderPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;

    postsGrid.innerHTML = '';

    postsData.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.style.transitionDelay = `${index * 0.1}s`;
        
        postCard.innerHTML = `
            <div class="post-image" style="background-image: url('${post.image}')">
                <span class="category-badge">${post.category}</span>
            </div>
            <div class="post-content">
                <span class="post-date">${post.date}</span>
                <h3 class="post-title"><a href="post.html?id=${post.id}">${post.title}</a></h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">Read Full Post →</a>
            </div>
        `;
        
        postsGrid.appendChild(postCard);
    });
}

// ---- Render Single Post ----
function renderSinglePost() {
    const singlePostContainer = document.getElementById('single-post');
    if (!singlePostContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const post = postsData.find(p => p.id === postId);

    if (post) {
        document.title = `${post.title} — AstroSeeker`;
        singlePostContainer.innerHTML = `
            <header class="post-header">
                <span class="category-badge mb-1" style="display:inline-block; position:relative;">${post.category}</span>
                <h1 class="post-title-large">${post.title}</h1>
                <p class="post-meta">Published on ${post.date} • by Arihant Saini</p>
            </header>
            <div class="post-hero-image" style="background-image: url('${post.image}')"></div>
            <div class="post-body">
                ${post.content}
            </div>
            <div class="post-footer">
                <a href="index.html" class="btn-threads">← Back to Home</a>
            </div>
        `;
    } else {
        singlePostContainer.innerHTML = `
            <div style="text-align:center; padding: 60px 20px;">
                <h1 style="font-size: 3rem; margin-bottom: 20px;">✦</h1>
                <h2>Post not found</h2>
                <p style="margin: 20px 0;">The stars have aligned elsewhere. We couldn't find the article you were looking for.</p>
                <a href="index.html" class="btn-primary"><span>Return Home</span></a>
            </div>
        `;
    }
}

// ---- Floating Chat Button Logic ----
function initChatFab() {
    const fab = document.getElementById('chat-fab');
    const fabBtn = document.getElementById('chat-fab-btn');
    
    if (!fab || !fabBtn) return;
    
    // Toggle menu on button click
    fabBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent clicking outside from firing immediately
        fab.classList.toggle('active');
    });
    
    // Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (fab.classList.contains('active') && !fab.contains(e.target)) {
            fab.classList.remove('active');
        }
    });
    
    // Optional: Auto-open the chat menu once after a delay to grab attention
    setTimeout(() => {
        if (!fab.classList.contains('active')) {
            fab.classList.add('active');
            // Auto close it after 5 seconds
            setTimeout(() => {
                fab.classList.remove('active');
            }, 5000);
        }
    }, 15000); // Trigger after 15 seconds of page load
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initNavbar();
    initMobileMenu();
    renderPosts();
    renderSinglePost();
    initChatFab();
    
    // Delay scroll reveal so cards render first
    setTimeout(initScrollReveal, 100);
});

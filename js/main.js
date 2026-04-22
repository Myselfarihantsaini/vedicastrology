// =============================================
// Shambhava — Main JavaScript
// =============================================

// ---- Animated Stars + Sacred Symbols Background ----
function initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [], symbols = [], shootingStars = [];
    const STAR_COUNT = 220;
    const SACRED = ['ॐ', '᳐', '✦', 'ॐ', '☸'];

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
                radius: Math.random() * 1.8 + 0.2,
                alpha: Math.random(),
                speed: Math.random() * 0.006 + 0.001,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    function createSymbols() {
        symbols = [];
        const count = Math.floor(canvas.width / 280);
        for (let i = 0; i < count; i++) {
            symbols.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                char: SACRED[Math.floor(Math.random() * SACRED.length)],
                size: Math.random() * 28 + 18,
                alpha: 0,
                maxAlpha: Math.random() * 0.06 + 0.02,
                speedX: (Math.random() - 0.5) * 0.15,
                speedY: -Math.random() * 0.2 - 0.05,
                fadeSpeed: Math.random() * 0.002 + 0.001,
                fadingIn: true
            });
        }
    }

    function spawnShootingStar() {
        shootingStars.push({
            x: Math.random() * canvas.width * 0.7,
            y: Math.random() * canvas.height * 0.4,
            len: Math.random() * 80 + 40,
            speed: Math.random() * 4 + 3,
            alpha: 1,
            angle: Math.PI / 5
        });
    }

    setInterval(() => { if (Math.random() < 0.4) spawnShootingStar(); }, 4000);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Stars
        stars.forEach(star => {
            star.alpha += star.speed * star.direction;
            if (star.alpha >= 1) { star.alpha = 1; star.direction = -1; }
            if (star.alpha <= 0.05) { star.alpha = 0.05; star.direction = 1; }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 67, ${star.alpha * 0.55})`;
            ctx.fill();
        });

        // Sacred floating symbols
        symbols.forEach(sym => {
            if (sym.fadingIn) {
                sym.alpha += sym.fadeSpeed;
                if (sym.alpha >= sym.maxAlpha) sym.fadingIn = false;
            } else {
                sym.alpha -= sym.fadeSpeed * 0.5;
                if (sym.alpha <= 0) {
                    sym.x = Math.random() * canvas.width;
                    sym.y = canvas.height + 20;
                    sym.alpha = 0;
                    sym.fadingIn = true;
                    sym.char = SACRED[Math.floor(Math.random() * SACRED.length)];
                }
            }
            sym.x += sym.speedX;
            sym.y += sym.speedY;
            ctx.font = `${sym.size}px serif`;
            ctx.fillStyle = `rgba(198, 161, 91, ${sym.alpha})`;
            ctx.fillText(sym.char, sym.x, sym.y);
        });

        // Shooting stars
        shootingStars.forEach((s, i) => {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
            const grad = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle)*s.len, s.y - Math.sin(s.angle)*s.len);
            grad.addColorStop(0, `rgba(212, 168, 67, ${s.alpha})`);
            grad.addColorStop(1, 'transparent');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
            s.alpha -= 0.02;
            if (s.alpha <= 0) shootingStars.splice(i, 1);
        });

        requestAnimationFrame(draw);
    }

    resize();
    createStars();
    createSymbols();
    draw();
    window.addEventListener('resize', () => { resize(); createStars(); createSymbols(); });
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
    const elements = document.querySelectorAll('.post-card, .zodiac-card, .about-grid, .cta-content, .service-card');
    
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
        document.title = `${post.title} — Shambhava`;
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
            <div class="post-actions" style="display: flex; gap: 15px; margin: 30px 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 20px 0;">
                <button class="post-action-btn like-btn" onclick="this.classList.toggle('liked'); this.innerHTML = this.classList.contains('liked') ? '♥ Liked' : '♡ Like'">♡ Like</button>
                <button class="post-action-btn share-btn" onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!');">🔗 Share</button>
            </div>
            
            <div class="post-comments-section" style="margin-top: 40px; padding: 30px; background: rgba(18, 26, 46, 0.5); border-radius: 12px; border: 1px solid var(--border-subtle);">
                <h3 style="margin-bottom: 20px; font-family: var(--font-serif); color: var(--primary);">Discussion</h3>
                
                <div id="disqus_thread"></div>
                <script>
                    var disqus_config = function () {
                        this.page.url = window.location.href;  
                        this.page.identifier = '${post.id}'; 
                    };
                    (function() { 
                        var d = document, s = d.createElement('script');
                        s.src = 'https://shambhava.disqus.com/embed.js';
                        s.setAttribute('data-timestamp', +new Date());
                        (d.head || d.body).appendChild(s);
                    })();
                </script>
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            </div>

            <div class="post-footer" style="margin-top: 40px; text-align: center;">
                <a href="index.html" class="btn-threads" style="display: inline-block;">← Back to Home</a>
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

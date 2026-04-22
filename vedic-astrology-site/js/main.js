// Function to render posts on the home page
function renderPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return; // We are not on the home page

    postsGrid.innerHTML = ''; // Clear existing

    postsData.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        postCard.innerHTML = \`
            <div class="post-image" style="background-image: url('\${post.image}')">
                <span class="category-badge">\${post.category}</span>
            </div>
            <div class="post-content">
                <span class="post-date">\${post.date}</span>
                <h3 class="post-title"><a href="post.html?id=\${post.id}">\${post.title}</a></h3>
                <p class="post-excerpt">\${post.excerpt}</p>
                <a href="post.html?id=\${post.id}" class="read-more">Read Full Post →</a>
            </div>
        \`;
        
        postsGrid.appendChild(postCard);
    });
}

// Function to render a single post
function renderSinglePost() {
    const singlePostContainer = document.getElementById('single-post');
    if (!singlePostContainer) return; // We are not on the post page

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const post = postsData.find(p => p.id === postId);

    if (post) {
        document.title = \`\${post.title} - Cosmic Insights\`;
        singlePostContainer.innerHTML = \`
            <header class="post-header">
                <span class="category-badge mb-1" style="display:inline-block">\${post.category}</span>
                <h1 class="post-title-large">\${post.title}</h1>
                <p class="post-meta">Published on \${post.date}</p>
            </header>
            <div class="post-hero-image" style="background-image: url('\${post.image}')"></div>
            <div class="post-body">
                \${post.content}
            </div>
            <div class="post-footer">
                <a href="index.html" class="btn-secondary">← Back to Home</a>
            </div>
        \`;
    } else {
        singlePostContainer.innerHTML = \`
            <div class="not-found">
                <h1>Post not found</h1>
                <p>The stars have aligned elsewhere. We couldn't find the article you were looking for.</p>
                <a href="index.html" class="btn-primary">Return Home</a>
            </div>
        \`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    renderSinglePost();
});

// Articles Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Article filtering
    const filterOptions = document.querySelectorAll('.filter-option');
    const articleCards = document.querySelectorAll('.article-card');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            filterOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get filter category
            const filterCategory = this.getAttribute('data-category');
            
            // Filter articles
            articleCards.forEach(card => {
                if (filterCategory === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, 100);
                } else {
                    if (card.getAttribute('data-category') === filterCategory) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, 100);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animated');
                    }
                }
            });
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showAlert('Please enter your email address.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate subscription
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showAlert('Thank you for subscribing! You will receive updates when new articles are published.', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Alert function (same as contact.js)
    function showAlert(message, type) {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        });
        
        setTimeout(() => {
            if (alert.parentElement) {
                alert.classList.remove('show');
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Add animation to articles on scroll
    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    articleCards.forEach(card => {
        articleObserver.observe(card);
    });
});

// Add these styles to your CSS for articles page
const articlesStyles = `
/* Articles Page Styles */
.articles-intro {
    padding: var(--spacing-xl) 0;
}

.intro-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    align-items: center;
}

.intro-text h2 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
    color: var(--secondary-color);
}

.verse-box {
    background-color: var(--light-bg);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    margin-top: var(--spacing-md);
    border-left: 4px solid var(--accent-color);
    font-style: italic;
}

.verse-ref {
    text-align: right;
    margin-top: var(--spacing-xs);
    font-weight: 500;
    color: var(--primary-color);
}

.image-placeholder {
    width: 100%;
    height: 300px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 8rem;
}

/* Articles Filter */
.articles-filter {
    margin: var(--spacing-lg) 0;
}

.filter-options {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.filter-option {
    padding: 0.5rem 1.5rem;
    background-color: transparent;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: var(--transition-normal);
    font-weight: 500;
}

.filter-option:hover,
.filter-option.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* Articles List */
.articles-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--spacing-lg);
    margin: var(--spacing-xl) 0;
}

.article-card {
    background-color: white;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
    opacity: 0;
    transform: translateY(20px);
}

.article-card.animated {
    opacity: 1;
    transform: translateY(0);
}

.article-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
}

.article-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-normal);
}

.article-card:hover .article-image img {
    transform: scale(1.05);
}

.article-category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 500;
}

.article-content {
    padding: var(--spacing-md);
}

.article-meta {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: 0.75rem;
    color: var(--light-text);
    font-size: 0.875rem;
}

.article-meta i {
    margin-right: 0.25rem;
}

.article-title {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--secondary-color);
    line-height: 1.3;
}

.article-excerpt {
    color: var(--light-text);
    margin-bottom: var(--spacing-sm);
    line-height: 1.6;
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: var(--spacing-sm);
}

.article-tags .tag {
    background-color: var(--light-bg);
    color: var(--text-color);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.875rem;
}

.article-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition-fast);
}

.article-link:hover {
    gap: 0.75rem;
}

.article-link i {
    transition: var(--transition-fast);
}

/* Pagination */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: var(--spacing-xl) 0;
}

.page-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background-color: var(--light-bg);
    color: var(--text-color);
    text-decoration: none;
    transition: var(--transition-normal);
}

.page-link:hover,
.page-link.active {
    background-color: var(--primary-color);
    color: white;
}

.page-dots {
    padding: 0 0.5rem;
    color: var(--light-text);
}

/* Newsletter */
.newsletter-section {
    background: linear-gradient(135deg, var(--secondary-color), var(--dark-bg));
    color: white;
    padding: var(--spacing-xl) 0;
    margin-top: var(--spacing-xl);
}

.newsletter-box {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.newsletter-content h2 {
    color: white;
    margin-bottom: var(--spacing-sm);
}

.newsletter-content p {
    color: #cbd5e1;
    max-width: 600px;
    margin: 0 auto var(--spacing-lg);
}

.newsletter-form {
    max-width: 500px;
    margin: 0 auto;
}

.newsletter-form .form-group {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: 0.5rem;
}

.newsletter-form input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    font-size: 1rem;
}

.newsletter-form button {
    white-space: nowrap;
}

.form-note {
    font-size: 0.875rem;
    color: #94a3b8;
}

.form-note a {
    color: #cbd5e1;
    text-decoration: underline;
}
`;

// Add the styles to the page
const articlesStyleSheet = document.createElement('style');
articlesStyleSheet.textContent = articlesStyles;
document.head.appendChild(articlesStyleSheet);
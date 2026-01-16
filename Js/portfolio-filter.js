// Portfolio Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .writing-sample');
    
    // Filter button click event
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.classList.add('animated');
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('animated');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animated');
                    }
                }
            });
            
            // Show/hide category titles
            const categories = document.querySelectorAll('.portfolio-category');
            categories.forEach(category => {
                if (filterValue === 'all') {
                    category.style.display = 'block';
                } else {
                    const categoryId = category.id;
                    if (categoryId.includes(filterValue)) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Add animation to portfolio items on scroll
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all portfolio items
    portfolioItems.forEach(item => {
        portfolioObserver.observe(item);
    });
    
    // Handle URL parameters for specific project views
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const projectId = urlParams.get('project');
    
    if (projectId) {
        const targetProject = document.getElementById(projectId);
        if (targetProject) {
            // Scroll to the project
            setTimeout(() => {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const projectPosition = targetProject.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: projectPosition,
                    behavior: 'smooth'
                });
                
                // Highlight the project
                targetProject.style.boxShadow = '0 0 0 3px var(--primary-color)';
                setTimeout(() => {
                    targetProject.style.boxShadow = '';
                }, 3000);
            }, 500);
        }
    }
});
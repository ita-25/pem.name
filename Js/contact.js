// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle service pre-selection from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Map URL parameter values to select options
            const serviceMap = {
                'web': 'Web Development',
                'graphics': 'Graphics Design',
                'writing': 'Professional Writing',
                'tutoring': 'Web Development Tutoring'
            };
            
            const serviceValue = serviceMap[serviceParam] || serviceParam;
            
            // Try to find and select the option
            for (let option of serviceSelect.options) {
                if (option.text.toLowerCase().includes(serviceValue.toLowerCase()) || 
                    option.value === serviceParam) {
                    option.selected = true;
                    break;
                }
            }
        }
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!formValues.name || !formValues.email || !formValues.message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formValues.email)) {
                showAlert('paulejimemormah@gmail.com', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (in real implementation, you would send to a server)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showAlert('Thank you for your message! I will get back to you within 24 hours.', 'success');
                
                // You could also log the form data for debugging
                console.log('Form submitted:', formValues);
                
                // In a real implementation, you would send the data to your backend
                // Example: 
                // fetch('/api/contact', {
                //     method: 'POST',
                //     body: formData
                // }).then(response => response.json())
                //   .then(data => {
                //       showAlert('Message sent successfully!', 'success');
                //       contactForm.reset();
                //   })
                //   .catch(error => {
                //       showAlert('Error sending message. Please try again.', 'error');
                //   });
                
            }, 1500);
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle active class
            faqItem.classList.toggle('active');
            
            // Toggle answer visibility
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingTop = '1rem';
                icon.className = 'fas fa-chevron-up';
            } else {
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
                icon.className = 'fas fa-chevron-down';
            }
            
            // Close other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.paddingTop = '0';
                    otherIcon.className = 'fas fa-chevron-down';
                }
            });
        });
    });
    
    // Alert function
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        `;
        
        // Add to page
        document.body.appendChild(alert);
        
        // Show alert
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        // Close button functionality
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.classList.remove('show');
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, 5000);
    }
});

// Add these styles to your CSS for alerts and FAQ
const contactStyles = `
/* Alert Styles */
.alert {
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    z-index: 10000;
    transform: translateX(150%);
    transition: transform 0.3s ease;
    max-width: 400px;
    border-left: 4px solid;
}

.alert.show {
    transform: translateX(0);
}

.alert-success {
    border-left-color: var(--trust-color);
}

.alert-error {
    border-left-color: #ef4444;
}

.alert-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--light-text);
    padding: 0;
    line-height: 1;
}

/* FAQ Styles */
.faq-container {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
}

.faq-question {
    width: 100%;
    padding: 1.25rem;
    background-color: var(--light-bg);
    border: none;
    text-align: left;
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: var(--transition-normal);
}

.faq-question:hover {
    background-color: var(--border-color);
}

.faq-question i {
    transition: transform 0.3s ease;
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    padding: 0 1.25rem;
    transition: all 0.3s ease;
    line-height: 1.6;
}

.faq-answer p {
    margin: 0;
    padding-bottom: 1.25rem;
}

/* Contact Form Styles */
.form-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}

.form-intro {
    text-align: center;
    margin-bottom: var(--spacing-lg);
}

.form-group {
    margin-bottom: var(--spacing-md);
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    font-size: 1rem;
    transition: var(--transition-normal);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

.file-note {
    display: block;
    margin-top: 0.25rem;
    color: var(--light-text);
    font-size: 0.875rem;
}

.form-submit {
    text-align: center;
    margin-top: var(--spacing-lg);
}

.form-note {
    margin-top: 0.5rem;
    color: var(--light-text);
    font-size: 0.875rem;
}

/* Contact Info Grid */
.contact-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
    margin: var(--spacing-xl) 0;
}

.info-card {
    text-align: center;
    padding: var(--spacing-md);
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    transition: var(--transition-normal);
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.info-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-sm);
}

.info-card h3 {
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.info-card p {
    margin-bottom: 0.5rem;
    color: var(--light-text);
}

.info-link {
    display: inline-block;
    margin-top: 0.5rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition-fast);
}

.info-link:hover {
    text-decoration: underline;
}

.info-note {
    font-size: 0.875rem;
    color: var(--light-text);
    font-style: italic;
    margin-top: 0.5rem;
}
`;

// Add the styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet);
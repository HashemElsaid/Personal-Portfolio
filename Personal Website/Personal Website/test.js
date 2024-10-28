// Initialize EmailJS
emailjs.init("Yv9C9C6NaECxwD5QF");

// Scroll animation for timeline items
window.addEventListener('scroll', function() {
    const items = document.querySelectorAll('.timeline-item, .roadmap-item');
    items.forEach(item => {
        const windowHeight = window.innerHeight;
        const elementTop = item.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});


function addWorkExperienceHoverEffect() {
    const workExperienceCards = document.querySelectorAll('.roadmap-item');
    
    workExperienceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
            card.style.transform = 'translateY(-10px) rotate(-3deg)';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease-in, box-shadow 0.3s ease-in';
            card.style.transform = 'translateY(0) rotate(0)';
            card.style.boxShadow = 'none';
        });
    });
}

// Contact form handling
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');


        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.style.display = 'none');


        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        
        let isValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        }

        
        if (email === '' || !emailPattern.test(email)) {
            showError('emailError', 'Valid email is required');
            isValid = false;
        }

        
        if (message === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        }

        
        if (isValid) {
            const templateParams = {
                from_name: name,
                reply_to: email,
                message: message
            };

            console.log('Attempting to send email with params:', templateParams);

            emailjs.send("service_nh05op7", "template_2d80pkg", templateParams)
                .then((response) => {
                    console.log('EmailJS response:', response);
                    alert("Message sent successfully! I'll get back to you soon.");
                    form.reset();
                })
                .catch((error) => {
                    console.error("EmailJS error:", error);
                    alert("Failed to send the message. Please try again later.");
                });
        }
    });
}


function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    addWorkExperienceHoverEffect();
    handleContactForm();
});

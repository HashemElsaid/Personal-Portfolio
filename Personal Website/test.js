// test.js

window.addEventListener('scroll', function() {
    var items = document.querySelectorAll('.timeline-item');
    for (var i = 0; i < items.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = items[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            items[i].classList.add('active');
        } else {
            items[i].classList.remove('active');
        }
    }
});

window.addEventListener('scroll', function() {
    var items = document.querySelectorAll('.roadmap-item');
    for (var i = 0; i < items.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = items[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            items[i].classList.add('active');
        } else {
            items[i].classList.remove('active');
        }
    }
}); 
// Function to add hover effect to work experience cards
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

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', addWorkExperienceHoverEffect);

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous errors
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation flags
    let isValid = true;

    // Name validation
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Message validation
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    // If form is valid, send the email using EmailJS
    if (isValid) {
        const templateParams = {
            from_name: name,
            reply_to: email,
            message: message
        };

        emailjs.send("service_nh05op7", "template_2d80pkg", templateParams)
            .then((response) => {
                alert("Message sent successfully! I'll get back to you soon.");
                document.getElementById('contactForm').reset(); // Reset the form fields
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                alert("Failed to send the message. Please try again later.");
            });
    }
});

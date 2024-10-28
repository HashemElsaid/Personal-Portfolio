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

document.addEventListener("DOMContentLoaded", () => {
    // Ensure EmailJS is already initialized in HTML before this script runs

    const contactForm = document.getElementById("contactForm");
    if (!contactForm) {
        console.error("Contact form not found!");
        return;
    }

    // Add keydown event listener to detect "Enter" key press
    contactForm.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default Enter key behavior
            // Dispatch a submit event instead of directly calling submit()
            const submitEvent = new Event('submit');
            contactForm.dispatchEvent(submitEvent);
        }
    });

    // Handle form submission
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form values
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        // Check if form fields exist
        if (!nameInput || !emailInput || !messageInput) {
            console.error("Form fields not found!");
            alert("Something went wrong. Please try again later.");
            return;
        }

        // Validate inputs
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            alert("Please fill in all fields");
            return;
        }

        // Send email using EmailJS
        emailjs.send("service_nh05op7", "template_2d80pkg", {
            from_name: nameInput.value.trim(),
            reply_to: emailInput.value.trim(),
            message: messageInput.value.trim()
        }).then((response) => {
            alert("Message sent successfully! I'll get back to you soon.");
            contactForm.reset(); // Reset the form fields
        }).catch((error) => {
            console.error("EmailJS error:", error);
            alert("Failed to send the message. Please try again later.");
        });
    });
});


// CONTACT POPUP + EMAIL SENDING
const contactForm = document.getElementById("contact-form");
const popup = document.getElementById("popup");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        // Send using FormSubmit AJAX endpoint
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            popup.style.display = "flex";
            contactForm.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }
    });
}

function closePopup() {
    popup.style.display = "none";
}

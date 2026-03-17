const contactForm = document.getElementById("contact-form");
const popup = document.getElementById("popup");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
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
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = "Send";
            submitBtn.disabled = false;
        }
    });
}

function closePopup() {
    popup.style.display = "none";
}
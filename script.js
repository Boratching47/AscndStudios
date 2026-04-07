const contactForm = document.getElementById("contact-form");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const prev = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                contactForm.reset();
                if (popup) {
                    popup.classList.add("is-visible");
                    popup.setAttribute("aria-hidden", "false");
                }
            } else {
                window.alert("Something went wrong. Please try again.");
            }
        } catch {
            window.alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = prev;
            submitBtn.disabled = false;
        }
    });
}

if (popupClose && popup) {
    popupClose.addEventListener("click", function () {
        popup.classList.remove("is-visible");
        popup.setAttribute("aria-hidden", "true");
    });
}

/* Pause background video when the hero (logo) section is mostly off-screen */
(function () {
    const video = document.getElementById("bg-video");
    const home = document.querySelector(".home-section");
    if (!video || !home || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    video.play().catch(function () {});
                } else {
                    video.pause();
                }
            });
        },
        { threshold: [0, 0.15, 0.35, 0.6] }
    );
    io.observe(home);
})();

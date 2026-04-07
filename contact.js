(function () {
    const form = document.getElementById("contact-form");
    const result = document.getElementById("result");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const btn = form.querySelector(".contact-submit-btn");
        if (result) result.textContent = "Sending…";
        if (btn) {
            btn.disabled = true;
        }

        const formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        })
            .then(async function (response) {
                const json = await response.json();
                if (result) {
                    if (response.status === 200) {
                        result.textContent = "Message sent successfully!";
                    } else {
                        result.textContent = json.message || "Something went wrong.";
                    }
                }
            })
            .catch(function () {
                if (result) result.textContent = "Something went wrong.";
            })
            .finally(function () {
                form.reset();
                if (btn) btn.disabled = false;
                setTimeout(function () {
                    if (result) result.textContent = "";
                }, 4000);
            });
    });
})();

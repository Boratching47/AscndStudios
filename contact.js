const form = document.getElementById("contact-form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    result.innerHTML = "Sending...";

    const formData = new FormData(form);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(async (response) => {
        let json = await response.json();

        if (response.status === 200) {
            result.innerHTML = "Message sent successfully!";
        } else {
            result.innerHTML = json.message;
        }
    })
    .catch(() => {
        result.innerHTML = "Something went wrong.";
    })
    .finally(() => {
        form.reset();
        setTimeout(() => { result.innerHTML = ""; }, 3000);
    });
});

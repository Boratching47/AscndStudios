(function () {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("site-nav");
    const overlay = document.getElementById("nav-overlay");
    if (!toggle || !nav || !overlay) return;

    function openNav() {
        nav.classList.add("is-open");
        overlay.hidden = false;
        overlay.classList.add("is-visible");
        document.body.classList.add("nav-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
    }

    function closeNav() {
        nav.classList.remove("is-open");
        overlay.classList.remove("is-visible");
        overlay.hidden = true;
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
    }

    toggle.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) closeNav();
        else openNav();
    });
    overlay.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav();
    });
})();

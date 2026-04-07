const videos = [
    {
        src: "JOTTER_IG_vid.mp4",
        title: "Jotter",
        category: "Social Media",
        description: "Instagram content produced for Jotter."
    },
    {
        src: "Mike_Greer_Real_Estate.mp4",
        title: "Mike Greer Real Estate",
        category: "Commercial",
        description: "Brand film produced for Mike Greer Real Estate."
    },
    {
        src: "NOKI_video.mp4",
        title: "Noki",
        category: "Brand Film",
        description: "Visual brand story produced for Noki."
    },
    {
        src: "Retropolitan.mp4",
        title: "Retropolitan",
        category: "Commercial",
        description: "Commercial production for Retropolitan."
    },
    {
        src: "Truck_Norris.mp4",
        title: "Truck Norris",
        category: "Commercial",
        description: "Commercial production for Truck Norris."
    }
];

let current = 0;
let isPlaying = true;

const mainVideo    = document.getElementById("main-video");
const metaTitle    = document.getElementById("meta-title");
const metaCategory = document.getElementById("meta-category");
const description  = document.getElementById("video-description");
const countCurrent = document.getElementById("count-current");
const countTotal   = document.getElementById("count-total");
const thumbStrip   = document.getElementById("thumb-strip");
const btnPlay      = document.getElementById("btn-play");
const playIcon     = document.getElementById("play-icon");
const playLabel    = document.getElementById("play-label");

const bgVideo = document.getElementById("bg-video");
let isPortfolioInView = false;

function syncBgVideo() {
    if (!bgVideo) return;
    // Background pauses only when the portfolio main video is playing.
    if (isPortfolioInView && isPlaying) {
        bgVideo.pause();
    } else {
        bgVideo.play().catch(() => {});
    }
}

// ✅ Ensure autoplay works
mainVideo.muted = true;

countTotal.textContent = videos.length;

/* 🔍 Debug errors */
mainVideo.addEventListener("error", () => {
    console.log("❌ VIDEO FAILED:", mainVideo.currentSrc);
});

/* Build thumbnail strip */
function buildThumbs() {
    videos.forEach((v, i) => {
        const wrap = document.createElement("div");
        wrap.className = "thumb" + (i === 0 ? " active" : "");
        wrap.dataset.index = i;

        const vid = document.createElement("video");
        vid.src = v.src;
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.preload = "metadata";

        const label = document.createElement("div");
        label.className = "thumb-label";
        label.textContent = v.title;

        wrap.appendChild(vid);
        wrap.appendChild(label);

        wrap.addEventListener("click", () => goTo(i));

        // ⚠️ optional (disable if causing issues)
        wrap.addEventListener("mouseenter", () => vid.play());
        wrap.addEventListener("mouseleave", () => {
            vid.pause();
            vid.currentTime = 0;
        });

        thumbStrip.appendChild(wrap);
    });
}

/* Switch to a video */
function goTo(index) {
    mainVideo.classList.add("fading");

    setTimeout(() => {
        current = (index + videos.length) % videos.length;
        const v = videos[current];

        // ✅ KEY FIX: use <source>
        mainVideo.innerHTML = `<source src="${v.src}" type="video/mp4">`;
        mainVideo.load();

        if (isPlaying) {
            mainVideo.play().catch(() => {});
        }

        metaTitle.textContent    = v.title;
        metaCategory.textContent = v.category;
        description.textContent  = v.description;
        countCurrent.textContent = current + 1;

        document.querySelectorAll(".thumb").forEach((t, i) => {
            t.classList.toggle("active", i === current);
        });

        mainVideo.classList.remove("fading");
    }, 300);
}

/* Play / Pause */
function togglePlay() {
    if (isPlaying) {
        mainVideo.pause();
        isPlaying = false;
        playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
        playLabel.textContent = "Play";
        syncBgVideo();
    } else {
        mainVideo.load();
        mainVideo.play().catch(() => {});
        isPlaying = true;
        playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
        playLabel.textContent = "Pause";
        syncBgVideo();
    }
}

/* Arrow keys */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft")  goTo(current - 1);
});

document.getElementById("btn-prev").addEventListener("click", () => goTo(current - 1));
document.getElementById("btn-next").addEventListener("click", () => goTo(current + 1));
btnPlay.addEventListener("click", togglePlay);

/* Init */
buildThumbs();
goTo(0);

// Keep background paused only while the portfolio video is playing.
(function () {
    const block = document.querySelector(".portfolio-section");

    if (!bgVideo || !block) {
        syncBgVideo();
        return;
    }

    // Rough initial guess in case user pauses/unpauses before the observer fires.
    const r = block.getBoundingClientRect();
    isPortfolioInView = r.bottom > 0 && r.top < window.innerHeight;
    syncBgVideo();

    if (typeof IntersectionObserver === "undefined") return;

    new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isPortfolioInView = entry.isIntersecting && entry.intersectionRatio > 0.15;
                syncBgVideo();
            });
        },
        { threshold: [0, 0.15, 0.35] }
    ).observe(block);
})();
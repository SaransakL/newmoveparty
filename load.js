function toggleMenu() {
    document.getElementById("offcanvas").classList.toggle("active");
}

document.addEventListener("click", function(e) {
    const offcanvas = document.getElementById("offcanvas");
    const menuBtn = document.querySelector(".menu-btn");

    if (
        offcanvas.classList.contains("active") &&
        !offcanvas.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        offcanvas.classList.remove("active");
    }
});

async function loadPolicies() {
    const res = await fetch('policy.json');
    const data = await res.json();

    const grid = document.getElementById('policyGrid');

    data.forEach((policy, index) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';

        item.innerHTML = `
            <div class="accordion-header">
                <h3>${policy.title}</h3>
                <span class="icon bi bi-plus-lg"></span>
            </div>
            <div class="accordion-content">
                <p>${policy.description}</p>
            </div>
        `;

        const header = item.querySelector('.accordion-header');
        header.onclick = () => {
            item.classList.toggle('active');
        };

        grid.appendChild(item);
    });
}

loadPolicies();

const url = encodeURIComponent(window.location.href);
const title = encodeURIComponent(document.title);

// Facebook
document.getElementById("share-fb").href =
    `https://www.facebook.com/sharer/sharer.php?u=${url}`;

// Twitter (X)
document.getElementById("share-tw").href =
    `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

// Copy link
document.getElementById("copy-link").addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);

    const status = document.getElementById("copy-status");
    status.classList.add("show");

    setTimeout(() => {
        status.classList.remove("show");
    }, 2000);
});

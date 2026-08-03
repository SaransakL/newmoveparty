document.addEventListener("DOMContentLoaded", () => {

  // ================= SLIDER =================
  const slides = document.querySelector('.slides');
  const slide = document.querySelectorAll('.slide');

  let index = 0;

  function updateSlide() {
    if (!slides) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  if (nextBtn) {
    nextBtn.onclick = () => {
      index = (index + 1) % slide.length;
      updateSlide();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      index = (index - 1 + slide.length) % slide.length;
      updateSlide();
    };
  }

  if (slide.length > 0) {
    setInterval(() => {
      index = (index + 1) % slide.length;
      updateSlide();
    }, 5000);
  }

  // ================= ANIMATION =================
  const hiddenElements = document.querySelectorAll('.hidden');

  if (hiddenElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    hiddenElements.forEach(el => observer.observe(el));
  }

  // ================= MENU =================
  window.toggleMenu = function () {
    const offcanvas = document.getElementById("offcanvas");
    if (offcanvas) {
      offcanvas.classList.toggle("active");
    }
  };

  document.addEventListener("click", function (e) {
    const offcanvas = document.getElementById("offcanvas");
    const menuBtn = document.querySelector(".menu-btn");

    if (
      offcanvas &&
      menuBtn &&
      offcanvas.classList.contains("active") &&
      !offcanvas.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      offcanvas.classList.remove("active");
    }
  });

  // ================= LOAD POLICY =================
  async function loadPolicies() {
    try {
      const res = await fetch('policy.json');
      const data = await res.json();

      const grid = document.getElementById('policyGrid');
      if (!grid) return;

      data.forEach((policy) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';

        item.innerHTML = `
          <div class="accordion-header">
            <h3>${policy.title}</h3>
            <span class="icon">+</span>
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

    } catch (err) {
      console.error("โหลด policy ไม่ได้:", err);
    }
  }

  loadPolicies();

  // ================= SHARE =================
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  const fb = document.getElementById("share-fb");
  const tw = document.getElementById("share-tw");

  if (fb) {
    fb.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  }

  if (tw) {
    tw.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
  }

  // ================= COPY =================
  const copyBtn = document.getElementById("copy-link");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);

      const status = document.getElementById("copy-status");
      if (status) {
        status.classList.add("show");

        setTimeout(() => {
          status.classList.remove("show");
        }, 2000);
      }
    });
  }

});

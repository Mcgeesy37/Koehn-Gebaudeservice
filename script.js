/* ============================================================
   Köhn Gebäudeservice GmbH — script.js
   Progressive enhancement only: all content is visible and usable
   without this file. It adds the mobile menu toggle and the
   Kundenfeedback carousel (5-star, auto-animated).
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Kundenfeedback carousel ---------- */
  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
  var dots = Array.prototype.slice.call(root.querySelectorAll("[data-dot]"));
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");

  var current = slides.findIndex(function (s) {
    return s.classList.contains("is-active");
  });
  if (current < 0) current = 0;

  var AUTO_DELAY = 6000;
  var timer = null;

  function show(index) {
    index = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
    });
    current = index;
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startAuto() {
    if (reduceMotion) return;
    stopAuto();
    timer = window.setInterval(next, AUTO_DELAY);
  }
  function stopAuto() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { next(); startAuto(); });
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { show(i); startAuto(); });
  });

  // Pause auto-advance while the user is interacting with the carousel
  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);
  root.addEventListener("focusin", stopAuto);
  root.addEventListener("focusout", startAuto);

  show(current);
  startAuto();
})();

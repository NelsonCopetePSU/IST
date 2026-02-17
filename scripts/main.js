/*
Name: Nelson Antonio Copete
Student ID: ____________________
Course: ________________________
Assignment: LIVE Portfolio Page + DOM Activities
Submission Date: February __, 2026
GitHub Repo URL: ____________________
GitHub Pages URL: ____________________
*/

(() => {
  "use strict";
  // 1) Smooth scroll for nav links
  const panels = document.querySelectorAll("section.panel");

  panels.forEach((panel) => {
    const title = panel.querySelector(".panel-title");
    const content = panel.querySelector(".panel-content");

    if (!title || !content) return;
    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    title.setAttribute("aria-expanded", "true");

    const togglePanel = () => {
      const collapsed = panel.classList.toggle("is-collapsed");

      content.style.display = collapsed ? "none" : "block";
      title.setAttribute("aria-expanded", String(!collapsed));
    };

    title.addEventListener("click", togglePanel);

    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePanel();
      }
    });
  });
 })();


  // 3) Active nav highlight on scroll
  const linkMap = new Map();
  navLinks.forEach((l) => linkMap.set(l.getAttribute("href"), l));

  function setActive(hash) {
    navLinks.forEach((l) => l.classList.remove("is-active"));
    const active = linkMap.get(hash);
    if (active) active.classList.add("is-active");
  }

  const sections = Array.from(document.querySelectorAll("main .panel[id]"));
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (top && top.target && top.target.id) {
          setActive(`#${top.target.id}`);
        }
      },
      { threshold: [0.25, 0.4, 0.55] }
    );

    sections.forEach((sec) => obs.observe(sec));
  }

  // 4) Contact form submit -> show Bootstrap modal (no refresh)
  const contactForm = document.querySelector("form.contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const modalEl = document.getElementById("contactModal");

      // If modal isn't on the page, do nothing (prevents errors)
      if (!modalEl || typeof bootstrap === "undefined") {
        alert("Form submitted (demo). Add the Bootstrap modal + bundle script to enable the popup.");
        contactForm.reset();
        return;
      }

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
      contactForm.reset();
    });
  }

  // 5) Back-to-top button (created automatically)
  let backToTop = document.getElementById("back-to-top");

  if (!backToTop) {
    backToTop = document.createElement("button");
    backToTop.id = "back-to-top";
    backToTop.className = "back-to-top";
    backToTop.type = "button";
    backToTop.textContent = "Back to top";
    backToTop.setAttribute("aria-label", "Back to top");
    document.body.appendChild(backToTop);
  }

  const showAfterPx = 650;

  const onScroll = () => {
    backToTop.style.display = window.scrollY > showAfterPx ? "inline-flex" : "none";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    const topEl = document.getElementById("top");
    if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();


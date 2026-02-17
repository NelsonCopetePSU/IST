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

  // 1) Collapsible panels (click the existing H2 title)
  const panels = document.querySelectorAll("section.panel");
  panels.forEach((panel) => {
    const title = panel.querySelector(".panel-title");
    if (!title) return;

    // Make the title act like a button (keyboard accessible)
    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    title.setAttribute("aria-expanded", "true");

    const togglePanel = () => {
      const collapsed = panel.classList.toggle("is-collapsed");
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

  // 2) Smooth scroll nav (DOM click behavior)
  const navLinks = document.querySelectorAll(".site-nav .nav-link[href^='#']");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      const target = hash ? document.querySelector(hash) : null;
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", hash);
    });
  });

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

  // 4) Contact form feedback (no refresh)
  const form = document.querySelector("form.contact-form");
  if (form) {
    let status = document.getElementById("form-status");

    // If you didn't add it in HTML, we create it
    if (!status) {
      status = document.createElement("p");
      status.id = "form-status";
      status.className = "form-status";
      status.setAttribute("aria-live", "polite");
      form.insertAdjacentElement("afterend", status);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "there";

      status.textContent = `Thanks, ${name}! Your message was captured for this demo (no email is sent).`;
      form.reset();
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

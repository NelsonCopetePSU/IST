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

  // Grab nav links once (needed for multiple features)
  const navLinks = document.querySelectorAll(".nav-link");

  // 1) Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Only do smooth scroll for #section links
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Collapsible panels (except Skills section)
 const panels = document.querySelectorAll("section.panel");

 panels.forEach((panel) => {
  // Skip the Skills section
  if (panel.id === "skills") {
    return;
  }

  const title = panel.querySelector(".panel-title");
  if (!title) return;

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

  // Contact form submit -> show popup only if all fields are filled
const contactForm = document.querySelector("form.contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = contactForm.querySelector("input[type='text']").value.trim();
    const email = contactForm.querySelector("input[type='email']").value.trim();
    const topic = contactForm.querySelector("select").value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    // Check if all fields are filled
    if (name && email && topic && message) {
      alert("Message Sent\n\nThank you for reaching out! This is a demo message.");
      contactForm.reset();
    } else {
      alert("Please fill out all fields before submitting.");
    }
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


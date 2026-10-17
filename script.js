// wilfredolaboy.com v2 — no frameworks, plain JS only.
(function () {
  "use strict";

  // ---- mobile nav toggle ----
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // close the menu when a link is tapped
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // ---- contact form: friendly guard until Formspree is wired up ----
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        note.hidden = false;
        note.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  // ---- footer year ----
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

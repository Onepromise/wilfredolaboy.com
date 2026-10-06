// Two-sides engine: splash -> "professional" | "ronin"
(function () {
  var root = document.documentElement;
  var wipe = document.getElementById("wipe");
  var toggle = document.querySelector(".side-toggle");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".side-btn"));
  var splash = document.getElementById("splash");
  var inside = document.getElementById("inside");
  var brandHome = document.getElementById("brandHome");
  var navCta = document.querySelector(".nav-cta");
  var views = {
    professional: document.querySelector('[data-view="professional"]'),
    ronin: document.querySelector('[data-view="ronin"]')
  };
  var current = null; // null = on splash
  var busy = false;

  function setPill(side) {
    toggle.setAttribute("data-active", side);
    buttons.forEach(function (b) {
      var active = b.getAttribute("data-side") === side;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function showView(side) {
    Object.keys(views).forEach(function (key) {
      var el = views[key];
      var on = key === side;
      el.hidden = !on;
      el.classList.toggle("is-visible", on);
      el.classList.remove("view-enter");
      if (on) {
        void el.offsetWidth; // restart entrance animation
        el.classList.add("view-enter");
      }
    });
  }

  function titles(side) {
    document.title = side === "ronin"
      ? "Ronin Forge — 浪人 · Games, stories, and worlds"
      : side === "professional"
        ? "Wilfredo Laboy — Engineer. Builder. Storyteller."
        : "Wilfredo Laboy — Choose your path";
  }

  function runWipe(midFn, doneFn) {
    if (busy) return;
    busy = true;
    wipe.classList.remove("run");
    void wipe.offsetWidth;
    wipe.classList.add("run");
    setTimeout(function () {
      midFn();
      window.scrollTo(0, 0);
    }, 400); // mid-wipe, fully covered
    setTimeout(function () {
      busy = false;
      if (doneFn) doneFn();
    }, 900);
  }

  // enter one of the two sides from the splash (or jump straight there)
  function enterSide(side) {
    if (busy || current === side) return;
    runWipe(function () {
      current = side;
      splash.hidden = true;
      inside.hidden = false;
      root.setAttribute("data-theme", side);
      setPill(side);
      showView(side);
      titles(side);
      history.replaceState(null, "", "#" + side);
    });
  }

  // back to the splash
  function goHome() {
    if (busy || current === null) return;
    runWipe(function () {
      current = null;
      inside.hidden = true;
      splash.hidden = false;
      root.setAttribute("data-theme", "professional");
      setPill("professional");
      titles(null);
      history.replaceState(null, "", "#splash");
    });
  }

  // switch between sides while inside (keeps the existing behavior)
  function switchSide(side) {
    if (busy || current === side) return;
    runWipe(function () {
      current = side;
      root.setAttribute("data-theme", side);
      setPill(side);
      showView(side);
      titles(side);
      history.replaceState(null, "", "#" + side);
    });
  }

  // --- wiring ---
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var side = b.getAttribute("data-side");
      if (current === null) enterSide(side);
      else switchSide(side);
    });
  });

  document.querySelectorAll("[data-enter]").forEach(function (el) {
    var go = function () { enterSide(el.getAttribute("data-enter")); };
    el.addEventListener("click", go);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });

  brandHome.addEventListener("click", function (e) {
    e.preventDefault();
    goHome();
  });

  // "Contact" from the splash: enter the professional side, then scroll down
  navCta.addEventListener("click", function (e) {
    if (current === null) {
      e.preventDefault();
      enterSide("professional");
      setTimeout(function () {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      }, 950);
    }
  });

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

  // ---- initial route ----
  setPill("professional");
  if (location.hash === "#ronin") {
    current = "ronin";
    splash.hidden = true;
    inside.hidden = false;
    root.setAttribute("data-theme", "ronin");
    setPill("ronin");
    showView("ronin");
    titles("ronin");
  } else if (location.hash === "#professional") {
    current = "professional";
    splash.hidden = true;
    inside.hidden = false;
    showView("professional");
    titles("professional");
  } else {
    // land on the splash
    current = null;
    splash.hidden = false;
    inside.hidden = true;
    titles(null);
  }
})();

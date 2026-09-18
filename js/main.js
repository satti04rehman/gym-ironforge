(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll progress bar ---------- */
  var sp = document.getElementById("sp");
  var onScroll = function () {
    var h = document.documentElement;
    if (sp) sp.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  var grids = [".feat-grid", ".tst-grid", ".price-grid", ".value-grid", ".gallery-grid", ".coach-grid", ".info-list"];
  document.querySelectorAll(grids.join(",")).forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (el, i) {
      if (el.classList.contains("reveal")) el.style.transitionDelay = (i * 70) + "ms";
    });
  });

  /* ---------- Hero parallax ---------- */
  var heroBg = document.querySelector(".hero .hero-bg");
  var raf = false;
  var parallax = function () {
    if (heroBg) heroBg.style.transform = "translateY(" + (window.scrollY * 0.28) + "px)";
    raf = false;
  };
  if (heroBg && !reduceMotion) {
    window.addEventListener("scroll", function () { if (!raf) { raf = true; requestAnimationFrame(parallax); } }, { passive: true });
  }

  /* ---------- Count-up stats ---------- */
  var counted = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target; counted.unobserve(el);
        var target = +el.getAttribute("data-count"), suf = el.getAttribute("data-suffix") || "";
        var dur = 1300, t0 = performance.now();
        (function tick(t) {
          var p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * target).toLocaleString("en-US") + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".stat strong[data-count]").forEach(function (el) { counted.observe(el); });

  /* ---------- Cursor spotlight ---------- */
  document.querySelectorAll(".prog,.tst,.price,.value-card,.coach,.info-item").forEach(function (el) { el.classList.add("spot"); });
  if (!reduceMotion) {
    document.querySelectorAll(".spot").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
      el.addEventListener("mouseleave", function () {
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
      });
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  var headerEl = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  if (toggle && headerEl) {
    toggle.addEventListener("click", function () {
      var open = headerEl.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("#nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        headerEl.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- WhatsApp contact form ---------- */
  // contact via email (phone removed)
  var openWhatsApp = function (text) {
    window.open("mailto:info@ironforgefitness.pk?subject=Enquiry&body=" + encodeURIComponent(text), "_blank");
  };

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("[name=cname]").value.trim();
      var phone = form.querySelector("[name=cphone]").value.trim();
      var goal = form.querySelector("[name=cgoal]").value;
      var msg = form.querySelector("[name=cmsg]").value.trim();
      var valid = true;

      form.querySelectorAll(".field").forEach(function (f) {
        var err = f.querySelector(".form-error");
        if (err) err.textContent = "";
        f.classList.remove("has-error");
      });

      var flagErr = function (field, text) {
        var f = field.closest(".field");
        var err = f.querySelector(".form-error");
        if (err) err.textContent = text;
        f.classList.add("has-error");
        valid = false;
      };

      if (name.length < 2) flagErr(form.querySelector("[name=cname]"), "Please enter your name.");
      if (!/^[\d+\-\s()]{10,16}$/.test(phone)) flagErr(form.querySelector("[name=cphone]"), "Please enter a valid phone number.");
      if (!goal) flagErr(form.querySelector("[name=cgoal]"), "Please choose a fitness goal.");
      if (!valid) return;

      var lines = [
        "Hello IronForge Fitness! I'd like to start training.",
        "Name: " + name,
        "Phone: " + phone,
        "Goal: " + goal
      ];
      if (msg) lines.push("Note: " + msg);
      openWhatsApp(lines.join("\n"));
    });
  }
})();
/* ASTRA — shared interactions. Progressive enhancement; site works without JS. */
(function () {
  "use strict";
  var doc = document;

  /* sticky header shadow */
  var header = doc.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- audience router: the Дім/Бізнес pills are links to the section
     landing pages. Highlight whichever matches the current page. ---- */
  (function () {
    var path = location.pathname.split("/").pop() || "index.html";
    var biz = ["biznes.html", "bezpeka-biznes.html", "merezhi.html", "hmara.html"];
    var dim = ["dim.html", "bezpeka-dim.html", "internet.html", "tv.html", "taryfy.html", "spetspropozytsii.html"];
    var aud = biz.indexOf(path) > -1 ? "biz" : (dim.indexOf(path) > -1 ? "dim" : null);
    doc.querySelectorAll(".aud-switch a").forEach(function (a) {
      a.classList.toggle("active", a.dataset.aud === aud);
    });
  })();

  /* mobile menu */
  var burger = doc.querySelector(".burger");
  var mobile = doc.querySelector(".mobile-menu");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      doc.body.style.overflow = open ? "hidden" : "";
    });
    var closeMenu = function () {
      mobile.classList.remove("open"); doc.body.style.overflow = "";
      burger.setAttribute("aria-expanded", "false");
    };
    mobile.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    var mc = mobile.querySelector("[data-close-menu]");
    if (mc) mc.addEventListener("click", closeMenu);
  }

  /* lead modal — any [data-modal] opens #lead-modal; supports preset tariff */
  var modal = doc.querySelector("#lead-modal");
  function openModal(tariff, mode) {
    if (!modal) return;
    modal.classList.add("open");
    doc.body.style.overflow = "hidden";
    var tf = modal.querySelector('[name="tariff"]');
    if (tf && tariff) tf.value = tariff;
    if (mode) modal.setAttribute("data-mode", mode);
    var first = modal.querySelector("input");
    if (first) setTimeout(function () { first.focus(); }, 50);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open"); doc.body.style.overflow = "";
  }
  doc.addEventListener("click", function (e) {
    var t = e.target.closest("[data-modal]");
    if (t) { e.preventDefault(); openModal(t.dataset.tariff || "", t.dataset.mode || ""); }
    if (e.target.closest("[data-close]") || e.target.classList.contains("backdrop")) closeModal();
  });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* phone mask +38 (0XX) XXX-XX-XX */
  doc.querySelectorAll('input[data-phone]').forEach(function (inp) {
    inp.addEventListener("input", function () {
      var d = inp.value.replace(/\D/g, "").replace(/^38/, "").slice(0, 10);
      var out = "+38";
      if (d.length) out += " (" + d.slice(0, 3);
      if (d.length >= 3) out += ") " + d.slice(3, 6);
      if (d.length >= 6) out += "-" + d.slice(6, 8);
      if (d.length >= 8) out += "-" + d.slice(8, 10);
      inp.value = out;
    });
  });

  /* form submit — demo success state (no backend) */
  doc.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var phone = form.querySelector('input[data-phone]');
      if (phone && phone.value.replace(/\D/g, "").length < 11) {
        var err = form.querySelector(".err");
        if (err) err.textContent = "Введіть коректний номер телефону";
        phone.focus(); return;
      }
      var done = form.querySelector("[data-success]");
      if (done) { form.querySelectorAll(".field,button[type=submit],.form-note").forEach(function (n){n.style.display="none";}); done.style.display = "block"; }
    });
  });

  /* tariff price toggle (month / year) */
  doc.querySelectorAll(".price-toggle button").forEach(function (b) {
    b.addEventListener("click", function () {
      var mode = b.dataset.price; // month | year
      b.parentElement.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var scope = b.closest("[data-tariffs]") || doc;
      scope.querySelectorAll(".tariff .price").forEach(function (p) {
        var v = p.dataset[mode]; if (v) p.querySelector("[data-amount]").innerHTML = v;
      });
    });
  });

  /* simple tabs (tariff categories) */
  doc.querySelectorAll(".tabs").forEach(function (tabs) {
    tabs.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.querySelectorAll("button").forEach(function (x){x.setAttribute("aria-selected", String(x===btn));});
        var id = btn.dataset.tab;
        var wrap = tabs.closest("[data-tabwrap]") || doc;
        wrap.querySelectorAll("[data-panel]").forEach(function (p){p.hidden = p.dataset.panel !== id;});
      });
    });
  });

  /* highlight current page in the menu. For mega columns that group several
     anchored sub-pages of the same page, highlight only the column heading
     (not every sub-link) + the parent top item. */
  (function () {
    var path = location.pathname.split("/").pop() || "index.html";
    var b = function (h) { return (h || "").split("#")[0]; };
    doc.querySelectorAll(".navlink").forEach(function (a) {
      if (b(a.getAttribute("href")) === path) a.classList.add("current");
    });
    doc.querySelectorAll(".mega .col").forEach(function (col) {
      var hit = [].some.call(col.querySelectorAll("a"), function (a) { return b(a.getAttribute("href")) === path; });
      if (hit) {
        var bl = col.querySelector("b"); if (bl) bl.classList.add("current");
        var li = col.closest("li"); if (li) { var nl = li.querySelector(".navlink"); if (nl) nl.classList.add("current"); }
      }
    });
    doc.querySelectorAll(".mobile-menu a").forEach(function (a) {
      if (b(a.getAttribute("href")) === path) a.classList.add("current");
    });
  })();

  /* deep-link: activate the tab/panel named in the URL hash and scroll to it
     (e.g. taryfy-dim.html#pryvatnyi opened from the menu on any page) */
  (function () {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    var btn = doc.querySelector('.tabs button[data-tab="' + h + '"]');
    var panel = doc.querySelector('[data-panel="' + h + '"]') || doc.getElementById(h);
    if (btn) btn.click();
    if (panel) setTimeout(function () {
      window.scrollTo({ top: panel.getBoundingClientRect().top + window.scrollY - 118, behavior: "auto" });
    }, 80);
  })();

  /* hero carousel — fade slides, auto-advance, dots, arrows, pause on hover */
  doc.querySelectorAll(".hcar").forEach(function (car) {
    var slides = [].slice.call(car.querySelectorAll(".hcar-slide"));
    if (slides.length < 2) return;
    var dotsWrap = car.querySelector(".hcar-dots");
    var reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    var i = 0, timer;
    var dots = slides.map(function (s, idx) {
      var b = doc.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Банер " + (idx + 1));
      if (idx === 0) b.className = "active";
      dotsWrap.appendChild(b);
      b.addEventListener("click", function () { go(idx); start(); });
      return b;
    });
    function go(n) {
      slides[i].classList.remove("active"); dots[i].classList.remove("active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("active"); dots[i].classList.add("active");
    }
    function start() { if (reduced) return; clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6500); }
    var p = car.querySelector(".hcar-nav.prev"), nx = car.querySelector(".hcar-nav.next");
    if (p) p.addEventListener("click", function () { go(i - 1); start(); });
    if (nx) nx.addEventListener("click", function () { go(i + 1); start(); });
    car.addEventListener("mouseenter", function () { clearInterval(timer); });
    car.addEventListener("mouseleave", start);
    start();
  });

  /* reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    doc.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    doc.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();

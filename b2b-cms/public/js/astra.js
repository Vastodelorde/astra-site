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

  /* lead modal — show the selected tariff or the source page */
  var modal = doc.querySelector("#lead-modal");
  function openModal(tariff, mode, source) {
    if (!modal) return;
    modal.classList.add("open");
    doc.body.style.overflow = "hidden";
    var tf = modal.querySelector('[name="tariff"]');
    if (tf) tf.value = tariff || "";
    var sf = modal.querySelector('[name="source"]');
    if (sf) sf.value = source || "";
    var context = modal.querySelector("[data-context-line]");
    if (context) {
      context.hidden = !tariff && !source;
      if (!context.hidden) {
        context.querySelector("[data-context-label]").textContent = tariff ? "Обраний тариф:" : "Сторінка:";
        context.querySelector("b").textContent = tariff || source;
      }
    }
    if (mode) modal.setAttribute("data-mode", mode);
    mountTurnstile(modal.querySelector("form[data-lead]"));
    var first = modal.querySelector("input");
    if (first) setTimeout(function () { first.focus(); }, 50);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open"); doc.body.style.overflow = "";
  }
  doc.addEventListener("click", function (e) {
    var t = e.target.closest("[data-modal]");
    if (t) { e.preventDefault(); openModal(t.dataset.tariff || "", t.dataset.mode || "", t.dataset.leadSource || doc.body.dataset.leadSource || ""); }
    if (e.target.closest("[data-close]") || e.target.classList.contains("backdrop")) closeModal();
  });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* image lightbox — click any [data-zoom] image to view it enlarged */
  var lightbox = doc.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var closeLb = function () { lightbox.classList.remove("open"); doc.body.style.overflow = ""; };
    doc.addEventListener("click", function (e) {
      var z = e.target.closest("[data-zoom]");
      if (z && z.tagName === "IMG") { lbImg.src = z.currentSrc || z.src; lbImg.alt = z.alt || ""; lightbox.classList.add("open"); doc.body.style.overflow = "hidden"; return; }
      if (e.target.closest(".lightbox")) closeLb();
    });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && lightbox.classList.contains("open")) closeLb(); });
  }

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

  /* lead forms — Turnstile token and Telegram delivery must both succeed */
  var leadEndpoint = doc.body.dataset.leadEndpoint;
  var siteKey = doc.body.dataset.turnstileSitekey;
  var leadForms = doc.querySelectorAll("form[data-lead]");
  function formError(form, message) {
    var error = form.querySelector(".form-error");
    if (!error) {
      error = doc.createElement("p");
      error.className = "form-error";
      error.setAttribute("role", "alert");
      form.querySelector('button[type="submit"]').after(error);
    }
    error.textContent = message;
  }
  function unlockForm(form) {
    form._sending = false;
    var button = form.querySelector('button[type="submit"]');
    button.disabled = false;
    button.textContent = button.dataset.leadLabel;
  }
  function mountTurnstile(form) {
    if (!form || !window.turnstile || !siteKey || form._turnstileId != null) return;
    var container = doc.createElement("div");
    container.setAttribute("data-turnstile", "");
    form.querySelector('button[type="submit"]').before(container);
    try {
      form._turnstileId = window.turnstile.render(container, {
        sitekey: siteKey,
        execution: "execute",
        appearance: "interaction-only",
        size: "flexible",
        callback: function (token) { sendLead(form, token); },
        "error-callback": function () {
          unlockForm(form);
          formError(form, "Не вдалося перевірити заявку. Спробуйте ще раз.");
        },
      });
    } catch {
      container.remove();
    }
  }
  async function sendLead(form, token) {
    var values = new FormData(form);
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 20000);
    try {
      var response = await fetch(leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: values.get("name") || "",
          phone: values.get("phone") || "",
          address: values.get("address") || "",
          message: values.get("message") || "",
          tariff: values.get("tariff") || "",
          source: values.get("source") || doc.body.dataset.leadSource || "Головна",
          turnstileToken: token,
        }),
      });
      if (!response.ok) throw new Error("Delivery failed");
      var result = await response.json();
      if (!result.ok) throw new Error("Delivery failed");
      form.querySelectorAll(".field,button[type=submit],.form-note,[data-turnstile]").forEach(function (node) { node.style.display = "none"; });
      formError(form, "");
      var done = form.querySelector("[data-success]");
      if (done) done.style.display = "block";
    } catch {
      formError(form, "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте 0 800 20-38-38.");
      unlockForm(form);
      if (form._turnstileId != null && window.turnstile) window.turnstile.reset(form._turnstileId);
    } finally {
      clearTimeout(timeout);
    }
  }
  leadForms.forEach(function (form) {
    var button = form.querySelector('button[type="submit"]');
    button.dataset.leadLabel = button.textContent;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form._sending) return;
      var phone = form.querySelector('input[data-phone]');
      var digits = phone ? phone.value.replace(/\D/g, "") : "";
      var phoneError = form.querySelector(".err");
      if (phoneError) phoneError.textContent = "";
      formError(form, "");
      if (!/^380\d{9}$/.test(digits)) {
        if (phoneError) phoneError.textContent = "Введіть коректний номер телефону";
        if (phone) phone.focus();
        return;
      }
      if (!leadEndpoint || !siteKey) {
        formError(form, "Заявки тимчасово недоступні. Зателефонуйте 0 800 20-38-38.");
        return;
      }
      mountTurnstile(form);
      if (form._turnstileId == null) {
        formError(form, window.turnstile
          ? "Не вдалося запустити перевірку заявки. Спробуйте пізніше."
          : "Перевірка заявки ще завантажується. Спробуйте за мить.");
        return;
      }
      form._sending = true;
      button.disabled = true;
      button.textContent = "Надсилаємо заявку...";
      try {
        window.turnstile.execute(form._turnstileId);
      } catch {
        unlockForm(form);
        formError(form, "Не вдалося перевірити заявку. Спробуйте ще раз.");
      }
    });
  });
  if (siteKey && leadEndpoint) {
    var turnstileScript = doc.createElement("script");
    turnstileScript.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    turnstileScript.async = true;
    turnstileScript.onload = function () {
      leadForms.forEach(function (form) {
        if (!form.closest(".modal") || form.closest(".modal.open")) mountTurnstile(form);
      });
    };
    doc.head.appendChild(turnstileScript);
  }

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
    if (/\/blog(?:\/|$)/.test(location.pathname)) {
      doc.querySelectorAll('.navlink[href$="blog/"], .mobile-menu a[href$="blog/"]').forEach(function (a) { a.classList.add("current"); });
      return;
    }
    doc.querySelectorAll(".navlink").forEach(function (a) {
      if (b(a.getAttribute("href")) === path) a.classList.add("current");
    });
    // pages that have their own top-level item must not also light up "Напрямки"
    var topHrefs = [].map.call(doc.querySelectorAll(".mainnav .navlink"), function (a) { return b(a.getAttribute("href")); });
    var hasTop = topHrefs.indexOf(path) > -1;
    doc.querySelectorAll(".mega .col").forEach(function (col) {
      var hit = [].some.call(col.querySelectorAll("a"), function (a) { return b(a.getAttribute("href")) === path; });
      if (hit && !hasTop) {
        var bl = col.querySelector("b"); if (bl) bl.classList.add("current");
        var li = col.closest("li"); if (li) { var nl = li.querySelector(".navlink"); if (nl) nl.classList.add("current"); }
      }
    });
    doc.querySelectorAll(".mobile-menu a").forEach(function (a) {
      if (b(a.getAttribute("href")) === path) a.classList.add("current");
    });
  })();

  /* deep-link: activate the tab named in the URL hash and scroll to the tabs
     bar (not the panel below — scrolling to the content crops the tabs off the
     top). Runs on load AND on in-page hash changes, e.g. clicking a menu item
     (taryfy-dim.html#pryvatnyi) while already on the tariffs page. */
  (function () {
    function apply(smooth) {
      var h = decodeURIComponent(location.hash.slice(1));
      if (!h) return;
      var btn = doc.querySelector('.tabs button[data-tab="' + h + '"]');
      if (!btn) return;
      btn.click();
      var bar = btn.closest(".tariffs-bar") || btn.closest("[data-tabwrap]") || btn;
      setTimeout(function () {
        window.scrollTo({ top: bar.getBoundingClientRect().top + window.scrollY - 128, behavior: smooth ? "smooth" : "auto" });
      }, 60);
    }
    apply(false);
    window.addEventListener("hashchange", function () { apply(true); });
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

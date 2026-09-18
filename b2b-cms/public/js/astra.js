/* ASTRA — shared interactions. Progressive enhancement; site works without JS. */
(function () {
  "use strict";
  var doc = document;
  var en = doc.documentElement.lang === 'en';
  var tr = function (uk, english) { return en ? english : uk; };

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
  var menuScrim = doc.querySelector(".mobile-menu-scrim");
  if (burger && mobile) {
    var closeMenu = function (restoreFocus) {
      mobile.classList.remove("open"); doc.body.style.overflow = "";
      if (menuScrim) menuScrim.classList.remove("open");
      mobile.inert = true;
      mobile.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      if (restoreFocus) burger.focus();
    };
    burger.addEventListener("click", function () {
      if (mobile.classList.contains("open")) { closeMenu(true); return; }
      mobile.inert = false;
      mobile.setAttribute("aria-hidden", "false");
      mobile.classList.add("open");
      if (menuScrim) menuScrim.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
      doc.body.style.overflow = "hidden";
      var close = mobile.querySelector("[data-close-menu]");
      if (close) close.focus();
    });
    mobile.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { closeMenu(false); }); });
    var mc = mobile.querySelector("[data-close-menu]");
    if (mc) mc.addEventListener("click", function () { closeMenu(true); });
    if (menuScrim) menuScrim.addEventListener("click", function () { closeMenu(true); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && mobile.classList.contains("open")) closeMenu(true); });
  }

  /* lead modal — show the selected tariff or the source page */
  var modal = doc.querySelector("#lead-modal");
  var modalTrigger = null;
  function openModal(tariff, mode, source) {
    if (!modal) return;
    modal.inert = false;
    modal.setAttribute("aria-hidden", "false");
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
        context.querySelector("[data-context-label]").textContent = tariff ? tr("Обраний тариф:", "Selected plan:") : tr("Сторінка:", "Page:");
        context.querySelector("b").textContent = tariff || source;
      }
    }
    if (mode) modal.setAttribute("data-mode", mode);
    mountTurnstile(modal.querySelector("form[data-lead]"));
    var first = modal.querySelector("[data-modal-success]:not([hidden]) [data-close]") || modal.querySelector("input");
    if (first) setTimeout(function () { if (modal.classList.contains("open")) first.focus(); }, 50);
  }
  function closeModal() {
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open"); doc.body.style.overflow = "";
    modal.inert = true;
    modal.setAttribute("aria-hidden", "true");
    var success = modal.querySelector("[data-modal-success]");
    if (success && !success.hidden) {
      var form = modal.querySelector("form[data-lead]");
      form.reset();
      form._sending = false;
      var submit = form.querySelector('button[type="submit"]');
      submit.disabled = false;
      submit.textContent = submit.dataset.leadLabel;
      form.querySelector(".form-error")?.remove();
      if (form._turnstileId != null && window.turnstile) window.turnstile.reset(form._turnstileId);
      modal.querySelector("[data-modal-form-content]").hidden = false;
      success.hidden = true;
      modal.setAttribute("aria-labelledby", "lead-modal-title");
    }
    if (modalTrigger && modalTrigger.isConnected) modalTrigger.focus();
  }
  doc.addEventListener("click", function (e) {
    var t = e.target.closest("[data-modal]");
    if (t) { e.preventDefault(); modalTrigger = t; openModal(t.dataset.tariff || "", t.dataset.mode || "", t.dataset.leadSource || doc.body.dataset.leadSource || ""); }
    if (e.target.closest("[data-close]") || e.target.classList.contains("backdrop")) closeModal();
  });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* image lightbox — click any [data-zoom] image to view it enlarged */
  var lightbox = doc.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var closeLb = function () { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); doc.body.style.overflow = ""; };
    doc.addEventListener("click", function (e) {
      var z = e.target.closest("[data-zoom]");
      if (z && z.tagName === "IMG") { lbImg.src = z.currentSrc || z.src; lbImg.alt = z.alt || ""; lightbox.setAttribute("aria-hidden", "false"); lightbox.classList.add("open"); doc.body.style.overflow = "hidden"; return; }
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
          formError(form, tr("Не вдалося перевірити заявку. Спробуйте ще раз.", "We could not verify your request. Please try again."));
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
          source: values.get("source") || doc.body.dataset.leadSource || tr("Головна", "Home"),
          turnstileToken: token,
        }),
      });
      if (!response.ok) throw new Error("Delivery failed");
      var result = await response.json();
      if (!result.ok) throw new Error("Delivery failed");
      var modalForm = form.closest("#lead-modal");
      if (modalForm) {
        modalForm.querySelector("[data-modal-form-content]").hidden = true;
        var modalSuccess = modalForm.querySelector("[data-modal-success]");
        modalSuccess.hidden = false;
        modalForm.setAttribute("aria-labelledby", "lead-modal-success-title");
        if (modalForm.classList.contains("open")) modalSuccess.querySelector("[data-close]").focus();
      } else {
        form.querySelectorAll(".field,button[type=submit],.form-note,[data-turnstile]").forEach(function (node) { node.style.display = "none"; });
        formError(form, "");
        var done = form.querySelector("[data-success]");
        if (done) done.style.display = "block";
      }
    } catch {
      formError(form, tr("Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте 0 800 20-38-38.", "We could not send your request. Please try again or call 0 800 20-38-38."));
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
        if (phoneError) phoneError.textContent = tr("Введіть коректний номер телефону", "Enter a valid Ukrainian phone number");
        if (phone) phone.focus();
        return;
      }
      if (!leadEndpoint || !siteKey) {
        formError(form, tr("Заявки тимчасово недоступні. Зателефонуйте 0 800 20-38-38.", "Requests are temporarily unavailable. Please call 0 800 20-38-38."));
        return;
      }
      mountTurnstile(form);
      if (form._turnstileId == null) {
        formError(form, window.turnstile
          ? tr("Не вдалося запустити перевірку заявки. Спробуйте пізніше.", "Verification could not start. Please try again later.")
          : tr("Перевірка заявки ще завантажується. Спробуйте за мить.", "Verification is still loading. Please try again in a moment."));
        return;
      }
      form._sending = true;
      button.disabled = true;
      button.textContent = tr("Надсилаємо заявку...", "Sending request...");
      try {
        window.turnstile.execute(form._turnstileId);
      } catch {
        unlockForm(form);
        formError(form, tr("Не вдалося перевірити заявку. Спробуйте ще раз.", "We could not verify your request. Please try again."));
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
    var b = function (h) { var p = (h || "").split("#")[0]; var parts = p.split("/").filter(Boolean); return p.endsWith("/") ? (parts[parts.length - 1] === "blog" ? "blog/" : "index.html") : parts.pop() || "index.html"; };
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

})();

/* One-time, progressive motion for marketing sections and article reading. */
(function () {
  "use strict";

  var doc = document;
  var article = doc.querySelector("main .blog-article");
  if (article) {
    var progress = doc.createElement("div");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");
    doc.body.appendChild(progress);

    var progressFrame = 0;
    var updateProgress = function () {
      progressFrame = 0;
      var distance = Math.max(1, article.offsetHeight - window.innerHeight * .3);
      var fraction = Math.min(1, Math.max(0, -article.getBoundingClientRect().top / distance));
      progress.style.transform = "scaleX(" + fraction + ")";
    };
    var queueProgress = function () {
      if (!progressFrame) progressFrame = window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener("scroll", queueProgress, { passive: true });
    window.addEventListener("resize", queueProgress);
    updateProgress();
  }

  if (!doc.body.classList.contains("page-b2b") ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var groups = [
    ["main .section-head, main .blog-related h2, main .ref-grid > :not(.ref-media), main .cta-band, main .svc-group > h3, main .svc-group-sub", "motion-rise"],
    ["main .size-grid > *, main .grid > article, main .pillars > *, main .tariff-list > *, main .mgr-grid > *, main .svc-grid > *, main .trustbar > *, main .feat-col > .f, main .blog-grid > *", "motion-card"],
    ["main .ref-media, main .blog-article__cover", "motion-wipe"]
  ];
  var targets = [];
  groups.forEach(function (group) {
    doc.querySelectorAll(group[0]).forEach(function (element) {
      var box = element.getBoundingClientRect();
      if (box.top < window.innerHeight * .88 && box.bottom > 0) return;
      element.classList.add(group[1]);
      targets.push(element);
    });
  });
  if (!targets.length) return;

  doc.documentElement.classList.add("motion-ready");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
  targets.forEach(function (element) { observer.observe(element); });
})();

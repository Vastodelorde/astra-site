(function () {
  "use strict";

  var doc = document;
  doc.documentElement.dataset.imageLoaderActive = 'true';
  var lazyImages = doc.querySelectorAll('.page-b2b img[loading="lazy"]');
  var imageLoadTargets = new WeakMap();
  var imageLoadObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var image = imageLoadTargets.get(entry.target);
      if (image) image.loading = 'eager';
      imageLoadObserver.unobserve(entry.target);
    });
  }, { rootMargin: '600px 0px', threshold: 0 }) : null;
  lazyImages.forEach(function (image) {
    var quiet = image.closest('.mgr-photo, .partner, .brand-logos');
    var shell = image.closest('.ref-media, .blog-card__media, .blog-article__cover');
    image.decoding = 'async';
    image.classList.add('progressive-image');
    if (quiet) image.classList.add('image-quiet');
    if (shell) shell.classList.add('image-shell');

    var showImage = function () {
      var reveal = function () {
        window.requestAnimationFrame(function () {
          image.classList.add('image-loaded');
          if (shell) shell.classList.add('image-loaded');
          image.dispatchEvent(new CustomEvent('astra:image-ready'));
        });
      };
      if (image.decode) image.decode().catch(function () {}).then(reveal);
      else reveal();
    };
    var showFallback = function () {
      image.classList.add('image-load-failed');
      if (shell) shell.classList.add('image-load-failed');
      image.dispatchEvent(new CustomEvent('astra:image-ready'));
    };

    if (image.complete) {
      if (image.naturalWidth) showImage();
      else showFallback();
    } else {
      image.addEventListener('load', showImage, { once: true });
      image.addEventListener('error', showFallback, { once: true });
      if (imageLoadObserver) {
        var loadTarget = shell || image.parentElement || image;
        imageLoadTargets.set(loadTarget, image);
        imageLoadObserver.observe(loadTarget);
      }
      else image.loading = 'eager';
    }
  });

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
      var target = entry.target;
      var image = target.classList.contains('motion-wipe') && target.querySelector('img.progressive-image');
      var reveal = function () {
        target.classList.add("is-visible");
        observer.unobserve(target);
      };
      if (image && !image.classList.contains('image-loaded') && !image.classList.contains('image-load-failed')) {
        if (target.dataset.imageRevealQueued) return;
        target.dataset.imageRevealQueued = 'true';
        image.addEventListener('astra:image-ready', reveal, { once: true });
        return;
      }
      reveal();
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
  targets.forEach(function (element) { observer.observe(element); });
})();

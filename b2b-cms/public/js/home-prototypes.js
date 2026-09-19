(() => {
  const stage = document.getElementById('stage');
  const picker = document.querySelector('.proto-picker');
  if (!stage || !picker) return;

  const highlight = picker.querySelector('.proto-picker-highlight');
  const items = [...picker.querySelectorAll('.proto-picker-item:not(.proto-picker-replay)')];
  const replay = picker.querySelector('.proto-picker-replay');
  const templates = ['proto-control', 'proto-proof', 'proto-navigator'].map((id) => document.getElementById(id));
  let current = 0;
  let observer;

  function moveHighlight() {
    const el = items[current];
    if (!el || !highlight) return;
    highlight.style.width = el.offsetWidth + 'px';
    highlight.style.transform = `translateX(${el.offsetLeft}px)`;
  }

  function activateNavigator() {
    const tabs = [...stage.querySelectorAll('[data-proto-segment]')];
    const panels = [...stage.querySelectorAll('[data-proto-panel]')];
    if (!tabs.length) return;

    tabs.forEach((tab) => tab.addEventListener('click', () => {
      const selected = tab.dataset.protoSegment;
      tabs.forEach((item) => {
        const active = item.dataset.protoSegment === selected;
        item.toggleAttribute('data-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      panels.forEach((panel) => { panel.hidden = panel.dataset.protoPanel !== selected; });
    }));
  }

  function activateReveals() {
    observer?.disconnect();
    const reveals = [...stage.querySelectorAll('.proto-reveal')];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((element) => observer.observe(element));
  }

  function mount(i) {
    stage.replaceChildren();
    requestAnimationFrame(() => {
      const template = templates[i];
      if (!template) return;
      stage.append(template.content.cloneNode(true));
      activateNavigator();
      activateReveals();
    });
  }

  function setActive(i) {
    if (i < 0 || i >= templates.length) return;
    current = i;
    items.forEach((el, j) => {
      el.toggleAttribute('data-active', j === i);
      if (j === i) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
    moveHighlight();
    const url = new URL(location.href);
    url.searchParams.set('v', i + 1);
    history.replaceState(null, '', url);
    mount(i);
  }

  items.forEach((el, i) => el.addEventListener('click', () => setActive(i)));
  replay?.addEventListener('click', () => mount(current));
  window.addEventListener('resize', moveHighlight);

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const num = parseInt(event.key, 10);
    if (num >= 1 && num <= templates.length) setActive(num - 1);
    else if (event.key === 'ArrowRight') setActive((current + 1) % templates.length);
    else if (event.key === 'ArrowLeft') setActive((current - 1 + templates.length) % templates.length);
    else if (event.key === 'r' || event.key === 'R') mount(current);
  });

  setActive((parseInt(new URLSearchParams(location.search).get('v'), 10) || 1) - 1);
  requestAnimationFrame(() => requestAnimationFrame(() => picker.setAttribute('data-ready', '')));
})();

// Builds index.html — a 1:1 static copy of the astra.in.ua homepage.
// Typography: Wix Madefor Display (headings) + Inter (body), injected via CSS variables.
import { writeFileSync } from 'node:fs';

const FONT = {
  head: 'Wix Madefor Display', body: 'Inter',
  gfonts: 'family=Wix+Madefor+Display:wght@600;700;800&family=Inter:wght@400;500;600&display=swap',
  vars: `--font-head:'Wix Madefor Display',sans-serif;--font-body:'Inter',sans-serif;--w-head:700;--w-head-strong:800;`,
};

const navItems = [
  ['Спецпропозиції', 'Акції, програми лояльності, бонуси'],
  ['Інтернет', 'Індивідуальні тарифи для кожного клієнта'],
  ['Телебачення', 'АСТРА TV, MEGOGO, sweet.tv, youtv'],
  ['Послуги', 'Додаткові можливості від Астри'],
  ['Налаштування', 'Параметри для налаштування інтернету та послуг'],
  ['Інформація', 'Компанія, документація, новини'],
];

const features = [
  ['speedometer10000.svg', 'Надшвидкий енергонезалежний 10&nbsp;гБіт Інтернет з IPv6'],
  ['atv.svg', 'Телебачення від АСТРА TV, MEGOGO, Sweet.tv та youtv'],
  ['intercom.svg', 'Домофон в смартфоні'],
  ['cloud.svg', 'Хмарне відеоспостереження'],
  ['support.svg', 'Цілодобова жива підтримка'],
  ['medal.svg', 'Понад 20 років досвіду та більше 45000 задоволених абонентів'],
];

const offers = [
  ['z_namy_vygidnishe.png', 'З нами вигідніше!', 'Перепідключіться до нас від іншого провайдера та отримайте знижку 25% на користування послугами!'],
  ['friends.png', 'Друзі завжди разом', 'Підключіть друга та отримайте по 500 грн кожен!'],
  ['pershiy_u_pidyizdi.png', "Перший у під'їзді!", "Отримайте 6 місяців бонусу, якщо Ви перші підключилися у під'їзді!"],
];

const news = [
  ['14 чер 2026', 'АСТРА запускає інтернет 2.5 Гбіт/с за 255 грн на місяць'],
  ['01 лют 2025', 'Актуалізація тарифних пропозицій для бізнесу 01.03.2026'],
  ['13 січ 2025', 'Актуалізація тарифних пропозицій 01.02.2026'],
  ['19 гру 2025', 'Нові тарифи 2.50 та 100 — максимум швидкості'],
];

const socials = [
  ['tg.svg', 'Ми в Telegram'], ['vb.svg', 'Ми в Viber'], ['tt.png', 'Ми в TikTok'],
  ['youtube-icon.png', 'Ми в Youtube'], ['instagram-icon.png', 'Ми в Instagram'],
  ['linkedin.png', 'Ми в LinkedIn'], ['facebook-letter-logo.svg', 'Ми у Facebook'],
];

const navHtml = navItems.map(([t, s]) => `
          <li><a class="nav-top" href="#"><span class="nav-title">${t}</span><span class="nav-sub">${s}</span></a></li>`).join('');
const featHtml = features.map(([img, txt]) => `
        <div class="feat"><div class="ic"><img src="assets/${img}" alt=""></div><p>${txt}</p></div>`).join('');
const offerHtml = offers.map(([img, h, p]) => `
        <article class="offer"><div class="ph"><img src="assets/${img}" alt="${h}"></div><h3>${h}</h3><p>${p}</p></article>`).join('');
const newsHtml = news.map(([d, t]) => `
          <div class="news-item"><span class="date">${d}</span><a href="#">${t}</a></div>`).join('');
const socHtml = socials.map(([img, t]) => `
          <a class="soc" href="#"><img src="assets/${img}" alt="">${t}</a>`).join('');
const tabs = ['Багатоквартирні будинки', 'Приватний сектор', 'Бізнес', 'Гуртожитки'];
const tabHtml = tabs.map((t, i) => `<span class="tab${i === 0 ? ' active' : ''}">${t}</span>`).join('');

const body = `
  <header class="site-header">
    <div class="wrap topbar">
      <a class="brand" href="#"><img src="assets/logo.svg" alt="АСТРА"></a>
      <a class="top-link" href="#"><img src="assets/shop.svg" alt="">Наш Магазин</a>
      <a class="top-phone" href="tel:+380931702977">+38 093 170-29-77</a>
      <a class="pill" href="#"><img src="assets/phone-call.svg" alt="" style="height:15px;filter:brightness(0) invert(1)">Передзвоніть мені</a>
      <a class="pill" href="#"><img src="assets/operator.svg" alt="" style="height:16px;filter:brightness(0) invert(1)">Особистий кабінет</a>
      <a class="icon-btn" href="#"><img src="assets/search.svg" alt="Пошук"></a>
    </div>
    <nav class="mainnav">
      <div class="wrap">
        <ul>${navHtml}
        </ul>
      </div>
    </nav>
  </header>

  <section class="hero">
    <div class="wrap">
      <h1>Сузір'я цифрових послуг</h1>
      <a class="btn-cta" href="#">Підключитись</a>
    </div>
  </section>

  <section class="features">
    <div class="wrap feat-grid">${featHtml}
    </div>
  </section>

  <section class="special">
    <span class="arrow l">&#8249;</span><span class="arrow r">&#8250;</span>
    <div class="wrap">
      <h2 class="section-title">Спецпропозиції</h2>
      <div class="offer-row">${offerHtml}
      </div>
      <a class="see-all" href="#">ПЕРЕГЛЯНУТИ ВСІ &rsaquo;</a>
    </div>
  </section>

  <section class="tariffs">
    <span class="arrow l">&#8249;</span><span class="arrow r">&#8250;</span>
    <div class="wrap">
      <h2 class="section-title">Пропозиції</h2>
      <div class="tabs">
        <button class="city">Львів</button>
        <div class="tab-row">${tabHtml}</div>
      </div>
      <div class="plan-row">
        <article class="plan accent">
          <div class="ph-head">Акція</div>
          <div class="body">
            <div class="speed">2500 Мбіт/с</div>
            <p class="desc">Інтернет 2,5 Гбіт/с за 255 грн на місяць</p>
            <div class="price plain">255 грн/міс</div>
            <button class="btn-plan">Підключити</button>
          </div>
        </article>
        <article class="plan">
          <div class="ph-head">Десять гіг</div>
          <div class="body">
            <div class="speed">10000 Мбіт/с</div>
            <p class="desc">Мінімальна гарантована швидкість 2.5 GIGABIT</p>
            <div class="price">832 грн/міс<span class="old">999 грн/міс</span></div>
            <button class="btn-plan">Підключити</button>
          </div>
        </article>
        <article class="plan">
          <div class="ph-head">Найкращий</div>
          <div class="body">
            <div class="speed">2500 Мбіт/с</div>
            <div class="tv-ic"><img src="assets/astra_tv_icon.svg" alt="ASTRA TV"><img src="assets/sweet_tv_icon.svg" alt="sweet.tv"></div>
            <p class="desc">sweet.tv пакет «L»; Постійна IP-адреса; Пристрій в оренду; Домофонія</p>
            <div class="price">499 грн/міс<span class="old">599 грн/міс</span></div>
            <button class="btn-plan">Підключити</button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="info">
    <div class="wrap">
      <h2 class="section-title">Новини компанії та контактна інформація</h2>
      <div class="info-grid">
        <div class="col">${newsHtml}
        </div>
        <div class="col">
          <h4>Центр обслуговування абонентів</h4>
          <div class="addr"><span class="nm">м. Львів, вул. Стрийська, 45 (ТОЦ «Fabrik»)</span>Пн–Нд: 10:00–20:00</div>
          <div class="addr"><span class="nm">м. Львів, вул. Скляна, 11А</span>Пн–Нд: 10:00–18:00, обід 13:00–14:00<br>Сб–Нд: вихідні</div>
          <h4>Бухгалтерія (для юридичних осіб)</h4>
          <div class="addr">+38 093 289-98-15</div>
          <div class="addr"><span class="nm">м. Львів, вул. Керченська, 8А</span>Пн–Пт: 9:00–18:00, обід 13:00–14:00<br>Сб–Нд: вихідні</div>
          <h4>Адреса для листування</h4>
          <div class="addr">79048, м. Львів, вул. Литвиненка, 3<br><a href="mailto:info@astra.in.ua" style="color:var(--blue)">info@astra.in.ua</a></div>
        </div>
        <div class="col">
          <h4>Цілодобова підтримка</h4>
          <ul class="phones">
            <li>+38 093 170-29-77</li>
            <li>+38 097 419-38-38</li>
            <li>+38 095 419-38-38</li>
            <li>(032) 232-8808</li>
            <li>0 800 20-38-36</li>
          </ul>
          <h4>Спільноти</h4>
          <div class="socials">${socHtml}
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="bottom-cta"><a class="btn-cta" href="#">Підключитись</a></div>
  <div class="copyright">© 2004–2026, компанія АСТРА</div>`;

const html = `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>АСТРА — Інтернет, Домофон, Телебачення, Відеонагляд</title>
<link rel="icon" href="assets/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${FONT.gfonts}" rel="stylesheet">
<link rel="stylesheet" href="css/base.css">
<style>:root{${FONT.vars}}</style>
</head>
<body>${body}
</body>
</html>
`;

writeFileSync(new URL('./index.html', import.meta.url), html);
console.log('Built: index.html (Wix Madefor Display + Inter)');

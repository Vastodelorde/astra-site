import { enPages, plans as englishPlans } from './enPages.ts';

export type Locale = 'uk' | 'en';
export type Localized = { uk?: string; en?: string };

const l = (uk: string, en = ''): Localized => ({ uk, en });
const enSection = (page: keyof typeof enPages, id: string) => enPages[page].sections.find((section) => section.id === id);
const pairItems = (items: any[], english: any[] = []) => items.map((item, index) => ({
  ...item,
  title: l(item.title, english[index]?.title),
  subtitle: item.subtitle ? l(item.subtitle, english[index]?.body) : undefined,
  body: item.body ? l(item.body, english[index]?.body) : undefined,
  result: item.result ? l(item.result, english[index]?.body) : undefined,
  label: item.label ? l(item.label, english[index]?.label || 'Explore') : undefined,
  imageAlt: item.imageAlt ? l(item.imageAlt, english[index]?.title) : undefined,
  features: item.features?.map((feature: string, featureIndex: number) => l(feature, english[index]?.features?.[featureIndex])),
}));

const homeScaleUk = [
  { key: 'small', title: 'Малий бізнес', subtitle: 'Кафе, магазин, салон, невеликий офіс', href: 'maliy.html', icon: 'shop', features: ['Симетричний резервований канал, статична IP', 'Безлімітний трафік, підтримка 24/7', 'Гостьовий Wi-Fi для відвідувачів', 'Відеонагляд та IP-домофонія'] },
  { key: 'medium', title: 'Середній бізнес', subtitle: 'Мережа закладів, склад, готель, офіс', href: 'seredniy.html', icon: 'building', features: ['Резервований канал, статична IP', 'Персональний акаунт-менеджер', 'СКС та безшовний Wi-Fi / Mesh', 'Відеонагляд з аналітикою, СКУД, VPS'] },
  { key: 'large', title: 'Великий бізнес', subtitle: 'Корпорація, ЖК, виробництво, ТРЦ', href: 'velykyi.html', icon: 'landmark', features: ['Виділене оптоволокно, резервні магістралі', 'NOC-моніторинг 24/7, акаунт-менеджер', 'Комплексна безпека, мультимедіа', 'Колокація в ЦОД, ВОЛЗ, GSM/LTE'] },
  { key: 'operators', title: 'Оператори', subtitle: 'ISP, telecom, дата-центр-клієнти', href: 'operators.html', icon: 'network', features: ['Піринг публічний і приватний', 'Прямі канали в Європу', 'ВОЛЗ під ключ', 'Колокація, оренда стійок, транзит'] },
];

const homeDirectionsUk = [
  { key: 'isp', title: 'ASTRA ISP', body: 'Енергонезалежний інтернет та побудова корпоративних мереж на власній оптичній магістралі.', href: 'isp.html', label: 'Детальніше' },
  { key: 'install', title: 'ASTRA INSTALL', body: 'Проєктування та монтаж систем безпеки, відеонагляду, контролю доступу, мереж і мультимедіа.', href: 'install.html', label: 'Детальніше' },
  { key: 'cloud', title: 'ASTRA CLOUD', body: 'Хмарна інфраструктура, розміщення серверів (колокація) та VPS/VDS із захистом від блекаутів.', href: 'cloud.html', label: 'Детальніше' },
];

const homePainsUk = [
  { key: 'suppliers', title: 'Розрізнені постачальники', result: 'Один надійний партнер на всі послуги, з єдиним рахунком і контактом.' },
  { key: 'connection', title: "Нестабільний зв'язок", result: 'Стабільна робота CRM, POS-терміналів і відеодзвінків.' },
  { key: 'admin', title: 'Складне адміністрування', result: 'Прозорість розрахунків та єдина точка входу для всіх послуг.' },
  { key: 'wifi', title: '«Мертві зони» Wi-Fi', result: "Суцільне безшовне покриття на всій території об'єкта." },
  { key: 'support', title: 'Тривале очікування підтримки', result: 'Миттєва реакція та проактивне вирішення проблем до їх появи.' },
  { key: 'security', title: 'Ризики безпеки', result: 'Надійний захист даних та відеоконтроль периметра 24/7.' },
];

const homeObjectsUk = [
  { key: 'offices', title: 'Офіси та бізнес-центри', body: 'Масштабований від 1 до 500+ робочих місць, безшовний Wi-Fi та захищені корпоративні VPN-канали.', imagePath: 'img/home-office.webp' },
  { key: 'residential', title: 'Житлові комплекси', body: 'Інтернет-рішення для ЖК, автоматизація та уніфікація систем контролю доступу та безпеки.', imagePath: 'img/home-residential.webp' },
  { key: 'retail', title: 'Ресторани, кафе та рітейл-мережі', body: 'Об’єднання сотень філій в єдину ізольовану мережу. Надійний гостьовий Wi-Fi, СКУД та СКС.', imagePath: 'img/home-retail.webp' },
  { key: 'warehouse', title: 'Склади та виробництва', body: 'Стабільне покриття великих площ для IoT-пристроїв, сканерів та терміналів збору даних.', imagePath: 'img/home-warehouse.webp' },
  { key: 'hospitality', title: 'Готелі та коворкінги', body: 'Безпечний Wi-Fi Enterprise-рівня, гнучке керування трафіком та розумна аналітика мережі.', imagePath: 'img/home-hospitality.webp' },
];

const homeCollabUk = [
  { key: 'personal', title: 'Персональний підхід та сервіс', body: 'Закріплений за вами особистий менеджер знає специфіку кожної локації, координує технічні служби та швидко вирішує ваші питання.' },
  { key: 'costs', title: 'Консолідація та оптимізація витрат', body: 'Усі ваші офіси, склади, магазини чи ЖК обслуговуються в межах одного договору. Єдиний рахунок, чітка дата оплати та повна прозорість витрат.' },
  { key: 'responsibility', title: 'Комплексна відповідальність за результат', body: 'Ми відповідаємо за всю інфраструктуру, від магістралі до вашого обладнання. За потреби проводимо повний аудит мережі об’єкта та усуваємо проблеми на будь-якому рівні.' },
];

const homeEn = enPages.index;
export const homePageFallback = {
  title: 'Головна сторінка',
  key: 'home',
  seo: {
    title: l('АСТРА для бізнесу: цифрові рішення для бізнесу та сучасної нерухомості', homeEn.title),
    description: l('Створюємо та обслуговуємо цифрову інфраструктуру для бізнесу й комерційної нерухомості з 2004 року: енергонезалежний інтернет, системи безпеки, колокація та хмара.', homeEn.description),
    ogTitle: l('АСТРА для бізнесу: цифрові рішення для бізнесу та сучасної нерухомості', homeEn.title),
    ogDescription: l("Інфраструктура зв'язку та безпеки для бізнесу й нерухомості з 2004 року. ASTRA ISP · INSTALL · CLOUD.", homeEn.description),
    canonicalUk: 'https://astra.in.ua/b2b/',
    canonicalEn: 'https://astra.in.ua/b2b/en/',
  },
  hero: {
    title: l('Цифрові рішення для бізнесу та сучасної нерухомості', homeEn.hero.title),
    intro: l("Створюємо та обслуговуємо інфраструктуру зв'язку й безпеки з 2004 року: інтернет, мережі, відеонагляд, контроль доступу та хмара під одним договором.", homeEn.hero.intro),
    label: l('Головна', 'Home'), imagePath: 'img/hero-biz.jpg',
    imageAlt: l('Цифрова інфраструктура для бізнесу та сучасної нерухомості', 'Digital infrastructure for business and modern real estate'),
    ctaLabel: l('Замовити консультацію', 'Request a consultation'),
  },
  sections: [
    { id: 'segments-size', heading: l('Рішення для будь-якого масштабу', enSection('index', 'segments-size')?.heading), lead: l('Базовий набір послуг однаковий у кожному тарифі, а рекомендовані додаткові рішення підбираємо під ваш масштаб і задачі.', enSection('index', 'segments-size')?.lead), items: pairItems(homeScaleUk, enSection('index', 'segments-size')?.items) },
    { id: 'directions', heading: l('Комплекс цифрових рішень АСТРА', enSection('index', 'directions')?.heading), lead: l("Ми об'єднали послуги у три спеціалізовані напрямки, щоб закрити будь-яку телеком-потребу вашого бізнесу чи ЖК, від каналу зв'язку до камер на периметрі та серверів у нашому ЦОД.", enSection('index', 'directions')?.lead), items: pairItems(homeDirectionsUk, enSection('index', 'directions')?.items) },
    { id: 'pain', heading: l('Позбудьтеся типових проблем інфраструктури', enSection('index', 'pain')?.heading), lead: l("Ми проаналізували запити наших клієнтів і створили рішення, що усувають головні бар'єри для розвитку бізнесу.", enSection('index', 'pain')?.lead), items: pairItems(homePainsUk, enSection('index', 'pain')?.items) },
    { id: 'objects', heading: l("Рішення за типом об'єкта", enSection('index', 'objects')?.heading), lead: l('Створюємо та обслуговуємо цифрову інфраструктуру з урахуванням специфіки кожного типу об’єкта.', enSection('index', 'objects')?.lead), items: pairItems(homeObjectsUk, enSection('index', 'objects')?.items) },
    { id: 'chomu', heading: l("Формат співпраці, що звільняє вас від турбот про зв'язок", enSection('index', 'chomu')?.heading), lead: l('Ми беремо технічні питання на себе, щоб ви зосередилися на своєму бізнесі.', enSection('index', 'chomu')?.lead), items: pairItems(homeCollabUk, enSection('index', 'chomu')?.items) },
    { id: 'partners', heading: l("Понад 50 ОСББ та десятки комерційних об'єктів", enSection('index', 'partners')?.heading), lead: l('Команда наших фахівців має багаторічну експертизу у побудові мереж і систем безпеки різного рівня складності, від офісів до територій виробничих підприємств.', enSection('index', 'partners')?.lead), note: l('Серед наших клієнтів: забудовники, житлові комплекси, ритейл- і HoReCa-мережі, логістичні компанії, заклади культури та освіти.', enSection('index', 'partners')?.note), imagePath: 'img/team-datacenter.jpg', imageAlt: l('Технічна команда АСТРА в дата-центрі у Львові', 'ASTRA technical team in the Lviv data center') },
    { id: 'blog', heading: l('Поради та матеріали АСТРА', enSection('index', 'blog')?.heading), label: l('Усі статті', 'All articles'), href: 'blog/' },
  ],
  cta: { title: l("Обговорімо інфраструктуру вашого об'єкта", homeEn.cta?.title), text: l("Залиште заявку, і наш менеджер зв'яжеться з вами, підбере рішення під ваш масштаб і підготує комерційну пропозицію.", homeEn.cta?.text), label: l('Замовити консультацію', 'Request a consultation') },
};

const servicesUk = [
  ['business-internet', 'isp', 'gauge', 'Симетричний бізнес-інтернет', 'Виділений симетричний канал зі статичною IP та швидкістю до 10 Гбіт/с на технології XGS-PON.', 'isp.html#xgspon'],
  ['backup-routes', 'isp', 'route', 'Резервні магістралі', 'Дубльовані незалежні маршрути й енергонезалежна мережа для роботи без обривів.', 'isp.html#stability'],
  ['europe', 'isp', 'globe', 'Прямі канали в Європу', 'Пряме підключення до європейських точок обміну трафіком з мінімальним пінгом.', 'isp.html#europe'],
  ['peering', 'isp', 'network', 'Піринг для операторів', 'Публічний і приватний обмін трафіком для ISP та telecom-операторів.', 'operators.html#peering'],
  ['cctv', 'install', 'cctv', 'Відеонагляд з аналітикою', 'IP-камери з відеоаналітикою, розпізнаванням подій і надійним зберіганням архіву.', 'install.html#videonagliad'],
  ['access', 'install', 'fingerprint', 'Контроль доступу та СКУД', 'Системи контролю та управління доступом для співробітників і відвідувачів.', 'install.html#access'],
  ['intercom', 'install', 'door', 'IP-домофонія', "Багатоабонентні IP-домофони з відеовикликом для офісів, ЖК та комерційних об'єктів.", 'install.html#access'],
  ['barriers', 'install', 'car', "Розумні в'їзні групи / шлагбауми", 'Автоматичні шлагбауми й ворота з розпізнаванням номерів авто.', 'install.html#access'],
  ['ajax', 'install', 'shield', 'Охоронні системи Ajax', 'Бездротова охоронна сигналізація Ajax з датчиками та миттєвими сповіщеннями.', 'install.html#access'],
  ['cabling', 'install', 'cable', 'СКС та структуровані мережі', 'Проєктування та монтаж структурованих кабельних систем під ключ.', 'install.html#networks'],
  ['wifi', 'install', 'wifi', 'Професійний Wi-Fi / Mesh', "Безшовне покриття Enterprise-рівня без мертвих зон на всій території об'єкта.", 'install.html#networks'],
  ['gsm', 'install', 'radioTower', 'GSM/LTE-підсилення', "Підсилювачі мобільного сигналу для стабільного зв'язку всередині будівель.", 'install.html#networks'],
  ['fiber', 'install', 'waypoints', 'Оптичні лінії ВОЛЗ', "Будівництво волоконно-оптичних ліній зв'язку власними виїзними бригадами.", 'install.html#networks'],
  ['multimedia', 'install', 'presentation', 'Мультимедіа та конференц-системи', "Переговорні кімнати, відеостіни та системи конференц-зв'язку під ключ.", 'install.html#multimedia'],
  ['colocation', 'cloud', 'server', 'Колокація в ЦОД', 'Розміщення обладнання в нашому дата-центрі у Львові з резервним живленням і моніторингом 24/7.', 'cloud.html#kolokatsiia'],
  ['vps', 'cloud', 'cloud', 'VPS / VDS', 'Віртуальні сервери з гарантованими ресурсами та захистом від блекаутів.', 'cloud.html#vps'],
  ['server-rental', 'cloud', 'hardDrive', 'Оренда виділених серверів', 'Фізичні сервери в оренду під ваші задачі з обслуговуванням від АСТРА.', 'cloud.html#server'],
];
const servicesEn = enPages.poslugy.sections.flatMap((section) => section.items ?? []);
export const serviceCatalogFallback = servicesUk.map(([key, group, icon, title, body, href], index) => ({
  key, group, icon, order: index,
  title: l(title, servicesEn[index]?.title), body: l(body, servicesEn[index]?.body),
  label: l('Детальніше', 'Explore'), hrefUk: href, hrefEn: servicesEn[index]?.href,
}));

const servicesPageEn = enPages.poslugy;
export const servicesPageFallback = {
  title: 'Сторінка послуг', key: 'services',
  seo: { title: l('Усі послуги АСТРА для бізнесу: каталог', servicesPageEn.title), description: l('Повний каталог послуг АСТРА для бізнесу під одним договором: інтернет, мережі, безпека та хмара.', servicesPageEn.description), canonicalUk: 'https://astra.in.ua/b2b/poslugy.html', canonicalEn: 'https://astra.in.ua/b2b/en/poslugy.html' },
  hero: { title: l('Усі послуги АСТРА для бізнесу', servicesPageEn.hero.title), intro: l("Повний каталог зв'язку, мереж, безпеки та хмари під одним договором. Оберіть потрібну послугу або замовте консультацію, і підберемо комплект під ваш об'єкт і масштаб.", servicesPageEn.hero.intro), label: l('Послуги', servicesPageEn.hero.label), imagePath: 'img/dir-network.jpg', imageAlt: l('Каталог послуг АСТРА для бізнесу', 'ASTRA business service catalog'), ctaLabel: l('Замовити консультацію', 'Request a consultation') },
  sections: [
    { id: 'isp', heading: l('ASTRA ISP', servicesPageEn.sections[0].heading), lead: l('Інтернет і магістралі', servicesPageEn.sections[0].lead) },
    { id: 'install', heading: l('ASTRA INSTALL', servicesPageEn.sections[1].heading), lead: l('Безпека та мережі', servicesPageEn.sections[1].lead) },
    { id: 'cloud', heading: l('ASTRA CLOUD', servicesPageEn.sections[2].heading), lead: l('Хмара та ЦОД', servicesPageEn.sections[2].lead) },
  ],
  cta: { title: l('Не знаєте, з чого почати?', servicesPageEn.cta?.title), text: l("Залиште заявку, і наш менеджер підбере комплект послуг під ваш об'єкт і масштаб та підготує комерційну пропозицію.", servicesPageEn.cta?.text), label: l('Замовити консультацію', 'Request a consultation') },
};

const featuresUk = ['Виділена статична IP на вимогу', 'Симетричний резервований канал', 'Пріоритет: вирішення в день заявки', 'Ведення документації (угоди, рахунки, акти)', 'Додзвін до оператора перед чергою', 'Технічна підтримка 24/7', 'ASTRA TV'];
const prices = [['100', '500', ''], ['250', '1 000', ''], ['500', '2 000', ''], ['1 000', '3 500', ''], ['2 500', '5 000', 'мін. гарант. 1 GIGABIT'], ['10 000', '9 000', 'мін. гарант. 2.5 GIGABIT']];
export const tariffCatalogFallback = prices.map(([speed, price, guar], index) => ({
  plan: `Бізнес ${speed.replaceAll(' ', '')}`, planEn: englishPlans[index].title, speed, unit: 'Мбіт/с', unitEn: 'Mbps', guar,
  features: index ? [...featuresUk, 'Персональний акаунт-менеджер'] : featuresUk,
  featuresEn: englishPlans[index].features, price, per: 'грн/міс', perEn: 'UAH/mo', tag: `Бізнес ${speed.replaceAll(' ', '')}`, order: index,
}));

const pricingEn = enPages.taryfy;
const operatorUk = [
  { key: 'peering', title: 'Піринг публічний і приватний', body: 'Публічний та приватний обмін трафіком. Послуга доступна виключно юридичним особам та операторам.', href: 'operators.html#peering', label: 'Детальніше' },
  { key: 'europe', title: 'Прямі канали в Європу', body: 'Пряме підключення до європейських точок обміну трафіком з мінімальним пінгом.', href: 'operators.html#europe', label: 'Детальніше' },
  { key: 'fiber', title: 'ВОЛЗ під ключ', body: "Проєктування та будівництво волоконно-оптичних ліній зв'язку власними виїзними бригадами.", href: 'operators.html#volz', label: 'Детальніше' },
  { key: 'colocation', title: 'Колокація / оренда стійок', body: 'Розміщення обладнання в нашому ЦОД у Львові: резервне живлення, клімат-контроль, моніторинг 24/7.', href: 'operators.html#colocation', label: 'Детальніше' },
  { key: 'wholesale', title: 'Транзит / wholesale за індивідуальним розрахунком', body: 'Оптовий транзит трафіку та виділена ємність під потреби вашої мережі.', href: 'operators.html#wholesale', label: 'Детальніше' },
];
const pricingPlansEn = pricingEn.sections[0];
const pricingOperatorsEn = enSection('taryfy', 'operatory');
export const pricingPageFallback = {
  title: 'Сторінка тарифів', key: 'pricing',
  seo: { title: l('Тарифи для бізнесу · АСТРА', pricingEn.title), description: l('Усі бізнес-тарифи АСТРА: Бізнес 100–10000 із симетричною швидкістю, статичною IP та документообігом у кожному.', pricingEn.description), canonicalUk: 'https://astra.in.ua/b2b/taryfy.html', canonicalEn: 'https://astra.in.ua/b2b/en/taryfy.html' },
  hero: { title: l('Тарифи для бізнесу', pricingEn.hero.title), intro: l("Усі бізнес-тарифи АСТРА в одному місці. Симетрична швидкість, статична IP та документообіг входять у кожен тариф. Точний склад послуг під ваш об'єкт ми прорахуємо на консультації.", pricingEn.hero.intro), label: l('Тарифи', pricingEn.hero.label), imagePath: 'img/hero-biz.jpg', imageAlt: l('Тарифи АСТРА для бізнесу', 'ASTRA business plans'), ctaLabel: l('Замовити консультацію', 'Request a consultation') },
  sections: [
    { id: 'plans', heading: l('Бізнес-тарифи АСТРА', pricingPlansEn.heading), lead: l('Від Бізнес 100 для невеликого закладу до Бізнес 10000 для корпорації чи дата-центру. Швидкість і ціна ростуть, а базовий набір сервісів однаковий для всіх.', pricingPlansEn.lead), note: l('Персональний акаунт-менеджер доступний клієнтам з тарифу Бізнес 250 і вище. Тарифи Бізнес 2500 та Бізнес 10000 потребують оптичного перетворювача XG/XGS-PON, який купується окремо.', pricingPlansEn.footnote) },
    { id: 'operatory', heading: l('Оператори', pricingOperatorsEn?.heading), lead: l('Окремий сценарій для ISP, telecom та дата-центр-клієнтів: послуги, яких немає в інших категоріях. Тарифи формуються за індивідуальним розрахунком.', pricingOperatorsEn?.lead), note: l('Умови для операторів залежать від ємності, маршрутів і термінів.', pricingOperatorsEn?.note), label: l('Для операторів', pricingOperatorsEn?.noteLink?.label), href: 'operators.html', items: pairItems(operatorUk, pricingOperatorsEn?.items) },
  ],
  cta: { title: l("Не впевнені, який тариф підійде вашому об'єкту?", pricingEn.cta?.title), text: l('Залиште заявку, і наш менеджер підбере швидкість і набір сервісів під ваш масштаб і підготує комерційну пропозицію.', pricingEn.cta?.text), label: l('Замовити консультацію', 'Request a consultation') },
};

const contactsEn = enPages.kontakty;
const contactsSectionEn = enSection('kontakty', 'contacts');
export const contactPageFallback = {
  title: 'Сторінка контактів', key: 'contacts',
  seo: { title: l('Контакти для бізнесу · АСТРА', contactsEn.title), description: l('Контакти АСТРА для бізнесу: цілодобова підтримка, Telegram, Viber, бухгалтерія для юридичних осіб і форма консультації.', contactsEn.description), canonicalUk: 'https://astra.in.ua/b2b/kontakty.html', canonicalEn: 'https://astra.in.ua/b2b/en/kontakty.html' },
  hero: { title: l('Контакти для бізнесу', contactsEn.hero.title), intro: l("Цілодобова технічна підтримка, месенджери та окрема бухгалтерія для юридичних осіб. Залиште заявку. Наш менеджер зв'яжеться з вами і підбере рішення під ваш об'єкт.", contactsEn.hero.intro), label: l('Контакти', contactsEn.hero.label), imagePath: 'img/contacts-banner.jpg', imageAlt: l('Команда підтримки АСТРА у центрі обслуговування', 'ASTRA support team'), ctaLabel: l('Замовити консультацію', 'Request a consultation') },
  sections: [
    { id: 'contacts', heading: l("Як з нами зв'язатися", contactsSectionEn?.heading), lead: l('Технічні питання: цілодобово телефоном чи в месенджерах. Документи та оплати для юросіб веде бухгалтерія.', contactsSectionEn?.lead), items: pairItems([
      { key: 'support', title: 'Цілодобова підтримка', body: "Технічна лінія на зв'язку 24/7. Дзвінок на 0 800 безкоштовний." },
      { key: 'messengers', title: 'Онлайн у месенджерах', body: 'Напишіть нам, відповідаємо цілодобово.', result: 'Потрібен дзвінок? Залиште номер у формі нижче, і менеджер передзвонить.' },
      { key: 'accounting', title: 'Бухгалтерія для юросіб', body: 'Договори, акти та оплати для юридичних осіб, ТзОВ «АСТРА-ЛЬВІВ».' },
    ], contactsSectionEn?.items) },
    { id: 'consult', heading: l('Замовити консультацію', enSection('kontakty', 'consult')?.heading), lead: l("Залиште контакти й короткий опис задачі, і наш менеджер зв'яжеться з вами, підбере рішення під ваш масштаб і підготує комерційну пропозицію.", enSection('kontakty', 'consult')?.lead), label: l('Або напишіть у месенджери', 'Or message us') },
  ],
  cta: { title: l("Обговорімо інфраструктуру вашого об'єкта", contactsEn.cta?.title), text: l('Залиште заявку, і персональний менеджер підбере рішення під ваш масштаб і підготує комерційну пропозицію.', contactsEn.cta?.text), label: l('Замовити консультацію', 'Request a consultation') },
};

export const siteSettingsFallback = {
  supportPhoneDisplay: '0 800 20-38-38', supportPhoneHref: 'tel:+380800203838',
  supportPhones: [
    { label: l('(097) 418-3838', '(097) 418-3838'), href: 'tel:+380974183838', kind: 'phone' },
    { label: l('(095) 418-3838', '(095) 418-3838'), href: 'tel:+380954183838', kind: 'phone' },
    { label: l('(032) 232-8808', '(032) 232-8808'), href: 'tel:+380322328808', kind: 'phone' },
  ],
  telegramUrl: 'https://t.me/astraispbot', viberUrl: 'viber://chat?number=%2B380800203838',
  accountingAddress: l('м. Львів, вул. Литвиненка, 3', '3 Lytvynenka St, Lviv'),
  accountingPhones: [
    { label: l('(032) 232-8802', '(032) 232-8802'), href: 'tel:+380322328802', kind: 'phone' },
    { label: l('(093) 289-9815', '(093) 289-9815'), href: 'tel:+380932899815', kind: 'phone' },
  ],
  accountingTelegramUrl: 'https://t.me/bukh_astra', accountingViberUrl: 'viber://chat?number=%2B380932899815', email: 'info@astra.in.ua',
};

export const managedPageFallbacks = {
  home: homePageFallback,
  services: servicesPageFallback,
  pricing: pricingPageFallback,
  contacts: contactPageFallback,
};

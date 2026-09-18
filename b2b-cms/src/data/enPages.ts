export type ContentItem = { title: string; body: string; href?: string; id?: string; image?: string; features?: string[]; links?: { label: string; href: string }[] };
export type ContentSection = {
  kind: 'cards' | 'plans' | 'people' | 'gallery' | 'stats' | 'partners' | 'contact' | 'blog';
  id?: string;
  tone?: 'tint' | 'navy';
  heading: string;
  lead?: string;
  footnote?: string;
  items?: ContentItem[];
};
export type EnglishPage = {
  title: string;
  description: string;
  source: string;
  hero: { image: string; title: string; intro: string; label?: string };
  sections: ContentSection[];
  cta: { title: string; text: string };
};

const planFeatures = [
  'Static IP address on request', 'Symmetric redundant connection', 'Same-day priority response',
  'Contracts, invoices and service documents', 'Priority phone queue', '24/7 technical support', 'ASTRA TV',
];
const accountManager = [...planFeatures, 'Dedicated account manager'];
export const plans: ContentItem[] = [
  { title: 'Business 100', body: '100 Mbps · UAH 500/month', features: planFeatures },
  { title: 'Business 250', body: '250 Mbps · UAH 1,000/month', features: accountManager },
  { title: 'Business 500', body: '500 Mbps · UAH 2,000/month', features: accountManager },
  { title: 'Business 1000', body: '1,000 Mbps · UAH 3,500/month', features: accountManager },
  { title: 'Business 2500', body: '2,500 Mbps · UAH 5,000/month · minimum guaranteed 1 Gbps', features: accountManager },
  { title: 'Business 10000', body: '10,000 Mbps · UAH 9,000/month · minimum guaranteed 2.5 Gbps', features: accountManager },
];
const serviceCards: ContentItem[] = [
  { title: 'Business internet', body: 'Symmetric fiber connectivity with a static IP address and speeds up to 10 Gbps.', href: 'isp.html#xgspon' },
  { title: 'Redundant backbone', body: 'Independent routes and automatic failover for business continuity.', href: 'isp.html#stability' },
  { title: 'Direct European routes', body: 'Direct connections to European traffic-exchange points.', href: 'isp.html#europe' },
  { title: 'Public and private peering', body: 'Traffic exchange for ISPs and telecom operators.', href: 'operators.html#peering' },
  { title: 'Video surveillance', body: 'Camera systems, remote access and video analytics.', href: 'install.html#videonagliad' },
  { title: 'Access control and intercoms', body: 'Entry management for staff, visitors, offices and residential complexes.', href: 'install.html#access' },
  { title: 'Structured cabling', body: 'Design and installation of reliable on-site networks.', href: 'install.html#networks' },
  { title: 'Enterprise Wi-Fi / Mesh', body: 'Seamless coverage across offices, hospitality venues and large sites.', href: 'install.html#networks' },
  { title: 'Fiber-optic lines', body: 'Underground and aerial fiber built by our own field teams.', href: 'install.html#networks' },
  { title: 'Multimedia and conferencing', body: 'Meeting rooms, video walls, sound and conferencing systems.', href: 'install.html#multimedia' },
  { title: 'Colocation', body: 'Space for your equipment in our Lviv data center, from 1U to full racks.', href: 'cloud.html#kolokatsiia' },
  { title: 'VPS / VDS', body: 'Virtual servers with scalable resources and blackout protection.', href: 'cloud.html#vps' },
  { title: 'Dedicated servers', body: 'Physical server rental without upfront hardware investment.', href: 'cloud.html#server' },
];
const directions: ContentItem[] = [
  { title: 'ASTRA ISP', body: 'Power-resilient internet and corporate networks on our own fiber backbone.', href: 'isp.html' },
  { title: 'ASTRA INSTALL', body: 'Design, installation and maintenance of security, access, network and multimedia systems.', href: 'install.html' },
  { title: 'ASTRA CLOUD', body: 'Colocation, virtual servers and dedicated infrastructure in our Lviv data center.', href: 'cloud.html' },
];

export const enPages: Record<string, EnglishPage> = {
  index: {
    title: 'ASTRA for Business: connectivity, security and cloud infrastructure',
    description: 'Business internet, networks, security systems and cloud infrastructure from ASTRA in Lviv. One partner, one contract, 24/7 support.',
    source: 'Home',
    hero: { image: 'img/hero-biz.jpg', title: 'Digital infrastructure for business and modern property', intro: 'We have built and maintained connectivity and security infrastructure since 2004. Internet, networks, video surveillance, access control and cloud services under one contract.' },
    sections: [
      { kind: 'cards', tone: 'tint', id: 'segments-size', heading: 'Solutions for every scale', lead: 'The essential services are consistent across our plans. We tailor additional infrastructure to your sites and goals.', items: [
        { title: 'Small business', body: 'For cafés, shops, salons and small offices. Reliable internet, guest Wi-Fi and essential security.', href: 'maliy.html' },
        { title: 'Medium business', body: 'For multi-site teams, warehouses, hotels and offices. One secure network and a dedicated account manager.', href: 'seredniy.html' },
        { title: 'Large business', body: 'For corporations, residential developments and industrial sites. Dedicated fiber, monitoring and integrated security.', href: 'velykyi.html' },
        { title: 'Operators', body: 'Peering, direct European routes, fiber construction, colocation and wholesale capacity.', href: 'operators.html' },
      ] },
      { kind: 'cards', id: 'directions', heading: 'One connected portfolio', lead: 'Three specialist teams cover every layer of your infrastructure, from the connection to on-site cameras and servers.', items: directions },
      { kind: 'cards', tone: 'tint', heading: 'Solve everyday infrastructure problems', items: [
        { title: 'Too many suppliers', body: 'One accountable partner, one invoice and one contact for all services.' },
        { title: 'Unstable connectivity', body: 'Redundant routes help keep payments, CRM and video calls working.' },
        { title: 'Patchy Wi-Fi', body: 'Seamless coverage across your entire site.' },
        { title: 'Complex administration', body: 'Clear documentation and one point of contact for technical issues.' },
      ] },
      { kind: 'cards', heading: 'Solutions for your property', items: [
        { title: 'Offices and business centers', body: 'Scalable connections, seamless Wi-Fi and secure corporate networks.' },
        { title: 'Residential complexes', body: 'Connectivity, access control and coordinated security systems.' },
        { title: 'Restaurants and retail chains', body: 'Connected locations, guest Wi-Fi and consistent access policies.' },
        { title: 'Warehouses and production', body: 'Coverage for connected devices, scanners, terminals and cameras.' },
        { title: 'Hotels and coworking spaces', body: 'Managed guest access and dependable network performance.' },
      ] },
      { kind: 'cards', tone: 'navy', heading: 'A partnership that lets you focus on your business', items: [
        { title: 'Personal service', body: 'A dedicated manager understands your sites and coordinates our technical teams.' },
        { title: 'One contract', body: 'Offices, shops and warehouses can be served through one clear commercial relationship.' },
        { title: 'End-to-end responsibility', body: 'We can audit and support the complete infrastructure, from backbone to on-site equipment.' },
      ] },
      { kind: 'partners', tone: 'tint', id: 'partners', heading: 'Trusted across Lviv', lead: 'More than 50 residential associations and dozens of commercial sites rely on our engineering teams.' },
      { kind: 'blog', tone: 'navy', id: 'blog', heading: 'Insights from ASTRA' },
    ],
    cta: { title: 'Let’s discuss your site', text: 'Tell us what you need. Our manager will recommend a solution and prepare a proposal for your business.' },
  },
  maliy: {
    title: 'Internet and security for small business | ASTRA', description: 'Reliable business internet and essential security for cafés, shops, salons and small offices. Business 100 from UAH 500/month.', source: 'Small business',
    hero: { image: 'img/dir-internet.jpg', label: 'Small business', title: 'Internet and security for small business', intro: 'For cafés, shops, salons and small offices: dependable symmetric connectivity, a static IP address and 24/7 support under one contract.' },
    sections: [
      { kind: 'plans', id: 'taryfy', heading: 'Small business plan', lead: 'One straightforward plan with the essential services a small team needs.', items: plans.slice(0, 1) },
      { kind: 'cards', tone: 'tint', id: 'details', heading: 'What matters', items: [
        { title: 'Unlimited traffic', body: 'A fixed monthly price, regardless of data volume.' },
        { title: 'Room to grow', body: 'Move to a faster plan as your business expands.' },
        { title: 'One infrastructure partner', body: 'Internet, Wi-Fi, cameras and entry systems with one point of support.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'services', heading: 'Useful additions', items: [
        { title: 'Guest Wi-Fi', body: 'A separate visitor network that does not expose your business systems.', href: 'install.html#networks' },
        { title: 'Video surveillance', body: 'Cameras with recording and remote access.', href: 'install.html#videonagliad' },
        { title: 'IP intercom', body: 'Control staff entrances and answer calls from a phone.', href: 'install.html#access' },
        { title: 'All services', body: 'Explore the full ASTRA portfolio.', href: 'poslugy.html' },
      ] },
      { kind: 'contact', tone: 'navy', id: 'contact', heading: 'Request a consultation', lead: 'We will help choose the right setup for your venue and prepare a proposal.' },
    ],
    cta: { title: 'Start with a dependable connection', text: 'Tell us about your venue and we will recommend a practical package.' },
  },
  seredniy: {
    title: 'Infrastructure for medium business | ASTRA', description: 'Connectivity, security and a dedicated account manager for multi-site teams, warehouses, hotels and offices.', source: 'Medium business',
    hero: { image: 'img/dir-network.jpg', label: 'Medium business', title: 'Infrastructure for growing and multi-site businesses', intro: 'Bring offices, stores, warehouses and hotels into one secure network. Add resilient connectivity, on-site security and a dedicated account manager.' },
    sections: [
      { kind: 'plans', id: 'taryfy', heading: 'Plans for medium businesses', lead: 'Symmetric redundant internet with a static IP address on request and a personal account manager.', items: plans.slice(1, 3) },
      { kind: 'people', tone: 'tint', id: 'manager', heading: 'Your account managers', lead: 'A direct contact for contracts, invoices and technical coordination, alongside 24/7 support.', items: [
        { title: 'Hryhorii', body: 'Dedicated account manager', image: 'img/manager_hryhorii.png' },
        { title: 'Andrii', body: 'Dedicated account manager', image: 'img/manager_andrii.png' },
        { title: 'Borys', body: 'Dedicated account manager', image: 'img/manager_borys.png' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'details', heading: 'Built for several locations', items: [
        { title: 'One isolated network', body: 'Connect branches under consistent access policies without exposing internal traffic to the public internet.' },
        { title: 'Priority service', body: 'Your account manager coordinates responses and documentation across locations.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'services', heading: 'Add the services you need', items: [
        { title: 'Structured cabling & Wi-Fi', body: 'Reliable wired infrastructure and seamless wireless coverage.', href: 'install.html#networks' },
        { title: 'Video surveillance', body: 'Analytics, remote viewing and perimeter control.', href: 'install.html#videonagliad' },
        { title: 'Access control', body: 'Centralized rules for staff and visitors.', href: 'install.html#access' },
        { title: 'VPS / VDS', body: 'Virtual servers for internal business services.', href: 'cloud.html#vps' },
      ] },
      { kind: 'contact', tone: 'navy', id: 'contact', heading: 'Request a consultation', lead: 'We will review your locations and prepare a tailored proposal.' },
    ],
    cta: { title: 'Connect every location with confidence', text: 'We will help map the network, security and service package your team needs.' },
  },
  velykyi: {
    title: 'Enterprise infrastructure for large business | ASTRA', description: 'Dedicated fiber, redundant routes, security, cloud and 24/7 network monitoring for corporations, residential complexes and industrial sites.', source: 'Large business',
    hero: { image: 'img/dir-security.jpg', label: 'Large business', title: 'Integrated infrastructure for complex sites', intro: 'For corporations, developers, residential complexes, industrial facilities and shopping centers: connectivity, security and cloud services with one accountable partner.' },
    sections: [
      { kind: 'plans', id: 'taryfy', heading: 'Enterprise connectivity plans', lead: 'High-capacity symmetric connections with redundant routes and a dedicated account manager.', items: plans.slice(3) },
      { kind: 'people', tone: 'tint', id: 'manager', heading: 'Your account managers', lead: 'A direct contact for project planning, documents and technical coordination.', items: [
        { title: 'Nataliia', body: 'Dedicated account manager', image: 'img/manager_natalia.png' },
        { title: 'Taras', body: 'Dedicated account manager', image: 'img/manager_taras.png' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'details', heading: 'Designed for business continuity', items: [
        { title: 'Dedicated fiber', body: 'Multiple independent entries and automatic failover.' },
        { title: '24/7 network monitoring', body: 'Proactive monitoring and incident response from our network operations team.' },
        { title: 'High-capacity equipment', body: 'Business 2500 and 10000 require a separately purchased XG/XGS-PON optical converter.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'services', heading: 'A complete infrastructure portfolio', items: [
        { title: 'Redundant backbone', body: 'Independent optical routes for critical services.', href: 'isp.html#stability' },
        { title: 'Integrated security', body: 'Cameras, access control, barriers and alarm systems.', href: 'install.html#videonagliad' },
        { title: 'Data center colocation', body: 'Host your servers in our Lviv data center.', href: 'cloud.html#kolokatsiia' },
        { title: 'Multimedia and conferencing', body: 'Meeting spaces, displays and sound systems.', href: 'install.html#multimedia' },
        { title: 'Fiber construction', body: 'Underground and aerial fiber routes built by our teams.', href: 'install.html#networks' },
      ] },
      { kind: 'contact', tone: 'navy', id: 'contact', heading: 'Request a consultation', lead: 'Describe your site and our team will prepare a tailored infrastructure proposal.' },
    ],
    cta: { title: 'Plan the whole system', text: 'We can assess your site and coordinate connectivity, security and cloud services together.' },
  },
  isp: {
    title: 'ASTRA ISP: resilient business internet and fiber networks', description: 'Power-resilient internet on ASTRA’s own fiber backbone, XGS-PON up to 10 Gbps, redundant routes and 24/7 monitoring.', source: 'ASTRA ISP',
    hero: { image: 'img/dir-network.jpg', label: 'ASTRA ISP', title: 'Resilient internet and fiber networks', intro: 'Business connectivity on our own fiber backbone in Lviv: XGS-PON up to 10 Gbps, independent backup routes and direct connections to Europe.' },
    sections: [
      { kind: 'cards', id: 'xgspon', heading: 'Technology, stability and speed', lead: 'New-generation passive fiber with multiple independent routes and direct access to European traffic-exchange points.', items: [
        { title: 'XGS-PON, up to 10 Gbps', body: 'Symmetric, high-capacity connectivity on modern passive fiber.' },
        { title: 'Redundant routes', body: 'Independent optical links and automatic failover.', id: 'stability' },
        { title: 'Direct routes to Europe', body: 'Lower latency for cloud services and cross-border traffic.', id: 'europe' },
      ] },
      { kind: 'cards', tone: 'navy', id: 'network', heading: 'Our network, under our control', items: [
        { title: 'Own backbone', body: 'Our fiber routes, nodes and field teams in Lviv.' },
        { title: '24/7 monitoring', body: 'Continuous network supervision and proactive response.' },
        { title: 'Personal support', body: 'A dedicated manager and 24/7 technical assistance.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'operators', heading: 'Are you a network operator?', lead: 'We also offer peering, European routes, fiber construction and colocation for ISP and telecom companies.', items: [
        { title: 'Operator solutions', body: 'Explore wholesale connectivity and data center options.', href: 'operators.html#peering' },
      ] },
    ],
    cta: { title: 'Find the right connection for your site', text: 'We will review bandwidth, redundancy and the service requirements of your business.' },
  },
  install: {
    title: 'ASTRA INSTALL: security systems and networks', description: 'Video surveillance, access control, structured cabling, Wi-Fi, fiber and multimedia systems for business properties.', source: 'ASTRA INSTALL',
    hero: { image: 'img/dir-security.jpg', label: 'ASTRA INSTALL', title: 'Security systems and network solutions', intro: 'Design, installation and maintenance of surveillance, access control, networks and multimedia, from a single office camera to a complete industrial or residential site.' },
    sections: [
      { kind: 'cards', id: 'videonagliad', heading: 'Video surveillance and analytics', lead: 'Remote monitoring and recording systems designed around your site.', items: [
        { title: 'Planning and installation', body: 'Solutions for offices, stores, industrial zones and large properties.' },
        { title: 'Remote viewing', body: 'Live cameras and recordings available from a phone or computer.' },
        { title: 'Smart analytics', body: 'People and vehicle detection, perimeter monitoring and event analysis.' },
        { title: 'System upgrades', body: 'Modernize existing cameras and recorders where possible.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'access', heading: 'Access control and security', items: [
        { title: 'IP intercoms and access control', body: 'Mobile access, staff attendance and RFID/NFC/BLE credentials.' },
        { title: 'Smart vehicle entry', body: 'Barriers and gates with plate recognition and passage records.' },
        { title: 'Intrusion alarms', body: 'Ajax wireless alarm installation and integration.' },
      ] },
      { kind: 'cards', id: 'networks', heading: 'Networks and communications lines', items: [
        { title: 'Structured cabling', body: 'Site-specific design and installation of reliable wired networks.' },
        { title: 'Professional Wi-Fi', body: 'Seamless coverage for large numbers of devices.' },
        { title: 'Mobile signal improvement', body: 'GSM/LTE repeaters for low-signal indoor areas.' },
        { title: 'Fiber-optic lines', body: 'Underground and aerial routes installed by our own teams.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'multimedia', heading: 'Multimedia and conferencing', items: [
        { title: 'Sound and announcements', body: 'Background audio and voice-notification systems.' },
        { title: 'Meeting rooms', body: 'Displays, projectors and video-conferencing equipment.' },
        { title: 'Visual systems', body: 'Panels, video walls and signage.' },
        { title: 'Ongoing support', body: 'Configuration, staff training and maintenance.' },
      ] },
      { kind: 'partners', tone: 'navy', id: 'brands', heading: 'Equipment brands', lead: 'We work with established security and access-control equipment vendors.' },
    ],
    cta: { title: 'Design a system for your site', text: 'Our team will review your requirements and prepare a security and network proposal.' },
  },
  cloud: {
    title: 'ASTRA CLOUD: colocation, VPS and dedicated servers', description: 'Host equipment and applications in ASTRA’s Lviv data center with backup power, climate control and 24/7 monitoring.', source: 'ASTRA CLOUD',
    hero: { image: 'img/dir-cloud.jpg', label: 'ASTRA CLOUD', title: 'Server hosting and cloud built for continuity', intro: 'Our Lviv data center provides colocation, VPS/VDS and dedicated server rental with backup power, climate control and around-the-clock monitoring.' },
    sections: [
      { kind: 'cards', heading: 'Cloud infrastructure on our own premises', lead: 'Host your equipment or deploy services in our data center, from one rack unit to full racks.', items: [
        { title: 'Colocation', body: 'Space for your equipment, connectivity and public IP addresses.', id: 'kolokatsiia' },
        { title: 'Backup power', body: 'Resilient power, climate control and continuous monitoring.' },
        { title: 'VPS / VDS', body: 'Virtual infrastructure that can scale with your workloads.', id: 'vps' },
        { title: 'Dedicated servers', body: 'Physical servers without the upfront hardware purchase.', id: 'server' },
      ] },
      { kind: 'cards', tone: 'tint', heading: 'A data center in Lviv', lead: 'Our own engineers manage the facilities. Connectivity can be tailored to your needs, from 100 Mbps up to 10 Gbps per customer.', items: [
        { title: 'Direct access', body: 'Coordinate access to your equipment with our engineering team.' },
        { title: 'Local expertise', body: 'One team is responsible for both the network and the hosting environment.' },
      ] },
    ],
    cta: { title: 'Find a home for your infrastructure', text: 'We will help compare colocation, VPS and dedicated server options for your workload.' },
  },
  operators: {
    title: 'Wholesale connectivity for operators | ASTRA', description: 'Public and private peering, direct routes to Europe, fiber construction, colocation and wholesale capacity for operators.', source: 'Operators',
    hero: { image: 'img/dir-network.jpg', label: 'Operators', title: 'Connectivity solutions for network operators', intro: 'Wholesale partnerships for ISPs and telecom companies: peering, European routes, fiber construction and capacity on our own Lviv backbone. Available to legal entities and operators.' },
    sections: [
      { kind: 'cards', id: 'peering', heading: 'Peering', lead: 'Direct traffic exchange can reduce latency, improve stability and lower transit costs. Commercial terms are quoted individually.', items: [
        { title: 'Public peering', body: 'Exchange traffic through shared internet-exchange platforms.' },
        { title: 'Private peering', body: 'Direct links between two networks for high-volume traffic.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'europe', heading: 'Direct routes to Europe', items: [
        { title: 'European exchanges', body: 'Direct access to European traffic-exchange points.' },
        { title: 'Predictable latency', body: 'Routes designed for stable service quality.' },
        { title: 'Redundancy', body: 'Independent directions and automatic failover.' },
      ] },
      { kind: 'cards', id: 'volz', heading: 'Turnkey fiber construction', items: [
        { title: 'Underground routes', body: 'Protected fiber paths through ducts and ground.' },
        { title: 'Aerial routes', body: 'Rapid connections using existing support infrastructure.' },
        { title: 'Own field teams', body: 'Installation, splicing and maintenance by ASTRA engineers.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'colocation', heading: 'Colocation and rack rental', lead: 'Host equipment in our Lviv data center with backup power, cooling and monitoring.', items: [
        { title: 'Flexible space', body: 'Individual rack units or full racks, based on your network requirements.' },
      ] },
      { kind: 'cards', id: 'wholesale', heading: 'Transit and wholesale capacity', items: [
        { title: 'IP transit', body: 'Wholesale access to global resources.' },
        { title: 'Dedicated capacity', body: 'Bandwidth tailored to your network.' },
        { title: 'Redundant channels', body: 'Independent routes for customer continuity.' },
      ] },
    ],
    cta: { title: 'Request a wholesale proposal', text: 'Tell us the routes, capacity and timelines you need. We will prepare an individual quote.' },
  },
  poslugy: {
    title: 'All ASTRA services for business', description: 'A complete portfolio of business internet, networks, security and cloud services under one contract.', source: 'All services',
    hero: { image: 'img/dir-network.jpg', label: 'Services', title: 'All ASTRA services for business', intro: 'Explore connectivity, networks, security and cloud services under one contract. Choose a service or ask us to put together a package for your site.' },
    sections: [
      { kind: 'cards', heading: 'ASTRA ISP · Internet and backbone', items: serviceCards.slice(0, 4) },
      { kind: 'cards', tone: 'tint', heading: 'ASTRA INSTALL · Security and networks', items: serviceCards.slice(4, 10) },
      { kind: 'cards', heading: 'ASTRA CLOUD · Hosting and data center', items: serviceCards.slice(10) },
    ],
    cta: { title: 'Not sure where to start?', text: 'Describe your site and we will recommend a practical mix of services.' },
  },
  taryfy: {
    title: 'Business internet plans | ASTRA', description: 'Explore ASTRA Business 100–10000 plans with symmetric connectivity, optional static IP and 24/7 technical support.', source: 'Plans',
    hero: { image: 'img/hero-biz.jpg', label: 'Plans', title: 'Business internet plans', intro: 'Compare ASTRA business plans in one place. We will confirm availability and the exact service package for your site during a consultation.' },
    sections: [
      { kind: 'plans', heading: 'ASTRA business plans', lead: 'From Business 100 for a small venue to Business 10000 for high-capacity sites. Speed and price change; core services remain consistent.', footnote: 'A dedicated account manager is available with Business 250 and above. Business 2500 and 10000 require an XG/XGS-PON optical converter purchased separately.', items: plans },
      { kind: 'cards', tone: 'tint', id: 'operatory', heading: 'For network operators', lead: 'Peering, direct routes, fiber construction, colocation and transit are quoted individually.', items: [
        { title: 'Peering', body: 'Public and private traffic exchange.', href: 'operators.html#peering' },
        { title: 'European routes', body: 'Direct connections to European exchanges.', href: 'operators.html#europe' },
        { title: 'Fiber construction', body: 'Turnkey underground and aerial lines.', href: 'operators.html#volz' },
        { title: 'Colocation', body: 'Rack space in our Lviv data center.', href: 'operators.html#colocation' },
      ] },
    ],
    cta: { title: 'Which plan fits your site?', text: 'We will estimate the right speed, redundancy and additional services.' },
  },
  pro: {
    title: 'About ASTRA: digital infrastructure for business', description: 'ASTRA has built connectivity and security infrastructure in Lviv since 2004, with its own fiber network and data center.', source: 'About us',
    hero: { image: 'img/about-city.jpg', label: 'About us', title: 'A constellation of digital services for business', intro: 'Since 2004, we have built and maintained connectivity and security infrastructure: our own fiber network, on-site security and cloud services under one contract.' },
    sections: [
      { kind: 'cards', heading: 'More than 20 years building Lviv’s digital infrastructure', lead: 'ASTRA-LVIV has grown from an internet provider into a full-service infrastructure partner. Our teams manage the connection from the backbone to your premises.', items: [
        { title: 'ASTRA ISP', body: 'Business connectivity and corporate networks.', href: 'isp.html' },
        { title: 'ASTRA INSTALL', body: 'Security systems, surveillance and access control.', href: 'install.html' },
        { title: 'ASTRA CLOUD', body: 'Colocation, cloud and server hosting.', href: 'cloud.html' },
      ] },
      { kind: 'stats', tone: 'tint', heading: 'ASTRA in numbers', items: [
        { title: '20+', body: 'years of experience' }, { title: '45,000+', body: 'active subscribers' },
        { title: '50+', body: 'residential associations served' }, { title: '1', body: 'own data center in Lviv' }, { title: '24/7', body: 'support and monitoring' },
      ] },
      { kind: 'cards', tone: 'navy', heading: 'Why businesses choose ASTRA', items: [
        { title: 'Personal service', body: 'A dedicated contact who knows your sites and coordinates technical teams.' },
        { title: 'Clear costs', body: 'Several locations under one contract and one invoice.' },
        { title: 'Complete responsibility', body: 'We can assess and support the entire infrastructure, from link to equipment.' },
      ] },
      { kind: 'gallery', tone: 'tint', id: 'team', heading: 'Our engineering team', lead: 'Our own engineers and field crews design, build and maintain the infrastructure.', items: [
        { title: 'The ASTRA team', body: 'Our people', image: 'img/team-group.jpg' },
        { title: 'Data center engineers', body: 'On-site expertise', image: 'img/team-datacenter.jpg' },
        { title: 'Field crew', body: 'Installation and maintenance', image: 'img/team-flag.jpg' },
      ] },
      { kind: 'partners', id: 'partners', heading: 'Trusted by local organizations', lead: 'Residential developments, retail and hospitality groups, logistics companies, cultural and educational institutions.' },
    ],
    cta: { title: 'Let’s discuss your infrastructure', text: 'Tell us about your site. We will recommend a solution tailored to your operations.' },
  },
  kontakty: {
    title: 'Business contacts | ASTRA', description: 'Contact ASTRA for 24/7 technical support, Telegram or Viber messages, business accounting and consultation requests.', source: 'Contacts',
    hero: { image: 'img/contacts-banner.jpg', label: 'Contacts', title: 'Business contacts', intro: 'Technical support around the clock, convenient messaging and a dedicated accounting team for legal entities. Get in touch and we will help with your site.' },
    sections: [
      { kind: 'cards', tone: 'tint', id: 'contacts', heading: 'Get in touch', items: [
        { title: '24/7 technical support', body: 'Our technical line is available around the clock. The 0 800 number is toll-free in Ukraine.', links: [
          { label: '0 800 20-38-38', href: 'tel:+380800203838' }, { label: '+380 97 418-38-38', href: 'tel:+380974183838' },
          { label: '+380 95 418-38-38', href: 'tel:+380954183838' }, { label: '+380 32 232-88-08', href: 'tel:+380322328808' },
        ] },
        { title: 'Message us', body: 'We reply around the clock. If you need a call, leave your number in the form below.', links: [
          { label: 'Telegram', href: 'https://t.me/astraispbot' }, { label: 'Viber', href: 'viber://chat?number=%2B380800203838' },
        ] },
        { title: 'Accounting for business clients', body: 'Contracts, documents and payments for legal entities. 3 Lytvynenka St, Lviv.', links: [
          { label: '+380 32 232-88-02', href: 'tel:+380322328802' }, { label: '+380 93 289-98-15', href: 'tel:+380932899815' },
          { label: 'Telegram @bukh_astra', href: 'https://t.me/bukh_astra' }, { label: 'info@astra.in.ua', href: 'mailto:info@astra.in.ua' },
        ] },
      ] },
      { kind: 'contact', tone: 'navy', id: 'consult', heading: 'Request a consultation', lead: 'Leave your details and a short description of your project. We will get back to you with a tailored proposal.' },
    ],
    cta: { title: 'Let’s plan your next step', text: 'Our team is ready to discuss connectivity, security and cloud solutions for your business.' },
  },
};

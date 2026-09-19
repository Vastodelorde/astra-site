import type { ServiceIconName } from '../components/ServiceIcon.astro';

export type ContentItem = {
  title: string;
  body: string;
  href?: string;
  id?: string;
  image?: string;
  features?: string[];
  links?: { label: string; href: string }[];
  note?: string;
  noteAfterLinks?: number;
  icon?: ServiceIconName;
};

export type ContentSection = {
  kind: 'copy' | 'cards' | 'plans' | 'people' | 'gallery' | 'stats' | 'partners' | 'contact' | 'blog';
  id?: string;
  tone?: 'tint' | 'navy';
  heading: string;
  lead?: string;
  note?: string;
  noteLink?: { label: string; href: string };
  paragraphs?: string[];
  footnote?: string;
  items?: ContentItem[];
};

export type EnglishPage = {
  title: string;
  description: string;
  source: string;
  hero: { image: string; title: string; intro: string; label?: string; parentLabel?: string; parentHref?: string };
  sections: ContentSection[];
  cta?: { title: string; text: string; label?: string };
};

const planFeatures = [
  'Dedicated static IP address on request',
  'Symmetric redundant connection',
  'Priority: resolution on the day of the request',
  'Document management (contracts, invoices and completion certificates)',
  'Calls answered ahead of the general queue',
  '24/7 technical support',
  'ASTRA TV',
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

const directions: ContentItem[] = [
  { title: 'ASTRA ISP', body: 'Power-resilient internet and corporate networks built on our own fiber-optic backbone.', href: 'isp.html' },
  { title: 'ASTRA INSTALL', body: 'Design and installation of security systems, video surveillance, access control, networks and multimedia.', href: 'install.html' },
  { title: 'ASTRA CLOUD', body: 'Cloud infrastructure, server hosting (colocation) and VPS/VDS protected against blackouts.', href: 'cloud.html' },
];

const serviceCards: ContentItem[] = [
  { title: 'Symmetric business internet', body: 'A dedicated symmetric connection with a static IP address and speeds up to 10 Gbps using XGS-PON technology.', href: 'isp.html#xgspon', icon: 'gauge' },
  { title: 'Redundant backbone routes', body: 'Duplicate independent routes and a power-resilient network that keeps your business online.', href: 'isp.html#stability', icon: 'route' },
  { title: 'Direct routes to Europe', body: 'Direct connections to European traffic exchange points with minimal latency.', href: 'isp.html#europe', icon: 'globe' },
  { title: 'Peering for operators', body: 'Public and private traffic exchange for ISP and telecom operators.', href: 'operators.html#peering', icon: 'network' },
  { title: 'Video surveillance with analytics', body: 'IP cameras with video analytics, event detection and reliable archive storage.', href: 'install.html#videonagliad', icon: 'cctv' },
  { title: 'Access control and ACS', body: 'Access control and management systems for employees and visitors.', href: 'install.html#access', icon: 'fingerprint' },
  { title: 'IP intercoms', body: 'Multi-subscriber IP intercoms with video calls for offices, residential complexes and commercial properties.', href: 'install.html#access', icon: 'door' },
  { title: 'Smart entrances and barriers', body: 'Automatic barriers and gates with vehicle license plate recognition.', href: 'install.html#access', icon: 'car' },
  { title: 'Ajax security systems', body: 'Ajax wireless security alarms with sensors and instant notifications.', href: 'install.html#access', icon: 'shield' },
  { title: 'Structured cabling systems', body: 'Turnkey design and installation of structured cabling systems.', href: 'install.html#networks', icon: 'cable' },
  { title: 'Professional Wi-Fi / Mesh', body: 'Seamless enterprise-grade coverage without dead zones across the entire property.', href: 'install.html#networks', icon: 'wifi' },
  { title: 'GSM/LTE signal boosting', body: 'Mobile signal boosters for reliable connectivity inside buildings.', href: 'install.html#networks', icon: 'radioTower' },
  { title: 'Fiber-optic lines', body: 'Fiber-optic line construction by our own field teams.', href: 'install.html#networks', icon: 'waypoints' },
  { title: 'Multimedia and conferencing systems', body: 'Turnkey meeting rooms, video walls and conferencing systems.', href: 'install.html#multimedia', icon: 'presentation' },
  { title: 'Data center colocation', body: 'Equipment hosting in our Lviv data center with backup power and 24/7 monitoring.', href: 'cloud.html#kolokatsiia', icon: 'server' },
  { title: 'VPS / VDS', body: 'Virtual servers with guaranteed resources and blackout protection.', href: 'cloud.html#vps', icon: 'cloud' },
  { title: 'Dedicated server rental', body: 'Physical servers for your workloads, maintained by ASTRA.', href: 'cloud.html#server', icon: 'hardDrive' },
];

export const enPages: Record<string, EnglishPage> = {
  index: {
    title: 'ASTRA for Business: digital solutions for business and modern real estate',
    description: 'Digital infrastructure for business and commercial property since 2004: power-resilient internet, security systems, networks, colocation and cloud services.',
    source: 'Home',
    hero: { image: 'img/hero-biz.jpg', title: 'Digital solutions for business and modern real estate', intro: 'Since 2004, we have built and maintained connectivity and security infrastructure: internet, networks, video surveillance, access control and cloud services under one contract.' },
    sections: [
      { kind: 'cards', tone: 'tint', id: 'segments-size', heading: 'Solutions for every scale', lead: 'The core set of services is the same in every plan, while we tailor recommended additional solutions to your scale and requirements.', items: [
        { title: 'Small business', body: 'Cafe, shop, salon or small office', href: 'maliy.html', features: ['Symmetric redundant connection and static IP', 'Unlimited traffic and 24/7 support', 'Guest Wi-Fi for visitors', 'Video surveillance and IP intercoms'] },
        { title: 'Medium business', body: 'Chain of venues, warehouse, hotel or office', href: 'seredniy.html', features: ['Redundant connection and static IP', 'Dedicated account manager', 'Structured cabling and seamless Wi-Fi / Mesh', 'Video surveillance with analytics, access control and VPS'] },
        { title: 'Large business', body: 'Corporation, residential complex, manufacturing or shopping center', href: 'velykyi.html', features: ['Dedicated fiber and redundant backbone routes', '24/7 NOC monitoring and account manager', 'Integrated security and multimedia', 'Data center colocation, fiber lines and GSM/LTE'] },
        { title: 'Operators', body: 'ISP, telecom and data center clients', href: 'operators.html', features: ['Public and private peering', 'Direct routes to Europe', 'Turnkey fiber-optic lines', 'Colocation, rack rental and transit'] },
      ] },
      { kind: 'cards', id: 'directions', heading: 'ASTRA digital solutions portfolio', lead: 'We have organized our services into three specialist divisions to cover every telecom need of your business or residential complex, from connectivity and perimeter cameras to servers in our data center.', items: directions },
      { kind: 'cards', tone: 'tint', id: 'pain', heading: 'Leave common infrastructure problems behind', lead: 'We analyzed our clients\' requests and created solutions that remove the main barriers to business growth.', items: [
        { title: 'Fragmented suppliers', body: 'One reliable partner for every service, with one invoice and one point of contact.' },
        { title: 'Unstable connectivity', body: 'Stable operation of CRM, POS terminals and video calls.' },
        { title: 'Complex administration', body: 'Transparent billing and a single point of contact for all services.' },
        { title: 'Wi-Fi dead zones', body: 'Continuous seamless coverage across the entire property.' },
        { title: 'Long support wait times', body: 'Immediate response and proactive resolution before problems affect your work.' },
        { title: 'Security risks', body: 'Reliable data protection and 24/7 video monitoring of the perimeter.' },
      ] },
      { kind: 'cards', id: 'objects', heading: 'Solutions by property type', lead: 'We build and maintain digital infrastructure around the specific needs of each type of property.', items: [
        { title: 'Offices and business centers', body: 'Scalable from 1 to 500+ workstations, with seamless Wi-Fi and secure corporate VPN connections.', image: 'img/home-office.webp' },
        { title: 'Residential complexes', body: 'Internet solutions for residential complexes, automation and unified access control and security systems.', image: 'img/home-residential.webp' },
        { title: 'Restaurants, cafes and retail chains', body: 'Connect hundreds of branches into one isolated network. Reliable guest Wi-Fi, access control and structured cabling.', image: 'img/home-retail.webp' },
        { title: 'Warehouses and manufacturing', body: 'Reliable coverage across large areas for IoT devices, scanners and data collection terminals.', image: 'img/home-warehouse.webp' },
        { title: 'Hotels and coworking spaces', body: 'Secure enterprise-grade Wi-Fi, flexible traffic management and intelligent network analytics.', image: 'img/home-hospitality.webp' },
      ] },
      { kind: 'cards', tone: 'navy', id: 'chomu', heading: 'A partnership model that frees you from connectivity concerns', lead: 'We take care of the technical issues so you can focus on your business.', items: [
        { title: 'Personal approach and service', body: 'Your dedicated manager knows the specifics of every location, coordinates technical teams and resolves your questions quickly.' },
        { title: 'Consolidated and optimized costs', body: 'All your offices, warehouses, shops or residential complexes are served under one contract. One invoice, a clear payment date and complete cost transparency.' },
        { title: 'End-to-end responsibility for the result', body: 'We are responsible for the entire infrastructure, from the backbone to your equipment. When needed, we perform a complete network audit and resolve problems at any level.' },
      ] },
      { kind: 'partners', tone: 'tint', id: 'partners', heading: 'More than 50 condominium associations and dozens of commercial properties', lead: 'Our specialists have many years of experience building networks and security systems of varying complexity, from offices to industrial sites.', note: 'Our clients include developers, residential complexes, retail and HoReCa chains, logistics companies, cultural institutions and educational organizations.' },
      { kind: 'blog', tone: 'navy', id: 'blog', heading: 'ASTRA advice and resources' },
    ],
    cta: { title: 'Let\'s discuss your property infrastructure', text: 'Leave a request and our manager will contact you, select a solution for your scale and prepare a commercial proposal.' },
  },

  maliy: {
    title: 'Internet and security for small business | ASTRA', description: 'Stable connectivity and essential security for cafes, shops, salons and small offices, with symmetric speed, a static IP address and 24/7 support.', source: 'Small business',
    hero: { image: 'img/dir-internet.jpg', label: 'Small business', parentLabel: 'Solutions', parentHref: './#segments-size', title: 'Internet and security for small business', intro: 'For a cafe, shop, salon or small office: stable connectivity and essential security under one contract. Symmetric speed, a static IP address and 24/7 support.' },
    sections: [
      { kind: 'plans', id: 'taryfy', heading: 'Plan for small business', lead: 'One transparent plan with a stable symmetric connection and the essential services a small venue or office needs.', items: plans.slice(0, 1) },
      { kind: 'cards', tone: 'tint', id: 'details', heading: 'What you should know', lead: 'All ASTRA business plans include unlimited traffic: a fixed monthly fee regardless of data usage.', items: [
        { title: 'Unlimited traffic', body: 'Stable symmetric speed for CRM, POS terminals, video calls and cloud services.' },
        { title: 'Easy to scale', body: 'As your business grows, move to a higher plan without changing providers, reconnecting or signing a new contract.' },
        { title: 'One partner for every requirement', body: 'Internet, Wi-Fi, video surveillance and intercoms under one contract, with one invoice and dedicated support.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'services', heading: 'Services that may be useful for your business', lead: 'In addition to internet access, ASTRA can meet the other needs of a small venue. Add guest Wi-Fi, video surveillance or an intercom, or explore the full service catalog.', items: [
        { title: 'Guest Wi-Fi', body: 'A separate visitor network, isolated from your business systems, with reliable coverage throughout the venue.', href: 'install.html#networks', icon: 'wifi' },
        { title: 'Basic video surveillance', body: 'A set of 2 to 8 cameras with recording and remote video access from a smartphone.', href: 'install.html#videonagliad', icon: 'cctv' },
        { title: 'IP intercom', body: 'Entrance control, calls to a smartphone and access management for staff-only areas.', href: 'install.html#access', icon: 'door' },
        { title: 'All services', body: 'The complete ASTRA business service catalog: internet, networks, security and cloud.', href: 'poslugy.html' },
      ] },
      { kind: 'contact', tone: 'navy', id: 'contact', heading: 'Request a consultation', lead: 'Leave a request and our manager will contact you, select a solution for your venue and prepare a proposal.' },
    ],
  },

  seredniy: {
    title: 'Infrastructure for chains and medium-sized businesses | ASTRA', description: 'A unified network, security and a dedicated manager for chains, warehouses, hotels and medium-sized offices under one contract.', source: 'Medium business',
    hero: { image: 'img/dir-network.jpg', label: 'Medium business', parentLabel: 'Solutions', parentHref: './#segments-size', title: 'Infrastructure for chains and medium-sized businesses', intro: 'For a chain of venues, a warehouse, hotel or medium-sized office: one network, security and a dedicated manager under one contract. We connect branches into one isolated network, maintain a symmetric redundant connection and resolve requests on the day they are submitted.' },
    sections: [
      { kind: 'plans', id: 'taryfy', heading: 'Plans for medium-sized businesses', lead: 'A symmetric redundant connection with a static IP address on request and a dedicated account manager. We will calculate the exact package and price for your property during a consultation.', items: plans.slice(1, 3) },
      { kind: 'people', tone: 'tint', id: 'manager', heading: 'Dedicated account managers', lead: 'In addition to 24/7 technical support, you receive a personal contact for all organizational and technical questions.', items: [
        { title: 'Hryhorii', body: 'Dedicated account manager', image: 'img/manager_hryhorii.png' },
        { title: 'Andrii', body: 'Dedicated account manager', image: 'img/manager_andrii.png' },
        { title: 'Borys', body: 'Dedicated account manager', image: 'img/manager_borys.png' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'details', heading: 'What you should know', lead: 'Two things our clients with multiple locations value most.', items: [
        { title: 'Branches connected into one isolated network', body: 'All venues, warehouses and offices operate within one isolated network with centralized management and access policies. Data moves between locations within a protected environment without entering the public internet.' },
        { title: 'Priority service', body: 'Requests are resolved on the day they are submitted, and your calls are answered ahead of the general queue. Your dedicated manager handles documentation and coordinates technical teams to minimize downtime for critical services.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'services', heading: 'Services that may be useful for your business', lead: 'In addition to internet access, we can cover the other needs of a chain or office. Choose what you need or explore the full business service catalog.', items: [
        { title: 'Structured cabling + Wi-Fi Mesh', body: 'Structured cabling and seamless Mesh coverage for hundreds of devices, without dead zones anywhere on the property.', href: 'install.html#networks', icon: 'wifi' },
        { title: 'Video surveillance with analytics', body: 'Cameras with video analytics and remote access, event recognition and perimeter monitoring at every location.', href: 'install.html#videonagliad', icon: 'cctv' },
        { title: 'Access control / ACS', body: 'Centralized policies for entrance management, time and attendance, and access zones across all locations.', href: 'install.html#access', icon: 'fingerprint' },
        { title: 'VPS / VDS', body: 'Cloud servers in our blackout-protected Lviv data center for accounting systems, CRM and internal services.', href: 'cloud.html#vps', icon: 'cloud' },
        { title: 'All services', body: 'The complete ASTRA business service catalog: internet, networks, security and cloud.', href: 'poslugy.html' },
      ] },
      { kind: 'contact', tone: 'navy', id: 'contact', heading: 'Request a consultation', lead: 'Leave a request and our manager will contact you, select a solution for your chain and prepare a commercial proposal.' },
    ],
  },

  velykyi: {
    title: 'Integrated infrastructure for corporations, residential complexes and manufacturing | ASTRA', description: 'A complete connectivity, security and cloud cycle for corporations, residential complexes, developers, manufacturing sites and shopping centers.', source: 'Large business',
    hero: { image: 'img/dir-security.jpg', label: 'Large business', parentLabel: 'Solutions', parentHref: './#segments-size', title: 'Integrated infrastructure for corporations, residential complexes and manufacturing', intro: 'For a corporation, residential complex, developer, manufacturing site or shopping center: a complete connectivity, security and cloud cycle with one accountable partner. Dedicated fiber, redundant backbones, turnkey integrated security and data center colocation under one contract.' },
    sections: [
      { kind: 'plans', id: 'taryfy', heading: 'Plans for large businesses', lead: 'A symmetric redundant connection with a dedicated static IP address and a personal account manager. Integrated security, multimedia and colocation are added as options for your property.', items: plans.slice(3) },
      { kind: 'people', tone: 'tint', id: 'manager', heading: 'Dedicated account managers', lead: 'In addition to 24/7 technical support, you receive a personal contact for all organizational and technical questions.', items: [
        { title: 'Nataliia', body: 'Dedicated account manager', image: 'img/manager_natalia.png' },
        { title: 'Taras', body: 'Dedicated account manager', image: 'img/manager_taras.png' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'details', heading: 'What you should know', lead: 'Technical details that matter when planning infrastructure for a large property.', items: [
        { title: 'Dedicated fiber and redundant backbones', body: 'A dedicated fiber-optic line to your property with several independent entry points and automatic failover without service interruption.' },
        { title: '24/7 NOC monitoring', body: 'Around-the-clock node supervision by our network operations center and proactive problem resolution before issues affect your work.' },
        { title: 'XG/XGS-PON optical converter', body: 'Business 2500 and Business 10000 require an XG/XGS-PON optical converter, purchased separately.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'services', heading: 'Services that may be useful for your business', lead: 'In addition to internet access, we can cover every telecom need of a large property. Choose a division or explore the complete business service catalog.', items: [
        { title: 'Redundant backbones', body: 'Several independent fiber entry points with instant failover. Critical services continue to operate without interruption.', href: 'isp.html#stability', icon: 'route' },
        { title: 'Turnkey integrated security', body: 'Video surveillance with analytics, access control, barriers and security systems, from design to maintenance by our own teams.', href: 'install.html#videonagliad', icon: 'shield' },
        { title: 'Data center colocation', body: 'Host servers in our Lviv data center with backup power, cooling and 24/7 security.', href: 'cloud.html#kolokatsiia', icon: 'server' },
        { title: 'Multimedia and conferencing systems', body: 'Meeting rooms with displays and video conferencing, background audio, video walls and public address systems across the property.', href: 'install.html#multimedia', icon: 'presentation' },
        { title: 'Fiber-optic lines', body: 'Design and construction of underground and aerial fiber-optic lines by our own field teams.', href: 'install.html#networks', icon: 'waypoints' },
        { title: 'All services', body: 'The complete ASTRA business service catalog: internet, networks, security and cloud.', href: 'poslugy.html' },
      ] },
      { kind: 'contact', tone: 'navy', id: 'contact', heading: 'Request a consultation', lead: 'Leave your contact details and a short description of the task. Our manager will assess the property, select a solution for your scale and prepare a commercial proposal.' },
    ],
  },

  isp: {
    title: 'ASTRA ISP: power-resilient internet and fiber-optic networks', description: 'Power-resilient internet on our own fiber backbone, XGS-PON up to 10 Gbps, independent redundant connections, direct routes to Europe and 24/7 monitoring.', source: 'ASTRA ISP',
    hero: { image: 'img/dir-network.jpg', label: 'ASTRA ISP', parentLabel: 'Divisions', parentHref: './#directions', title: 'Power-resilient internet and fiber-optic networks', intro: 'Stable internet on our own fiber-optic backbone in Lviv: XGS-PON technology up to 10 Gbps, independent redundant connections and direct routes to Europe that continue working during power outages.' },
    sections: [
      { kind: 'cards', id: 'xgspon', heading: 'Technology, reliability and speed to Europe', lead: 'We build internet connectivity on next-generation passive fiber with several independent connections and direct access to European internet exchange points.', items: [
        { title: 'XGS-PON technology (up to 10 Gbps)', body: '', features: ['Next-generation passive fiber', 'Symmetric speeds up to 10 Gbps', 'Continues operating during power outages'] },
        { title: 'Guaranteed reliability', body: '', id: 'stability', features: ['Several independent fiber-optic connections', 'Automatic failover to a backup connection', 'Uninterrupted network access'] },
        { title: 'Direct routes to Europe', body: '', id: 'europe', features: ['Direct connection to European internet exchange points', 'Minimal latency for cloud services', 'Stable streaming and business applications'] },
      ] },
      { kind: 'cards', tone: 'navy', id: 'network', heading: 'Our own network, fully controlled by ASTRA', lead: 'Our own backbone, nodes and field teams. We are responsible for quality along the entire route, from our node to your equipment.', items: [
        { title: 'Our own network', body: '', features: ['More than 20 years of experience', 'Our own backbone in Lviv', 'More than 45,000 active subscribers', 'Complete quality control from the node to the client'] },
        { title: '24/7 network monitoring', body: '', features: ['Automated node monitoring', 'Proactive problem resolution before issues arise'] },
        { title: 'Personal service and support', body: '', features: ['24/7 hotline and messenger support', 'Dedicated technical manager', 'Our own field teams'] },
      ] },
      { kind: 'cards', tone: 'tint', id: 'operators', heading: 'Are you a network operator?', lead: 'For ISP and telecom companies, we provide separate services: public and private peering, direct routes to Europe, turnkey fiber-optic lines and colocation at our own facilities.', items: [{ title: 'Solutions for operators', body: '', href: 'operators.html#peering' }] },
    ],
    cta: { title: 'We will select the right connection for your property', text: 'Leave a request and our manager will calculate the required speed and redundancy, then prepare a commercial proposal for your scale.' },
  },

  install: {
    title: 'ASTRA INSTALL: security systems and network solutions', description: 'Video surveillance with analytics, access control, barriers, structured cabling, Wi-Fi, fiber-optic lines, multimedia and conferencing systems.', source: 'ASTRA INSTALL',
    hero: { image: 'img/dir-security.jpg', label: 'ASTRA INSTALL', parentLabel: 'Divisions', parentHref: './#directions', title: 'Security systems and network solutions', intro: 'Design, installation and maintenance of video surveillance, access control, networks and multimedia, from a single office camera to integrated infrastructure across an industrial site or residential complex.' },
    sections: [
      { kind: 'cards', id: 'videonagliad', heading: 'Video surveillance and analytics', lead: 'Video surveillance systems of varying complexity, with remote monitoring and modern video analytics.', items: [
        { title: 'Design and installation', body: 'Solutions tailored to the scale of the property, from offices and shops to industrial zones and enterprise grounds.' },
        { title: 'Remote monitoring', body: 'Archive and live camera access from a smartphone or computer at any time.' },
        { title: 'Smart features', body: 'Face recognition, perimeter monitoring, and people and vehicle detection.' },
        { title: 'Upgrading legacy systems', body: 'We modernize existing cameras and recorders without replacing the entire infrastructure.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'access', heading: 'Access control and security', lead: 'Access management, smart vehicle entrances and security systems for offices, residential complexes and properties.', items: [
        { title: 'IP intercoms and access control', body: 'Mobile application, time and attendance tracking, RFID/NFC/BLE cards and differentiated access rights.' },
        { title: 'Smart vehicle entrances', body: 'Barriers and gates with license plate recognition and photographic records of every passage.' },
        { title: 'Security systems', body: 'Installation and integration of Ajax wireless security systems.' },
      ] },
      { kind: 'cards', id: 'networks', heading: 'Networks and communication lines', lead: 'Structured cabling, seamless Wi-Fi and fiber-optic lines built by our own teams.', items: [
        { title: 'Structured cabling systems', body: 'Design and installation of structured cabling tailored to the property.' },
        { title: 'Professional Wi-Fi', body: 'Seamless coverage and Mesh for hundreds of simultaneous devices without dead zones.' },
        { title: 'Signal boosting', body: 'GSM/LTE repeaters for parking areas, basements and other weak-signal zones.' },
        { title: 'Fiber-optic lines', body: 'Underground and aerial fiber-optic lines installed by our own teams.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'multimedia', heading: 'Multimedia and conferencing systems', lead: 'Sound, visuals and meeting-room solutions for retail, HoReCa and corporate spaces.', note: 'We can also provide ongoing maintenance for every network we build.', items: [
        { title: 'Sound and public address', body: 'Background audio for retail and HoReCa, plus voice notification systems.' },
        { title: 'Conference services', body: 'Meeting-room equipment: displays, projectors and video conferencing.' },
        { title: 'Visual solutions', body: 'Panels, video walls and advertising displays for interiors and facades.' },
        { title: 'Support', body: 'Configuration, staff training and ongoing service maintenance.' },
      ] },
      { kind: 'partners', tone: 'navy', id: 'brands', heading: 'Equipment brands', lead: 'We work with proven equipment for video surveillance, access control and vehicle entry management.' },
    ],
    cta: { title: 'Let\'s design a security system for your property', text: 'Leave a request and the division manager will contact you, survey the property and prepare a solution for your scale.' },
  },

  cloud: {
    title: 'ASTRA CLOUD: server hosting and blackout-protected cloud infrastructure', description: 'Our own Lviv data center: colocation, VPS/VDS and dedicated server rental with backup power, climate control and 24/7 monitoring.', source: 'ASTRA CLOUD',
    hero: { image: 'img/dir-cloud.jpg', label: 'ASTRA CLOUD', parentLabel: 'Divisions', parentHref: './#directions', title: 'Server hosting and cloud infrastructure protected against blackouts', intro: 'Our own data center in Lviv: colocation for your equipment, VPS/VDS virtual servers and dedicated server rental. Backup power, climate control and 24/7 data center monitoring.' },
    sections: [
      { kind: 'cards', heading: 'Cloud infrastructure in our own data center', lead: 'Host equipment and deploy servers in our data center with guaranteed autonomy, from a single rack unit to full racks.', items: [
        { title: 'Colocation', body: 'Host your equipment in our technology facility, from 1U to full racks, with connectivity and public IP addresses.', id: 'kolokatsiia' },
        { title: 'Guaranteed autonomy', body: 'Backup power, climate control and 24/7 data center monitoring. Equipment continues to operate even during blackouts.' },
        { title: 'Virtual servers (VPS/VDS)', body: 'Flexible virtual infrastructure with instant scaling. We tailor processor, memory and storage to your workload.', id: 'vps' },
        { title: 'Server rental', body: 'Ready dedicated servers for your needs, without capital expenditure on your own hardware. Hardware and configuration are agreed individually.', id: 'server' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'datacenter', heading: 'Our own data center in Lviv', lead: 'This is our infrastructure from the power line to the patch cord. Our own engineers maintain the facilities, so every issue is resolved quickly, without bureaucracy or intermediaries.', items: [
        { title: 'Connectivity', body: 'Internet bandwidth from 100 Mbps to 10,000 Mbps per client, the required number of public IP addresses and 24/7 access to equipment.' },
      ] },
    ],
    cta: { title: 'Host your equipment in a protected data center', text: 'Colocation, VPS/VDS or a dedicated server: our manager will select the right solution and prepare a commercial proposal.' },
  },

  operators: {
    title: 'Solutions for network operators | ASTRA', description: 'Peering, direct routes to Europe, fiber-optic lines and capacity on ASTRA\'s own Lviv backbone for ISP and telecom companies.', source: 'Operators',
    hero: { image: 'img/dir-network.jpg', label: 'Operators', parentLabel: 'Solutions', parentHref: './#segments-size', title: 'Solutions for network operators', intro: 'Wholesale partnership for ISP and telecom companies: peering, direct routes to Europe, fiber-optic lines and capacity on ASTRA\'s own Lviv backbone. Services are available exclusively to legal entities and network operators.' },
    sections: [
      { kind: 'cards', id: 'peering', heading: 'Peering', lead: 'Direct internet traffic exchange between networks means lower latency, greater reliability and lower transit costs. We connect operators to our peering points in public and private formats.', note: 'Peering is provided exclusively to legal entities and network operators. Commercial terms are calculated individually.', items: [
        { title: 'Public peering', body: 'Traffic exchange on public platforms (IXPs), where many operators connect to one central switch. A fast start and broad presence.' },
        { title: 'Private peering', body: 'A direct connection between two operators without public switches. A more expensive but more efficient option for high traffic volumes.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'europe', heading: 'Direct routes to Europe', lead: 'Direct connections to European internet exchange points that bypass congested routes, delivering minimal latency and predictable quality for your clients.', note: 'Commercial terms are calculated individually.', items: [
        { title: 'European IXPs', body: '', features: ['Direct connection to European internet exchange points', 'Bypassing congested transit routes'] },
        { title: 'Minimal latency', body: '', features: ['The shortest route to European resources', 'Predictably low latency for clients'] },
        { title: 'Redundancy', body: '', features: ['Several independent directions', 'Automatic failover to a backup route'] },
      ] },
      { kind: 'cards', id: 'volz', heading: 'Turnkey fiber-optic lines', lead: 'Construction of underground and aerial fiber-optic communication lines by our own cable teams, from route design to commissioning.', note: 'Commercial terms are calculated individually.', items: [
        { title: 'Underground lines', body: 'Installation in cable ducts and soil, with protected routes for backbone segments.' },
        { title: 'Aerial lines', body: 'Fiber cable installation on poles for rapid connection between sites.' },
        { title: 'Our own teams', body: 'Installation, fiber splicing and line maintenance by our own cable crews.' },
        { title: 'Turnkey delivery', body: 'Design, approvals, construction and documentation under one contract.' },
      ] },
      { kind: 'cards', tone: 'tint', id: 'colocation', heading: 'Colocation and rack rental', lead: 'Host your equipment in our own Lviv data center with backup power, climate control and 24/7 monitoring.', note: 'Commercial terms are calculated individually.', items: [
        { title: 'Our own data center in Lviv', body: '', features: ['Equipment hosting by rack unit or rental of a complete rack', 'Backup power and climate control', '24/7 monitoring by engineers'] },
      ] },
      { kind: 'cards', id: 'wholesale', heading: 'Transit and wholesale capacity', lead: 'Wholesale connections and capacity for operator needs: we connect your network to the ASTRA backbone and global resources on predictable terms.', note: 'Commercial terms are calculated individually.', items: [
        { title: 'IP transit', body: '', features: ['Wholesale access to global resources', 'Predictable quality and routing'] },
        { title: 'Wholesale capacity', body: '', features: ['Connections sized for operator requirements', 'Bandwidth scaling on request'] },
        { title: 'Connection redundancy', body: '', features: ['Independent directions and automatic failover', 'Continuity for the operator\'s clients'] },
      ] },
    ],
    cta: { title: 'Request a commercial proposal', text: 'Leave a request and our specialist will clarify the operator\'s requirements and prepare an individual calculation for peering, connections, fiber lines or colocation.', label: 'Request a commercial proposal' },
  },

  poslugy: {
    title: 'All ASTRA services for business', description: 'The complete catalog of connectivity, networks, security and cloud services under one contract.', source: 'Services',
    hero: { image: 'img/dir-network.jpg', label: 'Services', title: 'All ASTRA services for business', intro: 'The complete catalog of connectivity, networks, security and cloud services under one contract. Choose the service you need or request a consultation and we will assemble a package for your property and scale.' },
    sections: [
      { kind: 'cards', heading: 'ASTRA ISP', lead: 'Internet and backbone routes', items: serviceCards.slice(0, 4) },
      { kind: 'cards', tone: 'tint', heading: 'ASTRA INSTALL', lead: 'Security and networks', items: serviceCards.slice(4, 14) },
      { kind: 'cards', heading: 'ASTRA CLOUD', lead: 'Cloud and data center', items: serviceCards.slice(14) },
    ],
    cta: { title: 'Not sure where to start?', text: 'Leave a request and our manager will select a set of services for your property and scale, then prepare a commercial proposal.' },
  },

  taryfy: {
    title: 'Business plans | ASTRA', description: 'All ASTRA business plans in one place. Symmetric speed, a static IP address and document management are included in every plan.', source: 'Plans',
    hero: { image: 'img/hero-biz.jpg', label: 'Plans', title: 'Business plans', intro: 'All ASTRA business plans in one place. Symmetric speed, a static IP address and document management are included in every plan. We will calculate the exact set of services for your property during a consultation.' },
    sections: [
      { kind: 'plans', heading: 'ASTRA business plans', lead: 'From Business 100 for a small venue to Business 10000 for a corporation or data center. Speed and price increase, while the core set of services remains the same for everyone.', footnote: 'A dedicated account manager is available to clients on Business 250 and higher. Business 2500 and Business 10000 require an XG/XGS-PON optical converter, purchased separately.', items: plans },
      { kind: 'cards', tone: 'tint', id: 'operatory', heading: 'Operators', lead: 'A separate offering for ISP, telecom and data center clients, with services not available in the other categories. Prices are calculated individually.', note: 'Terms for operators depend on capacity, routes and contract duration.', noteLink: { label: 'View operator solutions', href: 'operators.html' }, items: [
        { title: 'Public and private peering', body: 'Public and private traffic exchange. The service is available exclusively to legal entities and network operators.', href: 'operators.html#peering' },
        { title: 'Direct routes to Europe', body: 'Direct connection to European internet exchange points with minimal latency.', href: 'operators.html#europe' },
        { title: 'Turnkey fiber-optic lines', body: 'Design and construction of fiber-optic communication lines by our own field teams.', href: 'operators.html#volz' },
        { title: 'Colocation / rack rental', body: 'Equipment hosting in our Lviv data center with backup power, climate control and 24/7 monitoring.', href: 'operators.html#colocation' },
        { title: 'Transit / wholesale, individually calculated', body: 'Wholesale IP transit and dedicated capacity for your network.', href: 'operators.html#wholesale' },
      ] },
    ],
    cta: { title: 'Not sure which plan fits your property?', text: 'Leave a request and our manager will select the right speed and service package for your scale, then prepare a commercial proposal.' },
  },

  pro: {
    title: 'About ASTRA: digital infrastructure for business', description: 'ASTRA has built connectivity and security infrastructure in Lviv since 2004, with its own fiber-optic network, engineering teams and data center.', source: 'About us',
    hero: { image: 'img/about-city.jpg', label: 'About us', title: 'A constellation of digital services for business', intro: 'Since 2004, we have built and maintained connectivity and security infrastructure: our own fiber-optic network, security systems and cloud services under one contract, with one team responsible for the result.' },
    sections: [
      { kind: 'copy', id: 'history', heading: 'More than 20 years building Lviv\'s digital infrastructure', paragraphs: [
        'ASTRA (ASTRA-LVIV LLC) has built connectivity and security infrastructure since 2004. Over these years, we have developed our own backbone fiber-optic network in Lviv and gained complete control over the quality of every connection, from the internet exchange point to the final meter leading into your property.',
        'We have grown from a traditional internet provider into an integrated infrastructure partner. Today, we work through three specialist divisions: ASTRA ISP (power-resilient internet and corporate networks), ASTRA INSTALL (security systems, video surveillance and access control), and ASTRA CLOUD (colocation, cloud services and server hosting in our own data center). This allows us to cover every telecom requirement of a business or residential complex without involving third-party contractors.',
      ] },
      { kind: 'stats', tone: 'tint', heading: 'ASTRA in numbers', items: [
        { title: '20+', body: 'years of experience' }, { title: '45,000+', body: 'active subscribers' },
        { title: '50+', body: 'condominium associations served' }, { title: '1', body: 'data center of our own in Lviv' },
        { title: '24/7', body: 'support and monitoring' },
      ] },
      { kind: 'cards', id: 'directions', heading: 'Three divisions under one roof', lead: 'We have organized our services into three specialist divisions to cover every telecom need of your business or residential complex, from connectivity and perimeter cameras to servers in our data center.', items: directions },
      { kind: 'cards', tone: 'navy', id: 'chomu', heading: 'Why businesses choose ASTRA', lead: 'We take care of technical issues so you can focus on your business.', items: [
        { title: 'Personal approach', body: 'Direct communication. Your dedicated manager knows the specifics of every location, coordinates technical teams and resolves your questions quickly.' },
        { title: 'Consolidated costs', body: 'All your offices, warehouses, shops or residential complexes are served under one contract. One invoice, a clear payment date and simpler accounting.' },
        { title: 'End-to-end responsibility', body: 'Deep expertise and a complete audit of the property network. We are responsible for the entire infrastructure and resolve problems at any level.' },
      ] },
      { kind: 'gallery', tone: 'tint', id: 'team', heading: 'The team that builds and maintains it', lead: 'Behind every connection and every camera are our own engineers and responsive field teams. We do not subcontract the work, so we are responsible for the entire process, from design to 24/7 support.', items: [
        { title: 'The ASTRA team', body: 'Our people', image: 'img/team-group.jpg' },
        { title: 'Data center engineers', body: 'On-site expertise', image: 'img/team-datacenter.jpg' },
        { title: 'Field team', body: 'Installation and maintenance', image: 'img/team-flag.jpg' },
      ] },
      { kind: 'partners', id: 'partners', heading: 'Trusted by our clients', lead: 'More than 50 condominium associations and dozens of commercial properties: developers, residential complexes, retail and HoReCa chains, logistics companies, cultural institutions and educational organizations.' },
    ],
    cta: { title: 'Let\'s discuss your property infrastructure', text: 'Leave a request and our manager will contact you, select a solution for your scale and prepare a commercial proposal.' },
  },

  kontakty: {
    title: 'Business contacts | ASTRA', description: '24/7 technical support, messenger support and dedicated accounting for legal entities. Leave a request and we will select a solution for your property.', source: 'Contacts',
    hero: { image: 'img/contacts-banner.jpg', label: 'Contacts', title: 'Business contacts', intro: '24/7 technical support, messenger support and dedicated accounting for legal entities. Leave a request. Our manager will contact you and select a solution for your property.' },
    sections: [
      { kind: 'cards', tone: 'tint', id: 'contacts', heading: 'How to contact us', lead: 'For technical questions, reach us by phone or messenger around the clock. Our accounting team handles documents and payments for legal entities.', items: [
        { title: '24/7 support', body: 'Our technical support line is available 24/7. Calls to 0 800 are free of charge.', links: [
          { label: '0 800 20-38-38 · TOLL-FREE', href: 'tel:+380800203838' }, { label: '(097) 418-3838', href: 'tel:+380974183838' },
          { label: '(095) 418-3838', href: 'tel:+380954183838' }, { label: '(032) 232-8808', href: 'tel:+380322328808' },
        ] },
        { title: 'Chat with us', body: 'Message us. We reply around the clock.', note: 'Need a call? Leave your number in the form below and a manager will call you back.', noteAfterLinks: 2, links: [
          { label: 'Telegram', href: 'https://t.me/astraispbot' }, { label: 'Viber', href: 'viber://chat?number=%2B380800203838' },
          { label: 'Request a consultation →', href: '#consult' },
        ] },
        { title: 'Accounting for legal entities', body: 'Contracts, completion certificates and payments for legal entities, ASTRA-LVIV LLC.', note: '3 Lytvynenka St, Lviv', links: [
          { label: '(032) 232-8802', href: 'tel:+380322328802' }, { label: '(093) 289-9815', href: 'tel:+380932899815' },
          { label: 'Telegram @bukh_astra', href: 'https://t.me/bukh_astra' }, { label: 'Viber @bukh_astra', href: 'viber://chat?number=%2B380932899815' },
          { label: 'Email: info@astra.in.ua', href: 'mailto:info@astra.in.ua' },
        ] },
      ] },
      { kind: 'contact', tone: 'navy', id: 'consult', heading: 'Request a consultation', lead: 'Leave your contact details and a short description of the task. Our manager will contact you, select a solution for your scale and prepare a commercial proposal.' },
    ],
    cta: { title: 'Let\'s discuss your property infrastructure', text: 'Leave a request and your dedicated manager will select a solution for your scale and prepare a commercial proposal.' },
  },
};

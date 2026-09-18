import type { BlogPost } from './blog';

const paragraph = (text: string) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text }] });
const heading = (text: string) => ({ _type: 'block', style: 'h2', children: [{ _type: 'span', text }] });
const bullet = (text: string) => ({ _type: 'block', style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', text }] });

export const starterPostsEn: BlogPost[] = [
  {
    title: 'Backup internet for business: where to start', slug: 'backup-internet-for-business', publishedAt: '2026-09-18T09:00:00Z',
    category: 'Internet', tags: ['Business continuity', 'Networks'],
    excerpt: 'What to check before adding a second connection, and why another provider alone does not guarantee uninterrupted service.',
    image: 'img/blog/rezervuvannia-kanalu.png', imageAlt: 'Network patch panel with connected cables',
    body: [
      paragraph('A short internet outage can interrupt payments, CRM access, video meetings and cloud services. A backup link reduces downtime only when the route, power supply and failover process are planned together.'),
      heading('Identify what cannot wait'),
      paragraph('List your critical workflows: point-of-sale payments, telephony, remote access, server sync and cameras. Estimate the minimum bandwidth each needs during an incident and the maximum acceptable interruption. The backup link need not match your primary connection, but it must carry the essential workload.'),
      heading('Check physical independence'),
      paragraph('Two contracts do not always mean two independent routes. Cables may enter the building through one duct or share a long section of the same path. Ask about separate routes and entry points, especially for warehouses, factories and multi-storey sites.'),
      heading('Plan equipment and power'),
      bullet('Use a router that switches to the backup link automatically and returns to the primary link when it recovers.'),
      bullet('Keep the router, switches and entry equipment powered during an outage.'),
      bullet('Test an actual failover, not just the status indicators for both connections.'),
      paragraph('Run a controlled test with your technical team and record which services recover automatically. A tested procedure turns a backup connection into a reliable continuity plan.'),
    ],
  },
  {
    title: 'Warehouse video surveillance: planning without blind spots', slug: 'warehouse-video-surveillance', publishedAt: '2026-09-16T09:00:00Z',
    category: 'Security', tags: ['Video surveillance', 'Warehouses'],
    excerpt: 'Movement routes, lighting, retention and archive access: a practical checklist before cameras are installed.',
    image: 'img/blog/videonagliad-skladu.png', imageAlt: 'Surveillance camera inside a warehouse',
    body: [
      paragraph('A warehouse changes every day. Pallets move, shelves fill up and vehicles block the view. Start camera planning with the events you need to see, not with a device count.'),
      heading('Mark key events on the plan'),
      paragraph('Map entrances, receiving and dispatch areas, aisles, valuable stock and staff doors. Decide whether each camera must detect an event, show the direction of movement or capture identifying detail. One position rarely does all three equally well.'),
      heading('Test real recording conditions'),
      paragraph('Backlight at loading bays, shadows between shelves and night conditions can change the result substantially. Test proposed camera positions on site at different times. A camera mounted too high sees more but loses detail; too low and cargo may block it.'),
      heading('Plan the network and archive'),
      bullet('Define how long footage must be stored and who may access it.'),
      bullet('Allow enough network capacity and backup power for cameras, switches and recorders.'),
      bullet('Assign access permissions according to staff responsibilities.'),
      paragraph('After installation, follow typical staff and vehicle routes and review the footage. This simple check reveals blind spots before you need a recording to investigate an incident.'),
    ],
  },
  {
    title: 'VPS or colocation: choosing a home for business services', slug: 'vps-or-colocation', publishedAt: '2026-09-12T09:00:00Z',
    category: 'Cloud & data center', tags: ['VPS', 'Colocation'],
    excerpt: 'Compare two hosting approaches by control, scalability and your team’s operational responsibilities.',
    image: 'img/blog/kolokatsiia-vps.png', imageAlt: 'Server racks in a data center',
    body: [
      paragraph('When an on-premise server is no longer enough, the question is not only where to put it. Decide who owns the hardware lifecycle, how quickly capacity can grow and what your applications require.'),
      heading('When a VPS makes sense'),
      paragraph('A virtual private server lets you run services without buying physical hardware. It works well for web applications, test environments and changing workloads. Your team or provider still needs to manage the operating system and applications.'),
      heading('When to choose colocation'),
      paragraph('Colocation places your own server in a data center. It suits existing hardware, specialized configurations and teams that need full control of the physical platform. In return, your team remains responsible for spares, replacement and upgrades.'),
      heading('Compare the whole picture'),
      bullet('Estimate both current load and expected growth.'),
      bullet('Clarify who handles backups, monitoring and recovery.'),
      bullet('Check access rules, network capacity and hardware-response times.'),
      paragraph('A hybrid setup is often sensible: core systems on your own hardware, with selected services or testing on a VPS. Base the choice on workload, data and responsibility, not a single monthly price.'),
    ],
  },
];

export const starterEnSourceSlug: Record<string, string> = {
  'rezervnyi-internet-dlia-biznesu': 'backup-internet-for-business',
  'videonagliad-na-skladi': 'warehouse-video-surveillance',
  'vps-chy-kolokatsiia': 'vps-or-colocation',
};

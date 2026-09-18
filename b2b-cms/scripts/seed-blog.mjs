import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@sanity/client';
import { starterPosts } from '../src/data/blog.ts';

process.loadEnvFile();
const { PUBLIC_SANITY_PROJECT_ID: projectId, PUBLIC_SANITY_DATASET: dataset, SANITY_TOKEN: token } = process.env;
if (!projectId || !token) throw new Error('Sanity project ID and write token are required in .env');

const client = createClient({ projectId, dataset: dataset || 'production', token, apiVersion: '2024-01-01', useCdn: false });
try {
for (const post of starterPosts) {
  const id = `blog-${post.slug}`;
  if (await client.getDocument(id)) {
    console.log(`Already exists: ${post.slug}`);
    continue;
  }
  const filename = post.image.split('/').pop();
  const asset = await client.assets.upload('image', createReadStream(resolve('public', post.image)), { filename });
  const body = post.body.map((block, index) => ({
    ...block,
    _key: `block-${index}`,
    markDefs: [],
    children: block.children.map((child, childIndex) => ({ ...child, _key: `span-${index}-${childIndex}`, marks: [] })),
  }));
  await client.createIfNotExists({
    _id: id,
    _type: 'blogPost',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    publishedAt: post.publishedAt,
    category: post.category,
    tags: post.tags,
    excerpt: post.excerpt,
    cover: { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: post.imageAlt },
    body,
  });
  console.log(`Created: ${post.slug}`);
}
} catch (error) {
  console.error(`Sanity seed failed: ${error.code || error.statusCode || 'request error'}. No token details printed.`);
  process.exitCode = 1;
}

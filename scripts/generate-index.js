const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '..', 'posts');
const outputPath = path.join(__dirname, '..', 'index.json');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const posts = files.map(filename => {
  const slug = filename.replace('.md', '');
  const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
  const { data } = matter(raw);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '',
    tags: data.tags || [],
  };
});

// Sort by date descending (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
console.log(`Generated index.json with ${posts.length} posts.`);

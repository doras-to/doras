import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    let blog = await getCollection('blog');

    // Filter posts by category
    const updates = blog.filter(post => post.data.category === 'Updates');

    // Sort posts by publishDate in descending order
    const sortedUpdates = updates.sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));

    return rss({
        title: "The Doras Blog - Updates",
        description: "Get all the latest updates from Doras",
        site: context.site,
        items: sortedUpdates.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishDate,
            description: post.data.snippet,
            author: post.data.author,
            category: post.data.category,
            // Compute RSS link from post `slug`
            // This example assumes all posts are rendered as `/blog/[slug]` routes
            link: `/blog/${post.slug}/`,
        })),
    });
}
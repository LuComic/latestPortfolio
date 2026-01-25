export const prerender = true;

export async function GET() {
	const siteUrl = 'https://jaager.dev'; // TODO: Replace with your actual domain
	const pages = ['', '/contact', '/experience', '/portfolio', '/projects'];

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
>
	${pages
		.map(
			(page) => `
	<url>
		<loc>${siteUrl}${page}</loc>
		<changefreq>weekly</changefreq>
		<priority>${page === '' ? 1.0 : 0.8}</priority>
	</url>
	`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}

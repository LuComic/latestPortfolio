export type experienceType = {
	id: number;
	header: string;
	info: string[];
	links?: {
		name: string;
		link: string;
	}[];
};

export type projectType = {
	id: number;
	name: string;
	stack: string[];
	description: string;
	disclaimer?: string;
	pics: string[];
};

export type contactType = {
	id: number;
	media: 'instagram' | 'github' | 'facebook';
	link: string;
};

export const experiences: experienceType[] = [
	{
		id: 1,
		header: 'Frontend (Primary focus over the last 2 years)',
		info: ['HTML, CSS, JS and TS', 'Svelte 5', 'Next.js the basics'],
		links: [
			{ name: 'Python Project Course (StreamList project)', link: '/certificates/project-cert.pdf' }
		]
	},
	{
		id: 2,
		header: 'School (with TalTech)',
		info: ['Python'],
		links: [
			{ name: 'Object Oriented Programming', link: '/certificates/oop-cert.pdf' },
			{ name: 'Python Main Course', link: '/certificates/overall-cert.pdf' }
		]
	},
	{
		id: 3,
		header: 'Currently studying',
		info: ['Golang']
	},
	{
		id: 4,
		header: 'Other work',
		info: ['In summer of 2024 worked at Nike', 'From summer of 2025 -> current work at Mikkeller']
	}
];

export const projects: projectType[] = [
	{
		id: 1,
		name: 'NoorteKunst',
		stack: ['Vanilla HTML', 'CSS', 'JS'],
		disclaimer: 'I made only the frontend; domain has expired',
		description:
			"noorteKunst is a web gallery combined with social media aspects for young starting artists to start or boost their art jounrey.A simple way to stand out (which is basically impossible in social media), grow your portfolio and find fans. Also if you're interested in art, noorteKunst is a great way to find young artists and do things that you can do on every social media platform - like posts, save them and follow artists. (site is only in estonian)",
		pics: [
			'/pictures/noortekunst-landing.png',
			'/pictures/noortekunst-feed.png',
			'/pictures/noortekunst-login.png'
		]
	},
	{
		id: 2,
		name: 'StreamList',
		stack: ['Next.js', 'Tailwind'],
		disclaimer: "I made only the frontend; TalTech's project",
		description:
			"A site similar to Letterboxd, but with a new intuitive UI and a more userfriendly alternative, with analytics and more. Add movies AND SHOWS (which isn't possible in Letterboxd) to either 'Watched' or 'Watchlist', rate them, leave an overview etc. You can even create your own groups which you can share with friends, to share what each of you likes.",
		pics: [
			'/pictures/moviesite-dashboard.jpg',
			'/pictures/moviesite-feed.jpg',
			'/pictures/moviesite-news.jpg'
		]
	},
	{
		id: 3,
		name: 'Termnotes',
		stack: ['Python'],
		description:
			"A simple, elegant and yet fast terminal based note taking app! It has all the features you might need, like markdown support, copying notes, moving them between folders, dailynotes etc. If you need something more, then the code is open source and you can add as many features as you'd like, since the code is written is basic python!",
		pics: [
			'pictures/termnotes-home.png',
			'pictures/termnotes-view.png',
			'pictures/termnotes-md.png'
		]
	}
];

export const socials: contactType[] = [
	{
		id: 1,
		media: 'instagram',
		link: 'https://www.instagram.com/lucomic/'
	},
	{
		id: 2,
		media: 'facebook',
		link: 'https://www.facebook.com/profile.php?id=100032004948809'
	},
	{
		id: 3,
		media: 'github',
		link: 'https://github.com/LuComic'
	}
];

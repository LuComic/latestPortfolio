<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { Asterisk, Mail, Menu } from '@lucide/svelte';

	const dotSize = 5;
	const dotGap = 2;
	const pitch = dotSize + dotGap;
	const inkColor = 'var(--ink)';
	const iconPaperColor = 'var(--icon-paper)';
	const dotColor = 'var(--dot)';
	const resolveAsset = resolve as unknown as (path: string) => string;
	const byroPath = resolve('/(projects)/byro');
	const logoSrc = resolveAsset('/byro/byro-image.jpeg');
	const byroLogoSrc = resolveAsset('/byro/byro-logo.png');

	const navItems = [
		{ href: `${byroPath}#testimonials`, label: 'Testimonials' },
		{ href: `${byroPath}#managing-your-image`, label: 'What?' },
		{ href: `${byroPath}#how-it-works`, label: 'How?' },
		{ href: `${byroPath}#pricing`, label: 'Pricing' },
		{ href: `${byroPath}#contact`, label: 'Contact' }
	];

	const sections = [
		{ id: 'testimonials', title: 'Testimonials' },
		{ id: 'managing-your-image', title: 'Managing your image' },
		{ id: 'how-it-works', title: 'How it works' },
		{ id: 'pricing', title: 'Pricing' },
		{ id: 'contact', title: 'Contact' }
	];

	const socialLinks = ['Facebook', 'LinkedIn', 'Instagram'];

	const footerColumns = [
		{
			title: 'Company',
			links: ['About Byro', 'Pricing', 'Case studies']
		},
		{
			title: 'Resources',
			links: ['Newsletter', 'Brand guide', 'Help center']
		},
		{
			title: 'Legal',
			links: ['Privacy policy', 'Terms of service', 'Cookie policy']
		}
	];

	const placeholder =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis nunc et mi varius eleifend. Nam varius felis non sapien pretium, ut gravida nulla tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut bibendum sit amet turpis at interdum. Pellentesque non diam ac ex commodo hendrerit eu sed nunc.';

	const testimonialBrands = [
		{
			name: 'Coca-Cola',
			color: '#ef4444',
			stats: [
				{ label: 'LinkedIn impressions', value: '428k' },
				{ label: 'LinkedIn clicks', value: '18.6k' },
				{ label: 'Rating', value: '4.9/5' }
			]
		},
		{
			name: 'Spotify',
			color: '#22c55e',
			stats: [
				{ label: 'LinkedIn impressions', value: '312k' },
				{ label: 'LinkedIn clicks', value: '11.9k' },
				{ label: 'Rating', value: '4.8/5' }
			]
		},
		{
			name: 'Wise',
			color: '#16a34a',
			stats: [
				{ label: 'LinkedIn impressions', value: '196k' },
				{ label: 'LinkedIn clicks', value: '8.4k' },
				{ label: 'Rating', value: '4.7/5' }
			]
		},
		{
			name: 'Figma',
			color: '#a855f7',
			stats: [
				{ label: 'LinkedIn impressions', value: '251k' },
				{ label: 'LinkedIn clicks', value: '13.2k' },
				{ label: 'Rating', value: '4.9/5' }
			]
		},
		{
			name: 'Airbnb',
			color: '#f43f5e',
			stats: [
				{ label: 'LinkedIn impressions', value: '379k' },
				{ label: 'LinkedIn clicks', value: '15.1k' },
				{ label: 'Rating', value: '4.8/5' }
			]
		},
		{
			name: 'Bolt',
			color: '#84cc16',
			stats: [
				{ label: 'LinkedIn impressions', value: '144k' },
				{ label: 'LinkedIn clicks', value: '6.8k' },
				{ label: 'Rating', value: '4.6/5' }
			]
		},
		{
			name: 'Stripe',
			color: '#6366f1',
			stats: [
				{ label: 'LinkedIn impressions', value: '286k' },
				{ label: 'LinkedIn clicks', value: '10.7k' },
				{ label: 'Rating', value: '4.8/5' }
			]
		},
		{
			name: 'Notion',
			color: '#11182b',
			stats: [
				{ label: 'LinkedIn impressions', value: '223k' },
				{ label: 'LinkedIn clicks', value: '9.5k' },
				{ label: 'Rating', value: '4.7/5' }
			]
		}
	];

	type TestimonialBrand = (typeof testimonialBrands)[number];

	const marqueeRows = [testimonialBrands.slice(0, 4), testimonialBrands.slice(4)];

	let selectedBrand = $state<TestimonialBrand | null>(null);

	let pageDots: HTMLDivElement;
	let panelDots: HTMLDivElement;
	let pixelCard: HTMLDivElement;

	onMount(() => {
		const logoImage = new Image();
		const sampleCanvas = document.createElement('canvas');
		const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
		let canSampleLogo = true;
		let fallbackShapes: Path2D | undefined;

		function buildDotGrid(
			grid: HTMLDivElement,
			width: number,
			height: number,
			offsetX = 0,
			offsetY = 0
		) {
			const columns = Math.ceil((width + dotGap) / pitch);
			const rows = Math.ceil((height + dotGap) / pitch);
			const count = columns * rows;

			grid.style.left = `${-offsetX}px`;
			grid.style.top = `${-offsetY}px`;
			grid.style.gridTemplateColumns = `repeat(${columns}, ${dotSize}px)`;
			grid.style.gridAutoRows = `${dotSize}px`;
			grid.dataset.columns = String(columns);
			grid.dataset.rows = String(rows);
			grid.dataset.offsetX = String(offsetX);
			grid.dataset.offsetY = String(offsetY);

			if (grid.childElementCount === count) return;

			const fragment = document.createDocumentFragment();
			for (let index = 0; index < count; index += 1) {
				const dot = document.createElement('span');
				dot.className = 'dot';
				dot.style.aspectRatio = '1';
				dot.style.borderRadius = '999px';
				dot.style.background = grid === panelDots ? 'transparent' : dotColor;
				fragment.append(dot);
			}

			grid.replaceChildren(fragment);
		}

		function fallbackLogoColor(x: number, y: number) {
			if (!sampleCtx) return inkColor;

			if (!fallbackShapes) {
				fallbackShapes = new Path2D();

				fallbackShapes.moveTo(89, 53);
				fallbackShapes.bezierCurveTo(78, 59, 70, 76, 67, 94);
				fallbackShapes.bezierCurveTo(66, 102, 68, 105, 73, 101);
				fallbackShapes.bezierCurveTo(83, 94, 90, 73, 92, 56);
				fallbackShapes.bezierCurveTo(92, 52, 91, 52, 89, 53);
				fallbackShapes.closePath();

				fallbackShapes.moveTo(101, 50);
				fallbackShapes.bezierCurveTo(114, 49, 127, 53, 134, 61);
				fallbackShapes.bezierCurveTo(124, 64, 114, 73, 106, 88);
				fallbackShapes.bezierCurveTo(101, 97, 97, 107, 94, 116);
				fallbackShapes.bezierCurveTo(96, 92, 98, 69, 101, 50);
				fallbackShapes.closePath();

				fallbackShapes.moveTo(112, 83);
				fallbackShapes.bezierCurveTo(132, 83, 149, 98, 149, 119);
				fallbackShapes.bezierCurveTo(149, 150, 122, 176, 78, 176);
				fallbackShapes.bezierCurveTo(97, 169, 109, 149, 117, 125);
				fallbackShapes.bezierCurveTo(125, 102, 121, 89, 108, 85);
				fallbackShapes.bezierCurveTo(109, 84, 110, 83, 112, 83);
				fallbackShapes.closePath();
			}

			return sampleCtx.isPointInPath(fallbackShapes, x, y) ? iconPaperColor : inkColor;
		}

		function logoColor(red: number, green: number, blue: number) {
			const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

			return luminance > 180 ? iconPaperColor : inkColor;
		}

		function colorPanelDots() {
			if (!logoImage.complete || !logoImage.naturalWidth) return;

			const columns = Number(panelDots.dataset.columns);
			const rows = Number(panelDots.dataset.rows);
			const offsetX = Number(panelDots.dataset.offsetX);
			const offsetY = Number(panelDots.dataset.offsetY);
			if (!columns || !rows) return;

			const panelWidth = pixelCard.clientWidth;
			const panelHeight = pixelCard.clientHeight;

			if (sampleCtx) {
				sampleCanvas.width = logoImage.naturalWidth;
				sampleCanvas.height = logoImage.naturalHeight;
				sampleCtx.drawImage(logoImage, 0, 0);
			}

			Array.from(panelDots.children).forEach((dot, index) => {
				const column = index % columns;
				const row = Math.floor(index / columns);
				const localX = column * pitch - offsetX;
				const localY = row * pitch - offsetY;
				const x = Math.round(
					(localX / Math.max(panelWidth - dotSize, 1)) * (logoImage.naturalWidth - 1)
				);
				const y = Math.round(
					(localY / Math.max(panelHeight - dotSize, 1)) * (logoImage.naturalHeight - 1)
				);

				if (x < 0 || y < 0 || x >= logoImage.naturalWidth || y >= logoImage.naturalHeight) {
					(dot as HTMLElement).style.background = 'transparent';
					return;
				}

				if (sampleCtx && canSampleLogo) {
					try {
						const [red, green, blue] = sampleCtx.getImageData(x, y, 1, 1).data;
						(dot as HTMLElement).style.background = logoColor(red, green, blue);
						return;
					} catch (error) {
						canSampleLogo = false;
						console.warn(`Could not sample ${logoSrc}. Falling back to drawn logo colors.`, error);
					}
				}

				(dot as HTMLElement).style.background = fallbackLogoColor(x, y);
			});
		}

		function sizeIconInLeds() {
			pixelCard.style.transform = '';

			const maxSize = Math.min(window.innerHeight * 0.76, window.innerWidth * 0.38, 560);
			const ledColumns = Math.max(42, Math.floor((maxSize + dotGap) / pitch));
			const size = ledColumns * pitch - dotGap;

			pixelCard.style.width = `${size}px`;
			pixelCard.style.height = `${size}px`;

			const rect = pixelCard.getBoundingClientRect();
			const snapX = rect.left % pitch;
			const snapY = rect.top % pitch;

			pixelCard.style.transform = `translate(${-snapX}px, ${-snapY}px)`;
		}

		function buildAllDotGrids() {
			sizeIconInLeds();

			const panelRect = pixelCard.getBoundingClientRect();
			const offsetX = panelRect.left % pitch;
			const offsetY = panelRect.top % pitch;

			buildDotGrid(pageDots, window.innerWidth, window.innerHeight);
			buildDotGrid(
				panelDots,
				panelRect.width + offsetX,
				panelRect.height + offsetY,
				offsetX,
				offsetY
			);
			colorPanelDots();
		}

		window.addEventListener('resize', buildAllDotGrids);
		logoImage.addEventListener('load', colorPanelDots);
		logoImage.src = logoSrc;
		buildAllDotGrids();

		return () => {
			window.removeEventListener('resize', buildAllDotGrids);
			logoImage.removeEventListener('load', colorPanelDots);
		};
	});

	let w = $state(0);
	let menuOpen = $state(false);
</script>

<svelte:window bind:innerWidth={w} />

<div class="byro-page min-h-screen">
	<div
		bind:this={pageDots}
		class="dot-grid fixed inset-0 z-0 grid gap-0.5 overflow-hidden"
		aria-hidden="true"
	></div>

	<header
		class="byro-header fixed top-4 left-1/2 z-10 flex w-11/12 -translate-x-1/2 items-center gap-2 rounded-xl bg-white/20 px-4 py-2 backdrop-blur-md sm:w-4/5 sm:gap-8"
	>
		<a
			class="brand mr-auto text-xl font-semibold text-inherit no-underline sm:text-2xl"
			href={resolve('/')}
		>
			Byro
		</a>
		{#if w >= 768}
			{#each navItems as item (item.href)}
				<a
					class="text-base font-semibold text-inherit no-underline decoration-(--accent) decoration-2 hover:underline hover:underline-offset-2"
					href={item.href}
				>
					{item.label}
				</a>
			{/each}
		{:else}
			<button class="ml-auto" onclick={() => (menuOpen = !menuOpen)}>
				<Menu size={20} />
			</button>
		{/if}
	</header>

	{#if menuOpen}
		<div
			class="byro-header fixed top-19 left-1/2 z-10 flex w-11/12 -translate-x-1/2 flex-col gap-2 rounded-lg p-4 text-lg"
		>
			{#each navItems as item (item.href)}
				<a
					class="w-full text-lg font-semibold no-underline hover:text-(--muted) hover:underline hover:underline-offset-2"
					href={item.href}
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}

	<main
		class="fixed top-0 bottom-0 left-1/2 z-1 grid h-svh w-4/5 -translate-x-1/2 grid-cols-1 content-center items-center gap-10 overflow-hidden py-7 sm:py-10 md:grid-cols-2 md:gap-16 md:py-14 xl:gap-26 xl:py-18"
	>
		<section class="w-full">
			<h1 class="m-0 w-max font-sans text-8xl leading-none font-medium tracking-normal md:text-9xl">
				byro
			</h1>
			<p
				class="mt-6 max-w-105 text-lg font-medium underline decoration-(--accent)/60 underline-offset-4 md:mt-8 md:text-2xl xl:mt-9 xl:text-3xl"
			>
				A cleaner workspace for briefs, drafts, and decisions.
			</p>
		</section>

		<section class="grid w-full min-w-0 items-center justify-items-center md:justify-items-end">
			<div bind:this={pixelCard} class="pixel-card relative overflow-hidden">
				<div
					bind:this={panelDots}
					class="dot-grid absolute z-1 grid gap-0.5"
					aria-hidden="true"
				></div>
			</div>
		</section>
	</main>

	<section class="h-screen w-screen" aria-hidden="true"></section>

	<div class="relative z-2 flex flex-col">
		{#each sections as section, index (section.id)}
			<section
				class={`landing-section flex min-h-[50dvh] w-full flex-col gap-3 rounded-t-3xl bg-white/20 px-6 pt-4 pb-15 shadow-2xl backdrop-blur-2xl sm:gap-5 sm:px-10 md:rounded-t-4xl md:px-20 md:pt-15 ${
					index === 0 ? '' : '-mt-5'
				}`}
				id={section.id}
			>
				{#if section.title !== 'Contact'}
					<h2
						class="m-0 flex w-full max-w-full items-center gap-3 font-sans text-3xl font-bold tracking-normal text-balance wrap-break-word whitespace-normal sm:text-4xl lg:text-5xl"
					>
						<span class="text-(--accent)">></span>
						{section.title}
					</h2>
				{/if}
				{#if section.title === 'Testimonials'}
					<p
						class="m-0 w-full max-w-none text-base font-medium text-(--muted) md:text-xl xl:text-2xl"
					>
						Managing the image of businesses. Results and ratings speak for themselves. Click a
						brand to see more.
					</p>
					<div class={`grid w-full gap-6 pt-6 sm:py-10 ${selectedBrand ? 'lg:grid-cols-3' : ''}`}>
						<div
							class={`relative flex min-h-[58dvh] w-full min-w-0 flex-col justify-center gap-7 overflow-hidden mask-[linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] sm:gap-10 lg:min-h-[60dvh] ${
								selectedBrand ? 'lg:col-span-2' : ''
							}`}
							aria-label="Client brand marquee"
						>
							{#each marqueeRows as row, rowIndex (row)}
								<div class="flex min-w-max overflow-visible">
									<div
										class={`flex min-w-max items-center gap-8 motion-reduce:animate-none sm:gap-12 ${
											rowIndex === 0
												? 'animate-[brand-marquee_26s_linear_infinite]'
												: 'animate-[brand-marquee-reverse_30s_linear_infinite]'
										}`}
									>
										{#each [...row, ...row] as brand, brandIndex (`${rowIndex}-${brand.name}-${brandIndex}`)}
											<button
												class={`cursor-pointer border-0 bg-transparent px-2 py-1 text-center font-sans text-4xl leading-none font-semibold whitespace-nowrap text-(--ink) no-underline transition duration-150 hover:-translate-y-1 hover:text-(--brand-accent) focus-visible:-translate-y-1 focus-visible:text-(--brand-accent) focus-visible:outline-0 sm:text-5xl lg:text-6xl ${
													selectedBrand?.name === brand.name ? 'text-(--brand-accent)' : ''
												}`}
												style={`--brand-accent: ${brand.color};`}
												aria-label={`Show ${brand.name} stats`}
												aria-pressed={selectedBrand?.name === brand.name}
												onclick={() => (selectedBrand = brand)}
											>
												{brand.name}
											</button>
										{/each}
									</div>
								</div>
							{/each}
						</div>

						{#if selectedBrand}
							<aside
								class="flex min-h-70 min-w-0 flex-col justify-between gap-6 lg:min-h-[70dvh] lg:py-2"
								style={`--brand-accent: ${selectedBrand.color};`}
							>
								<div class="grid gap-5">
									<div class="flex items-start justify-between gap-4">
										<div class="flex w-full min-w-0 items-center justify-between">
											<h3
												class="m-0 font-sans text-4xl leading-none font-bold wrap-break-word text-(--brand-accent) sm:text-5xl"
											>
												{selectedBrand.name}
											</h3>
											<button
												class="shrink-0 border-0 bg-transparent text-2xl text-(--muted) transition hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-(--accent) sm:text-3xl"
												aria-label="Close company stats"
												onclick={() => (selectedBrand = null)}
											>
												Close
											</button>
										</div>
									</div>

									<dl class="m-0 grid gap-3">
										{#each selectedBrand.stats as stat (stat.label)}
											<div class="border-t border-(--muted)/20 pt-3">
												<dt class="text-sm leading-tight font-bold text-(--muted)">
													{stat.label}
												</dt>
												<dd
													class="m-0 mt-1 text-3xl leading-none font-extrabold text-(--ink) sm:text-4xl"
												>
													{stat.value}
												</dd>
											</div>
										{/each}
									</dl>
								</div>

								<p class="m-0 text-base font-medium text-(--muted) md:text-lg">
									LinkedIn performance created through Byro-managed content and positioning.
								</p>
							</aside>
						{/if}
					</div>
				{:else if section.title === 'How it works'}
					<div class="flex h-full w-full flex-col md:grid md:grid-cols-2 xl:grid-cols-4">
						<div
							class="flex flex-col border-b border-(--muted)/40 pb-2 md:gap-1 md:border-r md:border-b-0 md:pr-3 xl:py-0"
						>
							<span class="text-lg font-medium md:text-xl">
								<span class="inline text-(--accent)">1.</span>
								Gathering info
							</span>
							<p class="text-(--muted)">{placeholder}</p>
						</div>
						<div
							class="flex flex-col border-b border-(--muted)/40 py-2 md:gap-1 md:border-b-0 md:pt-0 md:pl-3 xl:border-r xl:py-0 xl:pr-3"
						>
							<span class="text-lg font-medium md:text-xl">
								<span class="inline text-(--accent)">2.</span>
								Quick interviews
							</span>
							<p class="text-(--muted)">{placeholder}</p>
						</div>
						<div
							class="flex flex-col border-b border-(--muted)/40 py-2 md:gap-1 md:border-r md:border-b-0 md:pr-3 md:pb-0 xl:py-0 xl:pl-3"
						>
							<span class="text-lg font-medium md:text-xl">
								<span class="inline text-(--accent)">3.</span>
								A persona file
							</span>
							<p class="text-(--muted)">{placeholder}</p>
						</div>
						<div class="flex flex-col pt-2 md:gap-1 md:pl-3 xl:py-0">
							<span class="text-lg font-medium md:text-xl">
								<span class="inline text-(--accent)">4.</span>
								Posting and creating
							</span>
							<p class="text-(--muted)">{placeholder}</p>
						</div>
					</div>
				{:else if section.title === 'Pricing'}
					<div class="flex min-h-0 w-full flex-1 flex-col md:grid md:grid-cols-3">
						<div
							class="flex h-full flex-col gap-3 border-b border-(--muted)/40 py-4 pr-3 md:border-r md:border-b-0 md:py-0"
						>
							<span class="text-xl font-medium md:text-2xl">Small Start Up</span>
							<ul class="flex flex-col gap-1">
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">5-10 member teams</span>
								</li>
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">Something else</span>
								</li>
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">Even more stuff</span>
								</li>
							</ul>
							<button
								class="mt-auto w-full rounded-full border-2 border-(--accent) bg-(--accent) py-1 font-medium text-white hover:opacity-90"
							>
								XX€ / month
							</button>
						</div>
						<div
							class="flex h-full flex-col gap-3 border-b border-(--muted)/40 px-3 py-4 md:border-r md:border-b-0 md:py-0"
						>
							<span class="text-xl font-medium md:text-2xl">Large enterprise</span>
							<ul class="flex flex-col gap-1">
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">5-10 member teams</span>
								</li>
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">Something else</span>
								</li>
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">Even more stuff</span>
								</li>
							</ul>
							<button
								class="mt-auto w-full rounded-full border-2 border-(--accent) bg-(--accent) py-1 font-medium text-white hover:opacity-90"
							>
								XX€ / month
							</button>
						</div>
						<div class="flex h-full flex-col gap-3 pt-4 pb-0 pl-3 md:py-0">
							<span class="text-xl font-medium md:text-2xl">Something else</span>
							<ul class="flex flex-col gap-1">
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">5-10 member teams</span>
								</li>
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">Something else</span>
								</li>
								<li class="-ml-1 flex items-center">
									<Asterisk class="text-(--accent)" />
									<span class="text-lg md:text-xl">Even more stuff</span>
								</li>
							</ul>
							<button
								class="mt-auto w-full rounded-full border-2 border-(--accent) bg-(--accent) py-1 font-medium text-white hover:opacity-90"
							>
								Contact
							</button>
						</div>
					</div>
				{:else if section.title === 'Contact'}
					<footer class="flex h-full min-h-full flex-col justify-between gap-8 md:gap-10">
						<div class="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
							<div class="flex min-w-0 flex-col gap-5">
								<a
									class="m-0 w-max font-sans text-4xl leading-none font-medium tracking-normal text-inherit no-underline md:text-6xl"
									href={byroPath}
								>
									Byro
								</a>
								<p class="m-0 max-w-85 text-base font-medium text-(--muted) md:text-xl">
									A cleaner workspace for briefs, drafts, and decisions.
								</p>
								<a
									class="inline-flex w-max max-w-full items-center gap-2 font-semibold wrap-break-word text-(--ink) hover:opacity-80"
									href="mailto:hello@byro.example"
								>
									<Mail class="shrink-0 text-(--accent)" size={20} />
									hello@byro.example
								</a>
								<div class="flex flex-wrap gap-x-4 gap-y-2 pt-1">
									{#each socialLinks as socialLink (socialLink)}
										<a
											class="text-sm font-semibold text-(--muted) no-underline hover:text-(--accent) md:text-base"
											href="#contact"
										>
											{socialLink}
										</a>
									{/each}
								</div>
							</div>

							<div class="grid gap-6 sm:grid-cols-3">
								{#each footerColumns as column (column.title)}
									<nav class="min-w-0" aria-label={column.title}>
										<p class="m-0 text-xs font-bold tracking-normal text-(--accent) md:text-sm">
											{column.title}
										</p>
										<ul class="mt-3 flex list-none flex-col gap-2 p-0">
											{#each column.links as link (link)}
												<li>
													<a
														class="text-base font-medium text-(--ink) no-underline hover:text-(--accent) md:text-lg"
														href="#contact"
													>
														{link}
													</a>
												</li>
											{/each}
										</ul>
									</nav>
								{/each}
							</div>
						</div>

						<div
							class="flex flex-col gap-4 border-t border-(--muted)/30 py-4 text-sm font-medium text-(--muted) sm:flex-row sm:items-center"
						>
							<div class="flex items-center gap-3">
								<img src={byroLogoSrc} alt="Byro logo" class="aspect-square w-10 shrink-0" />
								<span>© 2026 Byro. All rights reserved.</span>
							</div>
						</div>
					</footer>
				{:else}
					<p
						class="m-0 w-full max-w-none text-base font-medium text-(--muted) md:text-xl xl:text-2xl"
					>
						{placeholder}
					</p>
				{/if}
			</section>
		{/each}
	</div>
</div>

<style>
	@font-face {
		font-family: 'Alcyone';
		src:
			url('/byro/alcyone-medium.woff2') format('woff2'),
			url('/byro/alcyone-medium.woff') format('woff');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Mg12';
		src:
			url('/byro/mg12-medium.woff2') format('woff2'),
			url('/byro/mg12-medium.woff') format('woff');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}

	:global(html),
	:global(body) {
		overscroll-behavior-y: none;
	}

	.byro-page {
		--paper: #ffffff;
		--ink: #11182b;
		--icon-paper: #f5f5f2;
		--muted: #666c76;
		--accent: #0ea5e9;
		--dot: rgb(17 24 43 / 0.2);
		--header-shadow: rgb(0 0 0 / 0.1);
		--section-shadow: rgb(0 0 0 / 0.35);
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		color: var(--ink);
		background-color: var(--paper);
	}

	.dot-grid {
		pointer-events: none;
	}

	.byro-header {
		box-shadow: var(--header-shadow) 0 4px 12px;
		border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
	}

	.landing-section {
		box-shadow: var(--section-shadow) 0 5px 15px;
	}

	@keyframes -global-brand-marquee {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-50%);
		}
	}

	@keyframes -global-brand-marquee-reverse {
		from {
			transform: translateX(-50%);
		}

		to {
			transform: translateX(0);
		}
	}
</style>

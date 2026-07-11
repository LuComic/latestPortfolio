<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { ArrowRight, Mail, Menu } from '@lucide/svelte';

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
		{ id: 'testimonials', label: 'Testimonials' },
		{ id: 'managing-your-image', label: 'What?' },
		{ id: 'how-it-works', label: 'How?' },
		{ id: 'founder-led-teams', label: 'Who?' },
		{ id: 'pricing', label: 'Pricing' },
		{ id: 'contact', label: 'Contact' }
	];

	const sections = [
		{ id: 'testimonials', title: 'Testimonials' },
		{ id: 'managing-your-image', title: 'Managing your image' },
		{ id: 'how-it-works', title: 'How it works' },
		{ id: 'founder-led-teams', title: "Who it's for" },
		{ id: 'founder-led-system', title: 'Built from hands-on work with founder-led B2B teams' },
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

	const heroDescription =
		'Byro helps founders and B2B teams create high-signal content for LinkedIn and X using their real voice, beliefs, and proof.';

	const howItWorksSteps = [
		{
			title: 'Persona research',
			agent: 'Input Agent',
			description: 'We read your interviews, posts and long-form to learn how you actually think.'
		},
		{
			title: 'Voice guide',
			agent: 'Voice Agent',
			description: 'Your tone, rhythm and rules - codified so every post sounds like you.'
		},
		{
			title: 'Positioning map',
			agent: 'Positioning Agent',
			description: 'Audience, beliefs, proof and pain points structured into one artifact.'
		},
		{
			title: 'Content creation',
			agent: 'Draft Agent',
			description: 'High-signal LinkedIn and X drafts, ready for you to review and approve.'
		},
		{
			title: 'Visual matching',
			agent: 'Visual Agent',
			description: 'The right visual snaps beside each draft - quote cards, proof, screenshots.'
		},
		{
			title: 'Feedback loop',
			agent: 'Review Agent',
			description: 'Your ratings refine the system, so every week reads more like you.'
		}
	];

	const howItWorksDesktopRailDotCount = 36;
	const howItWorksCompactRailDotCount = 24;
	const howItWorksStopPointSize = 1.5;

	const comparisonSteps = [
		{
			label: 'Credibility',
			withoutImage: resolveAsset('/byro/comparison/credibility-without.png'),
			withImage: resolveAsset('/byro/comparison/credibility-with.png'),
			without:
				'Plenty of teams have a strong product and real expertise, but their public presence does not show it.',
			with: 'Clear founder positioning and narrative make the team look as credible as the product actually is.'
		},
		{
			label: 'System',
			withoutImage: resolveAsset('/byro/comparison/system-without.png'),
			withImage: resolveAsset('/byro/comparison/system-with.png'),
			without:
				'Founder visibility stays chaotic: occasional posts, no system, and no clear narrative.',
			with: 'A repeatable system turns beliefs, proof, drafts, visuals, and review into a steady LinkedIn and X workflow.'
		},
		{
			label: 'Clarity',
			withoutImage: resolveAsset('/byro/comparison/clarity-without.png'),
			withImage: resolveAsset('/byro/comparison/clarity-with.png'),
			without:
				'People post on LinkedIn and X when they have time, without a shared plan, calendar, or review flow.',
			with: 'A shared content calendar gives the team clarity on what is planned, drafted, reviewed, and ready to publish.'
		}
	];

	const audienceCards = [
		{
			label: 'Primary fit',
			title: 'Early-stage B2B founders in Europe',
			description:
				'You need credibility and distribution more than a big brand campaign. Byro turns your expertise into a presence that compounds - week after week.'
		},
		{
			label: 'GTM teams',
			title: 'B2B SaaS GTM and marketing leaders',
			description: 'Founder-led presence that supports pipeline and hiring.'
		},
		{
			label: 'Agencies',
			title: 'Founder-led agencies and studios',
			description: 'Strong personal brands that help you close better clients.'
		}
	];

	const founderLedSystemCards = [
		{
			label: 'Grounded',
			title: 'Not theory, not borrowed playbooks.',
			description:
				'Byro is built from hands-on work running reputation and content systems for B2B founders.'
		},
		{
			label: 'Systematic',
			title: 'Pillars, narratives, and proof',
			description:
				'A repeatable system for turning what you know, believe, and can prove into consistent public signal.'
		},
		{
			label: 'Outcome',
			title: 'More signal per post',
			description:
				'Visibility designed to support the things founder-led teams actually need: sales, hiring, and fundraising.'
		}
	];

	const testimonialBrands = [
		{
			name: 'Northstar Labs',
			color: '#6d62f0',
			stats: [
				{ label: 'Qualified replies', value: '3.4x' },
				{ label: 'Weekly founder posts', value: '12' },
				{ label: 'Rating', value: '4.9/5' }
			]
		},
		{
			name: 'Vellum GTM',
			color: '#475569',
			stats: [
				{ label: 'Founder time saved', value: '7h/wk' },
				{ label: 'Approved drafts', value: '86%' },
				{ label: 'Rating', value: '4.8/5' }
			]
		},
		{
			name: 'Fjord SaaS',
			color: '#0f766e',
			stats: [
				{ label: 'Inbound lift', value: '2.1x' },
				{ label: 'Content lanes', value: '5' },
				{ label: 'Rating', value: '4.7/5' }
			]
		},
		{
			name: 'Orbit Studio',
			color: '#7c3aed',
			stats: [
				{ label: 'Review cycles', value: '6' },
				{ label: 'Posts approved', value: '91%' },
				{ label: 'Rating', value: '4.9/5' }
			]
		},
		{
			name: 'PipelineOS',
			color: '#2563eb',
			stats: [
				{ label: 'Narratives mapped', value: '9' },
				{ label: 'Proof points used', value: '34' },
				{ label: 'Rating', value: '4.8/5' }
			]
		},
		{
			name: 'Signal Foundry',
			color: '#db2777',
			stats: [
				{ label: 'Founder posts', value: '48' },
				{ label: 'Visuals matched', value: '31' },
				{ label: 'Rating', value: '4.6/5' }
			]
		},
		{
			name: 'Credo Works',
			color: '#111827',
			stats: [
				{ label: 'Positioning pillars', value: '6' },
				{ label: 'Draft approval', value: '88%' },
				{ label: 'Rating', value: '4.8/5' }
			]
		},
		{
			name: 'Arc B2B',
			color: '#ea580c',
			stats: [
				{ label: 'Proof-backed posts', value: '39' },
				{ label: 'Audience themes', value: '7' },
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
			const minLedColumns = window.innerWidth < 480 ? 28 : 42;
			const ledColumns = Math.max(minLedColumns, Math.floor((maxSize + dotGap) / pitch));
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
	let viewportHeight = $state(0);
	let scrollY = $state(0);
	let menuOpen = $state(false);
	let howItWorksSection: HTMLElement | undefined = $state();
	let managingYourImageSection: HTMLElement | undefined = $state();

	function setTrackedSection(node: HTMLElement, id: string) {
		if (id === 'how-it-works') howItWorksSection = node;
		if (id === 'managing-your-image') managingYourImageSection = node;

		return {
			update(nextId: string) {
				if (nextId === 'how-it-works') howItWorksSection = node;
				else if (howItWorksSection === node) howItWorksSection = undefined;

				if (nextId === 'managing-your-image') managingYourImageSection = node;
				else if (managingYourImageSection === node) managingYourImageSection = undefined;
			},
			destroy() {
				if (howItWorksSection === node) howItWorksSection = undefined;
				if (managingYourImageSection === node) managingYourImageSection = undefined;
			}
		};
	}

	function clamp(value: number, min = 0, max = 1) {
		return Math.min(Math.max(value, min), max);
	}

	function applyStepStopPoints(progress: number, stepCount: number, stopPointSize: number) {
		if (stepCount <= 1) return progress;

		const transitionStopPointCount = stepCount - 1;
		const stopPointCount = stepCount;
		const effectiveStopPointSize = Math.min(stopPointSize, 0.6 / stopPointCount);
		const totalStopPointSize = effectiveStopPointSize * stopPointCount;
		const scrollSegmentSize = (1 - totalStopPointSize) / stepCount;
		const progressSegmentSize = 1 / stepCount;
		let scrollCursor = effectiveStopPointSize;

		if (progress <= scrollCursor) return 0;

		for (let stepIndex = 0; stepIndex < stepCount; stepIndex += 1) {
			const segmentEnd = scrollCursor + scrollSegmentSize;
			const progressStart = stepIndex * progressSegmentSize;
			const progressEnd = Math.min((stepIndex + 1) * progressSegmentSize, 1);

			if (progress <= segmentEnd) {
				const segmentProgress = clamp((progress - scrollCursor) / scrollSegmentSize);
				return progressStart + segmentProgress * (progressEnd - progressStart);
			}

			scrollCursor = segmentEnd;

			if (stepIndex < transitionStopPointCount) {
				const stopPointEnd = scrollCursor + effectiveStopPointSize;

				if (progress <= stopPointEnd) return progressEnd;

				scrollCursor = stopPointEnd;
			}
		}

		return 1;
	}

	let rawHowItWorksScrollProgress = $derived.by(() => {
		if (!howItWorksSection || viewportHeight <= 0 || w <= 0) return 0;

		const currentScrollY = scrollY;
		const rect = howItWorksSection.getBoundingClientRect();
		const sectionScrollStart = currentScrollY + rect.top;
		const scrollableDistance = Math.max(rect.height - viewportHeight, 1);

		return clamp((currentScrollY - sectionScrollStart) / scrollableDistance);
	});

	let howItWorksScrollProgress = $derived(
		applyStepStopPoints(
			rawHowItWorksScrollProgress,
			howItWorksSteps.length,
			howItWorksStopPointSize
		)
	);

	let howItWorksActiveIndex = $derived(
		Math.min(
			howItWorksSteps.length - 1,
			Math.floor(Math.min(howItWorksScrollProgress, 0.999) * howItWorksSteps.length)
		)
	);

	let howItWorksRailDotCount = $derived(
		w > 0 && w < 1024 ? howItWorksCompactRailDotCount : howItWorksDesktopRailDotCount
	);

	let howItWorksRailDots = $derived(Array.from(Array(howItWorksRailDotCount).keys()));

	let howItWorksActiveDotIndex = $derived(
		Math.round(howItWorksScrollProgress * (howItWorksRailDotCount - 1))
	);

	let activeHowItWorksStep = $derived(howItWorksSteps[howItWorksActiveIndex] ?? howItWorksSteps[0]);

	let rawComparisonScrollProgress = $derived.by(() => {
		if (!managingYourImageSection || viewportHeight <= 0 || w < 1024) return 0;

		const currentScrollY = scrollY;
		const rect = managingYourImageSection.getBoundingClientRect();
		const sectionScrollStart = currentScrollY + rect.top;
		const scrollableDistance = Math.max(rect.height - viewportHeight, 1);

		return clamp((currentScrollY - sectionScrollStart) / scrollableDistance);
	});

	let comparisonScrollProgress = $derived(
		applyStepStopPoints(
			rawComparisonScrollProgress,
			comparisonSteps.length,
			howItWorksStopPointSize
		)
	);

	let comparisonActiveIndex = $derived(
		Math.min(
			comparisonSteps.length - 1,
			Math.floor(Math.min(comparisonScrollProgress, 0.999) * comparisonSteps.length)
		)
	);

	let activeComparisonStep = $derived(comparisonSteps[comparisonActiveIndex] ?? comparisonSteps[0]);

	let withByro = $state(true);
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={viewportHeight} bind:scrollY />

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
			{#each navItems as item (item.id)}
				<a
					class="text-base font-semibold text-inherit no-underline decoration-(--accent) decoration-2 hover:underline hover:underline-offset-2"
					href={`#${item.id}`}
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
			class="byro-header fixed top-19 left-1/2 z-10 flex w-11/12 -translate-x-1/2 flex-col gap-2 rounded-lg bg-white/20 px-4 py-2 text-lg backdrop-blur-md"
		>
			{#each navItems as item (item.id)}
				<a
					class="w-full text-lg font-semibold no-underline hover:text-(--muted) hover:underline hover:underline-offset-2"
					href={`#${item.id}`}
					onclick={() => (menuOpen = false)}
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}

	<main
		class="fixed top-0 bottom-0 left-1/2 z-1 grid h-svh w-4/5 -translate-x-1/2 grid-cols-1 content-start items-center gap-7 overflow-hidden pt-28 pb-6 sm:content-center sm:gap-10 sm:py-10 md:grid-cols-2 md:gap-16 md:py-14 xl:gap-26 xl:py-18"
	>
		<section class="flex w-full flex-col gap-5 md:gap-8 xl:gap-9">
			<h1
				class="m-0 max-w-155 font-sans text-4xl leading-none font-medium tracking-normal wrap-break-word sm:text-6xl lg:text-6xl xl:text-7xl"
			>
				Turn founder expertise into trust and inbound.
			</h1>
			<p
				class="m-0 max-w-135 text-base font-medium text-(--muted) sm:text-lg md:text-2xl xl:text-3xl"
			>
				{heroDescription}
			</p>
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
				<a
					class="inline-flex h-11 min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-(--ink) bg-(--ink) pr-4 pl-6 text-base font-medium text-white no-underline transition hover:opacity-90 sm:text-lg"
					href="mailto:hello@byro.example?subject=Book%20a%20Byro%20call"
				>
					Book a call
					<ArrowRight size={20} />
				</a>
				<a
					class="inline-flex h-11 items-center justify-center text-base font-medium text-(--accent) no-underline transition hover:opacity-80 sm:text-lg"
					href="#how-it-works"
				>
					How Byro works
				</a>
			</div>
		</section>

		<section
			class="hero-visual grid w-full min-w-0 items-center justify-items-center md:justify-items-end"
		>
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

	<div
		class="landing-section relative z-2 flex flex-col rounded-t-3xl bg-white/10 backdrop-blur-xl md:rounded-t-4xl"
	>
		{#each sections as section (section.id)}
			<section
				use:setTrackedSection={section.id}
				class={`flex w-full scroll-mt-15 flex-col ${
					section.title === 'How it works'
						? 'min-h-[340svh] lg:min-h-[340dvh]'
						: section.title === 'Managing your image'
							? 'min-h-[30dvh] gap-3 p-4 sm:gap-5 sm:px-10 sm:py-6 md:px-20 md:py-10 lg:min-h-[240dvh] lg:gap-0 lg:p-0'
							: 'min-h-[30dvh] gap-3 p-4 sm:gap-5 sm:px-10 sm:py-6 md:px-20 md:py-10'
				}`}
				id={section.id}
			>
				{#if section.title !== 'Contact' && section.title !== 'Managing your image' && section.title !== 'How it works'}
					<h2
						class="m-0 flex w-full max-w-full items-center gap-3 font-sans text-3xl font-bold wrap-break-word whitespace-normal sm:text-4xl lg:text-5xl"
					>
						<span class="text-(--accent)">></span>
						{section.title}
					</h2>
				{/if}
				{#if section.title === 'Testimonials'}
					<p
						class="m-0 w-full max-w-none text-base font-medium text-(--muted) md:text-xl xl:text-2xl"
					>
						Founder-led teams use Byro to turn real expertise into clearer public signal. Click a
						team to see more.
					</p>
					<div class={`grid w-full gap-6 py-16 sm:py-20 ${selectedBrand ? 'lg:grid-cols-3' : ''}`}>
						<div
							class={`relative flex min-h-[45dvh] w-full min-w-0 flex-col justify-center gap-7 overflow-hidden mask-[linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] sm:gap-10 ${
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
												class={`cursor-pointer border-0 bg-transparent px-2 py-1 text-center font-sans text-4xl leading-none font-semibold whitespace-nowrap text-(--ink) no-underline transition duration-150 hover:text-(--brand-accent) focus-visible:text-(--brand-accent) focus-visible:outline-0 sm:text-5xl lg:text-6xl ${
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
								class="flex min-h-[45vh] min-w-0 flex-col gap-6 lg:py-2"
								style={`--brand-accent: ${selectedBrand.color};`}
							>
								<div class="flex w-full min-w-0 items-center justify-between gap-4">
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

								<p class="m-0 mt-auto text-base font-medium text-(--muted) md:text-lg">
									LinkedIn performance created through Byro-managed content and positioning.
								</p>
							</aside>
						{/if}
					</div>
				{:else if section.title === 'Managing your image'}
					{#if w < 1024}
						<div class="flex min-h-0 flex-1 flex-col gap-3">
							<h2
								class="m-0 flex w-full max-w-full items-center gap-3 font-sans text-3xl font-bold wrap-break-word whitespace-normal sm:text-4xl lg:text-5xl"
							>
								<span class="text-(--accent)">></span>
								{#if withByro}
									With Byro
								{:else}
									Without Byro
								{/if}
							</h2>
							<div
								class="sticky top-19 z-9 flex w-full items-center gap-1 rounded-full bg-(--paper)/50 p-1 backdrop-blur-md"
							>
								<button
									class={`rounded-full p-1 ${withByro ? 'bg-(--accent) text-white' : 'text-(--ink)'}  w-full font-medium`}
									onclick={() => (withByro = true)}
								>
									With Byro
								</button>
								<button
									class={`rounded-full p-1 ${!withByro ? 'bg-(--accent) text-white' : 'text-(--ink)'}  w-full font-medium`}
									onclick={() => (withByro = false)}
								>
									Without Byro
								</button>
							</div>
							{#each comparisonSteps as comparisonStep (comparisonStep.label)}
								<div class="flex h-full w-full flex-col gap-2 rounded-lg bg-(--paper)/50 px-5 py-3">
									<img
										src={withByro ? comparisonStep.withImage : comparisonStep.withoutImage}
										alt={`${withByro ? 'With Byro' : 'Without Byro'} illustration for ${comparisonStep.label.toLowerCase()}`}
										class="aspect-video w-full rounded-md object-cover"
									/>
									<p class="m-0 text-base font-medium text-(--accent) md:text-lg">
										{comparisonStep.label}
									</p>
									<p class="w-full max-w-none text-base font-medium text-(--muted) md:text-xl">
										{withByro ? comparisonStep.with : comparisonStep.without}
									</p>
								</div>
							{/each}
						</div>
					{:else}
						<div
							class="sticky top-0 z-1 flex h-dvh w-full flex-col gap-5 overflow-hidden px-4 pt-24 pb-4 sm:px-10 sm:pb-6 md:px-20 md:pb-10"
						>
							<h2
								class="m-0 flex w-full max-w-full items-center gap-3 font-sans text-3xl font-bold wrap-break-word whitespace-normal sm:text-4xl lg:text-5xl"
							>
								<span class="text-(--accent)">></span>
								Managing your image
							</h2>

							<div class="flex w-full items-center justify-between gap-4">
								<p class="m-0 text-base font-medium text-(--accent) md:text-xl">
									{activeComparisonStep.label}
								</p>
								<div
									class="flex items-center gap-2"
									aria-label={`Comparison step ${comparisonActiveIndex + 1} of ${comparisonSteps.length}`}
								>
									{#each comparisonSteps as comparisonStep, stepIndex (comparisonStep.label)}
										<span
											class={`block h-2.5 rounded-full transition-all duration-200 motion-reduce:transition-none ${
												stepIndex === comparisonActiveIndex
													? 'w-2.5 bg-(--accent)'
													: 'w-2.5 bg-(--muted)/24'
											}`}
										></span>
									{/each}
								</div>
							</div>

							<div class="grid min-h-0 w-full flex-1 gap-6 lg:grid-cols-2 lg:items-stretch">
								<div
									class="flex min-h-70 w-full flex-col gap-5 rounded-lg bg-(--paper)/50 px-8 py-7 transition duration-200 motion-reduce:transition-none lg:min-h-96"
								>
									<img
										src={activeComparisonStep.withoutImage}
										alt={`Without Byro illustration for ${activeComparisonStep.label.toLowerCase()}`}
										class="aspect-video w-full rounded-md object-cover"
									/>
									<p class="m-0 w-full max-w-none text-2xl font-medium text-(--muted)">
										{activeComparisonStep.without}
									</p>
								</div>

								<div
									class="flex min-h-70 w-full flex-col gap-5 rounded-lg bg-(--paper)/50 px-8 py-7 transition duration-200 motion-reduce:transition-none lg:min-h-96"
								>
									<img
										src={activeComparisonStep.withImage}
										alt={`With Byro illustration for ${activeComparisonStep.label.toLowerCase()}`}
										class="aspect-video w-full rounded-md object-cover"
									/>
									<p class="m-0 w-full max-w-none text-2xl font-medium text-(--muted)">
										{activeComparisonStep.with}
									</p>
								</div>
							</div>
						</div>
					{/if}
				{:else if section.title === 'How it works'}
					<div
						class="sticky top-0 z-1 flex h-svh w-full flex-col gap-3 overflow-hidden px-4 pt-24 pb-4 sm:gap-5 sm:px-10 sm:pb-6 md:px-20 md:pb-10 lg:h-dvh"
					>
						<h2
							class="m-0 flex w-full max-w-full items-center gap-3 font-sans text-3xl font-bold wrap-break-word whitespace-normal sm:text-4xl lg:text-5xl"
						>
							<span class="text-(--accent)">></span>
							Inside the Byro system
						</h2>

						<div
							class="grid min-h-0 w-full flex-1 content-start items-start lg:grid-cols-2 lg:content-stretch lg:items-center lg:gap-16"
						>
							<div class="flex w-full items-center justify-center py-10 lg:py-0" aria-hidden="true">
								<div
									class="flex w-full items-center justify-between gap-1 py-1 lg:max-w-72 lg:flex-col lg:justify-center lg:gap-2"
								>
									{#each howItWorksRailDots as dotIndex (dotIndex)}
										<span
											class={`block aspect-square size-2.5 shrink-0 rounded-full transition duration-200 motion-reduce:transition-none sm:size-3 ${
												dotIndex <= howItWorksActiveDotIndex ? 'bg-(--accent)' : 'bg-(--muted)/24'
											}`}
										></span>
									{/each}
								</div>
							</div>

							<aside class="flex min-w-0 flex-col gap-4 lg:gap-6" aria-live="polite">
								<div class="flex w-full min-w-0 items-center justify-between gap-4">
									<h3
										class="m-0 font-sans text-4xl leading-none font-bold wrap-break-word text-(--ink) sm:text-5xl"
									>
										{activeHowItWorksStep.title}
									</h3>
									<span class="shrink-0 text-2xl leading-none font-bold text-(--muted) sm:text-3xl">
										Step {howItWorksActiveIndex + 1}
									</span>
								</div>

								<p class="m-0 font-medium text-(--accent) md:text-xl xl:text-2xl">
									{activeHowItWorksStep.agent}
								</p>

								<p
									class="m-0 w-full max-w-none text-base font-medium text-(--muted) md:text-xl xl:text-2xl"
								>
									{activeHowItWorksStep.description}
								</p>

								<div class="aspect-video w-full rounded-lg bg-slate-900"></div>
							</aside>
						</div>
					</div>
				{:else if section.id === 'founder-led-teams'}
					<p
						class="m-0 w-full max-w-none text-base font-medium text-(--muted) md:text-xl xl:text-2xl"
					>
						Built for founder-led teams that need credibility and distribution before they have a
						big brand campaign.
					</p>
					<div
						class="grid w-full gap-3 py-0 md:py-14 lg:grid-cols-3 lg:items-stretch lg:gap-6 lg:py-20"
					>
						{#each audienceCards as card (card.title)}
							<div
								class="flex min-h-70 flex-col justify-start gap-8 rounded-lg bg-(--paper)/50 px-8 py-7 lg:min-h-96"
							>
								<div class="flex flex-col gap-4">
									<p class="m-0 text-base font-medium text-(--accent) md:text-lg">
										{card.label}
									</p>
									<h3 class="m-0 text-3xl font-bold wrap-break-word text-(--ink) lg:text-4xl">
										{card.title}
									</h3>
								</div>
								<p class="m-0 text-lg font-medium text-(--muted) md:text-xl">
									{card.description}
								</p>
							</div>
						{/each}
					</div>
				{:else if section.id === 'founder-led-system'}
					<p
						class="m-0 w-full max-w-none text-base font-medium text-(--muted) md:text-xl xl:text-2xl"
					>
						Byro turns real expertise into a repeatable presence system - grounded in practical
						work, not generic content advice.
					</p>
					<div
						class="grid w-full gap-3 py-0 md:py-14 lg:grid-cols-3 lg:items-stretch lg:gap-6 lg:py-20"
					>
						{#each founderLedSystemCards as card (card.title)}
							<div
								class="flex min-h-70 flex-col justify-start gap-8 rounded-lg bg-(--paper)/50 px-8 py-7 lg:min-h-96"
							>
								<div class="flex flex-col gap-4">
									<p class="m-0 text-base font-medium text-(--accent) md:text-lg">
										{card.label}
									</p>
									<h3 class="m-0 text-3xl font-bold wrap-break-word text-(--ink) lg:text-4xl">
										{card.title}
									</h3>
								</div>
								<p class="m-0 text-lg font-medium text-(--muted) md:text-xl">
									{card.description}
								</p>
							</div>
						{/each}
					</div>
				{:else if section.title === 'Pricing'}
					<div
						class="flex min-h-0 w-full flex-1 items-center justify-center py-16 text-center md:py-20"
					>
						<div class="flex w-full max-w-3xl flex-col items-center gap-8">
							<h2
								class="m-0 max-w-2xl font-sans text-4xl leading-tight font-bold wrap-break-word text-(--ink) sm:text-5xl md:text-6xl"
							>
								Want Byro-level reputation for your team?
							</h2>

							<form
								class="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
								action="mailto:hello@byro.example?subject=Join%20the%20Byro%20mailing%20list"
								method="post"
								enctype="text/plain"
							>
								<label class="sr-only" for="pricing-email">Email address</label>
								<input
									id="pricing-email"
									name="email"
									type="email"
									required
									placeholder="Your email"
									class="h-11 min-h-11 flex-1 rounded-full border-2 border-(--muted)/40 bg-(--paper)/50 px-5 text-lg font-medium text-(--ink) transition outline-none placeholder:text-(--muted) focus:border-(--accent)"
								/>
								<button
									class="inline-flex h-12 min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-(--accent) bg-(--accent) pr-4 pl-6 text-lg font-medium text-white transition hover:opacity-90"
									type="submit"
								>
									Join mailing
									<ArrowRight size={20} />
								</button>
							</form>

							<p class="m-0 text-base font-medium text-(--muted) md:text-lg">
								Or
								<a
									class="font-semibold wrap-break-word text-(--accent) no-underline hover:opacity-80"
									href="mailto:hello@byro.example?subject=Byro%20early%20access"
								>
									email us for early access
								</a>.
							</p>
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
									{heroDescription}
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
					<p class="w-full max-w-none text-base font-medium text-(--muted) md:text-xl xl:text-2xl">
						{heroDescription}
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
		--ink: #0b111f;
		--icon-paper: #f5f5f2;
		--muted: #666c76;
		--accent: #6d62f0;
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
	}

	.landing-section {
		box-shadow: var(--section-shadow) 0 5px 15px;
	}

	@media (width < 480px) and (height < 720px) {
		.hero-visual {
			display: none;
		}
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

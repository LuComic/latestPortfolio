<script lang="ts">
	import { SquareArrowOutUpRight } from '@lucide/svelte';
	import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo
	title="About | Lukas Jääger"
	description="About page for Lukas Jääger's portfolio"
	keywords="portfolio, dev, lukas, jaager, coding"
/>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">About</h2>
<p class="text-base md:text-lg 2xl:text-xl">
	19yo university student based in Estonia. I'm constantly learning web development (mainly
	frontend) in my free time and learned Python in school <a
		href="/experience"
		class="text-(--purple-text) transition hover:text-(--purple-hover)">(Certificates)</a
	>. I also do track and field and am really interested in music.
	<br />
	<br />
	I have just finished 12th grade and will continue my studies at TalTech, studying Informatics and Artificial
	Intelligence.
	<a class="text-(--purple-text) transition hover:text-(--purple-hover)" href="/experience">
		Python programming
	</a>
	was provided as an elective course, which i took in 10th and 11th grade. At around the same time I became
	interested in web development, which led to the student business
	<a class="text-(--purple-text) transition hover:text-(--purple-hover)" href="/projects"
		>NoorteKunst</a
	>.
</p>

<nav aria-labelledby="check-out-next" class="mt-6 flex flex-col items-start justify-start gap-6">
	<h2 id="check-out-next" class="text-xl font-medium text-(--headings) md:text-2xl">
		Check out next
	</h2>
	<ul
		class="m-0 flex list-none flex-col items-start justify-start gap-2 p-0 text-base md:text-lg 2xl:text-xl"
	>
		<li>
			<a
				class="flex items-center justify-start gap-2 transition hover:text-(--purple-text)"
				href="/experience"
			>
				<SquareArrowOutUpRight class="text-(--headings)" size={20} />
				Experience
			</a>
		</li>
		<li>
			<a
				class="flex items-center justify-start gap-2 transition hover:text-(--purple-text)"
				href="/projects"
			>
				<SquareArrowOutUpRight class="text-(--headings)" size={20} />
				Projects
			</a>
		</li>
		<li>
			<a
				class="flex items-center justify-start gap-2 transition hover:text-(--purple-text)"
				href="/contact"
			>
				<SquareArrowOutUpRight class="text-(--headings)" size={20} />
				Contact
			</a>
		</li>
		<li>
			<a
				class="flex items-center justify-start gap-2 transition hover:text-(--purple-text)"
				href="/thoughts"
			>
				<SquareArrowOutUpRight class="text-(--headings)" size={20} />
				My thoughts
			</a>
		</li>
	</ul>
</nav>

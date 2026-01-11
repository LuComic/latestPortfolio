<script lang="ts">
	import { SquareArrowOutUpRight } from '@lucide/svelte';
</script>

<h2 class="text-xl font-medium text-(--headings) md:text-2xl">About</h2>
<p class="text-base md:text-lg 2xl:text-xl">
	Highscool student based in Estonia. I'm constantly learning web development, mainly frontend, in
	my free time but learned Python in school <a
		href="/experience"
		class="text-(--purple-text) transition hover:text-(--purple-hover)">(Certificates)</a
	>. I also do track and field and am really interested in music.
	<br />
	<br />
	I'm currently in 12th grade, studying at MURG (Mustamäe State Upper Secondary School). In middle school
	I studied at Tallinn's Kristiine's Gymnasium.
	<a class="text-(--purple-text) transition hover:text-(--purple-hover)" href="/experience">
		Python programming
	</a> was provided as an elective course, which i took in 10th and 11th grade.
</p>

<p class="mt-6 text-xl font-medium text-(--headings) md:text-2xl">Check out next</p>
<div class="flex flex-col items-start justify-start gap-2 text-base md:text-lg 2xl:text-xl">
	<a
		class="flex items-center justify-start gap-2 transition hover:text-(--purple-text)"
		href="/experience"
	>
		<SquareArrowOutUpRight class="text-(--headings)" size={20} />
		Experiences
	</a>
	<a
		class="flex items-center justify-start gap-2 transition hover:text-(--purple-text)"
		href="/experiences"
	>
		<SquareArrowOutUpRight class="text-(--headings)" size={20} />
		Projects
	</a>
	<a
		class="flex items-center justify-start gap-2 transition hover:text-(--purple-text)"
		href="/experiences"
	>
		<SquareArrowOutUpRight class="text-(--headings)" size={20} />
		Contact
	</a>
</div>

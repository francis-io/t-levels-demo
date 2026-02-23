<script lang="ts">
import type { Lesson } from '$lib/types/lessons';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();
</script>

<header class="rounded-xl border border-gray-200 bg-white p-5">
	<div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
		<span class="rounded-full bg-brand-navy/10 px-3 py-1 font-semibold text-brand-navy">{lesson.durationMins} mins</span>
		<span>{lesson.audience}</span>
	</div>
	<h1 class="mt-3 text-3xl font-display font-bold text-brand-navy tablet:text-4xl">{lesson.title}</h1>
	<div class="mt-5 grid gap-4 tablet:grid-cols-2">
		<section>
			<h2 class="text-base font-semibold text-brand-navy">Aims</h2>
			<ul class="mt-2 space-y-2 text-sm text-gray-700">
				{#each lesson.aims as aim}
					<li class="flex gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-brand-mint"></span><span>{aim}</span></li>
				{/each}
			</ul>
		</section>
		<section>
			<h2 class="text-base font-semibold text-brand-navy">Outcomes</h2>
			<ul class="mt-2 space-y-2 text-sm text-gray-700">
				{#each lesson.outcomes as outcome}
					<li class="flex gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-brand-cyan"></span><span>{outcome}</span></li>
				{/each}
			</ul>
		</section>
	</div>
</header>

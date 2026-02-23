<script lang="ts">
import type { Lesson } from '$lib/types/lessons';
import { writable } from 'svelte/store';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();
const index = writable(0);

const current = $derived(lesson.blocks[$index] ?? lesson.blocks[0]);

function previous() {
	if ($index > 0) {
		index.update((value) => value - 1);
	}
}

function next() {
	if ($index < lesson.blocks.length - 1) {
		index.update((value) => value + 1);
	}
}
</script>

<section class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Card deck carousel">
	<h2 class="text-xl font-semibold text-brand-navy">Card Deck Carousel</h2>
	{#if current}
		<article class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-5" aria-live="polite">
			<p class="text-xs font-semibold uppercase text-gray-500">Card {$index + 1} of {lesson.blocks.length}</p>
			<h3 class="mt-1 text-lg font-semibold text-brand-navy">{current.title}</h3>
			<p class="mt-2 text-sm text-gray-700">{current.teacherActions[0]}</p>
			<p class="mt-1 text-sm text-gray-600">{current.learnerActions[0]}</p>
		</article>
	{/if}
	<div class="mt-4 flex items-center gap-2">
		<button type="button" class="min-h-11 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold" onclick={previous}>Previous</button>
		<button type="button" class="min-h-11 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold" onclick={next}>Next</button>
	</div>
</section>

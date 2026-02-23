<script lang="ts">
import type { Lesson } from '$lib/types/lessons';
import { writable } from 'svelte/store';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();
const route = writable<'year1' | 'year2' | 'mixed'>('mixed');

function getRouteBullets(block: Lesson['blocks'][number]): string[] {
	if ($route === 'year1') {
		return block.differentiation?.year1 ?? block.learnerActions;
	}

	if ($route === 'year2') {
		return block.differentiation?.year2 ?? block.teacherActions;
	}

	return block.differentiation?.mixed ?? [...block.teacherActions, ...block.learnerActions];
}
</script>

<section class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Choose your route">
	<h2 class="text-xl font-semibold text-brand-navy">Choose-Your-Route</h2>
	<div class="mt-3 flex flex-wrap gap-2">
		<button type="button" onclick={() => route.set('year1')} class="rounded-full border px-3 py-2 text-xs font-semibold {$route === 'year1' ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-300'}">Year 1</button>
		<button type="button" onclick={() => route.set('year2')} class="rounded-full border px-3 py-2 text-xs font-semibold {$route === 'year2' ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-300'}">Year 2</button>
		<button type="button" onclick={() => route.set('mixed')} class="rounded-full border px-3 py-2 text-xs font-semibold {$route === 'mixed' ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-300'}">Mixed group</button>
	</div>
	<div class="mt-4 space-y-3">
		{#each lesson.blocks as block}
			<article class="rounded-lg border border-gray-200 p-3">
				<p class="text-xs font-semibold uppercase text-gray-500">{block.startMin}-{block.endMin} min</p>
				<h3 class="mt-1 font-semibold text-brand-navy">{block.title}</h3>
				<ul class="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-700">
					{#each getRouteBullets(block) as bullet}
						<li>{bullet}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

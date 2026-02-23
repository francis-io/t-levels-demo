<script lang="ts">
import type { Lesson } from '$lib/types/lessons';
import { writable } from 'svelte/store';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();
const activeBlockId = writable(lesson.blocks[0]?.id ?? '');

const activeBlock = $derived(
	lesson.blocks.find((block) => block.id === $activeBlockId) ?? lesson.blocks[0],
);
</script>

<section class="grid gap-4 rounded-xl border border-gray-200 bg-white p-5 tablet:grid-cols-[15rem_1fr]" aria-label="Split-screen classroom">
	<nav aria-label="Lesson phases" class="space-y-2">
		{#each lesson.blocks as block}
			<button
				type="button"
				onclick={() => activeBlockId.set(block.id)}
				class="w-full rounded-md border px-3 py-2 text-left text-sm {activeBlock?.id === block.id ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-200 bg-gray-50 text-gray-700'}"
			>
				{block.startMin}-{block.endMin} {block.title}
			</button>
		{/each}
	</nav>
	{#if activeBlock}
		<article>
			<h2 class="text-xl font-semibold text-brand-navy">{activeBlock.title}</h2>
			<div class="mt-3 grid gap-3 tablet:grid-cols-2">
				<section>
					<h3 class="text-sm font-semibold text-gray-900">Teacher actions</h3>
					<ul class="mt-1 list-disc space-y-1 pl-4 text-sm text-gray-700">
						{#each activeBlock.teacherActions as item}
							<li>{item}</li>
						{/each}
					</ul>
				</section>
				<section>
					<h3 class="text-sm font-semibold text-gray-900">Learner actions</h3>
					<ul class="mt-1 list-disc space-y-1 pl-4 text-sm text-gray-700">
						{#each activeBlock.learnerActions as item}
							<li>{item}</li>
						{/each}
					</ul>
				</section>
			</div>
		</article>
	{/if}
</section>

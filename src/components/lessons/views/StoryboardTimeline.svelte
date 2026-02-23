<script lang="ts">
import type { Lesson } from '$lib/types/lessons';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();
</script>

<section class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Storyboard timeline">
	<h2 class="text-xl font-semibold text-brand-navy">Storyboard Timeline</h2>
	<ol class="mt-4 space-y-4">
		{#each lesson.blocks as block}
			<li class="grid gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 tablet:grid-cols-[8rem_1fr]">
				<div class="text-sm font-semibold text-brand-navy">{block.startMin}-{block.endMin} min</div>
				<div>
					<h3 class="text-base font-semibold text-brand-navy">{block.title}</h3>
					<p class="mt-2 text-sm text-gray-700">{block.teacherActions[0]}</p>
					<p class="mt-1 text-sm text-gray-600">Learner focus: {block.learnerActions[0]}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

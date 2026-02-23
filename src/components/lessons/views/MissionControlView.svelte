<script lang="ts">
import type { Lesson } from '$lib/types/lessons';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();

const totalTeacherSteps = lesson.blocks.reduce(
	(count, block) => count + block.teacherActions.length,
	0,
);
const totalLearnerSteps = lesson.blocks.reduce(
	(count, block) => count + block.learnerActions.length,
	0,
);
</script>

<section class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Mission control dashboard">
	<h2 class="text-xl font-semibold text-brand-navy">Mission Control Dashboard</h2>
	<div class="mt-4 grid gap-3 tablet:grid-cols-3">
		<div class="rounded-lg bg-brand-navy p-3 text-white">
			<p class="text-xs uppercase">Total phases</p>
			<p class="text-2xl font-bold">{lesson.blocks.length}</p>
		</div>
		<div class="rounded-lg bg-brand-mint/20 p-3 text-brand-navy">
			<p class="text-xs uppercase">Teacher actions</p>
			<p class="text-2xl font-bold">{totalTeacherSteps}</p>
		</div>
		<div class="rounded-lg bg-brand-cyan/20 p-3 text-brand-navy">
			<p class="text-xs uppercase">Learner actions</p>
			<p class="text-2xl font-bold">{totalLearnerSteps}</p>
		</div>
	</div>
	<div class="mt-4 grid gap-3 tablet:grid-cols-2">
		{#each lesson.blocks as block}
			<article class="rounded-lg border border-gray-200 p-3">
				<p class="text-xs font-semibold uppercase text-gray-500">{block.startMin}-{block.endMin} min</p>
				<h3 class="mt-1 font-semibold text-brand-navy">{block.title}</h3>
				<p class="mt-2 text-sm text-gray-700">{block.outputs?.[0] ?? block.teacherActions[0]}</p>
			</article>
		{/each}
	</div>
</section>

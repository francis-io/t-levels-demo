<script lang="ts">
import type { Lesson } from '$lib/types/lessons';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();
</script>

<section class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Scrollytelling narrative">
	<h2 class="text-xl font-semibold text-brand-navy">Scrollytelling Narrative</h2>
	<div class="mt-4 grid gap-4 tablet:grid-cols-[1fr_16rem]">
		<div class="space-y-8">
			{#each lesson.blocks as block}
				<article class="rounded-lg border border-gray-100 bg-gray-50 p-4">
					<p class="text-xs font-semibold uppercase text-gray-500">{block.startMin}-{block.endMin} min</p>
					<h3 class="mt-1 text-base font-semibold text-brand-navy">{block.title}</h3>
					<p class="mt-2 text-sm text-gray-700">{block.teacherActions.join(' ')}</p>
				</article>
			{/each}
		</div>
		<aside class="tablet:sticky tablet:top-24 h-fit rounded-lg border border-gray-200 p-3">
			<h3 class="text-sm font-semibold text-brand-navy">Companion panel</h3>
			<p class="mt-2 text-xs text-gray-700">Reduced motion fallback is supported by global CSS preferences.</p>
		</aside>
	</div>
</section>

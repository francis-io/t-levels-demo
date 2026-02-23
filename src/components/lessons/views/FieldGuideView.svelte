<script lang="ts">
import type { Lesson } from '$lib/types/lessons';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();
</script>

<section class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Workshop field guide">
	<h2 class="text-xl font-semibold text-brand-navy">Workshop Field Guide</h2>
	<div class="mt-4 space-y-3">
		{#each lesson.blocks as block, index}
			<article class="rounded-lg border border-gray-200 p-4">
				<div class="flex items-center justify-between">
					<h3 class="font-semibold text-brand-navy">Step {index + 1}: {block.title}</h3>
					<span class="text-xs font-semibold text-gray-500">{block.startMin}-{block.endMin} min</span>
				</div>
				<ul class="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-700">
					{#each block.teacherActions as action}
						<li>{action}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

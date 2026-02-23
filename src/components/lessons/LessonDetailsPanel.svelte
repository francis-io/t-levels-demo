<script lang="ts">
import type { Lesson } from '$lib/types/lessons';

interface Props {
	lesson: Lesson;
	transcriptHref?: string;
}

const { lesson, transcriptHref = '#full-source-transcript' }: Props = $props();
</script>

<aside class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Lesson details panel">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-lg font-semibold text-brand-navy">Details</h2>
		<a href={transcriptHref} class="text-sm font-semibold text-brand-cyan hover:text-brand-navy">Full transcript</a>
	</div>

	<div class="space-y-4">
		{#each lesson.blocks as block}
			<section class="rounded-lg border border-gray-100 bg-gray-50 p-3">
				<div class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
					{block.startMin}-{block.endMin} min
				</div>
				<h3 class="text-sm font-semibold text-brand-navy">{block.title}</h3>
				<div class="mt-2 grid gap-2 text-xs text-gray-700">
					<div>
						<p class="font-semibold text-gray-900">Teacher actions</p>
						<ul class="list-disc pl-4">
							{#each block.teacherActions as action}
								<li>{action}</li>
							{/each}
						</ul>
					</div>
					<div>
						<p class="font-semibold text-gray-900">Learner actions</p>
						<ul class="list-disc pl-4">
							{#each block.learnerActions as action}
								<li>{action}</li>
							{/each}
						</ul>
					</div>
				</div>
			</section>
		{/each}
	</div>

	{#if lesson.placementLinks && lesson.placementLinks.length > 0}
		<section class="mt-4">
			<h3 class="text-sm font-semibold text-brand-navy">Placement links</h3>
			<ul class="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-700">
				{#each lesson.placementLinks as item}
					<li>{item}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if lesson.resources && lesson.resources.length > 0}
		<section class="mt-4">
			<h3 class="text-sm font-semibold text-brand-navy">Resources</h3>
			<ul class="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-700">
				{#each lesson.resources as item}
					<li>{item}</li>
				{/each}
			</ul>
		</section>
	{/if}
</aside>

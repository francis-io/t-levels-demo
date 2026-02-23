<script lang="ts">
import type { Pathway } from '../../lib/types/curriculum';
import TopicNode from './TopicNode.svelte';

interface Props {
	pathway: Pathway;
	featured?: boolean;
	compact?: boolean;
}

const { pathway, featured = false, compact = false }: Props = $props();

const href = $derived(`/curriculum?pathway=${pathway.id}`);
</script>

<a {href} class="block">
	<article
		data-featured={featured}
		class="
	    pathway-card rounded-xl transition-all duration-300 cursor-pointer
	    {compact
			? 'border-0 bg-transparent p-0 shadow-none'
			: featured
				? 'bg-white/95 p-6 border-2 border-brand-mint/70 shadow-[0_22px_45px_-28px_rgba(15,23,42,0.65)]'
				: 'bg-white/95 p-6 border border-slate-200 shadow-[0_15px_32px_-26px_rgba(15,23,42,0.65)]'}
	  "
	>
	{#if featured}
		<div class="mb-3">
			<span
				class="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-brand-mint text-brand-navy"
			>
				Start Here
			</span>
		</div>
	{/if}

	<h3 class="text-xl font-bold text-brand-navy">{pathway.title}</h3>
	<p class="mt-2 text-ink-700 {compact ? 'text-sm' : ''}">{pathway.description}</p>

	<div class="mt-4 flex items-center gap-2">
		<span class="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-sm text-ink-700">
			{pathway.videoCount} videos
		</span>
	</div>

	{#if !compact}
		<div class="mt-4 flex flex-wrap gap-2">
			{#each pathway.topics.slice(0, 5) as topic (topic.id)}
				<TopicNode {topic} size="sm" />
			{/each}
			{#if pathway.topics.length > 5}
				<span class="flex h-8 w-8 items-center justify-center text-xs text-gray-500">
					+{pathway.topics.length - 5}
				</span>
			{/if}
		</div>
	{/if}
</article>
</a>

<style>
	.pathway-card {
		transform-origin: center;
	}

	.pathway-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 18px 32px -22px rgba(15, 23, 42, 0.55);
	}

	article[data-featured='true']:hover {
		transform: translateY(-3px);
		box-shadow: 0 14px 26px -14px rgba(30, 27, 75, 0.45);
	}

	@media (prefers-reduced-motion: reduce) {
		.pathway-card:hover {
			transform: none;
		}
	}
</style>

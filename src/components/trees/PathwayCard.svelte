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
	    {compact ? 'border border-transparent bg-transparent p-0' : 'bg-white p-6'}
	    {featured ? 'border-2 border-brand-mint/50 shadow-lg shadow-brand-navy/10' : 'border border-gray-200 shadow-sm'}
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
	<p class="mt-2 text-gray-600 {compact ? 'text-sm' : ''}">{pathway.description}</p>

	<div class="mt-4 flex items-center gap-2">
		<span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-700">
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
		box-shadow: 0 10px 22px -14px rgba(30, 27, 75, 0.5);
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

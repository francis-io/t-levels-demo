<script lang="ts">
import type { Pathway } from '../../lib/types/curriculum';
import TopicNode from './TopicNode.svelte';

interface Props {
	pathway: Pathway;
	featured?: boolean;
}

const { pathway, featured = false }: Props = $props();

const href = $derived(`/curriculum?pathway=${pathway.id}`);
</script>

<a {href} class="block">
	<article
		class="
    pathway-card bg-white rounded-xl p-6 shadow-md transition-all duration-300 cursor-pointer
    {featured ? 'scale-105 glow-mint border-2 border-brand-mint' : 'border border-gray-200'}
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
	<p class="mt-2 text-gray-600">{pathway.description}</p>

	<div class="mt-4 flex items-center gap-2">
		<span class="inline-flex items-center px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
			{pathway.videoCount} videos
		</span>
	</div>

	<!-- Topic preview grid -->
	<div class="mt-4 flex flex-wrap gap-2">
		{#each pathway.topics.slice(0, 5) as topic (topic.id)}
			<TopicNode {topic} size="sm" />
		{/each}
		{#if pathway.topics.length > 5}
			<span class="w-8 h-8 flex items-center justify-center text-xs text-gray-500">
				+{pathway.topics.length - 5}
			</span>
		{/if}
	</div>
</article>
</a>

<style>
	.pathway-card {
		transform-origin: center;
	}

	.pathway-card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04),
			0 0 0 3px rgba(80, 232, 168, 0.2);
	}

	/* Featured card hover - slightly different since it's already scaled */
	.pathway-card.glow-mint:hover {
		transform: translateY(-8px) scale(1.08);
	}

	/* Respect reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.pathway-card:hover {
			transform: none;
		}
	}
</style>

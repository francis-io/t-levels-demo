<script lang="ts">
import type { Section } from '$lib/types/curriculum';
import TopicCard from '../trees/TopicCard.svelte';

interface Props {
	pathways: Section[];
}

const { pathways }: Props = $props();

// Get pathway ID from URL on client-side
let selectedPathwayId = $state<string | null>(null);

$effect(() => {
	if (typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);
		selectedPathwayId = params.get('pathway');
	}
});

const selectedPathway = $derived(
	selectedPathwayId ? pathways.find((p) => p.id === selectedPathwayId) : null,
);

const videoCount = $derived(
	selectedPathway?.topics.reduce((count, topic) => count + (topic.videos?.length ?? 0), 0) ?? 0,
);
</script>

{#if selectedPathway}
	<section class="py-16 tablet:py-20 bg-white">
		<div class="max-w-7xl mx-auto px-4 tablet:px-6">
			<div class="flex items-center justify-between mb-8">
				<div class="max-w-3xl">
					<div class="flex items-center gap-4 mb-4">
						<a
							href="/curriculum"
							class="inline-flex items-center gap-2 text-brand-navy hover:text-brand-mint transition-colors"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								></path>
							</svg>
							Back
						</a>
					</div>
					<h2 class="text-3xl tablet:text-4xl font-display font-bold text-brand-navy mb-4">
						{selectedPathway.title}
					</h2>
					<p class="text-lg text-gray-600">
						{selectedPathway.description}
					</p>
					<p class="text-sm text-brand-mint mt-2 font-medium">
						{videoCount} video{videoCount !== 1 ? 's' : ''} available
					</p>
				</div>
			</div>

			<div class="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
				{#each selectedPathway.topics as topic}
					<TopicCard {topic} showDescription={true} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<script lang="ts">
import type { Topic } from '../../lib/types/curriculum';

interface Props {
	topic: Topic;
	showDescription?: boolean;
}

const { topic, showDescription = true }: Props = $props();

const isActive = $derived(topic.status === 'active');
const isComingSoon = $derived(topic.status === 'coming-soon');
const href = $derived(`/curriculum/${topic.id}`);
const videoCount = $derived(topic.videos?.length ?? 0);
const hasVideo = $derived(videoCount > 0);
</script>

{#if isActive}
	<a {href} class="block">
		<article
			class="
        card-hover bg-white rounded-lg p-4 shadow-sm
        border-l-4 {hasVideo ? 'border-brand-mint' : 'border-gray-300'}
      "
		>
			<div class="flex items-start justify-between">
				<h3 class="font-semibold text-brand-navy">{topic.title}</h3>
				{#if hasVideo}
					<span
						class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-brand-mint text-brand-navy"
					>
						Play
					</span>
				{:else}
					<span
						class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-500"
					>
						No Video
					</span>
				{/if}
			</div>

			{#if showDescription && topic.description}
				<p class="mt-2 text-sm text-gray-600">{topic.description}</p>
			{/if}

			{#if hasVideo}
				<div class="mt-3 text-xs text-gray-500">
					{videoCount} video{videoCount > 1 ? 's' : ''}
				</div>
			{/if}
		</article>
	</a>
{:else}
	<article
		class="
      card-hover bg-white rounded-lg p-4 shadow-sm
      {isComingSoon ? 'opacity-60 cursor-default' : 'border-l-4 border-brand-cyan'}
    "
	>
		<div class="flex items-start justify-between">
			<h3 class="font-semibold text-brand-navy">{topic.title}</h3>
			{#if isComingSoon}
				<span
					class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-600"
				>
					Coming Soon
				</span>
			{/if}
		</div>

		{#if showDescription && topic.description}
			<p class="mt-2 text-sm text-gray-600">{topic.description}</p>
		{/if}
	</article>
{/if}

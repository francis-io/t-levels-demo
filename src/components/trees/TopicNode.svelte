<script lang="ts">
import type { Topic } from '../../lib/types/curriculum';

interface Props {
	topic: Topic;
	size?: 'sm' | 'md' | 'lg';
}

const { topic, size = 'md' }: Props = $props();

const sizeClasses: Record<string, string> = {
	sm: 'w-8 h-8',
	md: 'w-12 h-12',
	lg: 'w-16 h-16',
};

const hasVideo = $derived((topic.videos?.length ?? 0) > 0);

// Only show green/glow for topics with actual videos
const nodeClass = $derived(() => {
	if (topic.status === 'coming-soon') return 'bg-gray-200 cursor-not-allowed';
	if (hasVideo) return 'bg-brand-mint glow-mint cursor-pointer';
	return 'bg-gray-300 cursor-pointer'; // Active but no video
});

const href = $derived(`/curriculum/${topic.id}`);
</script>

<a
	{href}
	title={topic.title}
	class="
    inline-flex items-center justify-center rounded-full
    transition-transform duration-200 hover:scale-110
    {sizeClasses[size]}
    {nodeClass()}
  "
>
	{#if hasVideo}
		<!-- Play Icon -->
		<svg
			data-testid="play-icon"
			class="w-1/2 h-1/2 text-brand-navy"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M8 5v14l11-7z" />
		</svg>
	{:else if topic.status === 'coming-soon'}
		<!-- Lock Icon -->
		<svg
			data-testid="lock-icon"
			class="w-1/2 h-1/2 text-gray-400"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path
				d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
			/>
		</svg>
	{:else}
		<!-- Placeholder - just a circle indicator -->
		<span class="w-2 h-2 rounded-full bg-brand-cyan"></span>
	{/if}
</a>

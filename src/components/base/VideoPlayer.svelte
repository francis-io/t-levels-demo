<script lang="ts">
interface Props {
	videoId: string;
	title: string;
	autoplay?: boolean;
}

const { videoId, title, autoplay = false }: Props = $props();

let isPlaying = $state(false);
let isLoaded = $state(false);

const thumbnailUrl = $derived(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

const embedUrl = $derived(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);

function handlePlay() {
	isPlaying = true;
}

function handleLoad() {
	isLoaded = true;
}
</script>

<div class="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
	{#if isPlaying}
		<!-- YouTube iframe (loaded after click) -->
		<iframe
			src={embedUrl}
			{title}
			class="absolute inset-0 w-full h-full"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			onload={handleLoad}
		></iframe>
		{#if !isLoaded}
			<!-- Loading skeleton while iframe loads -->
			<div class="absolute inset-0 animate-pulse bg-gray-800"></div>
		{/if}
	{:else}
		<!-- Thumbnail with play button overlay -->
		<img
			src={thumbnailUrl}
			alt={title}
			class="absolute inset-0 w-full h-full object-cover"
			loading="lazy"
		/>

		<!-- Play button overlay -->
		<button
			type="button"
			onclick={handlePlay}
			class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
			aria-label="Play video: {title}"
		>
			<div
				class="w-16 h-16 tablet:w-20 tablet:h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
			>
				<svg
					class="w-6 h-6 tablet:w-8 tablet:h-8 text-brand-navy ml-1"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M8 5v14l11-7z" />
				</svg>
			</div>
		</button>

		<!-- Title overlay -->
		<div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
			<p class="text-white font-medium text-sm tablet:text-base">{title}</p>
		</div>
	{/if}
</div>

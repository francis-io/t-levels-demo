<script lang="ts">
import { onDestroy, onMount } from 'svelte';

interface Props {
	value: number;
	label: string;
	suffix?: string;
	duration?: number;
}

const { value, label, suffix = '', duration = 2000 }: Props = $props();

let displayValue = $state(value);
let hasAnimated = $state(false);
// biome-ignore lint/style/useConst: Svelte bind:this requires let
let element: HTMLDivElement | null = $state(null);
let observer: IntersectionObserver | null = null;

// Check for reduced motion preference
const prefersReducedMotion =
	typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function animateValue() {
	if (hasAnimated || prefersReducedMotion) {
		displayValue = value;
		return;
	}

	hasAnimated = true;
	const startTime = performance.now();
	const startValue = 0;
	const endValue = value;

	function update(currentTime: number) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);

		// Easing function (ease-out)
		const easeProgress = 1 - (1 - progress) ** 3;
		displayValue = Math.round(startValue + (endValue - startValue) * easeProgress);

		if (progress < 1) {
			requestAnimationFrame(update);
		} else {
			displayValue = endValue;
		}
	}

	requestAnimationFrame(update);
}

onMount(() => {
	if (!element) return;

	// If reduced motion or no IntersectionObserver, show value immediately
	if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
		displayValue = value;
		return;
	}

	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !hasAnimated) {
					animateValue();
				}
			}
		},
		{ threshold: 0.1 },
	);

	observer.observe(element);
});

onDestroy(() => {
	if (observer && element) {
		observer.unobserve(element);
		observer.disconnect();
	}
});
</script>

<div bind:this={element} class="text-center">
	<p class="text-4xl tablet:text-5xl font-display font-bold text-brand-navy">
		{displayValue}{#if suffix}<span>{suffix}</span>{/if}
	</p>
	<p class="mt-1 text-xs uppercase tracking-[0.14em] text-ink-500 tablet:text-sm">{label}</p>
</div>

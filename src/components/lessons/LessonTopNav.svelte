<script lang="ts">
import { type ViewMode, viewModes } from '$lib/types/lessons';
import { tick } from 'svelte';

interface Props {
	lessonTitle: string;
	activeView: ViewMode;
	onViewChange?: (view: ViewMode) => void;
	onPrint?: () => void;
	onCopyLink?: () => void;
	onResetView?: () => void;
}

const { lessonTitle, activeView, onViewChange, onPrint, onCopyLink, onResetView }: Props = $props();

const labels: Record<ViewMode, string> = {
	storyboard: 'Storyboard',
	'split-screen': 'Split-Screen',
	'mission-control': 'Mission Control',
	route: 'Route',
	simulator: 'Simulator',
	'field-guide': 'Field Guide',
	'card-deck': 'Card Deck',
	scrollytelling: 'Scrollytelling',
};

const modes = viewModes;

function selectView(view: ViewMode) {
	onViewChange?.(view);
}

function focusModeByIndex(index: number) {
	const clamped = Math.max(0, Math.min(index, modes.length - 1));
	const mode = modes[clamped];
	const target = document.querySelector<HTMLButtonElement>(`button[data-mode='${mode}']`);
	target?.focus();
}

function handleKeydown(event: KeyboardEvent) {
	const currentIndex = modes.indexOf(activeView);

	if (event.key === 'ArrowRight') {
		event.preventDefault();
		focusModeByIndex(currentIndex + 1);
		return;
	}

	if (event.key === 'ArrowLeft') {
		event.preventDefault();
		focusModeByIndex(currentIndex - 1);
		return;
	}

	if (event.key === 'Home') {
		event.preventDefault();
		focusModeByIndex(0);
		return;
	}

	if (event.key === 'End') {
		event.preventDefault();
		focusModeByIndex(modes.length - 1);
		return;
	}

	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		const target = event.target as HTMLButtonElement;
		const nextView = target.dataset.mode as ViewMode | undefined;
		if (nextView) {
			selectView(nextView);
		}
	}
}

$effect(() => {
	void tick().then(() => {
		const target = document.querySelector<HTMLButtonElement>(`button[data-mode='${activeView}']`);
		if (target && typeof target.scrollIntoView === 'function') {
			target.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
		}
	});
});
</script>

<div class="sticky z-40 border-b border-gray-200 bg-white/95 backdrop-blur" style="top: var(--header-height, 80px);">
	<div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 tablet:flex-row tablet:items-center tablet:justify-between">
		<p class="truncate text-sm font-semibold text-brand-navy">{lessonTitle}</p>

		<div class="flex items-center gap-2 overflow-auto" role="tablist" aria-label="Lesson view switcher" tabindex="0" onkeydown={handleKeydown}>
			{#each modes as mode}
				<button
					type="button"
					role="tab"
					data-mode={mode}
					id={`lesson-tab-${mode}`}
					aria-selected={activeView === mode}
					aria-controls={`lesson-panel-${mode}`}
					tabindex={activeView === mode ? 0 : -1}
					onclick={() => selectView(mode)}
					class="min-h-11 whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition-colors {activeView === mode
						? 'border-brand-navy bg-brand-navy text-white'
						: 'border-gray-300 bg-white text-gray-700 hover:border-brand-cyan hover:text-brand-navy'}"
				>
					{labels[mode]}
				</button>
			{/each}
		</div>

		<div class="flex items-center gap-2 text-xs font-semibold">
			<button type="button" class="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:text-brand-navy" onclick={() => onPrint?.()}>Print</button>
			<button type="button" class="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:text-brand-navy" onclick={() => onCopyLink?.()}>Copy link</button>
			<button type="button" class="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:text-brand-navy" onclick={() => onResetView?.()}>Reset view</button>
		</div>
	</div>
</div>

<script lang="ts">
import type { Lesson, ViewMode } from '$lib/types/lessons';
import { trackLessonEvent } from '$lib/utils/lessons/analytics';
import { isValidViewMode, resolveInitialViewMode } from '$lib/utils/lessons/viewState';
import FullSourceTranscript from './FullSourceTranscript.svelte';
import LessonDetailsPanel from './LessonDetailsPanel.svelte';
import LessonMetaHeader from './LessonMetaHeader.svelte';
import LessonTopNav from './LessonTopNav.svelte';

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();

let activeView = $state<ViewMode>('storyboard');
let announcement = $state('View changed to Storyboard.');

const modeLabels: Record<ViewMode, string> = {
	storyboard: 'Storyboard Timeline',
	'split-screen': 'Split-Screen Classroom',
	'mission-control': 'Mission Control',
	route: 'Choose-Your-Route',
	simulator: 'Simulator',
	'field-guide': 'Workshop Field Guide',
	'card-deck': 'Card Deck',
	scrollytelling: 'Scrollytelling',
};

function updateUrl(nextView: ViewMode, replace = false) {
	const url = new URL(window.location.href);
	url.searchParams.set('view', nextView);
	const method = replace ? 'replaceState' : 'pushState';
	window.history[method](window.history.state, '', url.toString());
}

function persistView(nextView: ViewMode) {
	window.localStorage.setItem(`lesson-view:${lesson.slug}`, nextView);
}

function changeView(nextView: ViewMode, replace = false) {
	if (nextView === activeView) {
		return;
	}

	const previous = activeView;
	activeView = nextView;
	announcement = `View changed to ${modeLabels[nextView]}.`;
	updateUrl(nextView, replace);
	persistView(nextView);
	trackLessonEvent('lesson_mode_changed', {
		slug: lesson.slug,
		from_mode: previous,
		to_mode: nextView,
	});
}

function handleCopyLink() {
	const url = window.location.href;
	if (window.navigator.clipboard) {
		void window.navigator.clipboard.writeText(url);
	}
	trackLessonEvent('lesson_copy_link_clicked', { slug: lesson.slug, mode: activeView });
}

function handlePrint() {
	window.print();
	trackLessonEvent('lesson_print_clicked', { slug: lesson.slug, mode: activeView });
}

function normalizeInitialView() {
	const url = new URL(window.location.href);
	const queryView = url.searchParams.get('view');
	const storedView = window.localStorage.getItem(`lesson-view:${lesson.slug}`);
	const resolved = resolveInitialViewMode({ queryView, storedView, defaultView: 'storyboard' });
	activeView = resolved;
	persistView(resolved);

	if (!isValidViewMode(queryView) || queryView !== resolved) {
		updateUrl(resolved, true);
	}
	announcement = `View changed to ${modeLabels[resolved]}.`;
}

function onTranscriptOpened() {
	trackLessonEvent('lesson_transcript_opened', { slug: lesson.slug, mode: activeView });
}

let initialized = false;

$effect(() => {
	if (typeof window === 'undefined' || initialized) {
		return;
	}

	initialized = true;
	normalizeInitialView();
	trackLessonEvent('lesson_opened', { slug: lesson.slug, mode: activeView });
});
</script>

<LessonTopNav
	lessonTitle={lesson.title}
	activeView={activeView}
	onViewChange={(view) => changeView(view)}
	onPrint={handlePrint}
	onCopyLink={handleCopyLink}
/>

<div class="mx-auto mt-4 grid max-w-7xl gap-4 px-4 desktop:grid-cols-[1fr_22rem]" role="tabpanel" id={`lesson-panel-${activeView}`} aria-labelledby={`lesson-tab-${activeView}`}>
	<div class="space-y-4">
		<LessonMetaHeader {lesson} />

		{#if activeView === 'storyboard'}
			{#await import('./views/StoryboardTimeline.svelte')}
				<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
					<div class="skeleton h-4 w-40"></div>
					<div class="mt-4 space-y-3">
						<div class="skeleton h-16 w-full"></div>
						<div class="skeleton h-16 w-full"></div>
						<div class="skeleton h-16 w-full"></div>
					</div>
				</section>
			{:then module}
				<module.default {lesson} />
			{/await}
		{:else if activeView === 'split-screen'}
			{#await import('./views/SplitScreenView.svelte')}
				<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
					<div class="skeleton h-4 w-40"></div>
					<div class="mt-4 grid gap-3 tablet:grid-cols-2">
						<div class="skeleton h-48 w-full"></div>
						<div class="skeleton h-48 w-full"></div>
					</div>
				</section>
			{:then module}
				<module.default {lesson} />
			{/await}
		{:else if activeView === 'route'}
			{#await import('./views/ChooseRouteView.svelte')}
				<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
					<div class="skeleton h-4 w-40"></div>
					<div class="mt-4 grid gap-3">
						<div class="skeleton h-20 w-full"></div>
						<div class="skeleton h-20 w-full"></div>
					</div>
				</section>
			{:then module}
				<module.default {lesson} />
			{/await}
		{:else if activeView === 'field-guide'}
			{#await import('./views/FieldGuideView.svelte')}
				<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
					<div class="skeleton h-4 w-40"></div>
					<div class="mt-4 space-y-3">
						<div class="skeleton h-10 w-full"></div>
						<div class="skeleton h-10 w-full"></div>
						<div class="skeleton h-10 w-full"></div>
					</div>
				</section>
			{:then module}
				<module.default {lesson} />
			{/await}
		{:else if activeView === 'mission-control'}
			<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
				<div class="skeleton h-4 w-40"></div>
				<p class="mt-4 text-sm text-gray-700">
					Mission Control mode is being prepared. Use Storyboard or Split-Screen for delivery right now.
				</p>
			</section>
		{:else if activeView === 'simulator'}
			<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
				<div class="skeleton h-4 w-40"></div>
				<p class="mt-4 text-sm text-gray-700">
					Simulator mode is being prepared. Use Route or Field Guide for interactive lesson flow.
				</p>
			</section>
		{:else if activeView === 'card-deck'}
			<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
				<div class="skeleton h-4 w-40"></div>
				<p class="mt-4 text-sm text-gray-700">
					Card Deck mode is being prepared. Use Storyboard for structured step-by-step sequencing.
				</p>
			</section>
		{:else if activeView === 'scrollytelling'}
			<section class="rounded-xl border border-gray-200 bg-white p-5" aria-live="polite">
				<div class="skeleton h-4 w-40"></div>
				<p class="mt-4 text-sm text-gray-700">
					Scrollytelling mode is being prepared. Use Split-Screen for guided narrative delivery.
				</p>
			</section>
		{/if}

		<FullSourceTranscript title={lesson.title} markdown={lesson.fullSourceMarkdown} onOpened={onTranscriptOpened} />
	</div>

	<div class="desktop:sticky desktop:top-[9rem] h-fit">
		<LessonDetailsPanel {lesson} />
	</div>
</div>

<p class="sr-only" aria-live="polite">{announcement}</p>

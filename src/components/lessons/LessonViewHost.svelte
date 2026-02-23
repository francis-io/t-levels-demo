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
	route: 'Choose-Your-Route',
	'field-guide': 'Workshop Field Guide',
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

<div class="mx-auto mt-4 grid max-w-7xl gap-4 px-4 tablet:grid-cols-[1fr_24rem]" role="tabpanel" id={`lesson-panel-${activeView}`} aria-labelledby={`lesson-tab-${activeView}`}>
	<div class="space-y-4">
		<LessonMetaHeader {lesson} />

		{#if activeView === 'storyboard'}
			{#await import('./views/StoryboardTimeline.svelte') then module}
				<module.default {lesson} />
			{/await}
		{:else if activeView === 'split-screen'}
			{#await import('./views/SplitScreenView.svelte') then module}
				<module.default {lesson} />
			{/await}
		{:else if activeView === 'route'}
			{#await import('./views/ChooseRouteView.svelte') then module}
				<module.default {lesson} />
			{/await}
		{:else if activeView === 'field-guide'}
			{#await import('./views/FieldGuideView.svelte') then module}
				<module.default {lesson} />
			{/await}
		{/if}

		<FullSourceTranscript title={lesson.title} markdown={lesson.fullSourceMarkdown} onOpened={onTranscriptOpened} />
	</div>

	<div class="tablet:sticky tablet:top-[9rem] h-fit">
		<LessonDetailsPanel {lesson} />
	</div>
</div>

<p class="sr-only" aria-live="polite">{announcement}</p>

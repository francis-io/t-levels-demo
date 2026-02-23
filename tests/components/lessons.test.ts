import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import LessonViewHost from '../../src/components/lessons/LessonViewHost.svelte';
import { lessonsBySlug } from '../../src/lib/data/lessons';

describe('Lessons integration', () => {
	beforeEach(() => {
		window.localStorage.clear();
		window.history.replaceState({}, '', '/lessons/lean-5s');
	});

	it('renders all 8 mode tabs', async () => {
		render(LessonViewHost, { props: { lesson: lessonsBySlug['lean-5s'] } });

		await waitFor(() => {
			expect(screen.getAllByRole('tab')).toHaveLength(8);
		});
	});

	it('normalizes missing view to storyboard in URL', async () => {
		render(LessonViewHost, { props: { lesson: lessonsBySlug['lean-5s'] } });

		await waitFor(() => {
			expect(new URL(window.location.href).searchParams.get('view')).toBe('storyboard');
		});
	});

	it('falls back invalid query view to storyboard', async () => {
		window.history.replaceState({}, '', '/lessons/lean-5s?view=invalid');
		render(LessonViewHost, { props: { lesson: lessonsBySlug['lean-5s'] } });

		await waitFor(() => {
			expect(new URL(window.location.href).searchParams.get('view')).toBe('storyboard');
		});
	});

	it('updates URL when switching mode', async () => {
		render(LessonViewHost, { props: { lesson: lessonsBySlug['lean-5s'] } });

		const missionControl = await screen.findByRole('tab', { name: /mission control/i });
		await fireEvent.click(missionControl);

		await waitFor(() => {
			expect(new URL(window.location.href).searchParams.get('view')).toBe('mission-control');
		});
	});

	it('shows full source transcript content', async () => {
		render(LessonViewHost, { props: { lesson: lessonsBySlug['lean-5s'] } });

		const summary = await screen.findByText(/full source transcript/i);
		await fireEvent.click(summary);

		await waitFor(() => {
			expect(
				screen.getByText(/Lean manufacturing lesson plan 55 mins -- suggestion/),
			).toBeInTheDocument();
		});
	});
});

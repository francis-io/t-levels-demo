import { describe, expect, it } from 'vitest';
import { isValidViewMode, resolveInitialViewMode } from '../../src/lib/utils/lessons/viewState';

describe('Lesson view state resolver', () => {
	it('prioritizes URL query view when valid', () => {
		const mode = resolveInitialViewMode({
			queryView: 'split-screen',
			storedView: 'route',
			defaultView: 'storyboard',
		});

		expect(mode).toBe('split-screen');
	});

	it('falls back to localStorage view when query is invalid', () => {
		const mode = resolveInitialViewMode({
			queryView: 'invalid-mode',
			storedView: 'field-guide',
			defaultView: 'storyboard',
		});

		expect(mode).toBe('field-guide');
	});

	it('falls back to default when neither query nor storage are valid', () => {
		const mode = resolveInitialViewMode({
			queryView: null,
			storedView: 'not-a-real-view',
			defaultView: 'storyboard',
		});

		expect(mode).toBe('storyboard');
	});

	it('validates known view mode values', () => {
		expect(isValidViewMode('route')).toBe(true);
		expect(isValidViewMode('mission-control')).toBe(false);
		expect(isValidViewMode('bad')).toBe(false);
	});
});

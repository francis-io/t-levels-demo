import { describe, expect, it } from 'vitest';
import { lessons } from '../../src/lib/data/lessons';
import { validateAllLessonsCoverage } from '../../src/lib/utils/lessons/contentCoverage';

describe('Lessons source coverage', () => {
	it('reports 100% coverage for both lesson sources', () => {
		const results = validateAllLessonsCoverage(lessons);
		expect(results).toHaveLength(2);

		for (const result of results) {
			expect(result.isComplete).toBe(true);
			expect(result.missingLines).toHaveLength(0);
			expect(result.coveragePercent).toBe(100);
		}
	});
});

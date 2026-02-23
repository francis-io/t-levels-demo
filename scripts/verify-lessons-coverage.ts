import { lessons } from '../src/lib/data/lessons.ts';
import { validateAllLessonsCoverage } from '../src/lib/utils/lessons/contentCoverage.ts';

const results = validateAllLessonsCoverage(lessons);
const failing = results.filter((result) => !result.isComplete);

for (const result of results) {
	const status = result.isComplete ? 'PASS' : 'FAIL';
	console.log(
		`[${status}] ${result.slug} (${result.file}) ${result.coveredLineCount}/${result.sourceLineCount} (${result.coveragePercent.toFixed(2)}%)`,
	);

	if (!result.isComplete) {
		console.log(`  Missing lines: ${result.missingLines.join(', ')}`);
	}
}

if (failing.length > 0) {
	process.exit(1);
}

import type { Lesson, SourceFile } from '../../types/lessons';

function getNonEmptySourceLines(markdown: string): Set<number> {
	const nonEmpty = new Set<number>();
	const lines = markdown.split(/\r?\n/);

	for (let index = 0; index < lines.length; index += 1) {
		if (lines[index].trim().length > 0) {
			nonEmpty.add(index + 1);
		}
	}

	return nonEmpty;
}

function getCoveredLines(lesson: Lesson, file: SourceFile): Set<number> {
	const covered = new Set<number>();
	const blockRefs = lesson.blocks.flatMap((block) => block.sourceRefs);
	const refs = [...blockRefs, ...lesson.fullSourceRefs].filter((ref) => ref.file === file);

	for (const ref of refs) {
		for (let line = ref.lineStart; line <= ref.lineEnd; line += 1) {
			covered.add(line);
		}
	}

	return covered;
}

export interface LessonCoverageResult {
	slug: Lesson['slug'];
	file: SourceFile;
	sourceLineCount: number;
	coveredLineCount: number;
	missingLines: number[];
	coveragePercent: number;
	isComplete: boolean;
}

export function validateLessonCoverage(lesson: Lesson): LessonCoverageResult {
	const file = lesson.fullSourceRefs[0]?.file;

	if (!file) {
		return {
			slug: lesson.slug,
			file: 'lesson-plan-1.md',
			sourceLineCount: 0,
			coveredLineCount: 0,
			missingLines: [],
			coveragePercent: 100,
			isComplete: true,
		};
	}

	const sourceLines = getNonEmptySourceLines(lesson.fullSourceMarkdown);
	const coveredLines = getCoveredLines(lesson, file);
	const missingLines = Array.from(sourceLines).filter((line) => !coveredLines.has(line));
	const sourceLineCount = sourceLines.size;
	const coveredLineCount = sourceLineCount - missingLines.length;
	const coveragePercent = sourceLineCount === 0 ? 100 : (coveredLineCount / sourceLineCount) * 100;

	return {
		slug: lesson.slug,
		file,
		sourceLineCount,
		coveredLineCount,
		missingLines,
		coveragePercent,
		isComplete: missingLines.length === 0,
	};
}

export function validateAllLessonsCoverage(lessons: Lesson[]): LessonCoverageResult[] {
	return lessons.map((lesson) => validateLessonCoverage(lesson));
}

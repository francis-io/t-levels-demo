import { lessonSlugs, lessons, lessonsBySlug } from '../../data/lessons';
import type { Lesson, LessonSlug } from '../../types/lessons';

export function getLessons(): Lesson[] {
	return lessons;
}

export function getLessonSlugs(): LessonSlug[] {
	return lessonSlugs;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
	if (slug === 'lean-5s' || slug === 'lean-8-wastes-walk') {
		return lessonsBySlug[slug];
	}

	return undefined;
}

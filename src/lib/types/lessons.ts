export const viewModes = [
	'storyboard',
	'split-screen',
	'mission-control',
	'route',
	'simulator',
	'field-guide',
	'card-deck',
	'scrollytelling',
] as const;

export type ViewMode = (typeof viewModes)[number];

export type LessonSlug = 'lean-5s' | 'lean-8-wastes-walk';

export type SourceFile = 'lesson-plan-1.md' | 'lesson-plan-2.md';

export interface SourceRef {
	file: SourceFile;
	lineStart: number;
	lineEnd: number;
}

export interface LessonBlock {
	id: string;
	title: string;
	startMin: number;
	endMin: number;
	teacherActions: string[];
	learnerActions: string[];
	outputs?: string[];
	differentiation?: {
		year1?: string[];
		year2?: string[];
		mixed?: string[];
	};
	sourceRefs: SourceRef[];
}

export interface Lesson {
	slug: LessonSlug;
	title: string;
	durationMins: number;
	audience: string;
	aims: string[];
	outcomes: string[];
	blocks: LessonBlock[];
	placementLinks?: string[];
	resources?: string[];
	fullSourceMarkdown: string;
	fullSourceRefs: SourceRef[];
}

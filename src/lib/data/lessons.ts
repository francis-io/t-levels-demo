import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Lesson, LessonSlug, SourceFile, SourceRef } from '../types/lessons';

function readSource(file: SourceFile): string {
	const sourcePath = resolve(process.cwd(), file);
	return readFileSync(sourcePath, 'utf8');
}

function buildFullSourceRefs(file: SourceFile, markdown: string): SourceRef[] {
	const lines = markdown.split(/\r?\n/);
	const refs: SourceRef[] = [];

	for (let index = 0; index < lines.length; index += 1) {
		if (lines[index].trim().length === 0) {
			continue;
		}

		const lineNumber = index + 1;
		refs.push({
			file,
			lineStart: lineNumber,
			lineEnd: lineNumber,
		});
	}

	return refs;
}

const lean5sSource = readSource('lesson-plan-1.md');
const lean8WastesSource = readSource('lesson-plan-2.md');

export const lessons: Lesson[] = [
	{
		slug: 'lean-5s',
		title: 'Lean 5S Classroom to Placement',
		durationMins: 55,
		audience: 'T Level Engineering Year 1 and Year 2',
		aims: [
			'Introduce Lean thinking and 5S as practical workplace habits.',
			'Move learners from awareness to applied improvement planning for specialist contexts.',
		],
		outcomes: [
			'Recall each of the 5S pillars and apply at least one action per pillar.',
			'Produce a practical 5S improvement proposal with standards and measurable impact.',
			'Link 5S evidence directly to placement and portfolio language.',
		],
		blocks: [
			{
				id: 'lean5s-year1-hook',
				title: 'Starter and Core Concepts',
				startMin: 0,
				endMin: 10,
				teacherActions: [
					'Run the messy-desk hook and define Lean, value, and waste in plain language.',
					'Introduce all five S terms with visual classroom and workshop examples.',
				],
				learnerActions: [
					'Contribute examples of poor organisation and potential improvements.',
					'Capture vocabulary definitions and one example for each S.',
				],
				outputs: ['Starter notes on Lean vocabulary and 5S examples.'],
				differentiation: {
					year1: ['Prioritize confidence with vocabulary and observable safe behaviours.'],
					year2: ['Link vocabulary to industry-facing measures such as search time and defects.'],
				},
				sourceRefs: [
					{ file: 'lesson-plan-1.md', lineStart: 1, lineEnd: 31 },
					{ file: 'lesson-plan-1.md', lineStart: 39, lineEnd: 59 },
				],
			},
			{
				id: 'lean5s-activity',
				title: 'Applied 5S Audit and Design',
				startMin: 10,
				endMin: 40,
				teacherActions: [
					'Issue realistic workshop scenarios with embedded waste.',
					'Coach teams to define each S action, owner, standards, and measurement approach.',
				],
				learnerActions: [
					'Conduct rapid audit to identify risks, waste, and corrective priorities.',
					'Draft before/after layout or visual standards for high-impact changes.',
				],
				outputs: ['Group 5S improvement plan and visual standard sketch.'],
				differentiation: {
					year1: ['Focus on identifying obvious waste and writing clear, simple actions.'],
					year2: ['Include responsibilities, process standards, and measurable impact indicators.'],
					mixed: ['Use paired mentoring where Year 2 learners support Year 1 audit language.'],
				},
				sourceRefs: [{ file: 'lesson-plan-1.md', lineStart: 60, lineEnd: 78 }],
			},
			{
				id: 'lean5s-plenary-placement',
				title: 'Plenary, Reflection, and Placement Transfer',
				startMin: 40,
				endMin: 55,
				teacherActions: [
					'Facilitate 60-90 second group pitches on highest-impact improvements.',
					'Guide reflection writing to align with placement and portfolio evidence.',
				],
				learnerActions: [
					'Share one low-cost high-impact proposal suitable for workplace trial.',
					'Write reflection paragraph connecting 5S to safety, efficiency, and quality.',
				],
				outputs: ['Exit reflection ready for portfolio reuse.'],
				differentiation: {
					year1: ['State one practical place to apply each S in daily routines.'],
					year2: ['Tie proposal to occupational specialism and placement behavior expectations.'],
				},
				sourceRefs: [
					{ file: 'lesson-plan-1.md', lineStart: 79, lineEnd: 93 },
					{ file: 'lesson-plan-1.md', lineStart: 94, lineEnd: 101 },
				],
			},
		],
		placementLinks: [
			'Run one rapid 5S audit in your placement area.',
			'Submit one reflection paragraph using portfolio-ready language.',
		],
		resources: ['5S vocabulary board', 'Scenario worksheet', 'Before/after layout template'],
		fullSourceMarkdown: lean5sSource,
		fullSourceRefs: buildFullSourceRefs('lesson-plan-1.md', lean5sSource),
	},
	{
		slug: 'lean-8-wastes-walk',
		title: '8 Wastes Walk for SME Placement',
		durationMins: 55,
		audience: 'T Level Engineering mixed Year 1 and Year 2 cohort',
		aims: [
			'Build confident use of TIMWOODS to identify productivity loss in real processes.',
			'Prepare every learner to complete and report a placement waste walk.',
		],
		outcomes: [
			'Name and explain all eight wastes with process-specific examples.',
			'Use a structured observation sheet to capture facts, causes, and improvement ideas.',
			'Prioritise three actionable improvements with clear SME productivity benefits.',
		],
		blocks: [
			{
				id: 'wastes-starter-input',
				title: 'Starter and TIMWOODS Input',
				startMin: 0,
				endMin: 15,
				teacherActions: [
					'Use a process image prompt to surface likely wasted time and effort.',
					'Teach TIMWOODS with one factory-specific example for each waste.',
				],
				learnerActions: [
					'Identify obvious and process-level waste from starter scenarios.',
					'Complete pair matching task of waste definitions and visual prompts.',
				],
				outputs: ['TIMWOODS recall sheet with matched definitions.'],
				differentiation: {
					year1: ['Use everyday examples and reinforce baseline waste vocabulary.'],
					year2: ['Connect each waste to OEE, throughput, delivery, and cost impacts.'],
				},
				sourceRefs: [{ file: 'lesson-plan-2.md', lineStart: 1, lineEnd: 84 }],
			},
			{
				id: 'wastes-walk-modelling',
				title: 'Modelled Waste Walk and Observation Method',
				startMin: 15,
				endMin: 25,
				teacherActions: [
					'Model gemba walk rules: respectful observation, process focus, fact capture.',
					'Demonstrate observation sheet structure and an example improvement statement.',
				],
				learnerActions: [
					'Annotate observation sheet columns and expected evidence quality.',
					'Plan how they would apply the same method on placement.',
				],
				outputs: ['Prepared waste-walk observation template for activity and placement.'],
				sourceRefs: [{ file: 'lesson-plan-2.md', lineStart: 85, lineEnd: 119 }],
			},
			{
				id: 'wastes-simulated-walk',
				title: 'Simulated 8 Wastes Walk Activity',
				startMin: 25,
				endMin: 40,
				teacherActions: [
					'Distribute scenario packs with deliberate embedded wastes for group analysis.',
					'Coach quantification prompts for impact where appropriate.',
				],
				learnerActions: [
					'Identify at least one instance of each waste and record practical improvements.',
					'State expected benefits in throughput, quality, or time-saving terms.',
				],
				outputs: ['Completed group observation sheet with eight waste findings.'],
				differentiation: {
					year1: ['Prioritize spotting visible wastes and simple practical ideas.'],
					year2: ['Estimate minutes saved per shift and likely output impact.'],
				},
				sourceRefs: [{ file: 'lesson-plan-2.md', lineStart: 120, lineEnd: 151 }],
			},
			{
				id: 'wastes-plenary-placement',
				title: 'Plenary, Exit Task, and Placement Commitments',
				startMin: 40,
				endMin: 55,
				teacherActions: [
					'Lead class synthesis on high-impact wastes and SME productivity implications.',
					'Set individual placement action slips and supervisor engagement expectations.',
				],
				learnerActions: [
					'Present one high-impact waste and proposed fix to the class.',
					'Complete personal placement action with three expected wastes and one improvement.',
				],
				outputs: ['Placement action slip and three reusable report summary statements.'],
				differentiation: {
					year2: [
						'Add explicit supervisor-permission and staff-involvement plan to exit response.',
					],
				},
				sourceRefs: [{ file: 'lesson-plan-2.md', lineStart: 152, lineEnd: 228 }],
			},
		],
		placementLinks: [
			'Complete at least one 20-30 minute waste walk during placement.',
			'Propose three prioritized improvements and present findings to a supervisor.',
		],
		resources: ['TIMWOODS visual', 'Waste walk observation sheet', 'SME scenario pack'],
		fullSourceMarkdown: lean8WastesSource,
		fullSourceRefs: buildFullSourceRefs('lesson-plan-2.md', lean8WastesSource),
	},
];

export const lessonSlugs: LessonSlug[] = lessons.map((lesson) => lesson.slug);

export const lessonsBySlug: Record<LessonSlug, Lesson> = {
	'lean-5s': lessons[0],
	'lean-8-wastes-walk': lessons[1],
};

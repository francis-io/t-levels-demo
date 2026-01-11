/**
 * Complete curriculum data for T-Level Engineering & Manufacturing
 *
 * Structure:
 * - 16 Core Knowledge topics
 * - 8 Core Skills topics
 * - 1 ESP topic
 * - 1 Placement topic
 * - 10 Pathway 1 (Maintenance) topics
 * - 10 Pathway 2 (Manufacturing) topics (6 videos across 5 topics - all videos on suggested path)
 * - 10 Pathway 3 (Design) topics
 *
 * Total: 56 topics, 6 videos (all on Manufacturing pathway)
 */

import type { Curriculum, Section, Topic } from '$lib/types/curriculum';
import { videoMappings } from './videos';

// ============================================================================
// Core Knowledge Topics (16 topics)
// ============================================================================

const coreKnowledgeTopics: Topic[] = [
	{
		id: 'core-health',
		title: 'Health and Safety',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Understanding health and safety legislation, risk assessment, and safe working practices in engineering environments.',
		relatedTopics: ['skill-safety'],
	},
	{
		id: 'core-materials',
		title: 'Engineering Materials',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Properties, applications, and selection of engineering materials including metals, polymers, ceramics, and composites.',
		relatedTopics: ['core-manufacturing', 'path3-materials'],
	},
	{
		id: 'core-maths',
		title: 'Engineering Mathematics',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Mathematical techniques for engineering including algebra, trigonometry, calculus, and statistics.',
		relatedTopics: ['skill-maths'],
	},
	{
		id: 'core-mechanical',
		title: 'Mechanical Principles',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Fundamental mechanical principles including forces, motion, energy, and machine elements.',
		relatedTopics: ['core-fluid', 'path1-mechanical'],
	},
	{
		id: 'core-electrical',
		title: 'Electrical and Electronic Principles',
		section: 'core-knowledge',
		status: 'active',
		description: 'Fundamentals of electrical and electronic systems, circuits, and components.',
		relatedTopics: ['core-mechatronics', 'path1-electrical'],
	},
	{
		id: 'core-mechatronics',
		title: 'Mechatronics',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Integration of mechanical, electrical, and control systems in modern engineering applications.',
		relatedTopics: ['core-electrical', 'core-mechanical', 'path2-automation'],
	},
	{
		id: 'core-fluid',
		title: 'Fluid Mechanics',
		section: 'core-knowledge',
		status: 'active',
		description: 'Principles of fluid statics, dynamics, and hydraulic/pneumatic systems.',
		relatedTopics: ['core-mechanical', 'path1-hydraulics'],
	},
	{
		id: 'core-cad',
		title: 'Computer-Aided Design',
		section: 'core-knowledge',
		status: 'active',
		description: 'Using CAD software for 2D drafting and 3D modelling in engineering design.',
		relatedTopics: ['skill-digital', 'path3-cad'],
	},
	{
		id: 'core-qa',
		title: 'Quality Assurance',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Quality management systems, inspection techniques, and continuous improvement processes.',
		relatedTopics: ['path2-quality', 'path2-lean'],
	},
	{
		id: 'core-manufacturing',
		title: 'Manufacturing Processes',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Understanding of various manufacturing processes including machining, forming, joining, and additive manufacturing.',
		relatedTopics: ['core-materials', 'path2-machining'],
	},
	{
		id: 'core-maintenance',
		title: 'Maintenance Principles',
		section: 'core-knowledge',
		status: 'active',
		description: 'Fundamentals of planned, preventive, and predictive maintenance strategies.',
		relatedTopics: ['skill-fault', 'path1-maintenance'],
	},
	{
		id: 'core-project',
		title: 'Project Management',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Planning, scheduling, and managing engineering projects including resource allocation and risk management.',
		relatedTopics: ['skill-planning'],
	},
	{
		id: 'core-sustainability',
		title: 'Sustainability in Engineering',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Environmental considerations, sustainable practices, and lifecycle assessment in engineering.',
		relatedTopics: ['path2-lean'],
	},
	{
		id: 'core-business',
		title: 'Business Context',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Understanding how engineering businesses operate, including finance, marketing, and organizational structures.',
		relatedTopics: ['skill-professional'],
	},
	{
		id: 'core-digital',
		title: 'Digital Technologies',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Industry 4.0 concepts including IoT, data analytics, and digital manufacturing systems.',
		relatedTopics: ['skill-digital', 'path2-automation'],
	},
	{
		id: 'core-problem',
		title: 'Problem Solving',
		section: 'core-knowledge',
		status: 'active',
		description:
			'Systematic approaches to engineering problem solving including root cause analysis.',
		relatedTopics: ['skill-fault'],
	},
];

// ============================================================================
// Core Skills Topics (8 topics)
// ============================================================================

const coreSkillsTopics: Topic[] = [
	{
		id: 'skill-safety',
		title: 'Safe Working Practices',
		section: 'core-skills',
		status: 'active',
		description: 'Applying health and safety procedures in workshop and industrial environments.',
		relatedTopics: ['core-health'],
	},
	{
		id: 'skill-comms',
		title: 'Communication Skills',
		section: 'core-skills',
		status: 'active',
		description: 'Technical writing, verbal communication, and presentation skills for engineers.',
		relatedTopics: ['skill-professional'],
	},
	{
		id: 'skill-data',
		title: 'Data Analysis',
		section: 'core-skills',
		status: 'active',
		description: 'Collecting, processing, and interpreting engineering data.',
		relatedTopics: ['core-maths', 'skill-digital'],
	},
	{
		id: 'skill-planning',
		title: 'Planning and Organisation',
		section: 'core-skills',
		status: 'active',
		description: 'Time management, task prioritisation, and workflow planning.',
		relatedTopics: ['core-project'],
	},
	{
		id: 'skill-digital',
		title: 'Digital Skills',
		section: 'core-skills',
		status: 'active',
		description: 'Using digital tools and software for engineering applications.',
		relatedTopics: ['core-cad', 'core-digital'],
	},
	{
		id: 'skill-maths',
		title: 'Applied Mathematics',
		section: 'core-skills',
		status: 'active',
		description: 'Applying mathematical techniques to solve engineering problems.',
		relatedTopics: ['core-maths'],
	},
	{
		id: 'skill-fault',
		title: 'Fault Finding',
		section: 'core-skills',
		status: 'active',
		description: 'Systematic diagnosis and troubleshooting of engineering systems.',
		relatedTopics: ['core-maintenance', 'core-problem'],
	},
	{
		id: 'skill-professional',
		title: 'Professional Behaviours',
		section: 'core-skills',
		status: 'active',
		description: 'Workplace conduct, ethics, and professional development.',
		relatedTopics: ['core-business', 'skill-comms'],
	},
];

// ============================================================================
// ESP and Placement Topics (1 each)
// ============================================================================

const espTopics: Topic[] = [
	{
		id: 'esp-project',
		title: 'Employer Set Project',
		section: 'esp',
		status: 'placeholder',
		description:
			'A substantial project set in collaboration with employers to demonstrate integrated skills and knowledge.',
	},
];

const placementTopics: Topic[] = [
	{
		id: 'placement-industry',
		title: 'Industry Placement',
		section: 'placement',
		status: 'placeholder',
		description: 'Minimum 315 hours of industry placement to gain real-world experience.',
	},
];

// ============================================================================
// Pathway 1: Maintenance (10 topics, no videos)
// ============================================================================

const pathway1Topics: Topic[] = [
	{
		id: 'path1-maintenance',
		title: 'Maintenance Planning',
		section: 'pathway-1',
		status: 'active',
		description: 'Developing and implementing maintenance schedules and strategies.',
		relatedTopics: ['core-maintenance'],
	},
	{
		id: 'path1-mechanical',
		title: 'Mechanical Maintenance',
		section: 'pathway-1',
		status: 'active',
		description: 'Maintaining and repairing mechanical systems and components.',
		relatedTopics: ['core-mechanical'],
	},
	{
		id: 'path1-electrical',
		title: 'Electrical Maintenance',
		section: 'pathway-1',
		status: 'active',
		description: 'Maintaining and troubleshooting electrical systems.',
		relatedTopics: ['core-electrical'],
	},
	{
		id: 'path1-hydraulics',
		title: 'Hydraulic Systems',
		section: 'pathway-1',
		status: 'active',
		description: 'Maintenance of hydraulic and pneumatic systems.',
		relatedTopics: ['core-fluid'],
	},
	{
		id: 'path1-diagnostics',
		title: 'Condition Monitoring',
		section: 'pathway-1',
		status: 'active',
		description: 'Using diagnostic tools and techniques for predictive maintenance.',
		relatedTopics: ['skill-fault'],
	},
	{
		id: 'path1-welding',
		title: 'Welding and Fabrication',
		section: 'pathway-1',
		status: 'active',
		description: 'Repair welding and basic fabrication techniques.',
		relatedTopics: ['core-materials'],
	},
	{
		id: 'path1-plc',
		title: 'PLC Maintenance',
		section: 'pathway-1',
		status: 'active',
		description: 'Maintaining and troubleshooting programmable logic controllers.',
		relatedTopics: ['core-mechatronics'],
	},
	{
		id: 'path1-lubrication',
		title: 'Lubrication Systems',
		section: 'pathway-1',
		status: 'active',
		description: 'Selection and application of lubricants for machine maintenance.',
	},
	{
		id: 'path1-alignment',
		title: 'Shaft Alignment',
		section: 'pathway-1',
		status: 'active',
		description: 'Precision alignment of rotating machinery.',
	},
	{
		id: 'path1-documentation',
		title: 'Maintenance Documentation',
		section: 'pathway-1',
		status: 'active',
		description: 'Recording and reporting maintenance activities.',
		relatedTopics: ['skill-comms'],
	},
];

// ============================================================================
// Pathway 2: Manufacturing (10 topics, 5 videos)
// ============================================================================

const pathway2Topics: Topic[] = [
	{
		id: 'path2-workflow',
		title: 'Production Workflow',
		section: 'pathway-2',
		status: 'active',
		description: 'Understanding and optimising manufacturing workflows.',
		videos: videoMappings['path2-workflow'],
		relatedTopics: ['path2-lean'],
	},
	{
		id: 'path2-control',
		title: 'Process Control',
		section: 'pathway-2',
		status: 'active',
		description: 'Controlling and monitoring manufacturing processes.',
		videos: videoMappings['path2-control'],
		relatedTopics: ['core-mechatronics'],
	},
	{
		id: 'path2-lean',
		title: 'Lean Manufacturing',
		section: 'pathway-2',
		status: 'active',
		description: 'Principles and tools of lean manufacturing including waste reduction.',
		videos: videoMappings['path2-lean'],
		relatedTopics: ['core-qa', 'path2-workflow'],
	},
	{
		id: 'path2-automation',
		title: 'Industrial Automation',
		section: 'pathway-2',
		status: 'active',
		description: 'Automated manufacturing systems and robotics.',
		videos: videoMappings['path2-automation'],
		relatedTopics: ['core-mechatronics', 'core-digital'],
	},
	{
		id: 'path2-machining',
		title: 'CNC Machining',
		section: 'pathway-2',
		status: 'active',
		description: 'Programming and operating CNC machine tools.',
		videos: videoMappings['path2-machining'],
		relatedTopics: ['core-manufacturing'],
	},
	{
		id: 'path2-quality',
		title: 'Quality Control',
		section: 'pathway-2',
		status: 'active',
		description: 'Inspection, measurement, and quality assurance in manufacturing.',
		relatedTopics: ['core-qa'],
	},
	{
		id: 'path2-assembly',
		title: 'Assembly Operations',
		section: 'pathway-2',
		status: 'active',
		description: 'Manual and automated assembly techniques.',
	},
	{
		id: 'path2-scheduling',
		title: 'Production Scheduling',
		section: 'pathway-2',
		status: 'active',
		description: 'Planning and scheduling production activities.',
		relatedTopics: ['skill-planning'],
	},
	{
		id: 'path2-metrology',
		title: 'Metrology',
		section: 'pathway-2',
		status: 'active',
		description: 'Precision measurement techniques and instruments.',
	},
	{
		id: 'path2-materials',
		title: 'Material Handling',
		section: 'pathway-2',
		status: 'active',
		description: 'Safe handling, storage, and movement of materials.',
		relatedTopics: ['skill-safety'],
	},
];

// ============================================================================
// Pathway 3: Design (10 topics, no videos)
// ============================================================================

const pathway3Topics: Topic[] = [
	{
		id: 'path3-design',
		title: 'Design Process',
		section: 'pathway-3',
		status: 'active',
		description: 'Systematic approaches to engineering design.',
		relatedTopics: ['core-problem'],
	},
	{
		id: 'path3-cad',
		title: 'Advanced CAD',
		section: 'pathway-3',
		status: 'active',
		description: 'Advanced 3D modelling and parametric design.',
		relatedTopics: ['core-cad'],
	},
	{
		id: 'path3-materials',
		title: 'Material Selection',
		section: 'pathway-3',
		status: 'active',
		description: 'Selecting appropriate materials for design applications.',
		relatedTopics: ['core-materials'],
	},
	{
		id: 'path3-analysis',
		title: 'Design Analysis',
		section: 'pathway-3',
		status: 'active',
		description: 'Structural and thermal analysis using simulation tools.',
	},
	{
		id: 'path3-prototyping',
		title: 'Prototyping',
		section: 'pathway-3',
		status: 'active',
		description: 'Rapid prototyping and additive manufacturing for design validation.',
	},
	{
		id: 'path3-standards',
		title: 'Engineering Standards',
		section: 'pathway-3',
		status: 'active',
		description: 'Applying standards and specifications in design.',
	},
	{
		id: 'path3-tolerances',
		title: 'Geometric Tolerancing',
		section: 'pathway-3',
		status: 'active',
		description: 'GD&T principles and application in technical drawings.',
	},
	{
		id: 'path3-dfm',
		title: 'Design for Manufacture',
		section: 'pathway-3',
		status: 'active',
		description: 'Designing products for efficient manufacturing.',
		relatedTopics: ['core-manufacturing'],
	},
	{
		id: 'path3-sustainability',
		title: 'Sustainable Design',
		section: 'pathway-3',
		status: 'active',
		description: 'Environmental considerations in product design.',
		relatedTopics: ['core-sustainability'],
	},
	{
		id: 'path3-documentation',
		title: 'Design Documentation',
		section: 'pathway-3',
		status: 'active',
		description: 'Technical drawings, specifications, and design reports.',
		relatedTopics: ['skill-comms'],
	},
];

// ============================================================================
// Sections Assembly
// ============================================================================

export const sections: Section[] = [
	{
		id: 'core-knowledge',
		title: 'Core Knowledge',
		description: 'Essential engineering knowledge required for all T-Level Engineering students.',
		icon: 'book',
		topics: coreKnowledgeTopics,
	},
	{
		id: 'core-skills',
		title: 'Core Skills',
		description: 'Practical skills developed through workshop activities and assessments.',
		icon: 'wrench',
		topics: coreSkillsTopics,
	},
	{
		id: 'esp',
		title: 'Employer Set Project',
		description:
			'A substantial project developed with employer input to demonstrate integrated competencies.',
		icon: 'briefcase',
		topics: espTopics,
	},
	{
		id: 'placement',
		title: 'Industry Placement',
		description: 'Real-world experience gained through a minimum of 315 hours with an employer.',
		icon: 'building',
		topics: placementTopics,
	},
	{
		id: 'pathway-1',
		title: 'Maintenance, Installation and Repair',
		description: 'Specialist pathway focusing on maintaining and repairing engineering systems.',
		icon: 'tools',
		topics: pathway1Topics,
	},
	{
		id: 'pathway-2',
		title: 'Manufacturing and Process',
		description: 'Specialist pathway focusing on manufacturing operations and process control.',
		icon: 'factory',
		topics: pathway2Topics,
	},
	{
		id: 'pathway-3',
		title: 'Design and Development',
		description: 'Specialist pathway focusing on engineering design and product development.',
		icon: 'pencil-ruler',
		topics: pathway3Topics,
	},
];

// ============================================================================
// Curriculum Export
// ============================================================================

/**
 * Calculate total topic count
 */
function calculateTotalTopics(): number {
	return sections.reduce((total, section) => total + section.topics.length, 0);
}

/**
 * Calculate total video count
 */
function calculateTotalVideos(): number {
	return sections.reduce(
		(total, section) =>
			total + section.topics.reduce((count, topic) => count + (topic.videos?.length ?? 0), 0),
		0,
	);
}

/**
 * Complete curriculum object with metadata
 */
export const curriculum: Curriculum = {
	sections,
	totalTopics: calculateTotalTopics(),
	totalVideos: calculateTotalVideos(),
};

/**
 * Flat list of all topics for easy searching
 */
export const allTopics: Topic[] = sections.flatMap((section) => section.topics);

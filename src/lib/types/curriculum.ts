/**
 * Curriculum types for T-Levels Engineering & Manufacturing demo
 */

/**
 * Status of a topic in the curriculum
 * - active: Topic is fully available with content
 * - placeholder: Topic exists but content is pending
 * - coming-soon: Topic is planned but not yet available
 */
export type TopicStatus = 'active' | 'placeholder' | 'coming-soon';

/**
 * Section types in the T-Level Engineering curriculum
 * - core-knowledge: Core knowledge component (16 topics)
 * - core-skills: Core skills component (8 topics)
 * - esp: Employer Set Project
 * - placement: Industry placement
 * - pathway-1: Maintenance pathway
 * - pathway-2: Manufacturing pathway
 * - pathway-3: Design pathway
 */
export type SectionType =
	| 'core-knowledge'
	| 'core-skills'
	| 'esp'
	| 'placement'
	| 'pathway-1'
	| 'pathway-2'
	| 'pathway-3';

/**
 * Video resource associated with a topic
 */
export interface Video {
	/** Unique identifier for the video */
	id: string;
	/** Display title of the video */
	title: string;
	/** YouTube video ID for embedding */
	youtubeId: string;
	/** Duration in format MM:SS or HH:MM:SS */
	duration?: string;
	/** URL to video thumbnail image */
	thumbnailUrl?: string;
}

/**
 * A topic within a curriculum section
 */
export interface Topic {
	/** Unique identifier for the topic */
	id: string;
	/** Display title of the topic */
	title: string;
	/** Section this topic belongs to */
	section: SectionType;
	/** Current availability status */
	status: TopicStatus;
	/** Associated video resources */
	videos?: Video[];
	/** Brief description of the topic */
	description?: string;
	/** IDs of related topics for cross-referencing */
	relatedTopics?: string[];
}

/**
 * A section of the curriculum containing multiple topics
 */
export interface Section {
	/** Section identifier (matches SectionType) */
	id: SectionType;
	/** Display title of the section */
	title: string;
	/** Description of the section */
	description: string;
	/** Optional icon identifier for UI */
	icon?: string;
	/** Topics within this section */
	topics: Topic[];
}

/**
 * Complete curriculum structure with metadata
 */
export interface Curriculum {
	/** All sections in the curriculum */
	sections: Section[];
	/** Total number of topics across all sections */
	totalTopics: number;
	/** Total number of videos across all topics */
	totalVideos: number;
}

/**
 * Pathway information for display on home page
 */
export interface Pathway {
	/** Pathway identifier */
	id: string;
	/** Display title */
	title: string;
	/** Description */
	description: string;
	/** Number of videos in this pathway */
	videoCount: number;
	/** Topics in this pathway */
	topics: Topic[];
}

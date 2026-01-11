/**
 * Utility functions for working with curriculum data
 */

import { allTopics, curriculum, sections } from '$lib/data/curriculum';
import type { Section, SectionType, Topic } from '$lib/types/curriculum';

/**
 * Get a topic by its ID
 * @param id - The topic ID to find
 * @returns The topic if found, undefined otherwise
 */
export function getTopicById(id: string): Topic | undefined {
	return allTopics.find((topic) => topic.id === id);
}

/**
 * Get all topics for a specific section
 * @param sectionType - The section type to filter by
 * @returns Array of topics in the section
 */
export function getTopicsBySection(sectionType: SectionType): Topic[] {
	const section = sections.find((s) => s.id === sectionType);
	return section?.topics ?? [];
}

/**
 * Get related topics for a given topic
 * @param topic - The topic to find relations for
 * @returns Array of related Topic objects
 */
export function getRelatedTopics(topic: Topic): Topic[] {
	if (!topic.relatedTopics || topic.relatedTopics.length === 0) {
		return [];
	}

	return topic.relatedTopics
		.map((id) => getTopicById(id))
		.filter((t): t is Topic => t !== undefined);
}

/**
 * Get all topics that have at least one video
 * @returns Array of topics with videos
 */
export function getTopicsWithVideos(): Topic[] {
	return allTopics.filter((topic) => topic.videos && topic.videos.length > 0);
}

/**
 * Get the section that contains a specific topic
 * @param topicId - The topic ID to look up
 * @returns The section containing the topic, or undefined
 */
export function getSectionByTopicId(topicId: string): Section | undefined {
	return sections.find((section) => section.topics.some((topic) => topic.id === topicId));
}

/**
 * Get topics by status
 * @param status - The status to filter by
 * @returns Array of topics with the given status
 */
export function getTopicsByStatus(status: Topic['status']): Topic[] {
	return allTopics.filter((topic) => topic.status === status);
}

/**
 * Search topics by title or description
 * @param query - Search query string
 * @returns Array of matching topics
 */
export function searchTopics(query: string): Topic[] {
	const lowerQuery = query.toLowerCase();
	return allTopics.filter(
		(topic) =>
			topic.title.toLowerCase().includes(lowerQuery) ||
			topic.description?.toLowerCase().includes(lowerQuery),
	);
}

/**
 * Get the next topic in a section
 * @param currentTopicId - Current topic ID
 * @returns The next topic or undefined if at end
 */
export function getNextTopic(currentTopicId: string): Topic | undefined {
	const section = getSectionByTopicId(currentTopicId);
	if (!section) return undefined;

	const currentIndex = section.topics.findIndex((t) => t.id === currentTopicId);
	if (currentIndex === -1 || currentIndex >= section.topics.length - 1) {
		return undefined;
	}

	return section.topics[currentIndex + 1];
}

/**
 * Get the previous topic in a section
 * @param currentTopicId - Current topic ID
 * @returns The previous topic or undefined if at start
 */
export function getPreviousTopic(currentTopicId: string): Topic | undefined {
	const section = getSectionByTopicId(currentTopicId);
	if (!section) return undefined;

	const currentIndex = section.topics.findIndex((t) => t.id === currentTopicId);
	if (currentIndex <= 0) {
		return undefined;
	}

	return section.topics[currentIndex - 1];
}

/**
 * Get all pathway sections, with Manufacturing (pathway-2) first as recommended
 * @returns Array of pathway sections ordered: pathway-2, pathway-1, pathway-3
 */
export function getPathways(): Section[] {
	const pathways = sections.filter((section) => section.id.startsWith('pathway-'));
	// Put Manufacturing (pathway-2) first as the recommended starting path
	return pathways.sort((a, b) => {
		if (a.id === 'pathway-2') return -1;
		if (b.id === 'pathway-2') return 1;
		return 0;
	});
}

/**
 * Count total videos across all topics in the curriculum
 * @returns Total number of videos
 */
export function countTotalVideos(): number {
	return curriculum.totalVideos;
}

/**
 * Video mappings for T-Level Engineering & Manufacturing curriculum
 * Maps topic IDs to their associated YouTube videos
 */

import type { Video } from '$lib/types/curriculum';

/**
 * Video mappings keyed by topic ID
 */
export const videoMappings: Record<string, Video[]> = {
	// Pathway 2: Manufacturing - All videos on the suggested learning path
	'path2-workflow': [
		{
			id: 'vid-workflow-01',
			title: 'Factory Workflow',
			youtubeId: 'r5teJxtTxlk',
			duration: '8:45',
		},
	],

	'path2-control': [
		{
			id: 'vid-control-01',
			title: 'Understanding Control System',
			youtubeId: '2BwUMk10WqI',
			duration: '15:22',
		},
	],

	'path2-lean': [
		{
			id: 'vid-lean-01',
			title: 'Toyota Kaizen Clip',
			youtubeId: 'wot9DFzFRLU',
			duration: '6:12',
		},
		{
			id: 'vid-lean-02',
			title: 'Learning from Toyota',
			youtubeId: 'mm8_8EDITNU',
			duration: '9:45',
		},
	],

	'path2-automation': [
		{
			id: 'vid-automation-01',
			title: 'Factory acceptance test',
			youtubeId: 'C5jEFwVpZyo',
			duration: '11:30',
		},
	],

	'path2-machining': [
		{
			id: 'vid-mechanical-01',
			title: 'Mechanical principles part 01',
			youtubeId: '-42Z-_Kq0QU',
			duration: '12:34',
		},
	],
};

/**
 * Get videos for a specific topic
 * @param topicId - The topic ID to look up
 * @returns Array of videos for the topic, or empty array if none exist
 */
export function getVideosByTopicId(topicId: string): Video[] {
	return videoMappings[topicId] ?? [];
}

/**
 * Get all video IDs
 */
export function getAllVideoIds(): string[] {
	return Object.values(videoMappings)
		.flat()
		.map((v) => v.id);
}

/**
 * Get total video count
 */
export function getTotalVideoCount(): number {
	return Object.values(videoMappings).reduce((count, videos) => count + videos.length, 0);
}

import { describe, it, expect, expectTypeOf } from 'vitest';
import type {
	TopicStatus,
	SectionType,
	Video,
	Topic,
	Section,
	Curriculum,
} from '$lib/types/curriculum';
import { curriculum, sections } from '$lib/data/curriculum';
import { videoMappings, getVideosByTopicId } from '$lib/data/videos';
import {
	getTopicById,
	getTopicsBySection,
	getRelatedTopics,
	getTopicsWithVideos,
	getSectionByTopicId,
} from '$lib/utils/curriculum';

describe('Curriculum Types', () => {
	describe('TopicStatus type', () => {
		it('should accept valid status values', () => {
			const active: TopicStatus = 'active';
			const placeholder: TopicStatus = 'placeholder';
			const comingSoon: TopicStatus = 'coming-soon';

			expect(active).toBe('active');
			expect(placeholder).toBe('placeholder');
			expect(comingSoon).toBe('coming-soon');
		});
	});

	describe('SectionType type', () => {
		it('should accept valid section types', () => {
			const types: SectionType[] = [
				'core-knowledge',
				'core-skills',
				'esp',
				'placement',
				'pathway-1',
				'pathway-2',
				'pathway-3',
			];

			expect(types).toHaveLength(7);
		});
	});

	describe('Video interface', () => {
		it('should have required properties', () => {
			const video: Video = {
				id: 'test-video',
				title: 'Test Video',
				youtubeId: 'abc123',
			};

			expect(video.id).toBe('test-video');
			expect(video.title).toBe('Test Video');
			expect(video.youtubeId).toBe('abc123');
		});

		it('should allow optional properties', () => {
			const video: Video = {
				id: 'test-video',
				title: 'Test Video',
				youtubeId: 'abc123',
				duration: '10:30',
				thumbnailUrl: 'https://example.com/thumb.jpg',
			};

			expect(video.duration).toBe('10:30');
			expect(video.thumbnailUrl).toBe('https://example.com/thumb.jpg');
		});
	});

	describe('Topic interface', () => {
		it('should have required properties', () => {
			const topic: Topic = {
				id: 'test-topic',
				title: 'Test Topic',
				section: 'core-knowledge',
				status: 'active',
			};

			expect(topic.id).toBe('test-topic');
			expect(topic.section).toBe('core-knowledge');
			expect(topic.status).toBe('active');
		});

		it('should allow optional properties', () => {
			const topic: Topic = {
				id: 'test-topic',
				title: 'Test Topic',
				section: 'core-knowledge',
				status: 'active',
				description: 'A test topic',
				relatedTopics: ['other-topic'],
				videos: [
					{
						id: 'vid-1',
						title: 'Video 1',
						youtubeId: 'abc123',
					},
				],
			};

			expect(topic.description).toBe('A test topic');
			expect(topic.relatedTopics).toHaveLength(1);
			expect(topic.videos).toHaveLength(1);
		});
	});

	describe('Section interface', () => {
		it('should have required properties', () => {
			const section: Section = {
				id: 'core-knowledge',
				title: 'Core Knowledge',
				description: 'Core knowledge section',
				topics: [],
			};

			expect(section.id).toBe('core-knowledge');
			expect(section.topics).toEqual([]);
		});
	});

	describe('Curriculum interface', () => {
		it('should have sections and counts', () => {
			const curr: Curriculum = {
				sections: [],
				totalTopics: 0,
				totalVideos: 0,
			};

			expect(curr.sections).toEqual([]);
			expect(curr.totalTopics).toBe(0);
			expect(curr.totalVideos).toBe(0);
		});
	});
});

describe('Curriculum Data', () => {
	describe('sections array', () => {
		it('should have 7 sections', () => {
			expect(sections).toHaveLength(7);
		});

		it('should have correct section IDs', () => {
			const sectionIds = sections.map((s) => s.id);
			expect(sectionIds).toContain('core-knowledge');
			expect(sectionIds).toContain('core-skills');
			expect(sectionIds).toContain('esp');
			expect(sectionIds).toContain('placement');
			expect(sectionIds).toContain('pathway-1');
			expect(sectionIds).toContain('pathway-2');
			expect(sectionIds).toContain('pathway-3');
		});
	});

	describe('curriculum object', () => {
		it('should have 56 total topics', () => {
			expect(curriculum.totalTopics).toBe(56);
		});

		it('should have 6 total videos', () => {
			expect(curriculum.totalVideos).toBe(6);
		});
	});

	describe('Core Knowledge section', () => {
		it('should have 16 topics', () => {
			const coreKnowledge = sections.find((s) => s.id === 'core-knowledge');
			expect(coreKnowledge?.topics).toHaveLength(16);
		});

		it('should have correct topic IDs', () => {
			const coreKnowledge = sections.find((s) => s.id === 'core-knowledge');
			const topicIds = coreKnowledge?.topics.map((t) => t.id) ?? [];

			expect(topicIds).toContain('core-health');
			expect(topicIds).toContain('core-materials');
			expect(topicIds).toContain('core-maths');
			expect(topicIds).toContain('core-mechanical');
			expect(topicIds).toContain('core-electrical');
			expect(topicIds).toContain('core-mechatronics');
			expect(topicIds).toContain('core-fluid');
			expect(topicIds).toContain('core-cad');
			expect(topicIds).toContain('core-qa');
			expect(topicIds).toContain('core-manufacturing');
			expect(topicIds).toContain('core-maintenance');
			expect(topicIds).toContain('core-project');
			expect(topicIds).toContain('core-sustainability');
			expect(topicIds).toContain('core-business');
			expect(topicIds).toContain('core-digital');
			expect(topicIds).toContain('core-problem');
		});

		it('should not have videos (all videos on Manufacturing pathway)', () => {
			const coreKnowledge = sections.find((s) => s.id === 'core-knowledge');
			const totalVideos = coreKnowledge?.topics.reduce(
				(count, topic) => count + (topic.videos?.length ?? 0),
				0
			);
			expect(totalVideos).toBe(0);
		});
	});

	describe('Core Skills section', () => {
		it('should have 8 topics', () => {
			const coreSkills = sections.find((s) => s.id === 'core-skills');
			expect(coreSkills?.topics).toHaveLength(8);
		});

		it('should have correct topic IDs', () => {
			const coreSkills = sections.find((s) => s.id === 'core-skills');
			const topicIds = coreSkills?.topics.map((t) => t.id) ?? [];

			expect(topicIds).toContain('skill-safety');
			expect(topicIds).toContain('skill-comms');
			expect(topicIds).toContain('skill-data');
			expect(topicIds).toContain('skill-planning');
			expect(topicIds).toContain('skill-digital');
			expect(topicIds).toContain('skill-maths');
			expect(topicIds).toContain('skill-fault');
			expect(topicIds).toContain('skill-professional');
		});
	});

	describe('Pathway 1: Maintenance', () => {
		it('should have 10 topics', () => {
			const pathway1 = sections.find((s) => s.id === 'pathway-1');
			expect(pathway1?.topics).toHaveLength(10);
		});

		it('should have no videos', () => {
			const pathway1 = sections.find((s) => s.id === 'pathway-1');
			const videosCount =
				pathway1?.topics.reduce((count, t) => count + (t.videos?.length ?? 0), 0) ?? 0;
			expect(videosCount).toBe(0);
		});
	});

	describe('Pathway 2: Manufacturing', () => {
		it('should have 10 topics', () => {
			const pathway2 = sections.find((s) => s.id === 'pathway-2');
			expect(pathway2?.topics).toHaveLength(10);
		});

		it('should have 6 videos total across 5 topics (all videos on suggested path)', () => {
			const pathway2 = sections.find((s) => s.id === 'pathway-2');
			const videosCount =
				pathway2?.topics.reduce((count, t) => count + (t.videos?.length ?? 0), 0) ?? 0;
			expect(videosCount).toBe(6);
		});

		it('should have videos on specific topics', () => {
			const pathway2 = sections.find((s) => s.id === 'pathway-2');

			const workflowTopic = pathway2?.topics.find((t) => t.id === 'path2-workflow');
			expect(workflowTopic?.videos).toHaveLength(1);
			expect(workflowTopic?.videos?.[0].youtubeId).toBe('r5teJxtTxlk');

			const controlTopic = pathway2?.topics.find((t) => t.id === 'path2-control');
			expect(controlTopic?.videos).toHaveLength(1);
			expect(controlTopic?.videos?.[0].youtubeId).toBe('2BwUMk10WqI');

			const leanTopic = pathway2?.topics.find((t) => t.id === 'path2-lean');
			expect(leanTopic?.videos).toHaveLength(2);
			expect(leanTopic?.videos?.[0].youtubeId).toBe('wot9DFzFRLU');
			expect(leanTopic?.videos?.[1].youtubeId).toBe('mm8_8EDITNU');

			const automationTopic = pathway2?.topics.find((t) => t.id === 'path2-automation');
			expect(automationTopic?.videos).toHaveLength(1);
			expect(automationTopic?.videos?.[0].youtubeId).toBe('C5jEFwVpZyo');
		});
	});

	describe('Pathway 3: Design', () => {
		it('should have 10 topics', () => {
			const pathway3 = sections.find((s) => s.id === 'pathway-3');
			expect(pathway3?.topics).toHaveLength(10);
		});

		it('should have no videos', () => {
			const pathway3 = sections.find((s) => s.id === 'pathway-3');
			const videosCount =
				pathway3?.topics.reduce((count, t) => count + (t.videos?.length ?? 0), 0) ?? 0;
			expect(videosCount).toBe(0);
		});
	});
});

describe('Video Mappings', () => {
	describe('videoMappings object', () => {
		it('should have entries for topics with videos (all on Manufacturing pathway)', () => {
			expect(videoMappings['path2-workflow']).toBeDefined();
			expect(videoMappings['path2-control']).toBeDefined();
			expect(videoMappings['path2-lean']).toBeDefined();
			expect(videoMappings['path2-automation']).toBeDefined();
			expect(videoMappings['path2-machining']).toBeDefined();
		});

		it('should have correct video data', () => {
			expect(videoMappings['path2-workflow'][0].youtubeId).toBe('r5teJxtTxlk');
			expect(videoMappings['path2-control'][0].youtubeId).toBe('2BwUMk10WqI');

			expect(videoMappings['path2-lean']).toHaveLength(2);
			expect(videoMappings['path2-lean'][0].youtubeId).toBe('wot9DFzFRLU');
			expect(videoMappings['path2-lean'][1].youtubeId).toBe('mm8_8EDITNU');

			expect(videoMappings['path2-automation'][0].youtubeId).toBe('C5jEFwVpZyo');

			expect(videoMappings['path2-machining'][0].youtubeId).toBe('-42Z-_Kq0QU');
			expect(videoMappings['path2-machining'][0].title).toBe('Mechanical principles part 01');
		});
	});

	describe('getVideosByTopicId function', () => {
		it('should return videos for topics with videos', () => {
			const videos = getVideosByTopicId('path2-machining');
			expect(videos).toHaveLength(1);
			expect(videos[0].youtubeId).toBe('-42Z-_Kq0QU');
		});

		it('should return empty array for topics without videos', () => {
			const videos = getVideosByTopicId('core-health');
			expect(videos).toEqual([]);
		});
	});
});

describe('Curriculum Utility Functions', () => {
	describe('getTopicById', () => {
		it('should return topic when found', () => {
			const topic = getTopicById('core-mechanical');
			expect(topic).toBeDefined();
			expect(topic?.id).toBe('core-mechanical');
			expect(topic?.title).toBe('Mechanical Principles');
		});

		it('should return undefined when not found', () => {
			const topic = getTopicById('non-existent-topic');
			expect(topic).toBeUndefined();
		});
	});

	describe('getTopicsBySection', () => {
		it('should return all topics for a section', () => {
			const topics = getTopicsBySection('core-knowledge');
			expect(topics).toHaveLength(16);
		});

		it('should return topics for pathway sections', () => {
			const pathway1Topics = getTopicsBySection('pathway-1');
			const pathway2Topics = getTopicsBySection('pathway-2');
			const pathway3Topics = getTopicsBySection('pathway-3');

			expect(pathway1Topics).toHaveLength(10);
			expect(pathway2Topics).toHaveLength(10);
			expect(pathway3Topics).toHaveLength(10);
		});

		it('should return empty array for invalid section', () => {
			// @ts-expect-error - testing invalid input
			const topics = getTopicsBySection('invalid-section');
			expect(topics).toEqual([]);
		});
	});

	describe('getRelatedTopics', () => {
		it('should return related topics when they exist', () => {
			const mechanicalTopic = getTopicById('core-mechanical');
			if (mechanicalTopic?.relatedTopics?.length) {
				const related = getRelatedTopics(mechanicalTopic);
				expect(related.length).toBeGreaterThan(0);
			}
		});

		it('should return empty array when no related topics', () => {
			const topicWithoutRelated: Topic = {
				id: 'test',
				title: 'Test',
				section: 'core-knowledge',
				status: 'active',
			};
			const related = getRelatedTopics(topicWithoutRelated);
			expect(related).toEqual([]);
		});
	});

	describe('getTopicsWithVideos', () => {
		it('should return only topics that have videos', () => {
			const topicsWithVideos = getTopicsWithVideos();
			expect(topicsWithVideos.length).toBe(5); // 5 topics have videos

			// Each should have at least one video
			topicsWithVideos.forEach((topic) => {
				expect(topic.videos?.length).toBeGreaterThan(0);
			});
		});

		it('should include correct topic IDs', () => {
			const topicsWithVideos = getTopicsWithVideos();
			const ids = topicsWithVideos.map((t) => t.id);

			expect(ids).toContain('path2-machining');
			expect(ids).toContain('path2-workflow');
			expect(ids).toContain('path2-control');
			expect(ids).toContain('path2-lean');
			expect(ids).toContain('path2-automation');
		});
	});

	describe('getSectionByTopicId', () => {
		it('should return section containing the topic', () => {
			const section = getSectionByTopicId('core-mechanical');
			expect(section).toBeDefined();
			expect(section?.id).toBe('core-knowledge');
		});

		it('should return correct section for pathway topics', () => {
			const pathway2Section = getSectionByTopicId('path2-lean');
			expect(pathway2Section?.id).toBe('pathway-2');
		});

		it('should return undefined for non-existent topic', () => {
			const section = getSectionByTopicId('non-existent');
			expect(section).toBeUndefined();
		});
	});
});

describe('Data Integrity', () => {
	it('should have unique topic IDs across all sections', () => {
		const allTopicIds = sections.flatMap((s) => s.topics.map((t) => t.id));
		const uniqueIds = new Set(allTopicIds);
		expect(uniqueIds.size).toBe(allTopicIds.length);
	});

	it('should have valid section references in all topics', () => {
		const validSections: SectionType[] = [
			'core-knowledge',
			'core-skills',
			'esp',
			'placement',
			'pathway-1',
			'pathway-2',
			'pathway-3',
		];

		sections.forEach((section) => {
			section.topics.forEach((topic) => {
				expect(validSections).toContain(topic.section);
				expect(topic.section).toBe(section.id);
			});
		});
	});

	it('should have valid status values for all topics', () => {
		const validStatuses: TopicStatus[] = ['active', 'placeholder', 'coming-soon'];

		sections.forEach((section) => {
			section.topics.forEach((topic) => {
				expect(validStatuses).toContain(topic.status);
			});
		});
	});

	it('should have unique video IDs', () => {
		const allVideos = sections.flatMap((s) => s.topics.flatMap((t) => t.videos ?? []));
		const videoIds = allVideos.map((v) => v.id);
		const uniqueVideoIds = new Set(videoIds);
		expect(uniqueVideoIds.size).toBe(videoIds.length);
	});
});

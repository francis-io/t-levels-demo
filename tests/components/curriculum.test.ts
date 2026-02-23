import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import type { Pathway, Topic } from '../../src/lib/types/curriculum';

import PathwaySelector from '../../src/components/sections/PathwaySelector.svelte';
import PathwayCard from '../../src/components/trees/PathwayCard.svelte';
import TopicCard from '../../src/components/trees/TopicCard.svelte';
// Import components (will fail until implemented)
import TopicNode from '../../src/components/trees/TopicNode.svelte';

// Mock data for tests
const mockActiveTopic: Topic = {
	id: 'topic-1',
	title: 'Introduction to Programming',
	section: 'foundation',
	status: 'active',
	videos: [
		{ id: 'v1', title: 'Getting Started', duration: 300 },
		{ id: 'v2', title: 'Variables', duration: 420 },
	],
	description: 'Learn the basics of programming',
};

const mockPlaceholderTopic: Topic = {
	id: 'topic-2',
	title: 'Advanced Algorithms',
	section: 'core',
	status: 'placeholder',
	description: 'Coming soon - advanced topics',
};

const mockComingSoonTopic: Topic = {
	id: 'topic-3',
	title: 'Future Content',
	section: 'specialisation',
	status: 'coming-soon',
};

const mockPathway: Pathway = {
	id: 'pathway-1',
	title: 'Software Development',
	description: 'Learn to build software applications',
	topics: [mockActiveTopic, mockPlaceholderTopic, mockComingSoonTopic],
	videoCount: 2,
};

// ===============================
// TopicNode Tests
// ===============================
describe('TopicNode', () => {
	describe('renders correct status styles', () => {
		it('renders active topic with mint background and ring', () => {
			render(TopicNode, { props: { topic: mockActiveTopic } });

			const node = screen.getByRole('link');
			expect(node).toHaveClass('bg-brand-mint');
			expect(node).toHaveClass('ring-1');
		});

		it('renders placeholder topic without videos with gray background', () => {
			render(TopicNode, { props: { topic: mockPlaceholderTopic } });

			const node = screen.getByRole('link');
			// Placeholder topics without videos show muted gray background
			expect(node).toHaveClass('bg-gray-300');
			expect(node).toHaveClass('cursor-pointer');
		});

		it('renders coming-soon topic with gray background and lock', () => {
			render(TopicNode, { props: { topic: mockComingSoonTopic } });

			const node = screen.getByRole('link');
			expect(node).toHaveClass('bg-gray-200');
			// Should have lock icon
			expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
		});

		it('shows play icon for active topics', () => {
			render(TopicNode, { props: { topic: mockActiveTopic } });

			expect(screen.getByTestId('play-icon')).toBeInTheDocument();
		});
	});

	describe('sizes', () => {
		it('renders small size correctly', () => {
			render(TopicNode, { props: { topic: mockActiveTopic, size: 'sm' } });

			const node = screen.getByRole('link');
			expect(node).toHaveClass('w-8');
			expect(node).toHaveClass('h-8');
		});

		it('renders medium size by default', () => {
			render(TopicNode, { props: { topic: mockActiveTopic } });

			const node = screen.getByRole('link');
			expect(node).toHaveClass('w-12');
			expect(node).toHaveClass('h-12');
		});

		it('renders large size correctly', () => {
			render(TopicNode, { props: { topic: mockActiveTopic, size: 'lg' } });

			const node = screen.getByRole('link');
			expect(node).toHaveClass('w-16');
			expect(node).toHaveClass('h-16');
		});
	});

	describe('navigation', () => {
		it('has correct href for navigation', () => {
			render(TopicNode, { props: { topic: mockActiveTopic } });

			const link = screen.getByRole('link');
			expect(link).toHaveAttribute('href', '/curriculum/topic-1');
		});
	});

	describe('tooltip', () => {
		it('has title attribute for tooltip', () => {
			render(TopicNode, { props: { topic: mockActiveTopic } });

			const link = screen.getByRole('link');
			expect(link).toHaveAttribute('title', 'Introduction to Programming');
		});
	});
});

// ===============================
// TopicCard Tests
// ===============================
describe('TopicCard', () => {
	describe('content rendering', () => {
		it('displays topic title', () => {
			render(TopicCard, { props: { topic: mockActiveTopic } });

			expect(screen.getByText('Introduction to Programming')).toBeInTheDocument();
		});

		it('displays description when showDescription is true', () => {
			render(TopicCard, { props: { topic: mockActiveTopic, showDescription: true } });

			expect(screen.getByText('Learn the basics of programming')).toBeInTheDocument();
		});

		it('hides description when showDescription is false', () => {
			render(TopicCard, { props: { topic: mockActiveTopic, showDescription: false } });

			expect(screen.queryByText('Learn the basics of programming')).not.toBeInTheDocument();
		});
	});

	describe('video count', () => {
		it('shows video count when topic has videos', () => {
			render(TopicCard, { props: { topic: mockActiveTopic } });

			expect(screen.getByText(/2 videos/i)).toBeInTheDocument();
		});

		it('does not show video count when topic has no videos', () => {
			render(TopicCard, { props: { topic: mockComingSoonTopic } });

			expect(screen.queryByText(/videos/i)).not.toBeInTheDocument();
		});
	});

	describe('status badge', () => {
		it('shows Play badge for active topics', () => {
			render(TopicCard, { props: { topic: mockActiveTopic } });

			expect(screen.getByText('Play')).toBeInTheDocument();
		});

		it('shows Coming Soon badge for coming-soon topics', () => {
			render(TopicCard, { props: { topic: mockComingSoonTopic } });

			expect(screen.getByText('Coming Soon')).toBeInTheDocument();
		});
	});

	describe('styling', () => {
		it('has mint border for active topics', () => {
			render(TopicCard, { props: { topic: mockActiveTopic } });

			const card = screen.getByRole('article');
			expect(card).toHaveClass('border-l-4');
			expect(card).toHaveClass('border-brand-mint');
		});

		it('has reduced opacity for coming-soon topics', () => {
			render(TopicCard, { props: { topic: mockComingSoonTopic } });

			const card = screen.getByRole('article');
			expect(card).toHaveClass('opacity-60');
		});

		it('has card-hover class', () => {
			render(TopicCard, { props: { topic: mockActiveTopic } });

			const card = screen.getByRole('article');
			expect(card).toHaveClass('card-hover');
		});
	});

	describe('navigation', () => {
		it('has correct href for active topics', () => {
			render(TopicCard, { props: { topic: mockActiveTopic } });

			const link = screen.getByRole('link');
			expect(link).toHaveAttribute('href', '/curriculum/topic-1');
		});

		it('has cursor-default for coming-soon topics', () => {
			render(TopicCard, { props: { topic: mockComingSoonTopic } });

			const card = screen.getByRole('article');
			expect(card).toHaveClass('cursor-default');
		});
	});
});

// ===============================
// PathwayCard Tests
// ===============================
describe('PathwayCard', () => {
	describe('content rendering', () => {
		it('displays pathway title', () => {
			render(PathwayCard, { props: { pathway: mockPathway } });

			expect(screen.getByText('Software Development')).toBeInTheDocument();
		});

		it('displays pathway description', () => {
			render(PathwayCard, { props: { pathway: mockPathway } });

			expect(screen.getByText('Learn to build software applications')).toBeInTheDocument();
		});

		it('displays video count badge', () => {
			render(PathwayCard, { props: { pathway: mockPathway } });

			expect(screen.getByText(/2 videos/i)).toBeInTheDocument();
		});
	});

	describe('topic preview', () => {
		it('renders TopicNodes for topics', () => {
			render(PathwayCard, { props: { pathway: mockPathway } });

			// Should render topic nodes (checking by links to topic pages)
			const links = screen.getAllByRole('link');
			expect(links.length).toBeGreaterThan(0);
		});
	});

	describe('featured styling', () => {
		it('has featured border styling when featured', () => {
			render(PathwayCard, { props: { pathway: mockPathway, featured: true } });

			const card = screen.getByRole('article');
			expect(card).toHaveClass('border-brand-mint/50');
			expect(card).toHaveAttribute('data-featured', 'true');
		});

		it('shows Start Here badge when featured', () => {
			render(PathwayCard, { props: { pathway: mockPathway, featured: true } });

			expect(screen.getByText('Start Here')).toBeInTheDocument();
		});

		it('does not have featured styling when not featured', () => {
			render(PathwayCard, { props: { pathway: mockPathway, featured: false } });

			const card = screen.getByRole('article');
			expect(card).not.toHaveClass('border-brand-mint/50');
			expect(card).toHaveAttribute('data-featured', 'false');
		});
	});
});

// ===============================
// PathwaySelector Tests
// ===============================
describe('PathwaySelector', () => {
	const mockPathways: Pathway[] = [
		{ ...mockPathway, id: 'pathway-1' },
		{ ...mockPathway, id: 'pathway-2', title: 'Data Science' },
		{ ...mockPathway, id: 'pathway-3', title: 'Cybersecurity' },
	];

	describe('layout', () => {
		it('renders all pathways', () => {
			render(PathwaySelector, { props: { pathways: mockPathways } });

			expect(screen.getByText('Software Development')).toBeInTheDocument();
			expect(screen.getByText('Data Science')).toBeInTheDocument();
			expect(screen.getByText('Cybersecurity')).toBeInTheDocument();
		});

		it('has grid layout class', () => {
			render(PathwaySelector, { props: { pathways: mockPathways } });

			const container = screen.getByTestId('pathway-selector');
			expect(container).toHaveClass('grid');
		});
	});

	describe('featured pathway', () => {
		it('highlights pathway-2 by default', () => {
			render(PathwaySelector, { props: { pathways: mockPathways } });

			const featuredTitle = screen.getByText('Data Science');
			const featuredCard = featuredTitle.closest('article');
			expect(featuredCard).toHaveAttribute('data-featured', 'true');
		});

		it('highlights custom featured pathway', () => {
			render(PathwaySelector, {
				props: { pathways: mockPathways, featuredPathway: 'pathway-3' },
			});

			const featuredTitle = screen.getByText('Cybersecurity');
			const featuredCard = featuredTitle.closest('article');
			expect(featuredCard).toHaveAttribute('data-featured', 'true');
		});
	});
});

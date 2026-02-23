import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Breadcrumbs from '../../src/components/base/Breadcrumbs.svelte';
import Skeleton from '../../src/components/base/Skeleton.svelte';
import StatCounter from '../../src/components/base/StatCounter.svelte';
import VideoPlayer from '../../src/components/base/VideoPlayer.svelte';
import StatsBar from '../../src/components/sections/StatsBar.svelte';

describe('VideoPlayer', () => {
	it('renders play button before click', () => {
		render(VideoPlayer, {
			props: { videoId: 'dQw4w9WgXcQ', title: 'Test Video' },
		});
		expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
	});

	it('displays video title', () => {
		render(VideoPlayer, {
			props: { videoId: 'dQw4w9WgXcQ', title: 'Introduction to T-Levels' },
		});
		expect(screen.getByText('Introduction to T-Levels')).toBeInTheDocument();
	});

	it('shows thumbnail before interaction', () => {
		const { container } = render(VideoPlayer, {
			props: { videoId: 'dQw4w9WgXcQ', title: 'Test Video' },
		});
		// Should not have iframe initially (lite embed pattern)
		expect(container.querySelector('iframe')).not.toBeInTheDocument();
	});

	it('has correct aspect ratio container', () => {
		const { container } = render(VideoPlayer, {
			props: { videoId: 'dQw4w9WgXcQ', title: 'Test Video' },
		});
		const wrapper = container.firstElementChild;
		expect(wrapper).toHaveClass('aspect-video');
	});

	it('loads iframe after play button click', async () => {
		const { container } = render(VideoPlayer, {
			props: { videoId: 'dQw4w9WgXcQ', title: 'Test Video' },
		});
		const playButton = screen.getByRole('button', { name: /play/i });
		await fireEvent.click(playButton);
		expect(container.querySelector('iframe')).toBeInTheDocument();
	});

	it('sets autoplay parameter in iframe src after click', async () => {
		const { container } = render(VideoPlayer, {
			props: { videoId: 'dQw4w9WgXcQ', title: 'Test Video' },
		});
		const playButton = screen.getByRole('button', { name: /play/i });
		await fireEvent.click(playButton);
		const iframe = container.querySelector('iframe');
		expect(iframe?.src).toContain('autoplay=1');
	});
});

describe('StatCounter', () => {
	beforeEach(() => {
		// Mock IntersectionObserver
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver =
			mockIntersectionObserver as unknown as typeof IntersectionObserver;
	});

	it('displays the final value', () => {
		render(StatCounter, {
			props: { value: 56, label: 'Topics' },
		});
		// The counter should display the value (either animated or static)
		expect(screen.getByText('56')).toBeInTheDocument();
	});

	it('displays the label', () => {
		render(StatCounter, {
			props: { value: 56, label: 'Topics' },
		});
		expect(screen.getByText('Topics')).toBeInTheDocument();
	});

	it('displays suffix when provided', () => {
		render(StatCounter, {
			props: { value: 315, label: 'Hours', suffix: '+' },
		});
		expect(screen.getByText(/315/)).toBeInTheDocument();
		expect(screen.getByText(/\+/)).toBeInTheDocument();
	});

	it('applies brand-navy color to number', () => {
		const { container } = render(StatCounter, {
			props: { value: 56, label: 'Topics' },
		});
		const numberEl = container.querySelector('[class*="text-brand-navy"]');
		expect(numberEl).toBeInTheDocument();
	});

	it('applies uppercase styling to label', () => {
		const { container } = render(StatCounter, {
			props: { value: 56, label: 'Topics' },
		});
		const labelEl = container.querySelector('[class*="uppercase"]');
		expect(labelEl).toBeInTheDocument();
	});
});

describe('StatsBar', () => {
	beforeEach(() => {
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver =
			mockIntersectionObserver as unknown as typeof IntersectionObserver;
	});

	it('renders 4 stats', () => {
		render(StatsBar);
		expect(screen.getByText('56')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('3')).toBeInTheDocument();
		expect(screen.getByText('315')).toBeInTheDocument();
	});

	it('renders all stat labels', () => {
		render(StatsBar);
		expect(screen.getByText(/Curriculum Topics/i)).toBeInTheDocument();
		expect(screen.getByText(/Industry Videos/i)).toBeInTheDocument();
		expect(screen.getByText(/Career Pathways/i)).toBeInTheDocument();
		expect(screen.getByText(/Placement Hours/i)).toBeInTheDocument();
	});

	it('uses section shell layout classes', () => {
		const { container } = render(StatsBar);
		const section = container.firstElementChild;
		expect(section).toHaveClass('section-shell');
		expect(section).toHaveClass('py-0');
	});

	it('has responsive grid layout', () => {
		const { container } = render(StatsBar);
		const grid = container.querySelector('[class*="grid"]');
		expect(grid).toBeInTheDocument();
	});
});

describe('Breadcrumbs', () => {
	it('renders correct number of items', () => {
		render(Breadcrumbs, {
			props: {
				items: [
					{ label: 'Home', href: '/' },
					{ label: 'Curriculum', href: '/curriculum' },
					{ label: 'Topic 1' },
				],
			},
		});
		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Curriculum')).toBeInTheDocument();
		expect(screen.getByText('Topic 1')).toBeInTheDocument();
	});

	it('renders home icon for first item', () => {
		const { container } = render(Breadcrumbs, {
			props: {
				items: [{ label: 'Home', href: '/' }, { label: 'Page' }],
			},
		});
		const homeIcon = container.querySelector('svg');
		expect(homeIcon).toBeInTheDocument();
	});

	it('renders separator chevrons between items', () => {
		const { container } = render(Breadcrumbs, {
			props: {
				items: [
					{ label: 'Home', href: '/' },
					{ label: 'Curriculum', href: '/curriculum' },
					{ label: 'Topic' },
				],
			},
		});
		// Should have chevrons between items (2 separators for 3 items)
		const separators = container.querySelectorAll('[aria-hidden="true"]');
		expect(separators.length).toBeGreaterThanOrEqual(2);
	});

	it('last item is not a link', () => {
		render(Breadcrumbs, {
			props: {
				items: [{ label: 'Home', href: '/' }, { label: 'Current Page' }],
			},
		});
		const currentPage = screen.getByText('Current Page');
		expect(currentPage.tagName.toLowerCase()).not.toBe('a');
	});

	it('links have correct hrefs', () => {
		render(Breadcrumbs, {
			props: {
				items: [
					{ label: 'Home', href: '/' },
					{ label: 'Curriculum', href: '/curriculum' },
					{ label: 'Current' },
				],
			},
		});
		expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
		expect(screen.getByRole('link', { name: /curriculum/i })).toHaveAttribute(
			'href',
			'/curriculum',
		);
	});
});

describe('Skeleton', () => {
	it('renders with default rectangular variant', () => {
		const { container } = render(Skeleton);
		const skeleton = container.firstElementChild;
		expect(skeleton).toHaveClass('animate-pulse');
		expect(skeleton).toHaveClass('rounded');
	});

	it('renders circular variant correctly', () => {
		const { container } = render(Skeleton, {
			props: { variant: 'circular' },
		});
		const skeleton = container.firstElementChild;
		expect(skeleton).toHaveClass('rounded-full');
	});

	it('renders text variant correctly', () => {
		const { container } = render(Skeleton, {
			props: { variant: 'text' },
		});
		const skeleton = container.firstElementChild;
		expect(skeleton).toHaveClass('rounded');
	});

	it('applies custom width', () => {
		const { container } = render(Skeleton, {
			props: { width: '200px' },
		});
		const skeleton = container.firstElementChild as HTMLElement;
		expect(skeleton.style.width).toBe('200px');
	});

	it('applies custom height', () => {
		const { container } = render(Skeleton, {
			props: { height: '100px' },
		});
		const skeleton = container.firstElementChild as HTMLElement;
		expect(skeleton.style.height).toBe('100px');
	});

	it('applies additional class names', () => {
		const { container } = render(Skeleton, {
			props: { class: 'my-custom-class' },
		});
		const skeleton = container.firstElementChild;
		expect(skeleton).toHaveClass('my-custom-class');
	});

	it('has gray background', () => {
		const { container } = render(Skeleton);
		const skeleton = container.firstElementChild;
		expect(skeleton).toHaveClass('bg-gray-200');
	});
});

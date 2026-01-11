import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

// Import components (will fail until implemented)
import Button from '@/components/base/Button.svelte';
import Card from '@/components/base/Card.svelte';
import Badge from '@/components/base/Badge.svelte';

describe('Button Component', () => {
	describe('variants', () => {
		it('renders primary variant with correct classes', () => {
			render(Button, { props: { variant: 'primary' } });
			const button = screen.getByRole('button');
			expect(button).toBeInTheDocument();
			expect(button.className).toContain('bg-brand-mint');
			expect(button.className).toContain('text-brand-navy');
		});

		it('renders secondary variant with correct classes', () => {
			render(Button, { props: { variant: 'secondary' } });
			const button = screen.getByRole('button');
			expect(button.className).toContain('border-2');
			expect(button.className).toContain('border-brand-navy');
			expect(button.className).toContain('text-brand-navy');
		});

		it('renders ghost variant with correct classes', () => {
			render(Button, { props: { variant: 'ghost' } });
			const button = screen.getByRole('button');
			expect(button.className).toContain('text-brand-navy');
		});

		it('defaults to primary variant when not specified', () => {
			render(Button, { props: {} });
			const button = screen.getByRole('button');
			expect(button.className).toContain('bg-brand-mint');
		});
	});

	describe('sizes', () => {
		it('renders small size with correct classes', () => {
			render(Button, { props: { size: 'sm' } });
			const button = screen.getByRole('button');
			expect(button.className).toContain('px-3');
			expect(button.className).toContain('py-1.5');
			expect(button.className).toContain('text-sm');
		});

		it('renders medium size with correct classes', () => {
			render(Button, { props: { size: 'md' } });
			const button = screen.getByRole('button');
			expect(button.className).toContain('px-4');
			expect(button.className).toContain('py-2');
		});

		it('renders large size with correct classes', () => {
			render(Button, { props: { size: 'lg' } });
			const button = screen.getByRole('button');
			expect(button.className).toContain('px-6');
			expect(button.className).toContain('py-3');
			expect(button.className).toContain('text-lg');
		});

		it('defaults to medium size when not specified', () => {
			render(Button, { props: {} });
			const button = screen.getByRole('button');
			expect(button.className).toContain('px-4');
			expect(button.className).toContain('py-2');
		});
	});

	describe('link behavior', () => {
		it('renders as <a> element when href is provided', () => {
			render(Button, { props: { href: '/test-link' } });
			const link = screen.getByRole('link');
			expect(link).toBeInTheDocument();
			expect(link.tagName.toLowerCase()).toBe('a');
			expect(link).toHaveAttribute('href', '/test-link');
		});

		it('renders as <button> element when href is not provided', () => {
			render(Button, { props: {} });
			const button = screen.getByRole('button');
			expect(button).toBeInTheDocument();
			expect(button.tagName.toLowerCase()).toBe('button');
		});
	});

	describe('disabled state', () => {
		it('applies disabled attribute when disabled prop is true', () => {
			render(Button, { props: { disabled: true } });
			const button = screen.getByRole('button');
			expect(button).toBeDisabled();
		});

		it('is not disabled by default', () => {
			render(Button, { props: {} });
			const button = screen.getByRole('button');
			expect(button).not.toBeDisabled();
		});
	});

	describe('custom class', () => {
		it('accepts and applies custom class prop', () => {
			render(Button, { props: { class: 'custom-class' } });
			const button = screen.getByRole('button');
			expect(button.className).toContain('custom-class');
		});
	});

	describe('base styles', () => {
		it('has font-semibold, rounded-lg, and transition classes', () => {
			render(Button, { props: {} });
			const button = screen.getByRole('button');
			expect(button.className).toContain('font-semibold');
			expect(button.className).toContain('rounded-lg');
			expect(button.className).toContain('transition-all');
		});
	});
});

describe('Card Component', () => {
	describe('variants', () => {
		it('renders default variant with correct classes', () => {
			render(Card, { props: { variant: 'default' } });
			const card = screen.getByTestId('card');
			expect(card.className).toContain('bg-white');
			expect(card.className).toContain('rounded-xl');
		});

		it('renders elevated variant with shadow', () => {
			render(Card, { props: { variant: 'elevated' } });
			const card = screen.getByTestId('card');
			expect(card.className).toContain('shadow-lg');
		});

		it('renders outlined variant with border', () => {
			render(Card, { props: { variant: 'outlined' } });
			const card = screen.getByTestId('card');
			expect(card.className).toContain('border');
			expect(card.className).toContain('border-gray-200');
		});

		it('defaults to default variant when not specified', () => {
			render(Card, { props: {} });
			const card = screen.getByTestId('card');
			expect(card.className).toContain('bg-white');
			expect(card.className).toContain('rounded-xl');
		});
	});

	describe('hoverable', () => {
		it('applies card-hover class when hoverable is true', () => {
			render(Card, { props: { hoverable: true } });
			const card = screen.getByTestId('card');
			expect(card.className).toContain('card-hover');
		});

		it('does not apply card-hover class by default', () => {
			render(Card, { props: {} });
			const card = screen.getByTestId('card');
			expect(card.className).not.toContain('card-hover');
		});
	});

	describe('custom class', () => {
		it('accepts and applies custom class prop', () => {
			render(Card, { props: { class: 'custom-card-class' } });
			const card = screen.getByTestId('card');
			expect(card.className).toContain('custom-card-class');
		});
	});
});

describe('Badge Component', () => {
	describe('variants', () => {
		it('renders success variant with correct classes', () => {
			render(Badge, { props: { variant: 'success' } });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('bg-brand-mint/20');
			expect(badge.className).toContain('text-brand-navy');
		});

		it('renders warning variant with correct classes', () => {
			render(Badge, { props: { variant: 'warning' } });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('bg-yellow-100');
			expect(badge.className).toContain('text-yellow-800');
		});

		it('renders info variant with correct classes', () => {
			render(Badge, { props: { variant: 'info' } });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('bg-brand-cyan/20');
			expect(badge.className).toContain('text-brand-navy');
		});

		it('renders muted variant with correct classes', () => {
			render(Badge, { props: { variant: 'muted' } });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('bg-gray-100');
			expect(badge.className).toContain('text-gray-600');
		});

		it('defaults to info variant when not specified', () => {
			render(Badge, { props: {} });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('bg-brand-cyan/20');
			expect(badge.className).toContain('text-brand-navy');
		});
	});

	describe('sizes', () => {
		it('renders small size with correct classes', () => {
			render(Badge, { props: { size: 'sm' } });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('text-xs');
			expect(badge.className).toContain('px-2');
			expect(badge.className).toContain('py-0.5');
		});

		it('renders medium size with correct classes', () => {
			render(Badge, { props: { size: 'md' } });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('text-sm');
			expect(badge.className).toContain('px-3');
			expect(badge.className).toContain('py-1');
		});

		it('defaults to small size when not specified', () => {
			render(Badge, { props: {} });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('text-xs');
			expect(badge.className).toContain('px-2');
		});
	});

	describe('base styles', () => {
		it('has rounded-full and font-medium classes', () => {
			render(Badge, { props: {} });
			const badge = screen.getByTestId('badge');
			expect(badge.className).toContain('rounded-full');
			expect(badge.className).toContain('font-medium');
		});
	});
});

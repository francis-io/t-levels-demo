import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Header from '../../src/components/layout/Header.svelte';
import Footer from '../../src/components/layout/Footer.svelte';
import MobileMenu from '../../src/components/layout/MobileMenu.svelte';
import Container from '../../src/components/layout/Container.svelte';

describe('Header', () => {
	it('renders the logo image', () => {
		render(Header);
		expect(screen.getByRole('img', { name: /tlc/i })).toBeInTheDocument();
	});

	it('renders navigation links', () => {
		render(Header);
		expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /curriculum/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
	});

	it('navigation links have correct hrefs', () => {
		render(Header);
		expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
		expect(screen.getByRole('link', { name: /curriculum/i })).toHaveAttribute('href', '/curriculum?pathway=pathway-2');
		expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
	});

	it('highlights current page with brand-mint underline', () => {
		render(Header, { props: { currentPath: '/curriculum' } });
		const curriculumLink = screen.getByRole('link', { name: /curriculum/i });
		expect(curriculumLink.className).toContain('border-brand-mint');
	});

	it('renders mobile menu button', () => {
		render(Header);
		const menuButton = screen.getByRole('button', { name: /menu/i });
		expect(menuButton).toBeInTheDocument();
	});

	it('has sticky header with backdrop blur classes', () => {
		const { container } = render(Header);
		const header = container.querySelector('header');
		expect(header).toHaveClass('sticky');
		expect(header).toHaveClass('backdrop-blur-sm');
	});
});

describe('Footer', () => {
	it('renders the logo image', () => {
		render(Footer);
		expect(screen.getByRole('img', { name: /tlc/i })).toBeInTheDocument();
	});

	it('renders navigation links', () => {
		render(Footer);
		expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /curriculum/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
	});

	it('renders copyright notice', () => {
		render(Footer);
		expect(screen.getByText(/© 2026 TLC/)).toBeInTheDocument();
	});

	it('renders contact link', () => {
		render(Footer);
		const contactLink = screen.getByRole('link', { name: /contact/i });
		expect(contactLink).toBeInTheDocument();
		expect(contactLink).toHaveAttribute('href', 'mailto:info@tlc-learning.co.uk');
	});

	it('has dark background styling', () => {
		const { container } = render(Footer);
		const footer = container.querySelector('footer');
		expect(footer).toHaveClass('bg-gray-900');
	});
});

describe('MobileMenu', () => {
	it('renders when isOpen is true', () => {
		render(MobileMenu, { props: { isOpen: true } });
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('does not render when isOpen is false', () => {
		render(MobileMenu, { props: { isOpen: false } });
		expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
	});

	it('renders navigation links when open', () => {
		render(MobileMenu, { props: { isOpen: true } });
		expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /curriculum/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
	});

	it('renders close button', () => {
		render(MobileMenu, { props: { isOpen: true } });
		expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
	});

	it('highlights current page', () => {
		render(MobileMenu, { props: { isOpen: true, currentPath: '/about' } });
		const aboutLink = screen.getByRole('link', { name: /about/i });
		expect(aboutLink.className).toContain('text-brand-mint');
	});

	it('has overlay styling', () => {
		const { container } = render(MobileMenu, { props: { isOpen: true } });
		const overlay = container.querySelector('[class*="fixed"]');
		expect(overlay).toHaveClass('inset-0');
	});
});

describe('Container', () => {
	it('renders children content', () => {
		const { container } = render(Container, {
			props: {},
		});
		expect(container.querySelector('div')).toBeInTheDocument();
	});

	it('applies lg size by default', () => {
		const { container } = render(Container);
		const div = container.querySelector('div');
		expect(div).toHaveClass('max-w-7xl');
	});

	it('applies sm size correctly', () => {
		const { container } = render(Container, { props: { size: 'sm' } });
		const div = container.querySelector('div');
		expect(div).toHaveClass('max-w-3xl');
	});

	it('applies md size correctly', () => {
		const { container } = render(Container, { props: { size: 'md' } });
		const div = container.querySelector('div');
		expect(div).toHaveClass('max-w-5xl');
	});

	it('applies full size correctly', () => {
		const { container } = render(Container, { props: { size: 'full' } });
		const div = container.querySelector('div');
		expect(div).toHaveClass('max-w-full');
	});

	it('has responsive padding classes', () => {
		const { container } = render(Container);
		const div = container.querySelector('div');
		expect(div).toHaveClass('px-4');
		expect(div).toHaveClass('mx-auto');
	});

	it('accepts additional class names', () => {
		const { container } = render(Container, { props: { class: 'my-custom-class' } });
		const div = container.querySelector('div');
		expect(div).toHaveClass('my-custom-class');
	});
});

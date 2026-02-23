<script lang="ts">
import MobileMenu from './MobileMenu.svelte';

interface Props {
	currentPath?: string;
}

const { currentPath = '/' }: Props = $props();
let mobileMenuOpen = $state(false);

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/curriculum?pathway=pathway-2', label: 'Curriculum' },
	{ href: '/lessons', label: 'Lessons' },
	{ href: '/about', label: 'About' },
];

function toggleMobileMenu() {
	mobileMenuOpen = !mobileMenuOpen;
}

function isActive(href: string): boolean {
	if (href === '/') {
		return currentPath === '/';
	}
	// Strip query params for comparison
	const basePath = href.split('?')[0];
	return currentPath?.startsWith(basePath) ?? false;
}
</script>

<header class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
	<div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<img src="/logo.png" alt="TLC" class="h-[60px] w-auto" />
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden tablet:flex items-center gap-8" aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-gray-600 hover:text-brand-navy transition-colors py-2 border-b-2 {isActive(link.href) ? 'border-brand-mint text-brand-navy' : 'border-transparent'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Mobile Menu Button -->
		<button
			type="button"
			class="tablet:hidden p-2 text-gray-600 hover:text-brand-navy"
			onclick={toggleMobileMenu}
			aria-label="Menu"
			aria-expanded={mobileMenuOpen}
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>
</header>

<!-- Mobile Menu -->
<MobileMenu
	isOpen={mobileMenuOpen}
	{currentPath}
	onClose={() => mobileMenuOpen = false}
/>

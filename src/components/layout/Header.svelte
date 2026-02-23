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

<header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
	<div class="content-shell flex h-20 items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<img src="/logo.png" alt="TLC" class="h-[60px] w-auto" />
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden tablet:flex items-center gap-3" aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class="rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors {isActive(link.href)
						? 'bg-brand-navy text-white'
						: 'text-ink-700 hover:bg-slate-100 hover:text-brand-navy'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Mobile Menu Button -->
		<button
			type="button"
			class="tablet:hidden rounded-md p-2 text-ink-700 hover:bg-slate-100 hover:text-brand-navy"
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

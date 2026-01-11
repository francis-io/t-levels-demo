<script lang="ts">
import { fade, fly } from 'svelte/transition';

interface Props {
	isOpen: boolean;
	currentPath?: string;
	onClose?: () => void;
}

const { isOpen, currentPath = '/', onClose }: Props = $props();

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/curriculum', label: 'Curriculum' },
	{ href: '/about', label: 'About' },
];

function handleClose() {
	onClose?.();
}

function isActive(href: string): boolean {
	if (href === '/') {
		return currentPath === '/';
	}
	return currentPath?.startsWith(href) ?? false;
}
</script>

{#if isOpen}
	<!-- Overlay -->
	<div
		class="fixed inset-0 bg-brand-navy/95 z-50"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
		aria-label="Mobile menu"
	>
		<!-- Close Button -->
		<button
			type="button"
			class="absolute top-4 right-4 p-2 text-white hover:text-brand-mint"
			onclick={handleClose}
			aria-label="Close menu"
		>
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<!-- Navigation -->
		<nav
			class="flex flex-col items-center justify-center h-full"
			transition:fly={{ x: 100, duration: 300 }}
			aria-label="Mobile navigation"
		>
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-white text-xl py-4 px-8 hover:text-brand-mint transition-colors {isActive(link.href) ? 'text-brand-mint' : ''}"
					onclick={handleClose}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
{/if}

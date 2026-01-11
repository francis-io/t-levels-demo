<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	href?: string;
	disabled?: boolean;
	class?: string;
	children?: Snippet;
}

const {
	variant = 'primary',
	size = 'md',
	href,
	disabled = false,
	class: className = '',
	children,
}: Props = $props();

const baseClasses =
	'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center card-hover';

const variantClasses = {
	primary: 'bg-brand-mint text-brand-navy hover:bg-opacity-90',
	secondary: 'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white',
	ghost: 'text-brand-navy hover:bg-gray-100',
};

const sizeClasses = {
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2',
	lg: 'px-6 py-3 text-lg',
};

const allClasses = $derived(
	`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim(),
);
</script>

{#if href}
	<a {href} class={allClasses}>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button {disabled} class={allClasses}>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}

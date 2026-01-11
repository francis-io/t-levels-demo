<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
	variant?: 'success' | 'warning' | 'info' | 'muted';
	size?: 'sm' | 'md';
	children?: Snippet;
}

const { variant = 'info', size = 'sm', children }: Props = $props();

const baseClasses = 'inline-flex items-center rounded-full font-medium';

const variantClasses = {
	success: 'bg-brand-mint/20 text-brand-navy',
	warning: 'bg-yellow-100 text-yellow-800',
	info: 'bg-brand-cyan/20 text-brand-navy',
	muted: 'bg-gray-100 text-gray-600',
};

const sizeClasses = {
	sm: 'text-xs px-2 py-0.5',
	md: 'text-sm px-3 py-1',
};

const allClasses = $derived(
	`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`.trim(),
);
</script>

<span class={allClasses} data-testid="badge">
	{#if children}
		{@render children()}
	{/if}
</span>

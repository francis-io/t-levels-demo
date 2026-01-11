<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
	size?: 'sm' | 'md' | 'lg' | 'full';
	class?: string;
	children?: Snippet;
}

const { size = 'lg', class: className = '', children }: Props = $props();

const sizeClasses: Record<string, string> = {
	sm: 'max-w-3xl',
	md: 'max-w-5xl',
	lg: 'max-w-7xl',
	full: 'max-w-full',
};

const baseClasses = 'mx-auto px-4 tablet:px-6 desktop:px-8';
</script>

<div class="{baseClasses} {sizeClasses[size]} {className}">
	{@render children?.()}
</div>

<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
	variant?: 'default' | 'elevated' | 'outlined';
	hoverable?: boolean;
	class?: string;
	children?: Snippet;
	header?: Snippet;
	footer?: Snippet;
}

const {
	variant = 'default',
	hoverable = false,
	class: className = '',
	children,
	header,
	footer,
}: Props = $props();

const baseClasses = 'bg-white rounded-xl';

const variantClasses = {
	default: '',
	elevated: 'shadow-lg',
	outlined: 'border border-gray-200',
};

const hoverableClass = $derived(hoverable ? 'card-hover' : '');

const allClasses = $derived(
	`${baseClasses} ${variantClasses[variant]} ${hoverableClass} ${className}`.trim(),
);
</script>

<div class={allClasses} data-testid="card">
	{#if header}
		<div class="card-header">
			{@render header()}
		</div>
	{/if}

	{#if children}
		{@render children()}
	{/if}

	{#if footer}
		<div class="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>

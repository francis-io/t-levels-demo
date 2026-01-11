<script lang="ts">
interface Props {
	variant?: 'text' | 'circular' | 'rectangular';
	width?: string;
	height?: string;
	class?: string;
}

const { variant = 'rectangular', width, height, class: className = '' }: Props = $props();

const variantClasses = $derived(variant === 'circular' ? 'rounded-full' : 'rounded');
</script>

<div
	class="animate-pulse bg-gray-200 {variantClasses} {className}"
	style:width
	style:height
	aria-hidden="true"
></div>

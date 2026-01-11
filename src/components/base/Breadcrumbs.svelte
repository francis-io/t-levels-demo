<script lang="ts">
interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface Props {
	items: BreadcrumbItem[];
}

const { items }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm">
	{#each items as item, index}
		{#if index > 0}
			<svg
				class="h-4 w-4 flex-shrink-0 text-gray-400"
				fill="currentColor"
				viewBox="0 0 20 20"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}

		{#if index === items.length - 1}
			<!-- Current page - not a link -->
			<span class="font-medium text-brand-navy truncate max-w-[150px] tablet:max-w-none">
				{item.label}
			</span>
		{:else if item.href}
			<a
				href={item.href}
				class="flex items-center gap-1 text-gray-500 hover:text-brand-navy transition-colors truncate max-w-[100px] tablet:max-w-none"
			>
				{#if index === 0}
					<!-- Home icon for first item -->
					<svg
						class="h-4 w-4 flex-shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
				<span>{item.label}</span>
			</a>
		{:else}
			<span class="text-gray-500 truncate max-w-[100px] tablet:max-w-none">
				{item.label}
			</span>
		{/if}
	{/each}
</nav>

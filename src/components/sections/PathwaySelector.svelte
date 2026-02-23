<script lang="ts">
import type { Pathway } from '../../lib/types/curriculum';
import PathwayCard from '../trees/PathwayCard.svelte';

interface Props {
	pathways: Pathway[];
	featuredPathway?: string;
}

const { pathways, featuredPathway = 'pathway-2' }: Props = $props();

const featured = $derived(
	pathways.find((pathway) => pathway.id === featuredPathway) ?? pathways[0],
);
const supporting = $derived(pathways.filter((pathway) => pathway.id !== featured?.id));
</script>

<section
	data-testid="pathway-selector"
	class="grid grid-cols-1 gap-6 desktop:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
>
	{#if featured}
		<PathwayCard pathway={featured} featured={true} />
	{/if}

	<div class="rounded-xl border border-gray-200 bg-white" aria-label="Supporting pathways">
		<div class="divide-y divide-gray-200">
			{#each supporting as pathway (pathway.id)}
				<div class="p-4 tablet:p-5">
					<PathwayCard {pathway} compact={true} />
				</div>
			{/each}
		</div>
	</div>
</section>

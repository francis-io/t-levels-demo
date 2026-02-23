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

	<div
		class="rounded-2xl border border-slate-200 bg-white/95 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.6)]"
		aria-label="Supporting pathways"
	>
		<div class="divide-y divide-slate-200">
			{#each supporting as pathway (pathway.id)}
				<div class="p-5 tablet:p-6">
					<PathwayCard {pathway} compact={true} />
				</div>
			{/each}
		</div>
	</div>
</section>

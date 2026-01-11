<script lang="ts">
import type { Pathway } from '../../lib/types/curriculum';
import PathwayCard from '../trees/PathwayCard.svelte';

interface Props {
	pathways: Pathway[];
	featuredPathway?: string;
}

const { pathways, featuredPathway = 'pathway-2' }: Props = $props();
</script>

<section
	data-testid="pathway-selector"
	class="
    grid gap-6
    grid-cols-1 md:grid-cols-3
    items-start
  "
>
	{#each pathways as pathway (pathway.id)}
		<PathwayCard {pathway} featured={pathway.id === featuredPathway} />
	{/each}
</section>

<style>
	/* Connection lines between pathways (desktop only) */
	@media (min-width: 768px) {
		section::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 33%;
			right: 33%;
			height: 2px;
			background: linear-gradient(90deg, #50e8a8, #50d8e8);
			z-index: -1;
		}
	}
</style>

<script lang="ts">
import StatCounter from '../base/StatCounter.svelte';

const stats = [
	{ value: 56, label: 'Curriculum Topics' },
	{ value: 100, label: 'Industry Videos', suffix: '+' },
	{ value: 3, label: 'Career Pathways' },
	{ value: 315, label: 'Placement Hours', suffix: '+' },
];
</script>

<section class="bg-brand-navy py-12 tablet:py-16">
	<div class="max-w-7xl mx-auto px-4">
		<div class="grid grid-cols-2 tablet:grid-cols-4 gap-8 tablet:gap-4">
			{#each stats as stat}
				<StatCounter
					value={stat.value}
					label={stat.label}
					suffix={stat.suffix}
				/>
			{/each}
		</div>
	</div>
</section>

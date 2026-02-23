<script lang="ts">
import StatCounter from '../base/StatCounter.svelte';

const stats = [
	{ value: 56, label: 'Curriculum Topics' },
	{ value: 100, label: 'Industry Videos', suffix: '+' },
	{ value: 3, label: 'Career Pathways' },
	{ value: 315, label: 'Placement Hours', suffix: '+' },
];
</script>

<section class="section-shell py-0">
	<div class="content-shell">
		<div
			class="grid grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.55)] backdrop-blur ring-1 ring-brand-mint/25 tablet:grid-cols-4 tablet:gap-4 tablet:p-7"
		>
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

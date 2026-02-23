<script lang="ts">
import type { Lesson } from '$lib/types/lessons';
import { writable } from 'svelte/store';

interface Zone {
	id: string;
	label: string;
	description: string;
}

interface Props {
	lesson: Lesson;
}

const { lesson }: Props = $props();

const zones: Zone[] =
	lesson.slug === 'lean-8-wastes-walk'
		? [
				{
					id: 'transport',
					label: 'Transport',
					description: 'Track unnecessary movement between process points.',
				},
				{ id: 'waiting', label: 'Waiting', description: 'Spot idle time and queue delays.' },
				{
					id: 'defects',
					label: 'Defects',
					description: 'Capture rework loops and quality losses.',
				},
				{ id: 'skills', label: 'Skills', description: 'Observe unused capability and ideas.' },
			]
		: [
				{
					id: 'sort',
					label: 'Sort',
					description: 'Separate needed from unnecessary tools and items.',
				},
				{
					id: 'set-in-order',
					label: 'Set in order',
					description: 'Define fixed locations and visual finding logic.',
				},
				{
					id: 'shine',
					label: 'Shine',
					description: 'Clean area and expose abnormalities quickly.',
				},
				{
					id: 'sustain',
					label: 'Sustain',
					description: 'Maintain standards with routines and ownership.',
				},
			];

const activeZoneId = writable(zones[0].id);
const activeZone = $derived(zones.find((zone) => zone.id === $activeZoneId) ?? zones[0]);
</script>

<section class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Simulator view">
	<h2 class="text-xl font-semibold text-brand-navy">Simulator</h2>
	<p class="mt-1 text-sm text-gray-600">Use the interactive zone buttons, then reference the non-visual table for equivalent details.</p>
	<div class="mt-4 grid gap-4 tablet:grid-cols-[1fr_18rem]">
		<div class="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
			{#each zones as zone}
				<button
					type="button"
					onclick={() => activeZoneId.set(zone.id)}
					class="min-h-11 rounded-md border px-3 py-2 text-sm font-semibold {$activeZoneId === zone.id ? 'border-brand-navy bg-brand-navy text-white' : 'border-gray-300 bg-white text-gray-700'}"
				>
					{zone.label}
				</button>
			{/each}
		</div>
		<div class="rounded-lg border border-gray-200 p-3">
			<h3 class="text-sm font-semibold text-brand-navy">Active zone</h3>
			<p class="mt-2 text-sm font-semibold text-gray-900">{activeZone.label}</p>
			<p class="mt-1 text-sm text-gray-700">{activeZone.description}</p>
		</div>
	</div>

	<table class="mt-4 w-full border-collapse text-left text-xs" aria-label="Simulator non-visual equivalent">
		<thead>
			<tr class="border-b border-gray-200 text-gray-600">
				<th class="p-2">Zone</th>
				<th class="p-2">Observation focus</th>
			</tr>
		</thead>
		<tbody>
			{#each zones as zone}
				<tr class="border-b border-gray-100">
					<td class="p-2 font-semibold text-brand-navy">{zone.label}</td>
					<td class="p-2 text-gray-700">{zone.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

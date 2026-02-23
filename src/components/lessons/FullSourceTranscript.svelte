<script lang="ts">
interface Props {
	title: string;
	markdown: string;
	id?: string;
	onOpened?: () => void;
}

const { title, markdown, id = 'full-source-transcript', onOpened }: Props = $props();

function handleToggle(event: Event) {
	const details = event.currentTarget as HTMLDetailsElement;
	if (details.open) {
		onOpened?.();
	}
}
</script>

<section id={id} class="rounded-xl border border-gray-200 bg-white p-5" aria-label="Full source transcript">
	<details ontoggle={handleToggle}>
		<summary class="cursor-pointer text-lg font-semibold text-brand-navy">Full source transcript: {title}</summary>
		<pre class="mt-4 max-h-[24rem] overflow-auto rounded-lg bg-gray-950 p-4 text-xs text-gray-100"><code>{markdown}</code></pre>
	</details>
</section>

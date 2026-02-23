<script lang="ts">
interface Props {
	quote: string;
	author: string;
	role: string;
	organization: string;
}

const { quote, author, role, organization }: Props = $props();
</script>

<div class="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm tablet:p-8">
	<blockquote class="mb-6">
		<p class="text-lg leading-relaxed text-slate-100">
			{quote}
		</p>
	</blockquote>

	<footer class="border-t border-white/15 pt-4">
		<div class="font-semibold text-brand-mint">
			{author}
		</div>
		<div class="mt-1 text-sm text-slate-200">
			{role}
		</div>
		<div class="text-sm text-slate-300">
			{organization}
		</div>
	</footer>
</div>

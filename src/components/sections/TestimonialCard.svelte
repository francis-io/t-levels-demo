<script lang="ts">
interface Props {
	quote: string;
	author: string;
	role: string;
	organization: string;
}

const { quote, author, role, organization }: Props = $props();
</script>

<div class="rounded-xl border border-gray-200 bg-white p-6 tablet:p-8">
	<blockquote class="mb-6">
		<p class="text-lg leading-relaxed text-gray-700">
			{quote}
		</p>
	</blockquote>

	<footer class="border-t border-gray-100 pt-4">
		<div class="font-semibold text-brand-navy">
			{author}
		</div>
		<div class="mt-1 text-sm text-gray-600">
			{role}
		</div>
		<div class="text-sm text-gray-500">
			{organization}
		</div>
	</footer>
</div>

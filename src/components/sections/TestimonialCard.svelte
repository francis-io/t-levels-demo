<script lang="ts">
interface Props {
	quote: string;
	author: string;
	role: string;
	organization: string;
}

const { quote, author, role, organization }: Props = $props();
</script>

<div class="bg-white rounded-xl p-6 tablet:p-8 shadow-lg card-hover">
	<!-- Quote Icon -->
	<div class="text-brand-mint text-5xl font-serif leading-none mb-4" aria-hidden="true">
		"
	</div>

	<!-- Quote Text -->
	<blockquote class="mb-6">
		<p class="text-gray-700 italic text-lg leading-relaxed">
			{quote}
		</p>
	</blockquote>

	<!-- Author Info -->
	<footer class="border-t border-gray-100 pt-4">
		<div class="text-brand-navy font-semibold">
			{author}
		</div>
		<div class="text-gray-600 text-sm mt-1">
			{role}
		</div>
		<div class="text-gray-500 text-sm">
			{organization}
		</div>
	</footer>
</div>

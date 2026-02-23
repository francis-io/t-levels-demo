<script lang="ts">
const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/curriculum', label: 'Curriculum' },
	{ href: '/lessons', label: 'Lessons' },
	{ href: '/about', label: 'About' },
];
</script>

<footer class="bg-gray-900 text-gray-400 py-6">
	<div class="max-w-7xl mx-auto px-4">
		<div class="flex flex-col tablet:flex-row items-center justify-between gap-4">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3">
				<div class="rounded-md bg-gray-100 p-1.5">
					<img src="/logo.png" alt="TLC" class="h-10 w-auto" />
				</div>
				<span class="text-sm text-gray-500 hidden tablet:inline">
					Engineering Education, Connected
				</span>
			</a>

			<!-- Navigation Links -->
			<nav class="flex items-center gap-6" aria-label="Footer navigation">
				{#each navLinks as link}
					<a href={link.href} class="text-sm hover:text-white transition-colors">
						{link.label}
					</a>
				{/each}
				<a href="mailto:info@tlc-learning.co.uk" class="text-sm hover:text-white transition-colors">
					Contact
				</a>
			</nav>

			<!-- Copyright -->
			<div class="text-xs text-gray-500">
				&copy; 2026 TLC
			</div>
		</div>
	</div>
</footer>

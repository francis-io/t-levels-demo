<script lang="ts">
const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/curriculum', label: 'Curriculum' },
	{ href: '/lessons', label: 'Lessons' },
	{ href: '/about', label: 'About' },
];
</script>

<footer class="border-t border-slate-200 bg-slate-950 py-8 text-slate-300">
	<div class="content-shell">
		<div class="flex flex-col tablet:flex-row items-center justify-between gap-4">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3">
				<div class="rounded-md bg-white/90 p-1.5">
					<img src="/logo.png" alt="TLC" class="h-10 w-auto" />
				</div>
				<span class="hidden text-sm text-slate-400 tablet:inline">
					Engineering Education, Connected
				</span>
			</a>

			<!-- Navigation Links -->
			<nav class="flex items-center gap-6" aria-label="Footer navigation">
				{#each navLinks as link}
					<a href={link.href} class="text-sm font-medium hover:text-brand-mint transition-colors">
						{link.label}
					</a>
				{/each}
				<a href="mailto:info@tlc-learning.co.uk" class="text-sm font-medium hover:text-brand-mint transition-colors">
					Contact
				</a>
			</nav>

			<!-- Copyright -->
			<div class="text-xs text-slate-400">
				&copy; 2026 TLC
			</div>
		</div>
	</div>
</footer>

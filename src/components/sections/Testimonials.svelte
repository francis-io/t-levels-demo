<script lang="ts">
import TestimonialCard from './TestimonialCard.svelte';

const testimonials = [
	{
		quote:
			'The platform transforms how I teach mechanical principles. Instead of describing a hydraulic press, I can show one in operation. Students get it immediately.',
		author: 'Sarah Mitchell',
		role: 'Engineering Lecturer',
		organization: 'East Durham College',
	},
	{
		quote:
			"We've been looking for ways to connect with local colleges. TLC gives us a direct line to future talent while supporting their education.",
		author: 'James Thornton',
		role: 'Operations Director',
		organization: 'Northeast Manufacturing Ltd',
	},
];
</script>

<section class="py-16 tablet:py-20 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4">
		<!-- Section Title -->
		<h2 class="text-3xl tablet:text-4xl font-bold text-brand-navy text-center mb-12">
			What People Say
		</h2>

		<!-- Testimonials Grid -->
		<div class="grid grid-cols-1 tablet:grid-cols-2 gap-8">
			{#each testimonials as testimonial}
				<TestimonialCard
					quote={testimonial.quote}
					author={testimonial.author}
					role={testimonial.role}
					organization={testimonial.organization}
				/>
			{/each}
		</div>
	</div>
</section>

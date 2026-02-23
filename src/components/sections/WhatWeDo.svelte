<script lang="ts">
type SegmentColor = 'mint' | 'cyan' | 'navy';
type SegmentId = 'teachers' | 'employers' | 'students';

interface Segment {
	id: SegmentId;
	title: string;
	subtitle: string;
	description: string;
	icon: string;
	color: SegmentColor;
	x: number;
	y: number;
	pulseDuration: string;
}

let activeSegment = $state<SegmentId | null>(null);

const segments: Segment[] = [
	{
		id: 'teachers',
		title: 'Teachers',
		subtitle: 'Empower Your Classroom',
		description:
			'Access curated video content aligned with the T-Level curriculum. Save time on content creation and inspire students with authentic engineering experiences.',
		icon: '📚',
		color: 'mint',
		x: 200,
		y: 48,
		pulseDuration: '2s',
	},
	{
		id: 'employers',
		title: 'Employers',
		subtitle: 'Shape Future Talent',
		description:
			'Invest in education by funding content creation, showcase your organization to future talent, and help shape the next generation of skilled engineers.',
		icon: '🏭',
		color: 'cyan',
		x: 320,
		y: 318,
		pulseDuration: '2.5s',
	},
	{
		id: 'students',
		title: 'Students',
		subtitle: 'Build Your Future',
		description:
			'Connect classroom learning to exciting career paths, see real engineers at work, and prepare for your industry placement with confidence.',
		icon: '🎓',
		color: 'navy',
		x: 80,
		y: 318,
		pulseDuration: '2.2s',
	},
];

const centerPoint = { x: 200, y: 200 };

const gradientByColor = {
	mint: 'line-grad-mint',
	cyan: 'line-grad-cyan',
	navy: 'line-grad-navy',
} as const;

const fillByColor = {
	mint: '#50E8A8',
	cyan: '#50D8E8',
	navy: '#1E1B4B',
} as const;

function handleHover(id: SegmentId | null) {
	activeSegment = id;
}
</script>

<section class="py-16 tablet:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
	<div class="container mx-auto px-4">
		<h2
			class="text-3xl tablet:text-4xl font-display font-bold text-brand-navy mb-4 text-center"
		>
			What We Do
		</h2>
		<p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8 tablet:mb-16">
			Connecting the three pillars of engineering education
		</p>

		<!-- Mobile Stacked Layout -->
		<div class="tablet:hidden space-y-6">
			{#each segments as segment}
				<div
					class="bg-white rounded-xl p-6 shadow-lg border-l-4"
					class:border-brand-mint={segment.color === 'mint'}
					class:border-brand-cyan={segment.color === 'cyan'}
					class:border-brand-navy={segment.color === 'navy'}
				>
					<div class="flex items-center gap-4 mb-3">
						<div
							class="w-14 h-14 rounded-full flex items-center justify-center shadow-md border-2 {segment.color === 'mint' ? 'border-brand-mint bg-emerald-50' : segment.color === 'cyan' ? 'border-brand-cyan bg-cyan-50' : 'border-brand-navy bg-indigo-50'}"
						>
							<span class="segment-icon text-2xl">{segment.icon}</span>
						</div>
						<div>
							<h3 class="font-bold text-brand-navy text-lg">{segment.title}</h3>
							<p
								class="text-sm font-medium"
								class:text-brand-mint={segment.color === 'mint'}
								class:text-brand-cyan={segment.color === 'cyan'}
								class:text-brand-navy={segment.color === 'navy'}
							>
								{segment.subtitle}
							</p>
						</div>
					</div>
					<p class="text-gray-600 text-sm leading-relaxed">{segment.description}</p>
				</div>
			{/each}
		</div>

		<!-- Radial Hub Design (Tablet+) -->
		<div class="hidden tablet:block">
			<div class="hub-visual relative mx-auto">
			<!-- SVG Connection Lines -->
			<svg
				class="absolute inset-0 w-full h-full pointer-events-none"
				viewBox="0 0 400 400"
				preserveAspectRatio="none"
			>
				<defs>
					<linearGradient id="line-grad-mint" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#50E8A8" stop-opacity="0.3" />
						<stop offset="50%" stop-color="#50E8A8" stop-opacity="0.8" />
						<stop offset="100%" stop-color="#50E8A8" stop-opacity="0.3" />
					</linearGradient>
					<linearGradient id="line-grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#50D8E8" stop-opacity="0.3" />
						<stop offset="50%" stop-color="#50D8E8" stop-opacity="0.8" />
						<stop offset="100%" stop-color="#50D8E8" stop-opacity="0.3" />
					</linearGradient>
					<linearGradient id="line-grad-navy" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#1E1B4B" stop-opacity="0.3" />
						<stop offset="50%" stop-color="#1E1B4B" stop-opacity="0.5" />
						<stop offset="100%" stop-color="#1E1B4B" stop-opacity="0.3" />
					</linearGradient>
				</defs>

				<!-- Connection lines from center to each node -->
				{#each segments as segment}
					<line
						x1={centerPoint.x}
						y1={centerPoint.y}
						x2={segment.x}
						y2={segment.y}
						stroke={`url(#${gradientByColor[segment.color]})`}
						stroke-width="2"
						class="connection-line {activeSegment === segment.id ? 'active' : ''}"
					/>
				{/each}

				<!-- Animated pulses along lines -->
				{#each segments as segment}
					<circle r="4" fill={fillByColor[segment.color]} class="pulse-dot">
						<animateMotion dur={segment.pulseDuration} repeatCount="indefinite">
							<mpath href={`#path-${segment.id}`} />
						</animateMotion>
					</circle>
				{/each}

				<!-- Hidden paths for animation -->
				{#each segments as segment}
					<path id={`path-${segment.id}`} d={`M${centerPoint.x},${centerPoint.y} L${segment.x},${segment.y}`} fill="none" />
				{/each}

				<!-- Outer ring -->
				<circle
					cx="200"
					cy="200"
					r="150"
					fill="none"
					stroke="rgba(80, 232, 168, 0.2)"
					stroke-width="1"
					stroke-dasharray="8 4"
					class="outer-ring"
				/>
			</svg>

			<!-- Central Hub -->
			<div class="relative h-full w-full">
				<!-- Center TLC Logo -->
				<div
					class="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 tablet:w-28 tablet:h-28 bg-white rounded-full flex items-center justify-center shadow-xl hub-center border-4 border-brand-navy"
				>
					<img src="/logo.png" alt="TLC" class="w-16 h-16 tablet:w-20 tablet:h-20 object-contain" />
				</div>

				{#each segments as segment}
					<div
						class="absolute segment-node"
						style={`top: ${(segment.y / 400) * 100}%; left: ${(segment.x / 400) * 100}%; transform: translate(-50%, -50%);`}
						role="button"
						tabindex="0"
						onmouseenter={() => handleHover(segment.id)}
						onmouseleave={() => handleHover(null)}
						onfocus={() => handleHover(segment.id)}
						onblur={() => handleHover(null)}
					>
						<div
							class="segment-circle bg-white rounded-full flex items-center justify-center shadow-lg border-4 {segment.color === 'mint' ? 'border-brand-mint' : segment.color === 'cyan' ? 'border-brand-cyan' : 'border-brand-navy'} transition-all duration-300 {activeSegment === segment.id
								? 'scale-110 shadow-xl'
								: ''}"
						>
							<span class="segment-icon text-2xl tablet:text-3xl">{segment.icon}</span>
						</div>
						<div class="segment-label text-center">
							<h3 class="font-bold text-brand-navy text-sm">{segment.title}</h3>
						</div>
					</div>
				{/each}
			</div>
			</div>
		</div>

		<!-- Info Panel (Tablet+ only) -->
		<div class="hidden tablet:block max-w-2xl mx-auto mt-8 min-h-[120px]">
			{#if activeSegment}
				{@const segment = segments.find((s) => s.id === activeSegment)}
				{#if segment}
					<div class="text-center animate-fade-in">
						<h3
							class="text-2xl font-display font-bold mb-2"
							class:text-brand-mint={segment.color === 'mint'}
							class:text-brand-cyan={segment.color === 'cyan'}
							class:text-brand-navy={segment.color === 'navy'}
						>
							{segment.subtitle}
						</h3>
						<p class="text-gray-700 leading-relaxed">{segment.description}</p>
					</div>
				{/if}
			{:else}
				<p class="text-center text-gray-500 italic">
					Hover over a node to learn more
				</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.hub-visual {
		width: 420px;
		height: 420px;
	}

	@media (min-width: 1280px) {
		.hub-visual {
			width: 460px;
			height: 460px;
		}
	}

	.hub-center {
		animation: hub-pulse 3s ease-in-out infinite;
	}

	@keyframes hub-pulse {
		0%,
		100% {
			box-shadow:
				0 0 0 0 rgba(80, 232, 168, 0.4),
				0 25px 50px -12px rgba(0, 0, 0, 0.25);
		}
		50% {
			box-shadow:
				0 0 0 15px rgba(80, 232, 168, 0),
				0 25px 50px -12px rgba(0, 0, 0, 0.25);
		}
	}

	.segment-node {
		cursor: pointer;
		width: 5rem;
		height: 5rem;
	}

	.segment-circle {
		width: 5rem;
		height: 5rem;
	}

	.segment-label {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
	}

	.segment-icon {
		display: inline-block;
		line-height: 1;
		font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
	}

	.connection-line {
		opacity: 0.5;
		transition: opacity 0.3s ease;
	}

	.connection-line.active {
		opacity: 1;
		stroke-width: 3;
	}

	.pulse-dot {
		opacity: 0.8;
	}

	.outer-ring {
		animation: ring-rotate 30s linear infinite;
		transform-origin: center;
	}

	@keyframes ring-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Respect reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.hub-center,
		.outer-ring,
		.pulse-dot {
			animation: none;
		}
	}
</style>

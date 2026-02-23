<script lang="ts">
import { onMount } from 'svelte';
import Button from '../base/Button.svelte';

interface Props {
	class?: string;
}

const { class: className = '' }: Props = $props();

let canvasContainer: HTMLElement;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let mouseX = -1000;
let mouseY = -1000;
let animationId: number;
let isInitialized = false;

const options = {
	particleCount: 80,
	colors: [
		'rgba(80, 232, 168, 1)', // brand-mint
		'rgba(80, 232, 168, 0.65)', // muted mint accent
		'rgba(255, 255, 255, 0.6)', // white accent
	],
	activeColor: 'rgba(255, 255, 255, 1)',
	speed: 0.4,
	maxSize: 4,
	minSize: 0.5,
	activationDistance: 120,
	repelStrength: 0.04,
	minSpeed: 0.08,
	connectionDistance: 100,
};

class Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	originalColor: string;
	color: string;
	opacity: number;
	active: boolean;

	constructor(canvasWidth: number, canvasHeight: number) {
		this.x = Math.random() * canvasWidth;
		this.y = Math.random() * canvasHeight;
		this.vx = (Math.random() - 0.5) * options.speed;
		this.vy = (Math.random() - 0.5) * options.speed;
		this.radius = Math.random() * options.maxSize + options.minSize;
		this.originalColor = options.colors[Math.floor(Math.random() * options.colors.length)];
		this.color = this.originalColor;
		this.opacity = Math.random() * 0.6 + 0.2;
		this.active = Math.random() > 0.3;
	}

	draw(context: CanvasRenderingContext2D) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		// Parse the color and apply opacity
		const baseColor = this.color.replace(/[\d.]+\)$/, `${this.opacity})`);
		context.fillStyle = baseColor;
		context.fill();
	}

	update(canvasWidth: number, canvasHeight: number, mx: number, my: number) {
		this.x += this.vx;
		this.y += this.vy;

		// Bounce off edges
		if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
		if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;

		// Keep in bounds
		this.x = Math.max(0, Math.min(canvasWidth, this.x));
		this.y = Math.max(0, Math.min(canvasHeight, this.y));

		// Mouse interaction
		const dx = mx - this.x;
		const dy = my - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < options.activationDistance && mx > 0 && my > 0) {
			this.active = true;
			const angle = Math.atan2(dy, dx);
			const force = (options.activationDistance - distance) / options.activationDistance;
			this.vx -= Math.cos(angle) * force * options.repelStrength;
			this.vy -= Math.sin(angle) * force * options.repelStrength;

			if (distance < options.activationDistance * 0.5) {
				this.color = options.activeColor;
				this.opacity = 0.9;
			} else {
				this.color = this.originalColor;
				this.opacity = 0.5 + force * 0.5;
			}
		} else {
			if (this.active) {
				this.color = this.originalColor;
				if (this.opacity > 0.2) this.opacity -= 0.01;
			}
		}

		// Apply friction
		this.vx *= 0.98;
		this.vy *= 0.98;

		// Maintain minimum speed
		if (this.active) {
			const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
			if (currentSpeed < options.minSpeed) {
				const angle = Math.random() * Math.PI * 2;
				this.vx = Math.cos(angle) * options.minSpeed;
				this.vy = Math.sin(angle) * options.minSpeed;
			}
			if (Math.random() < 0.001) this.active = false;
		} else {
			if (Math.random() < 0.0005) this.active = true;
		}

		// Pulse radius
		if (this.active && this.radius < options.maxSize) {
			this.radius += 0.05;
		} else if (!this.active && this.radius > options.minSize) {
			this.radius -= 0.02;
		}
	}
}

function drawConnections(context: CanvasRenderingContext2D) {
	for (let i = 0; i < particles.length; i++) {
		const particleA = particles[i];
		if (!particleA.active) continue;

		for (let j = i + 1; j < particles.length; j++) {
			const particleB = particles[j];
			if (!particleB.active) continue;

			const dx = particleA.x - particleB.x;
			const dy = particleA.y - particleB.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < options.connectionDistance) {
				const opacity =
					((options.connectionDistance - distance) / options.connectionDistance) * 0.3;
				context.beginPath();
				context.moveTo(particleA.x, particleA.y);
				context.lineTo(particleB.x, particleB.y);
				context.strokeStyle = `rgba(80, 232, 168, ${opacity})`;
				context.lineWidth = 0.5;
				context.stroke();
			}
		}
	}
}

function createWave() {
	if (!canvas || particles.length === 0) return;

	const centerX = Math.random() * canvas.width;
	const centerY = Math.random() * canvas.height;

	particles.forEach((particle) => {
		const dx = particle.x - centerX;
		const dy = particle.y - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const angle = Math.atan2(dy, dx);

		setTimeout(() => {
			const force = Math.max(0, (250 - distance) / 250);
			particle.vx += Math.cos(angle) * force * 1.5;
			particle.vy += Math.sin(angle) * force * 1.5;
			particle.active = true;
		}, distance * 2);
	});
}

function animate() {
	if (!ctx || !canvas) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	particles.forEach((particle) => {
		particle.update(canvas.width, canvas.height, mouseX, mouseY);
		particle.draw(ctx!);
	});

	drawConnections(ctx);

	animationId = requestAnimationFrame(animate);
}

function handleMouseMove(e: MouseEvent) {
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
	mouseY = e.clientY - rect.top;
}

function handleTouchMove(e: TouchEvent) {
	if (!canvas || e.touches.length === 0) return;
	const rect = canvas.getBoundingClientRect();
	mouseX = e.touches[0].clientX - rect.left;
	mouseY = e.touches[0].clientY - rect.top;
}

function initCanvas() {
	if (!canvas || !canvasContainer) return;

	// Get dimensions from container's bounding rect for Firefox compatibility
	const rect = canvasContainer.getBoundingClientRect();
	const width = rect.width || window.innerWidth;
	const height = rect.height || window.innerHeight * 0.8;

	// Only proceed if we have valid dimensions
	if (width < 10 || height < 10) {
		// Try again on next frame
		requestAnimationFrame(initCanvas);
		return;
	}

	// Set canvas dimensions explicitly
	canvas.width = width;
	canvas.height = height;

	// Also set CSS dimensions for Firefox
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;

	// Get context
	ctx = canvas.getContext('2d');
	if (!ctx) return;

	// Create particles based on canvas size
	const area = width * height;
	const density = area / 200000;
	const count = Math.min(Math.max(Math.floor(options.particleCount * density), 40), 150);

	particles = [];
	for (let i = 0; i < count; i++) {
		particles.push(new Particle(width, height));
	}

	isInitialized = true;
}

function resizeCanvas() {
	if (!isInitialized) return;
	initCanvas();
}

onMount(() => {
	// Wait for layout to complete before initializing
	// This helps Firefox compute dimensions correctly
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			initCanvas();

			if (ctx) {
				animate();
			}
		});
	});

	window.addEventListener('resize', resizeCanvas);

	// Periodic wave effect
	const waveInterval = setInterval(createWave, 6000);

	return () => {
		if (animationId) cancelAnimationFrame(animationId);
		clearInterval(waveInterval);
		window.removeEventListener('resize', resizeCanvas);
	};
});
</script>

<section
	class={`relative overflow-hidden ${className}`}
	bind:this={canvasContainer}
>
	<div class="absolute inset-0 bg-[var(--gradient-hero)]"></div>
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(80,232,168,0.22),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(80,216,232,0.2),transparent_38%)]"></div>

	<!-- Particle Canvas -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<canvas
		bind:this={canvas}
		class="particle-canvas"
		aria-hidden="true"
		on:mousemove={handleMouseMove}
		on:touchmove={handleTouchMove}
	></canvas>

	<!-- Hero Content -->
	<div class="relative z-10 content-shell">
		<div
			class="grid min-h-[88dvh] items-center gap-8 py-20 tablet:py-24"
		>
			<div class="max-w-3xl space-y-7">
				<p class="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan tablet:text-sm">
					Engineering Futures Platform
				</p>
				<h1
					class="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
				>
					Engineering Education,
					<span class="text-brand-mint block">Connected</span>
				</h1>

				<p class="max-w-2xl text-lg text-slate-200 sm:text-xl md:text-2xl">
					Explore the T-Level Engineering & Manufacturing curriculum with real industry videos
				</p>

				<div class="flex flex-wrap gap-3">
					<span class="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white/90">
						16 Core Knowledge Topics
					</span>
					<span class="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white/90">
						3 Specialist Pathways
					</span>
					<span class="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white/90">
						315 Placement Hours
					</span>
				</div>

				<div class="flex flex-col gap-4 pt-4 sm:flex-row">
					<Button
						variant="primary"
						size="lg"
						href="/curriculum?pathway=pathway-2"
						class="bg-brand-mint text-brand-navy shadow-md hover:bg-opacity-90 hover:shadow-lg active:translate-y-px"
					>
						Explore Curriculum
					</Button>

					<Button
						variant="ghost"
						size="lg"
						href="/about"
						class="border-2 border-white text-white hover:bg-white hover:!text-brand-navy active:translate-y-px"
					>
						Learn More
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.particle-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: auto;
	}

	@media (prefers-reduced-motion: reduce) {
		.particle-canvas {
			display: none;
		}
	}
</style>

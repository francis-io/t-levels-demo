<script lang="ts">
import { onMount } from 'svelte';

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
	particleCount: 60,
	colors: [
		'rgba(80, 232, 168, 1)', // brand-mint
		'rgba(80, 216, 232, 1)', // brand-cyan
		'rgba(255, 255, 255, 0.6)', // white accent
	],
	activeColor: 'rgba(255, 255, 255, 1)',
	speed: 0.3,
	maxSize: 3,
	minSize: 0.5,
	activationDistance: 100,
	repelStrength: 0.03,
	minSpeed: 0.06,
	connectionDistance: 80,
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
		this.opacity = Math.random() * 0.5 + 0.2;
		this.active = Math.random() > 0.4;
	}

	draw(context: CanvasRenderingContext2D) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		const baseColor = this.color.replace(/[\d.]+\)$/, `${this.opacity})`);
		context.fillStyle = baseColor;
		context.fill();
	}

	update(canvasWidth: number, canvasHeight: number, mx: number, my: number) {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
		if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;

		this.x = Math.max(0, Math.min(canvasWidth, this.x));
		this.y = Math.max(0, Math.min(canvasHeight, this.y));

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
				this.opacity = 0.8;
			} else {
				this.color = this.originalColor;
				this.opacity = 0.4 + force * 0.4;
			}
		} else {
			if (this.active) {
				this.color = this.originalColor;
				if (this.opacity > 0.2) this.opacity -= 0.01;
			}
		}

		this.vx *= 0.98;
		this.vy *= 0.98;

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

		if (this.active && this.radius < options.maxSize) {
			this.radius += 0.03;
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
					((options.connectionDistance - distance) / options.connectionDistance) * 0.25;
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

	const rect = canvasContainer.getBoundingClientRect();
	const width = rect.width || window.innerWidth;
	const height = rect.height || 400;

	if (width < 10 || height < 10) {
		requestAnimationFrame(initCanvas);
		return;
	}

	canvas.width = width;
	canvas.height = height;
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;

	ctx = canvas.getContext('2d');
	if (!ctx) return;

	const area = width * height;
	const density = area / 250000;
	const count = Math.min(Math.max(Math.floor(options.particleCount * density), 30), 100);

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
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			initCanvas();
			if (ctx) {
				animate();
			}
		});
	});

	window.addEventListener('resize', resizeCanvas);

	return () => {
		if (animationId) cancelAnimationFrame(animationId);
		window.removeEventListener('resize', resizeCanvas);
	};
});
</script>

<div
	class="particle-container {className}"
	bind:this={canvasContainer}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<canvas
		bind:this={canvas}
		class="particle-canvas"
		aria-hidden="true"
		on:mousemove={handleMouseMove}
		on:touchmove={handleTouchMove}
	></canvas>
	<div class="particle-content">
		<slot />
	</div>
</div>

<style>
	.particle-container {
		position: relative;
		overflow: hidden;
	}

	.particle-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: auto;
	}

	.particle-content {
		position: relative;
		z-index: 10;
	}

	@media (prefers-reduced-motion: reduce) {
		.particle-canvas {
			display: none;
		}
	}
</style>

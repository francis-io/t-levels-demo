.PHONY: install dev build preview lint format check test test-watch clean

# Install dependencies
install:
	bun install

# Development server
dev:
	bun run dev

# Production build
build:
	bun run build

# Preview production build
preview:
	bun run preview

# Lint code
lint:
	bun run lint

# Format code
format:
	bun run format

# Check (lint + format)
check:
	bun run check

# Run unit tests
test:
	bun run test

# Run tests in watch mode
test-watch:
	bun run test:watch

# Clean build artifacts
clean:
	rm -rf dist .astro node_modules

# Default target
all: install build

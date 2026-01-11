.PHONY: install dev build preview lint format check test test-watch clean

# Install dependencies
install:
	npm install

# Development server
dev:
	npm run dev

# Production build
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Lint code
lint:
	npm run lint

# Format code
format:
	npm run format

# Check (lint + format)
check:
	npm run check

# Run unit tests
test:
	npm run test

# Run tests in watch mode
test-watch:
	npm run test:watch

# Clean build artifacts
clean:
	rm -rf dist .astro node_modules

# Default target
all: install build

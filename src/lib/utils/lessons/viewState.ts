import { type ViewMode, viewModes } from '../../types/lessons';

const validModes = new Set<ViewMode>(viewModes);

export function isValidViewMode(value: string | null | undefined): value is ViewMode {
	if (!value) {
		return false;
	}

	return validModes.has(value as ViewMode);
}

export interface ResolveViewModeInput {
	queryView?: string | null;
	storedView?: string | null;
	defaultView?: ViewMode;
}

export function resolveInitialViewMode({
	queryView,
	storedView,
	defaultView = 'storyboard',
}: ResolveViewModeInput): ViewMode {
	if (isValidViewMode(queryView)) {
		return queryView;
	}

	if (isValidViewMode(storedView)) {
		return storedView;
	}

	return defaultView;
}

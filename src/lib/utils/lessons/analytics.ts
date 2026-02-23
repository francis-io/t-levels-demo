interface LessonAnalyticsPayload {
	slug: string;
	mode?: string;
	from_mode?: string;
	to_mode?: string;
}

export function trackLessonEvent(eventName: string, payload: LessonAnalyticsPayload): void {
	if (typeof window === 'undefined') {
		return;
	}

	window.dispatchEvent(
		new CustomEvent('lesson-analytics', {
			detail: { eventName, ...payload },
		}),
	);

	if (window.console && typeof window.console.info === 'function') {
		window.console.info('[analytics]', eventName, payload);
	}
}

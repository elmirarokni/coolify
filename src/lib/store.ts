import { browser } from '$app/env';
import { writable, type Writable, type Readable, readable } from 'svelte/store';

export const gitTokens: Writable<{ githubToken: string | null; gitlabToken: string | null }> =
	writable({
		githubToken: null,
		gitlabToken: null
	});
export const disabledButton: Writable<boolean> = writable(false);

export const features: Readable<{ latestVersion: string; beta: boolean }> = readable({
	beta: browser && window.localStorage.getItem('beta') === 'true',
	latestVersion: browser && window.localStorage.getItem('latestVersion')
});

export const isTraefikUsed: Writable<boolean> = writable(false);

export const status: Writable<any> = writable({
	application: {
		isRunning: false,
		isExited: false,
		loading: false,
		initialLoading: true
	}
});

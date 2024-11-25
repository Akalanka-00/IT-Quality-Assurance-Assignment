import { defineConfig } from "@playwright/test";

export default defineConfig({
	reporter: [
		['html',  { open: 'never' }],
	],

	testDir: "./tests",
	timeout: 5 * 60 * 1000,
	expect: {
		timeout: 10 * 1000,
	},
	fullyParallel: false,
	 forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: 1,

	use: {
		actionTimeout: 0,

		trace: "on-first-retry",
	},

	projects: [
		{
			name: "QA_environment",
			use: { ...process.env.HEADLESS ? { headless: true } : { headless: false },
				baseURL: "http://127.0.0.1:8080"},
		},


	],
});

import { Browser, BrowserContext, firefox, Page } from 'playwright';

export class PlaywrightConfig {
    private static instance: PlaywrightConfig;
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private baseUrl:string = "https://demo.opencart.com";

    // Private constructor to prevent direct instantiation
    private constructor() {}

    // Public method to get the singleton instance
    public static getInstance(): PlaywrightConfig {
        if (!PlaywrightConfig.instance) {
            PlaywrightConfig.instance = new PlaywrightConfig();
        }
        return PlaywrightConfig.instance;
    }

    // Method to initialize and return the page object
    public async getPage(): Promise<Page> {
        if (!this.browser) {
            const isHeadless = !process.env['CI']; // Check if the environment is CI
            this.browser = await firefox.launch({ headless: isHeadless });
        }

        if (!this.context) {
            this.context = await this.browser.newContext({
                baseURL: this.baseUrl,
            });
        }

        if (!this.page) {
            this.page = await this.context.newPage();
            await this.page.goto(this.baseUrl);
        }

        return this.page;
    }

    // Method to close the browser and clean up resources
    public async closePage(): Promise<void> {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }

        if (this.context) {
            await this.context.close();
            this.context = null;
        }

        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    public getBaseUrl(){
        return this.baseUrl;
    }
}

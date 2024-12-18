import {Page} from "@playwright/test";

export class PomSample{

    public async testMethod(page: Page){
        await page.goto('https://example.com/login');
        console.log("Successfully tested UI using POM.")
    }
}
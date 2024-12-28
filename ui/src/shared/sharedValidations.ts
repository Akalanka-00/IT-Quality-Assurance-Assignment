import {expect, Page, test} from "@playwright/test";
import {PlaywrightConfig} from "../../utils/playwright.config";

export class SharedValidations{

    private playwrightConfig: PlaywrightConfig;

    constructor(){
        this.playwrightConfig = PlaywrightConfig.getInstance();
    }
    public async validateTitle(page: Page, title: string){
        const pageTitle:string = await page.title();
        expect(pageTitle).toBe(title);
        console.log(`Page title matches to ${title}`)
    }

    public async validateUrl(page: Page, url: string){
        const pageUrl:string = page.url();
        const baseUrl = this.playwrightConfig.getBaseUrl();
        expect(pageUrl).toBe(`${baseUrl}${url}`);
        console.log(`Page title matches to ${pageUrl}`)
    }


}
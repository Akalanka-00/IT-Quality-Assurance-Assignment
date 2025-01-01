import {expect, Page} from "@playwright/test";
import {PlaywrightConfig} from "../../utils/playwright.config";
import {DataStore} from "../../utils/dataStore";

export class PageHelper {

    private playwrightConfig: PlaywrightConfig;
    private dataStore: DataStore;

    constructor(){
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataStore = DataStore.getInstance();
    }
    public async validateTitle(page: Page, title: string){
        const pageTitle:string = await page.title();
        expect(pageTitle).toBe(title);
        console.log(`Page title matches to ${title}`)
    }

    public async validateUrl(page: Page, url: string, isTokenExists=false){
        const pageUrl:string = page.url();
        const baseUrl = this.playwrightConfig.getBaseUrl();
        if(isTokenExists) {
            expect(pageUrl).toBe(`${baseUrl}${url}&customer_token=${this.dataStore.getData().AuthData.token}`);

        }else {
            expect(pageUrl).toBe(`${baseUrl}${url}`);
        }
        console.log(`Page title matches to ${pageUrl}`)
    }

    public fetchTokenFromUrl(url: string) {
        const tokenRegex = /customer_token=([a-zA-Z0-9]+)/;
        const match = url.match(tokenRegex);
        if (match && match[1]) {
            const token = match[1];
            console.log("Customer Token:", token);
            this.dataStore.setData("AuthData.token", token);
        } else {
            console.log("Customer Token not found in the URL.");
        }
    }

}
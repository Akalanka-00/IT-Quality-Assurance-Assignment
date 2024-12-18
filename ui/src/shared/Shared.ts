import {expect, Page, test} from "@playwright/test";

export class Shared{

    public async validateTitle(page: Page, title: string){
        const pageTitle:string = await page.title();
        expect(pageTitle).toBe(title);
        console.log(`Page title matches to ${title}`)
    }

    public async validateUrl(page: Page, url: string){
        const pageUrl:string = page.url();
        const baseUrl = this.getBaseUrl();
        expect(pageUrl).toBe(`${baseUrl}${url}`);
        console.log(`Page title matches to ${pageUrl}`)
    }

    public getBaseUrl(){
        const projectName = test.info().project.name;
        return test.info().config.projects.filter(p => p.name == projectName)[0].use.baseURL;
    }
}
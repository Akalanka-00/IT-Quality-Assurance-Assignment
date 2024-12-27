import {After, AfterAll, BeforeAll, setDefaultTimeout} from "@cucumber/cucumber";
import {PlaywrightConfig} from "../utils/playwright.config";
import {type} from "node:os";

const playwrightConfig:PlaywrightConfig = PlaywrightConfig.getInstance();

BeforeAll(async function () {
    console.log('Global setup: Initializing Playwright browser and context.');
    const page = await playwrightConfig.getPage(); // Initialize the Playwright page object
    console.log('Page initialized:', await page.title());
    console.log('***********************************************************');
});
AfterAll(async function () {
    await playwrightConfig.closePage();
    console.log('Global teardown: Closing Playwright browser and context.');
});

After(async function ({pickle}) {
    const page = await playwrightConfig.getPage(); // Initialize the Playwright page object
    const img = await page.screenshot({path: `./reports/screenshots/${pickle.name}.png`, type: 'png'});
    this.attach(img, 'image/png');
    console.log('\n***********************************************************\n');

});
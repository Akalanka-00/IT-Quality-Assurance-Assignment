import {expect, test} from "@playwright/test"

test.describe("test",()=>{
    test('test', async ({ page }) => {
        // Navigate to the login page
    await page.goto('https://example.com/login');


	});
});
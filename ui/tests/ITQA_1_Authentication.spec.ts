import { test, Page } from "@playwright/test"
import {Authentication} from "../src/authentication/Authentication";

let page: Page;

// @ts-ignore
test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
});

test.describe("Authentication",()=>{

    test('Admin Login with correct credentials', async ({  }) => {
        const authentication: Authentication = new Authentication(page);
        await authentication.verifyLoginPage();
        await authentication.loginWithAdminCredentials();
        await authentication.verifySuccessLogin();

    });
});
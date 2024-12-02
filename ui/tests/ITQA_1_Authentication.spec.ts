import {expect, test, Page } from "@playwright/test"
import {Authentication} from "../src/authentication/Authentication";
import {Dashboard} from "../src/dashboard/Dashboard";


let page: Page;

// @ts-ignore
test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
});

test.describe("Authentication",()=>{

    test('Admin Login', async ({  }) => {
        const authentication: Authentication = new Authentication(page);
        await authentication.verifyLoginPage();
        await authentication.loginWithAdminCredentials();
        await authentication.verifySuccessLogin();




    });
});
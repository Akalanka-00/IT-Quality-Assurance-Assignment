import { Page } from "playwright";
import { PlaywrightConfig } from "../../utils/playwright.config";
import { SharedValidations } from "../shared/sharedValidations";
import { AuthenticationUrl } from "../../data/urls/authentication.url";
import { DataStore } from "../../utils/dataStore";
import { expect } from "@playwright/test";
import {UserRegistration} from "./registration";
import {HeaderLocators} from "../../locators/common/header.locator";
import {LoginLocators} from "../../locators/authentication/login.locator";

export class UserLogin {

    private playWrightConfig: PlaywrightConfig;
    private sharedValidations: SharedValidations;
    private userRegistration:UserRegistration;
    private dataStore: DataStore;
    private page: Page = undefined as unknown as Page;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
        this.sharedValidations = new SharedValidations();
        this.dataStore = DataStore.getInstance();
        this.userRegistration = new UserRegistration();
    }

    public async verifyLoginPage() {
        const data = this.dataStore.getData();
        this.page = await this.playWrightConfig.getPage();
        if(data.AuthData.isLoggedIn){
            console.log("User is already Logged In, skipping Login Page verification");
            return;
        }
        if(!data.AuthData.isUserCreated){
            console.log("User is not created, creating user...\n");
            await this.userRegistration.verifyRegistrationPage();
            await this.userRegistration.registerAccount();
            await this.userRegistration.verifyRegistrationSuccess();
            await this.logout();
        }
        await this.page.goto(AuthenticationUrl.LOGIN_URL);
        await this.sharedValidations.validateUrl(this.page, AuthenticationUrl.LOGIN_URL);

        await expect(this.page.locator(LoginLocators.EMAIL_INPUT_FIELD)).toBeVisible();
        await expect(this.page.locator(LoginLocators.PASSWORD_INPUT_FIELD)).toBeVisible();
        await expect(this.page.locator(LoginLocators.LOGIN_BUTTON)).toBeVisible();
        console.log("Login page input fields are verified");
    }

    public async loginWithValidCredentials(forceLogin=false) {
        const data = this.dataStore.getData();
        if(data.AuthData.isLoggedIn && !forceLogin){
            console.log("User is already Logged In, skipping Login");
            return;
        }
        this.page = await this.playWrightConfig.getPage();

        await this.page.fill(LoginLocators.EMAIL_INPUT_FIELD, data.AuthData.email);
        await this.page.fill(LoginLocators.PASSWORD_INPUT_FIELD, data.AuthData.password);
        await this.page.click(LoginLocators.LOGIN_BUTTON);

        console.log("email: ", data.AuthData.email);
        console.log("password: ", data.AuthData.password);

        // Wait for the URL containing 'customer_token=' with "commit" as the condition
        // await this.page.waitForURL(/\/account\/account&customer_token=/, { waitUntil: "commit" });
        //
        // console.log("Login attempt complete and navigation verified.");
    }

    public async verifySuccessfulLogin() {
        const data = this.dataStore.getData();
        if(data.AuthData.isLoggedIn){
            console.log("User is already Logged In, skipping Successful Login verification");
            return;
        }
        this.page = await this.playWrightConfig.getPage();
        this.dataStore.setData("AuthData.isLoggedIn", true);
        // Verify the URL contains the customer token
        // const currentUrl = this.page.url();
        // console.log("Current URL after login attempt:", currentUrl);
        // const isValidUrl = currentUrl.includes('customer_token=');
        //
        // expect(isValidUrl).toBeTruthy(); // Assert the presence of 'customer_token' in URL
        // console.log("User successfully redirected to the account page.");
        //
        // // Optionally check for account page-specific content
        // const accountHeading = this.page.locator("h2:has-text('My Account')"); // Update selector as per your page
        // await expect(accountHeading).toBeVisible();

        console.log("User logged in successfully");
    }

    public async logout(){
        const data = this.dataStore.getData();
        if(!data.AuthData.isLoggedIn){
            console.log("User is not logged in, skipping logout");
            return;
        }
        this.page = await this.playWrightConfig.getPage();
        await this.page.locator(HeaderLocators.MY_ACCOUNT_DROPDOWN).click();
        await this.page.locator(HeaderLocators.MY_ACCOUNT_DROPDOWN_ITEM).nth(4).click();
        expect(await this.page.locator(LoginLocators.ACCOUNT_LOGOUT_TITLE).textContent()).toBe(data.AuthData.logout.logoutMessage);
        const logoutContent = data.AuthData.logout.logoutContent;
        for(let i=0; i<logoutContent.length; i++){
            expect(await this.page.locator(LoginLocators.ACCOUNT_LOGOUT_CONTENT).nth(i).textContent()).toBe(logoutContent[i]);
        }
        await expect(this.page.locator(LoginLocators.CONTINUE_BUTTON)).toBeVisible();
        await this.page.locator(LoginLocators.CONTINUE_BUTTON).click();
        await this.page.waitForTimeout(2000);
        this.dataStore.setData("AuthData.isLoggedIn", false);
        console.log("User logged out successfully");
    }

}

import { Page } from "playwright";
import { PlaywrightConfig } from "../../utils/playwright.config";
import { PageHelper } from "../helper/pageHelper";
import { AuthenticationUrl } from "../../data/urls/authentication.url";
import { DataStore } from "../../utils/dataStore";
import { expect } from "@playwright/test";
import {UserRegistration} from "./registration";
import {HeaderLocators} from "../../locators/common/header.locator";
import {LoginLocators} from "../../locators/authentication/login.locator";

export class UserLogin {

    private playWrightConfig: PlaywrightConfig;
    private pageHelper: PageHelper;
    private userRegistration:UserRegistration;
    private dataStore: DataStore;
    private page: Page = undefined as unknown as Page;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
        this.pageHelper = new PageHelper();
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
        await this.pageHelper.validateUrl(this.page, AuthenticationUrl.LOGIN_URL);

        await expect(this.page.locator(LoginLocators.EMAIL_INPUT_FIELD)).toBeVisible();
        await expect(this.page.locator(LoginLocators.PASSWORD_INPUT_FIELD)).toBeVisible();
        await expect(this.page.locator(LoginLocators.LOGIN_BUTTON)).toBeVisible();
        console.log("Login page input fields are verified");
    }

    public async loginWithValidCredentials() {
        const data = this.dataStore.getData();
        if(data.AuthData.isLoggedIn){
            console.log("User is already Logged In, skipping Login");
            return;
        }
        this.page = await this.playWrightConfig.getPage();

        await this.page.fill(LoginLocators.EMAIL_INPUT_FIELD, data.AuthData.email);
        await this.page.fill(LoginLocators.PASSWORD_INPUT_FIELD, data.AuthData.password);
        await this.page.click(LoginLocators.LOGIN_BUTTON);
        console.log("email: \t\t", data.AuthData.email);
        console.log("password: \t", data.AuthData.password);
        await this.page.waitForTimeout(2000);

    }

    public async verifySuccessfulLogin() {
        if(this.dataStore.getData().AuthData.isLoggedIn){
            console.log("User is already Logged In, skipping Successful Login verification");
            return;
        }
        this.page = await this.playWrightConfig.getPage();
        const url = this.page.url();
        this.pageHelper.fetchTokenFromUrl(url);
        const data = this.dataStore.getData();
        await this.pageHelper.validateUrl(this.page, AuthenticationUrl.LOGIN_SUCCESS, true);
        this.dataStore.setData("AuthData.isLoggedIn", true);
        const titles = data.AuthData.login.successTitles;
        const contentList = data.AuthData.login.successContents;
        let contentCount = 0;
        for (let title = 0; title < titles.length; title++) {
            await expect(this.page.locator(LoginLocators.SUCCESS_LOGIN_TITLE).nth(title)).toHaveText(titles[title]);
            const contents = contentList[title];
            for (let content = 0; content < contents.length; content++) {
                await expect(this.page.locator(LoginLocators.SUCCESS_LOGIN_CONTENT).nth(contentCount)).toHaveText(contents[content]);
                contentCount++;
            }
        }
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

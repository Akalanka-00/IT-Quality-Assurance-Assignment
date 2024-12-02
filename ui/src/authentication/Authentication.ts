import {expect, Page} from "@playwright/test";
import {Urls} from "../../data/urls/Urls";
import {Shared} from "../shared/Shared";
import {AuthLocators} from "../../locators/authentication/AuthLocators";
import {Locator} from "playwright";
import {LoginCredentials} from "../../model/authentication/LoginCredentials";
import {Dashboard} from "../dashboard/Dashboard";
import {DataStore} from "../../utils/DataStore";

export class Authentication{

    private page:Page;
    private shared: Shared;
    private dashboard:Dashboard;
    private dataStore:DataStore;
    

    constructor(page:Page) {
        this.shared = new Shared();
        this.dashboard = new Dashboard(page);
        this.page = page;
        this.dataStore = DataStore.getInstance();
    }

    public async verifyLoginPage() {
        console.log(this.dataStore.getData())
        await this.page.goto(Urls.LOGIN_URL);
        await this.shared.validateTitle(this.page, this.dataStore.getData().AuthData.title);
        await this.shared.validateUrl(this.page, Urls.LOGIN_URL);

        //Check UI elements

        //Check the LOGO Image
        const img:Locator = this.page.locator(AuthLocators.LOGO). locator("img");
        await expect(img).toHaveCount(1);
        const imageSrc = await img.getAttribute('src');
        console.log(`Image src: ${imageSrc}`);
        expect(`${this.shared.getBaseUrl()}${imageSrc}`).toBe(this.dataStore.getData().AuthData.logoImg);
        console.log(`Logo image captured successfully!`);

        //Login Text capture
        await expect(this.page.locator(AuthLocators.LOGIN_TEXT)).toBeVisible();
        expect(await this.page.locator(AuthLocators.LOGIN_TEXT).innerText()).toBe(this.dataStore.getData().AuthData.loginTitle);
        console.log("Login text captured successfully");

        //Login Input field capture - username
        const userNameLocator: string = `xpath=//input[@name='${this.dataStore.getData().AuthData.usernameFieldName}']`;
        const usernameInput = this.page.locator(userNameLocator);
        await expect(usernameInput).toBeVisible();
        expect(await usernameInput.getAttribute('placeholder')).toBe(this.dataStore.getData().AuthData.usernameFieldPlaceHolder);
        console.log("Username Input Field Verified successfully!")

        //Login Input field capture - password
        const passwordLocator: string = `xpath=//input[@name='${this.dataStore.getData().AuthData.passwordFieldName}']`;
        const passwordInput = this.page.locator(passwordLocator);
        await expect(passwordInput).toBeVisible();
        expect(await passwordInput.getAttribute('placeholder')).toBe(this.dataStore.getData().AuthData.passwordFieldPlaceHolder);
        console.log("Password Input Field Verified successfully!")

        //Login Input field label capture - username
        const usernameLabel = this.page.locator(`label${AuthLocators.INPUT_LABEL}`, { hasText: this.dataStore.getData().AuthData.usernameLabel });
        await expect(usernameLabel).toBeVisible();
        expect(await usernameLabel.innerText()).toBe(this.dataStore.getData().AuthData.usernameLabel);
        console.log("Username Input Field label verified successfully!")

        //Login Input field label capture - username
        const passwordLabel = this.page.locator(`label${AuthLocators.INPUT_LABEL}`, { hasText: this.dataStore.getData().AuthData.passwordLabel });
        await expect(passwordLabel).toBeVisible();
        expect(await passwordLabel.innerText()).toBe(this.dataStore.getData().AuthData.passwordLabel);
        console.log("Password Input Field label verified successfully!");

        //Login Button capture
        await expect(this.page.locator(AuthLocators.LOGIN_BUTTON)).toBeVisible();
        expect(await this.page.locator(AuthLocators.LOGIN_BUTTON).innerText()).toBe(this.dataStore.getData().AuthData.loginButtonTitle);
        console.log("Login Button Verified Successfully!");

        console.log("\n******************************* Login Page UI Verified Successfully *******************************\n");
    }

    public async loginWithAdminCredentials(){
        await this.processLogin(this.dataStore.getData().AuthData.credentials);
    }

    public async verifySuccessLogin(){
        await this.page.waitForURL(Urls.DASHBOARD_URL);
        await this.dashboard.verifyDashboard();
        this.dataStore.setData("SharedData.isLoggedIn", true);
        console.log(this.dataStore.getData());
    }



    private async processLogin( credentials: LoginCredentials){
        const userNameLocator: string = `xpath=//input[@name='${this.dataStore.getData().AuthData.usernameFieldName}']`;
        const usernameInput = this.page.locator(userNameLocator);
        await usernameInput.click();
        await usernameInput.fill(credentials.username);
        console.log(`Successfully input username as \t: ${credentials.username}`);

        const passwordLocator: string = `xpath=//input[@name='${this.dataStore.getData().AuthData.passwordFieldName}']`;
        const passwordInput = this.page.locator(passwordLocator);
        await passwordInput.click();
        await passwordInput.fill(credentials.password);
        console.log(`Successfully input password as \t: ${credentials.password}`);

        await this.page.locator(AuthLocators.LOGIN_BUTTON).click();

    }
}
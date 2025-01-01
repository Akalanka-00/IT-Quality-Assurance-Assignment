import {PlaywrightConfig} from "../../utils/playwright.config";
import {Page} from "playwright";
import {PageHelper} from "../helper/pageHelper";
import {AuthenticationUrl} from "../../data/urls/authentication.url";
import {DataStore} from "../../utils/dataStore";
import {expect} from "@playwright/test";
import {RegistrationLocators} from "../../locators/authentication/registration.locator";
import {RegistrationModel} from "../../model/authentication/registration.model";
import {UserLogin} from "./userLogin";

export class UserRegistration{

    private playWrightConfig: PlaywrightConfig;
    private pageHelper: PageHelper;
    private dataStore: DataStore;
    private page: Page = undefined as unknown as Page;

    constructor(){
        this.playWrightConfig = PlaywrightConfig.getInstance();
        this.pageHelper = new PageHelper();
        this.dataStore = DataStore.getInstance();
    }

    public async verifyRegistrationPage(forceRegistration=false){
        if(forceRegistration && this.dataStore.getData().AuthData.isLoggedIn){
            const userLogin = new UserLogin();
            await userLogin.logout();

        }
        const data = this.dataStore.getData();
        this.page = await this.playWrightConfig.getPage();
        await this.page.goto(AuthenticationUrl.REGISTER_URL);
        await this.page.waitForTimeout(2000);
        await this.pageHelper.validateUrl(this.page, AuthenticationUrl.REGISTER_URL, data.AuthData.isLoggedIn);

        //Check the input fields of register account form
        await expect(this.page.locator(RegistrationLocators.FIRST_NAME_INPUT_FIELD)).toBeVisible({timeout: 1000*60});
        await expect(this.page.locator(RegistrationLocators.LAST_NAME_INPUT_FIELD)).toBeVisible();
        await expect(this.page.locator(RegistrationLocators.EMAIL_INPUT_FIELD)).toBeVisible();
        await expect(this.page.locator(RegistrationLocators.PASSWORD_INPUT_FIELD)).toBeVisible();
        await expect(this.page.locator(RegistrationLocators.AGREE_SWITCH)).toBeVisible();
        await expect(this.page.locator(RegistrationLocators.CONTINUE_BUTTON)).toBeVisible();
        console.log("Registration page input fields is verified");

        //Check the placeholders of input fields of register account form
        expect(await this.page.locator(RegistrationLocators.FIRST_NAME_INPUT_FIELD).getAttribute("placeholder")).toBe(data.AuthData.registration.placeholders.firstName);
        expect(await this.page.locator(RegistrationLocators.LAST_NAME_INPUT_FIELD).getAttribute("placeholder")).toBe(data.AuthData.registration.placeholders.lastName);
        expect(await this.page.locator(RegistrationLocators.EMAIL_INPUT_FIELD).getAttribute("placeholder")).toBe(data.AuthData.registration.placeholders.email);
        expect(await this.page.locator(RegistrationLocators.PASSWORD_INPUT_FIELD).getAttribute("placeholder")).toBe(data.AuthData.registration.placeholders.password);
        console.log("Registration page input fields placeholders is verified");

    }

    public toBeHaveValidRegistrationInfo(suffix: string=""){
        const data = this.dataStore.getData();
        const user:RegistrationModel = {
            email: `${data.SharedData.randomStr}${suffix}_EMAIL@gmail.com`,
            firstName: `${data.SharedData.randomStr}_fn${suffix}`,
            lastName: `${data.SharedData.randomStr}_ln${suffix}`,
            password: `${data.SharedData.randomStr}_psw${suffix}`}
        return user;
    }

    public async registerAccount(user:RegistrationModel, forceRegistration=false){
        const data = this.dataStore.getData();
        if(data.AuthData.isUserCreated && !forceRegistration){
            console.log("User is already registered, skipping registration");
            return;
        }

        if(forceRegistration && data.AuthData.isLoggedIn){
            const userLogin = new UserLogin();
            await userLogin.logout();
        }
        this.page = await this.playWrightConfig.getPage();

        await this.page.fill(RegistrationLocators.FIRST_NAME_INPUT_FIELD, user.firstName);
        await this.page.fill(RegistrationLocators.LAST_NAME_INPUT_FIELD, user.lastName);
        await this.page.fill(RegistrationLocators.EMAIL_INPUT_FIELD, user.email);
        await this.page.fill(RegistrationLocators.PASSWORD_INPUT_FIELD, user.password);
        await this.page.check(RegistrationLocators.AGREE_SWITCH);
        await this.page.click(RegistrationLocators.CONTINUE_BUTTON);
        await this.page.waitForTimeout(2000);

        this.dataStore.setData("AuthData.firstName", user.firstName);
        this.dataStore.setData("AuthData.lastName", user.lastName);
        this.dataStore.setData("AuthData.email", user.email);
        this.dataStore.setData("AuthData.password", user.password);

    }

    public async verifyRegistrationSuccess(){
        this.page = await this.playWrightConfig.getPage();
        const url = this.page.url();
        this.pageHelper.fetchTokenFromUrl(url);
        const data = this.dataStore.getData();
        await this.pageHelper.validateUrl(this.page, AuthenticationUrl.REGISTER_SUCCESS, true);
        await expect(this.page.locator(RegistrationLocators.SUCCESS_REGISTRATION_TITLE)).toHaveText(data.AuthData.registration.successMessage);
        await expect(this.page.locator(RegistrationLocators.BREADCRUMB_HOME).getByText(data.AuthData.registration.successMessage)).toBeVisible();
        const successContent = data.AuthData.registration.successContent;
        for(let i=0; i<successContent.length; i++){
            expect(await this.page.locator(RegistrationLocators.SUCCESS_REGISTRATION_CONTENT).nth(i).textContent()).toBe(successContent[i]);
        }

        this.dataStore.setData("AuthData.isUserCreated", true);
        this.dataStore.setData("AuthData.isLoggedIn", true);
        console.log("Successfully registered the user\n");
        console.log("User first name: \t\x1b[32m", data.AuthData.firstName, "\x1b[0m");
        console.log("User last name: \t\x1b[32m", data.AuthData.lastName, "\x1b[0m");
        console.log("User email: \t\t\x1b[32m", data.AuthData.email, "\x1b[0m");
        console.log("User password: \t\t\x1b[32m", data.AuthData.password, "\x1b[0m");
        console.log("\n");

    }

    public async verifyExistingEmailError(){
        const data = this.dataStore.getData();
        this.page = await this.playWrightConfig.getPage();
        await expect(this.page.locator(RegistrationLocators.ERROR_MESSAGE)).toBeVisible();
        expect(await this.page.locator(RegistrationLocators.ERROR_MESSAGE).textContent()).toBe(data.AuthData.registration.existingEmailError);
        await this.page.locator(RegistrationLocators.ERROR_MESSAGE).click();
        await this.verifyRegistrationPage();

    }

}

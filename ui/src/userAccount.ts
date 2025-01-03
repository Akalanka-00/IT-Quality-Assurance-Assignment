import { Page } from "playwright";
import { PlaywrightConfig } from "../utils/playwright.config";
import { HeaderLocators } from "../locators/common/header.locator";
import {UserAccountUrl} from "../data/urls/userAccount.url"
import {PageHelper} from "./helper/pageHelper";
import {DataStore} from "../utils/dataStore";
import {UserAccountLocators} from "../locators/useraccount.locator"
import { expect} from "@playwright/test";

export class UserAccount{
    private page: Page = undefined as unknown as Page;
    private playWrightConfig: PlaywrightConfig;
    private pageHelper: PageHelper;
    private dataStore: DataStore;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
        this.pageHelper = new PageHelper();
        this.dataStore = DataStore.getInstance();
    }

    public async navigateToMyAccountInfoPage() {
        this.page = await this.playWrightConfig.getPage();
        await this.page.locator(HeaderLocators.MY_ACCOUNT_DROPDOWN).click();
        await this.page.locator(HeaderLocators.MY_ACCOUNT_DROPDOWN_ITEM).nth(0).click();
        await this.page.locator(UserAccountLocators.EDIT_ACCOUNT_BUTTON).click();
        await this.pageHelper.validateUrl(this.page, UserAccountUrl.EDIT_ACCOUNT_URL,true)
    }

    public async editInfo(userEditInfo:any){
        await this.page.fill(UserAccountLocators.FIRST_NAME_INPUT, userEditInfo.firstName);
        await this.page.fill(UserAccountLocators.LAST_NAME_INPUT, userEditInfo.lastName);
        await this.page.fill(UserAccountLocators.EMAIL_INPUT, userEditInfo.email);

    }

    public async SubmitInformation(){
        await this.page.click(UserAccountLocators.SUBMIT_BUTTON);
        console.log("Submitting Information");
    }

    public async getSuccessMessage(){
        await expect (this.page.locator(UserAccountLocators.SUCCESS_MESSAGE)).toBeVisible();
        console.log("Success: Your account has been successfully updated..");
    }





}
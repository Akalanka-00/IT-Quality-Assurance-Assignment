import {PlaywrightConfig} from "../../utils/playwright.config";
import {Page} from "playwright";
import {PageHelper} from "../helper/pageHelper";
import {AuthenticationUrl} from "../../data/urls/authentication.url";
import {DataStore} from "../../utils/dataStore";
import {expect} from "@playwright/test";
import { AddAddressLocators } from "../../locators/addressBook/address.locator";
import { LoginLocators } from "../../locators/authentication/login.locator";
import { AddressUrl } from "../../data/urls/address.url";
import { HeaderLocators } from "../../locators/common/header.locator";


export class AddAddress {

    private playWrightConfig: PlaywrightConfig;
    private pageHelper: PageHelper;
    private dataStore: DataStore;
    private page: Page = undefined as unknown as Page;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
        this.pageHelper = new PageHelper();
        this.dataStore = DataStore.getInstance();
    }

    public async navigateToAddressBookPage() {
        this.page = await this.playWrightConfig.getPage();
        
        await this.page.locator(HeaderLocators.MY_ACCOUNT_DROPDOWN).click();
        await this.page.locator(HeaderLocators.MY_ACCOUNT_DROPDOWN_ITEM).nth(0).click();
        await this.page.locator(AddAddressLocators.ADDRESS_BOOK_BUTTON).click();
        await this.pageHelper.validateUrl(this.page, AddressUrl.ADDRESS_BOOK_URL, true);
    }

    public async navigateToAddAddressPage() {
        this.page = await this.playWrightConfig.getPage();
        await this.page.locator(AddAddressLocators.NEW_ADDRESS_BUTTON).click();
        await this.pageHelper.validateUrl(this.page, AddressUrl.ADD_ADDRESS_URL, true);
    }

    public async addAddress(addressDetails: any) {
        await this.page.fill(AddAddressLocators.FIRST_NAME_INPUT_FIELD, addressDetails.firstName);
        await this.page.fill(AddAddressLocators.LAST_NAME_INPUT_FIELD, addressDetails.lastName);
        await this.page.fill(AddAddressLocators.COMPANY_INPUT_FIELD, addressDetails.company);
        await this.page.fill(AddAddressLocators.ADDRESS1_INPUT_FIELD, addressDetails.address1);
        await this.page.fill(AddAddressLocators.ADDRESS2_INPUT_FIELD, addressDetails.address2);
        await this.page.fill(AddAddressLocators.CITY_INPUT_FIELD, addressDetails.city);
        await this.page.fill(AddAddressLocators.POST_CODE_INPUT_FIELD, addressDetails.postCode);
        await this.page.selectOption(AddAddressLocators.COUNTRY_SELECT, addressDetails.country);
        await this.page.selectOption(AddAddressLocators.REGION_SELECT, addressDetails.region);
        if (addressDetails.defaultAddress) {
            await this.page.check(AddAddressLocators.DEFAULT_ADDRESS_SWITCH_YES);
        } else {
            await this.page.check(AddAddressLocators.DEFAULT_ADDRESS_SWITCH_NO);
        }
        await this.page.click(AddAddressLocators.CONTINUE_BUTTON);
        await this.page.waitForTimeout(2000);
    }

    public async verifyAddressAddedSuccess() {
        await expect(this.page.locator(AddAddressLocators.SUCCESS_MESSAGE)).toBeVisible();
        console.log("Address added successfully");
    }
}

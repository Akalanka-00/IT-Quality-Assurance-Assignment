import { Page } from "playwright";
import { PlaywrightConfig } from "../utils/playwright.config";
import { WishlistLocators } from "../locators/wishlist.locator";
import { expect } from "@playwright/test";

export class Wishlist {
    private page: Page = undefined as unknown as Page;
    private playWrightConfig: PlaywrightConfig;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
    }

    public async navigateToWishlistPage() {
        this.page = await this.playWrightConfig.getPage();
        await this.page.click(WishlistLocators.WISHLIST_PAGE_LINK);
        console.log("Navigated to Wishlist page.");
    }

    public async addProductToWishlist() {
        this.page = await this.playWrightConfig.getPage();
        await this.page.click(WishlistLocators.ADD_TO_WISHLIST_BUTTON);
        console.log("Clicked Add to Wishlist button.");
        await expect(this.page.locator(WishlistLocators.SUCCESS_MESSAGE)).toHaveText(/Product added to wishlist/);
        console.log("Verified product is added to wishlist.");
    }

    public async removeProductFromWishlist() {
        this.page = await this.playWrightConfig.getPage();
        await this.page.click(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON);
        console.log("Clicked Remove from Wishlist button.");
        await expect(this.page.locator(WishlistLocators.SUCCESS_MESSAGE)).toHaveText(/Product removed from wishlist/);
        console.log("Verified product is removed from wishlist.");
    }
}

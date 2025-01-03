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

    // Navigate to homepage and add a product to wishlist
    public async addProductToWishlist(productName: string) {
        this.page = await this.playWrightConfig.getPage();
        await this.page.goto("https://demo.opencart.com"); // Navigate to homepage
        console.log("Navigated to Home page.");

        // // Wait for product list to load
        // await this.page.waitForSelector(WishlistLocators.PRODUCT_LIST, { timeout: 10000 });
        // console.log("Product list is visible.");
        // await this.page.waitForSelector(WishlistLocators.PRODUCT_NAME, { timeout: 10000 });
        // console.log("Verified product names are visible.");

        const productElements = this.page.locator(WishlistLocators.PRODUCT_LIST);
        const count = await productElements.count();
        console.log(`Total products found: ${count}`);
        if (count === 0) {
            throw new Error("No products found on the homepage.");
        }
        for (let i = 0; i < count; i++) {
            const name = await productElements.nth(i).locator(WishlistLocators.PRODUCT_NAME).textContent();
            console.log(`Product found: ${name}`);

            if (name?.trim() === productName) {
                console.log("trying to click add to wishlist button..")
                await productElements.nth(i).locator(WishlistLocators.ADD_TO_WISHLIST_BUTTON).nth(1).click();
                console.log(`Clicked "Add to Wishlist" for product: "${productName}".`);
                // Verify success message
                const successMessageLocator = this.page.locator(WishlistLocators.SUCCESS_MESSAGE);
                // await expect(successMessageLocator).toBeVisible({ timeout: 10000 });
                await expect(successMessageLocator).toContainText(`Success: You have added ${productName} to your wish list`);
                console.log(`Verified success message for adding "${productName}" to wishlist.`);
                return;
            }
        }

        throw new Error(`Product "${productName}" not found on the homepage.`);
    }

    // Navigate to the wishlist page
    public async navigateToWishlistPage() {
        this.page = await this.playWrightConfig.getPage();
        await this.page.click(WishlistLocators.WISHLIST_PAGE_LINK);
        console.log("Navigated to Wishlist page.");
    }

    // Verify the product exists in the wishlist
    public async verifyProductInWishlist(productName: string) {
        const items = this.page.locator(WishlistLocators.WISHLIST_ITEM_NAME);
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            const name = await items.nth(i).textContent();
            if (name?.trim() === productName) {
                console.log(`Product "${productName}" found in wishlist.`);
                return true;
            }
        }
        throw new Error(`Product "${productName}" not found in wishlist.`);
    }

    // Remove product from the wishlist
    public async removeProductFromWishlist(productName: string) {
        const items = this.page.locator(WishlistLocators.WISHLIST_ITEMS);
        const count = await items.count();

        if (count === 0) {
            throw new Error("Wishlist is empty, nothing to remove.");
        }

        for (let i = 0; i < count; i++) {
            const name = await items.nth(i).locator(WishlistLocators.WISHLIST_ITEM_NAME).textContent();
            if (name?.trim() === productName) {
                await items.nth(i).locator(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON).click();
                console.log(`Clicked remove button for product "${productName}".`);
                await expect(this.page.locator(WishlistLocators.SUCCESS_MESSAGE)).toBeVisible({
                    timeout: 10000,
                });
                console.log(`Verified success message for removing "${productName}" from wishlist.`);
                return;
            }
        }

        throw new Error(`Product "${productName}" could not be removed because it was not found.`);
    }

    public async verifyConfirmationMessage() {
        const successMessage = this.page.locator(WishlistLocators.SUCCESS_MESSAGE);
        await expect(successMessage).toBeVisible();
        console.log("Verified that the confirmation message is displayed.");
    }

}
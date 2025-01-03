import { Page } from "playwright";
import { PlaywrightConfig } from "../../utils/playwright.config";
import { ShoppingCartLocators } from "../../locators/shoppingcart.locator";
import { expect } from "playwright/test";

export class shoppingCart{
    private page: Page = undefined as unknown as Page;
    private playWrightConfig: PlaywrightConfig;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
}

public async navigateToshoppingCartPage() {
    this.page = await this.playWrightConfig.getPage();
    await this.page.click(ShoppingCartLocators.SHOPPINGCART_PAGE_LINK);
    console.log("Navigated to shopping cart page.");
}
public async addProductToCart() {
    this.page = await this.playWrightConfig.getPage();
    await this.page.click(ShoppingCartLocators.ADD_TO_CART_BUTTON);
    console.log("Clicked Add to Wishlist button.");
    await expect(this.page.locator(ShoppingCartLocators.SUCCESS_MESSAGE)).toHaveText(/Product added to Cart/);
    console.log("Verified product is added to wishlist.");
}

public async removeProductFromWishlist() {
    this.page = await this.playWrightConfig.getPage();
    await this.page.click(ShoppingCartLocators.REMOVE_FROM_CART_BUTTON);
    console.log("Clicked Remove from Wishlist button.");
    await expect(this.page.locator(ShoppingCartLocators.SUCCESS_MESSAGE)).toHaveText(/Product removed from cart/);
    console.log("Verified product is removed from wishlist.");
}

}
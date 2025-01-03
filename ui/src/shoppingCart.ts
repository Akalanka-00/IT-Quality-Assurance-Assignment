import { Page } from "playwright";
import { PlaywrightConfig } from "../utils/playwright.config";
import { ShoppingCartLocators } from "../locators/shoppingcart.locator";
import { expect } from "playwright/test";
import { WishlistLocators } from "../locators/wishlist.locator";

export class shoppingCart{
    private page: Page = undefined as unknown as Page;
    private playWrightConfig: PlaywrightConfig;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
}

public async addProductToCart(productName:string) {
    this.page = await this.playWrightConfig.getPage();
    await this.page.goto("https://demo.opencart.com"); 
        console.log("Navigated to Home page.");
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
                        await this.page.waitForTimeout(2000);
                        await productElements.nth(i).locator(ShoppingCartLocators.ADD_TO_CART_BUTTON).nth(0).click();
                        console.log(`Clicked "Add to Cart" for product: "${productName}".`);
                        await this.page.waitForTimeout(4000);
                        const successMessageLocator = this.page.locator(ShoppingCartLocators.SUCCESS_MESSAGE);
                        // await expect(successMessageLocator).toBeVisible({ timeout: 10000 });
                        await expect(successMessageLocator).toContainText(`Success: You have added ${productName} to your shopping cart`);
                        console.log(`Verified success message for adding "${productName}" to Cart.`);
                        return;
                    }
                }
        
                throw new Error(`Product "${productName}" not found on the homepage.`);
            
}// Navigate to the shopping cart page
public async navigateToShoppingCartPage() {
    this.page = await this.playWrightConfig.getPage();
    await this.page.click(ShoppingCartLocators.SHOPPINGCART_PAGE_LINK);
    console.log("Navigated to Shopping Cart page.");
}

// Verify the product exists in the shopping Cart
public async verifyProductInShoppingCart(productName: string) {
    const items = this.page.locator(ShoppingCartLocators.CART_ITEM_NAME);
    const count = await items.count();

    for (let i = 0; i < count; i++) {
        const name = await items.nth(i).textContent();
        if (name?.trim() === productName) {
            console.log(`Product "${productName}" found in Shopping cart.`);
            return true;
        }
    }
    throw new Error(`Product "${productName}" not found in Shopping cart.`);
}

 // Remove product from the cart
 public async removeProductFromCart(productName: string) {
    const items = this.page.locator(ShoppingCartLocators.CART_ITEMS);
    const count = await items.count();

    if (count === 0) {
        throw new Error("Cart is empty, nothing to remove.");
    }

    for (let i = 0; i < count; i++) {
        const name = await items.nth(i).locator(ShoppingCartLocators.CART_ITEM_NAME).textContent();
        if (name?.trim() === productName) {
            await items.nth(i).locator(ShoppingCartLocators.REMOVE_FROM_CART_BUTTON).click();
            console.log(`Clicked remove button for product "${productName}".`);
            await expect(this.page.locator(ShoppingCartLocators.SUCCESS_MESSAGE)).toBeVisible({
                timeout: 10000,
            });
            console.log(`Verified success message for removing "${productName}" from the cart.`);
            return;
        }
    }

    throw new Error(`Product "${productName}" could not be removed because it was not found.`);
}

public async verifyConfirmationMessage() {
    const successMessage = this.page.locator(ShoppingCartLocators.SUCCESS_MESSAGE);
    await expect(successMessage).toBeVisible();
    console.log("Verified that the confirmation message is displayed.");
}

}
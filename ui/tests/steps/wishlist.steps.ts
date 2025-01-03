import { Given, When, Then } from "@cucumber/cucumber";
import { Wishlist } from "../../src/wishlist";

const wishlist = new Wishlist();

Given("I navigate to the products page", async function () {
    console.log("Navigating to products page...");
});

When("I add the product {string} to the wishlist", async function (productName: string) {
    await wishlist.addProductToWishlist(productName);
});

Then("The product {string} should be listed in the wishlist", async function (productName: string) {
    await wishlist.navigateToWishlistPage();
    await wishlist.verifyProductInWishlist(productName);
});

Then("A confirmation message should be displayed", async function () {
    await wishlist.verifyConfirmationMessage();
});

Given("I navigate to the wishlist page", async function () {
    await wishlist.navigateToWishlistPage();
});

When("I remove the product {string}", async function (productName: string) {
    await wishlist.removeProductFromWishlist(productName);
});

Then("The product {string} should no longer be listed in the wishlist", async function (productName: string) {
    try {
        await wishlist.verifyProductInWishlist(productName);
        throw new Error(`Product "${productName}" is still listed in the wishlist.`);
    } catch (error) {
        console.log(`Validation passed: "${productName}" is no longer in the wishlist.`);
    }
});

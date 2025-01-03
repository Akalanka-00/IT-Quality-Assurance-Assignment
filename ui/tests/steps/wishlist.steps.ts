import { Given, When, Then } from "@cucumber/cucumber";
import { Wishlist } from "../../src/wishlist";

const wishlist = new Wishlist();

Given("I navigate to the home page", async function () {
    await wishlist.navigateToHomePage();
});

When("I add the product {string} to the wishlist", async function (productName: string) {
    await wishlist.addProductToWishlist(productName);
});

Then("The product {string} should be listed in the wishlist", async function (productName: string) {
    await wishlist.navigateToWishlistPage();
    await wishlist.verifyProductInWishlist(productName);
});

Given("I navigate to the wishlist page", async function () {
    await wishlist.navigateToWishlistPage();
});

When("I remove the product {string}", async function (productName: string) {
    await wishlist.removeProductFromWishlist(productName);
});

Then("The product {string} should no longer be listed in the wishlist", async function (productName: string) {
    await wishlist.verifyProductNotInWishlist(productName);
});

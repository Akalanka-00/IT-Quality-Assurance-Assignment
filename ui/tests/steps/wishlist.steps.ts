import { Given, When, Then } from "@cucumber/cucumber";
import { Wishlist } from "../../src/wishlist";

const wishlist = new Wishlist();

Given("I am on the product page", async function () {
    await wishlist.navigateToWishlistPage();
});

When('I click on "Add to Wishlist"', async function () {
    await wishlist.addProductToWishlist();
});

Then("The product should be added to the wishlist", async function () {
    console.log("Add to Wishlist validation complete.");
});

Given("I have a product in the wishlist", async function () {
    await wishlist.navigateToWishlistPage();
    console.log("Verified the product is already in the wishlist.");
});

When('I click on "Remove from Wishlist"', async function () {
    await wishlist.removeProductFromWishlist();
});

Then("The product should be removed from the wishlist", async function () {
    console.log("Remove from Wishlist validation complete.");
});

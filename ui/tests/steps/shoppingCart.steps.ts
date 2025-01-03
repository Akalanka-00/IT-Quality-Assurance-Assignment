import{ Given, When, Then } from '@cucumber/cucumber';
import { shoppingCart } from '../../src/shoppingCart';

const shoppingcart =new shoppingCart();

Given("I navigate to the products page",async function(){
  await shoppingcart.navigateToShoppingCartPage();
});

  When('I add {string} to the cart', async function (productName:string) {
    await shoppingcart.addProductToCart(productName)
  });

  Then('A confirmation message should be displayed', async function () {
    await shoppingcart.verifyConfirmationMessage();
  });


  When('I clcik on Shopping Cart Button', async function () {
    await shoppingcart.navigateToShoppingCartPage();
  });


  Then('The added Products {string} should be visible', async function (productName:string) {
    await shoppingcart.navigateToShoppingCartPage();
    await shoppingcart.verifyProductInShoppingCart(productName);
  });

//   Scenario: Remove a product from the shopping cart

  Given('I navigate to the shopping cart page', async function () {
    await shoppingcart.navigateToShoppingCartPage();
  });

  When('I click on {string} remove from the cart', async function (productName:string) {
    await shoppingcart.removeProductFromCart(productName);
  });

  Then('The product should be removed from the shopping cart', async function (productName:string) {
    try {
      await shoppingcart.verifyProductInShoppingCart(productName);
      throw new Error(`Product "${productName}" is still listed in the Cart.`);
  } catch (error) {
      console.log(`Validation passed: "${productName}" is no longer in the Cart.`);
  }
  });

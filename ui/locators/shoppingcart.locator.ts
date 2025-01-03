export class ShoppingCartLocators {
    // Product Page Locators
    static ADD_TO_CART_BUTTON = "//button[contains(@data-bs-original-title, 'Add to Cart')]";
    static SUCCESS_MESSAGE = "//div[contains(@class, 'alert-success')]";

    // Shopping Cart Page Locators
    static SHOPPINGCART_PAGE_LINK = "//a[contains(@href, 'checkout/cart')]";
    static CART_ITEMS = "//table[@class='table table-bordered table-hover']//tbody//tr";
    static CART_ITEM_NAME = "//a[contains(@href, '/product/macbook')]";
    static REMOVE_FROM_CART_BUTTON = "//button[contains(@formaction, 'checkout/cart.remove')]";
    static EMPTY_CART_MESSAGE = "//div[contains(text(), 'Your shopping cart is empty!')]";
}
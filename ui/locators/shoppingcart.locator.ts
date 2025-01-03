export class ShoppingCartLocators {
    // Product Page Locators
    static ADD_TO_CART_BUTTON = "//button[contains(@data-bs-original-title, 'Add to Cart')]";
    static SUCCESS_MESSAGE = "//div[contains(@class, 'alert-success')]";

    // Shopping Cart Page Locators
    static SHOPPINGCART_PAGE_LINK = "//a[contains(@href, 'wishlist')]";
    static CART_ITEMS = "//table[@class='table table-bordered table-hover']//tbody//tr";
    static CART_ITEM_NAME = "//td[@class='text-start']/a";
    static REMOVE_FROM_CART_BUTTON = "//button[contains(@formaction, 'item.remove')]";
    static EMPTY_CART_MESSAGE = "//div[contains(text(), 'Your Cart is empty!')]";
}
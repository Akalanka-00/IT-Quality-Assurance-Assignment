export class WishlistLocators {
    // Product Page Locators
    static ADD_TO_WISHLIST_BUTTON = "//button[contains(@data-bs-original-title, 'Add to Wish List')]";
    static SUCCESS_MESSAGE = "//div[contains(@class, 'alert-success')]";

    // Wishlist Page Locators
    static WISHLIST_PAGE_LINK = "//a[contains(@href, 'wishlist')]";
    static WISHLIST_ITEMS = "//table[@class='table table-bordered table-hover']//tbody//tr";
    static WISHLIST_ITEM_NAME = "//td[@class='text-start']/a";
    static REMOVE_FROM_WISHLIST_BUTTON = "//button[contains(@formaction, 'wishlist.remove')]";
    static EMPTY_WISHLIST_MESSAGE = "//div[contains(text(), 'Your wishlist is empty!')]";
}

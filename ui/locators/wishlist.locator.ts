export class WishlistLocators {
    // Products Page Locators
    static PRODUCT_LIST = "//div[contains(@class, 'product-thumb')]";
    static PRODUCT_NAME = ".content .description a";
    static ADD_TO_WISHLIST_BUTTON = '.button-group button[type="submit"]';
    static SUCCESS_MESSAGE = "//div[@class='alert alert-success alert-dismissible']";

    // Wishlist Page Locators
    static WISHLIST_PAGE_LINK = "//a[contains(@href, 'wishlist')]";
    static WISHLIST_ITEMS = ".table.table-bordered.table-hover tbody tr";
    static WISHLIST_ITEMS_FIELD = "td"
    static WISHLIST_ITEM_NAME = "//td[@class='text-start']/a";
    static WISHLIST_ITEM_ACTION_BUTTON = 'button[type="submit"]';
    static EMPTY_WISHLIST_MESSAGE = "//div[contains(text(), 'Your wishlist is empty!')]";

}

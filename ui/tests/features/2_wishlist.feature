Feature: Wishlist Management

  Background:
    Given Login with valid user credentials

  @TC-024
  Scenario: Add a product to the wishlist from the products page
    Given I navigate to the home page
    When I add the product "MacBook" to the wishlist
    Then The product "MacBook" should be listed in the wishlist

  @TC-025
  Scenario: Remove a product from the wishlist
    Given I navigate to the wishlist page
    When I remove the product "MacBook"
    Then The product "MacBook" should no longer be listed in the wishlist

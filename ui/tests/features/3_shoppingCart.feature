Feature:Add items to Shopping Cart 

Background:
    Given Login with valid user credentials

  @TC-026
  Scenario: Add a product to the shopping cart
    Given I navigate to the products page
    When I add "MacBook" to the cart
    Then A confirmation message should be displayed
    When I clcik on Shopping Cart Button
    Then The added Products "MacBook" should be visible

  @TC-027
  Scenario: Remove a product from the shopping cart
    Given I navigate to the shopping cart page
    When I click on "MacBook" remove from the cart
    Then The product should be removed from the shopping cart
    And A confirmation message should be displayed


Feature:Add items to Shopping Cart 

Background:
    Given Login with valid user credentials

  Scenario: Add a product to the shopping cart
    Given I navigate to the products page
    When I add "Macbook" to the cart
    Then A confirmation message should be displayed
    When I clcik on Shopping Cart Button
    Then The added Products should be visible

#   Scenario: Remove a product from the shopping cart
#     Given I navigate to the shopping cart page
#     When I click on "Macbook" remove from the cart
#     Then The product should be removed from the shopping cart
#     And A confirmation message should be displayed


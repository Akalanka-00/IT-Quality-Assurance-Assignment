Feature:Add items to Shopping Cart 

Background:
    Given User should be logged in successfully

  Scenario: Add a product to the shopping cart
    Given I am on the product page
    When I click on "Add to Cart"
    Then The product should be added to the shopping cart
    And A confirmation message should be displayed
    When I clcik on "Shopping Cart"
    Then The added Products should be visible

  Scenario: Remove a product from the shopping cart
    Given I have a product in the shopping cart
    When I click on "Remove from Cart"
    Then The product should be removed from the shopping cart
    And A confirmation message should be displayed


Feature:Add items to Shopping Cart 

Background:
    Given Login with valid user credentials

  @TC-026
  Scenario: Add a product to the shopping cart
    Given I navigate to the products page
    When I click on "Macbook" add to cart
    Then The product should be added to the shopping cart
    And A confirmation message should be displayed
    When I clcik on "Shopping Cart"   
    Then The added Products should be visible

  @TC-027
  Scenario: Remove a product from the shopping cart
    Given I have a product in the shopping cart
    When I click on "Macbook" remove from the cart
    Then The product should be removed from the shopping cart
    And A confirmation message should be displayed


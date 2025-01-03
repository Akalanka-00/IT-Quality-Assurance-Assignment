Feature: User Account

Background:
  Given Login with valid user credentials

  Scenario: Successfully update account details
    Given I navigate to the "My Account Information" page
    When I update the firstname,lastname and email
    And I click the "Continue" button
    Then I should see a success message confirming the details were updated

  Scenario: Validation errors when fields are left empty or invalid
    Given I navigate to the "My Account Information" page
    When I leave the firstname, lastname, and email fields empty
    And I click the "Continue" button
    Then I should see the validation errors
#      | First Name must be between 1 and 32 characters! |
#      | Last Name must be between 1 and 32 characters!  |
#      | E-Mail Address does not appear to be valid!     |



Feature: User Account

Background:
  Given Navigate to Login Page

  Scenario: Successfully update account details
    Given I navigate to the "My Account Information" page
    When I update the firstname,lastname and email
    And I click the "Continue" button
    Then I should see a success message confirming the details were updated



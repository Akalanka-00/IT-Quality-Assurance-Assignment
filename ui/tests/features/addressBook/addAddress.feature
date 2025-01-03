Feature: Add Address

  Background:
    Given Navigate to Login Page
    And Submit the login form with valid credentials
    And User should be logged in successfully
    And Navigate to Address Book Page

  Scenario: Add a new address with valid details
    Given Navigate to Add Address Page
    When Submit the add address form
    Then Address should be added successfully




    
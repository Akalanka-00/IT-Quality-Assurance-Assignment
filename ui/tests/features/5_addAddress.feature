Feature: Add Address

  Background:
    Given Login with valid user credentials
    And Navigate to Address Book Page

  @TC-030
  Scenario: Add a new address with valid details
    Given Navigate to Add Address Page
    When Submit the add address form
    Then Address should be added successfully




    
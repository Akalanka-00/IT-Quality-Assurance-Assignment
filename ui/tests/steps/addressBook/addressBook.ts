import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { AddAddress } from '../../../src/addressBook/addressBook';


setDefaultTimeout(1000 * 60 * 10);
const addAddress = new AddAddress();

Given("Navigate to Address Book Page", async function () {
    await addAddress.navigateToAddressBookPage();
});


Given("Navigate to Add Address Page", async function () {
    await addAddress.navigateToAddAddressPage();
});

When("Submit the add address form", async function () {
    const addressDetails = {
        firstName: "John",
        lastName: "Doe",
        company: "Company Name",
        address1: "123 Street",
        address2: "Apartment 456",
        city: "CityName",
        postCode: "12345",
        country: "United Kingdom",
        region: "Aberdeen",
        defaultAddress: true
    };
    await addAddress.addAddress(addressDetails);
});

Then("Address should be added successfully", async function () {
    await addAddress.verifyAddressAddedSuccess();
});
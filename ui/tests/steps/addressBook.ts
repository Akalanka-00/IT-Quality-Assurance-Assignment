import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { AddAddress } from '../../src/addressBook/addressBook';
import {DataStore} from "../../utils/dataStore";


setDefaultTimeout(1000 * 60 * 10);
const addAddress = new AddAddress();

Given("Navigate to Address Book Page", async function () {
    await addAddress.navigateToAddressBookPage();
});


Given("Navigate to Add Address Page", async function () {
    await addAddress.navigateToAddAddressPage();
});

When("Submit the add address form", async function () {
    const data = DataStore.getInstance().getData();
    const randomInt = data.SharedData.randomInt;
    const randomPostCode = Math.floor(10000 + Math.random() * 90000);

    const addressDetails = {
        firstName: `John_${randomInt}`,
        lastName: `Doe_${randomInt}`,
        company: `Company_${randomInt}`,
        address1: `${randomInt} Street`,
        address2: `Apartment ${randomInt}`,
        city: `City_${randomInt}`,
        postCode: `${randomPostCode}`,
        country: "United Kingdom",
        region: "Aberdeen",
        defaultAddress: true
    };
    await addAddress.addAddress(addressDetails);
});

Then("Address should be added successfully", async function () {
    await addAddress.verifyAddressAddedSuccess();
});
import { Given} from "@cucumber/cucumber";

Given("I navigate to the home page", async function () {
    this.page = await this.playWrightConfig.getPage();
    await this.page.goto("https://demo.opencart.com"); // Navigate to homepage
    console.log("Navigated to Home page.");
});


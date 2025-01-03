import { Page } from '@playwright/test';
import { AuthenticationUrl } from "../../data/urls/authentication.url";

export async function handleRandomHumanVerification(page: Page) {
    page.on('framenavigated', async (frame) => {
        const url = frame.url();

        // Check if the current URL includes the register page URL and also contains the verification text
        if (url.includes(AuthenticationUrl.REGISTER_URL)) {
            const verificationText = 'text=Verifying you are human. This may take a few seconds.'; // Ensure this text is correct

            try {
                // Ensure the page is still available
                if (page.isClosed()) {
                    console.log("Page is closed, stopping verification process.");
                    return; // Exit if the page is closed
                }

                // Wait for the verification text to appear (with a longer timeout)
                const isVerificationTextPresent = await page.locator(verificationText).isVisible({ timeout: 30000 });
                if (!isVerificationTextPresent) {
                    return; // Exit if the verification text is not found
                }

                console.log("Human verification page detected. Waiting for it to disappear...");

                const maxRetries = 10; // Max retries (e.g., 10 attempts, which would give 20 seconds with 2s intervals)
                let retries = 0;

                // Wait for the page to be fully loaded after every navigation action
                await page.waitForNavigation({ waitUntil: 'load', timeout: 30000 });

                // Use a while loop to check every 2 seconds if the verification text is still visible
                while (retries < maxRetries) {
                    console.log(`Retry ${retries + 1}/${maxRetries}: Checking for human verification text...`);

                    // Check if the verification text is still visible
                    const isVisible = await page.locator(verificationText).isVisible();
                    if (!isVisible) {
                        console.log("Verification text disappeared. Continuing test...");
                        break; // Exit the loop if the text is no longer visible
                    }

                    // Wait for 2 seconds before the next check
                    await page.waitForTimeout(2000);
                    retries++;
                }

                if (retries === maxRetries) {
                    console.log("Human verification process exceeded max retries, but continuing without error.");
                }

            } catch (error) {
                console.log("Error during verification process, but continuing without error:", error);
                // No throw, just log the error and continue with the test.
            }
        }
    });
}

import {test} from "@playwright/test"
import {PomSample} from "../src/PomSample";

test.describe("test",()=>{
    test('test', async ({ page }) => {
    const pom:PomSample=new PomSample();
    await pom.testMethod(page);
	});
});
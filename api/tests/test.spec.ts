import {test} from "playwright/test";
import {PomSample} from "../src/PomSample";

test.describe.only('Authentication', () => {


    test('testing', async () => {
       const pom: PomSample = new PomSample();
       await pom.testMethod();
    });


});




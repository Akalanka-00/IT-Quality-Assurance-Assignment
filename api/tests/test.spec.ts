import {test} from "playwright/test";
import {PomSample} from "../src/PomSample";
import {DataStore} from "../utils/DataStore";

test.describe.only('Authentication', () => {


    test('testing', async ({request}) => {
       const pom: PomSample = new PomSample(request);
       await pom.testMethod();
    });

    test('testing2', async ({request}) => {
        const pom: PomSample = new PomSample(request);
        //await pom.testMethod();
    });


});




import {test} from "playwright/test";
import {PomSample} from "../src/PomSample";
import {DataStore} from "../utils/DataStore";

test.describe.only('Authentication', () => {


    test('testing', async () => {
       const pom: PomSample = new PomSample();
        console.log(DataStore.getInstance().getData());
        console.log(DataStore.getInstance().getData());
        console.log(DataStore.getInstance().getData());
        console.log(DataStore.getInstance().getData());
        console.log(DataStore.getInstance().getData());
       await pom.testMethod();
    });

    test('testing2', async () => {
        const pom: PomSample = new PomSample();
        await pom.testMethod();
    });


});




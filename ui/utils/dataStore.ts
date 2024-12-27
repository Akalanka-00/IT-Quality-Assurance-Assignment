import {AuthData} from "../data/authentication/AuthData";
import {SharedData} from "../data/shared/SharedData";
import {AuthenticationUrl} from "../data/urls/authentication.url";
import {data} from "../data/data";

export class DataStore{

    private static instance: DataStore;

    private constructor() {}

    // Get the Singleton instance
    public static getInstance(): DataStore {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    public getData(){
        return data;
    }

    public setData(key: string, value: any){
        const keys = key.split(".");
        let data:any = this.getData();

        for (let i = 0; i < keys.length - 1; i++) {
            if (data.hasOwnProperty(keys[i])) {
                data = data[keys[i]];
            } else {
                return;
            }
        }

        if (data.hasOwnProperty(keys[keys.length - 1])) {
            data[keys[keys.length - 1]] = value;
        }
    }

}
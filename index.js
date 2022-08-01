import GetCustomer from "./scenario/Get Customer.js";
import GetAllCustomer from "./scenario/Get All Customer.js";

import { group, sleep } from 'k6';

export default function() {
    group('GETCUSTOMER - Controller Customer', () => {
        GetCustomer();
        
    });

    sleep(1);

    group('GETALLCUSTOMER - Controller Customer', () => {
        GetAllCustomer();
        
    });

    sleep(1);
}
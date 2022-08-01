import http from 'k6/http';
import { Trend, Rate, Counter } from 'k6/metrics';
import { sleep } from 'k6';
import { fail } from 'k6';

export let GetCustomerDuration = new Trend('get_customer_duration');
export let GetCustomerFailRate = new Rate('get_customer_fail_rate');
export let GetCustomerSucessRate = new Rate('get_customer_success_rate');
export let GetCustomerReqs = new Counter('get_customer_success_reqs');

export default function() {

    let response = http.get('https://localhost:5001/api/Customer/GetCustomer?id=1');
    
    GetCustomerDuration.add(response.timings.duration);
    GetCustomerReqs.add(1);
    GetCustomerFailRate.add(response.status == 0 || response.status > 399);
    GetCustomerSucessRate.add(response.status != 0 && response.status < 399);

    let durationMsg = 'Máximo de duração da requisição ${5000/1000}s'
    if(!chceck(response, {
        'máximo de duração' : (r) => r.timings.duration < 5000,
    })){
        fail(durationMsg);
    }

    sleep(1);
}
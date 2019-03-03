let customersAPI;
let employeesAPI;

const useLocalAPI = process.env.USE_LOCAL_API;

console.log(`useLocalAPI: ${useLocalAPI}`)

if(useLocalAPI === 'true') {
    customersAPI = 'http://localhost:9000/';
    employeesAPI = 'http://localhost:9001/';
}
else {
    employeesAPI = 'https://employee-api-p3.herokuapp.com/';
    customersAPI = 'https://customer-api-p3.herokuapp.com/';
}

export const CUSTOMERS_API = customersAPI;
export const EMPLOYEES_API = employeesAPI;
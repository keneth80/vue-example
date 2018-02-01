import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export default class MockService {
    constructor () {
        this.mock = new AxiosMockAdapter(axios);
        this.setMockApi();
    }

    setMockApi () {
        this.mock.onGet('/user?id=123').reply(200, {
            name: 'John Smith',
            password: '123456789'
        });
    }

    setTodoApi () {
        this.mock.onGet('/todos').reply(200, []);
        this.mock.onPost('/todos').reply(200, {});
        this.mock.onDelete('/todos')
        .reply(function (config) {
            // the actual id can be grabbed from config.url
            console.log('/todos delete : ', config);
            return [200, {}];
        });
    }
}

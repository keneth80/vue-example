import axios from 'axios';
import { MaintEventType, ErrorEventType } from '../../common/EventConstant';

export default class HttpCaller {
    static service (action = '', methodType = 'get', queryString = '', params) {
        axios[methodType](queryString)
            .then(res => {
                const resposeData = {
                    action: action,
                    data: res.data
                };
                dispatchEvent(new CustomEvent(MaintEventType.MAIN_EVENT, {detail: resposeData}));
            })
            .catch(e => {
                dispatchEvent(new CustomEvent(ErrorEventType.SERVER_ERROR, {detail: {errorCode: 500, message: e.message}}));
                console.log('Error => ', e);
            });
    }
}

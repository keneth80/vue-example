import axios from 'axios';
import { MaintEventType, ErrorEventType } from '../../common/EventConstant';

export default class HttpCaller {
    static service (action = '', methodType = 'get', queryString = '', params) {
        axios[methodType](queryString)
            .then(res => {
                const responseData = {
                    action: action,
                    data: res.data
                };
                dispatchEvent(new CustomEvent(MaintEventType.MAIN_EVENT, {detail: responseData}));
            })
            .catch(e => {
                dispatchEvent(new CustomEvent(ErrorEventType.SERVER_ERROR, {detail: {uri: queryString, errorCode: 404, message: e.message}}));
                console.log('Error => ', e);
            });
    }
}

import Vue from 'vue';
import axios from 'axios';
import { MaintEventType, ErrorEventType } from '../../common/EventConstant';

export default class HttpCaller {
    constructor () {
        console.log('new Http');
    }

    static async service (action = '', methodType = 'get', queryString = '', params) {
        await axios[methodType](queryString)
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

    static async serviceAll (action = '', services = [], isAllCheck = true) {
        if (!services.length) {
            console.log('not service data!');
            return;
        }
        if (isAllCheck) {
            await axios.all(services)
            .then(res => {
                console.log('service all : ', res);
                const responseData = {
                    action: action,
                    data: res
                };
                dispatchEvent(new CustomEvent(MaintEventType.MAIN_EVENT, {detail: responseData}));
            })
            .catch(e => {
                console.log('service all Error : ', e);
            });
        } else {
            // 해당 예제는 순차 처리가 안됨. for 돌기전에 done이 찍힘.
            // services.forEach(async (service) => {
            //     await service.then(res => {
            //         console.log('sequence service data : ', res);
            //     })
            //     .catch(e => {
            //         console.log('sequence service Error : ', e);
            //     });
            // });
            // 해당 예제는 순차처리가 됨. for 다 돌고 done이 찍힘.
            const dataMap = [];
            for (const service of services) {
                await service.then(res => {
                    dataMap.push(res.data);
                    console.log('sequence service data : ', res);
                })
                .catch(e => {
                    console.log('sequence service Error : ', e);
                });
            }
            const responseData = {
                action: action,
                data: dataMap
            };
            dispatchEvent(new CustomEvent(MaintEventType.MAIN_EVENT, {detail: responseData}));
            console.log('sequence service done!!');
        }
    }
}

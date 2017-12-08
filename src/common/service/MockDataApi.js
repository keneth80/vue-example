import Vue from 'vue';
import axios from 'axios';
import { MaintEventType, ErrorEventType } from '../../common/EventConstant';
import ServiceCommon from './ServiceCommon';
import ServiceUtil from './ServiceUtil';

export default class MockDataApi extends ServiceCommon {
    constructor () {
        super();
        console.log('new MockDataApi');
    }

    getCafeInfo (params) {
        return axios.get('http://jsonplaceholder.typicode.com/posts', params);
    }

    getCharactorInfo (params) {
        return axios.get('http://jsonplaceholder.typicode.com/posts/1', params);
    }

    getComment (params) {
        return axios.get('http://jsonplaceholder.typicode.com/posts/1/comments', params);
    }

    getErrorData (params) {
        return axios.get('http://jsonplaceholder.typicode.com/posts/1.comments', params);
    }

    async getLoginProcess (params) {
        const returnCafeData = await this.getCafeInfo({memberId: 'pretty'})
            .then(res => {
                console.log('first');
                return res.data;
            })
            .catch(e => {
                console.log(e);
                return null;
            });
        const returnCharData = await this.getCharactorInfo({memberId: 'pretty'})
            .then(res => {
                console.log('second : ', returnCafeData);
                return res.data;
            })
            .catch(e => {
                console.log(e);
                return null;
            });
        const returnCommentData = await this.getComment({memberId: 'pretty'})
            .then(res => {
                console.log('third : ', returnCharData);
                return res.data;
            })
            .catch(e => {
                console.log(e);
                return null;
            });
        return await ServiceUtil.cloneObj({returnCafeData, returnCharData, returnCommentData});
    }

    async getLoginProcessMapper (params) {
        const returnCafeData = await ServiceUtil.asyncAwaitMapper(this.getCafeInfo, {memberId: 'pretty'}, {'content-type': 'text/json'});
        console.log('getLoginProcessMapper.returnCafeData : ', returnCafeData);
        const returnCharData = await ServiceUtil.asyncAwaitMapper(this.getCharactorInfo, {memberId: 'pretty'});
        console.log('getLoginProcessMapper.returnCharData : ', returnCharData);
        const returnCommentData = await ServiceUtil.asyncAwaitMapper(this.getComment, {memberId: 'pretty'});
        console.log('getLoginProcessMapper.returnCommentData : ', returnCommentData);
        return await ServiceUtil.cloneObj({returnCafeData, returnCharData, returnCommentData});
    }
}

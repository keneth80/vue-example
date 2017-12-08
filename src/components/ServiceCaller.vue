<template>
    <div class="container">
        <h1 contenteditable="true">{{ messageObj.text }}</h1>
        <button @click="getData">
            get data
        </button>
        <button @click="getAll">
            get data ALL
        </button>
        <button @click="getSeq">
            get data Sequential
        </button>
        <button @click="getAsyncCall">
            get data Async
        </button>
        <button @click="getAsyncCallError">
            get data Async Error
        </button>
        <button @click="setError">
            get data Error
        </button>
        <button @click="unBind">
            Event remove
        </button>
        <button @click="eventBind">
            Event Bind
        </button>
        <button @click="login({
                memberId: 'pretty',
                name: 'John'
            })">
            Login
        </button>
        <button @click="logout">
            Logout
        </button>
        <button @click="parentCall">
            Parent Call
        </button>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
        <modal v-if="showModal" title="Error" :body="errorMsg" @close="showModal = false">
            <h3 slot="header">Error</h3>
        </modal>
    </div>
</template>

<script>
import HttpCaller from '../common/service/Http';
import MockDataApi from '../common/service/MockDataApi';
import ServiceUtil from '../common/service/ServiceUtil';
import { CustomModal } from '../common/component/index';
import ComponentBase from '../common/base/Component.base';
import ComponentBase2 from '../common/base/ComponentA.base';
import LoginBase from '../common/base/Login.base';
import { MaintEventType, ErrorEventType } from '../common/EventConstant';
import CommandActionMap from '../common/event/CommandActionMap';
import BeanContainer from '../common/model/BeanContainer';
import { USER } from '../common/ModelConstant';
import axios from 'axios';

export default {
    name: 'ServiceCaller',
    mixins: [ComponentBase2, LoginBase],
    data () {
        return {
            messageObj: {
                id: '01',
                text: 'Service Caller Example',
                author: 'kenneth'
            },
            log: [],
            showModal: false,
            errorMsg: '',
            asyncData: {}
        };
    },
    watch: {
        asyncData: {
            handler: function (newvalue, oldvalue) {
                console.log('asyncData : ', newvalue, oldvalue);
            },
            deep: true
        }
    },
    components: {
        CustomModal
    },
    methods: {
        getData () {
            HttpCaller.service('testAction', 'get', 'http://jsonplaceholder.typicode.com/posts', {});
        },
        setError () {
            HttpCaller.service('testAction', 'get', 'http://jsonplaceholder.typicode.com/getsss', {});
        },
        bindService (event) {
            console.log('response : ', event);
            this.log = event.data;
            // const beanContainer = BeanContainer.getInstance();
            // beanContainer.setBean('userInfo', {
            //     memberId: 'pretty',
            //     name: 'John'
            // });
        },
        showError (event) {
            this.errorMsg = `<span>URI : ${event.detail.uri} <br/> Message: <br/> <h5> ${event.detail.message} </h5></span>`;
            this.showModal = true;
            console.log('showError : ', event);
        },
        userInfoChange (event) {
            console.log('userInfoChange : ', event.detail);
        },
        getAll () {
            const mockData = new MockDataApi();
            const services = [
                mockData.getCafeInfo({memberId: 'pretty'}),
                mockData.getCharactorInfo({memberId: 'pretty'}),
                // mockData.getErrorData({memberId: 'pretty'}),
                mockData.getComment({memberId: 'pretty'})
            ];
            HttpCaller.serviceAll('testAction', services);
        },
        getSeq () {
            const mockData = new MockDataApi();
            const services = [
                mockData.getCafeInfo({memberId: 'pretty'}),
                mockData.getCharactorInfo({memberId: 'pretty'}),
                mockData.getErrorData({memberId: 'pretty'}),
                mockData.getComment({memberId: 'pretty'})
            ];
            HttpCaller.serviceAll('testAction', services, false);
        },
        unBind () {
            // removeEventListener(BeanContainer.SET_BEAN + '_userInfo', this.userInfoChange);
            this.removeEvent(USER.USER_INFO, this.userInfoChange);
        },
        eventBind () {
            this.addEvent(ErrorEventType.SERVER_ERROR, this.showError);
            this.addEvent(USER.USER_INFO, this.userInfoChange);
        },
        parentCall () {
            this.opUpdate();
        },
        async getAsyncCall () {
            const mockData = new MockDataApi();
            // component에서 처리할 경우.
            // const returnCafeData = await mockData.getCafeInfo({memberId: 'pretty'})
            //     .then(res => {
            //         console.log('first');
            //         return res.data;
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     });
            // const returnCharData = await mockData.getCharactorInfo({memberId: 'pretty'})
            //     .then(res => {
            //         console.log('second : ', returnCafeData);
            //         return res.data;
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     });
            // const returnCommentData = await mockData.getComment({memberId: 'pretty'})
            //     .then(res => {
            //         console.log('third : ', returnCharData);
            //         return res.data;
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     });
            // console.log('getAsyncCall : ', returnCafeData, returnCharData, returnCommentData);
            this.asyncData = await mockData.getLoginProcessMapper({memberId: 'pretty'});
            console.log('getAsyncCall : ', this.asyncData);
        },
        async getAsyncCallError () {
            const mockData = new MockDataApi();
            const returnCafeData = await ServiceUtil.asyncAwaitMapper(mockData.getCafeInfo, {memberId: 'pretty'}, {'content-type': 'text/json'});
            console.log('getAsyncCallError.returnCafeData : ', returnCafeData);
            const returnCharData = await ServiceUtil.asyncAwaitMapper(mockData.getErrorData, {memberId: 'pretty'});
            if (!returnCharData) {
                console.log('returnCharData data is null! : ', returnCharData);
            } else {
                const returnCommentData = await ServiceUtil.asyncAwaitMapper(mockData.getComment, {memberId: 'pretty'});
                console.log('getAsyncCallError.returnCommentData : ', returnCommentData);
            }
        }
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        const beanContainer = BeanContainer.getInstance();
        console.log('created => userInfo ', beanContainer.getBean('userInfo'));
        // addEventListener(ErrorEventType.SERVER_ERROR, this.showError);
        // addEventListener(BeanContainer.SET_BEAN + '_userInfo', this.userInfoChange);
        this.eventBind();
        const commandActionMap = CommandActionMap.getInstance();
        commandActionMap.addAction('testAction', this.bindService);
    },
    beforeMount () {
        console.log('beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('updated');
    },
    mounted () {
        console.log('mounted');
        // this.$nextTick(function () {
        // });
    },
    beforeDestroy () {
        // this.removeAllEvent();
        console.log('beforeDestroy');
    },
    destroyed () {
        console.log('destroyed');
        const commandActionMap = CommandActionMap.getInstance();
        commandActionMap.removeAction('testAction');
        // removeEventListener(ErrorEventType.SERVER_ERROR, this.showError);
        // removeEventListener(BeanContainer.SET_BEAN, this.userInfoChange);
    },
    errorCaptured (error, vm, info) {
        console.log('errorCaptured : ', error, vm, info);
        return false;
    }
};
</script>

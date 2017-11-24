<template>
    <div class="container">
        <h1 contenteditable="true">{{ messageObj.text }}</h1>
        <button @click="getData">
            get data
        </button>
        <button @click="setError">
            Error
        </button>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
        <modal v-if="showModal" title="Title" body="Content : Kenneth" @close="showModal = false">
            <h3 slot="header">Custom header</h3>
        </modal>
    </div>
</template>

<script>
import HttpCaller from '../common/service/Http';
import CustomModal from '../common/component/CustomModal';
import { MaintEventType, ErrorEventType } from '../common/EventConstant';

export default {
    name: 'ServiceCaller',
    data () {
        return {
            messageObj: {
                id: '01',
                text: 'Service Caller Example',
                author: 'kenneth'
            },
            log: [],
            showModal: false
        };
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
            this.log = event.detail.data;
        },
        showError (event) {
            this.showModal = true;
            console.log('showError : ', event);
        }
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        console.log('created');
        addEventListener(MaintEventType.MAIN_EVENT, this.bindService);
        addEventListener(ErrorEventType.SERVER_ERROR, this.showError);
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
        console.log('beforeDestroy');
    },
    destroyed () {
        console.log('destroyed');
        removeEventListener(MaintEventType.MAIN_EVENT, this.bindService);
        removeEventListener(ErrorEventType.SERVER_ERROR, this.showError);
    },
    errorCaptured (error, vm, info) {
        console.log('errorCaptured : ', error, vm, info);
        return false;
    }
};
</script>

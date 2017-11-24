<template>
    <div class="container">
        <h1 contenteditable="true">{{ messageObj.text }}</h1>
        <button @click="getData">
            get data
        </button
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
    </div>
</template>

<script>
import HttpCaller from '../common/service/Http';
import MainEvent from '../common/EventConstant';

export default {
    name: 'ServiceCaller',
    data () {
        return {
            messageObj: {
                id: '01',
                text: 'Service Caller Example',
                author: 'kenneth'
            },
            log: []
        };
    },
    methods: {
        getData () {
            HttpCaller.service('testAction', 'get', 'http://jsonplaceholder.typicode.com/posts', {});
        },
        bindService (event) {
            console.log('response : ', event);
            this.log = event.detail.data;
        }
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        console.log('created');
        addEventListener(MainEvent.MAIN_EVENT, this.bindService);
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
    },
    errorCaptured (error, vm, info) {
        console.log('errorCaptured : ', error, vm, info);
        return false;
    }
};
</script>

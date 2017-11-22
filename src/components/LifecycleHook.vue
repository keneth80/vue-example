<template>
    <div class="container text-center">
        <h1>LifeCycle Log:</h1>
        <button class="btn btn-default" @click="test">Update</button>
        <button class="btn btn-default" @click="reset">Reset</button>
        <errorbtn name="Error call"></errorbtn>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue';

Vue.component('errorbtn', {
    template: `<button class="btn btn-default" @click="vote">{{ name }}</button>`,
    props: ['name'],
    data: function () {
        return {
            votes: 0
        };
    },
    methods: {
        vote: function () {
            console.log('vote');
        }
    },
    render (h) {
        throw new Error('Component-3-Error');
    }
});

export default {
    name: 'LifeCycleHook',
    data () {
        return {
            log: []
        };
    },
    methods: {
        test: function () {
            // computed use properties modify
            this.logs.push('button click');
        },
        reset: function () {
            // computed use properties modify
            this.logs = [];
        }
    },
    computed: {
        logs: {
            get: function () {
                return this.log;
            },
            set: function (value) {
                this.log = value;
            }
        }
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        console.log('created');
        this.log.push('created');
    },
    beforeMount () {
        this.log.push('beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('updated', this.log);
    },
    mounted () {
        console.log('mounted');
        this.$nextTick(function () {
            this.log.push('mounted');
        });
    },
    beforeDestroy () {
        console.log('beforeDestroy');
        this.log.push('beforeDestroy');
    },
    destroyed () {
        console.log('destroyed');
        this.log.push('destroyed');
    },
    errorCaptured (error, vm, info) {
        console.log('errorCaptured : ', error, vm, info);
        return false;
    }
};
</script>

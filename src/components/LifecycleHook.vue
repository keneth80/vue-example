<template>
    <div class="container text-center">
        <img src="../assets/lifecycle.png" class="lifecycle">
        <h1 ref="title">{{title}}</h1>
        <button class="btn btn-default" @click="test">Update</button>
        <button class="btn btn-default" @click="reset">Reset</button>
        <errorbtn name="Error call"></errorbtn>
        <ul class="list-group" ref="list-container">
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
            title: 'LifeCycle Log:',
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
        console.log('beforeCreate => log', this.log);
    },
    created () {
        // mounted 되기전에는 하위 element가 vm에 바인딩 되지 않는다. this.$refs.title = undefined
        console.log('created => log', this.$refs.title, this.log);
        this.log.push('created');
    },
    beforeMount () {
        this.log.push('beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('updated', this.log);
    },
    mounted () {
        // 마운트가 되고 나서야 vm에 바인딩이 된다. this.$refs.title = <h1>LifeCycle Log:</h1>
        console.log('mounted', this.$refs.title);
        this.log.push('mounted');
        this.$nextTick(function () {
            this.log.push('mounted $nextTick');
            console.log('mounted $nextTick');
        });
    },
    render (h) {
        console.log('render', h);
    },
    beforeDestroy () {
        console.log('beforeDestroy', this.$refs);
        this.log.push('beforeDestroy');
    },
    destroyed () {
        console.log('destroyed', this);
        this.log.push('destroyed');
    },
    errorCaptured (error, vm, info) {
        console.log('errorCaptured : ', error, vm, info);
        return false;
    }
};
</script>
<style>
.lifecycle {
    width: 50%;
    float: left;
}
</style>

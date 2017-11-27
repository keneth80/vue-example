<template>
    <div class="container text-center">
        <h1>{{message}}</h1>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
    </div>
</template>
<script>
var lifecycleMeta = {
    methods: {
        creationComplete () {
            console.log('mixin target creationComplete');
        }
    },
    beforeCreate () {
        console.log('mixin target beforeCreate');
    },
    created () {
        console.log('mixin target created');
    },
    beforeMount () {
        console.log('mixin target beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('mixin target updated');
    },
    mounted () {
        console.log('mixin target mounted');
        this.$nextTick(function () {
            this.creationComplete();
            console.log('mixin target all creation');
        });
    },
    beforeDestroy () {
        console.log('mixin target beforeDestroy');
    },
    destroyed () {
        console.log('mixin target destroyed');
    },
    errorCaptured (error, vm, info) {
        console.log('mixin target errorCaptured : ', error, vm, info);
        return false;
    }
};

export default {
    name: 'Mixin',
    methods: {
        creationComplete () { // mixin target method : component lifecycle을 사용자 정의로 만들 수 있음.
            console.log('creationComplete');
        }
    },
    data () {
        return {
            log: [],
            message: 'Mixin Example'
        };
    },
    mixins: [lifecycleMeta],
    created () {
        this.log.push('created');
    },
    beforeMount () {
        this.log.push('beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('updated => ', this.log);
    },
    mounted () {
        this.$nextTick(function () {
            this.log.push('mounted');
        });
    },
    beforeDestroy () {
        this.log.push('beforeDestroy');
    },
    destroyed () {
        this.log.push('destroyed');
    },
    errorCaptured () {
        return false;
    }
};
</script>
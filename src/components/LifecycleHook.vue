<template>
    <div class="container text-center">
        <h1>LifeCycle Log:</h1>
        <button class="btn btn-default" @click="test">Update</button>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'LifeCycleHook',
    data () {
        return {
            log: []
        };
    },
    methods: {
        test: function () {
            this.log.push('button click');
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
    updated () { // when data update
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
    }
};
</script>

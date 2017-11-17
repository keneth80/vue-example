<template>
    <div class="container text-center">
        <h1>LifeCycle Log:</h1>
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
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        this.log.push('created');
    },
    beforeMount () {
        this.log.push('beforeMount');
    },
    mounted () {
        this.log.push('mounted');
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

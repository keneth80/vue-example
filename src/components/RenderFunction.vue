<template>
    <div>
        <h1>{{ message }}</h1>
        <some-component :show="show"></some-component>
        <button @click="setTrue">
            {{show? 'Hide': 'Show'}}
        </button>
    </div>
</template>

<script>
import Vue from 'vue';

Vue.component('some-component', {
    destroyed () {
        console.log('some-component => destroyed');
    },
    watch: {
        show (n, o) { console.log('some-component watch => ', n, o); }
    },
    props: ['show'],
    render (createElement) {
        if (this.show) {
            console.log('some render');
            return createElement('div', { domProps: { innerHTML: 'test' }, on: { click: this.quit } });
        } else {
            return null;
        }
    },
    methods: {
        quit () {
            // mount 해제.
            this.$destroy();
        }
    }
});
export default {
    name: 'RenderFunction',
    data () {
        return {
            message: 'Render Function',
            show: false
        };
    },
    methods: {
        setTrue () { this.show = !this.show; }
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        console.log('created');
    },
    beforeMount () {
        console.log('beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('updated');
    },
    mounted () {
        console.log('mounted');
        this.$nextTick(function () {
            console.log('all creation mounted');
        });
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

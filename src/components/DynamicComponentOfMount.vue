<template>
    <div class="container text-center">
        <h1>Dynamic Component ($mount)</h1>
        <button class="btn btn-default" @click="addComponent">Add</button>
        <ul class="list-group" ref="list-container">
        </ul>
    </div>
</template>
<script>
import Vue from 'vue';

const childComp = {
    template: `
        <li class="list-group-item"> {{ displayContent }} <button @click="del">Del</button> </li>
        `,
    props: {
        selector: null,
        id: {
            type: Number,
            default: function () { return 0; }
        },
        name: {
            type: String,
            default: function () { return 'none'; }
        }
    },
    computed: {
        displayContent () {
            return this.name + '(' + this.id + ')';
        }
    },
    methods: {
        del () {
            this.$destroy();
            this.$el.remove();
        }
    },
    beforeCreate () {
        console.log('child component beforeCreate');
    },
    created () {
        console.log('child component created');
        this.$mount();
        if (this.$parent && this.selector) {
            this.$parent.$refs[this.selector].appendChild(this.$el);
        }
    },
    beforeMount () {
        console.log('child component beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('child component updated');
    },
    mounted () {
        console.log('child component mounted');
    },
    beforeDestroy () {
        console.log('child component beforeDestroy');
    },
    destroyed () {
        console.log('child component destroyed');
    }
};

export default {
    name: 'DynamicComponentOfMount',
    data () {
        return {
            addcnt: 0
        };
    },
    methods: {
        addComponent () {
            this.addcnt++;
            // dynamic add 시 반드시 parent 설정을 해줘야함.
            childComp.parent = this;
            childComp.propsData = {
                selector: 'list-container', // selector는 ref로 선언된 string value : 객체 참조를 하기 위함.
                id: this.addcnt,
                name: 'kenneth_' + this.addcnt
            };
            const comp = new Vue(childComp);
            console.log('new component => ', comp);
        }
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
    },
    beforeDestroy () {
        console.log('beforeDestroy');
    }
};
</script>

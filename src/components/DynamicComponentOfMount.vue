<template>
    <div class="container text-center">
        <h1>Dynamic Component ($mount)</h1>
        <button class="btn btn-default" @click="addComponent">Add</button>
        <span>click count : {{clickCnt}}</span>
        <span>current id : {{currentId}}</span>
        <ul class="list-group" ref="list-container">
        </ul>
    </div>
</template>
<script>
import Vue from 'vue';
import CommandActionMap from '../common/event/CommandActionMap';
import { MaintEventType, EtcEventType } from '../common/EventConstant';

const childComp = {
    template: `
        <li class="list-group-item" @click="sendData"> {{ displayContent }} <button @click="del">Del</button> </li>
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
    data () {
        return {
            commandActionMap: null
        };
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
        },
        sendData () {
            const event = {
                action: EtcEventType.CHILD_CLICK,
                data: {
                    id: this.id,
                    name: this.name
                }
            };
            this.commandActionMap = CommandActionMap.getInstance();
            this.$emit(EtcEventType.CHILD_CLICK, event);
            console.log('sendData : ', MaintEventType.MAIN_EVENT, this.commandActionMap);
            dispatchEvent(new CustomEvent(MaintEventType.MAIN_EVENT, {detail: event}));
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
            addcnt: 0,
            clickCnt: 0,
            currentId: 0,
            commandActionMap: null
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
            const comp = new Vue(childComp).$on(EtcEventType.CHILD_CLICK, this.childClick2);
            console.log('new component => ', comp);
        },
        childClick (event) {
            this.clickCnt++;
            this.currentId = event.data.id;
            console.log('child click => ', event, this);
        },
        childClick2 (event) {
            this.clickCnt++;
            this.currentId = event.data.id;
            console.log('child click2 => ', event, this);
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
        this.commandActionMap = CommandActionMap.getInstance();
        this.commandActionMap.addAction(EtcEventType.CHILD_CLICK, this.childClick);
        console.log('commandActionMap : ', this.commandActionMap);
    },
    beforeDestroy () {
        this.commandActionMap.removeAction('childClick');
        console.log('beforeDestroy');
    }
};
</script>

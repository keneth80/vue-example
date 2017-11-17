import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import PropsType from '@/components/PropsType';
import Coins from '@/components/Coins';
import ListRendering from '@/components/ListRendering';
import FormControl from '@/components/FormControl';
import ListFiltering from '@/components/ListFiltering';
import EventHandling from '@/components/EventHandling';
import ParentChildEventHandling from '@/components/ParentChildEventHandling';
import LifeCycleHook from '@/components/LifeCycleHook';
import ParentChildTwowayBinding from '@/components/ParentChildTwowayBinding';
import ElementFind from '@/components/ElementFind';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/props-type',
            name: 'PropsType',
            component: PropsType,
            props: {
                author: 'John',
                age: 38
            }
        },
        {
            path: '/coins/:id',
            name: 'Coins',
            component: Coins
        },
        {
            path: '/list-rendering',
            name: 'ListRendering',
            component: ListRendering
        },
        {
            path: '/form-control',
            name: 'FormControl',
            component: FormControl
        },
        {
            path: '/list-filtering',
            name: 'ListFiltering',
            component: ListFiltering
        },
        {
            path: '/event-handling',
            name: 'EventHandling',
            component: EventHandling
        },
        {
            path: '/parent-child-event-handling',
            name: 'ParentChildEventHandling',
            component: ParentChildEventHandling
        },
        {
            path: '/lifecycle-hook',
            name: 'LifeCycleHook',
            component: LifeCycleHook
        },
        {
            path: '/parent-child-twoway-binding',
            name: 'ParentChildTwowayBinding',
            component: ParentChildTwowayBinding
        },
        {
            path: '/element-find',
            name: 'ElementFind',
            component: ElementFind
        }
    ]
});

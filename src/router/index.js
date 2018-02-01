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
import StyleBind from '@/components/StyleBind';
import RenderFunction from '@/components/RenderFunction';
import CustomRenderFunction from '@/components/CustomRenderFunction';
import Watcher from '@/components/Watcher';
import Mixin from '@/components/Mixin';
import ScopedSlots from '@/components/ScopedSlots';
import ServiceCaller from '@/components/ServiceCaller';
import MockingHttpRequest from '@/components/MockingHttpRequest';
import DynamicComponentOfMount from '@/components/DynamicComponentOfMount';
import Filters from '@/components/Filters';
import AsyncComponent from '@/components/AsyncComponent';
import TransitionComponent from '@/components/Transition';
import VirturalScroll from '@/components/VirturalScroll';
import VuexBestExample from '@/components/VuexBestExample';
import VueSetMethod from '@/components/VueSetMethod';
import VueExtends from '@/components/VueExtends';
import ProvideInject from '@/components/ProvideInject';
import TodoMVC from '@/components/TodoMVC';

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
        },
        {
            path: '/style-bind',
            name: 'StyleBind',
            component: StyleBind
        },
        {
            path: '/render-function',
            name: 'RenderFunction',
            component: RenderFunction
        },
        {
            path: '/custom-render-function',
            name: 'CustomRenderFunction',
            component: CustomRenderFunction
        },
        {
            path: '/watcher',
            name: 'Watcher',
            component: Watcher
        },
        {
            path: '/mixin',
            name: 'Mixin',
            component: Mixin
        },
        {
            path: '/scoped-slots',
            name: 'ScopedSlots',
            component: ScopedSlots
        },
        {
            path: '/service-caller',
            name: 'ServiceCaller',
            component: ServiceCaller
        },
        {
            path: '/mock-service',
            name: 'MockingHttpRequest',
            component: MockingHttpRequest
        },
        {
            path: '/dynamic-component-mount',
            name: 'DynamicComponentOfMount',
            component: DynamicComponentOfMount
        },
        {
            path: '/filters',
            name: 'Filters',
            component: Filters
        },
        {
            path: '/async-component',
            name: 'AsyncComponent',
            component: AsyncComponent
        },
        {
            path: '/transition-example',
            name: 'TransitionComponent',
            component: TransitionComponent
        },
        {
            path: '/virtural-scroll',
            name: 'VirturalScroll',
            component: VirturalScroll
        },
        {
            path: '/vuex-example',
            name: 'VuexBestExample',
            component: VuexBestExample
        },
        {
            path: '/vue-set',
            name: 'VueSetMethod',
            component: VueSetMethod
        },
        {
            path: '/vue-extends',
            name: 'VueExtends',
            component: VueExtends
        },
        {
            path: '/provide-inject',
            name: 'ProvideInject',
            component: ProvideInject
        },
        {
            path: '/vuex-todomvc',
            name: 'TodoMVC',
            component: TodoMVC
        }
    ]
});

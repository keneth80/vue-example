<template>
    <div class='container'>
        <h1>Async Component example</h1>
        <hr>
        <button @click="show = true">Load async component</button>
        <div v-if="show">
            <Async/>
        </div>
        <loading-component v-if="loading"></loading-component>
        <async-factory-component></async-factory-component>
    </div>
</template>

<script>
import Vue from 'vue';
import LoadingComponent from '../common/component/async/LoadingComponent';
import ErrorComponent from '../common/component/async/ErrorComponent';

Vue.component('Async', function (resolve) {
    console.log('Loading...');
    require(['../common/component/async/Async'], resolve);
});

let vm;

const AsyncFactoryComponent = () => ({
    // 로드하는 컴포넌트입니다. 반드시 Promise이어야합니다.
    component: import('../common/component/async/AsyncFactory.vue'),
    // 비동기 컴포넌트가 로드되는 동안 사용할 컴포넌트
    loading: LoadingComponent,
    // 실패했을 경우 사용하는 컴포넌트
    error: ErrorComponent,
    // 로딩 컴포넌트를 보여주기전 지연하는 정도. 기본값: 200ms.
    delay: 3000
    // 시간이 초과되면 에러용 컴포넌트가 표시됩니다
    // 기본값: Infinity.
    // timeout: 3000
});

export default {
    name: 'AsyncComponent',
    data () {
        return {
            tempObj: {
                id: 'ID897',
                label: 'TextItem'
            },
            show: false,
            loading: true
        };
    },
    components: {
        LoadingComponent,
        'AsyncFactoryComponent': (resolve) => {
            vm.loading = true;
            require(['../common/component/async/AsyncFactory.vue'], (component) => {
                vm.loading = false;
                resolve(component);
            });
        }
    },
    created () {
        vm = this;
    }
};
</script>


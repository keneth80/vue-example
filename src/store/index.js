import Vue from 'vue';
import Vuex from 'vuex';
import VuexPromiseMiddleware from 'vuex-promise-middleware';

import counter from './modules/counter';

Vue.use(Vuex);
const plugins = [VuexPromiseMiddleware];

const store = new Vuex.Store({
    plugins,
    modules: {
        counter
    }
});

export default store;

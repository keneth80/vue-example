<template>
    <div class="container">
        <h1 contenteditable="true">{{ messageObj.text }}</h1>
        <button @click="getData('/quotes', 'get')">
            get /quotes
        </button>
        <button @click="getData('/quotes', 'post')">
            post /quotes
        </button>
        <button @click="getData('/quotes/18', 'get')">
            get /quotes/18
        </button>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const routes = [
    {
        method: 'GET',
        url: '/quotes',
        response: [
            {id: 14, body: "You know what the chain of command is? It's the chain I go get and beat you with until you understand who's in ruttin charge here."},
            {id: 22, body: 'Also? I can kill you with my brain.'}
        ]
    },
    {
        method: 'POST',
        url: '/quotes',
        response: [{id: 23, body: 'Terse? I can be terse. Once, in flight school, I was laconic.'}]
    },
    {
        method: 'GET',
        url: '/quotes/18',
        response: [{id: 18, body: 'Curse your sudden but inevitable betrayal!'}]
    }
];

function setupInterceptor () {
    Vue.http.interceptors.unshift((request, next) => {
        let route = routes.find((item) => {
            return (request.method === item.method && request.url === item.url);
        });
        if (!route) {
            // we're just going to return a 404 here, since we don't want our test suite making a real HTTP request
            next(request.respondWith({status: 404, statusText: 'This api Not found!'}));
        } else {
            next(
                request.respondWith(
                    route.response,
                    {status: 200}
                )
            );
        }
    });
}

setupInterceptor();

export default {
    name: 'MockingHttpRequest',
    data () {
        return {
            messageObj: {
                id: '01',
                text: 'Mock Service Example',
                author: 'kenneth'
            },
            log: []
        };
    },
    methods: {
        getData (url, method) {
            this.$http[method](url).then(res => {
                console.log('response => ', res);
                this.log = res.data;
            }, response => {
                // error callback
                console.log('Error => ', response);
            });
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

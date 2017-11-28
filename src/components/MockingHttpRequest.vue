<template>
    <div class="container">
        <h1 contenteditable="true">{{ messageObj.text }}</h1>
        <button @click="getData('/quotes', 'get')">
            get /quotes
        </button>
        <button @click="getData('/quotes', 'post')">
            post /quotes
        </button>
        <button @click="getData('/quotes/${memberId}', 'get', {memberId: 18})">
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

function Prop (obj, is, value) {
    if (typeof is === 'string') {
        is = is.split('.');
    }
    if (is.length === 1 && value !== undefined) {
        obj[is[0]] = value;
        return obj;
    } else if (is.length === 0) {
        return obj;
    } else {
        var prop = is.shift();
        // Forge a path of nested objects if there is a value to set
        if (value !== undefined && obj[prop] === undefined) {
            obj[prop] = {};
        }
        return Prop(obj[prop], is, value);
    }
}

function render (str, obj) {
    return str.replace(/\$\{(.+?)\}/g, (match, p1) => { return Prop(obj, p1); });
}

function templateMaker (literal, params) {
    return Function(params, 'return `' + literal + '`;');
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
        getData (url, method, params = {}) {
            const queryString = render(url, params);
            var template = templateMaker('/quotes/${data.memberId}', 'data');
            const queryString2 = template({
                memberId: 18
            });
            console.log('getData => ', queryString, queryString2);
            this.$http[method](queryString).then(res => {
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
        var template = templateMaker('Hello, my name is ${data.name}', 'data');
        var result = template({
            name: 'kenneth'
        });
        console.log('template string : ', result);
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

<template>
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo"
                   autofocus autocomplete="off"
                   placeholder="What needs to be done?"
                   :value="newTodo"
                   @change="setNewTodo"
                   @keyup.enter="addTodo"
            >
        </header>
        <section class="main" v-show="todos.length" v-cloak>
            <ul class="todo-list">
                <li v-for="todo in todos"
                    class="todo"
                    :key="todo.id"
                    :class="{ completed: todo.completed }">
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="todo.completed">
                        <label>{{ todo.title }}</label>
                        <button class="destroy" @click="removeTodo(todo)"></button>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPromiseMiddleware from 'vuex-promise-middleware';
import MockService from '../common/service/MockService';
import todo from '../store/modules/todo';

Vue.use(Vuex);
// https://www.npmjs.com/package/vuex-promise-middleware
const plugins = [VuexPromiseMiddleware];

// function randomId () {
//     return Math.random()
//         .toString()
//         .substr(2, 10);
// }

const store = new Vuex.Store({
    plugins,
    // module 로 정의
    modules: {
        todo
    }
    // 단일 store 정의
    // state: {
    //     loading: true,
    //     todos: [],
    //     newTodo: ''
    // },
    // getters: {
    //     newTodo: state => state.newTodo,
    //     todos: state => state.todos
    // },
    // mutations: {
    //     SET_LOADING (state, flag) {
    //         state.loading = flag;
    //     },
    //     SET_TODOS (state, todos) {
    //         state.todos = todos;
    //     },
    //     SET_NEW_TODO (state, todo) {
    //         state.newTodo = todo;
    //     },
    //     ADD_TODO (state, todoObject) {
    //         console.log('add todo', todoObject);
    //         state.todos.push(todoObject);
    //     },
    //     REMOVE_TODO (state, todo) {
    //         const todos = state.todos;
    //         todos.splice(todos.indexOf(todo), 1);
    //     },
    //     CLEAR_NEW_TODO (state) {
    //         state.newTodo = '';
    //         console.log('clearing new todo');
    //     }
    // },
    // actions: {
    //     loadTodos ({ commit }) {
    //         commit('SET_LOADING', true);
    //         axios
    //             .get('/todos')
    //             .then(r => r.data)
    //             .then(todos => {
    //                 commit('SET_TODOS', todos);
    //                 commit('SET_LOADING', false);
    //             });
    //     },
    //     setNewTodo ({ commit }, todo) {
    //         commit('SET_NEW_TODO', todo);
    //     },
    //     addTodo ({ commit, state }) {
    //         if (!state.newTodo) {
    //             // do not add empty todos
    //             return;
    //         }
    //         const todo = {
    //             title: state.newTodo,
    //             completed: false,
    //             id: randomId()
    //         };
    //         axios.post('/todos', todo).then(_ => {
    //             commit('ADD_TODO', todo);
    //         });
    //     },
    //     removeTodo ({ commit }, todo) {
    //         axios.delete('/todos', {id: todo.id}).then(_ => {
    //             console.log('removed todo', todo.id, 'from the server : ', _);
    //             commit('REMOVE_TODO', todo);
    //         });
    //     },
    //     clearNewTodo ({ commit }) {
    //         commit('CLEAR_NEW_TODO');
    //     }
    // }
});

// app Vue instance
export default {
    name: 'TodoMVC',
    store,
    data () {
        return {
            file: null
        };
    },
    created () {
        const mockSvc = new MockService();
        mockSvc.setTodoApi();
        this.$store.dispatch('loadTodos');
    },
    computed: {
        newTodo () {
            return this.$store.getters.newTodo;
        },
        todos () {
            return this.$store.getters.todos;
        }
    },
    methods: {
        setNewTodo (e) {
            this.$store.dispatch('setNewTodo', e.target.value);
        },
        addTodo (e) {
            e.target.value = '';
            this.$store.dispatch('addTodo');
            this.$store.dispatch('clearNewTodo');
        },
        removeTodo (todo) {
            this.$store.dispatch('removeTodo', todo);
        }
    }
};
</script>

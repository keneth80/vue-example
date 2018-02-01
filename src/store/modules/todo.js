import axios from 'axios';
import { SET_LOADING, SET_TODOS, SET_NEW_TODO, ADD_TODO, REMOVE_TODO, CLEAR_NEW_TODO } from '../mutation-types';

function randomId () {
    return Math.random()
        .toString()
        .substr(2, 10);
}

const state = {
    loading: true,
    todos: [],
    newTodo: ''
};

// store public variable
const getters = {
    newTodo: state => state.newTodo,
    todos: state => state.todos
};

// store data apply
const mutations = {
    [SET_LOADING] (state, flag) {
        state.loading = flag;
    },
    [SET_TODOS] (state, todos) {
        state.todos = todos;
    },
    [SET_NEW_TODO] (state, todo) {
        state.newTodo = todo;
    },
    [ADD_TODO] (state, todoObject) {
        console.log('add todo', todoObject);
        state.todos.push(todoObject);
    },
    [REMOVE_TODO] (state, todo) {
        const todos = state.todos;
        todos.splice(todos.indexOf(todo), 1);
    },
    [CLEAR_NEW_TODO] (state) {
        state.newTodo = '';
        console.log('clearing new todo');
    }
};

// store action apply => ex) dispatch('addTodo')
const actions = {
    loadTodos ({ commit }) {
        commit(SET_LOADING, true);
        axios
            .get('/todos')
            .then(r => r.data)
            .then(todos => {
                commit(SET_TODOS, todos);
                commit(SET_LOADING, false);
            });
    },
    setNewTodo ({ commit }, todo) {
        commit(SET_NEW_TODO, todo);
    },
    addTodo ({ commit, state }) {
        if (!state.newTodo) {
            // do not add empty todos
            return;
        }
        const todo = {
            title: state.newTodo,
            completed: false,
            id: randomId()
        };
        axios.post('/todos', todo).then(_ => {
            commit(ADD_TODO, todo);
        });
    },
    removeTodo ({ commit }, todo) {
        axios.delete('/todos', {id: todo.id}).then(_ => {
            console.log('removed todo', todo.id, 'from the server : ', _);
            commit(REMOVE_TODO, todo);
        });
    },
    clearNewTodo ({ commit }) {
        commit(CLEAR_NEW_TODO);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

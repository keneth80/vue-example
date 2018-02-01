const state = {
    count: 0
};

const getters = {
    count: function (state) {
        if (state.count < 0) {
            state.count = 0;
            return state.count;
        }
        return state.count;
    }
};

const mutations = {
    increment (state, payload) {
        const returnValue = state.count = state.count + payload.amount;
        return returnValue;
    },
    decrement (state, payload) {
        const returnValue = state.count = state.count - payload.amount;
        return returnValue;
    }
};

const actions = {
    // increment (context, payload) {
    //     context.commit('increment', payload);
    // },
    // decrement (context, payload) {
    //     context.commit('decrement', payload);
    // }
    increment ({commit}, payload) {
        commit('increment', payload);
    },
    decrement ({commit}, payload) {
        commit('decrement', payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};

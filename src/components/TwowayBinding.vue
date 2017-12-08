<template>
    <div class="container text-center">
        <p style="font-size: 140px;">
            {{ votes.count }}
        </p>
        <button class="btn btn-danger" @click="reset">Reset votes</button>
        <div class="row">
            <food @voted="countVote" name="Cheeseburger" v-model="twoway"></food>
            <food @voted="countVote" name="Double Bacon Burger"></food>
            <food @voted="countVote" name="Rodeo Burger"></food>
        </div>
        <h1>Log:</h1>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in votes.log" :key="index"> {{ item }} </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue';

var bus = new Vue();

Vue.component('food', {
    template: `
        <div class="text-center col-lg-4">
            <p style="font-size: 40px;">
                {{ votes }}
            </p>
            <button class="btn btn-default" @click="vote">{{ name }} ({{twoway}})</button>
        </div>`,
    props: ['name'],
    data: function () {
        return {
            votes: 0,
            twoway: 0
        };
    },
    methods: {
        vote: function () {
            var food = event.srcElement.textContent;
            this.votes++;
            bus.$emit('voted', food);
        },
        reset: function () {
            this.votes = 0;
        }
    },
    created () {
        bus.$on('reset', this.reset);
    }
});
export default {
    name: 'ParentChildEventHandling',
    data () {
        return {
            twoway: 0,
            votes: {
                count: 0,
                log: []
            }
        };
    },
    methods:
    {
        countVote: function (food) {
            this.votes.count++;
            this.votes.log.push(food + ' received a vote.');
        },
        reset: function () {
            this.votes = {
                count: 0,
                log: []
            };
            bus.$emit('reset');
        }
    },
    created () {
        bus.$on('voted', this.countVote);
    }
};
</script>

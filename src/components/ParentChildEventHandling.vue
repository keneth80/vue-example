<template>
    <div class="container text-center">
        <p style="font-size: 140px;">
            {{ votes.count }}
        </p>
        <button class="btn btn-danger" @click="reset">Reset votes</button>
        <p style="font-size: 40px;">
            Two way data {{ twoway }}
        </p>
        <button @click="changeName">
            Food item name Change
        </button>
        <div class="row">
            <food @voted="countVote" :name="cheeseburger" v-model="twoway"></food>
            <food @voted="countVote" name="Double Bacon Burger" v-model="twoway"></food>
            <food @voted="countVote" name="Rodeo Burger" v-model="twoway"></food>
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
    watch: {
        name: {
            handler: function (newvalue, oldevalue) {
                console.log('food component name change : ', newvalue, oldevalue);
            }
        }
    },
    data: function () {
        return {
            votes: 0,
            twoway: 0
        };
    },
    methods: {
        vote: function () {
            var vm = this;
            var food = event.srcElement.textContent;
            this.votes++;
            this.twoway++;
            vm.$emit('input', this.twoway);
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
            },
            cheeseburger: 'Cheeseburger'
        };
    },
    watch: {
        twoway: {
            handler: function (newvalue, oldvalue) {
                console.log('twoway : ', newvalue, oldvalue);
            }
        }
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
        },
        changeName: function () {
            this.cheeseburger = 'Change cheeseburger';
        }
    },
    created () {
        bus.$on('voted', this.countVote);
    }
};
</script>

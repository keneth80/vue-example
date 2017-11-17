<template>
    <div class="container text-center">
        <div class="box" v-bind:class="{ 'red' : color, 'blue' : !color }"></div>
        <div class="box" v-bind:class="{ 'purple' : color, 'green' : !color }"></div>
        <div class="box" v-bind:class="{ 'red' : color, 'blue' : !color }"></div>
        <div class="box" v-bind:class="{ 'purple' : color, 'green' : !color }"></div>
        <button v-on:click="flipColor" class="btn btn-block btn-success">
            Flip color!
        </button>
        <styleitem></styleitem>
    </div>
</template>
<script>
import Vue from 'vue';

Vue.component('styleitem', {
    template: `
        <div class="container-fluid">
            <ul>
                <li :class="{'completed' : task.done}"
                    :style="styleObject"
                    v-for="task in tasks">
                    {{task.body}}
                    <button @click="completeTask(task)" class="btn">
                        Just do it!
                    </button>
                </li>
            </ul>
        </div>`,
    data: function () {
        return {
            tasks: [
                {body: 'Feed the horses', done: true},
                {body: 'Wash armor', done: true},
                {body: 'Sharp sword', done: false}
            ],
            styleObject: {
                fontSize: '25px'
            }
        };
    },
    methods: {
        completeTask: function (task) {
            task.done = !task.done;
        }
    }
});
export default {
    name: 'StyleBind',
    data () {
        return {
            color: true
        };
    },
    methods: {
        flipColor: function () {
            this.color = !this.color;
        }
    }
};
</script>
<style type="text/css">
    .red {
        background: #ff0000;
    }
    .blue {
        background: #0000ff;
    }
    .box {
        float: left;
        width: 200px;
        height: 200px;
        margin: 40px;
        border: 1px solid rgba(0, 0, 0, .2);
    }
    .purple {
        background: #7B1FA2;
    }
    .green {
        background: #4CAF50;
    }
    .completed {
        text-decoration: line-through;
    }
</style>
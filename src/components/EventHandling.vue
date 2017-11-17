<template>
    <div class="container text-center">
        <p style="font-size: 140px;">
            {{ votes }}
        </p>
        <button class="btn btn-primary" @click="vote">Vote</button>
    </div>
</template>
<script>
import Vue from 'vue';

var EventBus = new Vue();

export default {
    name: 'EventHandling',
    data () {
        return {
            votes: 0
        };
    },
    methods: {
        vote: function (writer) {
            EventBus.$emit('voted');
        }
    },
    created () {
        var that = this;
        EventBus.$on('voted', function (button) {
            that.votes++;
            console.log('recive voted : ', that);
        });
    }
};
</script>

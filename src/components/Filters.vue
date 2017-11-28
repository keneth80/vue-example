<template>
    <div class="container text-center">
        <h1>Filters</h1>
        <div >
            Local filter :
            <span> {{ id | Upper }} </span>
        </div>
        <div >
            Global filter :
            <span> {{ won | toUSD }} </span>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';

// Global Filter
Vue.filter('toUSD', function (value) {
    return `$${value}`;
});

export default {
    name: 'Filters',
    data () {
        return {
            id: 'kenneth',
            won: 568900
        };
    },
    filters: { // local filters
        Upper (value) {
            return value.toUpperCase();
        },
        Lower (value) {
            return value.toLowerCase();
        }
    }
};
</script>

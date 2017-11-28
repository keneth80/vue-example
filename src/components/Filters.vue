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
            <br/>
            <span>{{ text | readMore(10, '...') }}</span>
        </div>
    </div>
</template>
<script>
// 참조 url = https://012.vuejs.org/guide/custom-filter.html#Two-way_Filters
import Vue from 'vue';

// Global Filter
Vue.filter('toUSD', function (value) {
    return `$${value}`;
});

Vue.filter('readMore', function (text, length, suffix) {
    return text.substring(0, length) + suffix;
});

export default {
    name: 'Filters',
    data () {
        return {
            id: 'kenneth',
            won: 568900,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non ab modi repellendus labore facere, fugiat ipsam quae accusantium commodi voluptas nesciunt dolor similique ipsum accusamus earum eligendi suscipit laborum quod.'
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

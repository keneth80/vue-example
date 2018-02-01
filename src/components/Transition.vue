<template>
    <div class='container top' :class="{'scroll': show}">
        <button v-on:click="show = !show">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <h3>Space</h3>
        <button v-on:click="scrollTop">
            Scroll Top
        </button>
    </div>
</template>
<script>
import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo, {
    container: 'body',
    duration: 100,
    easing: 'ease',
    offset: 0,
    cancelable: true,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
});

export default {
    name: 'TransitionComponent',
    data () {
        return {
            show: false
        };
    },
    methods: {
        scrollTop () {
            const options = {
                container: 'body',
                easing: 'ease-in',
                offset: 0,
                cancelable: true,
                onDone: function () {
                    // scrolling is done
                },
                onCancel: function () {
                    // scrolling has been interrupted
                },
                x: false,
                y: true
            };
            this.$scrollTo('body', 200, options);
            // const body = new Vue({
            //     el: '.container'
            // });
            // this.$el.style.transform = 'translateY( 0px )';
            const transition = 'transition: all .5s ease-in';
            document.body.style = transition;
            document.body.scrollTop = 0;
            console.log('el : ', document.body, document.body.scrollTop, this.$el.scrollHeight);
            // this.$el.style.transition = transition;
            // this.$el.scrollTop = 0;
            // body.$el.style.transition = transition;
            // body.$el.scrollTop = 0;
            // window.scrollTo(0, 0);
        }
    }
};
</script>
<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
body {
    transition: all .4s ease;
}
/*
.top {
    transition: all .3s ease;
}
.container.top.scroll {
    -webkit-transform: translateY( 0px);
    transform: translateY( 0px );
}
a[ id= "servicios" ]:target ~ #main article.panel {
    -webkit-transform: translateY( 0px);
    transform: translateY( 0px );
}
*/
</style>

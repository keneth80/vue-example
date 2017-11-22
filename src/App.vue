<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-link :to="{ name: 'HelloWorld' }">Home (HelloWorld)</router-link>
        <router-link to="/props-type">Props Default Type</router-link>
        <router-link to="/list-rendering">List Rendering</router-link>
        <router-link to="/list-filtering">List Filtering</router-link>
        <router-link to="/event-handling">Event Handling</router-link>
        <router-link to="/parent-child-event-handling">Parent Child Event Handling</router-link>
        <router-link to="/parent-child-twoway-binding">Parent Child Twoway Binding</router-link>
        <router-link to="/element-find">Element Find</router-link>
        <router-link to="/style-bind">Style Bind</router-link>
        <router-link to="/lifecycle-hook">LifeCycle Hook</router-link>
        <router-link to="/render-function">Render Function</router-link>
        <router-link to="/custom-render-function">Custom Render Function</router-link>
        <router-link to="/instance-method-data">Instance Method / Data</router-link>
        <router-link to="/form-control">Form Control</router-link>
        <router-link to="/coins/ethereum">Dynamic path routes - Ethereum</router-link>
        <router-link to="/coins/bitcoin">Dynamic path routes - Bitcoin</router-link>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

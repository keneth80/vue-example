<template>
    <div class="container">
        <h1>Vuex Example</h1>
        {{count}}
        <Counter></Counter>
        <br />
        <div class="columns">
            <div class="column is-11">
                <AddCounter></AddCounter>
            </div>
            <div class="column auto">
                <RemoveCounter></RemoveCounter>
            </div>
        </div>
    </div>
</template>
<script>
import Counter from '../common/component/vuex/Counter.vue';
import AddCounter from '../common/component/vuex/AddCounter.vue';
import RemoveCounter from '../common/component/vuex/RemoveCounter.vue';
import {mapGetters} from 'vuex';

export default {
    name: 'VuexBestExample',
    components: {
        Counter,
        AddCounter,
        RemoveCounter
    },
    computed: {
        ...mapGetters(['count'])
    }
};
</script>
<style>

</style>

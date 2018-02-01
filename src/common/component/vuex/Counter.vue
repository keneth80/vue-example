<template>
    <div class="notification">
        <h1 class="title" align="center">
            {{ count }}
        </h1>
    </div>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState({
            // mapGatter로 가져올 경우에는 counter의 state만 가져온다.
            count: function (state) {
                if (state.counter.count < 0) {
                    state.counter.count = 0;
                    return state.counter.count;
                }
                return state.counter.count;
            }
        })
    };
</script>

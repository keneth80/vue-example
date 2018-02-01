<template>
    <div class="container text-center">
        <h1>{{message}}</h1>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
    </div>
</template>
<script>
    import { MEMBER_TYPE } from '../common/EventConstant';

    const lifecycleMeta = {
        methods: {
            creationComplete () {
                console.log('super target creationComplete');
            }
        },
        data () {
            return {
                parentObj: {
                    id: 'pretty',
                    name: 'kenneth'
                }
            };
        },
        beforeCreate () {
            console.log('super target beforeCreate');
        },
        created () {
            console.log('super target created');
        },
        beforeMount () {
            console.log('super target beforeMount');
        },
        updated () { // when view data update ( re rendering )
            console.log('super target updated');
        },
        mounted () {
            console.log('super target mounted');
            this.$nextTick(function () {
                this.creationComplete();
                console.log('super target all creation');
            });
        },
        beforeDestroy () {
            console.log('super target beforeDestroy');
        },
        destroyed () {
            console.log('super target destroyed');
        },
        errorCaptured (error, vm, info) {
            console.log('super target errorCaptured : ', error, vm, info);
            return false;
        }
    };

    export default {
        name: 'VueExtends',
        methods: {
            creationComplete () { // override
                console.log('creationComplete');
            }
        },
        data () {
            return {
                log: [],
                message: 'Extends Example',
                memberObj: {
                    memberId: 'Tiger',
                    memberName: 'John'
                }
            };
        },
        extends: lifecycleMeta,
        created () {
            this.log.push('created');
        },
        beforeMount () {
            this.log.push('beforeMount');
        },
        updated () { // when view data update ( re rendering )
            console.log('updated => ', this.log);
        },
        mounted () {
            this.$nextTick(function () {
                this.log.push('mounted', this.memberObj[MEMBER_TYPE.memberId]);
            });
        },
        beforeDestroy () {
            this.log.push('beforeDestroy');
        },
        destroyed () {
            this.log.push('destroyed');
        },
        errorCaptured () {
            return false;
        }
    };
</script>

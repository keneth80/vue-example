<template>
    <div class="container">
        <h1 contenteditable="true">{{ messageObj.text }}</h1>
        <button @click="setDeep">
            IsDeep {{isDeep}}
        </button>
        <button @click="setValue">
            text prop Update
        </button>
        <button @click="setObject">
            Object Update
        </button>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
        <span>computed: {{textResult}}</span>
    </div>
</template>

<script>

export default {
    name: 'InstanceMethodData',
    data () {
        return {
            messageObj: {
                id: '01',
                text: 'Watch Example',
                author: 'kenneth'
            },
            watcher: null,
            isDeep: true,
            log: [],
            clickCnt: {
                type: Number
            }
        };
    },
    watch: {
        isDeep (newvalue, oldvalue) {
            console.log('isDeep watch : ', newvalue, oldvalue);
            this.watcher();
            this.addWatch();
        }
    },
    computed: {
        textResult: function () {
            return this.log.toString();
        }
    },
    methods: {
        setDeep () {
            this.isDeep = !this.isDeep;
        },
        setValue () {
            this.messageObj.text = this.messageObj.text + '1';
            console.log('setValue : ', this.messageObj);
        },
        addWatch () {
            this.watcher = this.$watch('messageObj', function (newvalue, oldvalue) {
                console.log('messageObj watch : ', newvalue, oldvalue);
                this.log.push(newvalue.text);
            }, { deep: this.isDeep });
        },
        setObject () {
            this.clickCnt++;
            this.messageObj = {
                id: '02',
                text: `Watch Example ${this.clickCnt}`,
                author: 'John'
            };
        }
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        console.log('created');
    },
    beforeMount () {
        console.log('beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('updated');
    },
    mounted () {
        console.log('mounted');
        this.$nextTick(function () {
            this.clickCnt = 0;
            this.addWatch();
        });
    },
    beforeDestroy () {
        console.log('beforeDestroy');
    },
    destroyed () {
        console.log('destroyed');
    },
    errorCaptured (error, vm, info) {
        console.log('errorCaptured : ', error, vm, info);
        return false;
    }
};
</script>

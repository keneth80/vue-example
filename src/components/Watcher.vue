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
        <button @click="setArrayItem">
            Array item Update
        </button>
        <button @click="reset">
            Clear
        </button>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in log" :key="index"> {{ item }} </li>
        </ul>
        <span>computed: {{textResult}}</span>
        <br/>
        <!-- array watch -->
        <div>
            <button @click="change">change</button>
            <div v-for="(q, index) in Questions" :key="index">
                <input type="text" v-model="q.foo">
            </div>
            <pre>{{ Questions }}</pre>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Watcher',
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
            },
            updateCnt: {
                type: Number
            },
            resultString: {
                type: String
            },
            Questions: [], // array watcher
            cloneQuestions: [] // array watcher
        };
    },
    watch: {
        isDeep (newvalue, oldvalue) {
            console.log('isDeep watch : ', newvalue, oldvalue);
            this.watcher();
            this.addWatch();
        },
        log: {
            handler: function (newvalue, oldvalue) {
                console.log('log watch : ', newvalue, oldvalue);
            },
            deep: true
        }
    },
    computed: {
        textResult: {
            get: function () {
                this.resultString = this.log.toString();
                return this.resultString;
            },
            set: function (value) {
                this.resultString = value;
            }
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
        },
        setArrayItem () {
            if (!this.log.length) return;
            this.updateCnt++;
            this.log[0] = 'Update Array Item' + this.updateCnt;
            // Array 의 length 변경이 없이 해당 index의 값만 변경 시에는 $forceUpdate 를 해줘야함.
            this.$forceUpdate();
        },
        reset () {
            this.messageObj = {
                id: '01',
                text: 'Watch Example',
                author: 'kenneth'
            };
            this.clickCnt = 0;
            this.updateCnt = 0;
            this.textResult = '';
            this.log = [];
        },
        // array watch
        change: function () {
            this.Questions[0].foo = 5;
        }
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        console.log('created');
        // array watch
        var vm = this;
        this.$watch('Questions', function (after, before) {
            after.filter(function (p, idx) {
                return Object.keys(p).some(function (prop) {
                    const diff = p[prop] !== vm.cloneQuestions[idx][prop];
                    if (diff) {
                        console.log('changed', idx, prop);
                        p.changed = true;
                        vm.cloneQuestions[idx][prop] = p[prop];
                    }
                });
            });
        }, {deep: true});
    },
    beforeMount () {
        console.log('beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('updated');
    },
    mounted () {
        console.log('mounted');
        // array watch
        this.Questions = [{foo: 1, changed: false}, {foo: 2, changed: false}];
        this.cloneQuestions = this.Questions.map(a => Object.assign({}, a));
        this.$nextTick(function () {
            this.clickCnt = 0;
            this.updateCnt = 0;
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

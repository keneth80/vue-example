<template>
    <div class='container'>
        <h1>Custom Render Function</h1>
        <button @click="dataChange">
            data change
        </button>
        <sections name="section1" :value="sections1"/>
        <sections name="section2" :value="sections2"/>
        <component-list :components="components" />
    </div>
</template>

<script>
// Container template 을 활용할 수 있을 것 같음.
import Vue from 'vue';
import TextItem from '../common/component/TextItem';

Vue.component('component-list', {
    props: {
        components: {
            type: Array,
            required: true
        }
    },
    beforeCreate () {
        console.log('component-list.beforeCreate');
    },
    render: function (createElement) {
        let children;
        children = this.components.map(function (d) {
            // 같은 selector 이름으로 상위에서 생성하거나 이렇게 하위 컴포넌트로 행성하면 components properties에 static하게 박을 필요가 없음.
            // 예) components : { TextItem }
            if (d.component) {
                Vue.component(d.type, d.component);
            }
            return createElement(d.type, {
                props: {
                    value: d.value
                }
            });
        });
        console.log('render : ', this.components, children);
        return createElement('ul', { 'class': 'list-group' }, children);
    }
});

// Vue.component('text-item', {
//     props: {
//         value: {
//             type: Object,
//             required: true
//         }
//     },
//     data () {
//         return {
//             id: null,
//             label: null
//         };
//     },
//     mounted () {
//         this.id = this.value ? this.value['id'] : '';
//         this.label = this.value ? this.value['label'] : '';
//     },
//     template: `<li>text : {{label}}</li>`
// });

Vue.component('card-item', {
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            id: null,
            label: null
        };
    },
    mounted () {
        this.id = this.value ? this.value['id'] : '';
        this.label = this.value ? this.value['label'] : '';
    },
    template: `<li>card : {{label}}</li>`
});

Vue.component('list-section', {
    props: {
        value: {
            type: Array,
            required: true
        }
    },
    template: `<div class='container'>
                    <ul class='list-group'>
                        <li class="list-group-item" v-for="item in value" :class="{emph: item.emph}">list : {{item.text}}</li>
                    </ul>
                </div>`
});

Vue.component('text-section', {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    template: `<div>text : {{value}}</div>`
});

Vue.component('sections', {
    props: {
        name: {
            type: String
        },
        value: {
            type: Array,
            required: true
        }
    },
    render: function (createElement) {
        var children;
        children = this.value.map(function (d) {
            return createElement(d.type + '-section', {
                props: {
                    value: d.value
                }
            });
        });
        return createElement('div', { 'class': 'sections' }, children);
    }
});

export default {
    name: 'CustomRenderFunction',
    data () {
        return {
            components: [
                {
                    type: 'text-item',
                    component: TextItem,
                    value: {
                        id: '01',
                        label: 'item01'
                    }
                },
                {
                    type: 'card-item',
                    value: {
                        id: '02',
                        label: 'item02'
                    }
                },
                {
                    type: 'text-item',
                    component: TextItem,
                    value: {
                        id: '03',
                        label: 'item03'
                    }
                }
            ],
            sections1: [
                {
                    type: 'text',
                    value: 'This is a text section'
                },
                {
                    type: 'list',
                    value: [
                        {
                            text: 'important',
                            emph: true
                        },
                        {
                            text: 'not important',
                            emph: false
                        },
                        {
                            text: 'important',
                            emph: true
                        }
                    ]
                },
                {
                    type: 'text',
                    value: 'Footer'
                }
            ],
            sections2: [
                {
                    type: 'text',
                    value: 'A'
                },
                {
                    type: 'text',
                    value: 'B'
                },
                {
                    type: 'text',
                    value: 'C'
                },
                {
                    type: 'list',
                    value: [
                        {
                            text: 'one!',
                            emph: true
                        },
                        {
                            text: 'two',
                            emph: false
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        dataChange () {
            this.components = [
                {
                    type: 'card-item',
                    value: {
                        id: '04',
                        label: 'item04'
                    }
                },
                {
                    type: 'text-item',
                    component: TextItem,
                    value: {
                        id: '05',
                        label: 'item05'
                    }
                },
                {
                    type: 'card-item',
                    value: {
                        id: '06',
                        label: 'item06'
                    }
                }
            ];
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
            console.log('all creation mounted');
        });
    },
    beforeDestroy () {
        console.log('beforeDestroy');
    },
    destroyed () {
        console.log('destroyed');
    }
};
</script>

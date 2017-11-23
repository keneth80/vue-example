<template>
    <div class='container'>
        <h1>Custom Render Function</h1>
        <sections name="section1" :value="sections1"/>
        <sections name="section2" :value="sections2"/>
    </div>
</template>

<script>
// Container template 을 활용할 수 있을 것 같음.
import Vue from 'vue';

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
        console.log('render : ', this.value, this.name, children);
        return createElement('div', { 'class': 'sections' }, children);
    }
});

export default {
    name: 'CustomRenderFunction',
    data () {
        return {
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

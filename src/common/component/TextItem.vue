<script>
import Vue from 'vue';

// const TextItem = Vue.component('text-item', {
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
//
// export default TextItem;

export default {
    name: 'TextItem',
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
    template: `<li>text : {{label}}</li>`
};
</script>

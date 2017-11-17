<template>
    <h1>
        Name : {{author}} </br>
        Age: {{age}}
    </h1>
</template>

<script>
export default {
    name: 'PropsType',
    props: {
        author: {
            type: String,
            default () { return 'kenneth'; }
        },
        age: {
            type: Number,
            default () { return 0; }
        }
    },
    data () {
        return {
            msg: 'kenneth'
        };
    }
};
</script>
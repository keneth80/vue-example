<template>
    <div class='container'>
        <h1>Type 2 numbers and choose operation.</h1>
        <form class='form-inline' style="display: block;">
            <!-- Notice here the special attribute 'number'
            is passed in order to parse inputs as numbers.-->
            <input v-model.number='a'  class='form-control'>
            <select v-model='operator' class='form-control'>
                <option>+</option>
                <option>-</option>
                <option>*</option>
                <option>/</option>
            </select>
            <!-- Notice here the special attribute 'number'
            is passed in order to parse inputs as numbers.-->
            <input v-model.number='b' class='form-control'>
        </form>
        <h2>Result: {{a}}  {{operator}}  {{b}} = {{c}}</h2>
        <pre>
            {{ $data }}
        </pre>
    </div>
</template>

<script>
export default {
    name: 'FormControl',
    data () {
        return {
            a: 1,
            b: 2,
            operator: '+'
        };
    },
    computed: {
        c: function () {
            let returnValue = 0;
            switch (this.operator) {
                case '+':
                    returnValue = this.a + this.b;
                    break;
                case '-':
                    returnValue = this.a - this.b;
                    break;
                case '*':
                    returnValue = this.a * this.b;
                    break;
                case '/':
                    returnValue = this.a / this.b;
                    break;
            }
            return returnValue;
        }
    }
};
</script>


<script>
import ComponentBase from './Component.base';

export default {
    name: 'ComponentBase2',
    extends: ComponentBase,
    methods: {
        opUpdate () {
            console.log('ComponentBaseA.opUpdate');
        }
    },
    data () {
        return {
            opData: []
        };
    }
};
</script>
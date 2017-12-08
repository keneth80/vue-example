<script>
export default {
    name: 'ComponentBase',
    methods: {
        creationComplete () {
            console.log('Base creationComplete');
        },
        // action start
        // component 의 변경여부
        change () {

        },
        // component 의 data 조회
        dataSearch () {

        },
        // component 의 data 입력
        dataInsert () {

        },
        // component 의 data 수정
        dataUpdate () {

        },
        // component 의 data 삭제
        dataDelete () {

        },
        addEvent (eventType, method) {
            const vm = this;
            vm.listers.push({eventType, method});
            addEventListener(eventType, method);
        },
        removeEvent (eventType, method) {
            removeEventListener(eventType, method);
        },
        removeAllEvent () {
            const vm = this;
            vm.listers.map(function (lister) {
                removeEventListener(lister.eventType, lister.method);
            });
        }
    },
    data () {
        return {
            listers: []
        };
    },
    beforeCreate () {
        console.log('Base beforeCreate');
    },
    created () {
        console.log('Base created');
    },
    beforeMount () {
        console.log('Base beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('Base updated');
    },
    mounted () {
        console.log('Base mounted');
        this.$nextTick(function () {
            this.creationComplete();
        });
    },
    beforeDestroy () {
        this.removeAllEvent();
        console.log('Base beforeDestroy');
    },
    destroyed () {
        console.log('Base destroyed');
    },
    errorCaptured (error, vm, info) {
        console.log('Base errorCaptured : ', error, vm, info);
        return false;
    }
};
</script>
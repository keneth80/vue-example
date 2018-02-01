<template>
<div class="container">
    <provider>
        <child></child>
    </provider>
</div>
</template>
<script>

class CustomMap {
    _map = null;
    constructor () {
        this._map = {};
    }
    setMap (key, value) {
        this._map[key] = value;
    }
    getMap (key) {
        return this._map[key];
    }
}

const singleTonClass = new CustomMap();

const Provider = {
    provide: {
        foo: 'bar',
        getMemberInfo (memberId) {
            return {
                memberId: memberId,
                memberName: 'Kenneth'
            };
        },
        singleTonClass: singleTonClass
    },
    template: `<div><slot></slot></div>`
};

const Child2 = {
    inject: ['foo', 'getMemberInfo', 'singleTonClass'],
    template: `<div>Child2 {{ getParentFoo }} injected. <button @click="modifyState">modify Foo</button></div>`,
    computed: {
        getParentFoo: {
            get () { return this.foo; },
            set (val) { this.$emit('update:foo', val); }
        }
    },
    created () {
        console.log('Child2 created : ', this.getMemberInfo('ID007'));
    },
    methods: {
        modifyState () {
            // 직접 접근해서 수정하려고 하면 에러남.
            // this.foo = 'modify foo';
            // singleton class 를 통해서 data를 가공하고 내부적으로 api를 호출 할 수 있다.
            // 예로 service 모델이나 parser class를 가져올 수 있음.
            this.singleTonClass.setMap('test', '000000');
            console.log(this.singleTonClass.getMap('test'), this.singleTonClass);
        }
    }
};

const Child = {
    inject: ['foo', 'getMemberInfo'],
    template: `<div>Child {{ getParentFoo }} injected. <child2></child2></div>`,
    computed: {
        getParentFoo: {
            get () { return this.foo; },
            set (val) { this.$emit('update:foo', val); }
        }
    },
    components: {
        Child2
    },
    created () {
        console.log('Child created : ', this.getMemberInfo('ID007'));
    }
};

export default {
    name: 'ProvideInject',
    // inject: ['foo'],
    components: { Child, Provider },
    data () {
        return {
            memberObj: null
        };
    },
    created () {
        // 상위 레벨에서는 inject가 안됨.
        console.log('created : ', this.foo);
    }
};
</script>

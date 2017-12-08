export default class BeanContainer {
    static ADD_BEAN = 'AddBean';
    static SET_BEAN = 'ModifyBean';
    static REMOVE_BEAN = 'RemoveBean';
    static _instance;
    objMap;

    constructor () {
        this.objMap = {};
    }

    static getInstance () {
        if (!BeanContainer._instance) {
            BeanContainer._instance = new BeanContainer();
        }
        return BeanContainer._instance;
    }

    setBean (name, value) {
        this.objMap[name] = value;
        const sendObj = {
            action: BeanContainer.SET_BEAN,
            value
        };
        dispatchEvent(new CustomEvent(name, {detail: sendObj}));
    }

    addBean (name, value) {
        this.objMap[name] = value;
        const sendObj = {
            action: BeanContainer.ADD_BEAN,
            value: this.objMap[name]
        };
        dispatchEvent(new CustomEvent(name, {detail: sendObj}));
    }

    getBean (name) {
        if (!name) {
            // throw Error(name + ' Bean is null!');
            console.log(`${name} Bean is null!`);
            return null;
        } else {
            return this.objMap[name];
        }
    }

    removeBean (name) {
        // const tempObj = Object.assign({}, this.objMap[name]);
        this.objMap[name] = undefined;
        const sendObj = {
            action: BeanContainer.REMOVE_BEAN
        };
        dispatchEvent(new CustomEvent(name, {detail: sendObj}));
    }

    removeAll () {
        for (let name in objMap) {
            this.objMap[name] = undefined;
        }
    }
}

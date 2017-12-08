export default class CommandActionMap {
    static _instance;
    actionMap = {};

    constructor () {
        this.actionMap = {};
    }

    static getInstance () {
        if (!CommandActionMap._instance) {
            CommandActionMap._instance = new CommandActionMap();
        }
        return CommandActionMap._instance;
    }

    addAction (action, func) {
        if (!this.actionMap[action]) {
            this.actionMap[action] = [];
        }
        const funcList = this.actionMap[action];
        if (funcList && !funcList.some(x => x === func)) {
            funcList.push(func);
        }
        console.log('addAction : ', action, func, this.actionMap);
    }

    removeActionFunction (action, func) {
        // tslint:disable-next-line:curly
        if (this.actionMap[action] === null) return;
        const funcList = this.actionMap[action];
        for (let i = 0; i < funcList.length; i++) {
            if (funcList[i] === func) {
                funcList.splice(i, 1);
                return;
            }
        }
    }

    removeAction (action) {
        if (this.actionMap[action]) {
            const funcList = this.actionMap[action];
            funcList.length = 0;
            this.actionMap[action] = undefined;
        }
    }

    executeAction (action, data) {
        if (!this.actionMap[action]) {
            console.log('not action!');
            return;
        }
        const funcList = this.actionMap[action];
        for (let i = 0; i < funcList.length; i++) {
            funcList[i](data);
        }
    }

    clear () {
        for (const action in this.actionMap) {
            if (this.actionMap.hasOwnProperty(action)) {
                this.removeAction(action);
            }
        }
    }
}

export default class ServiceUtil {
    static async asyncAwaitMapper (service, ...args) {
        const returnData = await service(...args)
            .then(res => {
                console.log('async mapper : ', res, ...args);
                return res.data;
            })
            .catch(e => {
                console.log(e);
                return null;
            });
        return await this.cloneObj(returnData);
    }

    static cloneObj (target) {
        let returnObj = null;
        if (target) {
            returnObj = {};
            for (let prop in target) {
                returnObj[prop] = target[prop];
            }
        }
        return returnObj;
    }
}

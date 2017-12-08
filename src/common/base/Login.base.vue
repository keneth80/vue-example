<script>
import { LOGIN_TYPE } from '../../common/EventConstant';
import { USER } from '../../common/ModelConstant';
import BeanContainer from '../../common/model/BeanContainer';

export default {
    name: 'LoginBase',
    methods: {
        login (event) {
            this.bean.addBean(USER.USER_INFO, event);
        },
        logout (event) {
            this.bean.removeBean(USER.USER_INFO);
        }
    },
    data () {
        return {
            userInfo: null,
            bean: BeanContainer.getInstance()
        };
    },
    beforeCreate () {
        console.log('LoginBase beforeCreate');
    },
    created () {
        console.log('LoginBase created');
        // addEventListener(LOGIN_TYPE.LOGIN, this.login);
        // addEventListener(LOGIN_TYPE.LOGOUT, this.logout);
    },
    beforeMount () {
        console.log('LoginBase beforeMount');
    },
    updated () { // when view data update ( re rendering )
        console.log('LoginBase updated');
    },
    mounted () {
        console.log('LoginBase mounted');
    },
    beforeDestroy () {
        // removeEventListener(LOGIN_TYPE.LOGIN, this.login);
        // removeEventListener(LOGIN_TYPE.LOGOUT, this.logout);
        console.log('LoginBase beforeDestroy');
    },
    destroyed () {
        console.log('LoginBase destroyed');
    }
};
</script>
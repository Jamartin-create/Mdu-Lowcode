import { defineStore } from 'pinia'
import { UserState } from '../interface'
import router from '../../router'
import piniaPersistConfig from '../piniaPersistConfig'
import UserApi from '../../api/user'
import { ResType } from '../../utils/request'


export const UserStore = defineStore({
    id: "UserStore",
    state: (): Partial<UserState> => ({
        token: '',
        userName: ''
    }),
    getters: {},
    actions: {
        async register(userName: string, userPwd: string) {
            const res: ResType = await UserApi.register({ userName, userPwd });
            if (res.code != 0) {
                console.error(res.msg)
                return;
            }
            //TODO:封装消息提示组件后完善
            console.log('注册成功');
            router.push({ name: 'login' });
        },
        async login(userName: string, userPwd: string) {
            const res: ResType = await UserApi.login({ userName, userPwd });
            if (res.code != 0) {
                console.error(res.msg);
                return;
            }
            //TODO:封装消息提示组件后完善
            console.log('登陆成功', res);
            const { data } = res;
            this.token = data.token;
            router.push({ name: 'home' })
        },
        checkIsLogin() {
            const token = this.token;
            if (!token) return false;
            return true;
        },
        reset() {
            this.$reset();
        }
    },
    persist: piniaPersistConfig("UserState")
})
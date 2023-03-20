import { defineStore } from 'pinia'
import { UserState } from '../interface'
import router from '../../router'
import piniaPersistConfig from '../piniaPersistConfig'
import UserApi from '../../api/user'
import { ResType } from '../../utils/request'

//sysPinia
import { SysStore } from './sys'

export const UserStore = defineStore({
    id: "UserStore",
    state: (): Partial<UserState> => ({
        token: '',
        userName: ''
    }),
    getters: {},
    actions: {
        //注册
        async register(userName: string, userPwd: string) {
            const sysPinia = SysStore();
            const res: ResType = await UserApi.register({ userName, userPwd });
            if (res.code != 0) {
                sysPinia.snackOpen(res.msg);
                return;
            }
            sysPinia.snackOpen('注册成功');
            router.push({ name: 'login' });
        },
        //登录
        async login(userName: string, userPwd: string) {
            const sysPinia = SysStore();
            const res: ResType = await UserApi.login({ userName, userPwd });
            if (res.code != 0) {
                sysPinia.snackOpen(res.msg);
                return;
            }
            sysPinia.snackOpen('登录成功');
            const { data } = res;
            this.token = data.token;
            router.push({ name: 'home' })
        },
        //检测是否登录
        checkIsLogin() {
            const token = this.token;
            if (!token) return false;
            return true;
        },
        //重置仓库
        reset() {
            this.$reset();
        }
    },
    persist: piniaPersistConfig("UserState")
})
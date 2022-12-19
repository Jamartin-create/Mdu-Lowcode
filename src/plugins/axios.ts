import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

function errorHandler(status: number, other: string) {
    // 状态码判断
    switch (status) {
        //TODO
    }
}

//接口定义
interface PendingType {
    url?: string;
    method?: Method;
    params: any;
    data: any;
    cancel: any;
}

//取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

//移除重复请求
function removePending(config: AxiosRequestConfig) {
    for (const key in pending) {
        const item: number = +key;
        const list: PendingType = pending[key];
        //当前请求在数组中存在时执行取消操作
        if (list.url === config.url &&
            list.method === config.method &&
            JSON.stringify(list.params) === JSON.stringify(config.params) &&
            JSON.stringify(list.data) === JSON.stringify(config.data)) {
            list.cancel('操作太频繁，请稍后再试');
            pending.splice(item, 1);
        }
    }
}

/**
 * @description 实例化请求配置
 */
const instance = axios.create({
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin-Type": '*'
    },
    timeout: 1000 * 30,
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false,
})

instance.interceptors.request.use(reqInter, reqInterErr);
instance.interceptors.response.use(resInter, resInterErr);


/**
 * @description 请求拦截器
 * @param config Axios请求配置
 * @returns config
 */
function reqInter(config: AxiosRequestConfig<any>) {
    removePending(config);
    config.cancelToken = new CancelToken((c) => {
        pending.push({ url: config.url, method: config.method as Method, params: config.params, data: config.data, cancel: c });
    })
    //TODO: token验证
    return config;
}

/**
 * @description 请求拦截异常
 */
function reqInterErr(error: any) {
    //TODO: 异常处理
    console.error(error.data.error.message);
    return Promise.reject(error.data.error.message);
}

/**
 * @description 响应拦截器
 */
function resInter(config: AxiosResponse<any, any>) {
    //移除重复请求队列
    removePending(config.config)
    //请求成功
    if (config.status === 200 || config.status === 204) {
        return Promise.resolve(config);
    } else {
        return Promise.reject(config);
    }
}

/**
 * @description 响应拦截器异常
 */
function resInterErr(error: any) {
    const { response } = error;
    if (response) {
        errorHandler(response.status, response.data.message);
        //TODO: 超时重新请求

        return Promise.reject(response);
    } else {
        //网络异常
        console.error('网络异常');
    }
}

export default instance;
import { createApp, render, getCurrentInstance } from 'vue'
import type { App } from 'vue'
import vuetify from '../../plugins/vuetify'
import MessageConstructor from '../Message/Message.vue'

/**
 * @description 消息Toast hook
 * @returns $message
 */
export function useMessage() {
    const {
        // @ts-ignore
        appContext: {
            app: {
                config: {
                    globalProperties: { $message },
                },
            },
        },
    } = getCurrentInstance()
    return $message
}

// 消息队列
type MessageQueue = App[]
const instances: MessageQueue = []
//单个消息toast实例偏移
const offset = 60
let seed = 1


const message: any = function (options: Object | string) {
    if (typeof options === 'string') {
        options = {
            message: options,
        }
    }
    const id = `message_${seed++}`
    const container = document.createElement('div')
    const app = createApp(MessageConstructor, {
        id,
        top: (instances.length + 1) * offset,
        onClose: () => {
            render(null, container)
            close(id)
        },
        ...options,
    }).use(vuetify).mount(container)
    instances.push(app as any)
    document.body.appendChild(container.firstElementChild!)
}

//添加不同type的配置项
const types = ['success', 'info', 'warning', 'error']
types.forEach((type: string) => {
    message[type] = (options: Object | string) => {
        if (typeof options === 'string') {
            return message({
                type,
                message: options,
            })
        } else if (typeof options === 'object') {
            return message({
                type,
                ...options,
            })
        }
    }
})

/**
 * @description 消息关闭时的相关处理函数
 * @param id App实例id（之前自定义的）
 * @returns 
 */
function close(id: string): void {
    const idx = instances.findIndex((app: any) => id === app.id)
    if (idx === -1) return
    const app = instances[idx]
    // 如果没有找到虚拟节点就什么都不做
    if (!app) return
    // 从 idx 位置开始删除一个节点
    instances.splice(idx, 1)
    const len = instances.length
    if (len < 1) return // 删除一个虚拟节点后消息队列内没有元素, 什么都不做了
    for (let i = idx; i < len; i++) {
        instances[i]['reTime' as keyof App]() // 重新开始定时
        // style 的 top 是 ..px 的形式, 因此需要 parseInt 解析出数字
        const pos: number =
            Number.parseInt((instances[i] as any).$el.style.top, 10) - offset
        instances[i]['$el' as keyof App].style.top = `${pos}px`
    }
}

// 消息提示框插件
export default {
    install(app: App) {
        app.config.globalProperties.$message = message
    },
}
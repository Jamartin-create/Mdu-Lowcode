//schema处理（props 和 styles 以及 可视化组件的配置项处理） *****重点*****
import * as Trans from './schemaTrans'
import * as ExInPlain from './explain&inplain'

export default {
    ...ExInPlain,
    ...Trans
}
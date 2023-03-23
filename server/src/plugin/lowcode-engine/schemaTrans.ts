import { CompProp, CompType } from '../../db/mongoDB/schema/schemaType';

export type Props = {
    [key: string]: any;
}

export type CompReturnType = {
    compId: string;
    compName: string;
    compTitle: string;
    compType: string;
    dataSourceId: string;
    compProps: Props;
    compStyles: Props;
}

//翻译Schema
export function translateSchema(props: any[]): Partial<CompReturnType>[] {
    return props.map(({ compId, compName, compProps, compStyles, compTitle, compType, dataSourceId }) => {
        return {
            compId,
            compName,
            compTitle,
            compType,
            dataSourceId,
            compProps: transOptions(compProps),
            compStyles: transOptions(compStyles),
        }
    })
}

//转换 配置项（props 和 styles）
export function transOptions(props: CompProp[]): Props {
    const res: Props = {};
    props.forEach((it, id) => {
        if (it.type == 'text') {
            res[it.name as string] = '请输入' + it.text;
        } else if (it.type == 'select') {
            res[it.name as string] = 'unchose';
        }
    })
    return res;
}
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
    compDts: Props;
}

//翻译Schema
export function translateSchema(props: any[]): Partial<CompReturnType>[] {
    return props.map(({ compId, compName, compProps, compStyles, compTitle, compType, dataSourceId, compDts }) => {
        return {
            id: compId,
            compId: compId,
            tag: compName,
            tagCN: compTitle,
            type: compType,
            dataSourceId: dataSourceId,
            props: transOptions(compProps),
            styles: transOptions(compStyles),
            dts: transOptions(compDts)
        }
    })
}

//转换 配置项（props 和 styles）
export function transOptions(props: CompProp[]): Props {
    const res: Props = {};
    props.forEach((it, id) => {
        if (it.type == 'text') {
            // res[it.name as string] = '请输入' + it.text;
        } else if (it.type == 'select') {
            // res[it.name as string] = 'default';
        }
    })
    return res;
}
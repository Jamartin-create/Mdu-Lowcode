
export type ItemGroup = {
    itemTitle: string,
    itemDescription?: string,
    groups: any[]
}


//物料解析
export function explainJson(itemGroup: ItemGroup) {
    const { itemTitle, itemDescription, groups } = itemGroup;
    return {
        item: {
            itemTitle,
            itemDescription
        },
        group: groups[0]
    };
}

//拼接项目与物料的json
export function inplainToJson(item: any, groups: any[]) {
    const ret: any = {};
    ret['itemTitle'] = item.itemTitle;
    item.itemDescription && (ret['itemDescription'] = item.itemDescription);
    ret['groups'] = groups.map(group => group.groupJson);
    return ret;
}
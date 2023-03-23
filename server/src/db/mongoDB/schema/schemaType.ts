export interface BusinessBaseEntity {
    createTime: number;
    updateTime: number;
    createUser: string;
    updateUser: string;
    description: string;
}

export interface User extends BusinessBaseEntity {
    userId: string;
    userName: string;
    userAge: number | null;
    userGender: '男' | '女' | '未知';
    userPwd: string;
    userEmail: string | null;
}

export interface Item extends BusinessBaseEntity {
    itemId: string;
    itemTitle: string;
    itemPublic: boolean;
    itemDescription: string;
    itemPublicPage: string;
    userId: string;
    groupId: string;
}

export interface SelectGroupType extends BusinessBaseEntity {
    sgtId: string;
    sgtName: string;
    sgtCode: string;
}

export type Test = {
    name: string;
    age: number;
    gender: string;
}

export interface CompType {
    compId: string,
    compName: string,
    compTitle: string,
    compType: string,
    compProps: CompProp[],
    compStyles: CompProp[],
    dataSourceId: string,
}

//selectGroup，需配置字典（后端配置），这里放置字典ID
export interface CompProp {
    id: Number,
    name: String,
    text: String,
    type: string,
    selectGroup: String,
}
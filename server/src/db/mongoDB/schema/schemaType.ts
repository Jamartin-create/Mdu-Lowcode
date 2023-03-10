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

export type Test = {
    name: string;
    age: number;
    gender: string;
}


//selectGroup，需配置字典（后端配置），这里放置字典ID
export interface CompProp {
    id: Number,
    name: String,
    text: String,
    type: 'text' | 'select',
    selectGroup: String,
}

export interface CompStyle {
    id: Number,
    name: String,
    text: String,
    type: 'text' | 'color' | 'select',
    selectGroup: String,
}
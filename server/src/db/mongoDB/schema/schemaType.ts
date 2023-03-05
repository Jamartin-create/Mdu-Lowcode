export type BusinessBaseEntity = {
    createTime?: number;
    updateTime?: number;
    createUser?: string;
    updateUser?: string;
    description?: string;
}

export type User = {
    userId?: string;
    userName?: string;
    userAge?: number | null;
    userGender?: '男' | '女' | '未知';
    userPwd?: string;
    userEmail?: string | null;
}

export type Test = {
    name: string;
    age: number;
    gender: string;
}
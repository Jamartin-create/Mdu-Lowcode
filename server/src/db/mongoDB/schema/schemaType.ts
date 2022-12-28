export type BusinessBaseEntity = {
    createTime?: number;
    updateTime?: number;
    createUser?: string;
    updateUser?: string;
    description?: string;
}

export type User = {
    userName: string;
    userAge?: number;
    userGender?: '男' | '女';
    userPwd: string;
    userEmail?: string;
}

export type Test = {
    name: string;
    age: number;
    gender: string;
}
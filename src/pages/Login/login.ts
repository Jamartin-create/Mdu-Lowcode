export const rule = {
    username: [(v: string) => !!v || "请输入用户名"],
    password: [(v: string) => !!v || "请输入密码"],
}
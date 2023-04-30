//uuid生成
export function guid() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

//数组替换
export function replaceArray(o: any[], n: any[]) {
    o.splice(0, o.length);
    Array.prototype.push.apply(o, n);
}

//json文件生成并下载
export function downloadJson(json: any, fileName: string) {
    const content = JSON.stringify(json);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName + new Date().getTime() + ".json");
}

function saveAs(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
}

//时间格式化
export function dateFormat(date: Date, fmt: string) {
    const o: any = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds() //秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(-RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ?
                    o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
}

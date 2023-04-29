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

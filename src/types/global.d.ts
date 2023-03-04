//设置全局类型，解决类型声明时的异常报错

declare type Nullable<T> = T | null;

//元素类型定义
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
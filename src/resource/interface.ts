

//-------组件部分interface--------

export interface CompAttr {
    id: number;
    name: string;
    text: string;
    type: 'select' | 'text';
}

export type CompStyles = CompAttr[];

export type Compprops = CompAttr[];

//------------------------------
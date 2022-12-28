
export type BaseRes = {
    msg: string;
    code: number;
}

export type PageRes = {
    total: number;
    current: number;
} & BaseRes;

export type ListRes = {
    data: any[];
};

export type DataRes = {
    data: any;
};

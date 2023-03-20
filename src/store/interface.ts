import { ItemType } from '../api/item';
export interface UserState {
    token: string;
    userName: string;
}

export interface SysState {
    snackVis: boolean;
    snackText: string;
    snackType: string;
}

export interface ItemState {
    curItem: Nullable<ItemType>;
}
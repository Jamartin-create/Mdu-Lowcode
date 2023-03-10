import { ItemType } from '../api/item';
export interface UserState {
    token: string;
    userName: string;
}

export interface SysState {
    toastVis: boolean;
}

export interface ItemState {
    curItem: Nullable<ItemType>;
}
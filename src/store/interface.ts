import { ItemType } from '../api/item';
import { GroupType } from '../api/group';
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
    curItemGroup: Nullable<Partial<GroupType>>;
}
import { ComponentType } from '../types/component';
import { guid } from '../utils/common';
export abstract class BaseComponent {
    id: string
    component: string
    protected constructor(detail: ComponentType) {
        if (detail.id) {
            this.id = detail.id;
        } else {
            this.id = guid();
        }
        this.component = detail.component
    }
}
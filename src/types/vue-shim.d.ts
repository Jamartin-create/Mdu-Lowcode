declare module '*.vue' {
    import type { ComponentOptions } from "vue";
    const Component: ComponentOptions;
    export default Component;
}

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
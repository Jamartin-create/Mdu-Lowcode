import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const AsyncComponent = {
    install: (app: App) => {
        const asyncComp = defineAsyncComponent(() => import('./EchartsTest/index.vue'))
        app.component('EchartsTest', asyncComp);
    }
}

export { AsyncComponent }
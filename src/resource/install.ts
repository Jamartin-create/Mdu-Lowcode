import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const AsyncComponent = {
    install: (app: App) => {
        const moduleFilesTs: any = import.meta.glob('./**/index.ts', {
            eager: true
        });
        Object.keys(moduleFilesTs).forEach((key: string) => {
            const componentOptions = moduleFilesTs[key]?.default;
            app.component(
                componentOptions.name,
                defineAsyncComponent(componentOptions.component)
            );
        })
        const asyncComp = defineAsyncComponent(() => import('./EchartsTest/index.vue'))
        app.component('EchartsTest', asyncComp);
    }
}

export { AsyncComponent }
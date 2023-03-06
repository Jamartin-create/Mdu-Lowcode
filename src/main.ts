import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'

//router
import router from './router'

//asyncComponent
import { AsyncComponent } from './resource/install'

//自定义指令
import Directive from './plugins/directive'

//pinia
import pinia from './store'

createApp(App)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .use(AsyncComponent)
    .use(Directive)
    .mount('#app')

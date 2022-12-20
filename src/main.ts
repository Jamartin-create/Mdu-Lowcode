import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'

//router
import router from './router'

createApp(App).use(router).use(vuetify).mount('#app')

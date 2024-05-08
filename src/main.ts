import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axiosInstance from '@/utils/axios-interceptor'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$http = axiosInstance
const vuetify = createVuetify({
  components,
  directives
})
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')

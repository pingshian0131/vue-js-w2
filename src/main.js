import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'

import {createApp} from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faSuitcase, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faSuitcase, faEdit, faTrash)

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$axios = axios;
app.mount('#app');

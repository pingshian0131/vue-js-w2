import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import {createApp} from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret, faSuitcase } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret,faSuitcase)
createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

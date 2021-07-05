import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import {BootstrapVue } from "bootstrap-vue";
import i18n from "./i18n";
import {
    getStaticOptions,
    getMovieCardRatingClass,
    hasPermission,
    loggedIn,
    user,
    capitalize,
    randomNumber
} from "@/utils/helper";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import VueI18n from "vue-i18n";
import ScrollBar from '@morioh/v-smooth-scrollbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import Echo from "laravel-echo";
import {faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon, FontAwesomeLayers} from '@fortawesome/vue-fontawesome';
import {
    faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight
    , faComment, faBell, faTimes, faBars, faArrowUp, faPlus, faAlignJustify,
    faTrashAlt, faTrophy, faClock, faHeart, faEye, faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import "./registerServiceWorker";
import API from "@/api";

Vue.use(BootstrapVue);
Vue.use(VueToast);
Vue.use(VueI18n);
Vue.use(ScrollBar);
const moment = require('moment')

Vue.use(require('vue-moment'), {
    moment
})

library.add(faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight
    , faComment, faBell, faTimes, faBars, faArrowUp, faPlus, faAlignJustify,
    faTrashAlt, faTrophy, faClock, faHeart, faEye, faQuestionCircle);
library.add(faFacebookF);
library.add(faInstagram);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

import Ads from 'vue-google-adsense';

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

Vue.config.productionTip = false;

Vue.mixin({
    data: () => ({
        getMovieCardRatingClass,
        loggedIn,
        user,
        hasPermission,
        getStaticOptions,
        capitalize,
        randomNumber
    }),
});

Vue.prototype.$api = API;
Vue.prototype.$screen = new Vue({
    data: {
        screen: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
}).screen;

window.addEventListener('resize', () => {
    Vue.prototype.$screen.width = window.innerWidth;
    Vue.prototype.$screen.height = window.innerHeight;
}, {passive: true});

//if(store.getters["auth/loggedIn"]) {
    window.Pusher = require('pusher-js');
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.VUE_APP_WS_APP_KEY,
        cluster: process.env.VUE_APP_WS_CLUSTER,
        encrypted: true,
        forceTLS: process.env.VUE_APP_MODE === 'prod',
        wsHost: window.location.hostname,
        wsPort: 6001,
        authEndpoint: process.env.VUE_APP_WS_URL,
        enabledTransports: ['ws', 'wss'],
        disableStats: true,
        auth: {
            headers: {
                Authorization: 'Bearer ' + (store.getters["auth/loggedIn"] ? store.state.auth.user.access_token : '')
            }
        }
    });
//}

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
    beforeCreate() {
        this.$store
            .dispatch("initialiseStore", {i18n: i18n, moment: moment})
            .then(() => console.log("Store initialization completed."));
    },
}).$mount("#app");

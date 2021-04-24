import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import movie from "@/store/modules/movie";
import general from "@/store/modules/general";
import forum from "@/store/modules/forum";
import admin from "@/store/modules/admin";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        movie,
        general,
        forum,
        admin
    },
    actions: {
        initialiseStore({commit}, {i18n, moment}) {
            // Initialize language
            const lang =
                window.localStorage.getItem("lang") ||
                process.env.VUE_APP_I18N_FALLBACK_LOCALE;

            commit("user/onLanguageChanged", {lang, i18n, moment});
        },
    },
});

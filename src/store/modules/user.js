import AuthService from "@/services/auth.service";

const user = {
    namespaced: true,
    name: "user",
    state: {
        lang: "hu",
    },
    getters: {
        lang(state) {
            return state.lang;
        },
    },
    actions: {
        init({commit}, {i18n, moment}) {
            const lang =
                window.localStorage.getItem("lang") ||
                process.env.VUE_APP_I18N_FALLBACK_LOCALE;

            commit("onLanguageChanged", {lang, i18n, moment});
        },
        changeLanguage({commit}, {lang, i18n, moment}) {
            commit("onLanguageChanged", {lang, i18n, moment});
        },
        sendToast({commit}, {message, type}) {
            commit("sendToast", {message, type});
        },
    },
    mutations: {
        onLanguageChanged(state, {lang, i18n, moment}) {
            window.localStorage.setItem("lang", lang);
            i18n.locale = lang;
            state.lang = lang;
            moment.locale(lang);
        },
        sendToast(state, {message, type}) {
            this._vm.$toast.open({
                message: message,
                type: type,
                position: "bottom-right",
            });
        },
    },
};

export default user;

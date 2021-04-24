import axios from "axios";
import router from "@/router";
import i18n from "@/i18n";

const lang = localStorage.getItem('lang') || 'hu';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    params: {
        lang: lang,
    }
});

const interceptor = instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));

        config.headers["Content-Type"] = "application/json";

        if (user && user.token_type && user.access_token) {
            config.headers[
                "Authorization"
                ] = `${user.token_type} ${user.access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const responseInterceptor = instance.interceptors.response.use((response) => {
    return Promise.resolve(response);
}, (error) => {
    /*if ( error.response.status === 503 && router.currentRoute.name !== 'maintenance' ) {
        router.push({ name: 'maintenance', params: { lang: i18n.t('navTexts.maintenance')} });

        return Promise.reject(error);
    }*/

    if(error.response.status === 401) {
        const user = JSON.parse(localStorage.getItem("user"));

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${user.token_type} ${user.access_token}`
        }

        return axios
            .post(process.env.VUE_APP_API_URL + "/auth/refresh", {}, { headers: headers })
            .then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                error.response.config.headers["Authorization"] =
                    "Bearer " + response.data.access_token;
                return axios(error.response.config);
            })
            .catch((error) => {
                // YOu must reconnect
                return Promise.reject(error);
            });
    }

    return Promise.reject(error);
});

export default instance;

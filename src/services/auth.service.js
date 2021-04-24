import API from "@/api";

const API_URL = process.env.VUE_APP_API_URL + "/auth/";

class AuthService {
    login(user) {
        return API.post(API_URL + "login", {
            username: user.username,
            password: user.password,
            lang: user.lang,
        }).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return API.post(API_URL + "register", {
            username: user.username,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
            privacy_policy: user.privacy_policy,
            lang: user.lang,
        }).then((response) => {
            return response.data;
        });
    }

    verify(token) {
        return API.post(API_URL + "verify/" + token).then((response) => {
            return response.data;
        });
    }

    forgot(user) {
        return API.post(API_URL + "forgot", user).then((response) => {
            return response.data;
        });
    }

    reset(user, token) {
        return API.post(API_URL + "reset" + "/" + token, user).then((response) => {
            return response.data;
        });
    }

    changePassword(user) {
        return API.post(API_URL + "change_password", user).then((response) => {
            return response.data;
        });
    }

    uploadProfilePicture(data) {
        return API.post(API_URL + "profile_picture", data).then((response) => {
            return response.data;
        });
    }

    getUserMe() {
        return API.get(API_URL + "me").then((response) => {
            return response.data;
        });
    }

    updateUser(user) {
        return API.post(API_URL + "me", user).then((response) => {
            return response.data;
        });
    }

    getUsers({page, filters}) {
        const params = new URLSearchParams();

        if(page !== null && page !== undefined) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'name') {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "users?" + params.toString()).then((response) => {
            return response.data;
        });
    }

    getUser({username}) {
        return API.get(API_URL + "users/" + username).then((response) => {
            return response.data;
        });
    }
}

export default new AuthService();

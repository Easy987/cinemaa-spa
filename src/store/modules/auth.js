import AuthService from "@/services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? {status: {loggedIn: true}, user, users: [], onlineUsers: []}
    : {status: {loggedIn: false}, user: null, users: [], onlineUsers: []};

const auth = {
    namespaced: true,
    name: "auth",
    state: initialState,
    getters: {
        loggedIn: (state) => {
            return state.status.loggedIn;
        },
        user: (state) => {
            return state.user.user;
        },
        users: (state) => {
            return state.users;
        },
        onlineUsers: (state) => {
            return state.onlineUsers;
        }
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                (response) => {
                    commit("loginSuccess", response);
                    return Promise.resolve(user);
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },

        logout({commit}) {
            AuthService.logout();
            commit("logout");
        },

        register({ commit }, user) {
            return AuthService.register(user).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        verify({ commit }, token) {
            return AuthService.verify(token)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },

        forgot({ commit }, user) {
            return AuthService.forgot(user)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },

        reset({ commit }, {user, token}) {
            return AuthService.reset(user, token)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        changePassword({commit}, {user}) {
            return AuthService.changePassword(user)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        uploadProfilePicture({commit}, {data}) {
            return AuthService.uploadProfilePicture(data)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getUserMe({commit}) {
            return AuthService.getUserMe()
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        updateUser({commit}, { user }) {
            return AuthService.updateUser(user)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getUsers({commit}, { page, filters }) {
            return AuthService.getUsers({page: page, filters: filters})
                .then((response) => {
                    commit("setUsers", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getUser({commit}, { username }) {
            return AuthService.getUser({username: username})
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getOnlineUsers({commit}) {
            return window.Echo.join('Cinema.Global')
                .here((users) => {
                    commit("setOnlineUsers", users);
                    return Promise.resolve(users);
                })
                .joining((user) => {
                    commit("setOnlineUsersJoining", user);
                })
                .leaving((user) => {
                    commit("setOnlineUsersLeaving", user);
                });
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },

        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            localStorage.removeItem("user");
        },

        setUsers(state, users) {
            state.users = users;
        },

        setOnlineUsers(state, users) {
            state.onlineUsers = users;
        },

        setOnlineUsersJoining(state, user) {
            state.onlineUsers = state.onlineUsers.filter((onlineUser) => { return onlineUser.id !== user.id });
            state.onlineUsers.push(user);
        },

        setOnlineUsersLeaving(state, user) {
            state.onlineUsers = state.onlineUsers.filter((onlineUser) => { return onlineUser.id !== user.id });
        },
    },
};

export default auth;

import AdminService from "@/services/admin.service";
import Vue from 'vue'

const admin = {
    namespaced: true,
    name: "admin",
    state: {
        users: [],
        info: {},
        comments: [],
        sites: [],
        movies: [],
        links: [],
        preliminaries: [],
        reports: []
    },
    getters: {
        users: (state) => {
            return state.users;
        },
        info: (state) => {
            return state.info;
        },
        comments: (state) => {
            return state.comments;
        },
        sites: (state) => {
            return state.sites;
        },
        movies: (state) => {
            return state.movies;
        },
        links: (state) => {
            return state.links;
        },
        preliminaries: (state) => {
            return state.preliminaries;
        },
        reports: (state) => {
            return state.reports;
        }
    },
    actions: {
        getUsers({commit}, {page, filter}) {
            return AdminService.getUsers(page, filter)
                .then((response) => {
                    commit("setUsers", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        blockUser({commit}, {user: user}) {
            return AdminService.blockUser(user)
                .then((response) => {
                    commit("setUser", {user, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteUser({commit}, {user: user}) {
            return AdminService.deleteUser(user)
                .then((response) => {
                    commit("deleteUser", {user, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getUser({commit}, {username}) {
            return AdminService.getUser(username)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        saveUser({commit}, {user}) {
            return AdminService.saveUser(user)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getInfo({commit}) {
            return AdminService.getInfo()
                .then((response) => {
                    commit("setInfo", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getComments({commit}, {page, filter}) {
            return AdminService.getComments(page, filter)
                .then((response) => {
                    commit("setComments", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteComment({commit}, {id: id}) {
            return AdminService.deleteComment(id)
                .then((response) => {
                    commit("deleteComment", {id});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getSites({commit}, {page, filter}) {
            return AdminService.getSites(page, filter)
                .then((response) => {
                    commit("setSites", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteSite({commit}, {id: id}) {
            return AdminService.deleteSite(id)
                .then((response) => {
                    commit("deleteSite", {id});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getSite({commit}, {name}) {
            return AdminService.getSite(name)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        saveSite({commit}, {site}) {
            return AdminService.saveSite(site)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getMovies({commit}, {page, filter}) {
            return AdminService.getMovies(page, filter)
                .then((response) => {
                    commit("setMovies", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getPremierMovies({commit}, {page, filter}) {
            return AdminService.getMovies(page, filter)
                .then((response) => {
                    commit("setMovies", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        blockMovie({commit}, {movie: movie}) {
            return AdminService.blockMovie(movie)
                .then((response) => {
                    commit("setMovie", {movie, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        acceptMovie({commit}, {movie: movie}) {
            return AdminService.acceptMovie(movie)
                .then((response) => {
                    commit("setMovie", {movie, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteMovie({commit}, {movie: movie}) {
            return AdminService.deleteMovie(movie)
                .then((response) => {
                    commit("deleteMovie", {movie, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getMovie({commit}, {id}) {
            return AdminService.getMovie(id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        saveMovie({commit}, {movie}) {
            return AdminService.saveMovie(movie)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteVideo({commit}, {movie_id, id}) {
            return AdminService.deleteVideo(movie_id, id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getLinks({commit}, {page, filter}) {
            return AdminService.getLinks(page, filter)
                .then((response) => {
                    commit("setLinks", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        blockLink({commit}, {link: link}) {
            return AdminService.blockLink(link)
                .then((response) => {
                    commit("setLink", {link, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        acceptLink({commit}, {link: link}) {
            return AdminService.acceptLink(link)
                .then((response) => {
                    commit("setLink", {link, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteLink({commit}, {link: link}) {
            return AdminService.deleteLink(link)
                .then((response) => {
                    commit("deleteLink", {link});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getLink({commit}, {id}) {
            return AdminService.getLink(id)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        saveLink({commit}, {link}) {
            return AdminService.saveLink(link)
                .then((response) => {
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },

        getPreliminaries({commit}, {page, filter}) {
            return AdminService.getPreliminaries(page, filter)
                .then((response) => {
                    commit("setPreliminaries", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deletePreliminary({commit}, {preliminary: preliminary}) {
            return AdminService.deletePreliminary(preliminary)
                .then((response) => {
                    commit("deletePreliminary", {preliminary, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        acceptPreliminary({commit}, {preliminary: preliminary}) {
            return AdminService.acceptPreliminary(preliminary)
                .then((response) => {
                    commit("deletePreliminary", {preliminary, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        getReports({commit}, {page, filter}) {
            return AdminService.getReports(page, filter)
                .then((response) => {
                    commit("setReports", response);
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
        deleteReport({commit}, {report: report, remove: remove}) {
            return AdminService.deleteReport(report, remove)
                .then((response) => {
                    commit("deleteReport", {report, response});
                    return Promise.resolve(response);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setUser(state, {user, response}) {
            const index = state.users.data.findIndex(x => x.id === user);
            Vue.set(state.users.data, index, response.data);
        },
        deleteUser(state, {user, response}) {
            state.users.data = state.users.data.filter(x => x.id !== user);
        },
        setInfo(state, info) {
            state.info = info;
        },
        setComments(state, comments) {
            state.comments = comments;
        },
        deleteComment(state, {id}) {
            state.comments.data = state.comments.data.filter(x => x.id !== id);
        },
        setSites(state, sites) {
            state.sites = sites;
        },
        deleteSite(state, {id}) {
            state.sites.data = state.sites.data.filter(x => x.id !== id);
        },
        setMovies(state, movies) {
            state.movies = movies;
        },
        setMovie(state, {movie, response}) {
            const index = state.movies.data.findIndex(x => x.id === movie);
            Vue.set(state.movies.data, index, response.data);
        },
        deleteMovie(state, {movie, response}) {
            state.movies.data = state.movies.data.filter(x => x.id !== movie);
        },
        setLinks(state, links) {
            state.links = links;
        },
        setLink(state, {link, response}) {
            const index = state.links.data.findIndex(x => x.id === link);
            Vue.set(state.links.data, index, response.data);
        },
        setPreliminaries(state, preliminaries) {
            state.preliminaries = preliminaries;
        },
        setPreliminary(state, {preliminaries, response}) {
            const index = state.preliminaries.data.findIndex(x => x.id === preliminaries);
            Vue.set(state.preliminaries.data, index, response.data);
        },
        deletePreliminary(state, {preliminary, response}) {
            state.preliminaries.data = state.preliminaries.data.filter(x => x.id !== preliminary);
        },
        setReports(state, reports) {
            state.reports = reports;
        },
        deleteReport(state, {report, response}) {
            state.reports.data = state.reports.data.filter(x => x.id !== report);
        },
        deleteLink(state, {link}) {
            if(state.links.data) {
                state.links.data = state.links.data.filter(x => x.id !== link);
            }
        },
    },
};

export default admin;

import API from "@/api";

const API_URL = process.env.VUE_APP_API_URL + "/admin/";

class AdminService {
    getUsers(page, filters) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'name' && item !== '') {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "users?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    blockUser(userID) {
        return API.post(API_URL + "users/block", {user: userID}).then((response) => {
            return response.data;
        });
    }
    deleteUser(userID) {
        return API.delete(API_URL + "users?user=" + userID).then((response) => {
            return response.data;
        });
    }
    getUser(username) {
        return API.get(API_URL + "users/" + username).then((response) => {
            return response.data;
        });
    }
    saveUser(user) {
        return API.post(API_URL + "users/" + user.username, {user: user}).then((response) => {
            return response.data;
        });
    }
    getInfo() {
        return API.get(API_URL + "info").then((response) => {
            return response.data;
        });
    }
    getComments(page, filters) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'name' && item !== '') {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "comments?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    deleteComment(id) {
        return API.delete(API_URL + "comments?comment=" + id).then((response) => {
            return response.data;
        });
    }
    getSites(page, filters) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'name' && item !== '') {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "sites?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    getSite(name) {
        return API.get(API_URL + "sites/" + name).then((response) => {
            return response.data;
        });
    }
    deleteSite(id) {
        return API.delete(API_URL + "sites?site=" + id).then((response) => {
            return response.data;
        });
    }
    saveSite(site) {
        return API.post(API_URL + "sites/" + site.name, {site: site}).then((response) => {
            return response.data;
        });
    }
    getMovies(page, filters) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'name' && item !== '') {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'status' && item !== -1) {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "movies?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    blockMovie(id) {
        return API.post(API_URL + "movies/block", {id: id}).then((response) => {
            return response.data;
        });
    }
    acceptMovie(id) {
        return API.post(API_URL + "movies/accept", {id: id}).then((response) => {
            return response.data;
        });
    }
    getMovie(id) {
        return API.get(API_URL + "movies/" + id).then((response) => {
            return response.data;
        });
    }
    deleteMovie(id) {
        return API.delete(API_URL + "movies?id=" + id).then((response) => {
            return response.data;
        });
    }
    saveMovie(movie) {
        return API.post(API_URL + "movies/" + movie.id, {movie: movie}).then((response) => {
            return response.data;
        });
    }
    deleteVideo(movie_id, id) {
        return API.delete(API_URL + "videos?movie_id="+movie_id+"&id=" + id).then((response) => {
            return response.data;
        });
    }
    getLinks(page, filters) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'url' && item !== '') {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'status' && item !== -1) {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "links?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    blockLink(id) {
        return API.post(API_URL + "links/block", {id: id}).then((response) => {
            return response.data;
        });
    }
    acceptLink(id) {
        return API.post(API_URL + "links/accept", {id: id}).then((response) => {
            return response.data;
        });
    }
    getLink(id) {
        return API.get(API_URL + "links/" + id).then((response) => {
            return response.data;
        });
    }
    deleteLink(id) {
        return API.delete(API_URL + "links?id=" + id).then((response) => {
            return response.data;
        });
    }
    saveLink(link) {
        return API.post(API_URL + "links/" + link.id, {link: link}).then((response) => {
            return response.data;
        });
    }
    getPreliminaries(page, filters) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'url' && item !== '') {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'status' && item !== -1) {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "preliminaries?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    deletePreliminary(id) {
        return API.delete(API_URL + "preliminaries?id=" + id).then((response) => {
            return response.data;
        });
    }
    acceptPreliminary(id) {
        return API.post(API_URL + "preliminaries/accept", {id: id}).then((response) => {
            return response.data;
        });
    }
    getReports(page, filters) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(function(key) {
                const item = filters[key];
                if(Array.isArray(item) && item.length > 0 || (item['key'] !== null && item['key'] !== undefined)) {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'url' && item !== '') {
                    params.append(key, JSON.stringify(item));
                } else if(key === 'status' && item !== -1) {
                    params.append(key, JSON.stringify(item));
                }
            });
        }

        return API.get(API_URL + "reports?" + params.toString()).then((response) => {
            return response.data;
        });
    }
    deleteReport(id) {
        return API.delete(API_URL + "reports?id=" + id).then((response) => {
            return response.data;
        });
    }
}

export default new AdminService();

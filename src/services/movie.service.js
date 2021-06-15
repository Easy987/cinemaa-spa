import API from "@/api";
import movie from "@/store/modules/movie";

const API_URL = process.env.VUE_APP_API_URL + "/movies/";

class MovieService {
    getMoviesInfo(admin) {
        return API.get(API_URL + 'info' + (admin ? '?cinemaa-admin=1' : ''))
            .then((response) => {
                return response.data.data;
            });
    }
    getPremiers(type) {
        return API.get(API_URL + 'premiers/' + type)
            .then((response) => {
                return response.data;
            });
    }
    getHomeMovies(type) {
        return API.get(API_URL + type)
            .then((response) => {
                return response.data.data;
            });
    }
    getMovies(type, {page, filters, subType}) {
        const params = new URLSearchParams();

        if(page !== null) {
            params.append('page', page);
        }

        if(subType !== null) {
            params.append('type', subType);
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

        return API.get(API_URL + 'type/' + type + '?' + params.toString())
            .then((response) => {
                return response.data;
            });
    }
    getMovie(slug, year, length) {
        if(length === undefined) {
            return API.get(API_URL + 'movie/' + slug + '/' + year).then((response) => {
                return response.data;
            });
        }

        return API.get(API_URL + 'movie/' + slug + '/' + year + '/' + length).then((response) => {
            return response.data;
        });
    }
    commentMovie(movie_id, comment) {
        return API.post(API_URL + 'comment', { movie_id: movie_id, comment: comment }).then((response) => {
            return response.data;
        });
    }
    rateComment(comment_id, type) {
        return API.post(API_URL + 'comment/like', { comment_id: comment_id, type: type }).then((response) => {
            return response.data;
        });
    }
    deleteComment(comment_id) {
        return API.post(API_URL + 'comment/delete', { comment_id: comment_id }).then((response) => {
            return response.data;
        });
    }
    rateMovie(movie_id, rating) {
        return API.post(API_URL + 'rate', { movie_id: movie_id, rating: rating }).then((response) => {
            return response.data;
        });
    }
    favouriteMovie(movie_id) {
        return API.post(API_URL + 'favourite', { movie_id: movie_id }).then((response) => {
            return response.data;
        });
    }
    toBeWatchedMovie(movie_id) {
        return API.post(API_URL + 'to_be_watched', { movie_id: movie_id }).then((response) => {
            return response.data;
        });
    }
    watchedMovie(movie_id) {
        return API.post(API_URL + 'watched', { movie_id: movie_id }).then((response) => {
            return response.data;
        });
    }
    getPopMovies() {
        return API.get(API_URL + 'popularAll').then((response) => {
            return response.data;
        });
    }
    checkMovie(imdb_id) {
        const params = new URLSearchParams();

        if(imdb_id.length > 0) {
            params.append('imdb', imdb_id);
        }

        return API.get(API_URL + 'upload/check?' + params.toString()).then((response) => {
            return response.data;
        });
    }
    sendReport(id, type, movie_id, message) {
        return API.post(API_URL + 'report', { id: id, type: type, movie_id: movie_id, message: message }).then((response) => {
            return response.data;
        });
    }
    uploadMovie(movie, new_movie, empty) {
        return API.post(API_URL + 'upload', { movie: movie, new_movie: new_movie, empty: empty}).then((response) => {
            return response.data;
        });
    }
    submitLink(movie, links) {
        return API.post(API_URL + 'submitLink', { movie: movie, links: links}).then((response) => {
            return response.data;
        });
    }
}

export default new MovieService();

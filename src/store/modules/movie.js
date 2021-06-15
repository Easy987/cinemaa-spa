import MovieService from "@/services/movie.service";
import AuthService from "@/services/auth.service";

const movie = {
    namespaced: true,
    name: "movie",
    state: {
        moviesInfo: {},
        homeMovies: {
            'top': [],
            'popular': []
        },
        premierMovies: {
            'movies': [],
            'series': []
        },
        recommendMovies: {
            'premiers': [],
            'dvd': [],
            'series': []
        },
        popularMovies: {
            'movies': [],
            'series': [],
        },
        all: {},
        movies: {},
        series: {},
        favourites: {},
        watcheds: {},
        toBeWatcheds: {},
        movie: {}
    },
    getters: {
        popMovies(state) {
            return state.popularMovies;
        },
        moviesInfo(state) {
            return state.moviesInfo;
        },
        topMovies(state) {
            return state.homeMovies.top;
        },
        popularMovies(state) {
            return state.homeMovies.popular;
        },

        premiersMovies(state) {
            return state.premierMovies.movies;
        },

        premiersSeries(state) {
            return state.premierMovies.series;
        },

        premierMovies(state) {
            return state.recommendMovies.premiers;
        },
        dvdMovies(state) {
            return state.recommendMovies.dvd;
        },
        seriesMovies(state) {
            return state.recommendMovies.series;
        },
        all(state) {
            return state.all;
        },
        movies(state) {
            return state.movies;
        },
        series(state) {
            return state.series;
        },
        favourites(state) {
            return state.favourites;
        },
        toBeWatcheds(state) {
            return state.toBeWatcheds;
        },
        movie(state) {
            return state.movie;
        }
    },
    actions: {
        getMoviesInfo({commit}, {admin}) {
            return MovieService.getMoviesInfo(admin).then((response) => {
                commit("setMoviesInfo", response);
                return Promise.resolve(response);
            }).catch((error) => {
                return Promise.reject(error);
            });
        },
        getHomeMovies({commit}) {
            return new Promise((resolve, reject) => {
                Promise.all([
                    MovieService.getHomeMovies('top').then((response) => {
                        commit("setHomeMovies", {type: 'top', movies: response});
                    }),
                    MovieService.getHomeMovies('popular').then((response) => {
                        commit("setHomeMovies", {type: 'popular', movies: response});
                    })
                ]).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        },

        getPremiersMovies({commit}) {
            return MovieService.getHomeMovies('premiers/movies').then((response) => {
                commit("setPremiersMovies", {type: 'movies', movies: response});
            });
        },

        getPremiersSeries({commit}) {
            return MovieService.getHomeMovies('premiers/series').then((response) => {
                commit("setPremiersMovies", {type: 'series', movies: response});
            });
        },

        getMovies({commit}, {page, filters, subType}) {
            return MovieService.getMovies('movies', {page: page, filters: filters, subType: subType}).then(
                (response) => {
                    commit("setMovies", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        getSeries({commit}, {page, filters, subType}) {
            return MovieService.getMovies('series', {page: page, filters: filters, subType: subType}).then(
                (response) => {
                    commit("setSeries", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        getAll({commit}, {page, filters, subType}) {
            return MovieService.getMovies('all', {page: page, filters: filters, subType: subType}).then(
                (response) => {
                    commit("setAll", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        getFavourites({commit}, {page, filters, subType}) {
            return MovieService.getMovies('favourites', {page: page, filters: filters, subType: subType}).then(
                (response) => {
                    commit("setFavourites", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        getToBeWatcheds({commit}, {page, filters, subType}) {
            return MovieService.getMovies('to_be_watcheds', {page: page, filters: filters, subType: subType}).then(
                (response) => {
                    commit("setToBeWatcheds", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        getRecommendMovies({commit}) {
            return new Promise((resolve, reject) => {
                Promise.all([
                    MovieService.getHomeMovies('recommends/premiers').then((response) => {
                        commit("setRecommendMovies", {type: 'premiers', movies: response});
                    }),
                    MovieService.getHomeMovies('recommends/dvd').then((response) => {
                        commit("setRecommendMovies", {type: 'dvd', movies: response});
                    }),
                    MovieService.getHomeMovies('recommends/series').then((response) => {
                        commit("setRecommendMovies", {type: 'series', movies: response});
                    })
                ]).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        },
        getMovie({commit}, {slug, year, length}) {
            return MovieService.getMovie(slug, year, length).then(
                (response) => {
                    commit("setMovie", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        commentMovie({commit}, {movie_id, comment}) {
            return MovieService.commentMovie(movie_id, comment).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        rateComment({commit}, {comment_id, type}) {
            return MovieService.rateComment(comment_id, type).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        deleteComment({commit}, {comment_id}) {
            return MovieService.deleteComment(comment_id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        rateMovie({commit}, {movie_id, rating}) {
            return MovieService.rateMovie(movie_id, rating).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        favouriteMovie({commit}, {movie_id}) {
            return MovieService.favouriteMovie(movie_id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        toBeWatchedMovie({commit}, {movie_id}) {
            return MovieService.toBeWatchedMovie(movie_id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        watchedMovie({commit}, {movie_id}) {
            return MovieService.watchedMovie(movie_id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        getPopMovies({commit}) {
            return MovieService.getPopMovies().then(
                (response) => {
                    commit("setPopMovies", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        checkMovie({commit}, {imdb_id}) {
            return MovieService.checkMovie(imdb_id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        sendReport({commit}, {id, type, movie_id, message}) {
            return MovieService.sendReport(id, type, movie_id, message).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        uploadMovie({commit}, {movie, new_movie, empty}) {
            return MovieService.uploadMovie(movie, new_movie, empty).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        submitLink({commit}, {movie_id, links}) {
            return MovieService.submitLink(movie_id, links).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        setHomeMovies(state, {type, movies}) {
            state.homeMovies[type] = movies;
        },
        setPremiersMovies(state, {type, movies}) {
            state.premierMovies[type] = movies;
        },
        setPopMovies(state, movies) {
            state.popularMovies = movies;
        },
        setRecommendMovies(state, {type, movies}) {
            state.recommendMovies[type] = movies;
        },
        setMoviesInfo(state, info) {
            state.moviesInfo = info;
        },
        setAll(state, all) {
            state.all = all;
        },
        setMovies(state, movies) {
            state.movies = movies;
        },
        setSeries(state, series) {
            state.series = series;
        },
        setFavourites(state, favourites) {
            state.favourites = favourites;
        },
        setToBeWatcheds(state, toBeWatcheds) {
            state.toBeWatcheds = toBeWatcheds;
        },
        setMovie(state, movie) {
            state.movie = movie;
        }
    },
};

export default movie;

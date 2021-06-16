<template>
    <div :class="classes">
        <div class="card">
            <div class="card__cover" :class="{'watched': movie.watched_by_user}">
                <img :src="movie.poster" alt=""/>
                <router-link class="card__play" :to="{ name: movie.type === 0 ? 'movie' : 'serie', params: { lang: $t('navTexts.' + (movie.type === 0 ? 'movie' : 'serie')), slug: movie.slugs[$i18n.locale], year: movie.year, length: movie.length} }"><i class="icon ion-ios-play"></i></router-link>
                <div class="movie-detail movie-detail-title">
                    <div class="w-100">{{ $t('base.year') }}: {{ movie.year }}</div>
                    <div class="w-100">{{ $t('base.running_time') }}: {{ movie.length }} {{ $t('base.min') }}</div>
                    <div class="w-100">{{ $t('base.imdb') }}: {{ movie.imdb_rating }}</div>
                    <div v-if="movie.rating" class="w-100">{{ $t('base.rating') }}: {{ movie.rating }}</div>
                </div>
                <div class="movie-detail-flag" v-if="movie && movie.highest_quality && movie.highest_quality.length">
                    <div v-for="(name, index) in movie.highest_quality" v-bind:key="index">
                        <img v-if="name.name !== 'other'" style="height: 20px; width: 40px;" :src="'/img/flags/'+name.name+'.png'">
                    </div>
                </div>
                <div class="movie-detail-buttons">
                    <button v-b-popover.hover.bottom="''" :title="loggedIn() ? $t('base.mark_watched') : $t('base.need_login')" @click="watchedMovie"><img style="width: 32px;" src="/img/watched.png" alt=""></button>
                </div>
                <div class="movie-detail-heart" v-if="type === 'favourites' || type === 'toBeWatcheds'">
                    <button @click="type === 'favourites' ? favouriteMovie() : toBeWatchedMovie()"><font-awesome-icon icon="times" size="2x" /></button>
                </div>
                <span :class="getMovieCardRatingClass(movie.imdb_rating)">{{ movie.imdb_rating}}</span>
            </div>
            <div class="card__content">
                <h3 class="card__title text-center">
                    <router-link :to="{ name: movie.type === 0 ? 'movie' : 'serie', params: { lang: $t('navTexts.' + (movie.type === 0 ? 'movie' : 'serie')), slug: movie.slugs[$i18n.locale], year: movie.year, length: movie.length} }">{{ movie.titles[$i18n.locale] }}</router-link>
                </h3>
                <span class="card__category">
                    <a href="#" v-for="(genre, index) in movie.genres" v-bind:key="index">{{ $t('genres.' + genre.key) }}</a>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.watched {
    border: 1px solid #f77f00;
}
</style>

<script>

import "@/utils/helper";

export default {
    name: "MovieCard",

    props: {
        type: {
            type: String,
            default: '',
        },
        movie: {
            type: Object,
            default: () => {
                return {};
            }
        },
        classes: {
            type: String,
            default: 'col-6 col-sm-4 col-md-3 col-xl-2'
        }
    },
    methods: {
        favouriteMovie()
        {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/favouriteMovie', {movie_id: this.movie.id}).then((response) => {
                    this.movie = response.data;

                    if(this.movie.favourited_by_user) {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.favourite_successful'),
                                type: 'success'
                            }
                        );
                    }

                    this.$emit('refresh');

                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.error'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        toBeWatchedMovie()
        {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/toBeWatchedMovie', {movie_id: this.movie.id}).then((response) => {
                    this.movie = response.data;

                    if(this.movie.to_be_watched_by_user) {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.to_be_watched_successful'),
                                type: 'success'
                            }
                        );
                    }

                    this.$emit('refresh');

                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.error'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        watchedMovie()
        {
            console.log(1);
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/watchedMovie', {movie_id: this.movie.id}).then((response) => {
                    this.movie = response.data;

                    if(this.movie.watched_by_user) {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.watched_successful'),
                                type: 'success'
                            }
                        );
                    }

                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.error'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        }
    }
};
</script>

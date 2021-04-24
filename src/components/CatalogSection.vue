<template>
    <section>
        <section class="content" style="padding-bottom: 0px;">
            <div class="content__head">
                <div class="container">
                    <div class="row mt-4">
                        <movie-card @refresh="sendRefresh" :type="type" v-for="(movie, index) in this.movies.data" v-bind:key="index" :movie="movie"></movie-card>
                    </div>

                    <!-- paginator -->
                    <div v-if="this.movies.data && this.movies.data.length > 0" class="col-12 mb-5">
                        <ul v-if="Object.keys(this.movies).length > 0" class="paginator">
                            <li v-if="this.movies.links.first !== this.movies.links.last && this.movies.meta.current_page !== 1" class="paginator__item paginator__item--next">
                                <a @click="navigation(movies.links.first)"><font-awesome-icon icon="angle-double-left" /></a>
                            </li>

                            <li v-if="this.movies.meta.current_page !== 1" class="paginator__item paginator__item-prev">
                                <a @click="navigation(movies.links.prev)"><font-awesome-icon icon="angle-left" /></a>
                            </li>

                            <li v-if="this.movies.meta.current_page === 1" class="paginator__item paginator__item--active">
                                <a>{{ this.movies.meta.current_page }}</a>
                            </li>
                            <li v-if="this.movies.meta.current_page === 1 && this.movies.links.next !== null" class="paginator__item">
                                <a @click="navigation(nextNPage(1))">{{ this.movies.meta.current_page+1 }}</a>
                            </li>
                            <li v-if="this.movies.meta.current_page === 1 && this.movies.meta.last_page > 2" class="paginator__item">
                                <a @click="navigation(nextNPage(2))">{{ this.movies.meta.current_page+2 }}</a>
                            </li>


                            <li v-if="this.movies.meta.current_page > 1 && this.movies.meta.current_page < this.movies.meta.last_page" class="paginator__item">
                                <a @click="navigation(previousNPage(1))">{{ this.movies.meta.current_page-1 }}</a>
                            </li>

                            <li v-if="this.movies.meta.current_page > 1 && this.movies.meta.current_page < this.movies.meta.last_page" class="paginator__item paginator__item--active">
                                <a>{{ this.movies.meta.current_page }}</a>
                            </li>

                            <li v-if="this.movies.meta.current_page > 1 && this.movies.meta.current_page < this.movies.meta.last_page" class="paginator__item">
                                <a @click="navigation(nextNPage(1))">{{ this.movies.meta.current_page+1 }}</a>
                            </li>


                            <li v-if="this.movies.meta.current_page === this.movies.meta.last_page && this.movies.meta.current_page-2 >= 1 && this.movies.links.prev" class="paginator__item">
                                <a @click="navigation(previousNPage(2))">{{ this.movies.meta.current_page-2 }}</a>
                            </li>
                            <li v-if="this.movies.meta.current_page === this.movies.meta.last_page && this.movies.links.prev !== null" class="paginator__item">
                                <a @click="navigation(previousNPage(1))">{{ this.movies.meta.current_page-1 }}</a>
                            </li>
                            <li v-if="this.movies.meta.current_page === this.movies.meta.last_page && this.movies.meta.current_page !== 1" class="paginator__item paginator__item--active">
                                <a>{{ this.movies.meta.current_page }}</a>
                            </li>


                            <li v-if="this.movies.meta.current_page !== this.movies.meta.last_page" class="paginator__item paginator__item--next">
                                <a @click="navigation(movies.links.next)"><font-awesome-icon icon="angle-right" /></a>
                            </li>

                            <li v-if="this.movies.links.first !== this.movies.links.last && this.movies.meta.current_page !== this.movies.meta.last_page" class="paginator__item paginator__item--next">
                                <a @click="navigation(movies.links.last)"><font-awesome-icon icon="angle-double-right" /></a>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="mb-5 text-center">
                        <p class="section__text">{{ this.$t('messages.no_movies_found') }}</p>
                    </div>
                    <!-- end paginator -->
                </div>
            </div>
        </section>
    </section>
</template>

<script>

import MovieCard from "@/components/MovieCard";

export default {
    name: "CatalogSection",
    components: {MovieCard},
    props: {
        type: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        movies: {
            type: Object,
            default: () => {
                return {};
            }
        },
        genres: {
            type: Array,
            default: () => {
                return [];
            }
        },
        qualities: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },

    methods: {
        navigation(url) {
            this.$emit('navigation', url);
        },
        sendRefresh() {
            this.$emit('refresh');
        },
        replaceUrlParam(url, paramName, paramValue) {
            if (paramValue == null) {
                paramValue = '';
            }
            var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
            if (url.search(pattern)>=0) {
                return url.replace(pattern,'$1' + paramValue + '$2');
            }
            url = url.replace(/[?#]$/,'');
            return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
        },
        previousNPage(n) {
            let url = this.movies.meta.path;
            url = this.replaceUrlParam(url, 'page', this.movies.meta.current_page - n);
            return url;
        },
        nextNPage(n) {
            let url = this.movies.meta.path;
            url = this.replaceUrlParam(url, 'page', this.movies.meta.current_page + n);
            return url;
        }
    },


};
</script>

<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.recommends')"></PageTitle>
        <section>
            <div class="container">
                <div class="row">
                    <div class="content" :class="{'m-auto': this.$screen.width <= 480}">
                        <!-- profile -->
                        <div class="profile">
                                    <div class="col-12 pb-3">
                                        <div class="profile__content">
                                            <!-- content tabs nav -->
                                            <ul class="nav nav-tabs content__tabs content__tabs--profile" id="content__tabs" role="tablist">
                                                <li class="nav-item">
                                                    <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedTab === 0}" @click="switchTab(0)">{{ $t('pages.recommends.premiers') }}</a>
                                                </li>

                                                <li class="nav-item">
                                                    <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedTab === 1}" @click="switchTab(1)">{{ $t('pages.recommends.dvd') }}</a>
                                                </li>

                                                <li class="nav-item">
                                                    <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedTab === 2}" @click="switchTab(2)">{{ $t('pages.recommends.series') }}</a>
                                                </li>
                                            </ul>
                                            <!-- end content tabs nav -->
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
                <Adsense
                    class="text-center pt-3 pb-3"
                    data-ad-client="ca-pub-3890640160453569"
                    data-ad-slot="2375609994"
                    data-ad-format="auto"
                    data-full-width-responsive="true">
                </Adsense>
            </div>
        </section>
        <section class="content" style="padding-bottom: 0px;">
            <div class="content__head">
                <div class="container">
                    <div class="row mt-4">
                        <movie-card v-for="(movie, index) in getMoviesForPage()" v-bind:key="index" :movie="movie"></movie-card>
                    </div>
                </div>

                <!-- paginator -->
                <div class="col-12 mb-5">
                    <ul class="paginator">
                        <li :class="{' paginator__item--active': this.selectedPage === 0}" class="paginator__item">
                            <a @click="switchPage(0);">1</a>
                        </li>
                        <li v-if="getMoviesForPage(true) > 18" :class="{' paginator__item--active': this.selectedPage === 1}" class="paginator__item">
                            <a @click="switchPage(1);">2</a>
                        </li>
                    </ul>
                </div>
                <!-- end paginator -->
            </div>
        </section>
        <Adsense
            class="text-center pt-3 pb-3"
            data-ad-client="ca-pub-3890640160453569"
            data-ad-slot="9059882935"
            data-ad-format="auto"
            data-full-width-responsive="true">
        </Adsense>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import MovieCard from "@/components/MovieCard";
import {mapGetters} from "vuex";
import PageTitle from "@/components/PageTitle";

export default {
    name: "Recommends",
    components: {
        PageTitle,
        Header,
        Footer,
        MovieCard
    },

    computed: {
        ...mapGetters("movie", [
            "premierMovies",
            "dvdMovies",
            "seriesMovies"
        ]),
    },

    data() {
        return {
            selectedTab: 0,
            selectedPage: 0,
            movies: []
        }
    },

    created() {
        if(this.premierMovies && this.premierMovies.length === 0) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/getRecommendMovies').then(() => {
                this.$emit('loadingUpdated', false);
            });
        }
    },

    methods: {
        switchPage(page) {
            this.selectedPage = page;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        navigation(url) {
            if(url !== null) {
                this.selectedPage = url.split('=')[1];
            }
        },
        switchTab(num) {
            this.selectedTab = num;
        },
        getMoviesForPage(count=false) {
            let movies = this.premierMovies;
            switch(this.selectedTab) {
                case 0:
                    movies = this.premierMovies;
                    break;
                case 1:
                    movies = this.dvdMovies;
                    break;
                case 2:
                    movies = this.seriesMovies;
                    break;
            }

            if(count) {
                return movies.length;
            }

            if(this.selectedPage === 0) {
                return movies.slice(0, 18);
            } else {
                return movies.slice(18, 36);
            }
        }
    }

};
</script>

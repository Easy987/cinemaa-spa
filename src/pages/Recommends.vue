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
                                                    <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedPage === 0}" @click="switchTab(0)">{{ $t('pages.recommends.premiers') }}</a>
                                                </li>

                                                <li class="nav-item">
                                                    <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedPage === 1}" @click="switchTab(1)">{{ $t('pages.recommends.dvd') }}</a>
                                                </li>

                                                <li class="nav-item">
                                                    <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedPage === 2}" @click="switchTab(2)">{{ $t('pages.recommends.series') }}</a>
                                                </li>
                                            </ul>
                                            <!-- end content tabs nav -->
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="content" style="padding-bottom: 0px;">
            <div class="content__head">
                <div class="container">
                    <div class="row mt-4">
                        <movie-card v-for="(movie, index) in getMoviesForPage(this.selectedPage)" v-bind:key="index" :movie="movie"></movie-card>
                    </div>
                </div>
            </div>
        </section>
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
        switchTab(num) {
            this.selectedPage = num;
        },
        getMoviesForPage(num) {
            switch(num) {
                case 0:
                    return this.premierMovies;
                case 1:
                    return this.dvdMovies;
                case 2:
                    return this.seriesMovies;
            }
        }
    }

};
</script>

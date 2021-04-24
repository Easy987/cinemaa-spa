<template>
    <section class="home" :class="{'mt-0': !this.hasMargin}">
        <carousel autoWidth :class="{'home__bg': this.hasBackground}">
            <div class="home__cover"><p></p></div>
        </carousel>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="home__title" v-html="title"></h1>

                    <button class="home__nav home__nav--prev" type="button" @click="previousSlide">
                        <i class="icon ion-ios-arrow-round-back"></i>
                    </button>

                    <button class="home__nav home__nav--next" type="button" @click="nextSlide">
                        <i class="icon ion-ios-arrow-round-forward"></i>
                    </button>
                </div>

                <div class="col-12">
                    <carousel v-if="this.movies.length" ref="home_carousel" :dots="false" :loop="true" :nav="true" :autoplay="true" :autoplayHoverPause="true" :autoplayTimeout="2000"
                              :responsive="{
                            0: { items: 2, nav: false },
                            600: { items: 5, nav: false },
                        }" class="home__carousel" v-bind:items="5" v-bind:margin="40">
                        <movie-card classes="card--big" v-for="(movie, index) in movies" v-bind:key="index" :movie="movie"></movie-card>
                    </carousel>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import carousel from "vue-owl-carousel";
import MovieCard from "@/components/MovieCard";

export default {
    name: "MovieCarouselSection",

    components: {
        carousel,
        MovieCard
    },

    props: {
        title: {
            type: String,
            default: ''
        },
        movies: {
            type: Array,
            default: () => {
                return [];
            }
        },
        hasMargin: {
            type: Boolean,
            default: true
        },
        hasBackground: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        nextSlide() {
            this.$refs.home_carousel.$el.children[2].click();
        },
        previousSlide() {
            this.$refs.home_carousel.$el.children[0].click();
        },
    }
};
</script>
<style scoped>
.watched {
    border: 1px solid #f77f00;
}
</style>

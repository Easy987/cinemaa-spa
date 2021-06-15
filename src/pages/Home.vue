<template>
    <div>
        <Header></Header>
        <MovieCarouselSection :title="this.$t('pages.home.new_items_of_the_season')" :movies="this.topMovies"></MovieCarouselSection>
        <section class="content" style="padding-bottom: 0px;">
            <div class="content__head">
                <div class="container">
                    <Adsense
                        class="text-center"
                        data-ad-client="ca-pub-3890640160453569"
                        data-ad-slot="2375609994"
                        data-ad-format="auto"
                        data-full-width-responsive="true">
                    </Adsense>
                    <div class="row">
                        <div class="col-12">
                            <!-- content title -->
                            <h2 class="content__title">
                                {{ this.$t("pages.home.new_items") }}
                            </h2>
                            <!-- end content title -->

                            <div class="row mt-4">
                                <movie-card v-for="(movie, index) in this.popularMovies" v-bind:key="index" :movie="movie"></movie-card>
                            </div>
                            <!-- end content tabs nav -->
                        </div>
                    </div>
                    <Adsense
                        class="text-center pt-3"
                        data-ad-client="ca-pub-3890640160453569"
                        data-ad-slot="9059882935"
                        data-ad-format="auto"
                        data-full-width-responsive="true">
                    </Adsense>
                </div>
            </div>
        </section>

        <InformationSection
            :texts="this.$t('texts.welcome_text')"
            :title="this.$t('pages.home.information')"
        ></InformationSection>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import MovieCarouselSection from "@/components/MovieCarouselSection";
import InformationSection from "@/components/InformationSection";
import {mapGetters} from "vuex";
import MovieCard from "@/components/MovieCard";

export default {
    name: "Home",
    components: {
        Header,
        Footer,
        MovieCarouselSection,
        MovieCard,
        InformationSection
    },

    computed: {
        ...mapGetters("movie", [
            "topMovies",
            "popularMovies"
        ]),
    },

    data() {
        return {
            loading: false,
        }
    },

    created() {
        if(this.$route.params.admin) {
            this.$router.go();
        }

        if(this.topMovies && this.topMovies.length === 0) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/getHomeMovies').then(() => {
                this.$emit('loadingUpdated', false);
            });
        }
    }
};
</script>

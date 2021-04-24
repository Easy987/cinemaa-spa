<template>
    <section class="content" style="padding-bottom: 0px;">
        <div class="content__head">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- content title -->
                        <h2 class="content__title">
                            {{ this.$t("pages.home.new_items") }}
                        </h2>
                        <!-- end content title -->

                        <!-- content tabs nav -->
                        <b-tabs content-class="mt-5" nav-class="content__tabs">
                            <b-tab v-for="(item, index) in items" v-bind:key="index" :title="item.title" active>
                                <div class="row">
                                    <movie-card v-for="(movie, index) in item.movies" v-bind:key="index" :movie="movie"></movie-card>
                                </div>
                            </b-tab>
                        </b-tabs>
                        <!-- end content tabs nav -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import "@/utils/helper";
import MovieCard from "@/components/MovieCard";

export default {
    name: "MovieListSection",

    components: {
        MovieCard
    },

    props: {
        items: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
};
</script>

<style scoped></style>

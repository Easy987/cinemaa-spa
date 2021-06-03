<template>
    <div>
        <Header></Header>
        <main class="main">
            <div class="container-fluid">
                <div class="row row--grid" v-if="info && Object.keys(this.info).length > 0">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Kezdőlap</h2>
                        </div>
                    </div>
                    <!-- end main title -->
                    <!-- stats -->
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="stats">
                            <span>Adatlap megtekintések</span>
                            <p>{{ info.movies_views.toLocaleString() }}</p>
                            <i class="icon ion-ios-stats"></i>
                        </div>
                    </div>
                    <!-- end stats -->

                    <!-- stats -->
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="stats">
                            <span>Adatlapok</span>
                            <p>{{ info.movies_count.toLocaleString() }}</p>
                            <i class="icon ion-ios-film"></i>
                        </div>
                    </div>
                    <!-- end stats -->

                    <!-- stats -->
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="stats">
                            <span>Kommentek</span>
                            <p>{{ info.comments_count.toLocaleString() }}</p>
                            <i class="icon ion-ios-chatbubbles"></i>
                        </div>
                    </div>
                    <!-- end stats -->

                    <!-- stats -->
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="stats">
                            <span>Felhasználók</span>
                            <p>{{ info.users_count.toLocaleString() }}</p>
                            <i class="icon ion-ios-star-half"></i>
                        </div>
                    </div>
                    <!-- end stats -->
                </div>
            </div>
            <Adsense
                class="text-center pt-3"
                data-ad-client="ca-pub-3890640160453569"
                data-ad-slot="9059882935"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </Adsense>
        </main>
    </div>
</template>

<script>
import Header from "@/components/includes/admin/Header";
import {mapGetters} from "vuex";

export default {
    name: "Admin",
    components: {
        Header,
    },

    computed: {
        ...mapGetters("admin", [
            "info",
        ]),
    },

    data() {
        return {

        }
    },

    created() {
        if((this.info && Object.keys(this.info).length === 0)) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/getInfo').then((res) => {
                this.$emit('loadingUpdated', false);
            });
        }
    }
};
</script>

<template>
    <div>
        <Header></Header>
        <main class="main" v-if="preliminaries">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Előzetesek</h2>

                            <span class="main__title-stat">{{ preliminaries.meta.total }} összesen</span>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- preliminaries -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive scroll-area mb-2" v-scrollbar="{alwaysShowTracks: true}">
                                <table class="main__table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NÉV</th>
                                    <th>URL</th>
                                    <th>SZERKESZTÉS</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(preliminary, index) in preliminaries.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="preliminary.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ preliminary.movie.titles['hu'] }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ preliminary.youtube_id }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <button type="button" @click="openVideo(preliminary.youtube_id)" class="main__table-btn main__table-btn--view ml-2" v-b-popover.hover.bottom="''" title="Link megtekintése">
                                                    <i class="icon ion-ios-open"></i>
                                                </button>
                                                <button @click="acceptPreliminary(preliminary.id)" class="main__table-btn main__table-btn--banned open-modal" v-b-popover.hover.bottom="''" title="Előzetes elfogadása">
                                                    <i class="icon ion-ios-checkmark"></i>
                                                </button>
                                                <button @click="deletePreliminary(preliminary.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Előzetes törlése">
                                                    <i class="icon ion-ios-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <!-- end preliminaries -->
                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="preliminaries" not-found-text="Nem található előzetes beküldés."></navigator>
                        </div>
                    </div>
                    <!-- end paginator -->
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from "@/components/includes/admin/Header";
import Navigator from "@/components/pageComponents/Navigator";
import {mapGetters} from "vuex";

export default {
    name: "Admin",
    components: {
        Header,
        Navigator
    },

    computed: {
        ...mapGetters("admin", [
            "preliminaries",
        ]),
    },

    data()
    {
        return {
            filter: {
                name: '',
                role: []
            },
        };
    },

    created() {
        if((this.preliminaries && Object.keys(this.preliminaries).length === 0) || this.$route.params.page !== this.preliminaries.meta.current_page) {
            this.getPreliminaries(this.$route.params.page, this.filters);
        }
    },

    methods: {
        openVideo(id) {
            window.open("https://www.youtube.com/watch?v=" + id,
                '_blank');
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: 'admin-preliminaries', params: { page: page }})
            }
        },
        getPreliminaries(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filter: this.filter};

            this.$store.dispatch('admin/getPreliminaries', payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        acceptPreliminary(preliminary) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/acceptPreliminary', {preliminary: preliminary}).then((res) => {
                this.$store.dispatch('user/sendToast', {
                        message: 'Előzetes sikeresen elfogadva.',
                        type: 'success'
                    }
                );

                this.getPreliminaries(this.$route.params.page, this.filters);

                this.$emit('loadingUpdated', false);
            });
        },
        deletePreliminary(id) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deletePreliminary', {preliminary: id}).then(() => {
                this.$store.dispatch('user/sendToast', {
                        message: 'Előzetes sikeresen törölve.',
                        type: 'success'
                    }
                );
                this.getPreliminaries(this.$route.params.page, this.filters);

                this.$emit('loadingUpdated', false);
            });
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getPreliminaries(to.params.page);
                }
            },
            immediate: true
        },
    },
};
</script>

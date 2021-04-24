<template>
    <div>
        <Header></Header>
        <main class="main" v-if="sites">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Stream oldalak</h2>

                            <span class="main__title-stat">{{ sites.meta.total }} összesen</span>
                            <router-link :to="{ name: 'admin-site', params: {name: 'new'} }" class="main__title-link">
                                Létrehozás
                            </router-link>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- sites -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive">
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
                                    <tr v-for="(site, index) in sites.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="site.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ site.name }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ site.url }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <router-link :to="{ name: 'admin-site', params: {name: site.name} }" class="main__table-btn main__table-btn--edit" v-b-popover.hover.bottom="''" title="Oldal szerkesztése">
                                                    <i class="icon ion-ios-create"></i>
                                                </router-link>
                                                <button v-if="hasPermission('admin.sites.delete')" @click="deleteSite(site.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Oldal törlése">
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
                    <!-- end sites -->
                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="sites" not-found-text="Nem található stream oldal"></navigator>
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
            "sites",
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
        if((this.sites && Object.keys(this.sites).length === 0) || this.$route.params.page !== this.sites.meta.current_page) {
            this.getSites(this.$route.params.page, this.filters);
        }
    },

    methods: {
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: 'admin-sites', params: { page: page }})
            }
        },
        getSites(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filter: this.filter};

            this.$store.dispatch('admin/getSites', payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        deleteSite(id) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteSite', {id: id}).then(() => {
                this.$store.dispatch('user/sendToast', {
                        message: 'Oldal sikeresen törölve.',
                        type: 'success'
                    }
                );
                this.$emit('loadingUpdated', false);
            });
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getSites(to.params.page);
                }
            },
            immediate: true
        },
    },
};
</script>

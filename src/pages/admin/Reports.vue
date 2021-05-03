<template>
    <div>
        <Header></Header>
        <main class="main" v-if="reports">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Bejelentések</h2>

                            <span class="main__title-stat">{{ reports.meta.total }} összesen</span>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- reports -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive">
                                <table class="main__table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ADATLAP</th>
                                    <th>TIPUS</th>
                                    <th>BEKÜLDŐ</th>
                                    <th>BEKÜLDÉS DÁTUMA</th>
                                    <th>SZERKESZTÉS</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(report, index) in reports.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="report.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text"><router-link target="_blank" :to="{ name: report.movie.type === 0 ? 'movie' : 'serie', params: { lang: $t('navTexts.' + (report.movie.type === 0 ? 'movie' : 'serie')), slug: report.movie.slugs[$i18n.locale], year: report.movie.year} }">{{ report.movie.titles['hu'] }}</router-link></div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ report.type === 0 ? 'Link' : 'Előzetes' }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ report.user ? report.user.username : 'Ismeretlen' }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $moment(report.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <button type="button" @click="openLink(report.type === 0 ? report.reportable.link : ('https://www.youtube.com/watch?v='+report.reportable.youtube_id))" class="main__table-btn main__table-btn--view ml-2" v-b-popover.hover.bottom="''" title="Link megtekintése">
                                                    <i class="icon ion-ios-open"></i>
                                                </button>
                                                <button @click="deleteReport(report.id, false)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Bejelentés törlése">
                                                    <i class="icon ion-ios-trash"></i>
                                                </button>
                                                <button @click="deleteReport(report.id, true)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Link/Előzetes törlése">
                                                    <i class="icon ion-ios-remove-circle"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <!-- end reports -->
                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="reports" not-found-text="Nem található bejelentés"></navigator>
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
            "reports",
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
        if((this.reports && Object.keys(this.reports).length === 0) || this.$route.params.page !== this.reports.meta.current_page) {
            this.getReports(this.$route.params.page, this.filters);
        }
    },

    methods: {
        openLink(url) {
            window.open(url,
                '_blank');
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: 'admin-reports', params: { page: page }})
            }
        },
        getReports(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filter: this.filter};

            this.$store.dispatch('admin/getReports', payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        deleteReport(id, remove) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteReport', {report: id, remove: remove}).then(() => {
                if(remove) {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Bejelentés és link/előzetes sikeresen törölve.',
                            type: 'success'
                        }
                    );
                } else {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Bejelentés sikeresen törölve.',
                            type: 'success'
                        }
                    );
                }

                this.$emit('loadingUpdated', false);
            }).catch(() => {
                this.$emit('loadingUpdated', false);
            });
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getReports(to.params.page);
                }
            },
            immediate: true
        },
    },
};
</script>

<template>
    <div>
        <Header></Header>
        <main class="main" v-if="links">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Linkek</h2>

                            <span class="main__title-stat">{{ links.meta.total }} összesen</span>

                            <div class="main__title-wrap">
                                    <div class="filter" id="filter__sort">
                                        <span class="filter__item-label">Státusz:</span>

                                        <b-form-select @change="searchLink" style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="filter.status" :options="statusTypes"></b-form-select>
                                    </div>
                                    <!-- end search -->

                                    <form @submit.prevent="searchLink" class="main__title-form">
                                        <input v-model="filter.url" type="text" placeholder="Link keresése....">
                                        <button type="submit">
                                            <i class="icon ion-ios-search"></i>
                                        </button>
                                    </form>
                            </div>

                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- links -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive">
                                <table class="main__table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ADATLAP</th>
                                    <th>VIDEÓMEGOSZTÓ</th>
                                    <th>TIPUS</th>
                                    <th>NYELV</th>
                                    <th>LINK</th>
                                    <th>STÁTUSZ</th>
                                    <th>BEKÜLDŐ</th>
                                    <th>LÉTREHOZÁS DÁTUMA</th>
                                    <th>SZERKESZTÉS</th>
                                </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(link, index) in links.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="link.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">
                                                <router-link v-if="link.movie" target="_blank" :to="{ name: link.movie.type === 0 ? 'movie' : 'serie', params: { lang: $t('navTexts.' + (link.movie.type === 0 ? 'movie' : 'serie')), slug: link.movie.slugs[$i18n.locale], year: link.movie.year} }">{{ link.movie.titles['hu'] }}</router-link>
                                                <div v-else>
                                                    Ismeretlen
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ link.site ? link.site.name : 'Ismeretlen' }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $t('qualities.' + link.linkType.name) }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $t('languageTypes.' + link.languageType.name) }}</div>
                                        </td>
                                        <td style="max-width: 100px; overflow: hidden">
                                            <div class="main__table-text">{{ link.link }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text" :class="{'main__table-text--green' : link.status === '1', 'main__table-text--red': link.status === '2' || link.status === '3'}">{{ getLinkStatus(link.status) }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ link.user ? link.user.username : 'Ismeretlen' }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $moment(link.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <button @click="openLink(link.link)" class="main__table-btn main__table-btn--banned open-modal" v-b-popover.hover.bottom="''" title="Link megtekintése">
                                                    <i class="icon ion-ios-open"></i>
                                                </button>
                                                <button @click="blockLink(link.id)" class="main__table-btn main__table-btn--banned open-modal" v-b-popover.hover.bottom="''" title="Link elrejtése">
                                                    <i class="icon ion-ios-lock"></i>
                                                </button>
                                                <button @click="acceptLink(link.id)" class="main__table-btn main__table-btn--banned open-modal" v-b-popover.hover.bottom="''" title="Link elfogadása">
                                                    <i class="icon ion-ios-checkmark"></i>
                                                </button>
                                                <router-link :to="{ name: 'admin-link', params: {id: link.id} }" class="main__table-btn main__table-btn--edit" v-b-popover.hover.bottom="''" title="Link szerkesztése">
                                                    <i class="icon ion-ios-create"></i>
                                                </router-link>
                                                <button @click="deleteLink(link.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Link törlése">
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
                    <!-- end links -->

                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="links" not-found-text="Nem található link"></navigator>
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
            "links",
        ]),
    },

    data()
    {
        return {
            filter: {
                url: '',
                status: -1
            },
            statusTypes: [
                { value: -1, text: 'Összes' },
                { value: 0, text: 'Megerősítésre vár' },
                { value: 1, text: 'Nyilvános' },
                { value: 2, text: 'Rejtett' },
                { value: 3, text: 'Rendszer által kiszűrt' },
            ]
        };
    },

    created() {
        if((this.links && Object.keys(this.links).length === 0) || this.$route.params.page !== this.links.meta.current_page) {
            this.getLinks(this.$route.params.page);
        }
    },

    methods: {
        getLinkStatus(status) {
            switch(status){
                case '0':
                    return 'Megerősítésre vár';
                case '1':
                    return "Nyilvános";
                case '2':
                    return "Rejtett";
                case '3':
                    return "Rendszer által kiszűrt";
            }
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.getLinks(page);
            }
        },
        openLink(url) {
            window.open(url,
                '_blank');
        },
        getLinks(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filter: this.filter};

            this.$store.dispatch('admin/getLinks', payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        blockLink(link) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/blockLink', {link: link}).then((res) => {
                this.$emit('loadingUpdated', false);
                if(res.data.status === '2') {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Link sikeresen elrejtve.',
                            type: 'success'
                        }
                    );
                } else {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Link sikeresen feloldva.',
                            type: 'success'
                        }
                    );
                }

            });
        },
        acceptLink(link) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/acceptLink', {link: link}).then((res) => {
                this.$emit('loadingUpdated', false);
                this.$store.dispatch('user/sendToast', {
                        message: 'Link sikeresen elfogadva.',
                        type: 'success'
                    }
                );
            });
        },
        searchLink() {
            this.$router.push({ name: 'admin-links', params: { page: '1' }});
            this.getLinks(1);
        },
        deleteLink(link) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteLink', {link: link}).then(() => {
                this.$emit('loadingUpdated', false);
                this.$store.dispatch('user/sendToast', {
                        message: 'Link sikeresen törölve.',
                        type: 'success'
                    }
                );
            });
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getLinks(to.params.page);
                }
            },
            immediate: true
        },
        'filter.status': {
            handler: function() {
                this.searchLink();
            },
            immediate: true,
            deep: true
        },
    },
};
</script>

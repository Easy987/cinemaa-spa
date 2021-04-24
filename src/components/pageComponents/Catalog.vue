<template>
    <div>
        <Header></Header>
        <PageTitle :title="title"></PageTitle>
        <FilterSection :type="this.type" :genres="this.getStaticOptions('genres')" :qualities="this.getStaticOptions('qualities')" @filter="filter"></FilterSection>
        <section v-if="subType">
            <div class="container">
                <div class="row">
                    <div class="col-12 pb-3">
                        <ul class="nav nav-tabs content__tabs content__tabs--profile" id="content__tabs" role="tablist">
                            <li class="nav-item">
                                <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedPage === 'new-links'}" @click="switchTab('new-links')">{{ $t('pages.movies.new-links') }}</a>
                            </li>

                            <li class="nav-item">
                                <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedPage === 'newest'}" @click="switchTab('newest')">{{ $t('pages.movies.newest') }}</a>
                            </li>

                            <li class="nav-item">
                                <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedPage === 'most-watched'}" @click="switchTab('most-watched')">{{ $t('pages.movies.most-watched') }}</a>
                            </li>

                            <li class="nav-item">
                                <a :class="{'clickable': true, 'nav-link': true, 'active': this.selectedPage === 'best'}" @click="switchTab('best')">{{ $t('pages.movies.best') }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <CatalogSection @refresh="refresh" :type="this.type" :movies="this.movies" :genres="this.getStaticOptions('genres')" :qualities="this.getStaticOptions('qualities')" @navigation="navigation"></CatalogSection>
        <Footer></Footer>
    </div>
</template>

<script>
import CatalogSection from "@/components/CatalogSection";
import PageTitle from "@/components/PageTitle";
import {mapGetters} from "vuex";
import FilterSection from "@/components/FilterSection";

export default {
    name: "Catalog",

    components: {
        FilterSection,
        PageTitle,
        CatalogSection
    },

    computed: {
        movies() {
            return this.$store.getters["movie/" + this.type];
        }
    },

    props: {
        type: {
            type: String,
            default: 'movies'
        },
        title: {
            type: String,
            default: '',
        },
        subType: {
            type: Boolean,
            default: true
        },
        filters: {
            type: Object,
            default: function() {
                const filter = localStorage.getItem(this.type + '_filter');

                if(filter && filter.length > 0) {
                    return JSON.parse(filter);
                }

                return {};
            }
        }
    },

    data() {
        return {
            selectedPage: 'new-links',
        };
    },

    methods: {
        refresh() {
            this.getMovies(this.$route.params.page, this.selectedPage);
        },
        filter(value) {
            this.filters = value;
            this.getMovies(this.$route.params.page, this.selectedPage);
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: this.type, params: { lang: this.$t('navTexts.' + this.type).toString(), page: page, type: this.$t('navTexts.' + this.selectedPage).toString()}})
            }
        },
        getMovies(page, type) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filters: this.filters};

            if(this.subType) {
                payload['subType'] = type;
            }

            this.$store.dispatch('movie/get' + this.capitalize(this.type), payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
         },
        switchTab(tab) {
            this.selectedPage = tab;

            this.$router.push({ name: this.type, params: { lang: this.$t('navTexts.' + this.type).toString(), page: '1', type: this.$t('navTexts.' + this.selectedPage).toString()}})
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page || from.params.type !== to.params.type || (from.name !== to.name))) {
                    this.getMovies(to.params.page, this.selectedPage);
                }
            },
            immediate: true
        },
    },

    created() {
        const currentType = this.$route.params.type;
        if(['new-links', 'uj-linkek'].includes(currentType)){
            this.selectedPage = 'new-links';
        } else if(['newest', 'legujabb'].includes(currentType)){
            this.selectedPage = 'newest';
        } else if(['most-watched', 'legnezettebb'].includes(currentType)){
            this.selectedPage = 'most-watched';
        } else if(['best', 'legjobb'].includes(currentType)){
            this.selectedPage = 'best';
        }

        if((this.movies && Object.keys(this.movies).length === 0) || this.$route.params.page !== this.movies.meta.current_page) {
            this.getMovies(this.$route.params.page, this.selectedPage);
        }
    }
};
</script>

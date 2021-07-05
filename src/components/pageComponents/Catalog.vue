<template>
    <div>
        <Header></Header>
        <MovieCarouselSection :type="this.type" :title="this.$t('pages.home.new_items_of_the_season')" :movies="this.premiers"></MovieCarouselSection>
        <div class="container pt-5">
            <div class="row">
                <div class="col-12">
                    <div class="section__wrap">
                        <!-- section title -->
                        <h2 class="section__title">{{ title }}</h2>
                        <!-- end section title -->
                    </div>
                </div>
            </div>
        </div>
        <FilterSection :type="this.type" :genres="this.getStaticOptions('genres')" :qualities="this.getStaticOptions('qualities')" :languages="this.getStaticOptions('languageTypes')" @filter="filter"></FilterSection>
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
        <Adsense
            class="text-center pt-3 pb-3"
            data-ad-client="ca-pub-3890640160453569"
            data-ad-slot="2375609994"
            data-ad-format="auto"
            :data-ad-region="this.type + randomNumber(0, 200)"
            data-full-width-responsive="true">
        </Adsense>
        <CatalogSection @refresh="refresh" :type="this.type" :movies="this.movies" :genres="this.getStaticOptions('genres')" :qualities="this.getStaticOptions('qualities')" @navigation="navigation"></CatalogSection>
        <Adsense
            class="text-center pt-3 pb-3"
            data-ad-client="ca-pub-3890640160453569"
            data-ad-slot="9059882935"
            data-ad-format="auto"
            :data-ad-region="this.type + randomNumber(0, 200)"
            data-full-width-responsive="true">
        </Adsense>
        <Footer></Footer>
    </div>
</template>

<script>
import CatalogSection from "@/components/CatalogSection";
import {mapGetters} from "vuex";
import MovieCarouselSection from "@/components/MovieCarouselSection";
import FilterSection from "@/components/FilterSection";
import {capitalize} from "@/utils/helper";

export default {
    name: "Catalog",

    components: {
        FilterSection,
        CatalogSection,
        MovieCarouselSection
    },

    computed: {
        movies() {
            return this.$store.getters["movie/" + this.type];
        },
        premiers() {
            return this.$store.getters["movie/" + this.premiersName];
        },
        premiersName() {
            return "premiers" + capitalize(this.type);
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
            this.$router.push({ name: this.type, params: { lang: this.$t('navTexts.' + this.type).toString(), page: 1, type: this.$t('navTexts.' + this.selectedPage).toString()}})
            this.getMovies(1, this.selectedPage);
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
        if(this.premiers && this.premiers.length === 0) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/get' + capitalize(this.premiersName)).then(() => {
                this.$emit('loadingUpdated', false);
            });
        }

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

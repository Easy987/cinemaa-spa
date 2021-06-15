<template>
    <div class="filter">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="filter__content">
                            <div class="filter__items">
                                <!-- filter item -->
                                <div class="filter__item" id="filter__name">
                                    <span class="filter__item-label">{{ this.$t('base.title').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="$t('base.filter')">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <input style="height: 30px;margin-bottom: 0px; padding-left: 10px;padding-right: 10px" type="text" class="form__input" v-on:keyup.enter="sendFilter" v-model="filter.name">
                                        </template>
                                    </b-dropdown>
                                </div>
                                <!-- end filter item -->
                                <!-- filter item -->
                                <div class="filter__item" id="filter__genre">
                                    <span class="filter__item-label">{{ this.$t('base.genre').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="$t('base.filter')">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <div v-scrollbar class="scroll-area">
                                                <b-dropdown-item v-for="(genre, index) in genres" v-bind:key="index" @click.native.capture.stop.prevent="filterGenre(genre)" :class="{'active': filter.genres.some(x => x.key === genre.key)}" link-class="p-0">{{ genre.value }}</b-dropdown-item>
                                            </div>
                                        </template>
                                    </b-dropdown>
                                </div>
                                <!-- end filter item -->

                                <!-- filter item -->
                                <div class="filter__item" id="filter__quality">
                                    <span class="filter__item-label">{{ this.$t('base.quality').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="$t('base.filter')">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <div v-scrollbar class="scroll-area">
                                                <b-dropdown-item v-for="(quality, index) in qualities" v-bind:key="index" @click.native.capture.stop.prevent="filterQuality(quality)" :class="{'active': filter.quality.some(x => x.key === quality.key)}" link-class="p-0">{{ quality.value }}</b-dropdown-item>
                                            </div>
                                        </template>
                                    </b-dropdown>
                                </div>
                                <!-- end filter item -->

                                <!-- filter item -->
                                <div class="filter__item" id="filter__rate">
                                    <span class="filter__item-label">{{ this.$t('base.imdb').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="filter.imdb.length === 0 ? $t('base.filter') : filter.imdb[0] + ' - ' + filter.imdb[1]">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <vue-slider @change="sliderChange(0, $event)" v-model="imdbSlider" :min="0.0" :max="10.0" :interval="0.1" :enable-cross="false"></vue-slider>
                                        </template>
                                    </b-dropdown>
                                </div>
                                <!-- end filter item -->

                                <!-- filter item -->
                                <div class="filter__item" id="filter__year">
                                    <span class="filter__item-label">{{ this.$t('base.release_year').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="yearFilter">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <div class="d-flex">
                                                <input @keypress="isNumber($event)" style="height: 30px;margin-bottom: 0px; padding-left: 10px;padding-right: 10px" type="text" class="form__input" v-on:keyup.enter="sendFilter" v-model="filter.year[0]">
                                                <span style="color: white;">-</span>
                                                <input @keypress="isNumber($event)" style="height: 30px;margin-bottom: 0px; padding-left: 10px;padding-right: 10px" type="text" class="form__input" v-on:keyup.enter="sendFilter" v-model="filter.year[1]">
                                            </div>
                                            </template>
                                    </b-dropdown>
                                </div>
                                <!-- end filter item -->
                            </div>

                            <!-- filter btn -->
                            <button class="filter__btn" type="button" @click.prevent="sendFilter">{{ this.$t('base.filter').toUpperCase() }}</button>
                            <!-- end filter btn -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import {mapGetters} from "vuex";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default {
    name: "FilterSection",

    components: {
        VueSlider
    },

    data() {
        return {
            filtersShowing: true,
            minYear: 1900,
            imdbSlider: ["0.0", "10.0"],
            yearSlider: [(new Date().getFullYear()-20).toString(), new Date().getFullYear().toString()],
            filter: {
                genres: [],
                quality: [],
                imdb: [],
                year: ["", ""],
                name: '',
            },
            scrollSettings: {
                suppressScrollY: false,
                suppressScrollX: true,
                wheelPropagation: false,
                wheelSpeed: 0.5,
            }
        }
    },

    props: {
        type: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        genres: {
            type: Array,
            default: () => {
                return [];
            }
        },
        qualities: {
            type: Array,
            default: () => {
                return [];
            }
        },
    },

    watch: {
        'filter': {
            handler() {
                localStorage.setItem(this.type + '_filter', JSON.stringify(this.filter));
                this.$forceUpdate()
            },
            deep: true,
        }
    },

    computed: {
        ...mapGetters("movie", [
            "moviesInfo",
        ]),

        currentYear() {
            return new Date().getFullYear();
        },

        yearFilter() {
            if(this.filter.year.length === 0 || (this.filter.year.length === 2 && this.filter.year[0].length === 0 && this.filter.year[1].length === 0)) {
                return this.$t('base.filter');
            }

            if(this.filter.year.length === 2) {
                return this.filter.year[0] + ' - ' + this.filter.year[1];
            }

            if(this.filter.year[0] !== undefined) {
                return this.filter.year[0] + ' - ';
            } else {
                return ' - ' + this.filter.year[1];
            }
        }
    },


    methods: {
        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault();
            }
            return true;
        },
        sliderChange(type, value) {
            if(type === 0) {
                this.filter.imdb = value.map((val) => {
                    return val.toFixed(1);
                })
            } else {
                this.filter.year = value;
            }

            localStorage.setItem(this.type + '_filter', JSON.stringify(this.filter));
        },

        sendFilter() {
            this.$emit('filter', this.filter);
        },

        filterGenre(genre) {
            if(this.filter.genres.filter(x => x.key === genre.key).length > 0) {
                this.filter.genres.splice(this.filter.genres.indexOf(genre), 1);
            } else {
                this.filter.genres.push(genre);
            }

            localStorage.setItem(this.type + '_filter', JSON.stringify(this.filter));
        },
        filterQuality(quality) {
            if(this.filter.quality.filter(x => x.key === quality.key).length > 0) {
                this.filter.quality.splice(this.filter.quality.indexOf(quality), 1);
            } else {
                this.filter.quality.push(quality);
            }

            localStorage.setItem(this.type + '_filter', JSON.stringify(this.filter));
        }
    },

    beforeMount() {
        const filter = localStorage.getItem(this.type + '_filter');
        if(filter && filter.length > 0) {
            this.filter = JSON.parse(filter);
        }
    }
};
</script>

<style>
.scroll-area {
    position: relative;
    margin: auto;
    max-height: 300px;
}

.filter__items .active a {
    color: #f77f00 !important;
}
</style>

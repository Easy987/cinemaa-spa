<template>
    <div>
        <Header></Header>
        <!-- main content -->
        <main class="main" v-if="link && moviesInfo">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Link szerkesztése</h2>
                        </div>
                    </div>
                    <!-- end main title -->
                    <div class="col-12">
                        <div class="row">
                            <!-- details form -->
                            <div class="col-12 col-lg-12">
                                <form @submit.prevent="saveLink" class="form form--profile">
                                    <div class="row row--form">
                                        <div class="col-12">
                                            <h4 class="form__title">Link szerkesztése</h4>
                                        </div>

                                        <div class="form__group ml-3">
                                            <div class="row text-left">
                                                <div class="col-2"><label class="form__label">Beküldő</label></div>
                                                <div class="col-2"><label class="form__label">Videómegosztó</label>
                                                </div>
                                                <div class="col-2"><label class="form__label">Nyelv tipus</label></div>
                                                <div class="col-2"><label class="form__label">Link tipus</label></div>
                                                <div class="col-2"><label class="form__label">Státusz</label></div>
                                                <div class="col-2"><label class="form__label">Szerkesztés</label></div>
                                            </div>
                                            <div class="row ">
                                                <div class="col-2">
                                                    <multiselect
                                                        v-model="link.user"
                                                        :options="moviesInfo.users"
                                                        label="username"
                                                        track-by="id"
                                                        :placeholder="$t('chat.select')"
                                                        select-label=""
                                                        deselect-label=""
                                                        :show-labels="true"
                                                        :preserve-search="true"
                                                        :searchable="true">
                                                    </multiselect>
                                                </div>
                                                <div class="col-2">
                                                    <multiselect
                                                        v-model="link.site"
                                                        :options="moviesInfo.sites"
                                                        label="name"
                                                        track-by="id"
                                                        :placeholder="$t('chat.select')"
                                                        select-label=""
                                                        deselect-label=""
                                                        :searchable="true">
                                                    </multiselect>
                                                </div>
                                                <div class="col-2">
                                                    <multiselect
                                                        v-model="link.languageType"
                                                        :options="moviesInfo.languageTypes"
                                                        :custom-label="languageLabel"
                                                        label="name"
                                                        track-by="id"
                                                        :placeholder="$t('chat.select')"
                                                        select-label=""
                                                        deselect-label=""
                                                        :searchable="true">
                                                    </multiselect>
                                                </div>
                                                <div class="col-2">
                                                    <multiselect
                                                        v-model="link.linkType"
                                                        :options="moviesInfo.linkTypes"
                                                        :custom-label="linkLabel"
                                                        label="name"
                                                        track-by="id"
                                                        :placeholder="$t('chat.select')"
                                                        select-label=""
                                                        deselect-label=""
                                                        :searchable="true">
                                                    </multiselect>
                                                </div>
                                                <div class="col-2">
                                                    <b-form-select
                                                        style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;"
                                                        v-model="link.status" :options="statusTypes"></b-form-select>
                                                </div>
                                                <div class="col d-flex">
                                                    <button type="button" style="height: 46px;"
                                                            @click="openLink(link.link)"
                                                            class="main__table-btn main__table-btn--view"
                                                            v-b-popover.hover.bottom="''" title="Link megtekintése">
                                                        <i class="icon ion-ios-open"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="row text-left">
                                                <div class="col-2"><label class="form__label">Évad</label></div>
                                                <div class="col-2"><label class="form__label">Epizód</label></div>
                                                <div class="col-2"><label class="form__label">Rész</label></div>
                                                <div class="col-4"><label class="form__label">Link</label></div>
                                            </div>
                                            <div class="row">
                                                <div class="col-2">
                                                    <input type="text" name="email" class="form__input"
                                                           v-model="link.season">
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="email" class="form__input"
                                                           v-model="link.episode">
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="email" class="form__input"
                                                           v-model="link.part">
                                                </div>
                                                <div class="col-4">
                                                    <input type="text" name="email" class="form__input"
                                                           v-model="link.link">
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <button class="form__btn" type="submit">{{ $t('base.save') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- end details form -->
                            <!-- end password form -->
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- end main content -->
    </div>
</template>

<script>
import Header from "@/components/includes/admin/Header";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {mapGetters} from "vuex";

export default {
    name: "User",
    components: {
        Header,
        Multiselect
    },

    computed: {
        ...mapGetters("movie", [
            "moviesInfo",
        ]),
    },

    data() {
        return {
            link: null,
            linkTypes: [
                {value: 0, text: 'Film'},
                {value: 1, text: 'Sorozat'},
            ],
            statusTypes: [
                {value: 0, text: 'Folyamatban'},
                {value: 1, text: 'Engedélyezve'},
                {value: 2, text: 'Rejtett'},
            ]
        }
    },

    created() {
        if ((this.moviesInfo && Object.keys(this.moviesInfo).length === 0)) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/getMoviesInfo').then((res) => {
                this.getLink();
                this.$emit('loadingUpdated', false);
            });
        } else {
            this.getLink();
        }
    },

    methods: {
        getLink() {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/getLink', {id: this.$route.params.id}).then((res) => {
                this.link = res.data;
                this.$emit('loadingUpdated', false);
            });
        },
        openLink(url) {
            window.open(url,
                '_blank');
        },
        customLabel({name, key}) {
            if (name !== undefined) {
                return this.$t('genres.' + name);
            }

            return this.$t('genres.' + key);
        },
        languageLabel({name, key}) {
            if (name !== undefined) {
                return this.$t('languageTypes.' + name);
            }

            return this.$t('languageTypes.' + key);
        },
        linkLabel({name, key}) {
            if (name !== undefined) {
                return this.$t('qualities.' + name);
            }

            return this.$t('qualities.' + key);
        },
        saveLink() {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/saveLink', {link: this.link}).then((res) => {
                this.$store.dispatch('user/sendToast', {
                        message: 'Link sikeresen frissítve.',
                        type: 'success'
                    }
                );

                this.$router.push({'name': 'admin-links'});

                this.$emit('loadingUpdated', false);
            });
        }
    }
};
</script>

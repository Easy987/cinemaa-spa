<template>
    <div>
        <Header></Header>
        <!-- main content -->
        <main class="main" v-if="movie && moviesInfo">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Adatlap szerkesztése</h2>
                        </div>
                    </div>
                    <!-- end main title -->
                    <div class="col-12">
                        <div class="row">
                            <!-- details form -->
                            <div class="col-12 col-lg-12">
                                <form @submit.prevent="saveMovie" class="form form--profile">
                                    <div class="row row--form">
                                        <div class="col-12">
                                            <h4 class="form__title">Adatok szerkesztése</h4>
                                        </div>

                                        <div class="col-12 col-md-6 pb-3">
                                            <div class="form__group">
                                                <label class="form__label">Adatlap befrissítése</label>
                                                <button type="button" @click="refreshMovie" class="form__btn">Frissítés</button>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6">
                                            <div class="form__group">
                                                <label class="form__label">Borítókép</label>
                                                <b-form-file
                                                    v-model="movie.poster_upload"
                                                    @change="onFileChange"
                                                ></b-form-file>
                                            </div>
                                        </div>

                                        <div class="col-12 pb-3" :class="{'col-12' : user().role !== 'owner', 'col-md-12': user().role !== 'owner', 'col-md-6': user().role === 'owner'}">
                                            <div class="form__group">
                                                <label class="form__label">Premier</label>
                                                <b-form-checkbox size="lg" v-model="movie.is_premier" name="check-button" switch>
                                                    <b style="color: white;">{{ movie.is_premier ? $t('base.enabled') : $t('base.disabled') }}</b>
                                                </b-form-checkbox>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-6 col-xl-6 pb-3" v-if="loggedIn() && user().role === 'owner'">
                                            <div class="form__group">
                                                <label class="form__label">Csak bejelentkezve látható</label>
                                                <b-form-checkbox size="lg" v-model="movie.only_auth" name="check-button" switch>
                                                    <b style="color: white;">{{ movie.only_auth ? $t('base.enabled') : $t('base.disabled') }}</b>
                                                </b-form-checkbox>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Magyar cím</label>
                                                <input id="hutit" type="text" name="email" class="form__input" v-model="movie.titles['hu']">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Angol cím</label>
                                                <input id="entit" type="text" name="email" class="form__input" v-model="movie.titles['en']">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Magyar leírás</label>
                                                <b-form-textarea
                                                    class="form__textarea"
                                                    id="about"
                                                    v-model="movie.descriptions['hu']"
                                                ></b-form-textarea>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Angol leírás</label>
                                                <b-form-textarea
                                                    class="form__textarea"
                                                    id="about"
                                                    v-model="movie.descriptions['en']"
                                                ></b-form-textarea>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Évjárat</label>
                                                <input type="text" name="email" class="form__input" v-model="movie.year">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Hossz</label>
                                                <input type="text" name="email" class="form__input" v-model="movie.length">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Tipus</label>
                                                <b-form-select style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="movie.type" :options="movieTypes"></b-form-select>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">IMdb id</label>
                                                <input type="text" name="email" class="form__input" v-model="movie.imdb_id">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">IMdb értékelés</label>
                                                <input type="text" name="email" class="form__input" v-model="movie.imdb_rating">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Porthu id</label>
                                                <input type="text" name="email" class="form__input" v-model="movie.porthu_id">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Értékelés</label>
                                                <input type="text" name="email" class="form__input" v-model="movie.rating">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Státusz</label>
                                                <b-form-select style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="movie.status" :options="statusTypes"></b-form-select>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Műfajok</label>
                                                <multiselect
                                                    v-model="movie.genres"
                                                    :options="getStaticOptions('genres')"
                                                    label="value"
                                                    :custom-label="customLabel"
                                                    :show-labels="false"
                                                    track-by="key"
                                                    :multiple="true"
                                                    :placeholder="$t('chat.select')"
                                                    select-label=""
                                                    deselect-label=""
                                                    :searchable="true">
                                                </multiselect>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Szinészek</label>
                                                <multiselect
                                                    v-model="movie.actors"
                                                    :options="moviesInfo.actors"
                                                    label="key"
                                                    track-by="key"
                                                    :multiple="true"
                                                    :placeholder="$t('chat.select')"
                                                    select-label=""
                                                    deselect-label=""
                                                    :searchable="true">
                                                </multiselect>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Rendezők</label>
                                                <multiselect
                                                    v-model="movie.directors"
                                                    :options="moviesInfo.directors"
                                                    label="key"
                                                    track-by="key"
                                                    :multiple="true"
                                                    :placeholder="$t('chat.select')"
                                                    select-label=""
                                                    deselect-label=""
                                                    :searchable="true">
                                                </multiselect>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label">Írók</label>
                                                <multiselect
                                                    v-model="movie.writers"
                                                    :options="moviesInfo.writers"
                                                    label="key"
                                                    track-by="key"
                                                    :multiple="true"
                                                    :placeholder="$t('chat.select')"
                                                    select-label=""
                                                    deselect-label=""
                                                    :searchable="true">
                                                </multiselect>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-12 col-lg-12 col-xl-12 mt-2">
                                            <div class="form__group">
                                                <label class="form__label">Youtube linkek</label>

                                                <div v-for="(video, index) in movie.videos" v-bind:key="index"  class="form__group d-flex">
                                                    <input type="text" name="email" class="form__input mr-2" v-model="video.youtube_id">
                                                    <b-form-select style="height: 46px;background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="video.status" :options="statusTypes"></b-form-select>
                                                    <button type="button" style="height: 46px;" @click="openVideo(video.youtube_id)" class="main__table-btn main__table-btn--view ml-2" v-b-popover.hover.bottom="''" title="Videó megtekintése">
                                                        <i class="icon ion-ios-open"></i>
                                                    </button>
                                                    <button type="button" style="height: 46px;" @click="deleteVideo(movie, video.youtube_id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Videó törlése">
                                                        <i class="icon ion-ios-trash"></i>
                                                    </button>
                                                </div>
                                                <div v-if="movie.videos.length === 0" class="form__title">Nincsenek feltöltött videók</div>
                                                <div><button class="form__btn" type="button" @click="addVideo">Hozzáadás</button></div>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-12 col-lg-12 col-xl-12 mt-2">
                                            <div class="form__group">
                                                <label class="form__label">Beküldött linkek</label>

                                                <div v-if="this.$screen.width > 480">
                                                    <div v-for="(link, index) in movie.links" v-bind:key="index">
                                                        <div class="row text-left" :class="{'pt-5' : index !== 0}">
                                                            <div class="col-2"><label class="form__label">Beküldő</label></div>
                                                            <div class="col-2"><label class="form__label">Videómegosztó</label></div>
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
                                                                <b-form-select style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="link.status" :options="linkStatusTypes"></b-form-select>
                                                            </div>
                                                            <div class="col d-flex">
                                                                <button type="button" style="height: 46px;" @click="openLink(link.link)" class="main__table-btn main__table-btn--view" v-b-popover.hover.bottom="''" title="Link megtekintése">
                                                                    <i class="icon ion-ios-open"></i>
                                                                </button>
                                                                <button type="button" style="height: 46px;" @click="deleteLink(movie, link.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Link törlése">
                                                                    <i class="icon ion-ios-trash"></i>
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
                                                                <input type="text" name="email" class="form__input" v-model="link.season">
                                                            </div>
                                                            <div class="col-2">
                                                                <input type="text" name="email" class="form__input" v-model="link.episode">
                                                            </div>
                                                            <div class="col-2">
                                                                <input type="text" name="email" class="form__input" v-model="link.part">
                                                            </div>
                                                            <div class="col-4">
                                                                <input type="text" name="email" class="form__input" v-model="link.link">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-if="movie.links.length === 0" class="form__title">Nincsenek feltöltött linkek</div>
                                                </div>
                                                <div v-else>
                                                    <div v-for="(link, index) in movie.links" v-bind:key="index">
                                                        <div class="row text-left" :class="{'pt-5' : index !== 0}">
                                                            <div class="col-6"><label class="form__label">Beküldő</label></div>
                                                            <div class="col-6">
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
                                                            <div class="col-6"><label class="form__label">Videómegosztó</label></div>
                                                            <div class="col-6">
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
                                                            <div class="col-6"><label class="form__label">Nyelv tipus</label></div>
                                                            <div class="col-6">
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
                                                            <div class="col-6"><label class="form__label">Link tipus</label></div>
                                                            <div class="col-6">
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
                                                            <div class="col-6"><label class="form__label">Státusz</label></div>
                                                            <div class="col-6">
                                                                <b-form-select style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="link.status" :options="statusTypes"></b-form-select>
                                                            </div>

                                                            <div class="col-6"><label class="form__label">Évad</label></div>
                                                            <div class="col-6">
                                                                <input type="text" name="email" class="form__input mb-0" v-model="link.season">
                                                            </div>
                                                            <div class="col-6"><label class="form__label">Epizód</label></div>
                                                            <div class="col-6">
                                                                <input type="text" name="email" class="form__input mb-0" v-model="link.episode">
                                                            </div>
                                                            <div class="col-6"><label class="form__label">Rész</label></div>
                                                            <div class="col-6">
                                                                <input type="text" name="email" class="form__input mb-0" v-model="link.part">
                                                            </div>
                                                            <div class="col-6"><label class="form__label">Link</label></div>
                                                            <div class="col-6">
                                                                <input type="text" name="email" class="form__input mb-0" v-model="link.link">
                                                            </div>

                                                            <div class="col-6"><label class="form__label">Szerkesztés</label></div>
                                                            <div class="col-6 d-flex">
                                                                <button type="button" style="height: 46px;" @click="openLink(link.link)" class="main__table-btn main__table-btn--view" v-b-popover.hover.bottom="''" title="Link megtekintése">
                                                                    <i class="icon ion-ios-open"></i>
                                                                </button>
                                                                <button type="button" style="height: 46px;" @click="deleteLink(movie, link.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Link törlése">
                                                                    <i class="icon ion-ios-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-if="movie.links.length === 0" class="form__title">Nincsenek feltöltött linkek</div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button class="form__btn" type="submit">{{ $t('base.save') }}</button>
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
            movie: null,
            movieTypes: [
                { value: 0, text: 'Film' },
                { value: 1, text: 'Sorozat' },
            ],
            statusTypes: [
                { value: 0, text: 'Folyamatban' },
                { value: 1, text: 'Engedélyezve' },
                { value: 2, text: 'Rejtett' },
            ],
            linkStatusTypes: [
                { value: 0, text: 'Folyamatban' },
                { value: 1, text: 'Engedélyezve' },
                { value: 2, text: 'Rejtett' },
                { value: 3, text: 'Rendszer által kiszűrt' },
            ],
        }
    },

    created() {
        if((this.moviesInfo && Object.keys(this.moviesInfo).length === 0)) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/getMoviesInfo').then((res) => {
                this.getMovie();
                this.$emit('loadingUpdated', false);
            });
        } else {
            this.getMovie();
        }
    },

    methods: {
        onFileChange(e) {
            const file  = e.target.files[0];
            const reader = new FileReader();
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(file);

                const ref = this;
                reader.onloadend = function (e) {
                    ref.movie.poster_upload = reader.result;
                }
            } else {
                this.$store.dispatch('user/sendToast', {
                        message: 'A feltöltött borítókép nem kép!',
                        type: 'error'
                    }
                );

                this.movie.poster_upload = null;
            }
        },
        addVideo() {
            this.movie.videos.push({});
        },
        refreshMovie() {
            this.$emit('loadingUpdated', true);
            this.$api.post('admin/movies/refresh', {id: this.$route.params.id }).then((res) => {
                this.movie = res.data.data;

                this.$store.dispatch('user/sendToast', {
                        message: 'Adatlap sikeresen frissítve.',
                        type: 'success'
                    }
                );
                this.$emit('loadingUpdated', false);
            });
        },
        getMovie() {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/getMovie', {id: this.$route.params.id}).then((res) => {
                res.data.is_premier = res.data.is_premier ? true : false;

                if(res.data.only_auth) {
                    res.data.only_auth = res.data.only_auth ? true : false;
                }

                this.movie = res.data;

                this.$emit('loadingUpdated', false);
            });
        },
        openVideo(id) {
            window.open("https://www.youtube.com/watch?v=" + id,
                '_blank');
        },
        openLink(url) {
            window.open(url,
                '_blank');
        },
        deleteVideo(movie, id) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteVideo', {movie_id: movie.id, id: id}).then((res) => {
                this.movie.videos = this.movie.videos.filter(x => x.youtube_id !== id);

                this.$store.dispatch('user/sendToast', {
                        message: 'Videó sikeresen törölve.',
                        type: 'success'
                    }
                );
                this.$emit('loadingUpdated', false);
            });
        },
        deleteLink(movie, id) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteLink', {movie_id: movie.id, link: id}).then((res) => {
                this.movie.links = this.movie.links.filter(x => x.id !== id);

                this.$store.dispatch('user/sendToast', {
                        message: 'Link sikeresen törölve.',
                        type: 'success'
                    }
                );
                this.$emit('loadingUpdated', false);
            });
        },
        customLabel ({ name, key }) {
            if(name !== undefined) {
                return this.$t('genres.' + name);
            }

            return this.$t('genres.' + key);
        },
        languageLabel ({ name, key }) {
            if(name !== undefined) {
                return this.$t('languageTypes.' + name);
            }

            return this.$t('languageTypes.' + key);
        },
        linkLabel ({ name, key }) {
            if(name !== undefined) {
                return this.$t('qualities.' + name);
            }

            return this.$t('qualities.' + key);
        },
        saveMovie()
        {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/saveMovie', {movie: this.movie}).then((res) => {
                this.$store.dispatch('user/sendToast', {
                        message: 'Adatlap sikeresen frissítve.',
                        type: 'success'
                    }
                );

                this.$router.push({'name': 'admin-movies'});

                this.$emit('loadingUpdated', false);
            });
        }
    }
};
</script>

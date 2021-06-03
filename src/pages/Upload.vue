<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.upload')"></PageTitle>
        <div class="container mt-5">
            <Adsense
                class="text-center pb-5"
                data-ad-client="ca-pub-3890640160453569"
                data-ad-slot="2375609994"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </Adsense>
            <div class="row">
                <div class="col-12">
                    <div class="row m-auto">
                        <div class="col-12 col-md-3 col-lg-3 col-xl-3 m-auto" v-if="state === 0">
                            <div class="profile__group">
                                <label class="profile__label" for="imdb">{{ $t('upload.imdb') }}</label>
                                <input id="imdb" v-model="newMovieData.imdb_id" type="text" name="imdb" class="profile__input">
                            </div>
                            <button @click="checkMovie" class="profile__btn m-auto" type="submit">{{ $t('upload.check') }}</button>
                        </div>
                        <div class="col-12 col-md-3 col-lg-3 col-xl-3 m-auto" v-if="state === 1">
                            <div class="profile__group">
                                <label class="profile__label" for="imdb">{{ $t('upload.imdb') }}</label>
                                <input id="porthu" :disabled="true" v-model="newMovieData.imdb_id" type="text" name="imdb" class="profile__input">
                            </div>
                        </div>
                        <div class="col-12 col-md-3 col-lg-3 col-xl-3 m-auto" v-if="state === 1">
                            <div class="profile__group">
                                <label class="profile__label" for="imdb">{{ $t('upload.porthu') }}</label>
                                <input id="porthu" :disabled="movie.porthu_id.length > 0" v-model="newMovieData.porthu_id" type="text" name="imdb" class="profile__input">
                            </div>
                        </div>
                        <div class="col-12"></div>
                        <div class="col-12" v-if="state === 1">
                            <div class="row">
                                <div v-for="(lang, index) in newMovieData.titles" v-bind:key="index" class="col-12 col-md-6 col-lg-6 col-xl-6 m-auto">
                                    <div class="profile__group">
                                        <label class="profile__label" for="imdb">{{ $t('locales.' + index)}} {{ $t('base.title')}}</label>
                                        <input :id="index + 'Title'" :disabled="foundMovie" v-model="newMovieData.titles[index]" type="text" name="imdb" class="profile__input">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" v-if="state === 1">
                            <div class="row">
                                <div class="col-12 col-md-6 col-lg-6 col-xl-6 m-auto">
                                    <div class="profile__group">
                                        <label class="profile__label" for="imdb">{{ $t('locales.hu')}} {{ $t('base.description')}}</label>
                                        <b-form-textarea
                                            class="form__textarea"
                                            :id="'HuDescription'"
                                            :disabled="foundMovie" v-model="newMovieData.descriptions['hu']"
                                        ></b-form-textarea>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-6 col-xl-6 m-auto">
                                    <div class="profile__group">
                                        <label class="profile__label" for="imdb">{{ $t('locales.en')}} {{ $t('base.description')}}</label>
                                        <b-form-textarea
                                            class="form__textarea"
                                            :id="'EnDescription'"
                                            :disabled="foundMovie" v-model="newMovieData.descriptions['en']"
                                        ></b-form-textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12" v-if="state === 1">
                            <div class="row">
                                <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.year') }}</label>
                                        <input type="text" :disabled="foundMovie" name="email" class="profile__input" v-model="newMovieData.year">
                                    </div>
                                </div>

                                <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.running_time') }}</label>
                                        <input type="text" :disabled="foundMovie" name="email" class="profile__input" v-model="newMovieData.length">
                                    </div>
                                </div>

                                <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.type') }}</label>
                                        <b-form-select @change="$forceUpdate();" style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="newMovieData.type" :options="movieTypes"></b-form-select>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6 col-lg-12 col-xl-6" v-if="emptyMovie">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.genre') }}</label>
                                        <multiselect
                                            v-model="newMovieData.genres"
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

                                <div class="col-12 col-md-6 col-lg-12 col-xl-6" v-if="emptyMovie">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.cast') }}</label>
                                        <multiselect
                                            v-model="newMovieData.actors"
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

                                <div class="col-12 col-md-6 col-lg-12 col-xl-6" v-if="emptyMovie">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.director') }}</label>
                                        <multiselect
                                            v-model="newMovieData.directors"
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

                                <div class="col-12 col-md-6 col-lg-12 col-xl-6" v-if="emptyMovie">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.writer') }}</label>
                                        <multiselect
                                            v-model="newMovieData.writers"
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

                                <div class="col-12 col-md-6 col-lg-12 col-xl-6" v-if="emptyMovie">
                                    <div class="profile__group">
                                        <label class="profile__label">{{ $t('base.cover') }}</label>
                                        <b-form-file
                                            v-model="newMovieData.poster"
                                            @change="onFileChange"
                                        ></b-form-file>
                                    </div>
                                </div>
                            </div>
                        </div>





                        <div class="row w-100 mt-5" style="color: white;" v-if="state === 1">
                            <div class="col-md-12 col-12">
                                <button class="btn btn-primary mb-5" @click="newMovieData.videos.push({youtube_id: ''});">{{ $t('upload.new_video')}}</button>
                                <button class="btn btn-primary mb-5 ml-2" @click="newMovieData.videos.pop();">{{ $t('base.delete')}}</button>
                                <div v-for="(video, index) in newMovieData.videos" v-bind:key="'video'+index" class="profile__group">
                                    <label class="profile__label" for="youtube">{{ $t('upload.youtube_url') }}</label>
                                    <input id="youtube" v-model="video.youtube_id" type="text" name="youtube" class="profile__input">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <button class="btn btn-primary mb-5" @click="newMovieData.links.push({site: null, languageType: null, linkType: null, season: 0, episode: 0, part: 0, link: '', message: ''}); $forceUpdate();">{{ $t('upload.new_link')}}</button>
                                <button class="btn btn-primary mb-5 ml-2" @click="newMovieData.links.pop(); $forceUpdate();">{{ $t('base.delete')}}</button>
                                <div v-for="(link, index) in newMovieData.links" v-bind:key="'link'+index" class="profile__group ml-3 mt-3">
                                        <div class="row text-left">
                                            <div class="col-4 pl-0"><label class="form__label">{{ $t('base.language') }}</label></div>
                                            <div class="col-4 pl-0"><label class="form__label">{{ $t('base.quality') }}</label></div>
                                            <div class="col-4 pl-0"><label class="form__label">Link</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 pl-0">
                                                <multiselect
                                                    v-model="link.languageType"
                                                    :options="moviesInfo.languageTypes"
                                                    :custom-label="languageLabel"
                                                    label="name"
                                                    track-by="id"
                                                    :placeholder="$t('chat.select')"
                                                    select-label=""
                                                    deselect-label=""
                                                    @select="$forceUpdate()"
                                                    :searchable="true">
                                                </multiselect>
                                            </div>
                                            <div class="col-4 pl-0">
                                                <multiselect
                                                    v-model="link.linkType"
                                                    :options="moviesInfo.linkTypes"
                                                    :custom-label="linkLabel"
                                                    label="name"
                                                    track-by="id"
                                                    :placeholder="$t('chat.select')"
                                                    select-label=""
                                                    deselect-label=""
                                                    @select="$forceUpdate()"
                                                    :searchable="true">
                                                </multiselect>
                                            </div>
                                            <div class="col-4 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.link">
                                            </div>
                                        </div>
                                        <div v-if="newMovieData.type === 1" class="row text-left mt-3">
                                            <div class="col-4 pl-0"><label class="form__label">{{ $t('base.season') }}</label></div>
                                            <div class="col-4 pl-0"><label class="form__label">{{ $t('base.episode') }}</label></div>
                                            <div class="col-4 pl-0"><label class="form__label">{{ $t('base.part') }}</label></div>
                                        </div>
                                        <div v-if="newMovieData.type === 1" class="row">
                                            <div class="col-4 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.season">
                                            </div>
                                            <div class="col-4 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.episode">
                                            </div>
                                            <div class="col-4 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.part">
                                            </div>
                                        </div>
                                        <div class="row pt-3">
                                            <div class="col-12 pl-0"><label class="form__label">{{ $t('base.comment') }}</label></div>
                                            <div class="col-12 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.message">
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <button v-if="newMovieData.videos.length > 0 || newMovieData.links.length > 0" @click="uploadMovie" class="profile__btn m-auto" type="submit">{{ $t('upload.send') }}</button>
                        </div>
                        <div class="mt-5"></div>
                    </div>
                </div>
            </div>
            <Adsense
                class="text-center pt-3"
                data-ad-client="ca-pub-3890640160453569"
                data-ad-slot="9059882935"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </Adsense>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";
import Multiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {mapGetters} from "vuex";
import {capitalize} from "@/utils/helper";

export default {
    name: "Upload",
    components: {
        Header,
        Footer,
        PageTitle,
        Multiselect
    },

    computed: {
        ...mapGetters("movie", [
            "moviesInfo",
        ]),
    },

    data() {
        return {
            state: 0,
            movie: null,
            newMovieData: {
                imdb_id: '',
                porthu_id: '',
                videos: [],
                links: [],
                poster: '',
            },
            foundMovie: false,
            emptyMovie: false,
            movieTypes: [
                { value: 0, text: capitalize(this.$t('base.movie')) },
                { value: 1, text: capitalize(this.$t('base.series')) },
            ]
        }
    },

    methods: {
        onFileChange(e) {
            const file  = e.target.files[0];
            const reader = new FileReader();
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(file);
            }

            const ref = this;
            reader.onloadend = function (e) {
                ref.newMovieData.poster = reader.result;
            }
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
        checkMovie()
        {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/checkMovie', {imdb_id: this.newMovieData.imdb_id}).then((res) => {
                this.movie = res.data;


                this.newMovieData = JSON.parse(JSON.stringify(this.movie));
                this.newMovieData.titles = this.movie.titles;

                if(this.movie.descriptions.length === 0) {
                    this.newMovieData.descriptions = {
                        hu: '',
                        en: ''
                    };
                } else {
                    this.newMovieData.descriptions = JSON.parse(JSON.stringify(this.movie.descriptions));

                }

                this.newMovieData.links = [];
                this.newMovieData.videos = [];

                if(!this.newMovieData.descriptions.hasOwnProperty('hu')) {
                    this.newMovieData.descriptions['hu'] = '';
                }

                if(!this.newMovieData.descriptions.hasOwnProperty('en')) {
                    this.newMovieData.descriptions['en'] = '';
                }

                this.state = 1;

                if(res.found) {
                    this.foundMovie = true;
                }

                this.$emit('loadingUpdated', false);
            }).catch((error) => {
                const statusCode = error.response.status;

                if(statusCode === 400) {
                    this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.imdb_format_invalid'),
                        type: 'error'
                    });
                    this.newMovieData.imdb_id = '';
                    this.$emit('loadingUpdated', false);
                    return;
                }

                if(statusCode === 402) {
                    this.movie = {};
                    this.movie.porthu_id = '';

                    this.emptyMovie = true;
                    this.newMovieData.descriptions = {
                        hu: '',
                        en: ''
                    };

                    this.newMovieData.titles = {
                        hu: '',
                        en: ''
                    };
                    this.newMovieData.year = '';
                    this.newMovieData.length = '';
                    this.newMovieData.links = [];
                    this.newMovieData.videos = [];
                    this.newMovieData.poster = null;

                    this.state = 1;
                    this.$emit('loadingUpdated', false);
                    return;
                }
                this.state = 2;
                this.$emit('loadingUpdated', false);

            });
        },
        uploadMovie()
        {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/uploadMovie', {movie: this.movie, new_movie: this.newMovieData, empty: this.emptyMovie}).then((res) => {
                this.$store.dispatch('user/sendToast', {
                    message: this.$t('messages.thanks_for_uploading'),
                    type: 'success'
                });

                this.$router.push({name: 'home'});

                this.$emit('loadingUpdated', false);
            }).catch((error) => {
                const statusCode = error.response.status;

                if(statusCode === 306) {
                    this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.link_exists'),
                        type: 'error'
                    });
                    this.$emit('loadingUpdated', false);
                }

                if(statusCode === 300) {
                    this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.link_mismatch'),
                        type: 'error'
                    });
                    this.$emit('loadingUpdated', false);
                }

                if(statusCode === 301) {
                    this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.fill_all_fields'),
                        type: 'error'
                    });
                    this.$emit('loadingUpdated', false);
                }

                if(statusCode === 302) {
                    this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.youtube_mismatch'),
                        type: 'error'
                    });
                    this.$emit('loadingUpdated', false);
                }

                if(statusCode === 305) {
                    this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.error'),
                        type: 'error'
                    });
                    this.$emit('loadingUpdated', false);
                }

                this.$emit('loadingUpdated', false);
            });
        }
    }
};
</script>

<template>
    <div>
        <Header></Header>
        <!-- details -->
        <section class="section section--details section--bg" data-bg="/img/section/section.jpg">
            <!-- details content -->
            <div class="container" v-if="movie">
                <div class="row">
                    <!-- title -->
                    <div class="col-12 pr-0" :class="{'d-flex': this.$screen.width <= 480, 'flex-column': this.$screen.width <= 480, 'd-inline-flex': this.$screen.width > 480}">
                        <h1 class="section__title" :class="{'text-center': this.$screen.width <= 480}" v-if="movie.titles">{{ movie.titles[$i18n.locale] }}</h1>

                        <div class="ml-auto" :class="{'mr-auto': this.$screen.width <= 480}">
                            <h5 class="text-right" :class="{'text-center': this.$screen.width <= 480}" style="color: rgba(255, 255, 255, 0.8)">{{ this.loggedIn() ? (movie.rated_by_user ? $t('base.rate_rated') : $t('base.rate_user') ) : $t('base.rate_guest') }}</h5>
                            <b-popover v-if="movie.rating" target="starRatingPopover" triggers="hover" placement="top">
                                <template #title>{{ $t('base.avg_rating') }}: {{ movie.rating ? movie.rating : 0 }}</template>
                            </b-popover>
                            <div class="d-inline-flex ml-auto w-100">
                                <star-rating :class="{'mr-auto': this.$screen.width <= 480}" id="starRatingPopover" @rating-selected="ratingSelected" :read-only="!loggedIn() || movie.rated_by_user" :animate="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :max-rating="10" :star-size="20" :show-rating="false" v-model="movie.rating" class="pb-3"></star-rating>
                            </div>

                        </div>
                    </div>
                    <!-- end title -->

                    <!-- content -->
                    <div class="col-12 col-lg-6">
                        <div class="card card--details">
                            <div class="row">
                                <!-- card cover -->
                                <div class="col-12 col-sm-5 col-lg-6 col-xl-5">
                                    <div class="card__cover" :class="{'text-center': this.$screen.width <= 480}">
                                        <img :src="movie.poster" alt=""/>
                                        <span :class="getMovieCardRatingClass(movie.imdb_rating)+(this.$screen.width <= 480 ? ' left-70' : '')">{{ movie.imdb_rating }}</span>
                                    </div>
                                    <div class="text-left mt-2">
                                        <button v-b-popover.hover.bottom="''" :title="loggedIn() ? $t('base.mark_favourite') : $t('base.need_login')" href="#" style="margin-right: 10px;" @click="favouriteMovie"><font-awesome-icon icon="heart" size="2x" :class="{'enabled': movie.favourited_by_user}" /></button>
                                        <button v-b-popover.hover.bottom="''" :title="loggedIn() ? $t('base.mark_to_be_watched') : $t('base.need_login')" href="#" style="margin-right: 10px;" @click="toBeWatchedMovie"><font-awesome-icon icon="eye" size="2x" :class="{'enabled': movie.to_be_watched_by_user}" /></button>
                                    </div>
                                </div>
                                <!-- end card cover -->

                                <!-- card content -->
                                <div class="col-12 col-sm-12 col-lg-6 col-xl-7">
                                    <div class="card__content">
                                        <ul class="card__meta">
                                            <li v-if="movie.writers.length > 0">
                                                <span>{{ $t('base.writer') }}:</span>
                                                <a v-for="(writer, index) in movie.writers" v-bind:key="index">{{ writer.key }}</a>
                                            </li>
                                            <li v-if="movie.directors.length > 0">
                                                <span>{{ $t('base.director') }}:</span>
                                                <a v-for="(director, index) in movie.directors" v-bind:key="index">{{ director.key }}</a>
                                            </li>
                                            <li v-if="movie.actors.length > 0">
                                                <span>{{ $t('base.cast') }}:</span>
                                                <a v-for="(actor, index) in movie.actors" v-bind:key="index">{{ actor.key }}</a>
                                            </li>
                                            <li v-if="movie.genres.length > 0">
                                                <span>{{ $t('base.genre') }}:</span>
                                                <a v-for="(genre, index) in movie.genres" v-bind:key="index">{{ $t('genres.' + genre.key) }}</a>
                                            </li>
                                            <li><span>{{ $t('base.release_year') }}:</span> {{ movie.year }}</li>
                                            <li><span>{{ $t('base.running_time') }}:</span> {{ movie.length }} {{ $t('base.min') }}</li>
                                        </ul>
                                        <div class="card__description" v-if="movie.descriptions && movie.descriptions[$i18n.locale]">
                                            <div class="readmore">
                                                <p>
                                                    {{ movie.descriptions[$i18n.locale].substr(0, 200) }}
                                                    <slide-up-down @open-end="expandFinished = true;" v-if="movie.descriptions[$i18n.locale].length > 200" :active="expanded" :duration="1000" :class="{'expanded': expandFinished}">
                                                        {{ (movie.descriptions[$i18n.locale].substr(200)).trimStart() }}
                                                    </slide-up-down>
                                                </p>
                                            </div>
                                            <a class="b-description_readmore_button" v-if="movie.descriptions[$i18n.locale].length > 200" @click="readMeButton"></a>
                                        </div>
                                    </div>
                                </div>
                                <!-- end card content -->
                            </div>
                        </div>
                    </div>
                    <!-- end content -->

                    <!-- player -->
                    <div class="col-12 col-lg-6 pr-0" :class="{'videoWrapper': this.$screen.width <= 480}" v-if="movie.videos.length">
                        <youtube :fitParent="this.$screen.width <= 480" :video-id="movie.videos[0].youtube_id"></youtube>
                        <button v-b-popover.hover.bottom="''" :title="loggedIn() ? $t('base.report_video') : $t('base.need_login')" class="text-right w-100 pswp__button" :class="{'text-center': this.$screen.width <= 480}" @click="sendVideoReport"><h5 style="color: rgba(255, 255, 255, 0.8)">{{ $t('base.report_video') }}</h5></button>
                        <iframe class="float-right" :class="{'d-none': this.$screen.width <= 480}" :src="facebookShareURL" width="105" height="65" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        <iframe class="float-right" :class="{'d-none': this.$screen.width <= 480}" src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FCinemaacc-112261023817711&width=105&layout=button&action=like&size=large&share=false&height=65&appId=768820493841395" width="90" height="65" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    <!-- end player -->
                </div>
            </div>
            <!-- end details content -->
        </section>
        <!-- end details -->
        <section class="content">
            <div class="content__head">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-3 mb-3 text-center">
                                <iframe :class="{'d-none': this.$screen.width > 480, 'd-inline-block': this.$screen.width <= 480}" src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FCinemaacc-112261023817711&width=105&layout=button&action=like&size=large&share=false&height=65&appId=768820493841395" width="90" height="65" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                <iframe :class="{'d-none': this.$screen.width > 480, 'd-inline-block': this.$screen.width <= 480}" :src="facebookShareURL" width="105" height="65" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                            </div>


                            <a v-if="movie" target="_blank" :href="this.forrasUrl + '/' + (this.loggedIn() ? this.user().secret_uuid : 'filmforras') + '/' + $i18n.locale + '/' + this.movie.id + '/'"><h4 class="content__title text-center" style="font-size: 25px;border: 3px solid orange;padding: 5px;"><b>{{$t('base.view_submitted_links')}}</b></h4></a>
                            <button @click="showSubmitLink" v-if="movie && loggedIn()" class="m-auto w-100 text-center"><h4 class="content__title text-center" style="font-size: 25px;"><b>{{$t('base.submit_link')}}</b></h4></button>
                            <!-- content title -->
                            <!-- end content title -->

                            <b-modal @ok="submitLink" id="submitLinkModal" footer-bg-variant="dark" header-bg-variant="dark" header-text-variant="white" header-border-variant="0" footer-border-variant="0" footer-text-variant="white" body-text-variant="white" body-bg-variant="dark" :title="$t('base.submit_link')">
                                <div class="col-md-12 col-12">
                                    <button class="btn btn-primary" @click="links.push({site: null, languageType: null, linkType: null, season: 0, episode: 0, part: 0, link: ''}); $forceUpdate();">{{ $t('upload.new_link')}}</button>
                                    <button class="btn btn-primary ml-2" @click="links.pop(); $forceUpdate();">{{ $t('base.delete')}}</button>
                                    <div v-for="(link, index) in links" v-bind:key="'link'+index" class="profile__group ml-3 mt-3">
                                        <hr>
                                        <div class="row text-left">
                                            <div class="pl-0" :class="{'col-4' : movie && movie.type === 0, 'col-6': movie && movie.type === 1}"><label class="form__label">{{ $t('base.language') }}</label></div>
                                            <div class="pl-0" :class="{'col-4' : movie && movie.type === 0, 'col-6': movie && movie.type === 1}"><label class="form__label">{{ $t('base.quality') }}</label></div>
                                            <div v-if="movie && movie.type === 0" class="pl-0"><label class="form__label">Link</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="pl-0" :class="{'col-4' : movie && movie.type === 0, 'col-6': movie && movie.type === 1}">
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
                                            <div class="pl-0" :class="{'col-4' : movie && movie.type === 0, 'col-6': movie && movie.type === 1}">
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
                                            <div v-if="movie && movie.type === 0" class="pl-0" :class="{'col-4' : movie && movie.type === 0, 'col-6': movie && movie.type === 1}">
                                                <input type="text" class="profile__input"
                                                       v-model="link.link">
                                            </div>
                                        </div>
                                        <div v-if="movie && movie.type === 1" class="row text-left mt-3">
                                            <div class="col-2 pl-0"><label class="form__label">{{ $t('base.season') }}</label></div>
                                            <div class="col-2 pl-0"><label class="form__label">{{ $t('base.episode') }}</label></div>
                                            <div class="col-2 pl-0"><label class="form__label">{{ $t('base.part') }}</label></div>
                                            <div class="col-6 pl-0"><label class="form__label">Link</label></div>
                                        </div>
                                        <div v-if="movie && movie.type === 1" class="row">
                                            <div class="col-2 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.season">
                                            </div>
                                            <div class="col-2 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.episode">
                                            </div>
                                            <div class="col-2 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.part">
                                            </div>
                                            <div class="col-6 pl-0">
                                                <input type="text" class="profile__input"
                                                       v-model="link.link">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-modal>

                            <!-- content tabs nav -->
                            <ul class="nav nav-tabs content__tabs content__tabs--profile" id="content__tabs" role="tablist">
                                <li class="nav-item">
                                    <a :class="{'nav-link': true, 'active': this.selectedPage === 0}" @click="switchTab(0)">{{ $t('base.comments') }}</a>
                                </li>

                                <li class="nav-item">
                                    <a :class="{'nav-link': true, 'active': this.selectedPage === 1}" @click="switchTab(1)">{{ $t('base.photos') }}</a>
                                </li>

                                <li class="nav-item">
                                    <a :class="{'nav-link': true, 'active': this.selectedPage === 2}" @click="switchTab(2)">{{ $t('base.help_for_the_site') }}</a>
                                </li>
                            </ul>
                            <!-- end content tabs nav -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-8 col-xl-8" v-if="movie">
                        <!-- content tabs -->
                        <div class="tab-content">
                            <div :class="{ 'fade': true, 'show': this.selectedPage === 0, 'active': this.selectedPage === 0 }">
                                <div v-show="selectedPage === 0" class="row" v-if="movie">
                                    <!-- comments -->
                                    <div class="col-12">
                                        <div class="comments">
                                            <ul v-if="movie.comments.length" class="comments__list">
                                                <li v-for="comment in movie.comments" v-bind:key="comment.id" class="comments__item">
                                                    <div class="comments__autor">
                                                        <img class="comments__avatar" :src="comment.user.picture" alt="">
                                                        <span class="comments__name">{{ comment.user.username }}</span>
                                                        <span class="comments__time">{{ $moment(comment.created_at).format('YYYY-MM-DD H:mm:ss') }}</span>
                                                    </div>
                                                    <p class="comments__text">{{ comment.comment }}</p>
                                                    <div class="comments__actions">
                                                        <div class="comments__rate">
                                                            <button type="button" @click="toggleLike(comment.id, 1)"><i :class="{'opacity-one': comment.rated_by_user === 1}" class="icon ion-md-thumbs-up"></i>{{ comment.like }}</button>

                                                            <button type="button" @click="toggleLike(comment.id, 0)">{{ comment.dislike }}<i :class="{'opacity-one': comment.rated_by_user === 0}" class="icon ion-md-thumbs-down"></i></button>
                                                        </div>

                                                        <button v-if="loggedIn() && (comment.user.username === user().username || hasPermission('comments.delete'))" type="button" @click="deleteComment(comment.id)"><i class="icon ion-ios-close"></i>{{ $t('base.delete') }}</button>
                                                    </div>
                                                </li>
                                            </ul>
                                            <h3 v-else-if="!movie.comments.length && this.loggedIn()" class="section__text">{{ $t('base.no_comments') }}</h3>
                                            <h3 v-else-if="!movie.comments.length && !this.loggedIn()" class="section__text">{{ $t('base.log_in_to_comment') }}</h3>

                                            <form v-if="this.loggedIn()" @submit.prevent="sendComment" class="form">
                                                <textarea v-model="model.comment" id="text" name="text" required class="form__textarea" :placeholder="$t('base.message')"></textarea>
                                                <b-button v-if="this.$screen.width > 480" id="popover-target-1" class="emoji-button" variant="btn">
                                                    <emoji :emoji="{ id: 'slightly_smiling_face', skin: 1 }" :size="32" />
                                                </b-button>
                                                <b-popover target="popover-target-1" triggers="focus" placement="right">
                                                    <picker @select="emojiSelected" :showSkinTones="false" :showSearch="false" :showPreview="false" :showCategories="false" :emojiTooltip="false" :include="['people']" set="google" />
                                                </b-popover>

                                                <button type="submit" class="form__btn">{{ $t('base.send') }}</button>
                                            </form>
                                        </div>
                                    </div>
                                    <!-- end comments -->
                                </div>
                            </div>

                            <div :class="{ 'fade': true, 'show': this.selectedPage === 1, 'active': this.selectedPage === 1 }">
                                <div v-show="selectedPage === 1" v-if="false" class="gallery" itemscope>
                                    <div class="row">
                                        <!-- gallery item -->
                                        <figure v-for="(image, imageIndex) in movie.photos" v-bind:key="imageIndex" @click="index = imageIndex" class="col-12 col-sm-6 col-xl-4" itemprop="associatedMedia" itemscope>
                                            <img class="galleryImage" :src="image" />
                                        </figure>
                                        <!-- end gallery item -->
                                    </div>
                                </div>
                                <VueGallery :images="movie.photos" :index="index" @close="index = null"></VueGallery>
                            </div>

                            <div :class="{ 'fade': true, 'show': this.selectedPage === 2, 'active': this.selectedPage === 2 }">
                                <div v-show="selectedPage === 2" itemscope>
                                    <div class="row">
                                        <p v-for="(text, index) in helpTexts" v-bind:key="index" class="section__text" style="color: white;" v-html="text">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end content tabs -->
                    </div>

                    <!-- sidebar -->
                    <div class="col-12 col-lg-4 col-xl-4">
                        <div class="row" v-if="movie">
                            <!-- section title -->
                            <div class="col-12">
                                <h2 class="section__title">{{ $t('base.you_may_also_like') }}</h2>
                            </div>
                            <!-- end section title -->

                            <movie-card v-for="alsoMovie in movie.also_watch" v-bind:key="alsoMovie.id" :movie="alsoMovie" classes="col-6 col-sm-4 col-lg-6"></movie-card>

                        </div>
                    </div>
                    <!-- end sidebar -->
                </div>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import SlideUpDown from 'vue-slide-up-down'
import {Youtube} from "vue-youtube";
import MovieCard from "@/components/MovieCard";
import { Picker } from 'emoji-mart-vue'
import { Emoji } from 'emoji-mart-vue'
import VueGallery from 'vue-gallery';
import StarRating from 'vue-star-rating'
import {mapGetters} from "vuex";
import Multiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
    name: "MovieDetail",
    components: {
        MovieCard,
        Header,
        Footer,
        SlideUpDown,
        Youtube,
        Picker,
        Emoji,
        VueGallery,
        StarRating,
        Multiselect
    },

    data() {
        return {
            movie: null,
            expanded: false,
            expandFinished: false,
            selectedPage: 0,
            index: null,
            rating: 1,
            model: {
                comment: '',
            },
            links: [],
        };
    },

    computed: {
        ...mapGetters("movie", [
            "moviesInfo",
        ]),
        helpTexts() {
            return this.$t('texts.help_text');
        },
        forrasUrl() {
            return process.env.VUE_APP_FORRAS_URL;
        },
        facebookShareURL() {
            let link = window.location.href;
            link = this.forrasUrl + '/share/' + this.$i18n.locale + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.length;
            return "https://www.facebook.com/plugins/share_button.php?href="+ link +"&layout=button&size=large&appId=173051317389993&width=100&height=28";
        },
        metaInfo() {
            return {
                title: 'Cinemaa.cc',
                titleTemplate: '%s - Yay!',
                meta: [
                    {property: 'og:title', content: this.movie ? this.movie.titles['hu'] : 'Cinemaa'},
                    {property: 'og:type', content: 'movie'},
                    {property: 'og:url', content: 'http://c5e3b0ec.ngrok.io/blog/s'},// here it is just ngrok for my test
                    {property: 'og:description', content: 'description'},
                    {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/dev-blog-2503f.appspot.com/o/postsStorage%2F-KxXdvvLqDHBcxdUfLgn%2Fonfleck?alt=media&token=24a9bf5b-dce2-46e8-b175-fb63f7501c98'},
                    {property: 'og:image:width', content: '1000'},
                    {property: 'og:site_name', content: 'Cinemaa.cc'}
                ]
            };
        }
    },

    created() {
        this.fetchMovie();
    },

    methods: {
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
        toBeWatchedMovie()
        {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/toBeWatchedMovie', {movie_id: this.movie.id}).then((response) => {
                    this.movie = response.data;

                    if(this.movie.to_be_watched_by_user) {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.to_be_watched_successful'),
                                type: 'success'
                            }
                        );
                    }

                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.error'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        favouriteMovie()
        {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/favouriteMovie', {movie_id: this.movie.id}).then((response) => {
                    this.movie = response.data;

                    if(this.movie.favourited_by_user) {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.favourite_successful'),
                                type: 'success'
                            }
                        );
                    }

                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.error'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        watchedMovie()
        {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/watchedMovie', {movie_id: this.movie.id}).then((response) => {
                    this.movie = response.data;

                    if(this.movie.watched_by_user) {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.watched_successful'),
                                type: 'success'
                            }
                        );
                    }

                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.error'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        emojiSelected(emoji)
        {
            this.model.comment += emoji.native;
        },
        fetchMovie() {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/getMovie', {slug: this.$route.params.slug, year: this.$route.params.year, length: this.$route.params.length}).then((response) => {
                this.movie = response.data;
                this.$emit('loadingUpdated', false);
            });
        },
        switchTab(num) {
            this.selectedPage = num;
        },
        sendVideoReport() {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/sendReport', {id: this.movie.videos[0].id, type: 1, movie_id: this.movie.id}).then((comments) => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.report_successful'),
                            type: 'success'
                        }
                    );
                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.already_reported'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        toggleLike(comment_id, type) {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/rateComment', {comment_id: comment_id, type: type}).then((comments) => {
                    this.movie.comments = comments.data;
                    this.$emit('loadingUpdated', false);
                });
            }
        },
        sendComment() {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/commentMovie', {
                    movie_id: this.movie.id,
                    comment: this.model.comment
                }).then((response) => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.comment_successful'),
                            type: 'success'
                        }
                    );

                    this.movie = response.data;
                    this.model.comment = '';
                    this.$emit('loadingUpdated', false);
                });
            }
        },
        deleteComment(comment_id) {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/deleteComment', {comment_id: comment_id}).then((response) => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.comment_successful_deleted'),
                            type: 'success'
                        }
                    );

                    this.movie = response.data;
                    this.$emit('loadingUpdated', false);
                });
            }
        },
        ratingSelected()
        {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/rateMovie', {movie_id: this.movie.id, rating: this.movie.rating}).then((response) => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.rating_successful'),
                            type: 'success'
                        }
                    );

                    this.movie = response.data;
                    this.$emit('loadingUpdated', false);
                }).catch(() => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.rating_error'),
                            type: 'error'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        showSubmitLink() {
            this.$bvModal.show('submitLinkModal');
        },

        submitLink(event) {
            event.preventDefault();

            if(this.links.length > 0) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('movie/submitLink', {movie_id: this.movie.id, links: this.links}).then((response) => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.submit_successful'),
                            type: 'success'
                        }
                    );
                    this.$bvModal.hide('submitLinkModal');
                    this.links = [];
                    this.$emit('loadingUpdated', false);
                }).catch((error) => {
                    const statusCode = error.response.status;

                    if(statusCode === 300) {
                        this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.link_mismatch'),
                            type: 'error'
                        });
                        this.$emit('loadingUpdated', false);

                        return;
                    }

                    if(statusCode === 301) {
                        this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.link_exists'),
                            type: 'error'
                        });
                        this.$emit('loadingUpdated', false);

                        return;
                    }

                    this.$emit('loadingUpdated', false);
                });
            } else {
                this.$bvModal.hide('submitLinkModal');
            }
        },
        readMeButton()
        {
            if(this.expanded) {
                this.expanded = false;
                this.expandFinished = false;
            } else {
                this.expanded = true;
            }
        }
    },
    watch: {
        '$route':{
            handler: function(to, from) {
                if(to.name === 'movie' || to.name === 'serie') {
                    this.fetchMovie();
                    this.selectedPage = 0;
                }
            },
            immediate: false
        },
    }
};
</script>


<style scoped>
.fa-heart {
    color: white;
}

.fa-heart:hover, .fa-heart.enabled {
    color: #f77f00;
}

.opacity-one {
    opacity: 1;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.left-70 {
    left: 70px !important;
}

.emoji-button {
    position: absolute;
    right: 30px;
    box-shadow: none;
}

@media (min-width: 576px) {
    .emoji-button {
        position: absolute;
        right: 60px;
        box-shadow: none;
    }
}

.vue-star-rating {
    margin-left: auto;
}

.expanded {
    display: inline;
}
</style>

<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.forum')"></PageTitle>
        <div class="container pt-5">
            <Adsense
                class="text-center pb-5"
                data-ad-client="ca-pub-3890640160453569"
                data-ad-slot="2375609994"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </Adsense>
            <div class="row">
                <div class="col-lg-12 pb-5">
                    <div class="wrapper wrapper-content animated fadeInRight">
                        <div class="ibox-content forum-container">

                            <div class="forum-title" :class="{'pl-3': this.selectedTopic}">
                                <div class="pull-right forum-desc text-right" v-if="mode === 0">
                                    <small>{{ $t('pages.forum.all_posts') }}: {{ allPosts }}</small>
                                </div>
                                <h3>{{ selectedDiscussion ? selectedDiscussion.name : (selectedTopic ? selectedTopic.name : $t('pages.forum.forums')) }}</h3>
                            </div>

                            <div v-if="mode === 0" class="forum-item" v-for="(discussion, index) in discussions" v-bind:key="index">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <font-awesome-icon icon="align-justify" size="3x" :class="{'seen': discussion.seen, 'not-seen': !discussion.seen}" />
                                        </div>
                                        <router-link class="forum-item-title" @click="selectedDiscussion = discussion" :to="{ name: 'forum', params: { lang: $t('navTexts.forum'), discussion: discussion.id}}">{{ discussion.name }}</router-link>
                                        <div class="forum-sub-title">{{ discussion.description }}
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">{{ discussion.views }}</span>
                                        <div>
                                            <small>{{ $t('pages.forum.views') }}</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">{{ discussion.topics }}</span>
                                        <div>
                                            <small>{{ $t('pages.forum.topics') }}</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">{{ discussion.posts }}</span>
                                        <div>
                                            <small>{{ $t('pages.forum.posts') }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="mode === 1" class="forum-item" v-for="(topic, index) in topics" v-bind:key="index">
                                <div class="row">
                                    <div class="col-md-10">
                                        <div class="forum-icon">
                                            <font-awesome-icon icon="align-justify" size="3x" :class="{'seen': topic.seen, 'not-seen': !topic.seen}" />
                                        </div>
                                        <router-link class="forum-item-title" @click="selectedTopic = topic" :to="{ name: 'forum', params: { lang: $t('navTexts.forum'), discussion: $route.params.discussion, topic: topic.id}}">{{ topic.name }}</router-link>
                                        <div style="color: #999;">{{ topic.description }}
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">{{ topic.views }}</span>
                                        <div>
                                            <small>{{ $t('pages.forum.views') }}</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">{{ topic.posts }}</span>
                                        <div>
                                            <small>{{ $t('pages.forum.posts') }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="mode === 2">
                                <!-- Forum Detail -->
                                <div class="inner-main-body p-2 p-sm-3 forum-content">
                                    <div class="card mb-2" v-for="(post, index) in selectedTopic.posts.data" v-bind:key="index">
                                        <div class="card-body">
                                            <div class="media forum-item">
                                                <a class="card-link" style="max-width: 100px;">
                                                    <router-link class="d-block text-center" :to="{ name: 'user', params: { lang: $t('navTexts.user'), username: post.user.username}}">{{ post.user.username }}</router-link>
                                                    <img :src="post.user.picture" class="rounded-circle" style="width: 100px; height: 100px" width="50" alt="User" />
                                                    <small class="d-block text-center text-muted"><b><span :class="['role-' + post.user.role]">{{ $t('roles.' + post.user.role) }}</span></b></small>
                                                    <div class="comments__rate">
                                                        <button type="button" @click="toggleLike(post.id, 1)"><i :class="{'opacity-one': post.rated_by_user === 1}" class="icon ion-md-thumbs-up"></i>{{ post.like }}</button>

                                                        <button type="button" @click="toggleLike(post.id, 0)">{{ post.dislike }}<i :class="{'opacity-one': post.rated_by_user === 0}" class="icon ion-md-thumbs-down"></i></button>
                                                    </div>
                                                </a>
                                                <div class="media-body ml-3">
                                                    <small class="text-muted ml-2ű">{{ post.created_at }}</small>
                                                    <div class="mt-3 font-size-sm pb-5" v-html="post.message" style="color: white;">

                                                    </div>
                                                    <div class="comments__actions">

                                                        <button v-if="loggedIn() && (post.user.username === user().username || hasPermission('comments.delete'))" type="button" @click="deletePost(post.id)"><i class="icon ion-ios-close"></i>{{ $t('base.delete') }}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /Forum Detail -->

                                <div v-if="this.page === this.lastPage" class="p-3">
                                    <form v-if="this.loggedIn()" @submit.prevent="sendPost" class="form">
                                        <textarea v-model="model.message" id="text" name="text" required class="form__textarea" :placeholder="$t('base.message')"></textarea>
                                        <b-button v-if="this.$screen.width > 480" id="popover-target-1" class="emoji-button" variant="btn">
                                            <emoji :emoji="{ id: 'slightly_smiling_face', skin: 1 }" :size="32" />
                                        </b-button>
                                        <b-popover target="popover-target-1" triggers="focus" placement="right">
                                            <picker @select="emojiSelected" :showSkinTones="false" :showSearch="false" :showPreview="false" :showCategories="false" :emojiTooltip="false" :include="['people']" set="google" />
                                        </b-popover>

                                        <button type="submit" class="form__btn">{{ $t('base.send') }}</button>
                                    </form>
                                </div>

                                <!-- paginator -->
                                <div v-if="this.selectedTopic.posts.data && this.selectedTopic.posts.data.length > 0" class="col-12 mb-5">
                                    <ul v-if="Object.keys(selectedTopic.posts).length > 0" class="paginator">
                                        <li v-if="this.selectedTopic.posts.links.first !== this.selectedTopic.posts.links.last && this.selectedTopic.posts.meta.current_page !== 1" class="paginator__item paginator__item--next">
                                            <a @click="navigation(selectedTopic.posts.links.first)"><font-awesome-icon icon="angle-double-left" /></a>
                                        </li>

                                        <li v-if="this.selectedTopic.posts.meta.current_page !== 1" class="paginator__item paginator__item-prev">
                                            <a @click="navigation(selectedTopic.posts.links.prev)"><font-awesome-icon icon="angle-left" /></a>
                                        </li>

                                        <li v-if="this.selectedTopic.posts.meta.current_page === 1" class="paginator__item paginator__item--active">
                                            <a>{{ this.selectedTopic.posts.meta.current_page }}</a>
                                        </li>
                                        <li v-if="this.selectedTopic.posts.meta.current_page === 1 && this.selectedTopic.posts.links.next !== null" class="paginator__item">
                                            <a @click="navigation(nextNPage(1))">{{ this.selectedTopic.posts.meta.current_page+1 }}</a>
                                        </li>
                                        <li v-if="this.selectedTopic.posts.meta.current_page === 1 && this.selectedTopic.posts.meta.last_page > 2" class="paginator__item">
                                            <a @click="navigation(nextNPage(2))">{{ this.selectedTopic.posts.meta.current_page+2 }}</a>
                                        </li>


                                        <li v-if="this.selectedTopic.posts.meta.current_page > 1 && this.selectedTopic.posts.meta.current_page < this.selectedTopic.posts.meta.last_page" class="paginator__item">
                                            <a @click="navigation(previousNPage(1))">{{ this.selectedTopic.posts.meta.current_page-1 }}</a>
                                        </li>

                                        <li v-if="this.selectedTopic.posts.meta.current_page > 1 && this.selectedTopic.posts.meta.current_page < this.selectedTopic.posts.meta.last_page" class="paginator__item paginator__item--active">
                                            <a>{{ this.selectedTopic.posts.meta.current_page }}</a>
                                        </li>

                                        <li v-if="this.selectedTopic.posts.meta.current_page > 1 && this.selectedTopic.posts.meta.current_page < this.selectedTopic.posts.meta.last_page" class="paginator__item">
                                            <a @click="navigation(nextNPage(1))">{{ this.selectedTopic.posts.meta.current_page+1 }}</a>
                                        </li>


                                        <li v-if="this.selectedTopic.posts.meta.current_page === this.selectedTopic.posts.meta.last_page && this.selectedTopic.posts.meta.current_page-2 >= 1 && this.selectedTopic.posts.links.prev" class="paginator__item">
                                            <a @click="navigation(previousNPage(2))">{{ this.selectedTopic.posts.meta.current_page-2 }}</a>
                                        </li>
                                        <li v-if="this.selectedTopic.posts.meta.current_page === this.selectedTopic.posts.meta.last_page && this.selectedTopic.posts.links.prev !== null" class="paginator__item">
                                            <a @click="navigation(previousNPage(1))">{{ this.selectedTopic.posts.meta.current_page-1 }}</a>
                                        </li>
                                        <li v-if="this.selectedTopic.posts.meta.current_page === this.selectedTopic.posts.meta.last_page && this.selectedTopic.posts.meta.current_page !== 1" class="paginator__item paginator__item--active">
                                            <a>{{ this.selectedTopic.posts.meta.current_page }}</a>
                                        </li>


                                        <li v-if="this.selectedTopic.posts.meta.current_page !== this.selectedTopic.posts.meta.last_page" class="paginator__item paginator__item--next">
                                            <a @click="navigation(selectedTopic.posts.links.next)"><font-awesome-icon icon="angle-right" /></a>
                                        </li>

                                        <li v-if="this.selectedTopic.posts.links.first !== this.selectedTopic.posts.links.last && this.selectedTopic.posts.meta.current_page !== this.selectedTopic.posts.meta.last_page" class="paginator__item paginator__item--next">
                                            <a @click="navigation(selectedTopic.posts.links.last)"><font-awesome-icon icon="angle-double-right" /></a>
                                        </li>
                                    </ul>
                                </div>
                                <div v-else class="mb-5 text-center">
                                    <p class="section__text">{{ $t('pages.forum.no_posts') }}</p>
                                </div>
                                <!-- end paginator -->
                            </div>
                        </div>
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
        <div v-if="false" class="m-auto w-100 text-center" style="color: white;">
            <h3>{{ $t('messages.function_not_available') }}</h3>
        </div>
        <Footer></Footer>
    </div>
</template>

<style scoped>
.seen {
    color: darkgreen;
}
.not-seen {
    color: #f77f00;
}

.opacity-one {
    opacity: 1;
}
.comments__rate {
    display: inline-flex;
    padding-top: 30px;
    position: unset;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: unset !important;
    background-clip: border-box;
    border: 1px solid black !important;
    border-radius: .25rem;
}

.card-body {
    padding-bottom: 0px;
}

.comments__actions {
    padding: 25px;
    padding-bottom: 0px;
    padding-right: 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: unset;
    border: unset;
    position: relative;
    border-radius: 0 0 6px 6px;
}
.emoji-button {
    position: absolute;
    right: 30px;
    box-shadow: none;
}

@media (min-width: 576px) {
    .emoji-button {
        position: absolute;
        right: 75px;
        box-shadow: none;
    }
}
.white-bg {
    background-color: rgba(210, 201, 255, 0.01);
}
.page-heading {
    border-top: 0;
    padding: 0 10px 20px 10px;
}

.forum-post-container .media {
    margin: 10px 10px 10px 10px;
    padding: 20px 10px 20px 10px;
}
.forum-avatar {
    float: left;
    margin-right: 20px;
    text-align: center;
    width: 110px;
}
.forum-avatar .img-circle {
    height: 48px;
    width: 48px;
}
.author-info {
    color: #676a6c;
    font-size: 11px;
    margin-top: 5px;
    text-align: center;
}
.forum-post-info {
    padding: 9px 12px 6px 12px;
    background: #f9f9f9;
    border: 1px solid #f1f1f1;
}
.media-body > .media {
    background: #f9f9f9;
    border-radius: 3px;
    border: 1px solid #f1f1f1;
}
.forum-post-container .media-body .photos {
    margin: 10px 0;
}
.forum-photo {
    max-width: 140px;
    border-radius: 3px;
}
.media-body > .media .forum-avatar {
    width: 70px;
    margin-right: 10px;
}
.media-body > .media .forum-avatar .img-circle {
    height: 38px;
    width: 38px;
}
.mid-icon {
    font-size: 66px;
}
.forum-item {
    margin: 10px 0;
    padding: 10px 0 0px;
}
.views-number {
    color: #f77f00;
    font-size: 24px;
    line-height: 18px;
    font-weight: 400;
}
.forum-container,
.forum-post-container {
    padding: 30px !important;
}
.forum-item small {
    color: #999;
}
.forum-item .forum-sub-title {
    color: #999;
    margin-left: 50px;
}
.forum-title {
    margin: 15px 0 15px 0;
    color: white;
}
.forum-info {
    text-align: center;
}
.forum-desc {
    color: white;
}
.forum-icon {
    float: left;
    width: 30px;
    margin-right: 20px;
    text-align: center;
}
a.forum-item-title {
    color: white;
    display: block;
    font-size: 18px;
    font-weight: 600;
}
a.forum-item-title:hover {
    color: inherit;
}
.forum-icon {
    color: white;
}
.forum-item.active .fa {
    color: #1ab394;
}
.forum-item.active a.forum-item-title {
    color: #1ab394;
}
@media (max-width: 992px) {
    .forum-info {
        margin: 15px 0 10px 0;
        /* Comment this is you want to show forum info in small devices */
        display: none;
    }
    .forum-desc {
        float: none !important;
    }
}





.ibox {
    clear: both;
    color: white;
    margin-bottom: 25px;
    margin-top: 0;
    padding: 0;
}
.ibox.collapsed .ibox-content {
    display: none;
}
.ibox.collapsed .fa.fa-chevron-up:before {
    content: "\f078";
}
.ibox.collapsed .fa.fa-chevron-down:before {
    content: "\f077";
}
.ibox:after,
.ibox:before {
    display: table;
}
.ibox-title {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background-color: rgba(210, 201, 255, 0.04);
    color: inherit;
    margin-bottom: 0;
    padding: 14px 15px 7px;
    min-height: 48px;
}
.ibox-content {
    background-color: rgba(210, 201, 255, 0.04);
    color: inherit;
    padding: 15px 20px 20px 20px;
}
.ibox-footer {
    color: inherit;
    font-size: 90%;
    background: rgba(210, 201, 255, 0.04);
    padding: 10px 15px;
}

.message-input {
    height: 90px !important;
}
.form-control, .single-line {
    background-color: rgba(210, 201, 255, 0.04);
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    font-size: 14px;
}
.text-navy {
    color: #1ab394;
}
.mid-icon {
    font-size: 66px !important;
}
.m-b-sm {
    margin-bottom: 10px;
}


/* Detail */
.inner-wrapper {
    position: relative;
    height: calc(100vh - 3.5rem);
    transition: transform 0.3s;
}
@media (min-width: 992px) {
    .sticky-navbar .inner-wrapper {
        height: calc(100vh - 3.5rem - 48px);
    }
}

.inner-main,
.inner-sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
}
.inner-sidebar {
    left: 0;
    width: 235px;
    border-right: 1px solid #cbd5e0;
    background-color: #fff;
    z-index: 1;
}
.inner-main {
    right: 0;
    left: 235px;
}
.inner-main-footer,
.inner-main-header,
.inner-sidebar-footer,
.inner-sidebar-header {
    height: 3.5rem;
    border-bottom: 1px solid #cbd5e0;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    flex-shrink: 0;
}
.inner-main-body,
.inner-sidebar-body {
    padding: 1rem;
    overflow-y: auto;
    position: relative;
    flex: 1 1 auto;
}
.inner-main-body .sticky-top,
.inner-sidebar-body .sticky-top {
    z-index: 999;
}
.inner-main-footer,
.inner-main-header {
    background-color: #fff;
}
.inner-main-footer,
.inner-sidebar-footer {
    border-top: 1px solid #cbd5e0;
    border-bottom: 0;
    height: auto;
    min-height: 3.5rem;
}
@media (max-width: 767.98px) {
    .inner-sidebar {
        left: -235px;
    }
    .inner-main {
        left: 0;
    }
    .inner-expand .main-body {
        overflow: hidden;
    }
    .inner-expand .inner-wrapper {
        transform: translate3d(235px, 0, 0);
    }
}

.nav .show>.nav-link.nav-link-faded, .nav-link.nav-link-faded.active, .nav-link.nav-link-faded:active, .nav-pills .nav-link.nav-link-faded.active, .navbar-nav .show>.nav-link.nav-link-faded {
    color: #3367b5;
    background-color: #c9d8f0;
}

.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: #fff;
    background-color: #467bcb;
}
.nav-link.has-icon {
    display: flex;
    align-items: center;
}
.nav-link.active {
    color: #467bcb;
}
.nav-pills .nav-link {
    border-radius: .25rem;
}
.nav-link {
    color: #4a5568;
}
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}
</style>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";
import {mapGetters} from "vuex";
import { Picker } from 'emoji-mart-vue'
import { Emoji } from 'emoji-mart-vue'

export default {
    name: "Forum",
    components: {
        Header,
        Footer,
        PageTitle,
        Emoji,
        Picker
    },

    computed: {
        ...mapGetters("forum", [
            "discussions",
            "topics"
        ]),
    },

    data()
    {
        return {
            selectedDiscussion: null,
            selectedTopic: null,
            mode: -1,
            allPosts: 0,
            page: 1,
            lastPage: -1,
            model: {
                message: '',
            }
        };
    },

    created() {
        if(this.$route.params.discussion && !this.$route.params.topic) {
            this.getTopics(this.$route.params.discussion);
        } else if(this.$route.params.topic) {
            this.viewTopic(this.$route.params.topic);
        } else {
            this.mode = 0;
            if(this.discussions && this.discussions.length === 0) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('forum/getDiscussions').then((res) => {
                    let count = 0;
                    res.data.forEach((disc) => {
                        count += disc.posts;
                    });
                    this.allPosts = count;
                    this.$emit('loadingUpdated', false);
                });
            }
        }
    },

    methods: {
        getTopics(id)
        {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('forum/getTopics', {discussion_id: id}).then(() => {
                this.selectedDiscussion = this.discussions.find(x => x.id === id);
                this.mode = 1;
                this.$emit('loadingUpdated', false);
            });
        },
        viewTopic(topic_id)
        {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('forum/getTopic', {discussion_id: this.$route.params.discussion, topic_id: topic_id}).then((res) => {
                this.selectedTopic = res.data;
                this.lastPage = res.data.posts_last_page;
                this.page = this.lastPage;

                this.getPosts(topic_id, this.lastPage);
            });
        },
        getPosts(topic_id, page) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('forum/getPosts', {discussion_id: this.$route.params.discussion, topic_id: topic_id, page: page}).then((res) => {
                this.selectedTopic.posts = res;
                this.mode = 2;
                this.$emit('loadingUpdated', false);
            });
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];
                this.page = parseInt(page);

                this.getPosts(this.selectedTopic.id, page);
            }
        },
        replaceUrlParam(url, paramName, paramValue) {
            if (paramValue == null) {
                paramValue = '';
            }
            var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
            if (url.search(pattern)>=0) {
                return url.replace(pattern,'$1' + paramValue + '$2');
            }
            url = url.replace(/[?#]$/,'');
            return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
        },
        previousNPage(n) {
            let url = this.selectedTopic.posts.meta.path;
            url = this.replaceUrlParam(url, 'page', this.selectedTopic.posts.meta.current_page - n);
            return url;
        },
        nextNPage(n) {
            let url = this.selectedTopic.posts.meta.path;
            url = this.replaceUrlParam(url, 'page', this.selectedTopic.posts.meta.current_page + n);
            return url;
        },
        emojiSelected(emoji)
        {
            this.model.message += emoji.native;
        },
        toggleLike(post_id, type) {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('forum/ratePost', {post_id: post_id, type: type, page: this.page}).then((posts) => {
                    this.selectedTopic.posts = posts;
                    this.$emit('loadingUpdated', false);
                });
            }
        },
        sendPost() {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('forum/sendPost', {
                    topic_id: this.selectedTopic.id,
                    message: this.model.message,
                    page: this.page
                }).then((posts) => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.post_successful'),
                            type: 'success'
                        }
                    );

                    this.selectedTopic.posts = posts;
                    this.model.message = '';
                    this.$emit('loadingUpdated', false);
                }).catch((error) => {
                    if (error.response?.status === 403) {
                        this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.forum_first_post'),
                            type: 'error'
                        });
                    }

                    this.$emit('loadingUpdated', false);
                });
            }
        },
        deletePost(post_id) {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('forum/deletePost', {post_id: post_id}).then((posts) => {
                    this.selectedTopic.posts = posts;

                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.comment_successful_deleted'),
                            type: 'success'
                        }
                    );

                    this.$emit('loadingUpdated', false);
                });
            }
        },
    }
};
</script>

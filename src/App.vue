<template>
  <div id="app" class="body">
      <div>
          <BackToTop></BackToTop>
          <loading :active.sync="loading"
                   :is-full-page="true"
                   background-color="#000"
                   color="red"
                   loader="dots"></loading>
          <div class="chat-button" v-if="loggedIn() && this.$route.name && !this.$route.name.includes('admin')">
              <router-link :to="{ name: 'chat'}">
                  <font-awesome-layers>
                      <font-awesome-icon icon="comment" size="3x"/>
                      <span class="comment-badge" v-if="unreadMessages > 0">
                          {{ unreadMessages }}
                      </span>
                  </font-awesome-layers>
              </router-link>
          </div>
          <div class="request-button" v-if="loggedIn() && hasPermission('links.submit') && this.$route.name && !this.$route.name.includes('admin')">
              <router-link :to="{ name: 'requests'}">
                  <font-awesome-layers>
                      <font-awesome-icon icon="bell" size="3x"/>
                      <span class="comment-badge" v-if="unreadRequests > 0">
                          {{ unreadRequests }}
                      </span>
                  </font-awesome-layers>
              </router-link>
          </div>
          <router-view :key="$route.fullPath" @loadingUpdated="loadingUpdated"/>
      </div>
  </div>
</template>

<style scoped>
    @media (max-width: 768px) {
        .chat-button {
            color: orange;
            position: fixed;
            left: 1em;
            bottom: 2em;
            z-index: 50;
        }
        .request-button {
            color: orange;
            position: fixed;
            left: 5em;
            bottom: 2em;
            z-index: 50;
        }
    }

    @media (min-width: 768px) {
        .chat-button {
            border-radius: 100%;
            color: white;
            position: fixed;
            right: 3em;
            bottom: 2em;
            z-index: 50;
        }
        .request-button {
            border-radius: 100%;
            color: white;
            position: fixed;
            right: 7em;
            bottom: 2em;
            z-index: 50;
        }
    }

    .comment-badge{
        position:absolute;
        right: -40px;
        top: -20px;
        content: attr(data-count);
        font-size:70%;
        padding:.6em;
        border-radius:999px;
        line-height:.75em;
        color: white;
        background:rgba(255,0,0,.85);
        text-align:center;
        min-width:2em;
        font-weight:bold;
    }

</style>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import {mapGetters} from "vuex";
import BackToTop from "@/components/pageComponents/BackToTop";

export default {
    name: "App",

    components: {
        Loading,
        BackToTop
    },

    computed: {
        ...mapGetters("movie", [
            "moviesInfo",
        ]),
    },

    data() {
        return {
            loading: false,
            unreadMessages: 0,
            unreadRequests: 0,
        }
    },

    beforeMount() {
        localStorage.removeItem('movies_filter');
        localStorage.removeItem('series_filter');
    },

    created()
    {
        console.log('starting');
        console.log(process.env.NODE_ENV);
        this.$root.$on('unreadReset', () => {
            this.unreadMessages = 0;
        });

        this.$root.$on('unreadRequestsReset', () => {
            this.unreadRequests = 0;
        });

        if(this.moviesInfo && Object.keys(this.moviesInfo).length === 0) {
            this.loading = true;
            this.$store.dispatch('movie/getMoviesInfo').then(() => {
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }

        if(this.loggedIn()) {
            this.$store.dispatch('auth/getOnlineUsers');
            window.Echo.private('Cinema.Notification.' + this.user().id)
                .listen('.ChatMessageSent', (e) => {
                    let audio = new Audio('./sounds/ding.mp3');
                    audio.play();
                    if(this.$route.name !== 'chat') {
                        this.unreadMessages++;
                    }
                })
                .listen('.RequestReceived', (e) => {
                    let audio = new Audio('./sounds/ding.mp3');
                    audio.play();
                    if(this.$route.name !== 'requests') {
                        this.unreadRequests++;
                    }
                });

            this.$store.dispatch('general/getUnreadMessagesCount').then((res) => {
                this.unreadMessages = res.chat;
                this.unreadRequests = res.requests;
            });

        }
    },

    watch: {
        '$route':{
            handler: (to, from) => {
                const baseTitle = to.meta.title || i18n.t('meta.base');
                document.title = baseTitle + ' | ' + process.env.VUE_APP_NAME;

                if(to.meta.auth && !store.getters["auth/loggedIn"]) {
                    router.push({'name': 'login', params: { lang: i18n.t('navTexts.login').toString() }});
                } else if(to.meta.only_guest && store.getters["auth/loggedIn"]) {
                    router.push({'name': 'home'});
                }

                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            },
            immediate: true
        },
        '$i18n.locale':{
            handler: function(locale) {
                const baseTitle = router.currentRoute.meta.title || i18n.t('meta.base');
                document.title = baseTitle + ' | ' + process.env.VUE_APP_NAME;

                let params = router.currentRoute.params;
                params.lang = i18n.t('navTexts.' + router.currentRoute.name, locale).toString();

                this.$moment.locale(locale);

                router.push({name: router.currentRoute.name, params: params});
            }
        }
    },

    methods: {
        loadingUpdated(value) {
            this.loading = value;
        }
    }
}
</script>

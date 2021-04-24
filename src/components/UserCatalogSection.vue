<template>
    <section>
        <section class="content" style="padding-bottom: 0px; margin-top: 5em !important;">
            <div class="content__head">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
                        <div v-for="user in this.users.data" v-bind:key="user.id" class="col mb-3 mt-3">
                            <div class="card">
                                <div class="card-body text-center">
                                    <img :src="user.picture" style="width:100px;margin-top:-65px" alt="User" class="img-fluid img-thumbnail rounded-circle mb-3" :class="{'user-online': user.status === 1}">
                                    <h5 class="card-title" style="color: white !important;">{{ user.username }}</h5>
                                    <p class="text-secondary mb-1">{{ $t('base.role') }}: <b><span :class="['role-' + user.role]">{{ $t('roles.' + user.role) }}</span></b></p>
                                    <p class="text-muted font-size-sm mb-1">{{ $t('base.activity') }}: {{ user.last_activity_at }}</p>
                                </div>
                                <div class="card-footer">
                                    <router-link :to="{ name: 'user', params: { lang: $t('navTexts.user'), username: user.username}}" class="btn btn-sm has-icon btn-block">
                                        <b>{{ $t('base.profile')}}</b>
                                    </router-link>

                                    <router-link :to="{ name: 'chat', params: { username: user.username }}" class="btn btn-sm has-icon ml-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- paginator -->
                    <div v-if="this.users.data && this.users.data.length > 0" class="col-12 mb-5">
                        <ul v-if="Object.keys(this.users).length > 0" class="paginator">
                            <li v-if="this.users.links.first !== this.users.links.last && this.users.meta.current_page !== 1" class="paginator__item paginator__item--next">
                                <a @click="navigation(users.links.first)"><font-awesome-icon icon="angle-double-left" /></a>
                            </li>

                            <li v-if="this.users.meta.current_page !== 1" class="paginator__item paginator__item-prev">
                                <a @click="navigation(users.links.prev)"><font-awesome-icon icon="angle-left" /></a>
                            </li>

                            <li v-if="this.users.meta.current_page === 1" class="paginator__item paginator__item--active">
                                <a>{{ this.users.meta.current_page }}</a>
                            </li>
                            <li v-if="this.users.meta.current_page === 1 && this.users.links.next !== null" class="paginator__item">
                                <a @click="navigation(nextNPage(1))">{{ this.users.meta.current_page+1 }}</a>
                            </li>
                            <li v-if="this.users.meta.current_page === 1 && this.users.meta.last_page > 2" class="paginator__item">
                                <a @click="navigation(nextNPage(2))">{{ this.users.meta.current_page+2 }}</a>
                            </li>


                            <li v-if="this.users.meta.current_page > 1 && this.users.meta.current_page < this.users.meta.last_page" class="paginator__item">
                                <a @click="navigation(previousNPage(1))">{{ this.users.meta.current_page-1 }}</a>
                            </li>

                            <li v-if="this.users.meta.current_page > 1 && this.users.meta.current_page < this.users.meta.last_page" class="paginator__item paginator__item--active">
                                <a>{{ this.users.meta.current_page }}</a>
                            </li>

                            <li v-if="this.users.meta.current_page > 1 && this.users.meta.current_page < this.users.meta.last_page" class="paginator__item">
                                <a @click="navigation(nextNPage(1))">{{ this.users.meta.current_page+1 }}</a>
                            </li>


                            <li v-if="this.users.meta.current_page === this.users.meta.last_page && this.users.meta.current_page-2 >= 1 && this.users.links.prev" class="paginator__item">
                                <a @click="navigation(previousNPage(2))">{{ this.users.meta.current_page-2 }}</a>
                            </li>
                            <li v-if="this.users.meta.current_page === this.users.meta.last_page && this.users.links.prev !== null" class="paginator__item">
                                <a @click="navigation(previousNPage(1))">{{ this.users.meta.current_page-1 }}</a>
                            </li>
                            <li v-if="this.users.meta.current_page === this.users.meta.last_page && this.users.meta.current_page !== 1" class="paginator__item paginator__item--active">
                                <a>{{ this.users.meta.current_page }}</a>
                            </li>


                            <li v-if="this.users.meta.current_page !== this.users.meta.last_page" class="paginator__item paginator__item--next">
                                <a @click="navigation(users.links.next)"><font-awesome-icon icon="angle-right" /></a>
                            </li>

                            <li v-if="this.users.links.first !== this.users.links.last && this.users.meta.current_page !== this.users.meta.last_page" class="paginator__item paginator__item--next">
                                <a @click="navigation(users.links.last)"><font-awesome-icon icon="angle-double-right" /></a>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="mb-5 text-center">
                        <p class="section__text">{{ this.$t('messages.no_movies_found') }}</p>
                    </div>
                    <!-- end paginator -->
                </div>
            </div>
        </section>
    </section>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: "UserCatalogSection",
    components: {},
    props: {
        title: {
            type: String,
            default: '',
        },
        users: {
            type: Object,
            default: () => {
                return {};
            }
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
        }
    },

    created() {
        if(this.loggedIn()) {
            this.$store.dispatch('auth/getOnlineUsers');
        }
    },

    computed: {
        ...mapGetters("auth", [
            "onlineUsers"
        ])
    },

    watch: {
        'onlineUsers': {
            handler: function() {
                this.updateOnlineStatus();
            },
            immediate: false
        }
    },

    methods: {
        updateOnlineStatus() {
            this.users.data.forEach((user, userI) => {
                let onlineUser = this.onlineUsers.filter(x => x.id === user.id);

                if(onlineUser.length > 0) {
                    this.users.data[userI].status = 1;
                } else {
                    this.users.data[userI].status = 0;
                }
            });

            this.$forceUpdate();
        },
        navigation(url) {
            this.$emit('navigation', url);
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
            let url = this.users.meta.path;
            url = this.replaceUrlParam(url, 'page', this.users.meta.current_page - n);
            return url;
        },
        nextNPage(n) {
            let url = this.users.meta.path;
            url = this.replaceUrlParam(url, 'page', this.users.meta.current_page + n);
            return url;
        }
    },


};
</script>
<style scoped>
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(210, 201, 255, 0.04);
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.gutters-sm {
    margin-right: -8px;
    margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
    padding-right: 8px;
    padding-left: 8px;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}
.h-100 {
    height: 100%!important;
}
.shadow-none {
    box-shadow: none!important;
}

.bg-white {
    background-color: #fff!important;
}
.btn-light {
    color: #1a202c;
    background-color: #fff;
    border-color: #cbd5e0;
}
.ml-2, .mx-2 {
    margin-left: .5rem!important;
}

.card-footer:last-child {
    border-radius: 0 0 .25rem .25rem;
}
.card-footer, .card-header {
    display: flex;
    align-items: center;
}
.card-footer {
    padding: .5rem 1rem;
    background-color: rgba(210, 201, 255, 0.04);
    border-top: 0 solid rgba(0,0,0,.125);
}

.has-icon {
    border: 1px solid black;
    height: 40px;
    color: white;
}

.user-online {
    background-color: darkgreen !important;
    border-color: darkgreen !important;
}
</style>

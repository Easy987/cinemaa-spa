<template>
    <header class="header">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="header__content">
                        <!-- header logo -->
                        <router-link :to="{ name: 'home' }" class="header__logo">
                            <img alt="" src="@/../public/img/logo.png"/>
                        </router-link>
                        <!-- end header logo -->

                        <!-- header nav -->
                        <ul class="header__nav">
                            <b-nav-item :to="{ name: 'home'}" exact exact-active-class="active" class="header__nav-item" link-classes="header__nav-link">{{ this.$t("nav.home") }}</b-nav-item>
                            <b-nav-item :to="{ name: 'movies', params: { lang: this.$t('navTexts.movies'), page: 1, type: this.$t('navTexts.new-links')}}" exact exact-active-class="active" class="header__nav-item" link-classes="header__nav-link">{{ this.$t("nav.movies") }}</b-nav-item>
                            <b-nav-item :to="{ name: 'series', params: { lang: this.$t('navTexts.series'), page: 1, type: this.$t('navTexts.new-links')}}" exact exact-active-class="active" class="header__nav-item" link-classes="header__nav-link">{{ this.$t("nav.series") }}</b-nav-item>
                            <b-nav-item :to="{ name: 'recommends', params: { lang: this.$t('navTexts.recommends')}}" exact exact-active-class="active" class="header__nav-item" link-classes="header__nav-link">{{ this.$t("nav.recommends") }}</b-nav-item>

                            <b-dropdown class="header__nav-item" menu-class="header__dropdown-menu" no-caret size="sm" text="..." variant="secondary shadow-none bg-transparent border-0 header__nav-link header__nav-link--more">
                                <b-dropdown-item :to="{ name: 'requests', params: { lang: this.$t('navTexts.requests')}}" exact exact-active-class="active">{{ this.$t('nav.requests') }}</b-dropdown-item>
                                <b-dropdown-item :to="{ name: 'forum', params: { lang: this.$t('navTexts.forum')}}" exact exact-active-class="active">{{ this.$t('nav.forum') }}</b-dropdown-item>
                                <b-dropdown-item :to="{ name: 'message-board', params: { lang: this.$t('navTexts.message-board')}}" exact exact-active-class="active">{{ this.$t('nav.message-board') }}</b-dropdown-item>
                                <b-dropdown-item :to="{ name: 'users', params: { lang: this.$t('navTexts.users')}}" exact exact-active-class="active">{{ this.$t('nav.users') }}</b-dropdown-item>
                            </b-dropdown>
                        </ul>
                        <!-- end header nav -->

                        <!-- header auth -->
                        <div class="header__auth">
                            <form @submit.prevent="search" class="header__search" :class="{'header__search--active': searchVisible}">
                                <input class="header__search-input" type="text" v-model="name" v-on:keyup.enter="search" :placeholder="$t('nav.search')+'...'">
                                <button class="header__search-button" type="button" @click="search">
                                    <i class="icon ion-ios-search"></i>
                                </button>
                                <button class="header__search-close" type="button" @click="searchVisible = !searchVisible">
                                    <i class="icon ion-md-close"></i>
                                </button>
                            </form>

                            <button class="header__search-btn" type="button" @click="searchVisible = !searchVisible">
                                <i class="icon ion-ios-search"></i>
                            </button>

                            <b-dropdown :text="$i18n.locale.toUpperCase()" class="header__lang" menu-class="header__dropdown-menu" no-caret variant="secondary shadow-none bg-transparent border-0 header__nav-link">
                                <b-dropdown-item v-for="lang in locales" v-bind:key="lang" @click="changeLanguage(lang)">
                                    {{ $t("locales." + lang) }}
                                </b-dropdown-item>
                            </b-dropdown>

                            <router-link v-if="!this.loggedIn()" :to="{ name: 'login', params: { lang: this.$t('navTexts.login')}}" class="header__sign-in">
                                <i class="icon ion-ios-log-in"></i>
                                <span>{{ this.$t("nav.login") }}</span>
                            </router-link>

                            <b-dropdown v-else :text="this.user().username" class="header__lang" menu-class="header__dropdown-menu" variant="secondary shadow-none bg-transparent border-0 header__nav-link">
                                <b-dropdown-header><span :class="['role-' + this.user().role]">{{ this.$t('roles.' + this.user().role) }}</span></b-dropdown-header>
                                <b-dropdown-item v-if="this.hasPermission('favourites.index')" :to="{ name: 'favourites', params: { lang: this.$t('navTexts.favourites')}}" exact exact-active-class="active">{{ this.$t('nav.favourites') }}</b-dropdown-item>
                                <b-dropdown-item v-if="this.hasPermission('to-see.index')" :to="{ name: 'to-see', params: { lang: this.$t('navTexts.to-see')}}" exact exact-active-class="active">{{ this.$t('nav.to-see') }}</b-dropdown-item>
                                <b-dropdown-item v-if="this.hasPermission('profile.index')" :to="{ name: 'profile', params: { lang: this.$t('navTexts.profile')}}" exact exact-active-class="active">{{ this.$t('nav.profile') }}</b-dropdown-item>
                                <b-dropdown-item v-if="this.hasPermission('ladder.index')" :to="{ name: 'ladder', params: { lang: this.$t('navTexts.ladder')}}" exact exact-active-class="active">{{ this.$t('nav.ladder') }}</b-dropdown-item>
                                <b-dropdown-item v-if="this.hasPermission('admin.index')" :to="{ name: 'admin', params: { lang: this.$t('navTexts.admin')}}" exact exact-active-class="active">{{ this.$t('nav.admin') }}</b-dropdown-item>
                                <b-dropdown-item v-if="this.hasPermission('upload.index')" :to="{ name: 'upload', params: { lang: this.$t('navTexts.upload')}}" exact exact-active-class="active">{{ this.$t('nav.upload') }}</b-dropdown-item>
                                <b-dropdown-item v-if="this.hasPermission('logout.index')">
                                    <router-link :to="{ name: 'logout', params: { lang: this.$t('navTexts.logout')}}">{{ this.$t('nav.logout') }}</router-link>
                                </b-dropdown-item>
                            </b-dropdown>

                        </div>
                        <!-- end header auth -->

                        <!-- header menu btn -->

                        <b-dropdown class="header__btn" menu-class="header__dropdown-menu" no-caret variant="secondary shadow-none bg-transparent border-0 header__nav-link">
                            <template #button-content>
                                <font-awesome-icon size="2x" icon="bars" />
                            </template>

                            <b-dropdown-item :to="{ name: 'home'}" exact exact-active-class="active">{{ this.$t("nav.home") }}</b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'movies', params: { lang: this.$t('navTexts.movies'), page: 1, type: this.$t('navTexts.new-links')}}" exact exact-active-class="active">{{ this.$t("nav.movies") }}</b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'series', params: { lang: this.$t('navTexts.series'), page: 1, type: this.$t('navTexts.new-links')}}" exact exact-active-class="active">{{ this.$t("nav.series") }}</b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'recommends', params: { lang: this.$t('navTexts.recommends')}}" exact exact-active-class="active">{{ this.$t("nav.recommends") }}</b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'requests', params: { lang: this.$t('navTexts.requests')}}" exact exact-active-class="active">{{ this.$t('nav.requests') }}</b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'forum', params: { lang: this.$t('navTexts.forum')}}" exact exact-active-class="active">{{ this.$t('nav.forum') }}</b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'message-board', params: { lang: this.$t('navTexts.message-board')}}" exact exact-active-class="active">{{ this.$t('nav.message-board') }}</b-dropdown-item>
                            <b-dropdown-item :to="{ name: 'users', params: { lang: this.$t('navTexts.users')}}" exact exact-active-class="active">{{ this.$t('nav.users') }}</b-dropdown-item>
                        </b-dropdown>
                        <!-- end header menu btn -->
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import "@/assets/css/styles.scss";
export default {
    name: "Header",

    data() {
        return {
            locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(","),
            navbarVisible: false,
            name: '',
            searchVisible: false,
        }
    },

    methods: {
        changeLanguage(lang) {
            this.$store.dispatch('user/changeLanguage', {
                lang: lang,
                i18n: this.$i18n,
                moment: this.$moment
            })
        },
        search() {
            this.$router.push({ name: 'search', params: { lang: this.$t('navTexts.search').toString(), name: this.name}});
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/config";
</style>

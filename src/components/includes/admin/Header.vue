<template>
    <div>
        <header class="header">
            <div class="header__content">
                <!-- header menu btn -->
                <b-dropdown class="header__btn" menu-class="header__dropdown-menu" no-caret variant="secondary shadow-none bg-transparent border-0 header__nav-link">
                    <template #button-content>
                        <font-awesome-icon size="2x" icon="bars" />
                    </template>

                    <b-dropdown-item :to="{ name: 'admin'}" exact exact-active-class="active">Kezdőlap</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-rules'}" exact exact-active-class="active">Szabályzat</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-movies'}" v-if="hasPermission('admin.index')" exact exact-active-class="active">Adatlapok</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-links'}" v-if="hasPermission('admin.index')" exact exact-active-class="active">Linkek</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-preliminaries'}" v-if="hasPermission('admin.preliminaries.index')" exact exact-active-class="active">Előzetesek</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-reports'}" v-if="hasPermission('admin.reports.index')" exact exact-active-class="active">Bejelentések</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-users'}" v-if="hasPermission('admin.users.index')" exact exact-active-class="active">Felhasználók</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-comments'}" v-if="hasPermission('admin.comments.index')" exact exact-active-class="active">Kommentek</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-forums'}" v-if="hasPermission('admin.forums.index')" exact exact-active-class="active">Fórumok</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'admin-sites'}" v-if="hasPermission('admin.sites.index')" exact exact-active-class="active">Stream oldalak</b-dropdown-item>
                    <b-dropdown-item @click="exitAdmin">Vissza az oldalra</b-dropdown-item>
                </b-dropdown>
                <!-- end header menu btn -->
            </div>
        </header>
        <!-- end header -->

        <!-- sidebar -->
        <div class="sidebar">
            <!-- sidebar logo -->
            <router-link :to="{ name: 'admin' }" class="sidebar__logo">
                <img class="m-auto" alt="" src="@/../public/img/logo.png"/>
            </router-link>
            <!-- end sidebar logo -->

            <!-- sidebar user -->
            <div class="sidebar__user">
                <div class="sidebar__user-img">
                    <img :src="user().picture" alt="">
                </div>

                <div class="sidebar__user-title">
                    <span><b><span :class="['role-' + this.user().role]">{{ this.$t('roles.' + this.user().role) }}</span></b></span>
                    <p>{{ this.user().username }}</p>
                </div>
            </div>
            <!-- end sidebar user -->

            <!-- sidebar nav -->
            <div class="sidebar__nav-wrap">
                <ul class="sidebar__nav">
                    <li class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-keypad"></i> <span>Kezdőlap</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.rules.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-rules' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-alert"></i> <span>Szabályzat</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-movies' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-document"></i> <span>Adatlapok</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-links' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-link"></i> <span>Linkek</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.preliminaries.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-preliminaries' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-albums"></i> <span>Előzetesek</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.reports.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-reports' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-sad"></i> <span>Bejelentések</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.users.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-users' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-contacts"></i> <span>Felhasználók</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.comments.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-comments' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-chatbubbles"></i> <span>Kommentek</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.forums.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-forums' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-albums"></i> <span>Fórumok</span>
                        </router-link>
                    </li>

                    <li v-if="this.hasPermission('admin.sites.index')" class="sidebar__nav-item">
                        <router-link :to="{ name: 'admin-sites' }" class="sidebar__nav-link" exact-active-class="sidebar__nav-link--active">
                            <i class="icon ion-ios-bookmarks"></i> <span>Stream oldalak</span>
                        </router-link>
                    </li>

                    <li class="sidebar__nav-item">
                        <button @click="exitAdmin" class="sidebar__nav-link">
                            <i class="icon ion-ios-arrow-round-back"></i> <span>Vissza az oldalra</span>
                        </button>
                    </li>
                </ul>
            </div>
            <!-- end sidebar nav -->
        </div>
    </div>
</template>

<script>
import "@/assets/css/admin.scss";
import {mapGetters} from "vuex";
export default {
    name: "Header",

    computed: {
        ...mapGetters("movie", [
            "moviesInfo",
        ]),
    },

    beforeMount() {
        if(this.loggedIn() && !this.hasPermission('admin.index')) {
            this.$router.push({name: 'home'});
        }
    },

    methods: {
        exitAdmin() {
            window.location.href = process.env.VUE_APP_FRONTEND_URL;
        }
    },

    created() {
        if(this.loggedIn() && this.moviesInfo && (Object.keys(this.moviesInfo).length === 0 || !this.moviesInfo.genres)) {
            this.loading = true;
            this.$store.dispatch('movie/getMoviesInfo', {admin: true}).then(() => {
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
</script>

import Vue from "vue";
import VueRouter from "vue-router";
import i18n from "@/i18n";

Vue.use(VueRouter);

const routes = [
    /*
        PUBLIC PAGES
    */

    /* HEADER PAGES */
    {
        path: "/", name: "home", component: () => import(/* webpackChunkName: "home" */ "@/pages/Home"), meta: {auth: false}
    },
    {
        path: "/:lang(movies|filmek)/:type(uj-linkek|legujabb|legnezettebb|legjobb|new-links|newest|most-watched|best)/:page?", name: "movies", component: () => import(/* webpackChunkName: "movies" */ "@/pages/Movies"), meta: {auth: false, title: i18n.t('meta.movies')}
    },
    {
        path: "/:lang(series|sorozatok)/:type(uj-linkek|legujabb|legnezettebb|legjobb|new-links|newest|most-watched|best)/:page?", name: "series", component: () => import(/* webpackChunkName: "series" */ "@/pages/Series"), meta: {auth: false, title: i18n.t('meta.series')}
    },
    {
        path: "/:lang(recommends|ajanlo)", name: "recommends", component: () => import(/* webpackChunkName: "recommends" */ "@/pages/Recommends"), meta: {auth: false}
    },
    {
        path: "/:lang(requests|keresek)/:page?", name: "requests", component: () => import(/* webpackChunkName: "requests" */ "@/pages/Requests"), meta: {auth: true}
    },
    {
        path: "/:lang(forum|forum)/:discussion?/:topic?", name: "forum", component: () => import(/* webpackChunkName: "forum" */ "@/pages/Forum"), meta: {auth: true}
    },
    {
        path: "/:lang(message-board|uzenofal)", name: "message-board", component: () => import(/* webpackChunkName: "message-board" */ "@/pages/MessageBoard"), meta: {auth: true}
    },
    {
        path: "/:lang(users|felhasznalok)/:page?", name: "users", component: () => import(/* webpackChunkName: "users" */ "@/pages/Users"), meta: {auth: true}
    },
    {
        path: "/:lang(user|felhasznalo)/:username", name: "user", component: () => import(/* webpackChunkName: "user" */ "@/pages/UserProfile"), meta: {auth: true}
    },

    {
        path: "/:lang(movie|film)/:slug/:year", name: "movie", component: () => import(/* webpackChunkName: "movie" */ "@/pages/MovieDetail"), meta: {auth: false}
    },
    {
        path: "/:lang(serie|sorozat)/:slug/:year", name: "serie", component: () => import(/* webpackChunkName: "serie" */ "@/pages/MovieDetail"), meta: {auth: false}
    },

    {
        path: "/chat/:username?", name: "chat", component: () => import(/* webpackChunkName: "chat" */ "@/pages/Chat"), meta: {auth: true}
    },

    {
        path: "/:lang(kereses|search)/:name", name: "search", component: () => import(/* webpackChunkName: "search" */ "@/pages/Search"), meta: {auth: false}
    },

    /* AUTHENTICATED PAGES */
    {
        path: "/:lang(favourites|kedvenceim)", name: "favourites", component: () => import(/* webpackChunkName: "favourites" */ "@/pages/Favourites"), meta: {auth: true}
    },
    {
        path: "/:lang(profile|profil)", name: "profile", component: () => import(/* webpackChunkName: "profile" */ "@/pages/Profile"), meta: {auth: true}
    },
    {
        path: "/:lang(to-see|megnezendok)", name: "to-see", component: () => import(/* webpackChunkName: "to-see" */ "@/pages/ToBeWatched"), meta: {auth: true}
    },
    {
        path: "/:lang(ladder|rangletra)", name: "ladder", component: () => import(/* webpackChunkName: "ladder" */ "@/pages/Ladder"), meta: {auth: true}
    },
    {
        path: "/:lang(upload|feltoltes)", name: "upload", component: () => import(/* webpackChunkName: "upload" */ "@/pages/Upload"), meta: {auth: true}
    },


    /* SMALL PAGES */
    {
        path: "/:lang(advertisement|hirdetes)", name: "advertisement", component: () => import(/* webpackChunkName: "helpmee" */ "@/pages/Advertisement"), meta: {auth: false}
    },
    {
        path: "/:lang(terms-of-use|aszf)", name: "terms-of-use", component: () => import(/* webpackChunkName: "terms-of-use" */ "@/pages/TermsOfUse"), meta: {auth: false}
    },
    {
        path: "/:lang(contact|kapcsolat)", name: "contact", component: () => import(/* webpackChunkName: "contact" */ "@/pages/Contact"), meta: {auth: false}
    },

    /* AUTH */
    {
        path: "/:lang(login|bejelentkezes)", name: "login", component: () => import(/* webpackChunkName: "login" */ "@/pages/auth/Login"), meta: {auth: false, only_guest: true}
    },
    {
        path: "/:lang(register|regisztracio)", name: "register", component: () => import(/* webpackChunkName: "register" */ "@/pages/auth/Register"), meta: {auth: false, only_guest: true}
    },
    {
        path: "/verify/:token", name: "verify", component: () => import(/* webpackChunkName: "verify" */ "@/pages/auth/Verify"), meta: {auth: false, only_guest: true}
    },
    {
        path: "/:lang(forgot|elfelejtett-jelszo)", name: "forgot", component: () => import(/* webpackChunkName: "forgot" */ "@/pages/auth/Forgot"), meta: {auth: false, only_guest: true}
    },
    {
        path: "/:lang(forgot|elfelejtett-jelszo)/:token/:email", name: "forgot", component: () => import(/* webpackChunkName: "forgot" */ "@/pages/auth/Forgot"), meta: {auth: false, only_guest: true}
    },
    /*
        AUTHENTICATED PAGES
    */
    {
        path: "/:lang(logout|kijelentkezes)", name: "logout", component: () => import(/* webpackChunkName: "logout" */ "@/pages/auth/Logout"), meta: {auth: true}
    },

    {
        path: "/:lang(maintenance|karbantartas)", name: "maintenance", component: () => import(/* webpackChunkName: "maintenance" */ "@/pages/Maintenance"), meta: {auth: false}
    },

    /*
        ADMIN

     */
    {
        path: "/admin", name: "admin", component: () => import(/* webpackChunkName: "admin" */ "@/pages/admin/Dashboard"), meta: {auth: true}
    },

    {
        path: "/admin/rules", name: "admin-rules", component: () => import(/* webpackChunkName: "admin-rules" */ "@/pages/admin/Rules"), meta: {auth: true}
    },

    {
        path: "/admin/users/:page?", name: "admin-users", component: () => import(/* webpackChunkName: "admin-users" */ "@/pages/admin/Users"), meta: {auth: true}
    },
    {
        path: "/admin/users/user/:username", name: "admin-user", component: () => import(/* webpackChunkName: "admin-user" */ "@/pages/admin/User"), meta: {auth: true}
    },

    {
        path: "/admin/comments/:page?", name: "admin-comments", component: () => import(/* webpackChunkName: "admin-comments" */ "@/pages/admin/Comments"), meta: {auth: true}
    },

    {
        path: "/admin/sites/:page?", name: "admin-sites", component: () => import(/* webpackChunkName: "admin-sites" */ "@/pages/admin/Sites"), meta: {auth: true}
    },
    {
        path: "/admin/sites/site/:name", name: "admin-site", component: () => import(/* webpackChunkName: "admin-site" */ "@/pages/admin/Site"), meta: {auth: true}
    },

    {
        path: "/admin/movies/:page?", name: "admin-movies", component: () => import(/* webpackChunkName: "admin-movies" */ "@/pages/admin/Movies"), meta: {auth: true}
    },
    {
        path: "/admin/movies/movie/:id", name: "admin-movie", component: () => import(/* webpackChunkName: "admin-movie" */ "@/pages/admin/Movie"), meta: {auth: true}
    },

    {
        path: "/admin/links/:page?", name: "admin-links", component: () => import(/* webpackChunkName: "admin-links" */ "@/pages/admin/Links"), meta: {auth: true}
    },
    {
        path: "/admin/links/link/:id", name: "admin-link", component: () => import(/* webpackChunkName: "admin-link" */ "@/pages/admin/Link"), meta: {auth: true}
    },

    {
        path: "/admin/preliminaries/:page?", name: "admin-preliminaries", component: () => import(/* webpackChunkName: "admin-preliminaries" */ "@/pages/admin/Preliminary"), meta: {auth: true}
    },

    {
        path: "/admin/reports/:page?", name: "admin-reports", component: () => import(/* webpackChunkName: "admin-reports" */ "@/pages/admin/Reports"), meta: {auth: true}
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

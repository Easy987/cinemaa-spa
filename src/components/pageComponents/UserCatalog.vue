<template>
    <div>
        <Header></Header>
        <PageTitle :title="title"></PageTitle>
        <UserFilterSection @filter="filter"></UserFilterSection>
        <UserCatalogSection :users="users" @navigation="navigation"></UserCatalogSection>
        <Footer></Footer>
    </div>
</template>

<script>
import UserCatalogSection from "@/components/UserCatalogSection";
import PageTitle from "@/components/PageTitle";
import UserFilterSection from "@/components/UserFilterSection";
import {mapGetters} from "vuex";

export default {
    name: "UserCatalog",

    components: {
        UserFilterSection,
        PageTitle,
        UserCatalogSection
    },

    computed: {
        ...mapGetters("auth", [
            "onlineUsers"
        ]),
        users() {
            return this.$store.getters["auth/users"];
        }
    },

    props: {
        title: {
            type: String,
            default: '',
        }
    },

    data() {
        return {
            filters: {},
        };
    },

    methods: {
        filter(value) {
            this.filters = value;
            this.getUsers(1);
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: this.type, params: { lang: this.$t('navTexts.users').toString(), page: page}})
            }
        },
        getUsers(page) {
            if(this.loggedIn()) {
                this.$emit('loadingUpdated', true);

                let payload = {page: page || 1, filters: this.filters};

                this.$store.dispatch('auth/getUsers', payload).then(() => {
                    this.updateOnlineStatus();
                    this.$emit('loadingUpdated', false);
                });
            }
        },
        updateOnlineStatus() {
            this.users.data.forEach((user, userI) => {
                let onlineUser = this.onlineUsers.filter(x => x.id === user.id);

                if(onlineUser.length > 0) {
                    this.users.data[userI].status = 1;
                } else {
                    this.users.data[userI].status = 0;
                }
            });

            this.$root.$emit('refresh');
        },
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page || from.params.type !== to.params.type || (from.name !== to.name))) {
                    this.getUsers(to.params.page);
                }
            },
            immediate: true
        },
        'onlineUsers': {
            handler: function() {
                this.updateOnlineStatus();
            },
            immediate: false
        }
    },

    created() {
        if(this.loggedIn()) {
            this.$store.dispatch('auth/getOnlineUsers');
        }
        if((this.users && Object.keys(this.users).length === 0) || this.$route.params.page !== this.users.meta.current_page) {
            this.getUsers(this.$route.params.page);
        }
    }
};
</script>

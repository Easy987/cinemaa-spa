<template>
    <div>
        <Header></Header>
        <main class="main" v-if="users">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Felhasználók</h2>

                            <span class="main__title-stat">{{ users.meta.total }} összesen</span>

                            <div class="main__title-wrap">

                                <div class="filter__item" id="filter__genre">
                                    <span class="filter__item-label">{{ this.$t('base.role').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="$t('base.filter')">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <div v-scrollbar class="scroll-area">
                                                <b-dropdown-item v-for="(role, index) in roles" v-bind:key="index" @click.native.capture.stop="filterRole(role)" :class="{'active': filter.role.some(x => x.key === role.key)}" link-class="p-0">{{ role.value }}</b-dropdown-item>
                                            </div>
                                        </template>
                                    </b-dropdown>
                                </div>
                                <!-- search -->
                                <form @submit.prevent="searchUser" class="main__title-form">
                                    <input v-model="filter.name" type="text" placeholder="Felhasználó keresése....">
                                    <button type="submit">
                                        <i class="icon ion-ios-search"></i>
                                    </button>
                                </form>
                                <!-- end search -->
                            </div>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- users -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive">
                                <table class="main__table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ALAP ADATOK</th>
                                    <th>RANG</th>
                                    <th>KOMMENTEK</th>
                                    <th>STÁTUSZ</th>
                                    <th>REGISZTRÁCIÓ DÁTUMA</th>
                                    <th>UTOLSÓ AKTIVITÁS</th>
                                    <th>SZERKESZTÉS</th>
                                </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(user, index) in users.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="user.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__user">
                                                <div class="main__avatar">
                                                    <img :src="user.picture" alt="">
                                                </div>
                                                <div class="main__meta">
                                                    <h3>{{ user.username }}</h3>
                                                    <span>{{ user.email }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="main__table-text"><b><span :class="['role-' + user.role]">{{ $t('roles.' + user.role) }}</span></b></div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ user.comments_count }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text" :class="{'main__table-text--green' : user.status === '1', 'main__table-text--red': user.status === '2'}">{{ getUserStatus(user.status) }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $moment(user.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $moment(user.last_activity_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <button @click="blockUser(user.id)" class="main__table-btn main__table-btn--banned open-modal" v-b-popover.hover.bottom="''" title="Felhasználó kitiltása">
                                                    <i class="icon ion-ios-lock"></i>
                                                </button>
                                                <router-link :to="{ name: 'admin-user', params: {username: user.username} }" class="main__table-btn main__table-btn--edit" v-b-popover.hover.bottom="''" title="Felhasználó szerkesztése">
                                                    <i class="icon ion-ios-create"></i>
                                                </router-link>
                                                <button @click="deleteUser(user.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Felhasználó törlése">
                                                    <i class="icon ion-ios-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <!-- end users -->

                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="users" not-found-text="Nem található felhasználó"></navigator>
                        </div>
                    </div>
                    <!-- end paginator -->
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from "@/components/includes/admin/Header";
import Navigator from "@/components/pageComponents/Navigator";
import {mapGetters} from "vuex";

export default {
    name: "Admin",
    components: {
        Header,
        Navigator
    },

    computed: {
        ...mapGetters("admin", [
            "users",
        ]),
    },

    data()
    {
        return {
            filter: {
                name: '',
                role: []
            },
            roles: [
                { key: 'user', value: this.$t('roles.user')},
                { key: 'uploader', value: this.$t('roles.uploader')},
                { key: 'moderator', value: this.$t('roles.moderator')},
                { key: 'administrator', value: this.$t('roles.administrator')},
                { key: 'owner', value: this.$t('roles.owner')}
            ]
        };
    },

    created() {
        if((this.users && Object.keys(this.users).length === 0) || this.$route.params.page !== this.users.meta.current_page) {
            this.getUsers(this.$route.params.page, this.filters);
        }
    },

    methods: {
        getUserStatus(status) {
            switch(status){
                case '0':
                    return 'Megerősítésre vár';
                case '1':
                    return "Engedélyezve";
                case '2':
                    return "Kitiltva";
            }
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.getUsers(page);
            }
        },
        getUsers(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filter: this.filter};

            this.$store.dispatch('admin/getUsers', payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        blockUser(user) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/blockUser', {user: user}).then((res) => {
                this.$emit('loadingUpdated', false);
                if(res.data.status === '2') {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Felhasználó sikeresen kitiltva.',
                            type: 'success'
                        }
                    );
                } else {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Felhasználó sikeresen feloldva.',
                            type: 'success'
                        }
                    );
                }

            });
        },
        searchUser() {
            this.getUsers(1);
        },
        filterRole(role) {
            if(this.filter.role.filter(x => x.key === role.key).length > 0) {
                this.filter.role.splice(this.filter.role.indexOf(role), 1);
            } else {
                this.filter.role.push(role);
            }
        },
        deleteUser(user) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteUser', {user: user}).then(() => {
                this.$emit('loadingUpdated', false);
                this.$store.dispatch('user/sendToast', {
                        message: 'Felhasználó sikeresen törölve.',
                        type: 'success'
                    }
                );
            });
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getUsers(to.params.page);
                }
            },
            immediate: true
        },
        'filter': {
            handler: function() {
                this.searchUser();
            },
            immediate: true,
            deep: true
        },
    },
};
</script>

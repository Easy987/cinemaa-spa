<template>
    <div>
        <Header></Header>
        <main class="main" v-if="discussions">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Fórumok</h2>

                            <span class="main__title-stat">{{ discussions.meta.total }} összesen</span>
                            <router-link :to="{ name: 'admin-forum', params: {id: 'new', type: this.$route.params.id !== undefined, discussion_id: this.$route.params.id} }" class="main__title-link">
                                Létrehozás
                            </router-link>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- sites -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive">
                                <table class="main__table">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NÉV</th>
                                        <th>LEÍRÁS</th>
                                        <th>SZERKESZTÉS</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(discussion, index) in discussions.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="discussion.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">
                                                <router-link v-if="!$route.params.id" :to="{name: 'admin-forums', params: {id: discussion.id}}">
                                                    {{ discussion.name }}
                                                </router-link>
                                                <span v-else>{{ discussion.name }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ discussion.description }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <router-link v-if="hasPermission('admin.forums.create')" :to="{ name: 'admin-forum', params: {id: discussion.id, type: $route.params.id !== undefined} }" class="main__table-btn main__table-btn--edit" v-b-popover.hover.bottom="''" title="Fórum szerkesztése">
                                                    <i class="icon ion-ios-create"></i>
                                                </router-link>
                                                <button v-if="hasPermission('admin.forums.delete')" @click="deleteDiscussion(discussion.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Fórum törlése">
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
                    <!-- end sites -->
                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="discussions" not-found-text="Nem található fórum"></navigator>
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

    data()
    {
        return {
            discussions: [],
            filter: {
                name: '',
                role: []
            },
        };
    },

    created() {
        this.getDiscussions(this.$route.params.page);
    },
    methods: {
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: 'admin-forums', params: { page: page }})
            }
        },
        getDiscussions(page) {
            this.$emit('loadingUpdated', true);

            if(this.$route.params.id) {
                this.$api.get(process.env.VUE_APP_API_URL + "/admin/forum/"+this.$route.params.id+"/topics?page=" + page).then((res) => {
                    this.discussions = res.data;
                    this.$emit('loadingUpdated', false);
                });
            } else {
                this.$api.get(process.env.VUE_APP_API_URL + "/admin/forum/discussions?page=" + page).then((res) => {
                    this.discussions = res.data;
                    this.$emit('loadingUpdated', false);
                });
            }
        },
        deleteDiscussion(id) {
            this.$api.delete(process.env.VUE_APP_API_URL + "/admin/forum/delete?type=" + (this.$route.params.id === undefined) + "&id=" + id).then((res) => {
                this.getDiscussions(1);
                this.$emit('loadingUpdated', false);
            });
            this.$emit('loadingUpdated', true);
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getDiscussions(to.params.page);
                }
            },
            immediate: true
        },
    },
};
</script>

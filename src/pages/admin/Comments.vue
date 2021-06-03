<template>
    <div>
        <Header></Header>
        <main class="main" v-if="comments">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Kommentek</h2>

                            <span class="main__title-stat">{{ comments.meta.total }} összesen</span>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- comments -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive">
                                <table class="main__table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ADATLAP</th>
                                    <th>SZERZŐ</th>
                                    <th>SZÖVEG</th>
                                    <th>LIKE / DISLIKE</th>
                                    <th>DÁTUM</th>
                                    <th>SZERKESZTÉS</th>
                                </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(comment, index) in comments.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="comment.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ comment.movie.titles['hu'] }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ comment.user.username }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ comment.comment }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ comment.like }} / {{ comment.dislike }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <button @click="deleteComment(comment.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Komment törlése">
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
                    <!-- end comments -->

                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="comments" not-found-text="Nem található komment"></navigator>
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
            "comments",
        ]),
    },

    data()
    {
        return {
            filter: {
                name: '',
                role: []
            },
        };
    },

    created() {
        if((this.comments && Object.keys(this.comments).length === 0) || this.$route.params.page !== this.comments.meta.current_page) {
            this.getComments(this.$route.params.page, this.filters);
        }
    },

    methods: {
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: 'admin-comments', params: { page: page }})
            }
        },
        getComments(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filter: this.filter};

            this.$store.dispatch('admin/getComments', payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        deleteComment(id) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteComment', {id: id}).then(() => {
                this.$store.dispatch('user/sendToast', {
                        message: 'Komment sikeresen törölve.',
                        type: 'success'
                    }
                );

                this.getComments(this.$route.params.page, this.filters);

                this.$emit('loadingUpdated', false);
            });
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getComments(to.params.page);
                }
            },
            immediate: true
        },
    },
};
</script>

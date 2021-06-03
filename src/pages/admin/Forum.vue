<template>
    <div>
        <Header></Header>
        <!-- main content -->
        <main class="main" v-if="discussion">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>{{ (isDiscussion ? 'Fórum' : 'Alfórum') + ' ' + (isEditing ? 'szerkesztése' : 'létrehozása') }}</h2>
                        </div>
                    </div>
                    <!-- end main title -->
                    <div class="col-12">
                        <div class="row">
                            <!-- details form -->
                            <div class="col-12 col-lg-12">
                                <form @submit.prevent="saveDiscussion" class="form form--profile">
                                    <div class="row row--form">
                                        <div class="col-12">
                                            <h4 class="form__title">Adatok szerkesztése</h4>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="username">Név</label>
                                                <input id="username" type="text" name="username" class="form__input" v-model="discussion.name">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="email">Leírás</label>
                                                <input id="email" type="text" name="email" class="form__input" v-model="discussion.description">
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button class="form__btn" type="submit">{{ $t('base.save') }}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- end details form -->
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- end main content -->
    </div>
</template>

<script>
import Header from "@/components/includes/admin/Header";

export default {
    name: "Site",
    components: {
        Header,
    },

    data() {
        return {
            discussion: null,
        }
    },

    computed: {
        isDiscussion() {
            return this.$route.params.type === false;
        },
        isEditing() {
            return this.$route.params.id !== 'new';
        }
    },

    created() {
        if(this.isEditing) {
            if(!this.isDiscussion) {
                this.$api.get(process.env.VUE_APP_API_URL + "/admin/forum/topics/"+this.$route.params.id).then((res) => {
                    this.discussion = res.data.data;
                    this.$emit('loadingUpdated', false);
                });
            } else {
                this.$api.get(process.env.VUE_APP_API_URL + "/admin/forum/discussions/"+this.$route.params.id).then((res) => {
                    this.discussion = res.data.data;
                    this.$emit('loadingUpdated', false);
                });
            }
        } else {
            this.discussion = {
                'name': '',
                'description': ''
            };
        }
    },

    methods: {
        saveDiscussion()
        {
            if(this.isEditing) {
                if(this.isDiscussion) {
                    this.$api.post(process.env.VUE_APP_API_URL + "/admin/forum/save", {discussion: this.discussion, id: this.discussion.id, type: 'discussion'}).then((res) => {
                        this.$router.push({name: 'admin-forums'});
                    });
                } else {
                    this.$api.post(process.env.VUE_APP_API_URL + "/admin/forum/save", {discussion: this.discussion, id: this.discussion.id, type: 'topic'}).then((res) => {
                        this.$router.push({name: 'admin-forums', params: {id: this.discussion.discussion_id.toString()}});
                    });
                }
            } else {
                if(this.isDiscussion) {
                    this.$api.post(process.env.VUE_APP_API_URL + "/admin/forum/save", {discussion: this.discussion, id: this.discussion.id, type: 'discussion'}).then((res) => {
                        this.$router.push({name: 'admin-forums'});
                    });
                } else {
                    this.$api.post(process.env.VUE_APP_API_URL + "/admin/forum/save", {discussion: this.discussion, id: this.$route.params.discussion_id, type: 'topic'}).then((res) => {
                        this.$router.push({name: 'admin-forums', params: {id: this.$route.params.discussion_id}});
                    });
                }
            }
        }
    }
};
</script>

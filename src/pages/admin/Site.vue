<template>
    <div>
        <Header></Header>
        <!-- main content -->
        <main class="main" v-if="site">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>{{ isEditing ? 'Stream oldal szerkesztése' : 'Stream oldal létrehozása' }}</h2>
                        </div>
                    </div>
                    <!-- end main title -->
                    <div class="col-12">
                        <div class="row">
                            <!-- details form -->
                            <div class="col-12 col-lg-12">
                                <form @submit.prevent="saveSite" class="form form--profile">
                                    <div class="row row--form">
                                        <div class="col-12">
                                            <h4 class="form__title">Adatok szerkesztése</h4>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="username">Név</label>
                                                <input id="username" type="text" name="username" class="form__input" v-model="site.name">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="email">URL</label>
                                                <input id="email" type="text" name="email" class="form__input" v-model="site.url">
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
            site: null,
        }
    },

    computed: {
        isEditing() {
            return this.$route.params.name !== 'new';
        }
    },

    created() {
        if(this.isEditing) {
            this.$store.dispatch('admin/getSite', {name: this.$route.params.name}).then((res) => {
                this.site = res.data;
                this.$emit('loadingUpdated', false);
            });
        } else {
            this.site = {
                'name': '',
                'url': ''
            };
        }
    },

    methods: {
        saveSite()
        {
            this.$store.dispatch('admin/saveSite', {site: this.site}).then((res) => {
                if(this.isEditing) {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Stream oldal sikeresen frissítve.',
                            type: 'success'
                        }
                    );

                    this.$router.push({name: 'admin-sites'});
                } else {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Stream oldal sikeresen létrehozva.',
                            type: 'success'
                        }
                    );

                    this.$router.push({name: 'admin-sites'});
                }
                this.$emit('loadingUpdated', false);
            });
        }
    }
};
</script>

<template>
    <div class="sign section--bg" data-bg="img/section/section.jpg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="sign__content">
                        <!-- authorization form -->
                        <form @submit.prevent="forgot" class="sign__form">
                            <router-link :to="{ name: 'home' }" class="sign__logo">
                                <img alt="" src="/img/logo.png"/>
                            </router-link>

                            <div v-if="!this.resetting" class="sign__group">
                                <input required type="text" class="sign__input" v-model="user.email" :placeholder="$t('auth.email')">
                                <span v-if="errors && 'email' in errors" style="color: red;">{{ errors['email'][0] }}</span>
                            </div>

                            <div v-if="this.resetting" class="sign__group">
                                <input v-model="user.password" type="password" class="sign__input"
                                       :placeholder="this.$t('auth.password')" autocomplete="" required>
                                <span style="color: red;" v-if="'password' in errors">{{ errors['password'][0] }}</span>
                            </div>

                            <div v-if="this.resetting" class="sign__group">
                                <input v-model="user.password_confirmation" type="password" class="sign__input"
                                       :placeholder="this.$t('auth.password_confirmation')" autocomplete="" required>
                            </div>

                            <button class="sign__btn" type="submit">{{ this.resetting ? this.$t('base.reset') : this.$t('base.send') }}</button>

                            <span v-if="!this.resetting" class="sign__text">{{ this.$t('auth.forgot_password_in_email') }}</span>

                            <span v-if="!this.resetting" class="sign__text"><router-link
                                :to="{ name: 'home' }"
                            >{{
                                    this.$t("base.back_to_home")
                                }}</router-link></span>
                        </form>
                        <!-- end authorization form -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/css/styles.scss";

export default {
    name: "Forgot",

    data() {
        return {
            user: {
                email: '',
                password: '',
                password_confirmation: '',
                token: '',
                lang: this.$store.state.user.lang
            },
            loading: false,
            resetting: false,
            errors: []
        }
    },

    created() {
        if(this.$route.params.token) {
            this.resetting = true;
            this.user.email = this.$route.params.email;
            this.user.token = this.$route.params.token;
        }
    },

    methods: {
        forgot() {
            if(this.resetting) {
                if(this.user.password && this.user.password_confirmation) {
                    this.$store.dispatch("auth/reset", { user: this.user, token: this.$route.params.token}).then(
                        (res) => {
                            this.$store.dispatch('user/sendToast', {
                                    message: this.$t('messages.reset_successful'),
                                    type: 'success'
                                }
                            );

                            this.errors = [];
                            this.$router.push({name: 'home'})
                        },
                        (error) => {
                            if(error.response.status === 404) {
                                this.$store.dispatch('user/sendToast', {
                                    message: this.$t('messages.reset_unsuccessful'),
                                    type: 'error'
                                });
                            }

                            this.loading = false;
                            this.errors = error.response.data || error.response.error;
                        }
                    );
                }
            } else {
                if (this.user.email) {
                    this.$store.dispatch("auth/forgot", this.user).then(
                        (res) => {
                            this.$store.dispatch('user/sendToast', {
                                    message: this.$t('messages.forgot_sent'),
                                    type: 'success'
                                }
                            );

                            this.errors = [];
                            this.$router.push({name: 'home'})
                        },
                        (error) => {
                            const errorKey = error.response.data;

                            if(errorKey === 'passwords.throttled') { // Már küldtünk e-mailt, probáld meg később.
                                this.$store.dispatch('user/sendToast', {
                                    message: this.$t('messages.forgot_already_sent'),
                                    type: 'error'
                                });
                            }

                            this.loading = false;
                            this.errors = error.response.data || error.response.error;
                        }
                    );
                }
            }
        }
    }
};
</script>

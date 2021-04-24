<template>
    <div class="sign section--bg" data-bg="img/section/section.jpg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="sign__content">
                        <!-- authorization form -->
                        <form class="sign__form" @submit.prevent="login">
                            <router-link :to="{ name: 'home' }" class="sign__logo">
                                <img alt="" src="img/logo.png"/>
                            </router-link>

                            <div class="sign__group">
                                <input
                                    v-model="user.username"
                                    :placeholder="this.$t('auth.username')"
                                    class="sign__input"
                                    required
                                    type="text"
                                />
                                <span v-if="'username' in errors" style="color: red;">{{ errors['username'][0] }}</span>
                            </div>

                            <div class="sign__group">
                                <input
                                    v-model="user.password"
                                    :placeholder="this.$t('auth.password')"
                                    autocomplete
                                    class="sign__input"
                                    required
                                    type="password"
                                />
                                <span v-if="'password' in errors" style="color: red;">{{ errors['password'][0] }}</span>
                            </div>

                            <div class="sign__group sign__group--checkbox">
                                <input
                                    id="remember"
                                    v-model="user.remember_me"
                                    checked="checked"
                                    name="remember"
                                    type="checkbox"
                                />
                                <label for="remember">{{
                                        this.$t("auth.remember_me")
                                    }}</label>
                            </div>

                            <button class="sign__btn" type="submit">
                                {{ this.$t("nav.login") }}
                            </button>

                            <span class="sign__text"
                            >{{ this.$t("auth.no_account") }}

                                <router-link
                                    :to="{ name: 'register', params: { lang: this.$t('navTexts.register')} }"
                                >{{
                                        this.$t("auth.create_account")
                                    }}</router-link>

                               </span>
                            <span class="sign__text"
                            ><router-link
                                :to="{ name: 'forgot', params: { lang: this.$t('navTexts.forgot')} }"
                            >{{
                                    this.$t("auth.forgot_password")
                                }}</router-link></span>

                            <span class="sign__text"><router-link
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
export default {
    name: "Login",

    data() {
        return {
            user: {
                username: '',
                password: '',
                lang: this.$store.state.user.lang
            },
            loading: false,
            errors: []
        }
    },

    methods: {
        login() {
            if (this.user.username && this.user.password) {
                this.$store.dispatch("auth/login", this.user).then(
                    () => {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.login_successful'),
                                type: 'success'
                            }
                        );
                        this.$router.push({name: 'home'})
                    },
                    (error) => {
                        if (error.response?.status === 412) {
                            this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.must_verify_account'),
                                type: 'error'
                            });
                        }

                        if (error.response?.status === 402) {
                            this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.login_unsuccessful'),
                                type: 'error'
                            });
                        }

                        if (error.response?.status === 405) {
                            this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.user_blocked'),
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
};
</script>

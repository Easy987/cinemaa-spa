<template>
    <div class="sign section--bg" data-bg="img/section/section.jpg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="sign__content">
                        <!-- registration form -->
                        <form class="sign__form" @submit.prevent="register">
                            <router-link :to="{ name: 'home' }" class="sign__logo">
                                <img alt="" src="/img/logo.png"/>
                            </router-link>


                            <div class="sign__group">
                                <input v-model="user.username" type="text" class="sign__input"
                                       :placeholder="this.$t('auth.username')" autocomplete="" required>
                                <span style="color: red;" v-if="'username' in errors">{{ errors['username'][0] }}</span>
                            </div>

                            <div class="sign__group">
                                <input v-model="user.email" type="email" class="sign__input"
                                       :placeholder="this.$t('auth.email')" autocomplete="" required>
                                <span style="color: red;" v-if="'email' in errors">{{ errors['email'][0] }}</span>
                            </div>

                            <div class="sign__group">
                                <input v-model="user.password" type="password" class="sign__input"
                                       :placeholder="this.$t('auth.password')" autocomplete="" required>
                                <span style="color: red;" v-if="'password' in errors">{{ errors['password'][0] }}</span>
                            </div>

                            <div class="sign__group">
                                <input v-model="user.password_confirmation" type="password" class="sign__input"
                                       :placeholder="this.$t('auth.password_confirmation')" autocomplete="" required>
                            </div>

                            <div class="sign__group sign__group--checkbox">
                                <input v-model="user.privacy_policy" id="privacy_policy" name="remember" type="checkbox"
                                       required>
                                <label for="privacy_policy">{{ this.$t('auth.i_accept') }}
                                    <router-link :to="{ name: 'terms-of-use', params: { lang: this.$t('navTexts.terms-of-use')} }">{{
                                            this.$t("auth.terms_of_use")
                                        }}
                                    </router-link>
                                </label>
                            </div>

                            <button class="sign__btn" type="submit">{{ this.$t('nav.register') }}</button>

                            <span class="sign__text">{{ this.$t('auth.has_account') }} <router-link
                                :to="{ name: 'login', params: { lang: this.$t('navTexts.login')} }">{{ this.$t("nav.login") }}</router-link></span>

                            <span class="sign__text"><router-link
                                :to="{ name: 'home' }"
                            >{{
                                    this.$t("base.back_to_home")
                                }}</router-link></span>
                        </form>
                        <!-- registration form -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",

    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
                privacy_policy: true,
                lang: this.$store.state.user.lang
            },
            loading: false,
            errors: []
        }
    },

    methods: {
        register() {
            if (this.user.username && this.user.password) {
                this.$store.dispatch("auth/register", this.user).then(
                    () => {
                        this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.register_successful'),
                            type: 'success'
                        });
                        this.$router.push({name: 'home'})
                    },
                    (error) => {
                        this.loading = false;
                        this.errors = error.response.data || error.response.error;
                    }
                );
            }
        }
    }
};
</script>

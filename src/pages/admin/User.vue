<template>
    <div>
        <Header></Header>
        <!-- main content -->
        <main class="main" v-if="user">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Felhasználó szerkesztése</h2>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- profile -->
                    <div class="col-12">
                        <div class="profile__content">
                            <!-- profile user -->
                            <div class="profile__user">
                                <div class="profile__avatar">
                                    <img :src="user.picture" alt="">
                                </div>
                                <!-- or red -->
                                <div class="profile__meta profile__meta--green">
                                    <h3>{{ user.username }} <b><span :class="['role-' + user.role]">({{ $t('roles.' + user.role) }})</span></b></h3>
                                    <span>ID: {{ user.id }}</span>
                                </div>
                            </div>
                            <!-- end profile user -->
                        </div>
                    </div>
                    <!-- end profile -->

                    <div class="col-12">
                        <div class="row">
                            <!-- details form -->
                            <div class="col-12 col-lg-6">
                                <form @submit.prevent="saveUser" class="form form--profile">
                                    <div class="row row--form">
                                        <div class="col-12">
                                            <h4 class="form__title">Adatok szerkesztése</h4>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="username">{{ $t('auth.username') }}</label>
                                                <input id="username" disabled type="text" name="username" class="form__input" :value="user.username">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="email">{{ $t('auth.email') }}</label>
                                                <input id="email" :disabled="currentUser.role !== 'owner'" type="text" name="email" class="form__input" v-model="user.email">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="email">{{ $t('base.birth_date') }}</label>
                                                <b-form-datepicker :disabled="currentUser.role !== 'owner'"  :no-highlight-today="true" start-weekday="1" :show-decade-nav="true" v-if="user" nav-variant="secondary" :label-no-date-selected="$t('base.no_date_selected')" v-model="user.birth_date" class="form__input datepicker-button mb-2" :locale="$i18n.locale" :dark="true"></b-form-datepicker>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="email">{{ $t('base.gender') }}</label>
                                                <b-form-select :disabled="currentUser.role !== 'owner'"  style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="user.gender" :options="genderOptions"></b-form-select>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="email">{{ $t('base.role') }}</label>
                                                <b-form-select style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="user.role" :options="roleOptions"></b-form-select>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="email">{{ $t('base.public_name') }}</label>
                                                <b-form-checkbox :disabled="currentUser.role !== 'owner'"  size="lg" v-model="user.public_name" name="check-button" switch>
                                                    <b style="color: white;">{{ user.public_name ? $t('base.enabled') : $t('base.disabled') }}</b>
                                                </b-form-checkbox>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6 pt-2">
                                            <div class="form__group">
                                                <label class="form__label">{{ $t('base.about') }}</label>
                                                <b-form-textarea
                                                    class="form__textarea"
                                                    id="about"
                                                    v-model="user.about"
                                                    :disabled="currentUser.role !== 'owner'"
                                                ></b-form-textarea>
                                            </div>
                                        </div>


                                        <div class="col-12">
                                            <button class="form__btn" type="submit">{{ $t('base.save') }}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- end details form -->

                            <!-- password form -->
                            <div class="col-12 col-lg-6">
                                <form @submit.prevent="saveUser" class="form form--profile">
                                    <div class="row row--form">
                                        <div class="col-12">
                                            <h4 class="form__title">Jelszó változtatása</h4>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="newpass">Új jelszó</label>
                                                <input id="newpass" :disabled="currentUser.role !== 'owner'" v-model="user.password" type="password" name="newpass" class="form__input">
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                            <div class="form__group">
                                                <label class="form__label" for="confirmpass">Jelszó megerősítése</label>
                                                <input id="confirmpass" :disabled="currentUser.role !== 'owner'" v-model="user.password_confirmation" type="password" name="confirmpass"
                                                       class="form__input">
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button class="form__btn" :disabled="currentUser.role !== 'owner'" type="submit">Mentés</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- end password form -->
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
    name: "User",
    components: {
        Header,
    },

    computed: {
        currentUser() {
            return this.$store.getters["auth/user"];
        }
    },

    data() {
        return {
            user: null,
            genderOptions: [
                { value: 0, text: this.$t('base.male') },
                { value: 1, text: this.$t('base.female') },
            ],
            roleOptions: [
                { value: 'user', text: this.$t('roles.user')},
                { value: 'uploader', text: this.$t('roles.uploader')},
                { value: 'moderator', text: this.$t('roles.moderator')},
                { value: 'administrator', text: this.$t('roles.administrator')},
                { value: 'owner', text: this.$t('roles.owner')}
            ]
        }
    },

    created() {
        this.$store.dispatch('admin/getUser', {username: this.$route.params.username}).then((res) => {
            this.user = res.data;
            this.$emit('loadingUpdated', false);
        });
    },

    methods: {
        saveUser()
        {
            this.$store.dispatch('admin/saveUser', {user: this.user}).then((res) => {
                this.$store.dispatch('user/sendToast', {
                        message: 'Felhasználó sikeresen frissítve.',
                        type: 'success'
                    }
                );

                this.$router.push({'name': 'admin-users'});

                this.$emit('loadingUpdated', false);
            });
        }
    }
};
</script>

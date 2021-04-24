<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.profile')"></PageTitle>
        <div class="content">
            <!-- profile -->
            <div class="profile">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="profile__content">
                                <div class="profile__user">
                                    <div class="profile__avatar">
                                        <input ref="file" accept="image/jpeg, image/png" type="file" @change="uploadImage" hidden>
                                        <img v-if="userModel" :src="userModel.picture" @click="showUploadImage" alt="">
                                    </div>
                                    <div class="profile__meta">
                                        <h3>{{ this.user().username }}</h3>
                                        <span>{{ $t('base.role') }}: <b><span :class="['role-' + this.user().role]">{{ this.$t('roles.' + this.user().role) }}</span></b></span>
                                    </div>
                                </div>

                                <!-- content tabs nav -->
                                <ul class="nav nav-tabs content__tabs content__tabs--profile" id="content__tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active clickable" data-toggle="tab" role="tab" aria-controls="tab-1" aria-selected="true">{{ $t('nav.profile') }}</a>
                                    </li>
                                </ul>
                                <!-- end content tabs nav -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <!-- content tabs -->
            <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
                    <div class="row">
                        <!-- details form -->
                        <div class="col-12 col-lg-6">
                            <form @submit.prevent="updateProfile" class="profile__form">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="profile__title">{{ $t('auth.profile_details') }}</h4>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="username">{{ $t('auth.username') }}</label>
                                            <input id="username" disabled type="text" name="username" class="profile__input" :value="this.user().username">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="email">{{ $t('auth.email') }}</label>
                                            <input id="email" disabled type="text" name="email" class="profile__input" :value="this.user().email">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="email">{{ $t('base.birth_date') }}</label>
                                            <b-form-datepicker :no-highlight-today="true" start-weekday="1" :show-decade-nav="true" v-if="userModel" nav-variant="secondary" :label-no-date-selected="$t('base.no_date_selected')" v-model="userModel.birth_date" class="profile__input datepicker-button mb-2" :locale="$i18n.locale" :dark="true"></b-form-datepicker>
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="email">{{ $t('base.gender') }}</label>
                                            <b-form-select style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="userModel.gender" :options="genderOptions"></b-form-select>
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="email">{{ $t('base.public_name') }}</label>
                                            <b-form-checkbox size="lg" v-model="userModel.public_name" name="check-button" switch>
                                                <b style="color: white;">{{ userModel.public_name ? $t('base.enabled') : $t('base.disabled') }}</b>
                                            </b-form-checkbox>
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="about">{{ $t('base.about') }}</label>
                                            <b-form-textarea
                                                class="form__textarea"
                                                id="about"
                                                v-model="userModel.about"
                                            ></b-form-textarea>
                                        </div>
                                    </div>


                                    <div class="col-12">
                                        <button class="profile__btn" type="submit">{{ $t('base.save') }}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- end details form -->

                        <!-- password form -->
                        <div class="col-12 col-lg-6">
                            <form @submit.prevent="changePassword" class="profile__form">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="profile__title">{{ $t('auth.change_password') }}</h4>
                                    </div>

                                    <div class="col-12 col-md-12 col-lg-12 col-xl-12">
                                        <div class="profile__group">
                                            <label class="profile__label" for="oldpass">{{ $t('auth.old_password') }}</label>
                                            <input id="oldpass" required type="password" name="oldpass" v-model="model.old_password" class="profile__input">
                                            <span style="color: red;" v-if="'old_password' in errors">{{ errors['old_password'][0] }}</span>
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="newpass">{{ $t('auth.password') }}</label>
                                            <input id="newpass" required type="password" name="newpass" v-model="model.password" class="profile__input">
                                            <span style="color: red;" v-if="'password' in errors">{{ errors['password'][0] }}</span>
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="confirmpass">{{ $t('auth.password_confirmation') }}</label>
                                            <input id="confirmpass" required type="password" name="confirmpass" v-model="model.password_confirmation" class="profile__input">
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <button class="profile__btn" type="submit">{{ $t('base.change') }}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- end password form -->
                    </div>
                </div>
            </div>
            <!-- end content tabs -->
        </div>
        <Footer></Footer>
    </div>
</template>

<style>
    .datepicker-button button {
        color: #f77f00 !important;
    }
    .datepicker-button label.form-control {
        color: white !important;
    }
    .datepicker-button.form-control:focus, .datepicker-button.form-control.focus {
        background-color: unset !important;
        border: 0 !important;
    }
</style>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default {
    name: "Profile",
    components: {
        PageTitle,
        Header,
        Footer
    },

    data() {
        return {
            model: {
                old_password: '',
                password: '',
                password_confirmation: '',
            },
            errors: [],
            userModel: {

            },
            genderOptions: [
                { value: 0, text: this.$t('base.male') },
                { value: 1, text: this.$t('base.female') },
            ]
        };
    },

    created() {
        this.$emit('loadingUpdated', true);
        this.$store.dispatch("auth/getUserMe").then(
            (res) => {
                this.$emit('loadingUpdated', false);
                this.userModel = res.data;
            },
        );
    },

    watch: {
        '$i18n.locale':{
            handler: function(locale) {
                this.genderOptions = [
                    { value: 0, text: this.$t('base.male') },
                    { value: 1, text: this.$t('base.female') },
                ];
            }
        }
    },

    methods: {
        changePassword() {
            if(this.model.old_password && this.model.password && this.model.password_confirmation) {
                this.$store.dispatch("auth/changePassword", { user: this.model}).then(
                    (res) => {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.change_password_successful'),
                                type: 'success'
                            }
                        );

                        this.model.old_password = '';
                        this.model.password = '';
                        this.model.password_confirmation = '';

                        this.errors = [];
                    },
                    (error) => {
                        if(error.response.status === 402) {
                            this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.old_password_wrong'),
                                type: 'error'
                            });
                        }

                        this.loading = false;
                        this.errors = error.response.data || error.response.error;
                    }
                );
            }
        },
        showUploadImage()
        {
            this.$refs.file.click();
        },
        uploadImage(event)
        {
            let data = new FormData();
            data.append('image', event.target.files[0]);

            this.$store.dispatch("auth/uploadProfilePicture", { data: data}).then(
                (res) => {
                    this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.profile_picture_updated'),
                        type: 'success'
                    });
                },
                (error) => {
                    if(error.response.status === 402) {
                        this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.profile_picture_error'),
                            type: 'error'
                        });
                    }

                    this.loading = false;
                }
            );
        },
        updateProfile() {
            this.$store.dispatch("auth/updateUser", { user: this.userModel}).then(
                (res) => {
                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.profile_updated'),
                            type: 'success'
                        }
                    );

                    this.errors = [];
                },
                (error) => {
                    if(error.response.status === 402) {
                        this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.profile_update_error'),
                            type: 'error'
                        });
                    }
                }
            );
        }
    }
};
</script>

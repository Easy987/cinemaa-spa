<template>
    <div>
        <Header></Header>
        <PageTitle :title="this.$route.params.username + ' ' + $t('base.user_profile')"></PageTitle>
        <div class="content" v-if="this.userModel">
            <!-- profile -->
            <div class="profile">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="profile__content">
                                <div class="profile__user">
                                    <div class="profile__avatar">
                                        <img v-if="userModel" :src="userModel.picture" alt="">
                                    </div>
                                    <div class="profile__meta">
                                        <h3>{{ userModel.username }}</h3>
                                        <span>{{ $t('base.role') }}: <b><span :class="['role-' + userModel.role]">{{ this.$t('roles.' + userModel.role) }}</span></b></span>
                                    </div>
                                </div>

                                <!-- content tabs nav -->
                                <ul class="nav nav-tabs content__tabs content__tabs--profile" id="content__tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active clickable" data-toggle="tab" role="tab" aria-controls="tab-1" aria-selected="true">{{ $t('base.profile') }}</a>
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
                            <form class="profile__form">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="profile__title">{{ $t('auth.profile_details') }}</h4>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="username">{{ $t('auth.username') }}</label>
                                            <input id="username" disabled type="text" name="username" class="profile__input" :value="userModel.username">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="register_date">{{ $t('auth.register_date') }}</label>
                                            <input id="register_date" disabled type="text" name="register_date" class="profile__input" :value="$moment(userModel.created_at).format('YYYY-MM-DD HH:mm:ss')">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="activity">{{ $t('base.activity') }}</label>
                                            <input id="activity" disabled type="text" name="register_date" class="profile__input" :value="userModel.last_activity_at ? userModel.last_activity_at : $t('base.empty')">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="birth_date">{{ $t('base.birth_date') }}</label>
                                            <input id="birth_date" disabled type="text" name="username" class="profile__input" :value="userModel.birth_date ? userModel.birth_date : $t('base.no_date_selected')">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-12 col-xl-6">
                                        <div class="profile__group">
                                            <label class="profile__label" for="email">{{ $t('base.gender') }}</label>
                                            <b-form-select disabled="true" style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="userModel.gender" :options="genderOptions"></b-form-select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- end details form -->
                    </div>
                </div>
            </div>
            <!-- end content tabs -->
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";

export default {
    name: "UserProfile",
    components: {
        PageTitle,
        Header,
        Footer
    },

    data(){
        return {
            userModel: {},
            genderOptions: [
                { value: 0, text: this.$t('base.male') },
                { value: 1, text: this.$t('base.female') },
            ]
        }
    },

    created() {
        this.$emit('loadingUpdated', true);
        this.$store.dispatch("auth/getUser", {username: this.$route.params.username}).then(
            (res) => {
                this.$emit('loadingUpdated', false);
                this.userModel = res.data;
            },
        );
    },
};
</script>

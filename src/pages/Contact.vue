<template>
    <div>
        <Header></Header>
        <PageTitle :title="this.$t('nav.contact')"></PageTitle>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-7 col-xl-8">
                        <div class="row">
                            <!-- section title -->
                            <div class="col-12">
                                <h2 class="section__title">{{ this.$t('pages.contact.contact_form') }}</h2>
                            </div>
                            <!-- end section title -->

                            <div class="col-12">
                                <form @submit.prevent="submit" class="form form--contacts">
                                    <input required v-model="contact.name" type="text" class="form__input" :placeholder="this.$t('base.name')">
                                    <input required v-model="contact.email" type="email" class="form__input" :placeholder="this.$t('base.email')">
                                    <input required v-model="contact.subject" type="text" class="form__input" :placeholder="this.$t('base.subject')">
                                    <textarea required v-model="contact.message" id="text" name="text" class="form__textarea" :placeholder="this.$t('base.message')"></textarea>
                                    <button type="submit" class="form__btn">{{ this.$t('base.send') }}</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-5 col-xl-4">
                        <div class="row">
                            <!-- section title -->
                            <div class="col-12">
                                <h2 class="section__title">{{ this.$t('pages.home.information') }}</h2>
                            </div>
                            <!-- end section title -->

                            <div class="col-12">
                                <p class="section__text">{{ this.$t('pages.contact.contact_us_here') }}</p>

                                <ul class="contacts__list">
                                    <li><a href="mailto:cinemaa@protonmail.com">cinemaa@protonmail.com</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";

import PageTitle from "@/components/PageTitle";
import ContactService from "@/services/contact.service";

export default {
    name: "Contact",
    components: {
        Header,
        Footer,
        PageTitle
    },

    data() {
        return {
            contact: {
                name: '',
                email: '',
                subject: '',
                message: '',
            }
        }
    },

    methods: {
        submit() {
            ContactService.sendContact(this.contact).then(() => {
                this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.thanks_for_contacting'),
                        type: 'success'
                    }
                );
                this.$router.push({name: 'home'})
            });
        }
    }
};
</script>

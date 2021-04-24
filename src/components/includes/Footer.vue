<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="footer__content">
                        <router-link :to="{ name: 'home' }" class="footer__logo">
                            <img alt="" src="@/../public/img/logo.png"/>
                        </router-link>

                        <span class="footer__copyright">2021 © Cinemaa.cc</span>

                        <nav class="footer__nav" :class="{'center': this.$screen.width <= 480}">
                            <router-link :to="{ name: 'advertisement', params: { lang: this.$t('navTexts.advertisement')}}">{{ this.$t('nav.advertisement') }}</router-link>
                            <router-link :to="{ name: 'terms-of-use', params: { lang: this.$t('navTexts.terms-of-use')}}">{{ this.$t('nav.terms-of-use') }}</router-link>
                            <router-link :to="{ name: 'contact', params: { lang: this.$t('navTexts.contact')}}">{{ this.$t('nav.contact') }}</router-link>

                            <a href="https://www.facebook.com/Cinemaacc-112261023817711" target="_blank">
                                <font-awesome-icon size="2x" :icon="{ prefix: 'fab', iconName: 'facebook-f' }"></font-awesome-icon>
                            </a>

                            <a href="https://www.instagram.com/cinemaa.cc/" target="_blank">
                                <font-awesome-icon size="2x" :icon="{ prefix: 'fab', iconName: 'instagram' }"></font-awesome-icon>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",

    methods: {
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
};
</script>

<style scoped>
.center {
    margin-left: auto;
    margin-right: auto;
}
</style>

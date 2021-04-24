<template>
    <div>
        <Header></Header>
        <InformationPageSection :title="this.$t('nav.terms-of-use-long')" :texts="this.$t('texts.terms_of_use_text')"></InformationPageSection>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import InformationPageSection from "@/components/InformationPageSection";

export default {
    name: "TermsOfUse",
    components: {
        Header,
        Footer,
        InformationPageSection
    },
};
</script>

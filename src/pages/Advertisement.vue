<template>
    <div>
        <Header></Header>
        <InformationPageSection :title="this.$t('nav.advertisement')" :texts="this.$t('texts.advertisement_text')"></InformationPageSection>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import InformationPageSection from "@/components/InformationPageSection";

export default {
    name: "Advertisement",
    components: {
        Header,
        Footer,
        InformationPageSection
    },
};
</script>

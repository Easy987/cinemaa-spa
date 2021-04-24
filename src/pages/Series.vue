<template>
    <div>
        <Header></Header>
        <Catalog type="series" :title="this.$t('nav.series')" @loadingUpdated="$emit('loadingUpdated', $event)"></Catalog>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import Catalog from "@/components/pageComponents/Catalog";

export default {
    name: "Series",
    components: {
        Catalog,
        Header,
        Footer,
    },
};
</script>

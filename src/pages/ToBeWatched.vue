<template>
    <div>
        <Header></Header>
        <Catalog :sub-type="false" type="toBeWatcheds" :title="this.$t('nav.to-see')" @loadingUpdated="$emit('loadingUpdated', $event)"></Catalog>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import Catalog from "@/components/pageComponents/Catalog";

export default {
    name: "ToBeWatched",
    components: {
        Catalog,
        Header,
        Footer,
    },
};
</script>

<template>
    <div>
        <Header></Header>
        <Catalog :sub-type="false" type="favourites" :title="this.$t('nav.favourites')" @loadingUpdated="$emit('loadingUpdated', $event)"></Catalog>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import Catalog from "@/components/pageComponents/Catalog";

export default {
    name: "Favourites",
    components: {
        Catalog,
        Header,
        Footer,
    },
};
</script>

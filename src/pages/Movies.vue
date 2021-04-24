<template>
    <div>
        <Header></Header>
        <Catalog type="movies" :title="this.$t('nav.movies')" @loadingUpdated="$emit('loadingUpdated', $event)"></Catalog>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import Catalog from "@/components/pageComponents/Catalog";

export default {
    name: "Movies",
    components: {
        Catalog,
        Header,
        Footer,
    },
};
</script>

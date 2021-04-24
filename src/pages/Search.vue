<template>
    <div>
        <Header></Header>
        <Catalog type="all" :filters="filters" :title="this.$t('chat.search')" :sub-type="false" @loadingUpdated="$emit('loadingUpdated', $event)"></Catalog>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import Catalog from "@/components/pageComponents/Catalog";

export default {
    name: "Search",
    components: {
        Catalog,
        Header,
        Footer,
    },

    data() {
        return {
            'filters': {
                'name': this.$route.params.name
            }
        };
    },

    mounted() {
        console.log(this.$route.params.name);
    },
};
</script>

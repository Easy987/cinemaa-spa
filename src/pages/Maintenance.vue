<template>
    <div>
        <Header></Header>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";

export default {
    name: "Maintenance",
    components: {
        Header,
        Footer
    },

    created() {
        this.$emit('loadingUpdated', false);
    }
};
</script>

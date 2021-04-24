<template>
    <div>
        <Header></Header>
        <UserCatalog :title="$t('nav.users')" @loadingUpdated="$emit('loadingUpdated', $event)"></UserCatalog>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import UserCatalog from "@/components/pageComponents/UserCatalog";

export default {
    name: "Users",
    components: {
        UserCatalog,
        Header,
        Footer,
    },
};
</script>

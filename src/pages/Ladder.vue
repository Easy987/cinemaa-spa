<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.ladder')"></PageTitle>
        <div class="m-auto w-100 text-center" style="color: white;">
            <h3>{{ $t('messages.function_not_available') }}</h3>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";

export default {
    name: "Ladder",
    components: {
        Header,
        Footer,
        PageTitle
    },
};
</script>

<template>
    <div></div>
</template>

<script>
import store from "@/store";
import i18n from "@/i18n";
import router from "@/router";

export default {
    name: "Logout",

    beforeRouteEnter() {
        store.dispatch("auth/logout").then(() => {
            store.dispatch("user/sendToast", {
                message: i18n.t("messages.logout_successful"),
                type: "success",
            });

            router.push({name: 'home'});
        });
    },
};
</script>

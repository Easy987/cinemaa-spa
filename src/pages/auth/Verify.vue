<template>
    <div></div>
</template>

<script>
export default {
    name: "Verify",

    created() {
        this.$store.dispatch('auth/verify', this.$route.params.token).then(() => {
            this.$store.dispatch('user/sendToast', {message: this.$t('messages.verify_successful'), type: 'success'});
        }).catch(() => {
            this.$store.dispatch('user/sendToast', {message: this.$t('messages.verify_unsuccessful'), type: 'error'});
        });

        this.$router.push({name: 'home'})
    }
};
</script>

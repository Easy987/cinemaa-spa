<template>
    <section class="section" style="padding-top: 0px;">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="section__title">{{ title }}</h2>
                    <p v-for="(text, index) in texts" v-bind:key="index" class="section__text" v-html="text">
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "InformationSection",

    props: {
        title: {
            type: String,
            default: '',
        },
        texts: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
};
</script>

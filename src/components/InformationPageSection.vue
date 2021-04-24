<template>
    <div>
        <!-- page title -->
        <PageTitle :title="title"></PageTitle>
        <!-- end page title -->
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p v-for="(text, index) in texts" v-bind:key="index" class="section__text">
                            <span v-html="text"></span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <!-- end faq -->
    </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";

export default {
    name: "InformationSection",

    components: {
        PageTitle
    },

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

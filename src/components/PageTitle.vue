<template>
    <section class="section section--first section--bg" data-bg="img/section/section.jpg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section__wrap">
                        <!-- section title -->
                        <h2 class="section__title">{{ title }}</h2>
                        <!-- end section title -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: "PageTitle",

    props: {
        title: {
            type: String,
            default: '',
        }
    },
};
</script>

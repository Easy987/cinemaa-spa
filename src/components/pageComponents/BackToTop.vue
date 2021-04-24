<script>

export default {
    name: "BackToTop",
    data() {
        return {
            showScrollToTopLink: false
        };
    },
    methods: {
        scrollToTop() {
            window.scroll({top: 0, behavior: 'smooth'});
        }
    },
    mounted() {
        window.addEventListener('scroll', (e) => {
            this.showScrollToTopLink = window.scrollY > 200 && this.$screen.width <= 480;
        }, {passive: true});
    },
};
</script>

<template>
    <div>
        <span class="anchor" id="top"></span>
        <a class="back-to-top" @click="scrollToTop" :class="{show: showScrollToTopLink}">
            <font-awesome-icon size="lg" icon="arrow-up"></font-awesome-icon>
        </a>
        <a class="back-to-top" @click="scrollToTop" :class="{show: showScrollToTopLink}">
            <font-awesome-icon size="lg" icon="arrow-up"></font-awesome-icon>
        </a>
    </div>
</template>

<style scoped lang="scss">
a.back-to-top {
    position: fixed;
    bottom: -2em;
    right: 1em;
    //background-color: gray;
    color: #F77F00;
    width: 2em;
    height: 2em;
    text-align: center;
    border-radius: 100%;
    //border: 2px solid rgba(255, 255, 255, 0.3);
    font-size: 1.5em;
    cursor: pointer;
    transition: bottom .2s;
    z-index: 50;
    &.show {
        bottom: 1em;
    }

    i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @media print {
        display: none;
    }

    svg {
        margin-top: 5px;
    }
}

</style>

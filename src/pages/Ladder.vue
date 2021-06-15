<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.ladder')"></PageTitle>
        <div v-if="loggedIn()" class="container">
            <Adsense
                class="text-center pt-5"
                data-ad-client="ca-pub-3890640160453569"
                data-ad-slot="2375609994"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </Adsense>
            <section class="content" style="padding-bottom: 0px; margin-top: 5em !important;">
                <div class="content__head">
                    <h3 class="text-center text-secondary pb-2">{{ $t('ladder.not_live')}}</h3>
                    <div class="col-md-8 col-sm-6 col-12 m-auto p-5" style="border: 2px solid black;" v-if="leaderboard">
                        <div v-for="(category, index) in leaderboard" v-bind:key="index">
                            <div v-if="category && category.top !== null && category.top.length !== 0">
                                <hr />
                                <h2 :class="{'pt-5': index !== 'uploaded_movies'}" class="pb-4 text-center">{{ $t('ladder.titles.'+index) }} <button v-b-popover.hover.bottom="''" :title="$t('ladder.descriptions.'+index)" href="#"><font-awesome-icon icon="question-circle"></font-awesome-icon></button></h2>
                                <div class="row">
                                    <div class="col-md-4 col-12 m-auto" v-for="(top, index) in calculateTop(category.top)" v-bind:key="index">
                                        <div class="leaderboard-card" v-if="top" :class="{'leaderboard-card--first': (top.order+1) === 1}">
                                            <div class="leaderboard-card__top">
                                                <h2 class="text-center">{{ top.score }}</h2><span>
                                                <font-awesome-icon icon="trophy" :class="'ranking'+(top.order+1)"></font-awesome-icon>
                                            </span>
                                            </div>
                                            <div class="leaderboard-card__body">
                                                <div class="text-center">
                                                    <img :src="top.picture" class="rounded-circle" style="width: 100%; height: 200px;" width="50" alt="User" />
                                                    <h3 class="mb-0">{{ top.username }}</h3>
                                                    <hr />
                                                    <div class="d-flex justify-content-between align-items center">
                                                        <div></div>
                                                        <router-link class="btn btn-primary btn-sm" :to="{name: 'user', params: {lang: $t('navTexts.user'), username: top.username}}">{{ $t('base.see') }}</router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="category.own && category.own.username"><span>{{ $t('ladder.own_ranking')}}:</span>
                                    <div class="card">
                                        <div class="card-body d-inline-flex w-100">
                                            <h5 class="pr-2 mt-auto mb-auto">{{ category.own.order+1 }}.</h5>
                                            <img :src="category.own.picture" class="rounded-circle" style="width: 50px; height: 50px;" alt="User" />
                                            <span class="pl-2 mt-auto mb-auto">{{ category.own.username }}</span><span class="ml-auto mt-auto mb-auto">{{ category.own.score }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-2" v-if="category.users.length &gt; 0"><span class="pb-3">{{ $t('ladder.other_users')}}:</span>
                                    <div class="card"><button class="p-4 btn btn-link" @click="$refs['accordion'+index][0].classList.toggle('show')">{{ $t('base.see') }}</button>
                                        <div class="collapse" :ref="'accordion'+index" :id="'collapse'+index" style="border: 2px solid black;" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body pt-0">
                                                <div class="card" v-for="(user, userIndex) in category.users" v-bind:key="category + userIndex">
                                                    <div class="card-body d-inline-flex w-100" :class="{'p-0': $screen.width < 480, 'pt-3': $screen.width < 480}">
                                                        <h5 class="pr-2 mt-auto mb-auto">{{ user.order+1 }}.</h5>
                                                        <img :src="user.picture" class="rounded-circle" style="width: 50px; height: 50px;" alt="User" />
                                                        <span class="pl-2 mt-auto mb-auto">{{ user.username }}</span><span class="ml-auto mt-auto mb-auto">{{ user.score }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5"></div>
                    </div>
                </div>
            </section>
            <Adsense
                class="text-center pb-5"
                data-ad-client="ca-pub-3890640160453569"
                data-ad-slot="9059882935"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </Adsense>
        </div>
        <div v-if="false" class="m-auto w-100 text-center" style="color: white;">
            <h3>{{ $t('messages.function_not_available') }}</h3>
        </div>
        <Footer></Footer>
    </div>
</template>
<style scoped>
.container {
    color: white;
}

.btn-link {
    background: #f77f00 !important;
    color: white;
}

.ranking1 {
    color: #FFD700;
}

.ranking2 {
    color: grey;
}

.ranking3 {
    color: #cd7f32;
}

.collapse {
    display: none;
    opacity: 0;
    -moz-transition: opacity 0.4s ease-in-out;
    -o-transition: opacity 0.4s ease-in-out;
    -webkit-transition: opacity 0.4s ease-in-out;
    transition: opacity 0.4s ease-in-out;
}

.show {
    display: block;
    opacity: 1;
}

.m-auto {
    margin: auto;
}
.leaderboard-card {
    background: rgba(210, 201, 255, 0.04);
    margin-bottom: 30px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card {
    margin-bottom: unset !important;
}

@media (min-width: 480px) {
    .leaderboard-card.leaderboard-card--first {
        transform: scale(1.1);
    }
}
.leaderboard-card.leaderboard-card--first .leaderboard-card__top {
    background: #f77f00;
    color: #fff;
}
.leaderboard-card__top {
    position: relative;
    background: var(--color-text-muted);
    padding: 20px 0 30px 0;
}
.leaderboard-card__top span {
    color: black;
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bold;
    font-size: 20px;
}
.leaderboard-card__body {
    position: relative;
    padding: 15px;
    margin-top: -40px;
}

img.circle-img {
    height: 70px;
    width: 70px;
    border-radius: 70px;
    border: 3px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
img.circle-img.circle-img--small {
    height: 55px;
    width: 55px;
    border-radius: 55px;
}

.table {
    border-spacing: 0 15px;
    border-collapse: separate;
}
.table thead tr th,
.table thead tr td,
.table tbody tr th,
.table tbody tr td {
    vertical-align: middle;
    border: none;
}
.table thead tr th:nth-last-child(1),
.table thead tr td:nth-last-child(1),
.table tbody tr th:nth-last-child(1),
.table tbody tr td:nth-last-child(1) {
    text-align: center;
}
.table tbody tr {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
.table tbody tr td {
    background: #fff;
}
.table tbody tr td:nth-child(1) {
    border-radius: 5px 0 0 5px;
}
.table tbody tr td:nth-last-child(1) {
    border-radius: 0 5px 5px 0;
}

</style>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";
import {mapGetters} from "vuex";

export default {
    name: "Ladder",
    components: {
        Header,
        Footer,
        PageTitle
    },

    computed: {
        ...mapGetters("general", [
            "leaderboard",
        ]),
    },

    methods: {
        calculateTop(top) {
            if(this.$screen.width < 480) {
                return top;
            } else {
                return [
                    top[1],
                    top[0],
                    top[2]
                ]
            }
        }
    },


    created() {
        if(this.loggedIn()) {
            if((this.leaderboard && Object.keys(this.leaderboard).length === 0)) {
                this.$store.dispatch('general/getLeaderboard').then(() => {
                    this.$emit('loadingUpdated', false);
                });
            }
        }
    }
};
</script>

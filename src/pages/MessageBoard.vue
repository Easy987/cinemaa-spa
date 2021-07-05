<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.message-board')"></PageTitle>
        <div class="content">
            <!-- profile -->
            <div class="container" v-if="messageBoard">
                <Adsense
                    class="text-center"
                    data-ad-client="ca-pub-3890640160453569"
                    data-ad-slot="2375609994"
                    data-ad-format="auto"
                    :data-ad-region="randomNumber(0, 200).toString()"
                    data-full-width-responsive="true">
                </Adsense>
                <div class="row">
                    <div class="col-md-8 m-auto">
                        <div class="chat-box pb-0 pr-0">
                            <form class="d-inline-flex w-100 mt-5" @submit.prevent="sendMessage">
                                <input v-model="message" class="form__input mr-2" style="height: 46px;"
                                       :placeholder="$t('base.message')">
                                <b-button v-if="this.$screen.width > 480" id="popover-target-1" class="emoji-button" variant="btn">
                                    <emoji :emoji="{ id: 'slightly_smiling_face', skin: 1 }" :size="32" />
                                </b-button>
                                <b-popover target="popover-target-1" triggers="focus" placement="right">
                                    <picker @select="emojiSelected" :showSkinTones="false" :showSearch="false" :showPreview="false" :showCategories="false" :emojiTooltip="false" :include="['people']" set="google" />
                                </b-popover>
                                <button type="submit" class="form__btn mt-0">{{ $t('base.send') }}</button>
                            </form>
                        </div>
                        <div class="chat-message mt-0" style="max-height: 600px;color: white;" v-scrollbar="{'alwaysShowTracks': true}">
                            <ul class="chat">
                                <li v-for="(message, index) in messageBoard" v-bind:key="index" class="left clearfix d-inline-flex w-100">
                                    <span class="chat-img mt-auto mb-auto">
                                        <img :src="message.user.picture" alt="User Avatar">
                                    </span>
                                    <div class="chat-body d-flex flex-column w-100">
                                        <div class="d-inline-flex">
                                            <strong class="primary-font">{{ message.user.username }}</strong>
                                            <small class="text-right text-muted ml-auto"> <font-awesome-icon icon="clock" /> {{ message.timestamp }}</small>
                                        </div>
                                        <div class="d-inline-flex">
                                            <p style="line-break: anywhere;">
                                                {{ message.text }}
                                            </p>
                                            <small style="cursor: pointer;" v-if="loggedIn() && user().role === 'owner'" @click="deleteMessage(message.id)" class="text-right text-muted ml-auto pl-3"><font-awesome-icon icon="times" /></small>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Adsense
            class="text-center pt-3"
            data-ad-client="ca-pub-3890640160453569"
            data-ad-slot="9059882935"
            data-ad-format="auto"
            :data-ad-region="randomNumber(0, 200).toString()"
            data-full-width-responsive="true">
        </Adsense>
        <MovieCarouselSection v-if="this.popMovies.movies.length" :has-background="false" :has-margin="false" :title="this.$t('base.popular_movies')" :movies="this.popMovies.movies"></MovieCarouselSection>
        <MovieCarouselSection v-if="this.popMovies.series.length" :has-background="false" :has-margin="false" :title="this.$t('base.popular_series')" :movies="this.popMovies.series"></MovieCarouselSection>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import PageTitle from "@/components/PageTitle";
import {mapGetters} from "vuex";
import { Picker } from 'emoji-mart-vue'
import { Emoji } from 'emoji-mart-vue'
import MovieCarouselSection from "@/components/MovieCarouselSection";

export default {
    name: "MessageBoard",
    components: {
        Header,
        Footer,
        PageTitle,
        Emoji,
        Picker,
        MovieCarouselSection
    },

    data() {
        return {
            message: ''
        };
    },

    computed: {
        ...mapGetters("general", [
            "messageBoard",
        ]),
        ...mapGetters("movie", [
            "popMovies",
        ])
    },

    mounted() {
        window.Echo.join('Cinema.MessageBoard')
            .listen('.MessageBoardMessageSent', (e) => {
                if(e['message']['user']['username'] !== this.user().username) {
                    this.$store.dispatch('general/addMessageToMessageBoard', {message: e['message']}).then(() => {
                        this.$emit('loadingUpdated', false);
                    });
                }
            });
    },

    created() {
        if (this.messageBoard && this.messageBoard.length === 0) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('general/getMessageBoard').then(() => {
                this.$emit('loadingUpdated', false);
            });
        }

        if(this.popMovies && this.popMovies.movies.length === 0) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('movie/getPopMovies').then(() => {
                this.$emit('loadingUpdated', false);
            });
        }
    },

    methods: {
        emojiSelected(emoji)
        {
            this.message += emoji.native;
        },
        sendMessage(){
            if(this.loggedIn() && this.message !== '') {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('general/sendMessageBoard', {
                    message: this.message
                }).then((response) => {
                    this.message = '';
                    this.$emit('loadingUpdated', false);
                });
            }
        },
        deleteMessage(id) {
            if(this.loggedIn() && this.user().role === 'owner') {
                this.$emit('loadingUpdated', true);
                this.$store.dispatch('general/deleteMessageBoardMessage',{
                    id: id
                }).then(() => {

                    this.$store.dispatch('user/sendToast', {
                            message: this.$t('messages.message_board_deleted'),
                            type: 'success'
                        }
                    );
                    this.$emit('loadingUpdated', false);
                });
            }
        }
    }
};
</script>
<style scoped>
.emoji-button {
    position: absolute;
    right: 125px;
    box-shadow: none;
}

@media (min-width: 576px) {
    .emoji-button {
        position: absolute;
        right: 155px;
        box-shadow: none;
    }
}
</style>

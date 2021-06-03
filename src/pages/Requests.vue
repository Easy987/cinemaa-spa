<template>
    <div>
        <Header></Header>
        <PageTitle :title="$t('nav.requests')"></PageTitle>
        <div v-if="loggedIn()">
            <b-modal id="requestModal" footer-bg-variant="dark" header-bg-variant="dark" header-text-variant="white" header-border-variant="0" footer-border-variant="0" footer-text-variant="white" body-text-variant="white" body-bg-variant="dark" :title="$t('base.see_description')">
                <div>
                    <div class="col-12" v-if="!uploadingRequest">
                        <div class="profile__group" v-if="selectedRequest.user">
                            <label class="profile__label" for="rooam_name">{{ $t('base.sender') }}</label>
                            <input id="vac-icon-sendd" :disabled="true" required type="text" name="room_name" v-model="selectedRequest.user.username" class="profile__input">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="profile__group">
                            <label class="profile__label" for="room_nsame">{{ $t('base.title') }}</label>
                            <input id="vac-icon-send" :disabled="!uploadingRequest" required type="text" name="room_name" v-model="selectedRequest.title" class="profile__input">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="profile__group">
                            <label class="profile__label" for="room_nadme">{{ $t('base.description') }}</label>
                            <b-form-textarea
                                class="form__textarea"
                                id="about"
                                :disabled="!uploadingRequest"
                                v-model="selectedRequest.body"
                            ></b-form-textarea>
                        </div>
                    </div>
                </div>
                <template #modal-footer>
                    <b-button v-if="hasPermission('comments.delete')" size="xl" variant="danger" @click="deleteRequest">
                        {{ $t('base.delete') }}
                    </b-button>
                    <b-button size="xl" variant="success" @click="submitRequest">
                        OK
                    </b-button>
                </template>
            </b-modal>
            <div class="filter">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center mb-3 mt-3">
                                <div class="filter__content">
                                    <div></div>
                                    <button class="filter__btn" @click="uploadingRequest = true;$bvModal.show('requestModal'); selectedRequest = {};" type="submit">{{ this.$t('upload.send').toUpperCase() }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <section class="content" style="padding-bottom: 0px; margin-top: 5em !important;">
                    <div class="content__head">
                        <div class="container">
                            <Adsense
                                class="text-center pt-3 pb-5"
                                data-ad-client="ca-pub-3890640160453569"
                                data-ad-slot="2375609994"
                                data-ad-format="auto"
                                data-full-width-responsive="true">
                            </Adsense>
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm pt-3">
                                <div v-for="request in this.requests.data" v-bind:key="request.id" class="col mb-3 mt-3">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <img :src="request.user.picture" style="width:100px;margin-top:-65px" alt="User" class="img-fluid img-thumbnail rounded-circle mb-3">
                                            <h5 class="card-title" style="color: white !important;">{{ request.user.username }}</h5>
                                            <p class="text-secondary mb-1">{{ $t('base.title') }}: <b style="color: orange;">{{ request.title }}</b></p>
                                        </div>
                                        <div class="card-footer">
                                            <button @click="selectedRequest = request; $bvModal.show('requestModal'); uploadingRequest = false;" class="btn btn-sm btn-block has-icon">
                                                <b>{{ $t('base.see')}}</b>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- paginator -->
                            <div v-if="this.requests.data && this.requests.data.length > 0" class="col-12 mb-5">
                                <ul v-if="Object.keys(this.requests).length > 0" class="paginator">
                                    <li v-if="this.requests.links.first !== this.requests.links.last && this.requests.meta.current_page !== 1" class="paginator__item paginator__item--next">
                                        <a @click="navigation(requests.links.first)"><font-awesome-icon icon="angle-double-left" /></a>
                                    </li>

                                    <li v-if="this.requests.meta.current_page !== 1" class="paginator__item paginator__item-prev">
                                        <a @click="navigation(requests.links.prev)"><font-awesome-icon icon="angle-left" /></a>
                                    </li>

                                    <li v-if="this.requests.meta.current_page === 1" class="paginator__item paginator__item--active">
                                        <a>{{ this.requests.meta.current_page }}</a>
                                    </li>
                                    <li v-if="this.requests.meta.current_page === 1 && this.requests.links.next !== null" class="paginator__item">
                                        <a @click="navigation(nextNPage(1))">{{ this.requests.meta.current_page+1 }}</a>
                                    </li>
                                    <li v-if="this.requests.meta.current_page === 1 && this.requests.meta.last_page > 2" class="paginator__item">
                                        <a @click="navigation(nextNPage(2))">{{ this.requests.meta.current_page+2 }}</a>
                                    </li>


                                    <li v-if="this.requests.meta.current_page > 1 && this.requests.meta.current_page < this.requests.meta.last_page" class="paginator__item">
                                        <a @click="navigation(previousNPage(1))">{{ this.requests.meta.current_page-1 }}</a>
                                    </li>

                                    <li v-if="this.requests.meta.current_page > 1 && this.requests.meta.current_page < this.requests.meta.last_page" class="paginator__item paginator__item--active">
                                        <a>{{ this.requests.meta.current_page }}</a>
                                    </li>

                                    <li v-if="this.requests.meta.current_page > 1 && this.requests.meta.current_page < this.requests.meta.last_page" class="paginator__item">
                                        <a @click="navigation(nextNPage(1))">{{ this.requests.meta.current_page+1 }}</a>
                                    </li>


                                    <li v-if="this.requests.meta.current_page === this.requests.meta.last_page && this.requests.meta.current_page-2 >= 1 && this.requests.links.prev" class="paginator__item">
                                        <a @click="navigation(previousNPage(2))">{{ this.requests.meta.current_page-2 }}</a>
                                    </li>
                                    <li v-if="this.requests.meta.current_page === this.requests.meta.last_page && this.requests.links.prev !== null" class="paginator__item">
                                        <a @click="navigation(previousNPage(1))">{{ this.requests.meta.current_page-1 }}</a>
                                    </li>
                                    <li v-if="this.requests.meta.current_page === this.requests.meta.last_page && this.requests.meta.current_page !== 1" class="paginator__item paginator__item--active">
                                        <a>{{ this.requests.meta.current_page }}</a>
                                    </li>


                                    <li v-if="this.requests.meta.current_page !== this.requests.meta.last_page" class="paginator__item paginator__item--next">
                                        <a @click="navigation(requests.links.next)"><font-awesome-icon icon="angle-right" /></a>
                                    </li>

                                    <li v-if="this.requests.links.first !== this.requests.links.last && this.requests.meta.current_page !== this.requests.meta.last_page" class="paginator__item paginator__item--next">
                                        <a @click="navigation(requests.links.last)"><font-awesome-icon icon="angle-double-right" /></a>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="mb-5 text-center">
                                <p class="section__text">{{ this.$t('base.no_requests') }}</p>
                            </div>
                            <!-- end paginator -->
                        </div>
                        <Adsense
                            class="text-center pt-3 pb-3"
                            data-ad-client="ca-pub-3890640160453569"
                            data-ad-slot="9059882935"
                            data-ad-format="auto"
                            data-full-width-responsive="true">
                        </Adsense>
                    </div>
                </section>
            </section>
        </div>
        <div v-else class="m-auto w-100 text-center" style="color: white;">
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
    name: "Requests",
    components: {
        Header,
        Footer,
        PageTitle
    },

    data() {
        return {
            selectedRequest: {
                title: ''
            },
            uploadingRequest: false,
        };
    },

    computed: {
        requests() {
            return this.$store.getters["general/requests"];
        }
    },

    methods: {
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.push({ name: 'requests', params: { lang: this.$t('navTexts.requests').toString(), page: page}})
            }
        },
        getRequests(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1};

            this.$store.dispatch('general/getRequests', payload).then(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        submitRequest(event) {
            if(this.uploadingRequest) {
                if(this.uploadingRequest && Object.keys(this.selectedRequest).length > 0 && this.selectedRequest.title.length > 0 && this.selectedRequest.body.length > 0) {
                    this.$emit('loadingUpdated', true);
                    this.$store.dispatch('general/submitRequest', {request: this.selectedRequest}).then(() => {
                        this.$store.dispatch('user/sendToast', {
                                message: this.$t('messages.thanks_for_requesting'),
                                type: 'success'
                            }
                        );
                        this.$emit('loadingUpdated', false);
                        this.$bvModal.hide('requestModal');

                        this.getRequests(this.$route.params.page);
                    });
                }
            } else {
                this.$bvModal.hide('requestModal');
            }
        },
        deleteRequest() {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('general/deleteRequest', {id: this.selectedRequest.id}).then(() => {
                this.$store.dispatch('user/sendToast', {
                        message: this.$t('messages.request_deleted'),
                        type: 'success'
                    }
                );
                this.$emit('loadingUpdated', false);
                this.$bvModal.hide('requestModal');

                this.getRequests(this.$route.params.page);
            });
        },
        replaceUrlParam(url, paramName, paramValue) {
            if (paramValue == null) {
                paramValue = '';
            }
            var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
            if (url.search(pattern)>=0) {
                return url.replace(pattern,'$1' + paramValue + '$2');
            }
            url = url.replace(/[?#]$/,'');
            return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
        },
        previousNPage(n) {
            let url = this.requests.meta.path;
            url = this.replaceUrlParam(url, 'page', this.requests.meta.current_page - n);
            return url;
        },
        nextNPage(n) {
            let url = this.requests.meta.path;
            url = this.replaceUrlParam(url, 'page', this.requests.meta.current_page + n);
            return url;
        }
    },

    created() {
        this.$root.$emit('unreadRequestsReset');

        if((this.requests && Object.keys(this.requests).length === 0) || this.$route.params.page !== this.requests.meta.current_page) {
            this.getRequests(this.$route.params.page);
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page || from.params.type !== to.params.type || (from.name !== to.name))) {
                    this.getRequests(to.params.page);
                }
            },
            immediate: true
        },
    },
};
</script>
<style scoped>
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(210, 201, 255, 0.04);
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.gutters-sm {
    margin-right: -8px;
    margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
    padding-right: 8px;
    padding-left: 8px;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}
.h-100 {
    height: 100%!important;
}
.shadow-none {
    box-shadow: none!important;
}

.bg-white {
    background-color: #fff!important;
}
.btn-light {
    color: #1a202c;
    background-color: #fff;
    border-color: #cbd5e0;
}
.ml-2, .mx-2 {
    margin-left: .5rem!important;
}

.card-footer:last-child {
    border-radius: 0 0 .25rem .25rem;
}
.card-footer, .card-header {
    display: flex;
    align-items: center;
}
.card-footer {
    padding: .5rem 1rem;
    background-color: rgba(210, 201, 255, 0.04);
    border-top: 0 solid rgba(0,0,0,.125);
}

.has-icon {
    border: 1px solid black;
    height: 40px;
    color: white;
}

.user-online {
    background-color: darkgreen !important;
    border-color: darkgreen !important;
}
</style>

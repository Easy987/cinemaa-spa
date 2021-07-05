<template>
    <div>
        <Header></Header>
        <main class="main" v-if="movies">
            <div class="container-fluid">
                <div class="row">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>Adatlapok</h2>

                            <span class="main__title-stat">{{ movies.meta.total }} összesen</span>

                            <div class="main__title-wrap">
                                <div class="filter" id="filter__sort">
                                    <span class="filter__item-label">Premier:</span>


                                    <b-form-checkbox @change="searchMovie" v-model="filter.premiers"></b-form-checkbox>
                                </div>

                                    <div class="filter" id="filter__sort">
                                        <span class="filter__item-label">Link nélküli:</span>


                                        <b-form-checkbox @change="searchMovie" v-model="filter.empty_links"></b-form-checkbox>
                                    </div>

                                    <div class="filter" id="filter__sort">
                                        <span class="filter__item-label">Státusz:</span>

                                        <b-form-select @change="searchMovie" style="background-color: rgba(210, 201, 255, 0.04); color: white; border: 1px solid transparent;" v-model="filter.status" :options="statusTypes"></b-form-select>
                                    </div>
                                    <!-- end search -->

                                    <form @submit.prevent="searchMovie" class="main__title-form">
                                        <input v-model="filter.name" type="text" placeholder="Adatlap keresése....">
                                        <button type="submit">
                                            <i class="icon ion-ios-search"></i>
                                        </button>
                                    </form>
                            </div>

                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- movies -->
                    <div class="col-12">
                        <div class="main__table-wrap">
                            <div class="table-responsive scroll-area mb-2" v-scrollbar="{alwaysShowTracks: true, thumbMinSize: 50}">
                                <table class="main__table">
                                <thead>
                                <tr>
                                    <th>KIJELÖLÉS</th>
                                    <th>ID</th>
                                    <th>NÉV</th>
                                    <th>ÉVJÁRAT</th>
                                    <th>IMDB ÉRTÉKELÉS</th>
                                    <th>ÉRTÉKELÉS</th>
                                    <th>KATEGÓRIA</th>
                                    <th>MEGTEKINTÉSEK</th>
                                    <th>STÁTUSZ</th>
                                    <th>BEKÜLDŐ</th>
                                    <th>LÉTREHOZÁS DÁTUMA</th>
                                    <th>SZERKESZTÉS</th>
                                </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(movie, index) in movies.data" v-bind:key="index">
                                        <td>
                                            <div class="main__table-text">
                                                <b-checkbox v-model="movie.selected" @input="movieChecked($event, movie.id)"></b-checkbox>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="main__table-text" v-b-popover.hover.bottom="''" :title="movie.id">X</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text"><router-link target="_blank" :to="{ name: movie.type === 0 ? 'movie' : 'serie', params: { lang: $t('navTexts.' + (movie.type === 0 ? 'movie' : 'serie')), slug: movie.slugs[$i18n.locale], year: movie.year, length: movie.length} }">{{ movie.titles['hu'] }}</router-link></div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ movie.year }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text main__table-text--rate"><i class="icon ion-ios-star"></i> {{ movie.imdb_rating }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text main__table-text--rate"><i class="icon ion-ios-star"></i> {{ movie.rating }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ movie.type === 0 ? 'Film' : 'Sorozat' }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ movie.views }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text" :class="{'main__table-text--green' : movie.status === '1', 'main__table-text--red': movie.status === '2'}">{{ getMovieStatus(movie.status) }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ movie.user ? movie.user.username : 'Ismeretlen' }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-text">{{ $moment(movie.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                        </td>
                                        <td>
                                            <div class="main__table-btns">
                                                <button @click="blockMovie(movie.id)" class="main__table-btn main__table-btn--banned open-modal" v-b-popover.hover.bottom="''" title="Adatlap elrejtése">
                                                    <i class="icon ion-ios-lock"></i>
                                                </button>
                                                <button @click="acceptMovie(movie.id)" class="main__table-btn main__table-btn--banned open-modal" v-b-popover.hover.bottom="''" title="Adatlap elfogadása">
                                                    <i class="icon ion-ios-checkmark"></i>
                                                </button>
                                                <router-link :to="{ name: 'admin-movie', params: {id: movie.id} }" class="main__table-btn main__table-btn--edit" v-b-popover.hover.bottom="''" title="Adatlap szerkesztése">
                                                    <i class="icon ion-ios-create"></i>
                                                </router-link>
                                                <button @click="deleteMovie(movie.id)" class="main__table-btn main__table-btn--delete" v-b-popover.hover.bottom="''" title="Adatlap törlése">
                                                    <i class="icon ion-ios-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <!-- end movies -->

                    <div class="col-12 pl-3 pb-3">
                        <b-checkbox v-model="selectedAll" @input="checkAll($event)" style="color: white;">Összes kijelölése</b-checkbox>
                    </div>
                    <br />

                    <div class="col-12 pl-0" v-if="selectedMovies.filter(x => x.value === true).length > 0">
                        <button @click="deleteMovies()" class="btn btn-secondary ml-3">Adatlapok törlése</button>
                    </div>



                    <!-- paginator -->
                    <div class="col-12">
                        <div class="paginator-wrap">
                            <navigator @navigation="navigation" :items="movies" not-found-text="Nem található adatlap"></navigator>
                        </div>
                    </div>
                    <!-- end paginator -->
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Vue from 'vue';
import Header from "@/components/includes/admin/Header";
import Navigator from "@/components/pageComponents/Navigator";
import {mapGetters} from "vuex";

export default {
    name: "AdminUsers",
    components: {
        Header,
        Navigator
    },

    computed: {
        ...mapGetters("admin", [
            "movies",
        ]),
    },

    data()
    {
        return {
            filter: {
                name: '',
                status: -1,
                empty_links: false,
                premiers: false,
            },
            statusTypes: [
                { value: -1, text: 'Összes' },
                { value: 0, text: 'Megerősítésre vár' },
                { value: 1, text: 'Nyilvános' },
                { value: 2, text: 'Rejtett' },
            ],
            selectedMovies: [],
            selectedAll: false,
        };
    },

    created() {
        if((this.movies && Object.keys(this.movies).length === 0) || this.$route.params.page !== this.movies.meta.current_page) {
            this.getMovies(this.$route.params.page, this.filters);
        }
    },

    methods: {
        deleteMovies(){
            this.$emit('loadingUpdated', true);
            this.$api.delete('/admin/moviesMultiple?ids=' + JSON.stringify(this.selectedMovies)).then(() => {
                this.movies.data = this.movies.data.filter(x => !this.selectedMovies.find(y => y.id === x.id));
                this.movies.data.forEach((movie) => {
                    movie.selected = false;
                });

                this.selectedMovies = [];
                this.selectedAll = false;

                this.$store.dispatch('user/sendToast', {
                        message: 'Adatlapok sikeresen törölve.',
                        type: 'success'
                    }
                );

                this.getMovies(this.$route.params.page);

                this.$emit('loadingUpdated', false);
            }).catch(() => {
                this.$emit('loadingUpdated', false);
            });
        },
        checkAll(event) {
            if(event === false) {
                Vue.set(this.selectedMovies, []);

                this.movies.data.forEach((movie) => {
                    movie.selected = false;
                });
            } else {
                let objects = [];
                this.movies.data.forEach((movie) => {
                    movie.selected = true;
                    objects.push({id: movie.id, value: event});
                    Vue.set(this.selectedMovies, objects);
                });
            }
        },
        movieChecked(event, id) {
            if(this.selectedMovies.filter(x => x.id === id).length > 0) {
                this.selectedMovies = this.selectedMovies.filter(x => x.id !== id);
            } else {
                this.selectedMovies.push({id: id, value: event});
            }
        },
        getMovieStatus(status) {
            switch(status){
                case '0':
                    return 'Megerősítésre vár';
                case '1':
                    return "Nyilvános";
                case '2':
                    return "Rejtett";
            }
        },
        navigation(url) {
            if(url !== null) {
                const page = url.split('=')[1];

                this.$router.replace({ name: 'admin-movies', params: { page: page}});

                this.getMovies(page);
            }
        },
        getMovies(page) {
            this.$emit('loadingUpdated', true);

            let payload = {page: page || 1, filter: this.filter};

            this.$store.dispatch('admin/getMovies', payload).then((res) => {
                this.$router.replace({ name: 'admin-movies', params: { page: res.meta.current_page}});

                this.$emit('loadingUpdated', false);
            });
        },
        blockMovie(movie) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/blockMovie', {movie: movie}).then((res) => {
                this.$emit('loadingUpdated', false);
                if(res.data.status === '2') {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Adatlap sikeresen elrejtve.',
                            type: 'success'
                        }
                    );
                } else {
                    this.$store.dispatch('user/sendToast', {
                            message: 'Adatlap sikeresen feloldva.',
                            type: 'success'
                        }
                    );
                }

            });
        },
        acceptMovie(movie) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/acceptMovie', {movie: movie}).then((res) => {
                this.$emit('loadingUpdated', false);
                this.$store.dispatch('user/sendToast', {
                        message: 'Adatlap sikeresen elfogadva.',
                        type: 'success'
                    }
                );
            });
        },
        searchMovie() {
            this.$router.replace({ name: 'admin-movies', params: { page: 1}});

            this.getMovies(1);
        },
        deleteMovie(movie) {
            this.$emit('loadingUpdated', true);
            this.$store.dispatch('admin/deleteMovie', {movie: movie}).then(() => {
                this.$emit('loadingUpdated', false);
                this.$store.dispatch('user/sendToast', {
                        message: 'Adatlap sikeresen törölve.',
                        type: 'success'
                    }
                );

                this.getMovies(this.$route.params.page, this.filters);
            });
        }
    },

    watch: {
        '$route': {
            handler: function(to, from) {
                if(from && (from.params.page !== to.params.page )) {
                    this.getMovies(to.params.page);
                }
            },
            immediate: true
        },
    },
};
</script>

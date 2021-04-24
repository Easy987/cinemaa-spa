<template>
    <div class="filter">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <form @submit.prevent="sendFilter">
                        <div class="filter__content">
                            <div class="filter__items">
                                <div class="filter__item" id="filter__name">
                                    <span class="filter__item-label">{{ this.$t('base.name').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="$t('base.filter')">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <input style="height: 30px;margin-bottom: 0px; padding-left: 10px;padding-right: 10px" type="text" class="form__input" v-model="filter.name">
                                        </template>
                                    </b-dropdown>
                                </div>
                                <!-- filter item -->
                                <div class="filter__item" id="filter__genre">
                                    <span class="filter__item-label">{{ this.$t('base.role').toUpperCase() }}:</span>

                                    <b-dropdown menu-class="filter__item-menu" no-caret variant="secondary shadow-none bg-transparent border-0 filter__item-btn pl-0">
                                        <template #button-content>
                                            <input type="button" class="filter__item-btn" :value="$t('base.filter')">
                                            <span></span>
                                        </template>
                                        <template #default>
                                            <div v-scrollbar class="scroll-area">
                                                <b-dropdown-item v-for="(role, index) in roles" v-bind:key="index" @click.native.capture.stop="filterRole(role)" :class="{'active': filter.role.some(x => x.key === role.key)}" link-class="p-0">{{ role.value }}</b-dropdown-item>
                                            </div>
                                        </template>
                                    </b-dropdown>
                                </div>
                                <!-- end filter item -->
                            </div>

                            <!-- filter btn -->
                            <button class="filter__btn" type="submit">{{ this.$t('base.filter').toUpperCase() }}</button>
                            <!-- end filter btn -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "FilterSection",

    data() {
        return {
            filter: {
                role: [],
                name: ''
                /*imdb: ["0.0", "10.0"],
                year: [(new Date().getFullYear()-20).toString(), new Date().getFullYear().toString()],*/
            },
            roles: [
                { key: 'user', value: this.$t('roles.user')},
                { key: 'uploader', value: this.$t('roles.uploader')},
                { key: 'moderator', value: this.$t('roles.moderator')},
                { key: 'administrator', value: this.$t('roles.administrator')},
                { key: 'owner', value: this.$t('roles.owner')}
            ]
        }
    },

    props: {
        title: {
            type: String,
            default: '',
        },
    },

    methods: {
        sendFilter() {
            this.$emit('filter', this.filter);
        },

        filterRole(role) {
            if(this.filter.role.filter(x => x.key === role.key).length > 0) {
                this.filter.role.splice(this.filter.role.indexOf(role), 1);
            } else {
                this.filter.role.push(role);
            }
        }
    }
};
</script>

<style>
.scroll-area {
    position: relative;
    margin: auto;
    height: 150px;
}

.active a {
    color: #f77f00 !important;
}
</style>

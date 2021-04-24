<template>
    <div>
        <ul v-if="items.data.length > 0" class="paginator">
            <li v-if="items.links.first !== items.links.last && items.meta.current_page !== 1" class="paginator__item paginator__item--next">
                <a @click="navigation(items.links.first)"><font-awesome-icon icon="angle-double-left" /></a>
            </li>

            <li v-if="items.meta.current_page !== 1" class="paginator__item paginator__item-prev">
                <a @click="navigation(items.links.prev)"><font-awesome-icon icon="angle-left" /></a>
            </li>

            <li v-if="items.meta.current_page === 1" class="paginator__item paginator__item--active">
                <a>{{ items.meta.current_page }}</a>
            </li>
            <li v-if="items.meta.current_page === 1 && items.links.next !== null" class="paginator__item">
                <a @click="navigation(nextNPage(1))">{{ items.meta.current_page+1 }}</a>
            </li>
            <li v-if="items.meta.current_page === 1 && items.meta.last_page > 2" class="paginator__item">
                <a @click="navigation(nextNPage(2))">{{ items.meta.current_page+2 }}</a>
            </li>


            <li v-if="items.meta.current_page > 1 && items.meta.current_page < items.meta.last_page" class="paginator__item">
                <a @click="navigation(previousNPage(1))">{{ items.meta.current_page-1 }}</a>
            </li>

            <li v-if="items.meta.current_page > 1 && items.meta.current_page < items.meta.last_page" class="paginator__item paginator__item--active">
                <a>{{ items.meta.current_page }}</a>
            </li>

            <li v-if="items.meta.current_page > 1 && items.meta.current_page < items.meta.last_page" class="paginator__item">
                <a @click="navigation(nextNPage(1))">{{ items.meta.current_page+1 }}</a>
            </li>


            <li v-if="items.meta.current_page === items.meta.last_page && items.meta.current_page-2 >= 1 && items.links.prev" class="paginator__item">
                <a @click="navigation(previousNPage(2))">{{ items.meta.current_page-2 }}</a>
            </li>
            <li v-if="items.meta.current_page === items.meta.last_page && items.links.prev !== null" class="paginator__item">
                <a @click="navigation(previousNPage(1))">{{ items.meta.current_page-1 }}</a>
            </li>
            <li v-if="items.meta.current_page === items.meta.last_page && items.meta.current_page !== 1" class="paginator__item paginator__item--active">
                <a>{{ items.meta.current_page }}</a>
            </li>


            <li v-if="items.meta.current_page !== items.meta.last_page" class="paginator__item paginator__item--next">
                <a @click="navigation(items.links.next)"><font-awesome-icon icon="angle-right" /></a>
            </li>

            <li v-if="items.links.first !== items.links.last && items.meta.current_page !== items.meta.last_page" class="paginator__item paginator__item--next">
                <a @click="navigation(items.links.last)"><font-awesome-icon icon="angle-double-right" /></a>
            </li>
        </ul>
        <div v-else class="mb-5 text-center">
            <p class="section__text" style="color: white; font-weight: bold">{{ this.notFoundText }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navigator",

    components: {
        
    },

    props: {
        items: {
            type: Object,
            default: () => {
                return {};
            }
        },
        notFoundText: {
            type: String,
            default: '',
        },
    },

    methods: {
        navigation(url) {
            this.$emit('navigation', url);
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
            let url = this.items.meta.path;
            url = this.replaceUrlParam(url, 'page', this.items.meta.current_page - n);
            return url;
        },
        nextNPage(n) {
            let url = this.items.meta.path;
            url = this.replaceUrlParam(url, 'page', this.items.meta.current_page + n);
            return url;
        }
    },
};
</script>

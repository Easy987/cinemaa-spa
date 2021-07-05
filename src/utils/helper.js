export function getMovieCardRatingClass(rating) {
    if (rating >= 7) {
        return "card__rate card__rate--green";
    } else if (rating < 7 && rating > 5) {
        return "card__rate card__rate--orange";
    } else {
        return "card__rate card__rate--red";
    }
}

export function loggedIn() {
    return this.$store.getters["auth/loggedIn"];
}

export function user() {
    return this.$store.getters["auth/user"];
}

export function hasPermission(permission) {
    return this.$store.getters["auth/user"].permissions.filter(x => x.name === permission).length > 0;
}

export function getStaticOptions(type) {
    let genres = this.$i18n.t(type);

    genres = Object.keys(genres).map(key => {
        return {key: key, value: genres[key]};
    });

    return genres.sort((a, b) => a.value.localeCompare(b.value));
}

export function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

<template>
    <div>
        <Header></Header>
        <main class="main">
            <div class="container-fluid">
                <div class="row row--grid">
                    <!-- main title -->
                    <div class="col-12">
                        <div class="main__title">
                            <h2>{{ $t('admin.rules') }}</h2>
                        </div>
                    </div>
                    <!-- end main title -->

                    <!-- dashbox -->
                    <div class="col-12 col-xl-12">
                        <div class="dashbox">
                            <div class="dashbox__title">
                                <h3><i class="icon ion-ios-trophy"></i> Vezetői szabályzat</h3>
                            </div>
                            <div class="dashbox__table-wrap">
                                <p>A Cinemaa platformja tárhelyet ad film adatlapoknak és hozzá tartozó információk tárolásának. Azonban az alábbiak betartása kötelező:</p>

                                <p>Aki sok anyagot küld be, "Feltöltői rang"-ot érdemel.</p>
                                <p>Feltöltői rangot (mivel automatikusan, moderálás nélkül is megjelenik minden ezektől a felhasználóktól az oldalon) nem adható bárkinek! Aki feltöltői rangot ad egy felhasználónak, az felel az általa kinevezett tag cselekedeteiért és általa tárolt adatokért!</p>
                                <p><b>Ha egy felhasználó tag küld be adatlapot vagy linket: Szigorú ellenőrzés követően fogadható el!</b> A filmes tartalmak a feltöltőkre van bízva.</p>
                            </div>
                        </div>
                    </div>
                    <!-- end dashbox -->

                    <!-- dashbox -->
                    <div class="col-12 col-xl-12">
                        <div class="dashbox">
                            <div class="dashbox__title">
                                <h3><i class="icon ion-ios-contacts"></i> Hozzászólás szabályzat</h3>
                            </div>
                            <div class="dashbox__table-wrap">
                                <ul>
                                    <li>
                                        Kizárólag a film tartalmáról szóló és a felhasználó véleményét kifejező írások fogadhatóak el!
                                    </li>
                                    <li>
                                        <b>Egészséges, kulturált hozzászólás az elfogadott, az alpári stílusú megnyilvánulás mellőzése kötelező!</b>
                                    </li>
                                </ul>
                                <p>Ha egy kiadó kéri hozzászólásban, emailen vagy egyéb módon az eltávolítását egy adatlapnak, akkor minden esetben tegyél neki eleget! Vagy töröld az adatlapot, vagy állítsd a státuszát aktiválatlanra, hogy ne tudják újból beküldeni a feltöltők sem és az oldalon se legyen elérhető ezáltal!</p>
                                <p>Amennyiben olyan linket találnál az oldalon, ami vélhetően illegális (pl.: nincs a videó körül vizuális vagy "felugró ablak"-os reklám), amiből pénz generálódhat a jogtulajdonosoknak, vélhetően jogellenesen került fel az internetre. <b>Ezeket minden esetben töröld az oldalról.</b></p>
                                <p>Tilos olyat tárolni a Cinemaa-n ami az interneten még nem elérhető/fellelhető máshonnan is.</p>
                                <p>Egyéb kérdések esetén, írhatsz a cinemaa@protonmail.com-ra, amire egy vezető tag válaszolni fog. (A tárhelyszolgáltatót is eléred itt, ha gond van a szerverrel.)</p>
                            </div>
                        </div>
                    </div>
                    <!-- end dashbox -->
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from "@/components/includes/admin/Header";

export default {
    name: "Admin",
    components: {
        Header,
    },
};
</script>

<template>
    <Header/>
    <main class="grid-container gap-y-8 md:gap-y-10 xl:gap-y-14 grow mt-10">
        <slot/>
    </main>
    <Footer/>
</template>
<script setup>
    useServerSeoMeta({
        lang: 'ru',
        'yandex-verification': "07e6e2dae7743368"
    })
</script>
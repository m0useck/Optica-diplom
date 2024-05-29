<template>
    <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
        <p>Акции</p>
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
    </div>
    <div class="flex items-center max-lg:flex-col gap-6">
        <div class="flex flex-col gap-4 lg:w-1/2">
            <p class="text-xl font-Comfortaa font-noraml">Наименование акции</p>
            <img src="/img/stocks/promotion_1.png" alt="" class="rounded-xl w-full">
        </div>
        <p class="lg:w-1/2">Описание акции и тупа текст</p>
    </div>
    <div class="flex items-center max-lg:flex-col gap-6">
        <div class="flex flex-col gap-4 lg:w-1/2">
            <p class="text-xl font-Comfortaa font-noraml">Наименование акции</p>
            <img src="/img/stocks/promotion_1.png" alt="" class="rounded-xl w-full">
        </div>
        <p class="lg:w-1/2">Описание акции и тупа текст</p>
    </div>
</template>

<script setup>
    /* название страницы */
    useServerSeoMeta({
        title: 'Акции',
        lang: 'ru'
    })
</script>


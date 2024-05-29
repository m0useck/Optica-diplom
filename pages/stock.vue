<template>
    <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
        <p>Акции</p>
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
    </div>
    <div class="flex flex-col gap-">
        <p class="text-xl font-Comfortaa font-normal">Акция 1</p>
        <img src="/img/stocks/promotion_1.png" alt="" class="rounded-xl lg:w-2/3">
    </div>
    <div class="flex flex-col gap-">
        <p class="text-xl font-Comfortaa font-normal">Акция 2</p>
        <img src="/img/stocks/promotion_1.png" alt="" class="rounded-xl lg:w-2/3">
    </div>
</template>

<script setup>
    /* название страницы */
    useServerSeoMeta({
        title: 'Акции',
        lang: 'ru'
    })
</script>


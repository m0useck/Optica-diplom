<template>
    <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
        <p>Акции</p>
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
    </div>
    <div class="flex items-center max-lg:flex-col gap-6">
        <div class="flex flex-col gap-4 lg:w-1/2">
            <p class="text-xl font-Comfortaa font-normal">Скидка -10%</p>
            <img src="/img/stocks/promotion_1.png" alt="" class="rounded-xl w-full aspect-[157/58] object-cover object-top border border-[#3BBAC2] shadow-[0px_0px_13px_-7px_black]">
        </div>
        <p class="text-lg tracking-wider lg:w-1/2 opacity-80">Дорогие покупатели!<br>
Мы рады сообщить вам о специальной акции, которая сделает ваше лето 2024 года ещё ярче и выгоднее. Весь сезон, с июня по август, наш интернет-магазин предлагает скидку 10% на весь ассортимент. Независимо от того, ищете ли вы стильные солнечные очки, модные оправы для очков или аксессуары, это отличная возможность обновить свой образ и сэкономить!</p>
    </div>
    <div class="flex items-center max-lg:flex-col gap-6">
        <div class="flex flex-col gap-4 lg:w-1/2">
            <p class="text-xl font-Comfortaa font-normal">Открытие</p>
            <img src="/img/stocks/promotion_2.png" alt="" class="rounded-xl w-full aspect-[157/58] object-cover object-top border border-[#3BBAC2] shadow-[0px_0px_13px_-7px_black]">
        </div>
        <p class="text-lg tracking-wider lg:w-1/2 opacity-80">Мы рады приветствовать вас в нашем новом интернет-магазине Оптики, и в честь этого знаменательного события мы подготовили для вас специальное предложение! Только сейчас, в честь нашего открытия, мы дарим скидку 5% на весь ассортимент. Акция действует до конца июня.</p>
    </div>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Акции',
        lang: 'ru'
    })
</script>


<template>
    <div class="grow flex items-center justify-center">
        <div class="p-4 rounded-xl flex flex-col gap-4 shadow-[0px_0px_13px_-7px_black] items-center text-center">
            <p class="text-3xl text-[#3BBAC2] font-Comfortaa font-normal">Заказ успешно оформлен!</p>
            <p class="opacity-70 text-xl max-w-2xl">Спасибо за ваш заказ! Мы рады, что вы выбрали нас. Ваш запрос успешно оформлен, и наша команда уже начала работу над ним. Если у вас возникнут какие-либо вопросы или пожелания, не стесняйтесь обращаться к нам. Мы всегда готовы помочь. Спасибо за ваше доверие!</p>
            <NuxtLink to="/profile" class="px-4 py-2 rounded-xl border border-[#3BBAC2] text-[#3BBAC2]">В личный кабинет</NuxtLink>
        </div>
    </div>
</template>

<script setup>
    /* название страницы */
    useServerSeoMeta({
        title: 'Успешное оформление',
        lang: 'ru'
    })
</script>
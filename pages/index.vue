<template>
    <div class="relative w-full -mt-10 col-span-full grid-container py-10 bg-[#0C669C]">
        <div class="absolute w-full h-full top-0 bg-[url(/img/hero/bg.png)] bg-bottom left-0 col-span-full"></div>
        <Swiper :loop="true" :space-between="20" :modules="[SwiperPagination, SwiperAutoplay, SwiperNavigation]" :pagination="{ clickable: true }" :autoplay="{delay:3500}" :navigation="{prevEl:'.indexPrev', nextEl:'.indexNext'}" class="w-full md:h-[calc(100vh/2)] z-[1] rounded-md shadow-[0px_0px_13px_-9px_black] overflow-hidden">
            <SwiperSlide class="w-full">
                <NuxtLink class="w-full">
                    <img class="object-cover aspect-video w-full" src="/img/hero/3.jpg" alt="">
                </NuxtLink>
            </SwiperSlide>
            <SwiperSlide class="w-full">
                <NuxtLink class="w-full">
                    <img class="object-cover aspect-video w-full" src="/img/hero/4.jpg" alt="">
                </NuxtLink>
            </SwiperSlide>
            <SwiperSlide class="w-full">
                <NuxtLink class="w-full">
                    <img class="object-cover aspect-video w-full" src="/img/hero/5.jpg" alt="">
                </NuxtLink>
            </SwiperSlide>
        </Swiper>
        <button class="absolute top-1/2 -translate-y-1/2 left-4 indexPrev z-[1]">
            <Icon class="text-5xl text-[#218CAD]" name="material-symbols:chevron-left"/>
        </button>
        <button class="absolute top-1/2 -translate-y-1/2 right-4 indexNext z-[1]">
            <Icon class="text-5xl text-[#218CAD]" name="material-symbols:chevron-right"/>
        </button>
    </div>
    <!-- <div class="font-semibold flex items-center justify-center py-4 px-10 w-full rounded-md gap-16 max-lg:flex-col max-lg:gap-8 bg-gradient-to-r from-[#0C669C] to-[#3BBAC2] text-white -mt-6">
        <NuxtLink>
            Оправы
        </NuxtLink>
        <NuxtLink>
            Линзы
        </NuxtLink>
        <NuxtLink>
            Контактные линзы
        </NuxtLink>
        <NuxtLink>
            Готовые очки
        </NuxtLink>
        <NuxtLink>
            Солнцезащитные очки
        </NuxtLink>
    </div> -->
    
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
            <p>Наши новинки</p>
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card v-for="product in products.slice(0,3)" v-bind="product"></Card>
        </div>
    </div>
    <Reviews></Reviews>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
            <p>Наши преимущества</p>
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 text-white">
            <div class="flex flex-col bg-[#218CAD] rounded-md px-6 py-6 gap-4">
                <div class="flex items-start justify-between font-Comfortaa font-normal">
                    <p class="text-2xl">Ассортимент</p>
                    <Icon class="text-4xl mr-6" name="material-symbols:shopping-bag-outline"/>
                </div>
                <p class="text-md opacity-70 font-semibold max-xl:mt-auto">У нас в магазине оптики огромный выбор оправ и линз для всех возрастов и стилей. Найдите идеальные очки, подчеркивающие вашу уникальность!</p>
            </div>
            <div class="flex flex-col bg-[#197299] rounded-md px-6 py-6 gap-4">
                <div class="flex items-start justify-between font-Comfortaa font-normal">
                    <p class="text-2xl">Гарантия качества</p>
                    <Icon class="text-4xl mr-6" name="material-symbols:google-guarantee"/>
                </div>
                <p class="text-md opacity-70 font-semibold max-xl:mt-auto">Мы гарантируем высокое качество продукции. Каждая пара очков проходит строгий контроль, чтобы обеспечить надежность и комфорт для ваших глаз.</p>
            </div>
            <div class="flex flex-col bg-[#218CAD] rounded-md px-6 py-6 gap-4">
                <div class="flex items-start justify-between font-Comfortaa font-normal">
                    <p class="text-2xl">Доступные цены</p>
                    <Icon class="text-4xl mr-6" name="solar:sale-bold"/>
                </div>
                <p class="text-md opacity-70 font-semibold max-xl:mt-auto">Отличное качество по доступным ценам! Найдите стильные и комфортные очки по выгодным предложениям в нашем магазине оптики.</p>
            </div>
        </div>
    </div>
    <Feedback></Feedback>
</template>

<script setup>
    /* название страницы */
    useServerSeoMeta({
        title: 'Оптика',
        lang: 'ru',
        'yandex-verification': "07e6e2dae7743368"
    })


    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    /* подключение к БД */
    const supabase = useSupabaseClient()
    const { data:products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })   
</script>


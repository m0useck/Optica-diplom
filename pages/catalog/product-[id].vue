<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="flex bg-white max-lg:flex-col p-6 rounded-md gap-10 col-span-1 lg:col-span-2">
            <div class="relative lg:w-3/5">
                <Swiper :loop="true" :space-between="20" :modules="[SwiperPagination, SwiperAutoplay, SwiperNavigation]" :navigation="{prevEl:'.productsPrev', nextEl:'.productsNext'}" :pagination="{ clickable: true }" :autoplay="{delay:3500}" class="w-full z-[1] rounded-md overflow-hidden">
                    <SwiperSlide class="w-full">
                        <NuxtLink class="w-full">
                            <img class="object-cover aspect-video w-full" :src="data[0].image" alt="">
                        </NuxtLink>
                    </SwiperSlide>
                    <SwiperSlide class="w-full">
                        <NuxtLink class="w-full">
                            <img class="object-cover aspect-video w-full" :src="data[0].image2" alt="">
                        </NuxtLink>
                    </SwiperSlide>
                    <SwiperSlide class="w-full">
                        <NuxtLink class="w-full">
                            <img class="object-cover aspect-video w-full" :src="data[0].image3" alt="">
                        </NuxtLink>
                    </SwiperSlide>
                </Swiper>
                <button class="absolute top-1/2 -translate-y-1/2 -left-8 productsPrev">
                    <Icon class="text-4xl text-[#218CAD]" name="material-symbols:chevron-left"/>
                </button>
                <button class="absolute top-1/2 -translate-y-1/2 -right-8 productsNext">
                    <Icon class="text-4xl text-[#218CAD]" name="material-symbols:chevron-right"/>
                </button>
            </div>
            <div class="lg:w-2/5 flex flex-col gap-6">
                <p class="opacity-70 text-sm">ID: {{ data[0].id }}</p>
                <div class="flex flex-col gap-2">
                    <p class="text-3xl font-semibold">{{ data[0].brand }}</p>
                    <p class="text-xl opacity-80">{{ data[0].title }}</p>
                </div>
                <div class="h-px rounded-full mx-auto w-[90%] bg-[#0C669C]/80"></div>
                <p class="text-3xl text-[#3BBAC2]">{{ data[0].price.toLocaleString() }}₽</p>
                <div class="h-px rounded-full mx-auto w-[90%] bg-[#0C669C]/80"></div>
                <button @click="addCart" v-if="authenticated && role == 'user'" class="bg-[#0C669C] rounded-full text-white px-4 py-2 w-1/2 mx-auto transition-all hover:animate-pulse">В корзину</button>
                <p class="text-lg">Товар: <span class="text-emerald-700">в наличии</span></p>
            </div>
        </div>
        <div class="flex flex-col bg-white rounded-md p-4 gap-8 col-span-1" v-if="data[0].characteristic">
            <p class="text-2xl">Характеристики</p>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2 text-base" v-for="characteristic in data[0].characteristic">
                    <div class="flex items-center justify-between gap-2">
                        <p class="opacity-60">{{ characteristic.title }}</p>
                        <p>{{ characteristic.value }}</p>
                    </div>
                    <div class="h-px w-full border-b border-black/70 border-dashed"></div>    
                </div>
            </div>
        </div>
        <div class="flex flex-col bg-white rounded-md p-4 gap-4 col-span-1">
            <p class="text-2xl">Описание</p>
            <p class="font-normal">
                Мы рады предложить вам широкий ассортимент высококачественных очков по выгодным ценам. Наш магазин призван обеспечить ваш комфорт и удовлетворить все ваши потребности в сфере офтальмологии.<br><br>

                <span class="font-semibold">Преимущества нашего магазина:</span><br>

                <br>• <span class="font-semibold">Обширный выбор:</span> Вы найдете оправы и контактные линзы на любой вкус, стиль и бюджет. От классических до современных, от повседневных до дизайнерских — у нас есть все, что вы ищете.
                <br>• <span class="font-semibold">Высокое качество:</span> Вся наша продукция производится из высококачественных материалов и соответствует самым строгим стандартам. Вы можете быть уверены в долговечности и надежности наших очков.
                <br>• <span class="font-semibold">Доступные цены:</span> Мы понимаем, что очки — это необходимость, а не роскошь. Поэтому мы предлагаем нашу продукцию по самым доступным ценам, чтобы каждый мог позаботиться о своем зрении.
                <br>• <span class="font-semibold">Профессиональная помощь:</span> Наша команда опытных специалистов всегда готова ответить на ваши вопросы, помочь с выбором и предоставить профессиональные рекомендации.
                <br>• <span class="font-semibold">Удобство:</span> Наши покупки можно совершить в любое время и в любом месте. Удобный интерфейс сайта позволит вам легко найти нужный товар и оформить заказ.
            </p>
        </div>
    </div>

</template>

<script setup>
    /* название страницы */
    useServerSeoMeta({
        title: 'Товар',
        lang: 'ru'
    })


    /* получение id товара и проверка пользователя */
    const route = useRoute()
    const {authenticated, role, id} = storeToRefs(useUserStore())


    /* подключение к БД */
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', `${route.params.id}`)


    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    /* добавление в корзину */
    const addCart = async () => {
        const { data: carts, error } = await supabase
        .from('cart')
        .select(`*, products (*)`)
        .eq('status', 'В корзине')
        .eq('userId', `${id.value}`)
        .eq('productId', `${route.params.id}`)

        console.log(carts)

        if(carts.length>0) {
            const { data, error } = await supabase
            .from('cart')
            .update({ count: `${Number(carts[0].count)+1}` })
            .eq('status', 'В корзине')
            .eq('userId', `${id.value}`)
            .eq('productId', `${route.params.id}`)
            .select()      
        
            messageTitle.value = 'Количество обновлено!', messageType.value = true
            setTimeout(() => {
                messageTitle.value = null
            }, 3000)
        } else {            
            const { data, error } = await supabase
            .from('cart')
            .insert([
                { userId: `${id.value}`, productId: `${route.params.id}`, status: 'В корзине', count: 1 },
            ])
            .select()       
            
            if(data) {
                messageTitle.value = 'Добавлено в корзину!', messageType.value = true
                setTimeout(() => {
                    messageTitle.value = null
                }, 3000)
            } else {
                messageTitle.value = 'Произошла ошибка!', messageType.value = false
                setTimeout(() => {
                    messageTitle.value = null
                }, 3000) 
            }            
        }
    }
</script>

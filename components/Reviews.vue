<template>
    <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
        <p>Отзывы</p>
        <span class="w-8 h-0.5 bg-black rounded-full"></span>
    </div>
    <div class="relative col-span-full w-full grid-container">
        <Swiper :loop="true" :space-between="20" :modules="[SwiperAutoplay, SwiperNavigation]" :autoplay="{delay:3500}" :navigation="{prevEl:'.reviewsPrev', nextEl:'.reviewsNext'}" class="w-full z-[1] rounded-md"
        :breakpoints="
                {
                    320: {
                        'slidesPerView': 1
                    },
                    768: {
                        'slidesPerView': 2.5
                    },
                    1024: {
                        'slidesPerView': 4
                    }
                }">
            <SwiperSlide class="!flex flex-col w-full rounded-md p-4 border-2 border-[#0C669C]/70 gap-6 bg-white" v-for="review in reviews">
                <div class="flex items-center gap-4 font-Comfortaa font-normal">
                    <Icon class="text-4xl text-[#218CAD]" name="material-symbols:account-circle"/>
                    <p class="text-xl">{{ review.users.name }} {{ review.users.surname }}</p>  
                </div>
                <p class="opacity-70">{{ review.desc }}</p>
            </SwiperSlide>
        </Swiper>
        <button class="absolute top-1/2 -translate-y-1/2 -left-10 reviewsPrev max-lg:hidden">
            <Icon class="text-4xl text-[#218CAD]" name="material-symbols:chevron-left"/>
        </button>
        <button class="absolute top-1/2 -translate-y-1/2 -right-10 reviewsNext max-lg:hidden">
            <Icon class="text-4xl text-[#218CAD]" name="material-symbols:chevron-right"/>
        </button>
    </div>
    <div class="relative bg-[url(/img/hero/reviews.avif)] bg-cover p-4 rounded-lg overflow-hidden" v-if="authenticated && role == 'user'">
        <div class="absolute bg-black/70 w-full h-full top-0 left-0"></div>
        <div class="relative flex flex-col gap-6 z-[1]">
            <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl text-white font-Comfortaa font-normal">
                <span class="w-8 h-0.5 bg-white rounded-full"></span>
                <p>Оставить отзыв</p>
                <span class="w-8 h-0.5 bg-white rounded-full"></span>
            </div>
            <FormKit @submit="addReview" type="form" :actions="false" messages-class="text-[#E71616]" form-class="flex flex-col items-center gap-6 w-full md:w-1/2 px-4 py-6 md:mx-auto">
                <FormKit v-model="reviewsForm.desc" name="Отзыв" validation="required|length:5,200" type="textarea" placeholder="Напишите свой отзыв здесь" input-class="p-4 focus:outline-none h-28" inner-class="$remove:w-max-md w-full" outer-class="w-full rounded-md overflow-hidden"/>
                <FormKit type="submit" input-class="bg-gradient-to-br from-[#0C669C] to-[#3BBAC2] rounded-md font-semibold text-white text-center w-full py-2 hover:opacity-80 transition-all duration-300 $remove:focus-visible:outline-blue-600 $remove:focus-visible:outline-offset-2 $remove:bg-blue-600 $remove:focus-visible:outline-2 $remove:inline-flex $remove:text-sm">Отправить</FormKit>
            </FormKit>
        </div>
    </div>
</template>

<script setup>
    /* подключение к БД */
    const supabase = useSupabaseClient()

    const { data:reviews, error } = await supabase
    .from('reviews')
    .select(`
        desc,
        users (
        name,
        surname
        )
    `)


    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    /* проверка входа и роутер */
    const {authenticated, role, id} = storeToRefs(useUserStore())
    const router = useRouter()


    /* добавлние отзыва */
    const reviewsForm = ref({
        desc: ""
    })

    const addReview = async () => {
        const { data, error } = await supabase
        .from('reviews')
        .insert([
            { desc: `${reviewsForm.value.desc}`, user: id.value},
        ])
        .select()

        if(data) {
            messageTitle.value = 'Отзыв добавлен!', messageType.value = true        
            setTimeout(() => {
                messageTitle.value = null                 
                router.go()     
            }, 1500)      
        } else {
            messageTitle.value = 'Произошла ошибка!', messageType.value = false 
            setTimeout(() => {
                messageTitle.value = null
            }, 3000)     
        }
    }
</script>

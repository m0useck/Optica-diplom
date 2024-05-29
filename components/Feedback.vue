<template>
    <div class="relative bg-[url(/img/contact/bg.png)] p-4 rounded-lg overflow-hidden">
        <div class="absolute w-full h-full top-0 left-0 bg-black/70 col-span-full"></div>
        <div class="flex flex-col gap-6 relative z-[1]">
            <div class="flex items-center gap-2 text-xl text-white md:text-2xl xl:text-3xl px-4 md:px-6 xl:px-10 pt-10 font-Comfortaa font-normal">
                <span class="w-8 h-0.5 bg-white rounded-full"></span>
                <p>Обратная связь</p>
                <span class="w-8 h-0.5 bg-white rounded-full"></span>
            </div>
            <div class="flex pb-10 px-4 md:px-6 xl:px-10 gap-6 z-[1] max-md:flex-col relative">
                <div class="flex flex-col md:w-[55%] rounded-lg p-0.5 bg-gradient-to-bl from-gray-200 to-[#3BBAC2]">
                    <div class="bg-white p-4 rounded-md grow">
                        <Swiper :loop="true" :space-between="20" :modules="[SwiperAutoplay, SwiperPagination]" :pagination="{ clickable: true }" :autoplay="{delay:5000}" class="w-full h-full">
                            <SwiperSlide class="!flex flex-col gap-8 w-full mb-10">
                                <p class="text-xl font-Comfortaa">Близорукость</p>
                                <p class="opacity-70">Близорукость — распространенное заболевание глаз, при котором человек видит хорошо близко, но плохо вдали. Причина - фокусировка света в области перед сетчаткой. Лечится очками, контактными линзами или хирургическими методами. Раннее выявление и правильная коррекция важны для сохранения зрения и комфортной жизни.</p> 
                            </SwiperSlide>
                            <SwiperSlide class="!flex flex-col gap-8 w-full mb-10">
                                <p class="text-xl font-Comfortaa">Дальнозоркость</p>
                                <p class="opacity-70">Дальнозоркость  - состояние, когда человек видит хорошо вдали, но плохо близко. Происходит из-за того, что фокус света падает позади сетчатки. Нередко возникает у детей и может быть унаследовано. Лечится очками, линзами или хирургическим вмешательством. Важна регулярная проверка зрения у офтальмолога для своевременной коррекции и поддержания зрительного комфорта.</p> 
                            </SwiperSlide>
                            <SwiperSlide class="!flex flex-col gap-8 w-full mb-10">
                                <p class="text-xl font-Comfortaa">Астигматизм</p>
                                <p class="opacity-70">Астигматизм - это нарушение зрения, когда корневая поверхность глаза не идеально округлая, что вызывает искажение изображения. Человек видит размыто как на близком, так и на дальнем расстоянии. Лечится очками, линзами или хирургически. Важно регулярно проверять зрение у офтальмолога для подбора оптимального способа коррекции и поддержания зрительного комфорта.</p> 
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div class="flex flex-col md:w-[45%] rounded-lg p-0.5 bg-gradient-to-br from-gray-200 to-[#3BBAC2]">
                    <FormKit type="form" @submit="feedback" messages-class="text-[#E71616]" form-class="flex flex-col items-center gap-8 bg-white w-full h-full rounded-md px-4 py-6" :actions="false">
                        <p class="text-center text-xl font-Comfortaa">Консультация</p>
                        <div class="flex flex-col gap-4 w-full items-center">
                            <FormKit v-model="form.name" validation="required|length:2" outer-class="$remove:mb-4 md:w-4/5" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="$remove:text-gray-700 $remove:border-none w-full border border-[#0C669C] px-4 py-1 w-full focus:outline-none focus:ring-0 focus:appearance-none rounded-md" name="Имя" placeholder="Имя" type="text"/>
                            <FormKit v-model="form.number" validation="required|length:11" outer-class="$remove:mb-4 md:w-4/5" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="$remove:text-gray-700 $remove:border-none w-full border border-[#0C669C] px-4 py-1 w-full focus:outline-none focus:ring-0 focus:appearance-none rounded-md" name="Телефон" placeholder="Телефон" type="mask" mask="+7 (###) ### ## ##"/>
                        </div>
                        <FormKit type="submit" input-class="font-semibold bg-gradient-to-br from-[#0C669C] to-[#3BBAC2] rounded-md text-white text-center w-full py-2 hover:opacity-80 transition-all duration-300 $remove:focus-visible:outline-blue-600 $remove:focus-visible:outline-offset-2 $remove:bg-blue-600 $remove:focus-visible:outline-2 $remove:inline-flex $remove:text-sm">Звонок</FormKit>
                    </FormKit>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    /* отправка формы в тг */

    const token = "7082146541:AAETwhFCqedtNq-qTHNL9e9hf7Mc-F0Qr0E"
    const chatId = "-4122136911"
    const URL = `https://api.telegram.org/bot${token}/sendMessage`

    const form = ref({
        name:"",
        number:""
    })

    const feedback = async () => {
        let msg = "<b>Сообщение с сайта!</b>\n"
        + `<b>Имя:</b> ${form.value.name}\n`
        + `<b>Телефон:</b> ${form.value.number}\n`
        const {data, error} = await useFetch(URL,{
            body:{
                'chat_id': chatId,
                'parse_mode': 'html',
                'text': msg
            },
            method:'post'        
      })
        if (error.value) return messageTitle.value = 'При отправке произошла ошибка!', messageType.value = false
        messageTitle.value = 'Успешная отправка!', messageType.value = true 
        form.value.name = ""
        form.value.number = ""
        setTimeout(() => {
            messageTitle.value = null
        }, 3000);
    }
</script>

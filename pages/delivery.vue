<template>
    <div class="flex items-center w-full bg-white shadow-[0px_0px_13px_-7px_black] border border-gray-100 rounded-lg grow relative">
        <button @click="isDeliveryShow = true" class="w-1/2 p-4 h-full" :class="{'text-[#3BBAC2]' : isDeliveryShow}">Доставка</button>
        <button @click="isDeliveryShow = false" class="w-1/2 p-4 h-full" :class="{'text-[#3BBAC2]' : !isDeliveryShow}">Самовывоз</button>
        <div class="h-full w-1/2 absolute top-1/2 -translate-y-1/2 border-2 border-[#3BBAC2] rounded-md transition-all duration-300" :class="isDeliveryShow ? 'translate-0-full' : 'translate-x-full'"></div>
    </div>
    <div class="relative">
        <div class="flex flex-col gap-6 transition-all duration-300" :class="{'-translate-x-[2000px]' : !isDeliveryShow}">
            <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
                <span class="w-8 h-0.5 bg-black rounded-full"></span>
                <p>Доставка</p>
                <span class="w-8 h-0.5 bg-black rounded-full"></span>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 font-normal">
                <div class="flex items-center justify-center bg-gradient-to-br from-[#028ECE] to-gray-200 p-0.5 rounded-lg">
                    <div class="flex flex-col gap-4 p-4 rounded-md grow bg-white">
                        <p class="text-2xl font-Comfortaa font-normal">Стандартная доставка</p>
                        <img src="/img/delivery/1.jpg" alt="" class="rounded-md">
                        <p class="text-xl font-Comfortaa font-normal">Преимущества:</p>
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-2">
                                <Icon class="text-2xl shrink-0 text-[#028ECE]/80" name="icon-park-outline:delivery"/>
                                <p class="text-xl">Доставка курьером до двери</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon class="text-2xl shrink-0 text-[#028ECE]/80" name="material-symbols:alarm-outline"/>
                                <p class="text-xl">Срок доставки от 1 до 3 дней</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon class="text-2xl shrink-0 text-[#028ECE]/80" name="solar:wallet-money-outline"/>
                                <p class="text-xl">300 ₽</p>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-6 absolute top-0 left-0 transition-all duration-300" :class="{'-translate-x-[2000px]' : isDeliveryShow}">
            <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
                <span class="w-8 h-0.5 bg-black rounded-full"></span>
                <p>Самовывоз</p>
                <span class="w-8 h-0.5 bg-black rounded-full"></span>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 font-normal">
                <div class="flex items-center justify-center bg-gradient-to-bl from-[#028ECE] to-gray-200 p-0.5 rounded-lg">
                    <div class="flex flex-col gap-4 p-4 rounded-md grow bg-white">
                        <p class="text-2xl font-Comfortaa font-normal">В магазине</p>
                        <img src="/img/delivery/2.jpg" alt="" class="rounded-md">
                        <p class="text-xl font-Comfortaa font-normal">Преимущества:</p>
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-2">
                                <Icon class="text-2xl shrink-0 text-[#028ECE]/80" name="icon-park-outline:delivery"/>
                                <p class="text-xl">Доставка курьером до двери</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon class="text-2xl shrink-0 text-[#028ECE]/80" name="material-symbols:alarm-outline"/>
                                <p class="text-xl">Срок доставки от 1 часа</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon class="text-2xl shrink-0 text-[#028ECE]/80" name="solar:wallet-money-outline"/>
                                <p class="text-xl">0 ₽</p>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Доставка',
        lang: 'ru'
    })


    /* показ формы */
    const isDeliveryShow = ref(true)
</script>

<template>
    <header class="w-full bg-white relative grid-container py-2 border-b-2 border-[#3BBAC2]">
        <div class="flex items-center gap-10 max-lg:justify-between">
            <NuxtLink to="/">
                <img class="w-20" src="/img/header/logo.png" alt=""> 
            </NuxtLink>
            <div class="flex items-center lg:justify-between text-lg max-lg:px-4 grow max-lg:flex-col max-lg:absolute max-lg:gap-6 max-lg:left-0 max-lg:bg-white max-lg:transition-all max-lg:duration-500 max-lg:z-30 max-lg:py-6 max-lg:justify-center max-lg:w-full" :class="isMenuShow ? 'max-lg:top-[calc(100%+1px)]' : 'max-lg:top-0 max-lg:-translate-y-full'">
                <div class="flex items-center gap-8 max-lg:flex-col max-xl:gap-6">
                    <NuxtLink to="/catalog">
                        Каталог
                    </NuxtLink>
                    <NuxtLink to="/stock">
                        Акции
                    </NuxtLink>
                    <NuxtLink to="/about">
                        О нас
                    </NuxtLink>
                    <NuxtLink to="/delivery">
                        Доставка
                    </NuxtLink>
                    <NuxtLink to="/admin" v-if="authenticated && role == 'admin'">
                        Админ панель
                    </NuxtLink>
                </div>
                <div class="flex gap-8 items-center max-md:gap-4 max-lg:flex-wrap max-lg:justify-center">
                    <form class="relative max-lg:w-full">
                        <input v-model="title" class="rounded-full border border-[#3BBAC2] pl-4 py-1 pr-10 w-full focus:outline-none focus:ring-0 focus:appearance-none" type="text">
                        <NuxtLink to="/catalog" class="absolute top-1/2 -translate-y-1/2 right-3">
                            <Icon class="text-2xl text-[#3BBAC2]" name="gravity-ui:magnifier"/>
                        </NuxtLink>
                    </form>
                    <NuxtLink to="/cart" v-if="authenticated && role == 'user'">
                        <Icon class="text-2xl text-[#3BBAC2]" name="material-symbols:shopping-cart-outline"/>
                    </NuxtLink>
                    <NuxtLink to="/profile" v-if="authenticated">
                        <Icon class="text-2xl text-[#3BBAC2]" name="material-symbols:account-circle-full"/>
                    </NuxtLink>
                    <button @click="logout" v-if="authenticated" class="bg-gradient-to-r from-[#0C669C] to-[#3BBAC2] text-white py-1.5 px-7 rounded-lg hover:opacity-80 transition-all duration-300">
                        Выход
                    </button>
                    <NuxtLink to="/auth" v-else class="bg-gradient-to-r from-[#0C669C] to-[#3BBAC2] text-white py-1.5 px-7 rounded-lg hover:opacity-80 transition-all duration-300">
                        Вход
                    </NuxtLink>
                </div>
            </div>
            <button class="flex flex-col justify-between w-[26px] transition-[height] z-40 ease-linear duration-100 lg:hidden" :class="isMenuShow ? 'h-5' : 'h-3.5'" @click="isMenuShow = !isMenuShow">
                <span :class="{'rotate-45' : isMenuShow}" class="w-full h-0.5 bg-[#3BBAC2] rounded-[1px] origin-[0] transition-transform ease-linear duration-500"></span>
                <span :class="{'opacity-0' : isMenuShow}" class="w-full h-0.5 bg-[#3BBAC2] rounded-[1px] transition-opacity ease-linear duration-500"></span>
                <span :class="{'-rotate-45' : isMenuShow}" class="w-full h-0.5 bg-[#3BBAC2] rounded-[1px] origin-[0] transition-transform ease-linear duration-500"></span>
            </button>
        </div>
        <div @click="isMenuShow = false" class="w-full absolute h-screen bg-black/70 left-0 col-span-full z-20 top-[calc(100%+1px)] lg:hidden" :class="{'hidden' : !isMenuShow}"></div>
        <button type="button" @click="messageTitle = null" class="fixed top-10 right-10 z-[11] cursor-pointer flex items-center gap-4 px-6 py-2 rounded-2xl w-fit text-[#131313] shadow-[0_0_20px_-7px]" :class="messageType ? ' bg-[#BDE595]' : 'bg-red-500'" v-if="messageTitle">
            <span>{{messageTitle}}</span>
            <Icon name="material-symbols:close-rounded" class="text-xl"/>
        </button>        
    </header>
</template>

<script setup>
    /* открытие меню */
    const isMenuShow = ref(false)


    /* закрытие мобильного меню */
    const nuxtApp = useNuxtApp()
    nuxtApp.hook('page:start', () => {
        isMenuShow.value = false
    })
    

    /* проверка входа и выход */
    const {authenticated, role} = storeToRefs(useUserStore())
    const router = useRouter()

    const logout = () => {
        authenticated.value = false
        role.value = null
        router.push('/')
        messageTitle.value = "Успешный выход"
        messageType.value = true
        setTimeout(() => {
            messageTitle.value = null
        }, 3000) 
    }


    /* создание поиска */
    const { title } = storeToRefs(useSearchStore())


    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())
</script>

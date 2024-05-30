<template>
    <div class="flex flex-col justify-center items-center grow relative py-5 rounded-lg xl:gap-20 md:gap-16 gap-10 text-center bg-[url(/img/auth/login.png)] bg-white/80 bg-cover border-2 border-[#0C669C]/80">
        <div class="flex flex-col gap-4">
            <p class="text-xl md:text-2xl xl:text-3xl text-[#0C669C] font-Comfortaa font-normal">Вход</p>
            <p class="text-sm xl:text-base text-black/70">Добро пожаловать! Войдите в аккаунт.</p>
        </div>
        <FormKit type="form" @submit="auth" messages-class="text-[#E71616]" form-class="flex flex-col gap-6 md:gap-8 xl:gap-10 w-full" :actions="false">
            <div class="flex lg:items-start max-lg:flex-col max-lg:px-4 gap-6 w-full justify-center">
                <FormKit outer-class="$remove:mb-4 lg:w-1/3" v-model="authForm.email" validation="required|length:6|email" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="$remove:text-gray-700 $remove:border-none w-full border border-[#0C669C] px-4 py-1 w-full focus:outline-none focus:ring-0 focus:appearance-none rounded-full" name="Почта" placeholder="Почта" type="text"/>
                <FormKit outer-class="$remove:mb-4 lg:w-1/3" v-model="authForm.password" validation="required|length:5" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="$remove:text-gray-700 $remove:border-none w-full border border-[#0C669C] px-4 py-1 w-full focus:outline-none focus:ring-0 focus:appearance-none rounded-full" name="Пароль" placeholder="••••••" type="password"/>
            </div>
            <FormKit type="submit" input-class="bg-[#0C669C] rounded-full font-semibold text-white text-center md:w-1/4 max-md:px-6 py-2 hover:opacity-80 transition-all duration-300 $remove:focus-visible:outline-blue-600 $remove:focus-visible:outline-offset-2 $remove:bg-blue-600 $remove:focus-visible:outline-2 $remove:inline-flex $remove:text-sm">Войти</FormKit>
            <div class="flex items-center justify-center gap-5 font-Comfortaa font-normal">
                <div class="h-px w-1/6 bg-black/70"></div>
                <p class="text-[#0C669C] text-xl">или</p>
                <div class="h-px w-1/6 bg-black/70"></div>
            </div>
            <NuxtLink to="/reg" class="bg-[#3BBAC2] rounded-full mx-auto text-white text-center md:w-1/4 max-md:px-6 py-2 hover:opacity-80 transition-all duration-300">Регистрация</NuxtLink>
        </FormKit>
    </div>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Вход',
        lang: 'ru'
    })


    /* подключение к БД */
    const supabase = useSupabaseClient()


    /* создание формы */
    const authForm = ref({
        email:"",
        password:""
    })


    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    /* отправка формы и создание роутера */
    const userStore = useUserStore()
    const router = useRouter()
    const auth = async() => {    
        let { data: users, error } = await supabase
        .from('users')
        .select("*")
        .eq('email', `${authForm.value.email}`)

        if (!users[0]) {
            messageTitle.value = 'Неверно введена почта!', messageType.value = false
            authForm.value.email = ""
            setTimeout(() => {
                messageTitle.value = null
            }, 3000) 
        } else { 
            console.log(users[0])  
            if (authForm.value.password != users[0].password){
                messageTitle.value = 'Неверно введен пароль!', messageType.value = false
                authForm.value.password = ""
                setTimeout(() => {
                    messageTitle.value = null
                }, 3000) 
            } else {
                messageTitle.value = 'Успешный вход!', messageType.value = true
                setTimeout(() => {
                    messageTitle.value = null
                }, 3000) 
                userStore.authenticated = true
                userStore.id = users[0].id 
                if (users[0].role != 'admin') {
                    userStore.role = "user"
                    router.push('/')
                } else {
                    userStore.role = "admin"
                    console.log(users[0].role)
                    router.push('/admin')
                }
            }
        }
    }   
</script>

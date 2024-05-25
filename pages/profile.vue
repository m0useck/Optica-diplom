<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
            <p>Личные данные</p>
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
        </div>
        <FormKit @submit="updateUser" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-4 items-center justify-center">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col md:w-2/3 lg:w-1/2">
                <FormKit type="text" v-model="user.name" validation="required" messages-class="text-[#E9556D] font-Comfortaa" name="Фамилия" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" placeholder="Фамилия"/>
                <FormKit type="text" v-model="user.surname" validation="required" messages-class="text-[#E9556D] font-Comfortaa" name="Имя" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" placeholder="Имя"/>
            </div>
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col md:w-2/3 lg:w-1/2">
                <FormKit type="text" v-model="user.email" validation="required" messages-class="text-[#E9556D] font-Comfortaa" name="Email" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" placeholder="Email"/>
                <FormKit type="password" v-model="user.password" validation="required|length:6" messages-class="text-[#E9556D] font-Comfortaa" name="Пароль" outer-class="w-full lg:w-1/2" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" placeholder="••••••"/>
            </div>            
            <button type="submit" class="px-4 py-2 bg-[#3BBAC2] text-white rounded-full w-[160px] text-center">Обновить данные</button>
        </FormKit>
    </div>
    <div class="flex flex-col gap-6" v-if="role == 'user'">
        <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
            <p>Заказы</p>
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
        </div>
        <div class="flex flex-col gap-8 text-lg rounded-xl border border-[#3BBAC2] p-4 relative lg:w-1/2" v-for="order in ordersArray">
            <div class="flex flex-col gap-4">
                <p><span class="font-Comfortaa">Номер заказа:</span> <span class="font-bold">{{ order[0].orderId }}</span></p>
                <p><span class="font-Comfortaa">Статус заказа:</span> <span class="font-bold">{{ order[0].status }}</span></p>
                <p><span class="font-Comfortaa">Адрес:</span> <span class="font-bold">{{ order[0].address }}</span></p>
                <p><span class="font-Comfortaa">Итоговая цена:</span> <span class="font-bold">{{ order[0].sum.toLocaleString() }} ₽</span></p>
            </div>
            <div class="flex flex-col gap-4 rounded-xl shadow-[0px_0px_13px_-7px_black] p-4" v-for="o in order">
                <p><span class="font-Comfortaa">Наименование товара/услуги:</span> <span class="font-bold">{{ o.products.title }}</span></p>
                <img :src="o.products.image" alt="" class="rounded-xl w-[160px]">
                <p><span class="font-Comfortaa">Количество товара:</span> <span class="font-bold">{{ o.count }}</span></p>
                <p><span class="font-Comfortaa">Цена за единицу:</span> <span class="font-bold">{{ o.products.price.toLocaleString() }} ₽</span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
    /* название страницы */
    useServerSeoMeta({
        title: 'Личный кабинет',
        lang: 'ru'
    })

    
    /* создание сообщений и роутера */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())
    const router = useRouter()


    /* подключение БД и проверка пользователя */
    const supabase = useSupabaseClient() 
    const { id, role } = storeToRefs(useUserStore())

    const { data:users, error } = await supabase
    .from('users')
    .select('*')   
    .eq('id',`${id.value}`)  


    /* создание формы пользователя */
    const user = ref({
        name: users[0].name,
        surname: users[0].surname,
        email: users[0].email,
        password: users[0].password
    }) 


    /* обновление данных */
    const updateUser = async () => {        
        const { data, error } = await supabase
        .from('users')
        .update({ name: `${user.value.name}`, surname: `${user.value.surname}`, email: `${user.value.email}`, password: `${user.value.password}`})
        .eq('id', `${id.value}`)
        .select()
        
        if(data) {
            console.log(data[0])
            messageTitle.value = 'Данные обновлены!', messageType.value = true 
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


    /* список заказов и проверка номеров */ 
    const orderNumbers = []
    const { data: carts } = await supabase
    .from('cart')
    .select(`*, products (*)`)
    .eq('userId',`${id.value}`)
    .neq('status','В корзине')
    carts.forEach(el => {
        if(orderNumbers.indexOf(el.orderId) === -1) {
            orderNumbers.push(el.orderId)
        }
    })    

    const ordersArray = ref([])
    for (let i = 0; i < orderNumbers.length; i++) {
        const array = []
        carts.forEach(el => {
            if(el.orderId == orderNumbers[i]) {
                array.push(el)
            }
        })
        ordersArray.value.push(array)
    }
</script>
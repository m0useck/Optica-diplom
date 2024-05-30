<template>
    <div class="flex max-lg:flex-col gap-8 md:gap-10 xl:gap-12" v-if="carts.length>0">
        <div class="flex flex-col gap-10 w-full lg:w-[70%]">
            <CartCard v-for="cart in carts" v-bind="cart"></CartCard>
        </div>
        <div class="flex flex-col gap-6 w-full lg:w-[30%] border-2 border-[#0C669C] rounded-md bg-white p-4 md:p-6 lg:px-12 lg:py-10 text-lg h-fit">
            <p class="text-2xl">Детали заказа</p>
            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between gap-2">
                    <label class="flex items-center gap-2 cursor-pointer"><input name="delivery" value="Доставка" type="radio" v-model="detailsForm.delivery">Доставка</label>
                    <p class="text-[#3BBAC2]">{{ deliveryPrice }} ₽</p>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <label class="flex items-center gap-2 cursor-pointer"><input name="delivery" value="Самовывоз" type="radio" v-model="detailsForm.delivery">Самовывоз</label>
                    <p class="text-[#3BBAC2]">0 ₽</p>
                </div>
            </div>
            <textarea class="px-4 py-2 rounded-md border border-[#3BBAC2]" placeholder="Укажите адрес доставки" v-if="detailsForm.delivery == 'Доставка'" v-model="detailsForm.address"></textarea>
            <p v-if="detailsForm.delivery == 'Самовывоз'">Самовывоз по адресу: {{ deliveryAddress }}</p>
            <div class="flex flex-col gap-2">
                <input @input="checkCode" class="px-4 py-2 rounded-md border border-[#3BBAC2]" v-model="detailsForm.code" placeholder="Укажите промокод" type="text">
                <p class="text-base" :class="detailsForm.codeType ? 'text-emerald-800' : 'text-[#E71616]'" v-if="detailsForm.codeTitle">{{ detailsForm.codeTitle }}</p>
            </div>
            <div class="flex items-center justify-between gap-2">
                <p class="">Итого:</p>
                <p class="text-[#3BBAC2] text-3xl">{{ total.toLocaleString() }} ₽</p>
            </div>
            <button @click="makeOrder" class="px-4 py-2 rounded-md bg-[#3BBAC2] text-white text-center">Оформить заказ</button>
        </div>
    </div>
    <div class="w-full lg:w-3/4 lg:mx-auto top-1/2 -translate-y-1/2 rounded-xl border-2 border-[#0C669C] p-4 flex flex-col gap-4 items-center justify-center relative h-fit bg-white" v-else>
        <p class="text-xl">Корзина пуста...</p>
        <p class="text-lg opacity-70">Перейдите в каталог для добавления товаров</p>
        <NuxtLink to="/catalog" class="px-4 py-2 rounded-xl bg-[#3BBAC2] text-white">В каталог</NuxtLink>
    </div>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Корзина',
        lang: 'ru'
    })


    /* создание формы */
    const detailsForm = ref({
        delivery: "",
        address: "",
        code: "",
        codeType: false,
        codeTitle: ""
    })


    /* проверка входа */
    const {id} = storeToRefs(useUserStore())
    

    /* создание сообщений */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    /* подключение к БД */
    const supabase = useSupabaseClient()
    const { data: carts, error } = await supabase
    .from('cart')
    .select(`*, products (*)`)
    .eq('status', 'В корзине')
    .eq('userId', `${id.value}`)


    /* итоговая сумма */
    let sum = 0
    carts.forEach(el => {
        sum += el.count*el.products.price 
    })
    const total = ref(sum)


    /* проверка промокода */
    const { data: codes, codesError } = await supabase
    .from('promocodes')
    .select(`*`)

    const promoCodes = []
    const disconts = []
    codes.forEach(el => {
        promoCodes.push(el.code)
        disconts.push(el.discontPercent)
    })

    function checkCode() {
        if (promoCodes.includes(detailsForm.value.code)) {
            const discontPercent = disconts[promoCodes.indexOf(detailsForm.value.code)]
            detailsForm.value.codeType = true
            detailsForm.value.codeTitle = `Промокод активирован (-${discontPercent}%) 😀`
            total.value = Math.round(sum - sum * (discontPercent/100))
        } else {
            detailsForm.value.codeType = false
            detailsForm.value.codeTitle = 'Промокод не найден 😯'
            total.value = sum
        }
    }


    /* проверка номера */
    const orderNumbers = []
    const { data: numbers } = await supabase
    .from('cart')
    .select(`*`)
    numbers.forEach(el => {
        if(orderNumbers.indexOf(el.productType) === -1) {
            orderNumbers.push(el.productType)
        }
    })

    const orderId = ref() 
    const checkNumbers = () => {
        const randomNumber = Math.floor(300 + Math.random() * (30000 + 1 - 300))
        if (orderNumbers.every((el)=> el != randomNumber)) {
            orderId.value = randomNumber
            return true
        } else {
            checkNumbers()
        }
    }
    checkNumbers()


    /* оформление заказа */
    const router = useRouter()
    const deliveryPrice = ref(300)
    const deliveryAddress = ref("Кронштадтский бул., 37Б")
    const makeOrder = async () => {
        if(detailsForm.value.delivery == "Доставка") {
            total.value += deliveryPrice.value
        } else {
            detailsForm.value.address = deliveryAddress.value
        }
        
        const { data, error } = await supabase
        .from('cart')
        .update({ status: 'Новый', orderId: orderId.value, sum: total.value, address: detailsForm.value.address})
        .eq('status', 'В корзине')
        .eq('userId', `${id.value}`)
        .select() 

        if(data) {
            messageTitle.value = 'Заказ успешно оформлен!', messageType.value = true
            setTimeout(() => {
                messageTitle.value = null
            }, 3000)
            router.push("/success")
        } else {
            messageTitle.value = 'Произошла ошибка!', messageType.value = false
            setTimeout(() => {
                messageTitle.value = null
            }, 3000) 
        }       
    } 
</script>

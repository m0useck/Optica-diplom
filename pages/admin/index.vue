<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal">
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
            <p>Добавление товара</p>
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
        </div>
        <FormKit @submit="addProduct" type="form" form-class="flex flex-col gap-6 full" :actions="false" messages-class="hidden">
            <div class="flex flex-col gap-6 items-center w-full">
                <FormKit v-model="productForm.title" validation="required" outer-class="$remove:mb-4 w-full" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" name="Наименование" placeholder="Наименование товара" type="text"/>                    
                <FormKit v-model="productForm.price" validation="required|number" outer-class="$remove:mb-4 w-full" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" name="Цена" placeholder="Цена" type="text"/>                    
                <FormKit v-model="productForm.type" validation="required" outer-class="$remove:mb-4 w-full" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" name="Тип" placeholder="Тип товара" type="select" :options="['Готовые очки','Оправы','Контактные линзы','Солнцезащитные очки']"/>                    
                <FormKit v-model="productForm.age" outer-class="$remove:mb-4 w-full" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" name="Возрастная категория" placeholder="Возрастная категория" type="select" :options="['Для детей','Для мужчин','Для женщин']"/>                    
                <FormKit v-model="productForm.brand" validation="required" outer-class="$remove:mb-4 w-full" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" name="Бренд" placeholder="Бренд" type="text"/>                    
                <FormKit v-model="productForm.color" validation="required" outer-class="$remove:mb-4 w-full" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" name="Цвет" placeholder="Цвет товара" type="text"/>                    
                <div class="flex flex-col gap-6 w-full">
                    <div class="flex flex-col gap-2 rounded-xl border border-[#3BBAC2] p-4" v-for="characteristic in characteristics">
                        <button @click="deleteCharacteristic(characteristics.indexOf(characteristic))" type="button" class="px-4 py-2 rounded-xl text-white bg-[#3BBAC2] w-fit self-end">
                            <Icon class="text-2xl" name="material-symbols:delete-forever"/>
                        </button>
                        <div class="flex items-start max-md:flex-col gap-2">
                            <FormKit v-model="characteristic.title" validation="required" outer-class="$remove:mb-4 w-full md:w-1/2" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" :name="`Наименование${characteristics.indexOf(characteristic)}`" placeholder="Наименование характеристики" type="text"/>                    
                            <FormKit v-model="characteristic.value" validation="required" outer-class="$remove:mb-4 w-full md:w-1/2" inner-class="$remove:mb-1 $remove:max-w-md $remove:ring-1 $remove:ring-gray-400 w-full $remove:focus-within:ring-2" message-class="text-[#E71616]" input-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full" :name="`Значение${characteristics.indexOf(characteristic)}`" placeholder="Значение характеристики" type="text"/>                    
                        </div>
                    </div>
                </div>
                <button @click="addCharacteristic" type="button" class="px-4 py-2 rounded-xl text-white bg-[#3BBAC2] mx-auto">
                    <Icon class="text-2xl" name="material-symbols:exposure-plus-1"/>
                </button>
                <FormKit @change="imageToBase" multiple="true" accept=".png,.jpg,.jpeg,.svg,.webp,.bmp" type="file" name="Фото" validation="required|min:3|max:3" messages-class="text-[#E9556D] font-Comfortaa text-base mt-2" outer-class="w-full" inner-class="px-4 py-2 border border-[#3BBAC2] rounded-xl focus:outline-none w-full bg-white"/>      
                <FormKit type="submit" input-class="bg-[#3BBAC2] rounded-full font-semibold text-white text-center max-md:px-6 py-2 hover:opacity-80 transition-all duration-300 $remove:focus-visible:outline-blue-600 $remove:focus-visible:outline-offset-2 $remove:bg-blue-600 $remove:focus-visible:outline-2 $remove:inline-flex $remove:text-sm">Добавить</FormKit>
            </div>
        </FormKit>
    </div>
    <div class="flex flex-col gap-6">
        <button @click="isProductsShow = !isProductsShow" class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal w-fit">
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
            <span>Список товаров</span>
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-all duration-500 overflow-hidden max-lg:py-4 lg:p-4" :class="isProductsShow ? 'h-full' : 'h-0'">
            <div class="flex flex-col gap-2 text-lg rounded-xl border border-[#3BBAC2] p-4 shadow-[0px_0px_13px_-7px_black]" v-for="product in products">
                <div class="flex items-center gap-4">
                    <NuxtLink :to="`/admin/edit-${product.id}`" class="text-amber-500">
                        <Icon class="text-3xl" name="material-symbols:edit-outline"/>
                    </NuxtLink>
                    <button @click="deleteProduct(product.id)" class="text-red-500">
                        <Icon class="text-3xl" name="ic:baseline-close"/>
                    </button>
                </div>
                <div class="flex flex-col gap-4">
                    <p><span class="font-Comfortaa">Наименование товара:</span> <span class="font-bold">{{ product.title }}</span></p>
                    <p><span class="font-Comfortaa">Цена:</span> <span class="font-bold">{{product.price.toLocaleString() }} ₽</span></p>
                    <NuxtLink :to="`/catalog/product-${product.id}`" class="trnasition-all duration-500 hover:scale-105">
                        <img :src="product.image" alt="" class="rounded-xl aspect-video object-cover">
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-6">
        <button @click="isOrdersShow = !isOrdersShow" class="flex items-center gap-2 text-xl md:text-2xl xl:text-3xl font-Comfortaa font-normal w-fit">
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
            <span>Заказы</span>
            <span class="w-8 h-0.5 bg-black rounded-full"></span>
        </button>
        <div class="flex flex-col gap-8 text-lg rounded-xl relative lg:w-1/2 transition-all duration-500 overflow-hidden" :class="isOrdersShow ? 'h-fit border border-[#3BBAC2] p-4 max-lg:pt-10' : 'h-0'" v-for="order in ordersArray">
            <div class="flex flex-col gap-4">
                <p><span class="font-Comfortaa">Заказчик:</span> <span class="font-bold">{{ order[0].users.surname }} {{ order[0].users.name }}</span></p>
                <p><span class="font-Comfortaa">ID заказчика:</span> <span class="font-bold">{{ order[0].users.id }}</span></p>
                <p><span class="font-Comfortaa">Номер заказа:</span> <span class="font-bold">{{ order[0].orderId }}</span></p>
                <p><span class="font-Comfortaa">Статус заказа:</span> <span class="font-bold">{{ order[0].status }}</span></p>
                <p><span class="font-Comfortaa">Адрес:</span> <span class="font-bold">{{ order[0].address }}</span></p>
                <p><span class="font-Comfortaa">Итоговая цена:</span> <span class="font-bold">{{ order[0].sum.toLocaleString() }} ₽</span></p>
            </div>
            <div class="flex flex-col gap-4 rounded-xl shadow-[0px_0px_13px_-7px_black] p-4" v-for="o in order">
                <p><span class="font-Comfortaa">Наименование товара:</span> <span class="font-bold">{{ o.products.title }}</span></p>
                <img :src="o.products.image" alt="" class="rounded-xl w-[160px]">
                <p><span class="font-Comfortaa">Количество товара:</span> <span class="font-bold">{{ o.count }}</span></p>
                <p><span class="font-Comfortaa">Цена за единицу:</span> <span class="font-bold">{{ o.products.price.toLocaleString() }} ₽</span></p>
            </div>
            <button v-if="order[0].status == 'Новый'" @click="cancelOrder(order[0].orderId)" class="absolute top-4 right-4 text-red-500">
                <Icon class="text-3xl" name="ic:baseline-close"/>
            </button>
            <button v-if="order[0].status == 'Новый'" @click="completeOrder(order[0].orderId)" class="absolute top-4 right-14 text-[#569E0B]">
                <Icon class="text-3xl" name="mdi:check"/>
            </button>
        </div>
    </div>
</template>

<script setup>
    /* название страницы */
    useSeoMeta({
        title: 'Админ-панель',
        lang: 'ru'
    })


    /* показ форм */
    const isProductsShow = ref(true)
    const isOrdersShow = ref(false)


    /* подключение БД */
    const supabase = useSupabaseClient() 


    /* создание сообщений и роутера */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())
    const router = useRouter()


    /* список заказов и проверка номеров */ 
    const orderNumbers = [] /* номер заказа */ 
    const { data: carts } = await supabase
    .from('cart')
    .select(`*, products (*), users (*)`)    
    .neq('status','В корзине')
    .order('status', { ascending: true })
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


    /* заказы */
    const cancelOrder = async (orderId) => {
        const { data, error } = await supabase
        .from('cart')
        .update({ status: 'Отменён'})
        .eq('orderId', `${orderId}`)
        .eq('status', `Новый`)
        .select()
          
        if(data) {
            console.log(data[0])
            messageTitle.value = 'Заказ отменён!', messageType.value = true 
            setTimeout(() => {
                router.go()
                messageTitle.value = null
            }, 1500) 
        } else {
            messageTitle.value = 'Произошла ошибка!', messageType.value = false 
            setTimeout(() => {
                messageTitle.value = null
            }, 3000) 
        }
    }

    const completeOrder = async (orderId) => {
        const { data, error } = await supabase
        .from('cart')
        .update({ status: 'Выполнен'})
        .eq('orderId', `${orderId}`)
        .eq('status', `Новый`)
        .select()
          
        if(data) {
            console.log(data[0])
            messageTitle.value = 'Заказ выполнен!', messageType.value = true 
            setTimeout(() => {
                router.go()
                messageTitle.value = null
            }, 1500) 
        } else {
            messageTitle.value = 'Произошла ошибка!', messageType.value = false 
            setTimeout(() => {
                messageTitle.value = null
            }, 3000) 
        }
    }


    /* список товаров */ 
    const { data: products } = await supabase
    .from('products')
    .select(`*`)


    /* добавление фото */
    let files = []
    const imageToBase = (el) => {
        files = el.target.files
        console.log(files)
    }    


    /* управление характеристиками */
    const characteristics = ref([
        {
            title: "",
            value: ""
        }
    ]) 

    const addCharacteristic = () => {
        characteristics.value.push({
            title: "",
            value: ""
        })
    }

    const deleteCharacteristic = (id) => {
        if(characteristics.value.length > 1) {
            characteristics.value.splice(id, 1)
        }
    }


    /* добавление товара */    
    const productForm = ref({
        title: "",
        price: "",
        type: "",
        brand: "",
        color: "",
        age: ""
    })
    
    const addProduct = async () => {        
        const { data:image1, error:image1Error } = await supabase.storage.from('products').upload(files[0].name, files[0])
        const { data:image2, error:image2Error } = await supabase.storage.from('products').upload(files[1].name, files[1])
        const { data:image3, error:image3Error } = await supabase.storage.from('products').upload(files[2].name, files[2])


        const { data, error } = await supabase
        .from('products')
        .insert([
            { image: `https://pvwebtjduaavjwmhmpvy.supabase.co/storage/v1/object/public/products/${files[0].name}`, image2: `https://pvwebtjduaavjwmhmpvy.supabase.co/storage/v1/object/public/products/${files[1].name}`, image3: `https://pvwebtjduaavjwmhmpvy.supabase.co/storage/v1/object/public/products/${files[2].name}`, title: `${productForm.value.title}`, price: `${productForm.value.price}`, type: `${productForm.value.type}`, brand: `${productForm.value.brand}`, color: `${productForm.value.color}`, age: `${productForm.value.age}`, characteristic: characteristics.value },
        ])
        .select()
          
        if(data) {
            console.log(data[0])
            messageTitle.value = 'Товар добавлен!', messageType.value = true 
            setTimeout(() => {
                router.go()
                messageTitle.value = null
            }, 1500) 
        } else {
            messageTitle.value = 'Произошла ошибка!', messageType.value = false 
            setTimeout(() => {
                messageTitle.value = null
            }, 3000) 
        }
    }


    /* удаление товара */
    const deleteProduct = async (productId) => {        
        const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', `${productId}`)          
          
        messageTitle.value = 'Товар удалён!', messageType.value = true 
        setTimeout(() => {
            router.go()
            messageTitle.value = null
        }, 1500) 
    }
</script>

<template>
    <div class="flex max-lg:flex-col border-2 border-[#0C669C] rounded-md gap-8 px-12 py-10 bg-white">
        <img class="w-1/2 object-cover aspect-video rounded-xl" :src="props.products.image" alt="">
        <div class="flex flex-col gap-4">
            <p class="text-xl">{{ props.products.title }}</p>
            <div class="flex items-center gap-4">
                <button @click="minusCard" class="border border-[#D7D7D7] w-10 h-10 rounded-lg text-2xl">-</button>
                <p class="text-xl">{{ countProduct }}</p>
                <button @click="plusCard" class="border border-[#D7D7D7] w-10 h-10 rounded-lg text-2xl">+</button>
            </div>
            <p class="text-3xl">{{ props.products.price.toLocaleString() }}₽</p>
            <button @click="deleteProduct" class="flex gap-4 items-center text-red-600">
                <span class="text-xl">Удалить</span>
                <Icon class="text-3xl" name="ic:outline-delete-outline"/>
            </button>
        </div>
    </div>
</template>

<script setup>
    /* пропсы */
    const props = defineProps({
        id: Number,
        count: Number,
        products: Object
    })
    const countProduct = ref(props.count)


    /* управление количеством и БД */
    const supabase = useSupabaseClient()     
    const plusCard = async () => {
        countProduct.value++

        const { data, error } = await supabase
        .from('cart')
        .update({ count: `${countProduct.value}` })
        .eq('id', `${props.id}`)
        .select()  

        setTimeout(() => {
            router.go()               
        }, 1500)   
    }
    const minusCard = async () => {
        if (countProduct.value > 1) {
            countProduct.value--

            const { data, error } = await supabase
            .from('cart')
            .update({ count: `${countProduct.value}` })
            .eq('id', `${props.id}`)
            .select() 

            setTimeout(() => {
                router.go()               
            }, 1500)   
        }
    }


    /* создание сообщений и роутера */
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    /* удаление товара */
    const router = useRouter()
    const deleteProduct = async () => {
        const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', `${props.id}`)

        if(error) {
            messageTitle.value = 'Произошла ошибка!', messageType.value = false 
            setTimeout(() => {
                messageTitle.value = null
            }, 3000)             
        } else {
            messageTitle.value = 'Удалено!', messageType.value = true 
            setTimeout(() => {
                messageTitle.value = null                
            }, 3000)             
            setTimeout(() => {
                router.go()               
            }, 1500)             
        }
    }
</script>
<template>
    <div class="flex max-lg:flex-col gap-6">
        <div class="flex flex-col border-2 border-[#0C669C]/60 p-4 rounded-lg lg:w-1/4 gap-6">
            <div class="flex flex-col gap-2">
                <p class="text-2xl font-Comfortaa font-normal">Цена</p>
                <div class="flex items-center gap-1">
                    <input v-model="filters.minPrice" class="w-1/2 rounded-l-md border border-[#3BBAC2] px-4 py-2" placeholder="От" type="text">
                    <input v-model="filters.maxPrice" class="w-1/2 rounded-r-md border border-[#3BBAC2] px-4 py-2" placeholder="До" type="text">
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-2xl font-Comfortaa font-normal">Категория</p>
                <select class="rounded-md border border-[#3BBAC2] px-4 py-2" name="age" v-model="filters.age">
                    <option :value="age" v-for="age in selectAge">{{ age }}</option>
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-2xl font-Comfortaa font-normal">Тип</p>
                <select class="rounded-md border border-[#3BBAC2] px-4 py-2" name="type" v-model="filters.type">
                    <option :value="type" v-for="type in selectType">{{ type }}</option>
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-2xl font-Comfortaa font-normal">Бренд</p>
                <label class="flex items-center gap-2 text-lg" v-for="brand in inputBrand">
                    <input type="checkbox" :value="brand" class="w-5 h-5" v-model="filters.brands">
                    {{ brand }}
                </label>
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-2xl font-Comfortaa font-normal">Цвет</p>
                <label class="flex items-center gap-2 text-lg" v-for="color in inputColor">
                    <input type="checkbox" :value="color" class="w-5 h-5" v-model="filters.colors">
                    {{ color }}
                </label>
            </div>
            <div class="flex flex-col gap-2">
                <button @click="filterProducts" class="px-4 py-2 rounded-md text-white w-full text-center bg-[#3BBAC2]">Применить</button>
                <button @click="cancelFilters" class="px-4 py-2 rounded-md text-[#3BBAC2] w-full text-center border border-[#3BBAC2]">Отменить</button>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 h-fit lg:grid-cols-3 lg:w-3/4 gap-4">
            <Card v-for="product in products" v-bind="product"></Card>
        </div>
    </div>
</template>

<script setup>
    /* название страницы */
    useServerSeoMeta({
        title: 'Каталог',
        lang: 'ru'
    })


    /* подключение к БД */
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('title', { ascending: true })   

    
    /* модификация данных и поиск */
    const { title } = storeToRefs(useSearchStore())
    const products = ref() 
    const filterData = ref()
    const modifyData = () => {
        products.value = data
        filterData.value = products.value.filter(el => {
            if(title.value && el.title.toLowerCase().indexOf(title.value.toLowerCase()) == -1) {
                return false
            }
            return true
        }) 
        products.value = filterData.value
    }
    modifyData()
    

    /* управление select'ами и input'ами */
    const selectAge = ref(['Все'])
    const selectType = ref(['Все'])
    const inputBrand = ref([])
    const inputColor = ref([])
    products.value.forEach(el => {
        if(selectAge.value.indexOf(el.age) === -1) {
            selectAge.value.push(el.age)
        }
        if(selectType.value.indexOf(el.type) === -1) {
            selectType.value.push(el.type)
        }
        if(inputBrand.value.indexOf(el.brand) === -1) {
            inputBrand.value.push(el.brand)
        }
        if(inputColor.value.indexOf(el.color) === -1) {
            inputColor.value.push(el.color)
        }
    })
       

    /* создание фильтров */    
    const filters = ref({
        minPrice: "",
        maxPrice: "",
        age: 'Все',
        type: 'Все',
        brands: [],
        colors: []
    })


    /* фильтрация */    
    const filterProducts = () => {
        products.value = filterData.value
        const filter = products.value.filter(el => {
            if (el.price < filters.value.minPrice && filters.value.minPrice) {
                return false
            }
            if (el.price > filters.value.maxPrice && filters.value.maxPrice) {
                return false
            }
            if (el.type != filters.value.type && filters.value.type != 'Все') {
                return false
            }
            if (el.age != filters.value.age && filters.value.age != 'Все') {
                return false
            }
            if(filters.value.colors.indexOf(el.color) == -1 && filters.value.colors.length>0) {
                return false
            }
            if(filters.value.brands.indexOf(el.brand) == -1 && filters.value.brands.length>0) {
                return false
            }
            return true
        })     
        products.value = filter
    }    
    
    const cancelFilters = () => {
        products.value = filterData.value
        filters.value.minPrice = ""
        filters.value.maxPrice = ""
        filters.value.age = "Все"
        filters.value.type = "Все"
        filters.value.brands = []
        filters.value.colors = []
    }

    /* добавление в БД */
    /* const addBD = async () => {        
        const { data, error } = await supabase
        .from('products')
        .insert([
            {
                image: "https://www.optic-city.ru/image/cache/rss/1/9/5/3/1/5/9/item_1953159/1953159_0-810x540.jpg.webp",
                title: "Очки Boss 1428 0OC",
                age: "Для взрослых",
                type: "Готовые очки",
                brand: "Boss",
                color: "Зелёный",
                price: 14599
            },
            {
                image: "https://www.optic-city.ru/image/cache/rss/1/8/1/7/8/3/5/item_1817835/1817835_0-810x540.jpg.webp",
                title: "Очки RayBan 5228 5014 (55)",
                age: "Для взрослых",
                type: "Готовые очки",
                brand: "RayBan",
                color: "Чёрный",
                price: 15749
            },
            {
                image: "https://www.optic-city.ru/image/cache/rss/1/9/1/3/4/7/1/item_1913471/1913471_0-810x540.jpg.webp",
                title: "Очки PRODESIGN 1762 1 9631",
                age: "Для взрослых",
                type: "Готовые очки",
                brand: "PRODESIGN",
                color: "Зелёный",
                price: 19899
            }
        ])
        .select()          
    } */
</script>


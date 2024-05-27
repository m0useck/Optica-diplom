export const useProductStore = defineStore('product', () => {
    const allProducts = ref([])  // Все товары
    const searchTerm = ref('')   // Поисковый запрос
  
    // Getter для фильтрованных товаров
    const filteredProducts = computed(() => {
      if (!searchTerm.value) return allProducts.value
      return allProducts.value.filter(product =>
        product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })
  
    // Actions для установки товаров и поискового запроса
    const setProducts = (products) => {
      allProducts.value = products
    }
  
    const setSearchTerm = (term) => {
      searchTerm.value = term
    }
  
    return {
      allProducts,
      searchTerm,
      filteredProducts,
      setProducts,
      setSearchTerm
    }
})
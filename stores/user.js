export const useUserStore  = defineStore("user", () => {
    const authenticated = useCookie('authenticated')
    const role = useCookie('role')
    const id = useCookie('id')
    authenticated.value = false

    return {authenticated, role, id}
})
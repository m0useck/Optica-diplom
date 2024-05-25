export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore()
    const authenticated = useCookie("authenticated")
    const role = useCookie("role")

    if(authenticated.value) {
        userStore.authenticated = true
    }

    if (authenticated.value && (to?.path === '/auth' || to?.path === '/reg')) {
        return navigateTo('/')
    }

    if(role.value != 'admin' && to?.path.includes("/admin")) {
        return navigateTo('/')
    }

    /* if(!authenticated.value && to?.path === '/profile' && role.value != 'admin') {
        return navigateTo('/')
    } */
})
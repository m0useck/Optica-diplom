<template>
    <footer class="flex flex-col w-full mt-16 bg-gradient-to-tr from-[#0C669C]/90 to-[#3BBAC2]/90 text-white text-lg">
        <div class="grid-container py-6">
            <div class="flex items-center max-xl:flex-col xl:gap-32 md:gap-12 gap-8">
                <div class="flex items-center gap-6">
                    <img class="max-md:hidden" src="/img/footer/footer.png" alt="">
                    <img class="max-md:hidden" src="/img/footer/footer2.png" alt="">
                    <img src="/img/footer/footer3.png" alt="">
                </div>
                <div class="flex flex-col gap-8 max-xl:w-full lg:grow">
                    <div class="flex justify-center items-center gap-6">
                        <NuxtLink to="https://github.com/m0useck" target="_blank" class="transition-all duration-300 hover:scale-125"><Icon class="text-3xl" name="skill-icons:github-dark"/></NuxtLink>
                        <NuxtLink to="https://t.me/summerva" target="_blank" class="transition-all duration-300 hover:scale-125"><Icon class="text-3xl" name="logos:telegram"/></NuxtLink>
                        <NuxtLink to="/" target="_blank" class="transition-all duration-300 hover:scale-125"><Icon class="text-3xl" name="devicon:figma"/></NuxtLink>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center justify-between xl:w-3/4 mx-auto gap-4 max-md:flex-col">
                            <NuxtLink to="/about" class="flex flex-col w-fit after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">О нас</NuxtLink> 
                            <span class="bg-white rounded-full w-1 h-1"></span>
                            <NuxtLink to="/catalog" class="flex flex-col w-fit after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">Каталог</NuxtLink> 
                            <span class="bg-white rounded-full w-1 h-1"></span>
                            <NuxtLink to="/delivery" class="flex flex-col w-fit after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">Доставка</NuxtLink>
                        </div>
                        <span class="bg-white rounded-full w-1 h-1 mx-auto md:hidden"></span>
                        <div class="flex items-center justify-between xl:w-3/4 mx-auto gap-4 max-md:flex-col">
                            <NuxtLink to="tel:8-926-471-57-29" class="flex flex-col w-fit after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">8-926-471-57-29</NuxtLink>
                            <span class="bg-white rounded-full w-1 h-1"></span>
                            <NuxtLink to="mailto:123123123123@mail.ru" class="flex flex-col w-fit after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">optica.samareva@mail.ru</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-container w-full bg-black/25 py-2">
            <p class="text-center mx-auto">© 2024 <span class="font-Comfortaa font-normal">Samareva</span>™</p>
        </div>
    </footer>
</template>

<script setup>

</script>

<template>
    <Header/>
    <main class="grid-container gap-y-8 md:gap-y-10 xl:gap-y-14 grow mt-10">
        <slot/>
    </main>
    <Footer/>
</template>

<script setup>
onMounted(() => {
  const meta = document.createElement('meta')
  meta.name = 'yandex-verification'
  meta.content = '07e6e2dae7743368'
  document.head.appendChild(meta)
})
</script>
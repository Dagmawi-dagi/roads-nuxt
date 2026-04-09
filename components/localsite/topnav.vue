<script setup>
const { setTheme } = use_set_theme()
const { darkTheme } = useUtilStore()
</script>

<template>
  <nav>
    <div class="container">
      <img @click="$router.push('/')" src="/assets/images/desta-logo.png" alt="logo" >
      <MazBtn @click="darkTheme = !darkTheme , setTheme(darkTheme)" :size="'mini'">Button</MazBtn>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '/assets/style//localsite/topnav.scss' as *;
</style>
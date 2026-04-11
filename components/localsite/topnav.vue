<script setup>
const { toggleDarkMode } = useTheme()
</script>

<template>
  <nav>
    <div class="container">
      <img @click="$router.push('/')" src="/assets/images/rodas-logo.png" alt="logo" >
        <MazSwitch
          @click="toggleDarkMode"
        />
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '/assets/style/localsite/topnav.scss' as *;
</style>
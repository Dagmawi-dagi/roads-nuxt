<script>

</script>


<template>
    <Topnavs v-if="$route.meta.nav === undefined || $route.meta.nav" />
    <div style="min-height: 80vh;">
        <slot/>
    </div>
    <MyFooter v-if="$route.meta.footer === undefined || $route.meta.footer"/>
</template>


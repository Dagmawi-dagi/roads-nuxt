<script>
definePageMeta({
    layout:"default",
    name: '404 page not found',
})
</script>

<template>
    <div style="text-align: center;">
        <h2>404 PAGE NOT FOUND </h2>
        <p>{{ $route.params.slug }}</p>
    </div>
</template>
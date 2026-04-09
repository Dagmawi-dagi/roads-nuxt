<script setup>
const { desktop,laptop,mobilePhone,tablet } = useBreakPoint()
const { sideBarOpen } = storeToRefs(useUtilStore())

const expand = computed(()=>{
  if( (desktop.value || laptop.value) && !sideBarOpen.value  ) return true
  if( (mobilePhone.value || tablet.value) ) return true
  return false
})

</script>

<template>
        <LocalsiteTopnav/>
        <div class="main">
            <LocalsiteAside/>
              <div  class="router-view" :class="{ expand }"  ref="router_view_container" >
                  <slot/>
              </div>
        </div>
</template>

<style scoped lang="scss">

@use "@/assets/style/variables" as *;
@use "@/assets/style/mixins" as *;


.main{
  display: flex;
  position: relative;
  background-color: var(--bg-light-blue);
}
.router-view{
  position: absolute;
  top:0;
  right: 0;
  background-color: var(--bg-white);
  color: var(--text-dark-gray);
  width: calc(100vw - $localsite-side-nav-width);
  margin-left: auto;
  height: calc(100vh - $localsite-top-nav-1-height);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: auto;
  @include transition($prop:( width: .4s));
  @include scrollbar();
  &.expand{
    @include transition($prop:( width: .6s));
    width: 100vw;
  }
}
</style>
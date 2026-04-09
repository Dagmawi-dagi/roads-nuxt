<script setup>
// vue
import { ref,watch,onMounted } from 'vue';

const emits = defineEmits(['accActive','handleAccChoice'])
const props = defineProps({
  id: String, // will use the when creating many comps via v-for
  items:Array, // array of objects 
  item_ref: String, // since the acc items will be array of objects we need to know what is the acc item key from the passed araay of objects  
  sub_ref: String, // to ref the item's itemsub(Array) key if we have subitem inside the obj (wwhich creates deeply nested acc as we need)
  accordion_open: Boolean,
  head: String,
  toggler_icon: Boolean, // if true we will use ^ else +
  border:Boolean // left dide border
})

// for deeplly nested acc using Recursive comp
const deep_active_acc = ref('')
const deep_acc_id = ref(`${props.id + Math.ceil(Math.random() + Date.now())}`)

// we need to set the max height of the Acc to it's scrollHeight of the el
// cus on open we only need the maxheight to be as mush s it's content 
// on Sub open we need  to add the subAcc-content scrollHeight maxheight 
// key objective only set the maxHeight you need
let AccContentMaxHeight = ref(null)
// if we want to make the accordion opened by default
onMounted(()=>{ AccContentMaxHeight.value = document.querySelector(`#_${props.id} .accoordion-header+.accoordion-content`)?.scrollHeight })

const toggleAcc = ()=>{
  emits('accActive', props.head)
  AccContentMaxHeight.value = document.querySelector(`#_${props.id} .accoordion-header+.accoordion-content`)?.scrollHeight 
}
// the whole animation is done based on the accordionOpen prop and inline Style
// close the SubAcc when ever the parent Acc is toggling Off 
// you can watch props as below
watch(()=>props.accordion_open,(val)=>{
  if( !val ) deep_active_acc.value = ''
})
// UPDATE the parentacc's AccContentMaxHeight when deep_active_acc is toggled
watch(deep_active_acc,()=>{
  AccContentMaxHeight.value = AccContentMaxHeight.value + 
  document.querySelector(`#_${props.id} .accoordion-header+.accoordion-content`)?.scrollHeight + 
  document.querySelector(`#_${deep_acc_id.value}.deep_acc .accoordion-header+.accoordion-content`)?.scrollHeight ;
})
</script>

<template>
  <div class="accordion-Container"  :id="`_${id}`" >
    <div class="accoordion-header"  @click="toggleAcc"   :icon="toggler_icon" >  
      {{ head }} 
      <span class="AccTogglerIcon" v-if="toggler_icon">
        <svg v-if="!accordion_open"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
        <svg v-if="accordion_open"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </div>

      <div class="accoordion-content" :style="{ 
        borderLeft : border ? '1px solid var(--dark-red)' : 'none' ,
        maxHeight: accordion_open ? `${AccContentMaxHeight}px`: '0px',
        transition:'max-height  0.3s ease-out'}" >

        <template v-for="(item,index) in items" :key="index">
          <span v-if="!item[`${sub_ref}`]"  class="accoordion-item" @click="$emit('handleAccChoice',item)" >{{ item[item_ref] }} </span>

          <template v-if="item[sub_ref]">
            <ClientOnly>

              <accordion_ class="deep_acc"
                :id="deep_acc_id"
                :items='item[sub_ref]' 
                :item_ref="item_ref"
                :head="item[item_ref]"
                :accordion_open="deep_active_acc === item[item_ref] "
                :border="true"
                :toggler_icon="toggler_icon" 
                :sub_ref="sub_ref"
                @accActive="deep_active_acc === item[item_ref] ? deep_active_acc = '' :  deep_active_acc = $event" 
                @handleAccChoice="$emit('handleAccChoice',$event)"
              />
            </ClientOnly>
          </template>

        </template>  
      </div>
  </div>
</template>
<style scoped lang="scss"> 
@use './style/accordion.scss' as *;
</style>
import { defineStore } from 'pinia';

// this store is for global util variables
export const useUtilStore = defineStore('utilStore',()=>{
  // for controlling global modal
  const any_open_modal = ref({
    bool: false,
    id: '',
    AnythingTopass: null // use this passed data on the mounted modal
  })
  // for global image viewer comp controll
  const   global_vue_easy_lightbox = ref({
    display: false,
    imgs: [],
    imgIndex: 0
  })

  const sideBarOpen = ref(true)
  const darkTheme = ref(false)

  return{
    any_open_modal,
    global_vue_easy_lightbox,
    sideBarOpen,
    darkTheme
  }
})
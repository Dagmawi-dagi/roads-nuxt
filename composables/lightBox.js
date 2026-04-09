import { ref } from 'vue';

export const useLightBox = (  )=>{
  const { global_vue_easy_lightbox } = storeToRefs( useUtilStore() )
  // VueEasyLightbox needs array of img urls and then display one of those using imgIndex...starter value index 0
  // w|h is set when you choose one of the imgs from the imgs array
  // but if we are working with 1 img imgIndex = 0 
  // pass :imgs on <vue-easy-lightbox :imgs="localVLBox.imgs"  ... on local vue-easy-lightbox
  const imgIndex = ref(0)
  const localVLBox = ref({
    display: false,
    singleImg: null,
    imgs: []
  })
  
  const show_local_vueEasyLightbox = (single_url,array_url,index) => {
    // array_url can be passed as null if working with single_url
    // index // the 1st file urlto be displayed
    imgIndex.value = array_url ? index : 0

    localVLBox.value.display = true
    localVLBox.value.imgs = array_url ? [...array_url] : single_url 
  }

  const show_global_vueEasyLightbox = (single_url,array_url,index) => {
    // array_url can be passed as null if working with single_url
    // index // the 1st file urlto be displayed
    global_vue_easy_lightbox.value.display = true
    global_vue_easy_lightbox.value.imgIndex =  array_url ? index : 0
    global_vue_easy_lightbox.value.imgs = array_url ? [...array_url] : single_url 
  }

  const onhide = () => {
    localVLBox.value.display = false
    global_vue_easy_lightbox.value.display = false
  }

  // // set the vue_easy_lightbox methodes to use them from here on your js file..passed when the "EmptyComp" MOUNTED
  // let vue_easy_lightbox_toolbarMethods = { set:false }
  // const setMethods= (m)=>{  vue_easy_lightbox_toolbarMethods = { ...m, set: true} }

  return{
    imgIndex,
    localVLBox,
    onhide,
    show_local_vueEasyLightbox,
    show_global_vueEasyLightbox,
    // setMethods,
  }

}
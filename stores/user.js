import { defineStore } from 'pinia';
//vue
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore',()=>{
  const loggedInUser = ref(null)
  const users = ref(null)
  const page = ref(1)
  const perPage = ref(10) 
  return{
    page,
    perPage,

    users,
    loggedInUser,
  }
})
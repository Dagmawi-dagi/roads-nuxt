<script setup>
import { MazTrash,MazPlus,MazPencil } from '@maz-ui/icons'

definePageMeta({
    layout:"localsite",
    name: 'users',
    // middleware:['auth']
})

const { users,page,perPage } =storeToRefs(useAuthStore())
const {any_open_modal} = useUtilStore()

try {
  const {  data } = await useFetch('/api/user', {
    method:'get',
    headers: {
      apiref: '/api/user/GET',
    },
  })
  users.value = data.value?.data  // important: use .value
} catch (err) {
    console.log(err);
    frontEndErrorFeedback().err(err)
}

const selectedIds = ref()
const searchQuery = ref()
const loadingIds = ref([]) // holds the ids of rows being deleted
const isLoading = (id) => loadingIds.value.includes(id)

const deleteUser =async (user)=>{
  if (!user?.id) return
  loadingIds.value.push(user.id)

  try {
    await $fetch(`/api/user/${user.id}`,{
      method:'DELETE',
      headers:{
        apiref:"/api/user/[id]/DELETE"
      }
    })
    frontEndErrorFeedback().success(' user deleted successfully')
    users.value = users.value.filter(u => u.id !== user.id)
  } catch (error) {
      frontEndErrorFeedback().err(error)
  } finally {
    loadingIds.value = loadingIds.value.filter(id => id !== user.id)
  }
}

const updateUser = (user)=>{
  any_open_modal.id = 'updateUser'
  any_open_modal.AnythingTopass = user
  any_open_modal.bool = true
}

const tableRef = ref(null)
useResizableColumns(tableRef, {
  skipClasses: ['actions-column', 'selection-column'],
  minWidth: 70
})

</script>


<template>
  <MazTable 
    ref="tableRef"
    class="MyMazTable"
    size="sm"
    v-model="selectedIds"
    v-model:search-query="searchQuery"
    v-model:page="page"
    v-model:page-size="perPage"
    search
    pagination
    sortable
    selectable
    scrollable 
    hoverable
    background-even
    selected-key="id"
    :headers="[
      { label:'Doc id', key: 'id', align: 'center', classes: 'selection-column trancate',sortable: true },
      { label:'userName', key: 'userName' ,classes:'trancate'},
      { label: 'email', key: 'email', align: 'center',classes:'trancate'  },
      { label: 'phoneNumber', key: 'phoneNumber',classes:'trancate' },
      { label: 'lastLoggedIn', key: 'lastLoggedIn', align: 'center', classes: 'maz-font-bold trancate' },
      { label: 'role', key: 'role', align: 'center', classes: 'maz-font-bold trancate' },
      { label: 'createdAt', key: 'createdAt', align: 'center', classes: 'maz-font-bold trancate' },
      { label: '', key: 'actions', align: 'center', classes:'actions-column', sortable: false,}, // Added empty header for actions
    
    ]"
    :rows="users"
  >
    <template #cell-userName="{ row, value }">
      <div class="maz-flex maz-items-center maz-gap-2">
        <MazAvatar :src="`/users/${row.avatar}`" size="0.5rem"></MazAvatar>
        <span>{{value}}</span>
      </div>
    </template>

    <template #cell-actions="{ row }">
      <div class="actions-container">
        <MazBtn 
          @click="updateUser(row)" 
          color="primary" :left-icon="MazPencil" size="xs" 
          v-tooltip.left="{ text: 'update user', color: 'default' }"
        />
        <MazBtn 
          :loading="isLoading(row.id)"
          @click="deleteUser(row)" 
          color="danger" :left-icon="MazTrash" size="xs" 
          v-tooltip.left="{ text: 'delete user', color: 'default' }"
        />
      </div>
    </template>

    <template #title>
      <div class="myTableHeader">
        <h4>Users</h4>
        <MazBtn  color="primary" :left-icon="MazPlus" size="xs" v-tooltip.right="{ text: 'create new user', color: 'default', }" @click="$router.push({name:'createUser'})"></MazBtn>
      </div>
    </template>
  </MazTable>
</template>

<style scoped lang="scss">
  @use "@/assets/style/localsite/mazTableUi.scss" as *;
</style>
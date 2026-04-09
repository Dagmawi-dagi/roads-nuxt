<script setup>
definePageMeta({
  layout:"clean",
  name: 'auth',
  // middleware:['auth'],
})

const login = async (data, form$)=>{
  let formdata = form$.data
  delete form$.data["Remember Me"]; 
    
  const { data: response, error } = await useFetch('/api/user/logIn', {
    method: 'POST',
    body: formdata,
    headers:{
      apiref:"/api/user/logIn/POST"
    }
  });

   if (error.value) {
    frontEndErrorFeedback().err(error.value)
  }
  else{
    useRouter().push('/dashboard/').then(()=>{
      useAuthStore().loggedInUser = response.value.data
        window.localStorage.setItem('token',response.value.token)
    })
  }
}
</script>

<template>
  <div class="login-page">
    <!-- Background dots layers -->
    <div class="dots-pattern"></div>
     <div class="login-container">
      <div class="login-card-wrapper">
        <div class="login-card">
          <ClientOnly>
            <Vueform :endpoint="login">
                <GroupElement
                  name="container"
                >
                  <StaticElement
                    name="h2"
                    tag="h2"
                    align="center"
                    size="md"
                    content="Admin Login"
                  />
                  <TextElement
                    name="email"
                    input-type="email"
                    :rules="[
                      'required',
                      'email',
                    ]"
                    label="email"
                    info="user email"
                  />
                  <TextElement
                    name="userPassword"
                    input-type="password"
                    label="Password"
                    info="userPassword"
                    :rules="[
                      'required',
                      'min:8',
                      'max:20',
                    ]"
                  />
                  <CheckboxElement
                    name="Remember Me"
                    text="Remember Me"
                    info="Remember Me"
                    size="sm"
                    :submit="false"
                  />
                  <StaticElement
                    name="link"
                    tag="a"
                    target="_blank"
                    content="Forget Password"
                    align="center"
                  />
                  <ButtonElement
                    name="submit"
                    button-label="login"
                    :submits="true"
                    size="md"
                    align="center"
                    :full="true"
                  />
                </GroupElement>
              </Vueform>
          </ClientOnly>
        </div>
      </div>
     </div>
  </div>
</template>
<style lang="scss" scoped>
@use '/assets/style/auth/login.scss' as *;
</style>
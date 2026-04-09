<script setup>
definePageMeta({
    layout:"dashboard",
    name: 'createUser',
    middleware:['auth']
})

const createNewUser = async (FormD,form$)=>{
    try {
        await $fetch('/api/user/signUp',{
            method: 'POST',
            body:  FormD,
            headers:{
                apiref:"/api/user/signUp/POST"  
            }
        });
        frontEndErrorFeedback().success('New User Created Successefully')
    } catch (error) {
        frontEndErrorFeedback().err(error)
    }
}
</script>

<template>
    <div class="container">
        <ClientOnly>
            <Vueform
                :endpoint="createNewUser"
            >
                <StaticElement
                name="h3"
                tag="h3"
                content="Create New User"
                :columns="{
                    container: 9,
                }"
                bottom="2"
                style="color: #1492E6;"
                />
                <TextElement
                name="userName"
                label="userName"
                size="md"
                :rules="[
                    'required',
                ]"
                info="field required"
                :columns="{
                    container: 9,
                }"
                />
                <TextElement
                name="email"
                input-type="email"
                :rules="[
                    'nullable',
                    'required',
                    'email',
                ]"
                label="Email"
                info="field required"
                size="md"
                :columns="{
                    container: 9,
                }"
                />
                <PhoneElement
                name="phoneNumber"
                label="phoneNumber"
                :allow-incomplete="true"
                :unmask="true"
                size="md"
                :rules="[
                    'required',
                ]"
                info="field required"
                :columns="{
                    container: 9,
                }"
                />
                <TextElement
                name="userPassword"
                input-type="password"
                label="Password"
                info="field required"
                :columns="{
                    container: 9,
                }"
                />
              
                <CheckboxgroupElement
                    name="role"
                    view="tabs"
                    :items="[
                        {
                        value: 'user',
                        label: 'user',
                        },
                        {
                        value: 'admin',
                        label: 'admin',
                        },
                    ]"
                    label="user role"
                    size="sm"
                    :rules="[
                        'required',
                    ]"
                    :columns="{
                        container: 9,
                    }"
                    :default="['user']"
                    />
                    
                    <ButtonElement
                    name="submit"
                    button-label="Create New User"
                    :submits="true"
                    :columns="{
                        container: 9,
                    }"
                    align="center"
                    size="md"
                    />
            </Vueform>
        </ClientOnly>
    </div>
</template>

<style scoped lang="scss">
.container{
    margin: 0 1rem;
    padding: 1rem 10px;
    background-color: var(--white);
    height: 100vh;
}
</style>
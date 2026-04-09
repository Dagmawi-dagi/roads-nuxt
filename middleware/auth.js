
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (!auth.loggedInUser) {
    const { data: user, error } = await useFetch('/api/user/me', {
      method:'GET',
      headers: {
        apiref: "/api/user/me/GET",
      },
    })

    if (!error.value && user.value?.data) {
      auth.loggedInUser = user.value.data

      // Already logged in → prevent going to auth page
      if (to.name === 'auth') {
        return navigateTo({ name: 'dashboard' })
      }
      return
    }

    // Clear invalid token
    const tokenCookie = useCookie('jwt')
    tokenCookie.value = null

    // If not logged in, but trying to go anywhere except auth → go to auth
    if (to.name !== 'auth') {
      return navigateTo({ name: 'auth' })
    }
    return
  }

  // ✅ Already logged in
  // Don’t force redirect if already inside dashboard
  if (to.name === 'auth') {
    return navigateTo({ name: 'dashboard' })
  }
})

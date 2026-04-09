// on App.vue import this composable to excu the 'if statement'
export const use_set_theme = ()=>{
  const { darkTheme } = storeToRefs( useUtilStore() )

  // on 1st load excute this  to the the theme of the app
  if( localStorage.getItem('darkTheme')){
    document.documentElement.setAttribute('darkTheme', true )
    darkTheme.value = true
  }else{
    document.documentElement.setAttribute('darkTheme',false )
    darkTheme.value = false
  }

  // on the Theme toggler comp
  const setTheme = (bool)=>{
    document.documentElement.setAttribute('darkTheme',bool)
    localStorage.setItem('darkTheme',bool)
    darkTheme.value = bool
  }

  return{
    setTheme
  }

}
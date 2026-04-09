import { DialogToast,DialogMessage } from 'v-dialogs';

export default ()=>{

  const err = (err,type)=>{
    if( type === 'vueform' && err.response?._data?.message){
      const jsonStr = err.response?._data?.message.replace(/^Error:\s*/, "");
      const extractErrorsAsArray = JSON.parse(jsonStr).map(err => ({
              [err.path.join(".")]: err.message
          }));
      for (let index = 0; index < extractErrorsAsArray.length; index++) {
          const errmsg = extractErrorsAsArray[index];
          setTimeout(() => {
                DialogToast(`${JSON.stringify(errmsg)}`,{
                messageType:'error',
                closeButton:true,
                placement:'top-right',
                duration:10000,
                customClass: 'global_error',
              })
          }, 500);
      }
      return
    } 
    

    DialogToast(`${err}`,{
      messageType:'error',
      closeButton:true,
      placement:'top-right',
      duration:10000,
      customClass: 'global_error',
    })
  }

  const success = (msg)=>{
    DialogMessage(`${msg}`,{ 
      messageType: 'success',
      icon:true,
      placement:"top",
      duration:5000,
      customClass: 'global_success', 
      closeButton:true,
      pill:false
    })
  }

  return {
    err,
    success
  }
}
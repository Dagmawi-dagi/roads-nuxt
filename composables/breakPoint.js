import { useBreakpoints } from '@vueuse/core';

export const useBreakPoint = ()=>{

  const bkPoint = useBreakpoints({
    xs: 400,
    mobilePhone: 600,
    tablet: 950,
    desktop: 1260,
  })
  
  // these vars are Boolean
  const xs = bkPoint.smallerOrEqual('xs')
  const mobilePhone = bkPoint.smallerOrEqual('mobilePhone')
  const tablet = bkPoint.between('mobilePhone','tablet')
  const laptop = bkPoint.between('tablet','desktop')
  const desktop = bkPoint.greaterOrEqual('desktop')
  
  return{
    bkPoint,
    
    xs,
    mobilePhone,
    tablet,
    laptop,
    desktop
  }
}
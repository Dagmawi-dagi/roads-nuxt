export const useDateFormater = () => {
    const formatedDate = new Date().toLocaleDateString()

  return{
    formatedDate
  }
}
var storage={
  set:(key,value)=>{
    return localStorage.setItem(key, value)
  },
  get:(key)=>{
    return localStorage.getItem(key)
  },
}

export default storage;
module.exports=storage;

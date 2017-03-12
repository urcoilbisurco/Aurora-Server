var storage={
  set:(key,value)=>{
    return localStorage.setItem(key, value)
  },
  get:(key)=>{
    return localStorage.getItem(key)
  },
}

//storage.set("access_token", "464636e0-0587-11e7-84a3-a38b06b37b96")
module.exports=storage;

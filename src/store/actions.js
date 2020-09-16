export default {
    addCart(context,payload){
      return  new Promise((resolve,reject) => {
        let oldProduct=null
        for(let item of context.state.cartList){
        //判断cartList是否有要加入购物车的数据
            if(item.iid===payload.iid){
                oldProduct = item
            }
        }
        if(oldProduct){
            context.commit("addCounter",oldProduct)
            resolve("当前数量加1")
        }else{
            payload.count = 1
            //把商品添加到购物车
            context.commit("addToCart",payload)
            resolve("添加新的商品")
        }
        
    
      })

    }
        
}
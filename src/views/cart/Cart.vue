<template>
  <div class="cart">
     <nav-bar class="cart-nav"><div slot="center" >购物车({{$store.getters.cartLength}}) </div></nav-bar>
     <!-- 购物车内容 -->
     <cart-list />
     <!-- 全选 -->
     <bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from "./childComps/BottomBar"
  import {mapGetters} from "vuex"
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      BottomBar
    }
  }
</script>

<style scoped>
  .cart{
    position: relative;
    height: 100vh;
  }
  .cart-nav{
     background-color: var(--color-tint);
     color: #fff;
  }

</style>

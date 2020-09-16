<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街 </div></nav-bar>
     <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick"   ref="tabControl1" class="counten" v-show="iosksetoffTop"></tab-control>
    <scroll class="content" ref="swrpp" :probe-type="3"
     @scroll="scrolltype" :pullUpLoad="true" @pullingUp="loadMore">
    <home-Swiper :banners="banners" @swiperImageLoad="swiperImageLoad" ></home-Swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick"   ref="tabControl2"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backtop" v-show="isok"></back-top>
  </div>
</template>

<script>
  
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import Scroll from 'components/common/scroll/Scroll'
  import NavBar from 'components/common/navbar/NavBar'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import BackTop from 'components/content/backTop/BackTop'

  


  import {getHomeMultidata,getHomeGoods} from 'network/home'

  

  export default {
    name: "Home",
    components:{
     
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      NavBar,
      TabControl,
      Scroll,
      BackTop
    },
    data(){
      return {
       banners: [],
       recommends:[],
       currentType:'pop',
       goods: {
         'pop' :{page:0,list:[]},
         'new' :{page:0,list:[]},
         'sell' :{page:0,list:[]},
          
       },
       isok:false,
       taboffsetTop:0,
       iosksetoffTop:false,
       savey:0
      
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
    ,
    created() {
    //.请求多个数据
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

   
  },
  mounted () {
    const refresh = this.debounce(this.$refs.swrpp.refresh,50)
     this.$bus.$on("itemImageLoad", () =>{
      refresh()
    })
    
  },
  methods:{
    tabClick(index){ 
      console.log(index)
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:  
          this.currentType = 'new'
          break
        case 2:  
          this.currentType = 'sell'    
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    swiperImageLoad(){
      this.taboffsetTop=this.$refs.tabControl2.$el.offsetTop
    },
   loadMore(){
     this.getHomeGoods(this.currentType)
    },
     backtop(){
        this.$refs.swrpp.backclick(0,0)
      },
    scrolltype(position){
      this.isok =(-position.y) >1000,
      this.iosksetoffTop = (-position.y) > 542
    },
    activated () {
      this.$refs.swrpp.backclick(0,this.savey,0),
      this.$refs.swrpp.refresh()
    },
    deactivated () {
      this.savey = this.$refs.swrpp.y
    },
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      //console.log(res)
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
       const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res => {
       this.goods[type].list.push(...res.data.list)
       this.goods[type].page += 1
       this.$refs.swrpp.finishPullUp()
       
    })
    },
    debounce(func,delay){
        let timer = null
        return function (...args){
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          },delay)
        }
    }
     
  }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
  }
  
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

  }
  .counten{
    position: relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0px;
    left: 0px;
    
  }
</style>

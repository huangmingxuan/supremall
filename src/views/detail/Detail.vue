<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @itemClick="titleClick" :current-index="currentIndex" :title-infos="titleInfos" />
        
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-Base-info :goods="goods"></detail-Base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params" />
            <detail-comment-info ref="comment"/>
            <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        
    </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,gerRecommend} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

export default {
    name:"Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
       
    },
    data () {
        return {
            iid:null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo:{},
            recommends:[],
            currentIndex: 0,
            titleInfos:['商品', '参数', '评论', '推荐'],
            themeTopYs:[],
        

        }
    },
    created () {
        this.iid = this.$route.params.iid,
        getDetail(this.iid).then(res => {
            console.log(res)
        // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
         // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
         // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
         // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        
        })
        gerRecommend().then(res => {
        
            this.recommends = res.data.list
        })
       
        
    },
    methods: {
        imageLoad(){
            this.$refs.scroll.refresh()
            this.themeTopYs=[]
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        },
        titleClick(index) {
        console.log(this.themeTopYs[index]);
        this.currentIndex=index;
        this.$refs.scroll.backclick(0, -this.themeTopYs[index], 100)
      },
      contentScroll(positoin){
          const positoinY= -positoin.y
          let length = this.themeTopYs.length
          for(let i=0;i<length;i++){
              if((i<length - 1 && positoinY > this.themeTopYs[i] && positoinY
              < this.themeTopYs[i+1]) ||(i === length -1 && positoinY > this.themeTopYs[i])){
                    this.currentIndex=i
              }
          }
         
      },
      addToCart(){
        console.log("点击了")
        const obj = {}
        // 获取购物车要展示的数据
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.newPrice;
        //发送给Vuex大管家
        this.$store.dispatch("addCart",obj).then(res => {
            this.$toast.show(res,2000)
        })
      }
    
      
        
    }  
}
</script>
<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
      
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 98px);
    }
   
</style>
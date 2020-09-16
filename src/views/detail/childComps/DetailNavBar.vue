<template>
    <div>
        <nav-bar>
            <div slot="left" class="item-left" @click="fanhui">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div class="title" slot="center" >
                <span class="title-item"
                v-for="(item, index) in titleInfos" :key="index"
                :class="{'active': index===currentIndex}" @click="itemClick(index)">
                {{item}}
                </span>
    </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:"DetaiNavBar",
    components: {
        NavBar
    },
    props: {
		titleInfos: {
		type: Array,
        default: () => {
          return titleInfos
        }
      },
      currentIndex: {
		type: Number,
        default: 0
      }
    },
    methods: {
        itemClick: function (index) {
        this.$emit('itemClick', index)
         },
        fanhui(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
    .title{
        display: flex;
    }
    .title-item{
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }
    .item-left img{
        margin-top: 15px;
        height: 15px;
    }
</style>
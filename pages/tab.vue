<template>
  <div class="tab">
      <div class="title">
          <span  v-for="(item,index) in titles" :key="index" @click="handleClick(index)" :class="{active: current===index}">{{item}}</span>
      </div>
      <div class="content" v-if="current===0">
          <ul>
              <li>新闻页面1</li>
              <li>新闻页面2</li>
              <li>新闻页面3</li>
          </ul>
      </div>
      <div class="content" v-else-if="current===1">
          <ul>
              <li>体育页面1</li>
              <li>体育页面2</li>
              <li>体育页面3</li>
          </ul>
      </div>
      <div class="content" v-else-if="current===2">
          <ul>
              <li>娱乐页面1</li>
              <li>娱乐页面2</li>
              <li>娱乐页面3</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            titles: ['新闻','体育','娱乐'],
            // 当前被点击的， 默认是第一个，这样就可以默认显示第一组
            current:0
        }
    },
    methods:{
       handleClick(index){
        //    console.log(index)
        this.current= index
       } 
    }
}
</script>

<style lang='less' scoped>
    .tab{
        .title{
             margin: 20px;
        }
        span{
            cursor: pointer;
            border:1px solid pink;
            padding:10px;
        }
        .active{
            background-color: pink;
            color:white;
        }
    }
</style>
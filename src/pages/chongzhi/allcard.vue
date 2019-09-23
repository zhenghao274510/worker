<template>
<div class="allbox">
 <van-tabs v-model="active" >
  <van-tab title="已购买"><li-pin :list="canlist"></li-pin></van-tab>
  <van-tab title="已失效"><li-pin :list="nocanlist"></li-pin></van-tab>

</van-tabs>
</div>


</template>
 
<script>
import liPin from '@/components/public/chongzhicard'
export default {
 data () {
 return {
      active: 0,
      uid:'',
      canlist:[],
      nocanlist:[]
 }
 },
methods: {},
 moutend () {},
 components:{
     liPin
 },
 created(){
   this.uid=sessionStorage.getItem('uid');
  // this.uid="1";
  //   已购买
   let parmas1={cmd:'rechargeCardList',uid:this.uid,type:'0',nowPage:'1',pageCount:'10'};
   this.postRequest(parmas1).then(res=>{
    this.canlist=res.data.dataList;
    console.log(res)
   })
   // 已失效
   let parmas2={cmd:'rechargeCardList',uid:this.uid,type:'1',nowPage:'1',pageCount:'10'};
   this.postRequest(parmas2).then(res=>{
     console.log(res)
    this.nocanlist=res.data.dataList;
   })
   console.log(this.canlist,this.nocanlist);
 }

}
</script>
 
<style scoped lang = "less">
 .allbox{
   margin-top: .5rem;
 }
</style>
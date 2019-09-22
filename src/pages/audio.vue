<template>
 <div class="video">
    <video :src="videosrc" id="video" controls></video>
    <div class="roudepublic">

    <p>注：扫描过二维码的用户，平台会通过现场摇号的方式进行抽奖，中奖的用户线下工作人员将会以短信的形式发送给您</p>
    </div>
 </div>
</template>
 
<script>
export default {
 data () {
 return {
    videosrc:''
 }
 },
methods: {},
 moutend () {},
 created(){
    let parmas={cmd:'getVideo'};
    this.postRequest(parmas).then(res=>{
       console.log(res)
       this.videosrc=res.data.contentUrl;
    })
 }
}
</script>
 
<style scoped lang = "less">
.video{margin-top: .5rem;}
 #video{height: 2.12rem;width: 100%;}
 p{font-size: .15rem;line-height: .2rem;}
 .roudepublic{padding:0 .15rem;}
</style>
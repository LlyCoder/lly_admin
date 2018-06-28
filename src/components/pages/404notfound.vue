<template>
    <div class="err-warp">
        <div class="err-pic">
            <div class="err-pic-mobile"></div>
            <img src="/static/img/404.png" />
        </div>
        <div class="err-tip-warp">
            <div class="tip-info"><h3>没有找到该页面</h3></div>
            <router-link to="/"><el-button type="info" round>返回首页</el-button></router-link>
        </div>
    </div>
</template>

<script>

</script>

<style lang="css" scoped>
.err-warp {
    width: 100%;
    height: 100%;
    text-align: center;
}
.err-pic {
    margin: 40px auto 15px auto;
}
.err-pic img {
    display: block;
    width: 800px;
    height: 400px;
    margin: 0 auto;
}
.err-tip-warp {
    margin: 0 auto;
}
.backBtn {
    display: block;
    width: 100px;
    height: 30px;
    margin: 0 auto;
    text-decoration: none;
    background: black;
    color: #fff;
    padding: 10px;
    font-size: 15px;
    border: 1px solid black;
}
.err-pic-mobile {
    display: none;
}
.tip-info {
    margin-bottom: 30px;
}
h3 {
    font-weight: bold;
    font-size: 30px;
}
@media screen and (max-width: 560px) {
      .err-pic img {
          display: none;
      }
      .err-tip-warp {
          padding-top: 1rem;
          padding-bottom: 3rem;
      }
      .err-pic-mobile {
          margin: 0 auto;
          display: block;
          width: 12rem;
          height: 8rem;
      }
   }
</style>


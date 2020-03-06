<template>
  <div id="nave">
    <router-link to="/Home">메인 화면</router-link>
    <span>&nbsp;|&nbsp;</span>
    <router-link to="/About">내 정보</router-link>
    <span>&nbsp;|&nbsp;</span>
    <router-link to="/CommandCenter">고객센터</router-link>
  </div>
</template>

<script>
export default {
  name: "nave"
};
</script>
<style>
#nave {
  position: fixed;
  padding-left: 20px;
}
.router-link-active {
  color: darkviolet;
}
@media (max-width: 990px) {
  #nave {
    border-style: outset;
    background-color: lightblue;
    margin-right: 10px;
    padding: 3px;
    z-index: 9998;
    position: relative;
    float: right;
  }
}
</style>
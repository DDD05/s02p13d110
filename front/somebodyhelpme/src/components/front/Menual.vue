<template>
  <div id="menual">
    <button class="menualToMain" @click="goMain()">Main</button>
    <h1 class="menualText">Menual</h1>
    <div class="menualBox">
      <h2 class="menualContentsText">1.회원가입</h2>
      <img class="menualContents" src="@/assets/img/menual/menualSignup.gif" alt="menual" />
    </div>
    <div class="menualBox">
      <h2 class="menualContentsText">2.경매등록하기</h2>
      <img class="menualContents" src="@/assets/img/menual/registmenual2.gif" alt="menual" />
    </div>
    <div class="menualBox">
      <h2 class="menualContentsText">3.입찰하기</h2>
      <img class="menualContents" src="@/assets/img/menual/입찰하기.gif" alt="menual" />
    </div>
    <div class="menualBox">
      <h2 class="menualContentsText">4.경매종료알림확인</h2>
      <img class="menualContents" src="@/assets/img/menual/경매종료알림확인.gif" alt="menual" />
    </div>
    <div class="menualBox">
      <h2 class="menualContentsText">5.낙찰하기</h2>
      <img class="menualContents" src="@/assets/img/menual/낙찰하기.gif" alt="menual" />
    </div>
    <div class="menualBox">
      <h2 class="menualContentsText">6.결제하기</h2>
      <img class="menualContents" src="@/assets/img/menual/결제하기.gif" alt="menual" />
    </div>
    <div class="menualBox">
      <h2 class="menualContentsText">7.경매완료 및 입금확인알림</h2>
      <img class="menualContents" src="@/assets/img/menual/경매완료및입금확인알림.gif" alt="menual" />
    </div>
    <div class="menualBox">
      <h2 class="menualContentsText">8.점수등록리뷰</h2>
      <img class="menualContents" src="@/assets/img/menual/점수등록리뷰.gif" alt="menual" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goMain() {
      this.$router.push("/Home");
    }
  }
};
</script>

<style>
#menual {
  height: 100%;
  width: 100vw;
  text-align: center;
  background-color: slategray;
}

.menualContents {
  height: 70vh;
  width: 60vw;
}

.menualText {
  color: aliceblue;
}
.menualToMain {
  position: absolute;
  right: 3vw;
  top: 3vh;
}
.menualContentsText {
  float: left;
  color: lavender;
}
.menualBox {
  height: 80vh;
  width: 60vw;
  margin: auto;
}
</style>
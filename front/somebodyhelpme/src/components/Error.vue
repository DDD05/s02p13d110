<template>
  <div id="errordiv">
    <div class="err">
      <img class="errcont" src="../assets/img/errorPage/gora2.png" alt />
    </div>
    <div class="err">
      <img class="errcont" src="../assets/img/errorPage/glasses.jpg" alt />
    </div>

    <div class="err">
      <img class="errcont" src="../assets/img/errorPage/gora.png" alt />
    </div>

    <div class="err">
      <img class="errcont" src="../assets/img/errorPage/glasses2.jpg" alt />
    </div>
    <div class="err">
      <b class="errtext">
        Error,
        <br />404 Page not found
        <br />It's all your fault!!!
        <br />
        <a href="/home" class="w3-text-red">메인 페이지로</a>
      </b>
    </div>

    <div class="err">
      <img
        class="errcont"
        style="transform: scaleX(-1);"
        src="../assets/img/errorPage/glasses.jpg"
        alt
      />
    </div>
    <div class="err">
      <img class="errcont" src="../assets/img/errorPage/gora2.png" alt />
    </div>
    <div class="err">
      <img
        class="errcont"
        style="transform: scaleX(-1);"
        src="../assets/img/errorPage/glasses2.jpg"
        alt
      />
    </div>
    <div class="err">
      <img class="errcont" src="../assets/img/errorPage/gora.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "errorPage",
  mounted() {
    this.$store.commit("disableAuth");
  }
};
</script>

<style>
#errordiv {
  width: 100vw;
  height: 100vh;
  margin: auto;
  background-color: aliceblue;
  padding: 2% 8% 0% 8%;
}

.err {
  width: 30%;
  height: 30%;
  float: left;
  text-align: center;
}
.errcont {
  vertical-align: middle;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: white;
  display: block;
}

.errtext {
  font-size: 40px;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: white;
  display: block;
}
</style>
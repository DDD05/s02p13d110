<template>
  <div style="padding-bottom:5%;;margin-top:2%;">
    <div class="w3-container w3-card-4 w3-light-grey w3-margin">
      <h1>
      <b>Notice</b>
    </h1>
    <br>
      <!-- <img alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px" /> -->
      <span class="w3-right w3-opacity">2020.01.30</span>
      <h3>{{id}}</h3>
      <br />
      <input class="w3-input w3-padding-16" type="text" placeholder="제목을 입력하시오" v-model="ctitle" />
      <hr class="w3-clear" />
      <textarea
        class="w3-input w3-padding-16"
        type="text"
        placeholder="내용을 입력하시오"
        v-model="ccontents"
      />
      <div style="text-align:right">
        <button
          type="button"
          class="w3-button w3-theme-d1 w3-margin-bottom"
          @click="insertNotice()"
        >
          <i class="fa fa-check"></i> 저장
        </button>
        <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom" @click="list()">
          <i class="fa fa-arrow-left"></i> 목록
        </button>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import http from "@/utils/http-require.js";
import store from "@/store";
export default {
  data() {
    return {
      store,
      ctitle: "",
      ccontents: "",
      cmembersId: store.state.members.membersId,
      cdate: ""
    };
  },
  mounted() {
    console.log(store.state.members.membersId);
  },
  methods: {
    list() {
      this.$router.push("/CommandCenter");
    },
    insertNotice() {
      console.log(this.notice);
      if (this.ctitle == "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (this.ccontents == "") {
        alert("내용을 입력해주세요.");
        return;
      }
      http
        .post("/notice/insert", {
          title: this.ctitle,
          contents: this.ccontents,
          membersId: this.cmembersId,
          date: this.cdate
        })
        .then(response => {
          if (response.data.state == "succ") {
            alert("등록이 완료되었습니다.");
            this.$router.push("/CommandCenter");
          }
        });
    }
  }
};
</script>

<style>
div {
  font-family: "Playfair Display";
}
textarea {
  height: 300px;
}
#container {
  padding-top: 70px;
  padding-bottom: 30px;
}
</style>

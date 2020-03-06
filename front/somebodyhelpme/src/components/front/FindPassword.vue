<template>
  <div style="margin: auto; max-width:800px;">
    <form
      action="#"
      class="w3-container w3-card-4 w3-light-grey"
      style="margin:10%; padding:3%"
      @submit.prevent="updatePwd"
    >
      <h2 class="w3-center" v-if="!pageInfo.isAutho">비밀번호 찾기</h2>
      <h2 class="w3-center" v-if="pageInfo.isAutho">비밀번호 수정</h2>
      <div v-if="!pageInfo.isAutho">
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px">
            <i class="w3-xxlarge fa fa-hand-o-right"></i>
          </div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="membersId"
              type="text"
              required
              v-model="userInfo.id"
              placeholder="ID"
            />
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px">
            <i class="w3-xxlarge fa fa-envelope-o"></i>
          </div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="email"
              v-model="userInfo.email"
              type="text"
              required
              placeholder="Email"
            />
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px">
            <i class="w3-xxlarge fa fa-user-circle"></i>
          </div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="name"
              v-model="userInfo.name"
              type="text"
              required
              placeholder="Name"
            />
          </div>
        </div>
      </div>
      <div v-if="pageInfo.isAutho">
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px">
            <i class="w3-xxlarge fa fa-pencil"></i>
          </div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="pwd"
              v-model="userInfo.pwd"
              type="password"
              required
              placeholder="Password"
            />
          </div>
        </div>
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px">
            <i class="w3-xxlarge fa fa-pencil"></i>
          </div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="pwd"
              v-model="userInfo.requiredPwd"
              type="password"
              required
              placeholder="required Password"
            />
          </div>
        </div>
      </div>
      <p class="w3-center">
        <button
          id="findPwdBtn"
          :disabled="pageInfo.sendBtnActive"
          class="w3-button w3-section w3-ripple"
          type="button"
          @click="doCheckInfo"
          v-if="!pageInfo.isAutho"
        >Send</button>&nbsp;
        <button
          id="updatePwdBtn"
          :disabled="pageInfo.updateBtnActive"
          class="w3-button w3-section w3-ripple"
          type="submit"
          v-if="pageInfo.isAutho"
        >Update</button>
      </p>
    </form>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";

export default {
  name: "findPassword",
  data: () => {
    return {
      userInfo: {
        id: "",
        pwd: "",
        requiredPwd: "",
        email: "",
        name: ""
      },
      pageInfo: {
        sendBtnActive: true,
        updateBtnActive: true,
        isAutho: false
      },
      resUserInfo: {}
    };
  },
  watch: {
    "userInfo.id"() {
      this.inputValue();
    },
    "userInfo.name"() {
      this.inputValue();
    },
    "userInfo.email"() {
      this.inputValue();
    },
    "userInfo.requiredPwd"() {
      this.inputPwd();
    },
    "userInfo.pwd"() {
      this.inputPwd();
    }
  },
  methods: {
    inputValue() {
      this.pageInfo.sendBtnActive = !(
        this.userInfo.id.trim().length > 0 &&
        this.userInfo.email.trim().length > 0 &&
        this.userInfo.name.trim().length > 0
      );
    },
    inputPwd() {
      this.pageInfo.updateBtnActive = !(
        this.userInfo.pwd.trim().length > 0 &&
        this.userInfo.requiredPwd.trim().length > 0 &&
        this.userInfo.pwd === this.userInfo.requiredPwd
      );
    },
    doCheckInfo() {
      http
        .get(`/member/search/${this.userInfo.id}`)
        .then(res => {
          if (res.data == null || res.data == "") {
            alert("일치하는 아이디가 없습니다.");
          } else if(res.status == "200") {
            this.resUserInfo = res.data;
            if (
              this.resUserInfo.email == this.userInfo.email &&
              this.resUserInfo.name == this.userInfo.name
            ) {
              this.pageInfo.isAutho = true;
              this.pageInfo.sendBtnActive = true;
            }else {
              alert('내용이 일치하지 않습니다.')
            }
          }
        })
        .catch(() => {
          alert("fdfd");
        });
    },
    updatePwd() {
      http
        .put(`/member/updatePassword`, {
          membersId: this.resUserInfo.membersId,
          password: this.userInfo.pwd
        })
        .then(res => {
          if (res.data == null || res.data == "") {
            alert("일치하는 아이디가 없습니다.");
          } else if (res.data.state == "fail") {
            alert("실패");
          } else if (res.data.state == "succ") {
            alert("성공");
            this.$router.push("/");
          }
        });
    }
  }
};
</script>

<style></style>

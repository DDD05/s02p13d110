<template>
  <div id="signup-form">
    <form
      class="w3-container w3-card-4 w3-round w3-light-grey w3-opacity-min"
      style="width:70%; margin: auto"
      @submit.prevent
    >
      <h2 class="w3-center">SIGN UP</h2>
      <p class="w3-center">
        Just Like That
        <b>
          (
          <span style="color:red;">*</span> Required )
        </b>
      </p>

      <p :class="ux.isOverlapId">
        <label>
          <span style="color:red">*</span> ID
        </label>
        <button
          class="w3-right w3-button w3-white w3-border w3-round-large"
          style="font-family:jjl; "
          :class="{ 'w3-border-red' : !pageInfo.isOverlapId , 'w3-border-blue' : pageInfo.isOverlapId }"
          @click="idOverlap"
        >{{ux.overlapText[pageInfo.isOverlapId ? 1 : 0]}}</button>
        <span class="w3-right w3-text-blue" v-if="isIng.id">checking</span>
        <input
          class="w3-input w3-border w3-hover-indigo"
          name="membersId"
          type="text"
          v-model="userInfoVo.membersId"
          :disabled="pageInfo.isOverlapId"
        />
        <span class="error">{{error.id}}</span>
      </p>
      <p :class="ux.password">
        <label>
          <span style="color:red">*</span> Password
        </label>
        <input
          class="w3-input w3-border w3-hover-indigo"
          name="password"
          type="password"
          v-model="userInfoVo.password"
        />
      </p>
      <p :class="ux.password">
        <label>
          <span style="color:red">*</span> Password Retry
        </label>
        <label v-show="!pageInfo.equalsToPassword" style="color:red">Not Equals</label>
        <input
          class="w3-input w3-border w3-hover-indigo"
          name="password-retry"
          type="password"
          v-model="userInfoVo.passwordRetry"
        />
        <span class="error">{{error.password}}</span>
      </p>
      <p :class="ux.name">
        <label>
          <span style="color:red">*</span> Name
        </label>
        <input
          class="w3-input w3-border w3-hover-indigo"
          name="name"
          type="text"
          v-model="userInfoVo.name"
        />
        <span class="error">{{error.name}}</span>
      </p>
      <p :class="ux.isAuthEmail">
        <label>
          <span style="color:red">*</span> Email
        </label>
        <span v-if="isIng.email" class="w3-right w3-text-blue">Sending</span>
        <button
          v-if="!isIng.email"
          class="w3-right w3-button w3-white w3-border w3-round-large"
          style="font-family:jjl; "
          :class="{ 'w3-border-red' : !pageInfo.isRequestEmail , 'w3-border-blue' : pageInfo.isRequestEmail }"
          @click="requestEmail"
        >{{ux.sendEmailText[pageInfo.isRequestEmail?1:0]}}</button>
        <input
          class="w3-input w3-border w3-hover-indigo"
          name="email"
          type="email"
          v-model="userInfoVo.email"
          :disabled="pageInfo.isAuthEmail"
        />
        <span class="error">{{error.email}}</span>
        <template v-if="pageInfo.isRequestEmail">
          <span
            class="w3-right w3-button w3-white w3-border w3-round-large"
            style="font-family:jjl; "
            @click="emailAutho"
            :class="{ 'w3-border-red' : !pageInfo.isAuthEmail , 'w3-border-blue' : pageInfo.isAuthEmail }"
          >{{ux.authEmailText[pageInfo.isAuthEmail?1:0]}}</span>
          <input
            class="w3-input w3-border w3-hover-indigo"
            name="email"
            v-model="userInfoVo.code"
            :disabled="pageInfo.isAuthEmail"
            placeholder="Code"
          />
          <span class="error">{{error.code}}</span>
        </template>
      </p>
      <p>
        <label>Account</label>
        <input
          class="w3-input w3-border w3-hover-indigo"
          name="account"
          type="text"
          v-model="userInfoVo.account"
          placeholder="은행-012345678901"
        />
      </p>
      <div>
        <p>
          <label>Address</label>
          <span
            class="w3-right w3-text-gray"
            @click="pageInfo.showFindAddress = !pageInfo.showFindAddress"
          >Find</span>
          <input
            class="w3-input w3-border w3-hover-indigo"
            name="address"
            type="text"
            v-model="userInfoVo.addressObj.address"
            v-show="!pageInfo.showFindAddress"
            @click="pageInfo.showFindAddress = !pageInfo.showFindAddress"
          />
          <br />
          <input
            class="w3-input w3-border w3-hover-indigo"
            name="detailAddress"
            type="text"
            v-model="userInfoVo.detailAddress"
            v-show="!pageInfo.showFindAddress"
            placeholder="Detail Address"
          />
          <VueDaumPostcode
            v-if="pageInfo.showFindAddress"
            @complete="userInfoVo.addressObj = $event , pageInfo.showFindAddress = !pageInfo.showFindAddress"
            style="height: 450px; overflow: scroll;"
          ></VueDaumPostcode>
        </p>
      </div>

      <p>
        <label>Phone</label>
        <input
          class="w3-input w3-border w3-hover-indigo"
          name="phone"
          type="text"
          v-model="userInfoVo.phone"
          placeholder="'-' 없이 입력하세요."
        />
      </p>
      <p class="w3-right">
        <button class="w3-button w3-white w3-padding-large" @click="$router.push(`/`)">
          <i class="fa fa-home"></i> HOME
        </button>
        <button
          class="w3-button w3-indigo w3-hover-blue w3-padding-large"
          @click="RequiredInfoInspc"
        >
          <i class="fa fa-arrow-right"></i> NEXT
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode";
import http from "@/utils/http-require.js";

export default {
  name: "signUp",
  props: ["userInfo", "pageInfoDto"],
  components: {
    VueDaumPostcode
  },
  data: () => {
    return {
      ux: {
        isOverlapId: {},
        overlapText: ["Overlap", "Okay!!"],
        sendEmailText: ["Request", "Okay!!"],
        authEmailText: ["Auth", "Okay!!"],
        isAuthEmail: {},
        name: {},
        password: {}
      },
      userInfoVo: {
        membersId: "",
        password: "",
        passwordRetry: "",
        name: "",
        email: "",
        addressObj: "",
        detailAddress: "",
        address: "",
        phone: "",
        account: "",
        image: null,
        portfolio: null,
        rank: 0,
        code: ""
      },
      pageInfo: {
        isOverlapId: false,
        isAuthEmail: false,
        equalsToPassword: false,
        showFindAddress: false,
        isRequestEmail: false
      },
      error: {
        id: "",
        code: "",
        email: "",
        name: "",
        password: ""
      },
      isIng: {
        id: false,
        email: false
      }
    };
  },
  methods: {
    aniVibro(sbj, text = "필수 항목을 채워주세요.") {
      if (sbj == "id") {
        this.ux.isOverlapId = { "animation vibro": true };
        setTimeout(() => {
          this.ux.isOverlapId = { "animation vibro": false };
        }, 1000);
        this.error.id = text;
      } else if (sbj == "code") {
        this.ux.isAuthEmail = { "animation vibro": true };
        setTimeout(() => {
          this.ux.isAuthEmail = { "animation vibro": false };
        }, 1000);
        this.error.code = text;
      } else if (sbj == "email") {
        this.ux.isAuthEmail = { "animation vibro": true };
        setTimeout(() => {
          this.ux.isAuthEmail = { "animation vibro": false };
        }, 1000);
        this.error.email = text;
      } else if (sbj == "name") {
        this.ux.name = { "animation vibro": true };
        setTimeout(() => {
          this.ux.name = { "animation vibro": false };
        }, 1000);
        this.error.name = text;
      } else if (sbj == "password") {
        this.ux.password = { "animation vibro": true };
        setTimeout(() => {
          this.ux.password = { "animation vibro": false };
        }, 1000);
        this.error.password = text;
      }
    },
    idOverlap() {
      if (this.userInfoVo.membersId.trim().length > 0) {
        this.isIng.id = true;
        http
          .get(`/member/search/${this.userInfoVo.membersId.trim()}`)
          .then(res => {
            if (res.data == null || res.data == "") {
              alert("중복 체크 완료!!");
              this.pageInfo.isOverlapId = true;
            } else {
              this.aniVibro("id", "중복된 ID입니다.");
            }
          })
          .catch(() => {
            this.aniVibro("id", "서버 접속을 실패했습니다.");
          });
      } else {
        this.aniVibro("id", "ID를 입력해주세요.");
      }
      this.isIng.id = false;
    },
    emailAutho() {
      if (this.userInfoVo.code.trim().length > 0) {
        this.isIng.email = true;
        http
          .post(`/member/checkEmail`, {
            email: this.userInfoVo.email,
            code: this.userInfoVo.code
          })
          .then(res => {
            if (
              res.data == null ||
              res.data == "" ||
              res.data.state == "fail"
            ) {
              this.aniVibro("code", "이메일 인증에 실패하였습니다.");
            } else {
              alert("이메일 인증 성공했습니다.");
              this.pageInfo.isAuthEmail = true;
            }
          })
          .catch(() => {
            this.aniVibro("code", "서버 접속을 실패했습니다.");
          });
      } else {
        this.aniVibro("code", "코드를 입력해주세요.");
      }
      this.isIng.email = false;
    },
    requestEmail() {
      if (this.userInfoVo.email.trim().length > 0) {
        this.isIng.email = true;
        http
          .post(`/member/sendEmail`, { email: this.userInfoVo.email.trim() })
          .then(res => {
            if (res.data == null || res.data == "") {
              this.aniVibro("email", "이메일 전송에 실패했습니다.");
              this.pageInfo.isRequestEmail = false;
              this.isIng.email = false;
            } else if (res.data.state == "exist") {
              this.aniVibro("email", "중복된 이메일입니다.");
            } else {
              alert("이메일에 인증코드를 전송했습니다.");
              this.pageInfo.isRequestEmail = true;
              this.isIng.email = false;
            }
          })
          .catch(() => {
            this.aniVibro("email", "서버 접속을 실패했습니다.");
            this.pageInfo.isRequestEmail = false;
            this.isIng.email = false;
          });
      } else {
        this.aniVibro("email", "이메일을 입력해주세요.");
      }
    },
    RequiredInfoInspc() {
      if (
        !(
          this.userInfoVo.membersId.trim().length > 0 &&
          this.pageInfo.isOverlapId
        )
      ) {
        this.aniVibro("id");
      } else if (
        !(
          this.userInfoVo.password.trim().length > 0 &&
          this.pageInfo.equalsToPassword
        )
      ) {
        this.aniVibro("password");
      } else if (!(this.userInfoVo.name.trim().length > 0)) {
        this.aniVibro("name");
      } else if (
        !(this.userInfoVo.email.trim().length > 0 && this.pageInfo.isAuthEmail)
      ) {
        this.aniVibro("email");
      } else {
        this.userInfoVo.address =
          this.userInfoVo.addressObj.address + this.userInfoVo.detailAddress;
        this.$router.push({
          name: "SignUpSecond",
          params: { userInfo: this.userInfoVo, pageInfo: this.pageInfo }
        });
      }
    }
  },
  watch: {
    "userInfoVo.passwordRetry"() {
      this.pageInfo.equalsToPassword =
        this.userInfoVo.password === this.userInfoVo.passwordRetry
          ? true
          : false;
    }
  },
  created() {
    if (this.userInfo != null) this.userInfoVo = this.userInfo;
    if (this.pageInfoDto != null) this.pageInfo = this.pageInfoDto;
  }
};
</script>

<style>
#signup-form {
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 20%;
}
.error {
  color: red;
  font-size: 0.85em;
}
</style>
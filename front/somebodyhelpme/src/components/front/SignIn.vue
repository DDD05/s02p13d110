<template>
  <div id="signInSecond" style="padding-top:50px">
    <div class="w3-cell-row w3-center w3-padding-32" id="loginHeader">
      <div class="w3-cell">
        <img
          src="https://www.notion.so/front/shared/illustrations/use-case-note-alt.png"
          style="width: 16vw;"
          class="w3-right"
          @click="playUX"
          :class="{'animation stretch':ux.img}"
        />
      </div>
      <div class="w3-cell w3-cell-middle">
        <div>
          <span style="font-family:'jjl'; " id="hh">
            <WhiteKey class="w3-hover-text-red" v-bind:frequency="261" text="S" />
            <WhiteKey class="w3-hover-text-orange" v-bind:frequency="294" text="o" />
            <WhiteKey class="w3-hover-text-yellow" v-bind:frequency="329" text="m" />
            <WhiteKey class="w3-hover-text-green" v-bind:frequency="349" text="e" />
            <WhiteKey class="w3-hover-text-blue" v-bind:frequency="392" text="b" />
            <WhiteKey class="w3-hover-text-indigo" v-bind:frequency="440" text="o" />
            <WhiteKey class="w3-hover-text-purple" v-bind:frequency="494" text="d" />
            <WhiteKey class="w3-hover-text-pink" v-bind:frequency="523" text="y" />
          </span>
          <br />
          <span
            style="font-family:'jjl'; font-size: 2vw; font-weight:100;"
            class="w3-hover-text-gray"
          >Catch My hand. If you need something to help</span>
          <br />
          <span
            style="font-family:'jjl'; font-size: 2vw; font-weight:100;"
            class="w3-hover-text-gray"
          >This site is auction site of talent.</span>
        </div>
      </div>
      <div class="w3-cell">
        <img style="width: 16vw;" />
      </div>
    </div>
    <div class="w3-center">
      <form action="#" target="_blank" id="loginForm" @submit.prevent="doLogin">
        <p>
          <input
            class="w3-input w3-padding-16"
            type="text"
            placeholder="ID"
            required
            name="ID"
            v-model="id"
          />
        </p>
        <p>
          <input
            class="w3-input w3-padding-16"
            type="password"
            placeholder="Password"
            required
            name="Password"
            v-model="pwd"
          />
        </p>
        <div class>
          <p>
            <button class="w3-button w3-hover-pale-red w3-padding-large" type="submit">
              <i class="fa fa-handshake-o"></i> 로그인
            </button>
            <button
              class="w3-button w3-hover-pale-blue w3-padding-large"
              @click="$router.push('/SignUp')"
            >
              <i class="fa fa-users"></i> 회원가입
            </button>
            <button
              class="w3-button w3-hover-pale-yellow w3-padding-large"
              @click="$router.push(`/FindPassword`)"
            >
              <i class="fa fa-search"></i> 비밀번호 찾기
            </button>
            <button
              class="w3-button w3-hover-pale-green w3-padding-large"
              @click="$router.push(`/menual`)"
            >
              <i class="fa fa-book"></i> 메뉴얼 보기
            </button>
          </p>
        </div>
      </form>
      <div>
        <img
          :src="getImg(7)"
          style="width: 50px; margin-right:100px"
        />
        <img :src="getImg(6)" style="width: 70px; " />
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";
import WhiteKey from "@/components/front/WhiteKey.vue";
export default {
  name: "signin",
  components: {
    WhiteKey
  },
  data: () => {
    return {
      id: "",
      pwd: "",
      ux: {
        active: false,
        img: false
      }
    };
  },
  methods: {
    playUX() {
      this.ux.img = true;
      setTimeout(() => {
        this.ux.img = false;
      }, 1000);
    },
    doLogin() {
      http
        .post(`/member/login/`, {
          membersId: this.id.trim(),
          password: this.pwd
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.dispatch("searchMemberById", this.id);
            this.$router.push("/Home");
          } else {
            alert(`로그인 실패`);
          }
        })
        .catch(() => {
          alert(`서버 접속 오류`);
        });
    },
    getImg(img) {
      // eslint-disable-next-line no-undef
      return require(`@/assets/img/frontPageLogo/${img}.png`);
    },
    init() {
      this.$store.commit("disableAuth");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
#loginForm {
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 5%;
}

@media (max-width: 600px) {
  img {
    width: 200px;
  }
  img {
    display: none;
  }
}

#signInSecond #hh:hover {
  width: 300px;
  height: 300px;
  transform: rotate(180deg);
}
#signInSecond #hh {
  width: 100px;
  height: 100px;
  font-size: 10vw;
  font-weight: 1000;
  transition: width 2s, height 2s, transform 2s;
}
</style>
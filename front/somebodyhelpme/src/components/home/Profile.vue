<template>
  <div id="Profile" class="w3-container w3-card-4 w3-light-grey w3-margin">
    <h1>
      <b>프로필</b>
    </h1>
    <br />
    <!-- Images of Me -->
    <div class="w3-container w3-padding-large" style="margin-bottom:32px">
      <h4>
        <b>About Me</b>
      </h4>
      <p style="white-space:pre;">{{userInfoVo.about}}</p>
      <br />
      <br />
      <b>Technical Skills</b>
      <!-- Progress bars / Skills -->
      <div class="w3-col rank_tier_wrap">
        <div class="w3-col m2 rank_current_tier_img_wrap">
          <img :src="current_tier" class="rank_tier_img" />
        </div>

        <div class="w3-col m8 rank_tier_bar_wrap">
          <div class="w3-grey">
            <div
              class="w3-container w3-dark-grey w3-padding w3-center"
              id="rank_tier_bar"
            >{{userInfoVo.rank}}</div>
          </div>
        </div>

        <div class="w3-col m2 rank_next_tier_img_wrap">
          <img :src="next_tier" class="rank_tier_img" />
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
// @ is an alias to /src
import http from "@/utils/http-require.js";
import store from "@/store";

export default {
  name: "Profile",
  components: {},
  data: () => {
    return {
      //vuex part
      store,
      userInfoVo: {
        membersId: store.state.members.membersId,
        password: store.state.members.password,
        name: store.state.members.name,
        email: store.state.members.email,
        portfolio: null,
        about: store.state.members.about,
        rank: store.state.members.rank
      },
      min_point: 0,
      max_point: 0,
      current_tier: "",
      next_tier: ""
    };
  },
  mounted() {
    http
      .get("member/search/" + this.userInfoVo.membersId)
      .then(res => {
        this.my_auction_data = res.data;
        let per = 0;
        let point = this.userInfoVo.rank;
        if (600 <= point) {
          this.current_tier = this.getTier("grandmaster");
          per = 100;
        } else if (500 <= point) {
          this.current_tier = this.getTier("master");
          this.next_tier = this.getTier("grandmaster");
          per = 100;
        } else if (400 <= point) {
          this.current_tier = this.getTier("diamond");
          this.next_tier = this.getTier("master");
          this.min_point = 400;
          this.max_point = 500;
        } else if (300 <= point) {
          this.current_tier = this.getTier("platinum");
          this.next_tier = this.getTier("diamond");
          this.min_point = 300;
          this.max_point = 400;
        } else if (200 <= point) {
          this.current_tier = this.getTier("gold");
          this.next_tier = this.getTier("platinum");
          this.min_point = 200;
          this.max_point = 300;
        } else if (100 <= point) {
          this.current_tier = this.getTier("silver");
          this.next_tier = this.getTier("gold");
          this.min_point = 100;
          this.max_point = 200;
        } else {
          this.current_tier = this.getTier("bronze");
          this.next_tier = this.getTier("silver");
          this.min_point = 0;
          this.max_point = 100;
        }
        per =
          ((point - this.min_point) / (this.max_point - this.min_point)) * 100;
        document.getElementById("rank_tier_bar").style.width = per + "%";
      })
      .catch(res => {
        console.log(res);
      });
  },
  methods: {
    modProcess() {
      document.getElementById("portfolioFile").click();
    },
    modPortfolio() {
      this.userInfoVo.portfolio = this.$refs.portfolioFile.files[0];
      console.log(this.userInfoVo.portfolio);

      let formData = new FormData(document.getElementById("formData"));

      http
        .put("member/update", formData)
        .then(res => {
          alert("수정완료" + res);
        })
        .catch(() => {
          alert("수정이 실패하였습니다.");
        });
    },
    getTier(tier_name) {
      // eslint-disable-next-line no-undef
      return require(`@/assets/img/tier/icon_${tier_name}.png`);
    }
  }
};
</script>

<style>
#portfolioFile {
  display: none;
}

.rank_tier_wrap {
  width: 100%;
  position: relative;
}
.rank_current_tier_img_wrap {
  float: left;
}

.rank_next_tier_img_wrap {
  float: right;
}

.rank_tier_img {
  width: 100%;
}

.rank_tier_bar_wrap {
  position: absolute;
  top: 50%;
  transform: translate(25%, -50%);
}
</style>

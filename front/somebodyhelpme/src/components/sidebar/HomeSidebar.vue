<template>
  <div id="HomeSidebar">
    <a href="#PhotoGrid" class="w3-bar-item w3-button w3-padding">
      <i class="fa fa-th fa-fw w3-margin-right"></i>경매
    </a>
    <a href="#Profile" class="w3-bar-item w3-button w3-padding">
      <i class="fa fa-user fa-fw w3-margin-right"></i>프로필
    </a>
    <a href="#Auction" class="w3-bar-item w3-button w3-padding">
      <i class="fa fa-th-large fa-fw w3-margin-right"></i>진행중인 경매
    </a>
    <a href="#Message" onclick="w3_close()" class="w3-bar-item w3-button w3-padding">
      <i class="fa fa-envelope fa-fw w3-margin-right"></i>알림함
      <span class="cntArea" v-if="cnt!=0">{{cnt}}</span>
    </a>
  </div>
</template>

<script>
// @ is an alias to /src
import http from "@/utils/http-require.js";

export default {
  name: "Sidebar",
  components: {},
  data() {
    return {
      cnt: 0
    };
  },
  mounted() {
    this.loadMessageCnt();
  },
  methods: {
    logout() {
      this.$store.state.isAuth = false;
      this.$router.push("/login");
    },
    loadMessageCnt() {
      http
        .get(
          "message/searchStateCntByMembersId/" +
            this.$store.state.members.membersId
        )
        .then(res => {
          this.$data.cnt = res.data;
        });
    }
  }
};
</script>

<style >
#sidebar {
  margin-top: 2%;
}
.cntArea {
  display: inline-block;
  background-color: red;
  color: white;
  font-weight: bold;
  border-radius: 100%;
  height: 20px;
  width: 20px;
  text-align: center;
}
</style>


<template>
  <div
    id="sidebar"
    class="w3-sidebar w3-collapse w3-light-gray w3-round-xxlarge w3-animate-left"
    style="z-index:3;width:300px;"
  >
    <!-- Sidebar/menu -->
    <nav id="mySidebar">
      <br />
      <Profile />
      <div class="w3-bar-block">
        <Home v-if="this.$route.path.split('/')[1] == 'Home'" />
        <About v-else-if="this.$route.path.split('/')[1] == 'About'" />
        <Command v-else-if="this.$route.path.split('/')[1] == 'CommandCenter'" />
      </div>
    </nav>
    <br />
    <div style="w3-display-container">
      <button
        class="w3-bar w3-black"
        @click="timerFlag = !timerFlag"
        style="font-family:jjl"
      >참여 경매 타이머 {{timerFlag?"OFF":"ON"}}</button>
      <div v-if="timerFlag">
        <Clock :subject="'Current Time'" />
        <Clock
          v-for="item of myAuctionList.values()"
          :key="item.id"
          :subject="item.title"
          :auctionTime="item.time"
        ></Clock>
        <br />
      </div>
    </div>
    <div v-if="!timerFlag" style="margin-bottom:10px">
      <ConnectedIcon />
      <a @click="logout" href="/" style="margin:10px">로그아웃</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from "./sidebar/Clock.vue";
import Profile from "./sidebar/ProfileSidebar.vue";
import ConnectedIcon from "./sidebar/ConnectedIcon.vue";
import Home from "@/components/sidebar/HomeSidebar";
import Command from "@/components/sidebar/CommandSidebar";
import About from "@/components/sidebar/AboutSidebar";
import http from "@/utils/http-require.js";
export default {
  name: "Sidebar",
  components: {
    Clock,
    ConnectedIcon,
    Profile,
    Home,
    Command,
    About
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      myAuctionList: new Map(),
      timerFlag: false
    };
  },
  methods: {
    init() {
      this.searchMyAcution();
    },
    logout() {
      this.$store.commit("disableAuth");
    },
    searchMyAcution() {
      http
        .get(`attend/searchByMemberId/${this.members.membersId}`)
        .then(res => {
          for (const attend of res.data) {
            var id = attend.auctionId;
            this.serarchMyAuctionRemainTime(id);
          }
        });
    },
    serarchMyAuctionRemainTime(pAuctionId) {
      http.get(`auction/search/${pAuctionId}`).then(res => {
        var tmpTime = res.data.salesTime;
        var tmpTitle = res.data.title;
        this.pushMyAuctionListToAuctionIdAndTimeAndTitle(
          pAuctionId,
          tmpTime,
          tmpTitle
        );
      });
    },
    pushMyAuctionListToAuctionIdAndTimeAndTitle(pId, pTime, pTitle) {
      if (this.equalscurTimeVsAuctionTime(pTime)) {
        this.myAuctionList.set(pId, {
          auctionId: pId,
          time: pTime,
          title: pTitle
        });
      }
    },
    // 시간이 남으면 true , 지나면 false
    equalscurTimeVsAuctionTime(at) {
      var cd = new Date();
      var pd = new Date(at);
      if (cd < pd) return true;
      return false;
    }
  },
  computed: {
    members() {
      return this.$store.state.members;
    }
  }
};
</script>

<style >
#sidebar {
  margin-top: 2%;
}
</style>


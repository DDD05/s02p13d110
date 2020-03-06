<template>
  <div id="about">
    <ProfileModifiy style="padding-bottom:5%;;margin-top:2%;"></ProfileModifiy>
    <AuctionRegist style="padding-bottom:5%;;margin-top:2%;"></AuctionRegist>
    <AuctionCancel style="padding-bottom:5%;;margin-top:2%;"></AuctionCancel>
    <Footer></Footer>
  </div>
</template>

<script>
import ProfileModifiy from "@/components/about/ProfileModifiy.vue";
import AuctionRegist from "@/components/about/AuctionRegist.vue";
import AuctionCancel from "@/components/about/AuctionCancel.vue";
import Footer from "@/components/Footer.vue";

export default {
  // test code
  name: "about",
  components: {
    ProfileModifiy,
    AuctionRegist,
    AuctionCancel,
    Footer
  }
};
</script>

<style>
#about {
  padding: 0 10px;
}
</style>
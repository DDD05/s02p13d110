<template>
  <div id="home">
    <PhotoGrid id="PhotoGrid" style="padding-bottom:5%;margin-top:2%;"></PhotoGrid>
    <Profile id="Profile" style="padding-bottom:5%;margin-top:2%;"></Profile>
    <Auction id="Auction" style="padding-bottom:5%;margin-top:2%;"></Auction>
    <Message id="Message" style="padding-bottom:5%;margin-top:2%;"></Message>
    <Footer></Footer>
  </div>
</template>

<script>
import PhotoGrid from "@/components/home/PhotoGrid";
import Profile from "@/components/home/Profile";
import Auction from "@/components/home/Auction";
import Footer from "@/components/Footer.vue";
import Message from "@/components/home/Message.vue";

export default {
  name: "home",
  components: {
    PhotoGrid,
    Profile,
    Auction,
    Footer,
    Message
  }
};
</script>

<style>
#home {
  padding: 0 10px;
}
</style>
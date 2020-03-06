<template>
  <div id="commandcenter">
    <Feedback style="padding-bottom:5%;;margin-top:2%;"></Feedback>
    <FaQ style="padding-bottom:5%;;margin-top:2%;"></FaQ>
    <Notice style="padding-bottom:5%;;margin-top:2%;"></Notice>
    <Footer></Footer>
  </div>
</template>

<script>
import FaQ from "@/components/commandCenter/FaQ.vue";
import Feedback from "@/components/commandCenter/Feedback.vue";
import Notice from "@/components/commandCenter/Notice.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    FaQ,
    Feedback,
    Notice,
    Footer,
  }
};
</script>

<style>
#commandcenter {
  padding: 0 10px;
}
</style>
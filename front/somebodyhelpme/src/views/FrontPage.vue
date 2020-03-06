
<template>
  <div id="front" class="w3-margin">
    <SignIn></SignIn>
  </div>
</template>

<script>
import SignIn from "@/components/front/SignIn.vue";
export default {
  name: "FrontPage",
  components: {
    SignIn
  },
  mounted() {
    localStorage.setItem("vuex","");
  }
};
</script>

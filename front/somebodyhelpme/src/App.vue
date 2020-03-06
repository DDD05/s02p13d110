<template>
  <div id="app">
    <Loading v-if="$store.state.preloader" />
    <template v-if="$store.state.isAuth">
      <Nav></Nav>
      <Sidebar style=" font-family: jjl;" />
      <router-view id="content" style=" font-family: jjl;" />
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import Loading from "@/components/Loading.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "app",
  components: { Nav, Loading, Sidebar },
  mounted() {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#content {
  margin-left: 300px;
}
@media (max-width: 990px) {
  #content {
    margin-left: 0px;
  }
}
@font-face {
  font-family: jjl;
  src: local("중나좋체_Light"),
    url("./fonts/중나좋체_Light.ttf") format("truetype");
}
.w3-allerta {
  font-family: "Allerta Stencil", Sans-serif;
}
#app {
  font-family: jjl;
}
</style>
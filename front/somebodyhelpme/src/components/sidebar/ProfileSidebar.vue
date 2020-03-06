<template>
  <div class="w3-container">
    <br />
    <img :src="members.image" style="width:45%;" class="w3-round" />
    <br />
    <br />
    <p class="w3-text-grey">{{members.name}}님 환영합니다.</p>
    <h4>
      <b>{{page.toUpperCase()}}</b>
    </h4>
  </div>
</template>

<script>
export default {
  computed: {
    members() {
      return this.$store.state.members;
    },
    page() {
      return this.$route.path.split('/')[1];
    }
  }
};
</script>

<style>
</style>
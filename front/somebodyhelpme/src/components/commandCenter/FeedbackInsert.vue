<template>
  <div style="padding-bottom:5%;;margin-top:2%;">
    <div
      class="w3-container w3-card-4 w3-light-grey w3-margin"
      style="margin-top:5%; padding-top:5%; padding-bottom:10%"
    >
      <h1>
        <b>Feedback</b>
      </h1>
      <br />
      <div class="w3-container" id="contact">
        <h2>Contact</h2>
        <i class="fa fa-map-marker" style="width:30px"></i> SOMEBODY, Korea
        <br />
        <i class="fa fa-phone" style="width:30px"></i> Phone: +82 10-1234-5678
        <br />
        <i class="fa fa-envelope" style="width:30px"></i> Email: admin@somebody.com
        <br />
        <p>Questions? Go ahead, ask them:</p>
        <form action="/action_page.php" target="_blank">
          <p>
            <input class="w3-input w3-border" type="text" placeholder="Title" v-model="ctitle" />
          </p>
          <p>
            <textarea
              class="w3-input w3-border w3-padding-16"
              type="text"
              placeholder="Contents"
              required
              v-model="ccontents"
            />
          </p>
          <button
            class="w3-button w3-light-grey w3-padding-large w3-right"
            @click="insertFeedback()"
          >
            <i class="fa fa-paper-plane"></i> SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http-require.js";
import store from "@/store";
export default {
  data() {
    return {
      store,
      ctitle: "",
      ccontents: "",
      cmembersId: store.state.members.membersId,
      cdate: ""
    };
  },
  methods: {
    insertFeedback() {
      console.log(this.feedback);
      if (this.ctitle == "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (this.ccontents == "") {
        alert("내용을 입력해주세요.");
        return;
      }
      http
        .post("/feedback/insertFeedback", {
          title: this.ctitle,
          contents: this.ccontents,
          membersId: this.cmembersId,
          date: this.cdate
        })
        .then(this.$router.push("/CommandCenter"));
    }
  }
};
</script>